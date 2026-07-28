/**
 * Folheador da Lição 1 (seção 12) — páginas Aluno / Instrutor.
 */
(function () {
  function initFolheador() {
    const root = document.querySelector("[data-folheador]");
    if (!root) return;

    const img = root.querySelector("[data-folheador-img]");
    const rotulo = root.querySelector("[data-folheador-rotulo]");
    const prev = root.querySelector("[data-folheador-prev]");
    const next = root.querySelector("[data-folheador-next]");
    const live = root.querySelector("[data-folheador-live]");
    if (!img || !prev || !next) return;

    const paginas = Array.isArray(window.DADOS_LICAO1) ? window.DADOS_LICAO1 : [];
    if (!paginas.length) {
      if (live) {
        live.textContent = "Páginas da Lição 1 indisponíveis.";
      }
      return;
    }

    let edicao = "aluno";
    let indice = 0;

    function paginasDaEdicao() {
      return paginas.filter((p) => p.edicao === edicao);
    }

    function anunciar(lista) {
      if (!live) return;
      const p = lista[indice];
      if (!p) return;
      live.textContent =
        "Edição " +
        (edicao === "aluno" ? "do Aluno" : "do Instrutor") +
        ", página " +
        p.pagina +
        " de " +
        lista.length +
        ".";
    }

    function render() {
      const lista = paginasDaEdicao();
      if (!lista.length) return;
      if (indice >= lista.length) indice = lista.length - 1;
      if (indice < 0) indice = 0;
      const p = lista[indice];
      img.src = p.arquivo_sm || p.arquivo;
      img.srcset = p.arquivo_sm
        ? p.arquivo_sm + " 640w, " + p.arquivo + " " + p.largura + "w"
        : "";
      img.sizes = "(max-width: 700px) 90vw, 28rem";
      img.width = p.largura;
      img.height = p.altura;
      img.alt =
        "Lição 1, edição " +
        (edicao === "aluno" ? "do Aluno" : "do Instrutor") +
        ", página " +
        p.pagina;
      if (rotulo) {
        rotulo.textContent =
          (edicao === "aluno" ? "Edição do Aluno" : "Edição do Instrutor") +
          " · Página " +
          p.pagina +
          " de " +
          lista.length;
      }
      prev.disabled = indice <= 0;
      next.disabled = indice >= lista.length - 1;
      anunciar(lista);
    }

    function setEdicao(nova) {
      edicao = nova;
      indice = 0;
      root.querySelectorAll("[data-folheador-edicao]").forEach((btn) => {
        const ativo = btn.getAttribute("data-folheador-edicao") === edicao;
        btn.classList.toggle("folheador__edicao--ativa", ativo);
        btn.setAttribute("aria-pressed", ativo ? "true" : "false");
      });
      render();
    }

    root.addEventListener("click", (event) => {
      const edBtn = event.target.closest("[data-folheador-edicao]");
      if (edBtn) {
        setEdicao(edBtn.getAttribute("data-folheador-edicao"));
        return;
      }
      if (event.target.closest("[data-folheador-prev]")) {
        indice -= 1;
        render();
      } else if (event.target.closest("[data-folheador-next]")) {
        indice += 1;
        render();
      }
    });

    setEdicao("aluno");
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initFolheador = initFolheador;
})();
