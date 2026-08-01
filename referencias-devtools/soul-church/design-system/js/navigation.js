/**
 * Átrio — navegação global, painel contextual, carrossel e transição.
 *
 * O gesto central do sistema: o gatilho não ABRE um menu, ele VIRA o menu.
 * A pílula do cabeçalho e o painel são o mesmo plano; o que muda é o
 * recorte. Ver navigation-and-page-transitions.md.
 *
 * Correções deliberadas em relação à referência (documentadas em
 * accessibility.md): gatilho é <button> com aria-expanded, o foco entra no
 * painel e volta ao gatilho, o fundo fica inerte, Escape fecha em todos os
 * overlays e clique fora fecha o painel.
 */
(function (window, document) {
  "use strict";

  const A = window.Atrio;
  const nav = {};

  /* ============================================================
     Menu global
     ============================================================ */

  function criarMenu(raiz) {
    const gatilho = raiz.querySelector("[data-menu-gatilho]");
    const painel = raiz.querySelector("[data-menu]");
    if (!gatilho || !painel) return function () {};

    const conteudoDeFundo = Array.prototype.slice.call(
      raiz.querySelectorAll("[data-inertizavel]")
    );

    let aberto = false;
    let soltarFoco = null;
    let soltarRolagem = null;
    let idFechamento = 0;

    painel.hidden = true;
    painel.dataset.estado = "fechado";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-modal", "true");
    gatilho.setAttribute("aria-expanded", "false");
    if (!gatilho.getAttribute("aria-controls") && painel.id) {
      gatilho.setAttribute("aria-controls", painel.id);
    }

    function abrir() {
      if (aberto) return;
      aberto = true;
      window.clearTimeout(idFechamento);

      painel.hidden = false;
      // Um quadro para o navegador registrar o estado inicial do clip-path,
      // senão a transição não roda (o elemento vinha de display:none).
      window.requestAnimationFrame(function () {
        painel.dataset.estado = "aberto";
      });

      gatilho.setAttribute("aria-expanded", "true");
      soltarRolagem = A.bloquearRolagem();
      soltarFoco = A.prenderFoco(painel, { inertizar: conteudoDeFundo });
      A.anunciar("Menu aberto");
    }

    function fechar() {
      if (!aberto) return;
      aberto = false;

      painel.dataset.estado = "fechado";
      gatilho.setAttribute("aria-expanded", "false");

      if (soltarFoco) {
        soltarFoco();
        soltarFoco = null;
      }
      if (soltarRolagem) {
        soltarRolagem();
        soltarRolagem = null;
      }

      // Esperar a transição terminar antes de esconder de fato, para que o
      // recorte seja visto fechando. O tempo vem do token, não de um literal.
      const espera = A.duracao("--at-dur-menu") || 0;
      idFechamento = window.setTimeout(function () {
        if (!aberto) painel.hidden = true;
      }, espera);

      A.anunciar("Menu fechado");
    }

    function alternar() {
      if (aberto) fechar();
      else abrir();
    }

    function aoTeclar(evento) {
      if (evento.key === "Escape" && aberto) {
        evento.preventDefault();
        fechar();
      }
    }

    // Navegar para dentro do site deve fechar o menu antes de sair.
    function aoClicarNoPainel(evento) {
      const link = evento.target.closest("a[href]");
      if (link) fechar();
    }

    gatilho.addEventListener("click", alternar);
    document.addEventListener("keydown", aoTeclar);
    painel.addEventListener("click", aoClicarNoPainel);

    return function destruir() {
      window.clearTimeout(idFechamento);
      gatilho.removeEventListener("click", alternar);
      document.removeEventListener("keydown", aoTeclar);
      painel.removeEventListener("click", aoClicarNoPainel);
      if (soltarFoco) soltarFoco();
      if (soltarRolagem) soltarRolagem();
      painel.hidden = true;
      painel.dataset.estado = "fechado";
      gatilho.setAttribute("aria-expanded", "false");
    };
  }

  /* ============================================================
     Painel contextual
     ============================================================ */

  /**
   * Painel de contato/oração acionado pela barra persistente.
   *
   * Padrão pastoral relevante: um caminho de contato sempre alcançável, sem
   * obrigar a pessoa a encontrar a página certa. Aqui ele é um diálogo real,
   * com título associado, foco preso e clique fora fechando.
   */
  function criarPainel(raiz) {
    const gatilho = raiz.querySelector("[data-painel-gatilho]");
    const veu = raiz.querySelector("[data-painel]");
    if (!gatilho || !veu) return function () {};

    const painel = veu.querySelector(".at-painel") || veu;
    const fechar_ = veu.querySelector("[data-painel-fechar]");
    const conteudoDeFundo = Array.prototype.slice.call(
      raiz.querySelectorAll("[data-inertizavel]")
    );

    let aberto = false;
    let soltarFoco = null;
    let soltarRolagem = null;
    let idFechamento = 0;

    veu.hidden = true;
    veu.dataset.estado = "fechado";
    painel.setAttribute("role", "dialog");
    painel.setAttribute("aria-modal", "true");
    gatilho.setAttribute("aria-expanded", "false");

    function abrir() {
      if (aberto) return;
      aberto = true;
      window.clearTimeout(idFechamento);
      veu.hidden = false;
      window.requestAnimationFrame(function () {
        veu.dataset.estado = "aberto";
      });
      gatilho.setAttribute("aria-expanded", "true");
      soltarRolagem = A.bloquearRolagem();
      soltarFoco = A.prenderFoco(painel, { inertizar: conteudoDeFundo });
    }

    function fechar() {
      if (!aberto) return;
      aberto = false;
      veu.dataset.estado = "fechado";
      gatilho.setAttribute("aria-expanded", "false");
      if (soltarFoco) {
        soltarFoco();
        soltarFoco = null;
      }
      if (soltarRolagem) {
        soltarRolagem();
        soltarRolagem = null;
      }
      const espera = A.duracao("--at-dur-media") || 0;
      idFechamento = window.setTimeout(function () {
        if (!aberto) veu.hidden = true;
      }, espera);
    }

    function aoTeclar(evento) {
      if (evento.key === "Escape" && aberto) {
        evento.preventDefault();
        fechar();
      }
    }

    function aoClicarNoVeu(evento) {
      if (evento.target === veu) fechar();
    }

    gatilho.addEventListener("click", abrir);
    if (fechar_) fechar_.addEventListener("click", fechar);
    document.addEventListener("keydown", aoTeclar);
    veu.addEventListener("click", aoClicarNoVeu);

    return function destruir() {
      window.clearTimeout(idFechamento);
      gatilho.removeEventListener("click", abrir);
      if (fechar_) fechar_.removeEventListener("click", fechar);
      document.removeEventListener("keydown", aoTeclar);
      veu.removeEventListener("click", aoClicarNoVeu);
      if (soltarFoco) soltarFoco();
      if (soltarRolagem) soltarRolagem();
      veu.hidden = true;
      veu.dataset.estado = "fechado";
    };
  }

  /* ============================================================
     Assuntos do painel (acordeão)
     ============================================================ */

  /** Um assunto aberto por vez, com aria-expanded e região controlada. */
  function criarAssuntos(raiz) {
    const botoes = Array.prototype.slice.call(raiz.querySelectorAll("[data-assunto]"));
    if (!botoes.length) return function () {};

    function alvoDe(botao) {
      return raiz.querySelector("#" + botao.getAttribute("aria-controls"));
    }

    botoes.forEach(function (botao) {
      const alvo = alvoDe(botao);
      botao.setAttribute("aria-expanded", "false");
      if (alvo) alvo.hidden = true;
    });

    function aoClicar(evento) {
      const botao = evento.currentTarget;
      const jaAberto = botao.getAttribute("aria-expanded") === "true";
      botoes.forEach(function (outro) {
        const alvo = alvoDe(outro);
        outro.setAttribute("aria-expanded", "false");
        if (alvo) alvo.hidden = true;
      });
      if (!jaAberto) {
        const alvo = alvoDe(botao);
        botao.setAttribute("aria-expanded", "true");
        if (alvo) {
          alvo.hidden = false;
          const primeiro = alvo.querySelector(A.SELETOR_FOCAVEL);
          if (primeiro) primeiro.focus({ preventScroll: true });
        }
      }
    }

    botoes.forEach(function (botao) {
      botao.addEventListener("click", aoClicar);
    });

    return function destruir() {
      botoes.forEach(function (botao) {
        botao.removeEventListener("click", aoClicar);
        botao.setAttribute("aria-expanded", "false");
      });
    };
  }

  /* ============================================================
     Carrossel
     ============================================================ */

  /**
   * Carrossel de rolagem nativa com controles reais.
   *
   * Decisão: a pista é um contêiner com scroll-snap, não um transform.
   * Isso dá arraste por toque, roda do mouse, teclado e leitura linear de
   * graça — e é por isso que nenhuma biblioteca de slider foi instalada.
   * Os controles apenas empurram a rolagem.
   */
  function criarCarrossel(container) {
    const pista = container.querySelector("[data-carrossel-pista]");
    if (!pista) return function () {};

    const anterior = container.querySelector("[data-carrossel-anterior]");
    const proximo = container.querySelector("[data-carrossel-proximo]");
    const pontos = Array.prototype.slice.call(
      container.querySelectorAll("[data-carrossel-ponto]")
    );
    const itens = Array.prototype.slice.call(pista.children);

    function passo() {
      const primeiro = itens[0];
      if (!primeiro) return pista.clientWidth;
      const estilo = window.getComputedStyle(pista);
      const gap = parseFloat(estilo.columnGap || estilo.gap) || 0;
      return primeiro.getBoundingClientRect().width + gap;
    }

    function indiceAtual() {
      const p = passo();
      return p > 0 ? Math.round(pista.scrollLeft / p) : 0;
    }

    function sincronizar() {
      const i = indiceAtual();
      pontos.forEach(function (ponto, j) {
        ponto.setAttribute("aria-current", j === i ? "true" : "false");
      });
      if (anterior) anterior.disabled = pista.scrollLeft <= 1;
      if (proximo) {
        proximo.disabled = pista.scrollLeft >= pista.scrollWidth - pista.clientWidth - 1;
      }
    }

    function irPara(i) {
      pista.scrollTo({
        left: i * passo(),
        behavior: A.movimentoReduzido() ? "auto" : "smooth",
      });
    }

    function aoAnterior() {
      irPara(Math.max(0, indiceAtual() - 1));
    }

    function aoProximo() {
      irPara(Math.min(itens.length - 1, indiceAtual() + 1));
    }

    function aoClicarPonto(evento) {
      irPara(pontos.indexOf(evento.currentTarget));
    }

    // Teclado: setas movem a pista quando ela própria tem o foco.
    function aoTeclar(evento) {
      if (evento.key === "ArrowRight") {
        evento.preventDefault();
        aoProximo();
      } else if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        aoAnterior();
      }
    }

    if (anterior) anterior.addEventListener("click", aoAnterior);
    if (proximo) proximo.addEventListener("click", aoProximo);
    pontos.forEach(function (ponto) {
      ponto.addEventListener("click", aoClicarPonto);
    });
    pista.addEventListener("scroll", sincronizar, { passive: true });
    pista.addEventListener("keydown", aoTeclar);

    /*
     * A pista é focável para que as setas do teclado funcionem. O papel de
     * grupo NÃO é aplicado aqui: a pista é uma <ul>, e sobrescrever seu
     * papel de lista deixaria os <li> órfãos na árvore acessível. Quem
     * carrega a semântica de carrossel é o contêiner, no HTML.
     */
    pista.tabIndex = 0;

    sincronizar();

    return function destruir() {
      if (anterior) anterior.removeEventListener("click", aoAnterior);
      if (proximo) proximo.removeEventListener("click", aoProximo);
      pontos.forEach(function (ponto) {
        ponto.removeEventListener("click", aoClicarPonto);
      });
      pista.removeEventListener("scroll", sincronizar);
      pista.removeEventListener("keydown", aoTeclar);
    };
  }

  /* ============================================================
     Transição de página
     ============================================================ */

  /**
   * Anuncia o destino durante a navegação.
   *
   * A referência faz navegação real com um plano que escala cobrindo a tela
   * e mostra o nome da página de destino. O princípio é bom: a transição
   * informa PARA ONDE se está indo. Preservado, com três correções:
   *   - `prefers-reduced-motion` pula a animação e navega direto;
   *   - a navegação acontece mesmo se a animação falhar (timeout de guarda);
   *   - modificadores de teclado, botão do meio e alvo externo passam batido.
   */
  function criarTransicao(raiz) {
    const overlay = raiz.querySelector("[data-transicao]");
    if (!overlay) return function () {};

    const rotulo = overlay.querySelector("[data-transicao-rotulo]");
    overlay.setAttribute("aria-hidden", "true");

    // Entrada: se a página foi carregada vinda de uma saída, encolher.
    overlay.dataset.estado = "saindo";

    function aoClicar(evento) {
      if (
        evento.defaultPrevented ||
        evento.button !== 0 ||
        evento.metaKey ||
        evento.ctrlKey ||
        evento.shiftKey ||
        evento.altKey
      ) {
        return;
      }
      const link = evento.target.closest("a[href]");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(href)) {
        return;
      }
      let destino;
      try {
        destino = new window.URL(link.href, window.location.href);
      } catch (_erro) {
        // href não parseável: deixa o navegador resolver do jeito dele.
        return;
      }
      if (destino.origin !== window.location.origin) return;

      if (A.movimentoReduzido()) return;

      evento.preventDefault();
      if (rotulo) {
        rotulo.textContent = link.dataset.transicaoRotulo || link.textContent.trim();
      }
      overlay.dataset.estado = "entrando";

      const espera = A.duracao("--at-dur-transicao-pagina") || 0;
      window.setTimeout(function () {
        window.location.href = destino.href;
      }, espera);
    }

    document.addEventListener("click", aoClicar);

    return function destruir() {
      document.removeEventListener("click", aoClicar);
    };
  }

  /* ============================================================
     Montagem
     ============================================================ */

  nav.criarMenu = criarMenu;
  nav.criarPainel = criarPainel;
  nav.criarAssuntos = criarAssuntos;
  nav.criarCarrossel = criarCarrossel;
  nav.criarTransicao = criarTransicao;

  A.navigation = nav;

  A.registrar("navigation", function (raiz) {
    const cancelar = [
      criarMenu(raiz),
      criarPainel(raiz),
      criarAssuntos(raiz),
      criarTransicao(raiz),
    ];

    raiz.querySelectorAll("[data-carrossel]").forEach(function (el) {
      cancelar.push(criarCarrossel(el));
    });

    return function destruir() {
      cancelar.forEach(function (fn) {
        fn();
      });
    };
  });
})(window, document);
