/**
 * Folheador da Lição 1 — progressive enhancement do HTML completo.
 */
(function () {
  "use strict";

  function toArray(lista) {
    return Array.prototype.slice.call(lista || []);
  }

  function initRoot(root) {
    if (!root || root.getAttribute("data-folheador-inicializado") === "true") {
      return;
    }

    var regioes = toArray(root.querySelectorAll("[data-folheador-regiao]"));
    var controles = root.querySelector("[data-folheador-controles]");
    var anterior = root.querySelector("[data-folheador-prev]");
    var proxima = root.querySelector("[data-folheador-next]");
    var live = root.querySelector("[data-folheador-live]");
    var botoesEdicao = toArray(root.querySelectorAll("[data-folheador-edicao]"));
    if (!regioes.length || !controles || !anterior || !proxima) return;

    var reduzMovimento =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var edicao = regioes.some(function (regiao) {
      return regiao.getAttribute("data-folheador-regiao") === "aluno";
    })
      ? "aluno"
      : regioes[0].getAttribute("data-folheador-regiao");
    var indice = 0;

    function regiaoAtiva() {
      return regioes.find(function (regiao) {
        return regiao.getAttribute("data-folheador-regiao") === edicao;
      });
    }

    function paginasAtivas() {
      var regiao = regiaoAtiva();
      return regiao ? toArray(regiao.querySelectorAll("[data-folheador-pagina]")) : [];
    }

    function anunciar(paginas) {
      if (!live || !paginas.length) return;
      var nome = edicao === "aluno" ? "Aluno" : "Instrutor";
      live.textContent =
        "Edição do " + nome + ", página " + (indice + 1) + " de " + paginas.length;
    }

    function render() {
      var paginas = paginasAtivas();
      indice = Math.max(0, Math.min(indice, Math.max(0, paginas.length - 1)));

      regioes.forEach(function (regiao) {
        var ativa = regiao.getAttribute("data-folheador-regiao") === edicao;
        regiao.hidden = !ativa;
        toArray(regiao.querySelectorAll("[data-folheador-pagina]")).forEach(
          function (pagina, paginaIndice) {
            pagina.hidden = !ativa || paginaIndice !== indice;
            pagina.style.transition = reduzMovimento ? "none" : "opacity 180ms ease";
            pagina.style.opacity = ativa && paginaIndice === indice ? "1" : "0";
          }
        );
      });

      botoesEdicao.forEach(function (botao) {
        var ativa = botao.getAttribute("data-folheador-edicao") === edicao;
        botao.setAttribute("aria-pressed", ativa ? "true" : "false");
      });
      anterior.disabled = indice === 0;
      proxima.disabled = !paginas.length || indice === paginas.length - 1;
      anunciar(paginas);
    }

    function mudarEdicao(novaEdicao) {
      if (
        !regioes.some(function (regiao) {
          return regiao.getAttribute("data-folheador-regiao") === novaEdicao;
        })
      ) {
        return;
      }
      edicao = novaEdicao;
      indice = 0;
      render();
    }

    root.addEventListener("click", function (evento) {
      var botaoEdicao = evento.target.closest("[data-folheador-edicao]");
      if (botaoEdicao && root.contains(botaoEdicao)) {
        mudarEdicao(botaoEdicao.getAttribute("data-folheador-edicao"));
        return;
      }
      if (evento.target.closest("[data-folheador-prev]")) {
        indice -= 1;
        render();
      } else if (evento.target.closest("[data-folheador-next]")) {
        indice += 1;
        render();
      }
    });

    root.addEventListener("keydown", function (evento) {
      if (!root.contains(document.activeElement)) return;
      if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        indice -= 1;
        render();
      } else if (evento.key === "ArrowRight") {
        evento.preventDefault();
        indice += 1;
        render();
      }
    });

    root.classList.add("dc-folheador--enhanced");
    root.setAttribute("data-folheador-inicializado", "true");
    controles.hidden = false;
    render();
  }

  function initFolheador(escopo) {
    var contexto = escopo || document;
    if (contexto.matches && contexto.matches("[data-folheador]")) {
      initRoot(contexto);
      return;
    }
    toArray(contexto.querySelectorAll("[data-folheador]")).forEach(initRoot);
  }

  window.CasernaF5 = window.CasernaF5 || {};
  window.CasernaF5.initFolheador = initFolheador;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initFolheador();
    });
  } else {
    initFolheador();
  }
})();
