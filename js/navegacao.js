/**
 * Barra superior (movimentos) + sumário em overlay + progresso de leitura.
 * body.nav-sobre-navy adapta contraste ao fundo da seção ativa.
 */
(function () {
  const MOVIMENTOS = [
    {
      id: "movimento-1",
      rotulo: "Necessidade",
      romano: "I",
      secoes: ["secao-1", "secao-2", "secao-3", "secao-4"],
    },
    {
      id: "movimento-2",
      rotulo: "Resposta",
      romano: "II",
      secoes: ["secao-5", "secao-6", "secao-7"],
    },
    {
      id: "movimento-3",
      rotulo: "Programa",
      romano: "III",
      secoes: ["secao-8", "secao-9", "secao-10", "secao-11"],
    },
    {
      id: "movimento-4",
      rotulo: "Prova",
      romano: "IV",
      secoes: ["secao-12", "secao-13"],
    },
    {
      id: "movimento-5",
      rotulo: "Pedido",
      romano: "V",
      secoes: ["secao-14", "secao-15"],
    },
  ];

  function secaoEhNavy(el) {
    if (!el || !el.classList) return false;
    return (
      el.classList.contains("secao--navy") ||
      el.classList.contains("secao--navy-esc")
    );
  }

  function initNavegacao() {
    const links = Array.from(document.querySelectorAll(".indice__link"));
    const marcadores = Array.from(
      document.querySelectorAll(".barra__movimento[data-movimento]")
    );
    const barra = document.querySelector(".progresso-topo__barra");
    const progressoIndice = document.querySelector(".indice__progresso");

    const secoes = [];
    MOVIMENTOS.forEach((m) => {
      m.secoes.forEach((sid) => {
        const el = document.getElementById(sid);
        if (el) secoes.push(el);
      });
    });

    const marcosMovimento = MOVIMENTOS.map((m) => ({
      id: m.id,
      el: document.getElementById(m.id),
    })).filter((m) => m.el);

    let ticking = false;
    let ativoSecaoId = null;
    let ativoMovimentoId = null;

    function marcarMovimento(movId) {
      if (movId === ativoMovimentoId) return;
      ativoMovimentoId = movId;
      marcadores.forEach((btn) => {
        const on = btn.getAttribute("data-movimento") === movId;
        btn.classList.toggle("barra__movimento--ativo", on);
        if (on) {
          btn.setAttribute("aria-current", "true");
        } else {
          btn.removeAttribute("aria-current");
        }
      });
    }

    function atualizar() {
      ticking = false;
      const y = window.scrollY || window.pageYOffset;
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;

      if (barra) {
        barra.style.transform = "scaleX(" + pct + ")";
      }
      if (progressoIndice) {
        progressoIndice.style.transform = "scaleX(" + pct + ")";
      }

      /* Probe próximo do topo: o cabeçalho do movimento (antes da 1ª seção) conta. */
      const probe = y + Math.min(120, window.innerHeight * 0.2);

      let marcoAtual = marcosMovimento[0];
      for (let i = 0; i < marcosMovimento.length; i++) {
        if (marcosMovimento[i].el.offsetTop <= probe) {
          marcoAtual = marcosMovimento[i];
        }
      }
      if (marcoAtual) {
        marcarMovimento(marcoAtual.id);
      }

      let atual = secoes[0];
      for (let i = 0; i < secoes.length; i++) {
        if (secoes[i].offsetTop <= probe) {
          atual = secoes[i];
        }
      }
      if (!atual) return;

      document.body.classList.toggle("nav-sobre-navy", secaoEhNavy(atual));

      const id = atual.id;
      if (id === ativoSecaoId) return;
      ativoSecaoId = id;

      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const alvo = href.replace("#", "");
        const on = alvo === id;
        link.classList.toggle("indice__link--ativo", on);
        if (on) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(atualizar);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    atualizar();

    marcadores.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mid = btn.getAttribute("data-movimento");
        if (mid) marcarMovimento(mid);
      });
    });

    const toggle = document.querySelector("[data-indice-toggle]");
    const drawer = document.querySelector("[data-indice]");
    const painel = drawer && drawer.querySelector(".indice__painel");

    function fecharIndice() {
      if (!drawer) return;
      drawer.classList.remove("indice--aberto");
      document.body.classList.remove("indice-aberto");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    }

    function abrirIndice() {
      if (!drawer) return;
      drawer.classList.add("indice--aberto");
      document.body.classList.add("indice-aberto");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
      }
    }

    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        if (drawer.classList.contains("indice--aberto")) {
          fecharIndice();
        } else {
          abrirIndice();
        }
      });
    }
    if (drawer) {
      drawer.addEventListener("click", (ev) => {
        if (painel && !painel.contains(ev.target)) {
          fecharIndice();
        }
      });
    }
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") fecharIndice();
    });
    links.forEach((link) => {
      link.addEventListener("click", fecharIndice);
    });
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
  window.Caserna.MOVIMENTOS = MOVIMENTOS;
})();
