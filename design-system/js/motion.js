/**
 * Estratos — primitivas de movimento.
 *
 * Separação deliberada de responsabilidades:
 *   tokens      → tokens.css (via Estratos.token)
 *   progresso   → funções puras em estratos.js
 *   estado      → atributos/classes no DOM
 *   renderização→ transform/opacity, nunca propriedades de layout
 *   efeitos     → funções abaixo, cada uma devolvendo um cancelador
 *   conteúdo    → HTML, que nenhuma destas funções escreve
 *
 * Toda primitiva devolve `destruir()`. Nada registra ouvinte sem devolver
 * a forma de removê-lo.
 */
(function () {
  "use strict";

  const E = window.Estratos;
  const motion = {};

  /* ============================================================
     Fatiamento de texto preservando acessibilidade
     ============================================================ */

  /**
   * Fatia o texto de um elemento em linhas animáveis.
   *
   * A referência auditada quebra o nome acessível ao fazer isto: o leitor de
   * tela passa a soletrar letra a letra. Aqui as fatias recebem aria-hidden e
   * o texto íntegro é preservado num filho .es-sr-only, de modo que a árvore
   * de acessibilidade continue lendo a frase inteira, uma única vez.
   *
   * @param {HTMLElement} el
   * @returns {() => void} restaura o conteúdo original
   */
  function fatiarLinhas(el) {
    const textoOriginal = el.textContent.replace(/\s+/g, " ").trim();
    const htmlOriginal = el.innerHTML;

    // Mede as quebras reais fatiando por palavra e observando o topo de cada uma.
    const palavras = textoOriginal.split(/\s+/).filter(Boolean);
    if (!palavras.length) return () => {};

    el.textContent = "";
    const sondas = palavras.map((palavra) => {
      const span = document.createElement("span");
      span.textContent = palavra;
      el.append(span, document.createTextNode(" "));
      return span;
    });

    const linhas = [];
    let topoAtual = null;
    for (let i = 0; i < sondas.length; i += 1) {
      const topo = sondas[i].offsetTop;
      if (topoAtual === null || topo !== topoAtual) {
        linhas.push([]);
        topoAtual = topo;
      }
      linhas[linhas.length - 1].push(palavras[i]);
    }

    el.textContent = "";

    // Cópia íntegra para tecnologia assistiva.
    const acessivel = document.createElement("span");
    acessivel.className = "es-sr-only";
    acessivel.textContent = textoOriginal;
    el.append(acessivel);

    // Fatias visuais, invisíveis à árvore de acessibilidade.
    linhas.forEach((palavrasDaLinha, indice) => {
      const linha = document.createElement("span");
      linha.className = "es-linha";
      linha.setAttribute("aria-hidden", "true");
      const interior = document.createElement("span");
      interior.className = "es-linha__interior";
      interior.style.setProperty("--es-i", String(indice));
      interior.textContent = palavrasDaLinha.join(" ");
      linha.append(interior);
      el.append(linha);
    });

    return () => {
      el.innerHTML = htmlOriginal;
    };
  }

  /* ============================================================
     Revelação
     ============================================================ */

  function revelar(el) {
    el.classList.add("is-revelado");
  }

  function ocultar(el) {
    el.classList.remove("is-revelado");
  }

  /**
   * Revela elementos [data-es-revelar] quando entram em vista.
   * Com movimento reduzido, revela tudo imediatamente e não observa nada.
   *
   * @param {ParentNode} raiz
   * @returns {() => void} cancelador
   */
  function observarRevelacao(raiz) {
    const alvos = Array.from(raiz.querySelectorAll("[data-es-revelar]"));
    if (!alvos.length) return () => {};

    if (E.movimentoReduzido() || !("IntersectionObserver" in window)) {
      alvos.forEach(revelar);
      return () => {};
    }

    alvos.forEach((el, indice) => {
      if (!el.style.getPropertyValue("--es-i")) {
        el.style.setProperty("--es-i", String(indice));
      }
    });

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            revelar(entrada.target);
            io.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    alvos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }

  /* ============================================================
     Escalonamento (stagger)
     ============================================================ */

  /**
   * Aplica índices sequenciais para o CSS escalonar os atrasos.
   * @param {Iterable<HTMLElement>} elementos
   * @param {number} inicio
   */
  function escalonar(elementos, inicio) {
    let i = inicio || 0;
    for (const el of elementos) {
      el.style.setProperty("--es-i", String(i));
      i += 1;
    }
  }

  /* ============================================================
     Paralaxe por profundidade
     ============================================================ */

  /**
   * Desloca camadas por um fator de profundidade, criando paralaxe.
   * O fator vem dos tokens de perspectiva (negativo = fundo, positivo = frente).
   *
   * @param {HTMLElement[]} camadas elementos com data-es-profundidade
   * @returns {{ aplicar: (p: number) => void }}
   */
  function criarParalaxe(camadas) {
    const itens = camadas.map((el) => ({
      el,
      fator: parseFloat(el.dataset.esProfundidade || "0"),
    }));

    return {
      /** @param {number} deslocamento em pixels do eixo condutor */
      aplicar(deslocamento) {
        for (const item of itens) {
          item.el.style.transform = `translate3d(${deslocamento * item.fator}px, 0, 0)`;
        }
      },
      limpar() {
        for (const item of itens) item.el.style.transform = "";
      },
    };
  }

  /* ============================================================
     Resposta ao ponteiro
     ============================================================ */

  /**
   * Inclina camadas conforme o ponteiro, com amortecimento.
   * Desliga em movimento reduzido e em dispositivos sem ponteiro fino.
   *
   * @param {HTMLElement} area
   * @param {HTMLElement[]} camadas
   * @returns {() => void} cancelador
   */
  function responderAoPonteiro(area, camadas) {
    if (E.movimentoReduzido() || !E.ponteiroFino()) return () => {};

    const itens = camadas.map((el) => ({
      el,
      fator: parseFloat(el.dataset.esProfundidade || "0"),
    }));

    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;

    const aoMover = (evento) => {
      const r = area.getBoundingClientRect();
      alvoX = (evento.clientX - r.left) / r.width - 0.5;
      alvoY = (evento.clientY - r.top) / r.height - 0.5;
    };

    const aoSair = () => {
      alvoX = 0;
      alvoY = 0;
    };

    area.addEventListener("pointermove", aoMover, { passive: true });
    area.addEventListener("pointerleave", aoSair, { passive: true });

    const pararLaco = E.aCadaQuadro((dt) => {
      x = E.aproximar(x, alvoX, 0.08, dt);
      y = E.aproximar(y, alvoY, 0.08, dt);
      for (const item of itens) {
        const dx = x * item.fator * 100;
        const dy = y * item.fator * 60;
        item.el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    });

    return () => {
      area.removeEventListener("pointermove", aoMover);
      area.removeEventListener("pointerleave", aoSair);
      pararLaco();
      for (const item of itens) item.el.style.transform = "";
    };
  }

  /* ============================================================
     Cursor customizado
     ============================================================ */

  /**
   * Faz o cursor seguir o ponteiro e reagir a [data-es-cursor].
   * @param {HTMLElement} cursor
   * @param {HTMLElement} area
   * @returns {() => void} cancelador
   */
  function seguirPonteiro(cursor, area) {
    if (!E.ponteiroFino()) return () => {};

    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;
    const instantaneo = E.movimentoReduzido();

    const aoMover = (evento) => {
      alvoX = evento.clientX;
      alvoY = evento.clientY;
      const acionavel = evento.target.closest("[data-es-cursor]");
      cursor.dataset.estado = acionavel ? "acionavel" : "livre";
      const rotulo = cursor.querySelector(".es-cursor__rotulo");
      if (rotulo) {
        rotulo.textContent = acionavel ? acionavel.dataset.esCursor || "" : "";
      }
    };

    area.addEventListener("pointermove", aoMover, { passive: true });

    const pararLaco = E.aCadaQuadro((dt) => {
      if (instantaneo) {
        x = alvoX;
        y = alvoY;
      } else {
        x = E.aproximar(x, alvoX, 0.2, dt);
        y = E.aproximar(y, alvoY, 0.2, dt);
      }
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    });

    return () => {
      area.removeEventListener("pointermove", aoMover);
      pararLaco();
    };
  }

  /* ============================================================
     Condução por gesto: roda, arraste e teclado
     ============================================================ */

  /**
   * Converte roda/arraste/teclado em avanço e recuo discretos.
   *
   * A referência captura o scroll nativo (body overflow:hidden) e converte
   * gesto em navegação por cena. Reproduzimos o padrão, mas sem prender o
   * usuário: Esc e Tab continuam funcionando, e o teclado é cidadão de
   * primeira classe, não um retrofit.
   *
   * @param {HTMLElement} area
   * @param {{ aoAvancar: () => void, aoRetroceder: () => void }} acoes
   * @returns {() => void} cancelador
   */
  function conduzirPorGesto(area, acoes) {
    const LIMIAR_RODA = 40;
    const LIMIAR_ARRASTE = 60;
    const INTERVALO = 520;

    let ultimoDisparo = 0;
    let acumulado = 0;
    let inicioToqueX = null;

    const podeDisparar = () => {
      const agora = performance.now();
      if (agora - ultimoDisparo < INTERVALO) return false;
      ultimoDisparo = agora;
      return true;
    };

    const disparar = (direcao) => {
      if (!podeDisparar()) return;
      acumulado = 0;
      if (direcao > 0) acoes.aoAvancar();
      else acoes.aoRetroceder();
    };

    const aoRodar = (evento) => {
      // Painéis internos roláveis mantêm o scroll nativo.
      if (evento.target.closest("[data-es-rolavel]")) return;
      evento.preventDefault();
      acumulado += evento.deltaY + evento.deltaX;
      if (Math.abs(acumulado) >= LIMIAR_RODA) disparar(Math.sign(acumulado));
    };

    const aoTocarInicio = (evento) => {
      inicioToqueX = evento.touches[0].clientX;
    };

    const aoTocarFim = (evento) => {
      if (inicioToqueX === null) return;
      const delta = inicioToqueX - evento.changedTouches[0].clientX;
      if (Math.abs(delta) >= LIMIAR_ARRASTE) disparar(Math.sign(delta));
      inicioToqueX = null;
    };

    const aoTeclar = (evento) => {
      const teclasAvanco = ["ArrowRight", "ArrowDown", "PageDown", " "];
      const teclasRecuo = ["ArrowLeft", "ArrowUp", "PageUp"];
      if (teclasAvanco.includes(evento.key)) {
        evento.preventDefault();
        acoes.aoAvancar();
      } else if (teclasRecuo.includes(evento.key)) {
        evento.preventDefault();
        acoes.aoRetroceder();
      }
    };

    area.addEventListener("wheel", aoRodar, { passive: false });
    area.addEventListener("touchstart", aoTocarInicio, { passive: true });
    area.addEventListener("touchend", aoTocarFim, { passive: true });
    area.addEventListener("keydown", aoTeclar);

    return () => {
      area.removeEventListener("wheel", aoRodar);
      area.removeEventListener("touchstart", aoTocarInicio);
      area.removeEventListener("touchend", aoTocarFim);
      area.removeEventListener("keydown", aoTeclar);
    };
  }

  /* ---------- Exportação ---------- */

  motion.fatiarLinhas = fatiarLinhas;
  motion.revelar = revelar;
  motion.ocultar = ocultar;
  motion.observarRevelacao = observarRevelacao;
  motion.escalonar = escalonar;
  // Reexportado da camada pura (matematica.js) para manter um só ponto de entrada.
  motion.criarProgresso = E.criarProgresso;
  motion.criarParalaxe = criarParalaxe;
  motion.responderAoPonteiro = responderAoPonteiro;
  motion.seguirPonteiro = seguirPonteiro;
  motion.conduzirPorGesto = conduzirPorGesto;

  E.motion = motion;
})();
