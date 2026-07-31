/**
 * Ponto de entrada: navegação, revelação e interações.
 */
(function () {
  function init() {
    if (!window.Caserna) return;
    if (window.Caserna.initNavegacao) window.Caserna.initNavegacao();
    if (window.Caserna.initRevelar) window.Caserna.initRevelar();
    if (window.Caserna.initMarca) window.Caserna.initMarca();
    if (window.Caserna.initMatriz) window.Caserna.initMatriz();
    if (window.Caserna.initAnatomia) window.Caserna.initAnatomia();
    if (window.Caserna.initEdicoes) window.Caserna.initEdicoes();
    if (window.Caserna.initEncontro) window.Caserna.initEncontro();
    if (window.Caserna.initFolheador) window.Caserna.initFolheador();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
