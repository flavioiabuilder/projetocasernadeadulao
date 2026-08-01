/**
 * Átrio — primitivas de movimento.
 *
 * Nenhuma função aqui conhece conteúdo: todas recebem elementos e devolvem
 * `destruir()`. As curvas moram em motion.css; este arquivo só decide
 * QUANDO trocar um atributo de estado.
 *
 * Nada usa listener de scroll. Revelação usa IntersectionObserver; scrub e
 * paralaxe usam um único laço de rAF que só roda quando há alvo visível.
 */
(function (window, document) {
  "use strict";

  const A = window.Atrio;
  const motion = {};

  /* ============================================================
     Revelação por interseção
     ============================================================ */

  /**
   * Marca `data-revelado="true"` quando o elemento entra na viewport.
   *
   * Medido na referência: o gatilho é "topo do elemento cruza a base da
   * viewport", disparo único (toggleActions "play"). Reproduzido com
   * rootMargin negativa na base, para que o elemento revele um pouco
   * depois de assomar — e não no instante em que 1px aparece.
   */
  function observarRevelacao(elementos, opcoes) {
    const cfg = opcoes || {};
    const lista = Array.prototype.slice.call(elementos);
    if (!lista.length) return function () {};

    // Sem IntersectionObserver, revelar tudo de uma vez é a degradação certa.
    if (typeof window.IntersectionObserver !== "function") {
      lista.forEach(function (el) {
        el.dataset.revelado = "true";
      });
      return function () {};
    }

    const observador = new window.IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          const el = entrada.target;
          /*
           * Rolagem em salto — arrastar a barra, Home/End, âncora — pode
           * levar um elemento de baixo da viewport para cima dela sem
           * nenhum quadro intermediário visível. Nesse caso não há o que
           * animar: o elemento entra revelado.
           */
          const passouDireto =
            !entrada.isIntersecting && entrada.boundingClientRect.bottom <= 0;
          if (!entrada.isIntersecting && !passouDireto) return;
          if (typeof cfg.aoRevelar === "function") cfg.aoRevelar(el);
          el.dataset.revelado = "true";
          pendentes.delete(el);
          observador.unobserve(el);
        });
      },
      {
        root: null,
        rootMargin: cfg.margem || "0px 0px -12% 0px",
        threshold: cfg.limiar === undefined ? 0.05 : cfg.limiar,
      }
    );

    /** Elementos ainda não revelados, para a varredura de segurança. */
    const pendentes = new Set();

    function revelarSemAnimar(el) {
      el.dataset.revelado = "true";
      pendentes.delete(el);
      observador.unobserve(el);
    }

    lista.forEach(function (el) {
      /*
       * Um observador de disparo único nunca notifica o que já ficou ACIMA
       * da viewport. Sem esta guarda, chegar por âncora, por deep link ou
       * por restauração de posição deixa todo o conteúdo anterior invisível
       * para sempre. Quem já passou entra revelado, sem animação.
       */
      if (el.getBoundingClientRect().bottom <= 0) {
        el.dataset.revelado = "true";
        return;
      }
      pendentes.add(el);
      observador.observe(el);
    });

    /*
     * Rede de segurança para rolagem em salto.
     *
     * IntersectionObserver só notifica quando um limiar é CRUZADO. Um salto
     * grande — arrastar a barra, End, âncora, restauração de sessão — pode
     * levar um elemento de baixo da viewport para cima dela sem nunca
     * intersectar: nenhum limiar é cruzado e a notificação jamais chega.
     *
     * A varredura roda no fim da rolagem, percorre só o que falta e se
     * desliga sozinha quando o conjunto esvazia.
     */
    let idVarredura = 0;

    function varrer() {
      pendentes.forEach(function (el) {
        if (el.getBoundingClientRect().bottom <= 0) revelarSemAnimar(el);
      });
      if (!pendentes.size) pararVarredura();
    }

    function agendarVarredura() {
      window.clearTimeout(idVarredura);
      idVarredura = window.setTimeout(varrer, 120);
    }

    function pararVarredura() {
      window.clearTimeout(idVarredura);
      window.removeEventListener("scroll", agendarVarredura);
    }

    if (pendentes.size) {
      window.addEventListener("scroll", agendarVarredura, { passive: true });
    }

    return function destruir() {
      observador.disconnect();
      pararVarredura();
      pendentes.clear();
    };
  }

  /**
   * Prepara um título para revelação por palavras e aplica o atraso de cada
   * uma como custom property. O stagger TOTAL é constante — títulos longos
   * e curtos terminam juntos.
   */
  function prepararRevelacaoDeTexto(elemento) {
    const restaurar = A.fatiarPalavras(elemento);
    const palavras = elemento.querySelectorAll(".at-palavra");
    const total = A.duracao("--at-stagger-total-palavras");
    palavras.forEach(function (palavra, i) {
      palavra.style.setProperty(
        "--at-palavra-atraso",
        A.distribuirStagger(i, palavras.length, total).toFixed(1) + "ms"
      );
    });
    return function destruir() {
      restaurar();
    };
  }

  /** Aplica atraso escalonado a um grupo de blocos irmãos. */
  function escalonarBlocos(elementos) {
    const passo = A.duracao("--at-stagger-item");
    Array.prototype.forEach.call(elementos, function (el, i) {
      el.style.setProperty("--at-bloco-atraso", (i * passo).toFixed(1) + "ms");
    });
    return function destruir() {
      Array.prototype.forEach.call(elementos, function (el) {
        el.style.removeProperty("--at-bloco-atraso");
      });
    };
  }

  /* ============================================================
     Marquee
     ============================================================ */

  /**
   * Põe um marquee para rodar em velocidade constante.
   *
   * O trilho é duplicado para o laço fechar sem salto. A duração vem da
   * largura real medida, e não de um valor fixo: dois marquees com textos
   * diferentes precisam andar na MESMA velocidade, senão a página parece
   * ter dois relógios.
   *
   * Pausa quando sai da viewport ou quando a aba fica oculta — animação
   * contínua invisível é consumo puro de bateria.
   */
  function criarMarquee(container, opcoes) {
    const cfg = opcoes || {};
    const trilho = container.querySelector(".at-marquee__trilho");
    if (!trilho) return function () {};

    const velocidadeEm = parseFloat(
      A.token(cfg.tokenVelocidade || "--at-marquee-velocidade")
    );
    const base = parseFloat(window.getComputedStyle(document.body).fontSize) || 16;
    const velocidadePx = velocidadeEm * base;

    // Clone marcado como decorativo: o leitor de tela lê o texto uma só vez.
    const clone = trilho.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.dataset.clone = "true";
    container.appendChild(clone);

    let observador = null;
    let aoMudarVisibilidade = null;

    function medir() {
      const largura = trilho.scrollWidth;
      const segundos = A.duracaoMarquee(largura, velocidadePx);
      const duracao = segundos > 0 ? segundos.toFixed(2) + "s" : "0s";
      container.style.setProperty("--at-marquee-duracao", duracao);
    }

    medir();

    // Remedir quando a fonte carrega ou a largura muda.
    let observadorTamanho = null;
    if (typeof window.ResizeObserver === "function") {
      observadorTamanho = new window.ResizeObserver(medir);
      observadorTamanho.observe(container);
    }

    if (typeof window.IntersectionObserver === "function") {
      observador = new window.IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          container.dataset.pausado = entrada.isIntersecting ? "false" : "true";
        });
      });
      observador.observe(container);
    }

    aoMudarVisibilidade = function () {
      if (document.hidden) container.dataset.pausado = "true";
    };
    document.addEventListener("visibilitychange", aoMudarVisibilidade);

    return function destruir() {
      if (observador) observador.disconnect();
      if (observadorTamanho) observadorTamanho.disconnect();
      document.removeEventListener("visibilitychange", aoMudarVisibilidade);
      if (clone.parentNode) clone.parentNode.removeChild(clone);
      container.style.removeProperty("--at-marquee-duracao");
      delete container.dataset.pausado;
    };
  }

  /* ============================================================
     Palco com scrub por scroll
     ============================================================ */

  /**
   * Conduz letras espalhadas por progresso de rolagem.
   *
   * Reproduz o padrão medido: cada letra tem sua própria sub-faixa dentro da
   * janela de scroll, e as faixas se sobrepõem — por isso a revelação lê
   * como onda e não como bloco. Só opacidade e translateY são tocados.
   *
   * Um único rAF, ativado por IntersectionObserver. Fora da tela, o laço
   * para completamente.
   */
  function criarPalcoScrub(palco, opcoes) {
    const cfg = opcoes || {};
    const letras = Array.prototype.slice.call(palco.querySelectorAll(".at-letra"));
    if (!letras.length) return function () {};

    const sobreposicao = cfg.sobreposicao === undefined ? 0.55 : cfg.sobreposicao;
    const distancia = A.token("--at-mov-dist-letra") || "0.6em";
    let ativo = false;
    let idQuadro = 0;

    // Movimento reduzido: estado final imediato, sem laço nenhum.
    if (A.movimentoReduzido()) {
      letras.forEach(function (letra) {
        letra.style.setProperty("--at-letra-opacidade", "1");
        letra.style.setProperty("--at-letra-deslocamento", "0px");
      });
      return function () {};
    }

    // Faixas sobrepostas: a letra i começa antes de a i-1 terminar.
    const passo = letras.length > 1 ? 1 / (letras.length - 1 + sobreposicao) : 1;
    const largura = passo * (1 + sobreposicao);

    function aplicar() {
      const caixa = palco.getBoundingClientRect();
      const alcance = caixa.height - window.innerHeight;
      const progresso = alcance > 0 ? A.normalizar(-caixa.top, 0, alcance) : 1;

      letras.forEach(function (letra, i) {
        const inicio = i * passo;
        const local = A.normalizar(progresso, inicio, inicio + largura);
        letra.style.setProperty("--at-letra-opacidade", local.toFixed(3));
        letra.style.setProperty(
          "--at-letra-deslocamento",
          "calc(" + (1 - local).toFixed(3) + " * " + distancia + ")"
        );
      });
    }

    function laco() {
      if (!ativo) return;
      aplicar();
      idQuadro = window.requestAnimationFrame(laco);
    }

    let observador = null;
    if (typeof window.IntersectionObserver === "function") {
      observador = new window.IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting && !ativo) {
            ativo = true;
            laco();
          } else if (!entrada.isIntersecting && ativo) {
            ativo = false;
            window.cancelAnimationFrame(idQuadro);
          }
        });
      });
      observador.observe(palco);
    } else {
      ativo = true;
      laco();
    }

    aplicar();

    return function destruir() {
      ativo = false;
      window.cancelAnimationFrame(idQuadro);
      if (observador) observador.disconnect();
      letras.forEach(function (letra) {
        letra.style.removeProperty("--at-letra-opacidade");
        letra.style.removeProperty("--at-letra-deslocamento");
      });
    };
  }

  /* ============================================================
     Paralaxe discreta
     ============================================================ */

  /**
   * Escreve --at-parallax (0..1) conforme o elemento cruza a viewport.
   * Desligada em movimento reduzido e em ponteiro grosso (celular), onde o
   * custo de repintura não compensa o efeito.
   */
  function criarParalaxe(elementos) {
    const lista = Array.prototype.slice.call(elementos);
    if (!lista.length || A.movimentoReduzido() || !A.ponteiroFino()) {
      return function () {};
    }
    if (typeof window.IntersectionObserver !== "function") return function () {};

    const visiveis = new Set();
    let idQuadro = 0;

    function laco() {
      visiveis.forEach(function (el) {
        const caixa = el.getBoundingClientRect();
        const p = A.normalizar(caixa.top, -caixa.height, window.innerHeight);
        el.style.setProperty("--at-parallax", (p - 0.5).toFixed(4));
      });
      idQuadro = visiveis.size ? window.requestAnimationFrame(laco) : 0;
    }

    const observador = new window.IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) visiveis.add(entrada.target);
        else visiveis.delete(entrada.target);
      });
      if (visiveis.size && !idQuadro) laco();
      if (!visiveis.size && idQuadro) {
        window.cancelAnimationFrame(idQuadro);
        idQuadro = 0;
      }
    });

    lista.forEach(function (el) {
      observador.observe(el);
    });

    return function destruir() {
      observador.disconnect();
      if (idQuadro) window.cancelAnimationFrame(idQuadro);
      visiveis.clear();
      lista.forEach(function (el) {
        el.style.removeProperty("--at-parallax");
      });
    };
  }

  /* ============================================================
     Montagem
     ============================================================ */

  motion.observarRevelacao = observarRevelacao;
  motion.prepararRevelacaoDeTexto = prepararRevelacaoDeTexto;
  motion.escalonarBlocos = escalonarBlocos;
  motion.criarMarquee = criarMarquee;
  motion.criarPalcoScrub = criarPalcoScrub;
  motion.criarParalaxe = criarParalaxe;

  A.motion = motion;

  A.registrar("motion", function (raiz) {
    const cancelar = [];

    raiz.querySelectorAll(".at-revelar").forEach(function (el) {
      cancelar.push(prepararRevelacaoDeTexto(el));
    });

    const grupos = raiz.querySelectorAll("[data-escalonar]");
    grupos.forEach(function (grupo) {
      cancelar.push(escalonarBlocos(grupo.querySelectorAll(".at-subir")));
    });

    cancelar.push(
      observarRevelacao(raiz.querySelectorAll(".at-revelar, .at-subir, .at-midia-revela"))
    );

    raiz.querySelectorAll(".at-marquee").forEach(function (el) {
      cancelar.push(
        criarMarquee(el, {
          tokenVelocidade: el.dataset.velocidade || "--at-marquee-velocidade",
        })
      );
    });

    raiz.querySelectorAll("[data-palco]").forEach(function (el) {
      cancelar.push(criarPalcoScrub(el));
    });

    cancelar.push(criarParalaxe(raiz.querySelectorAll(".at-parallax")));

    return function destruir() {
      cancelar.forEach(function (fn) {
        fn();
      });
    };
  });
})(window, document);
