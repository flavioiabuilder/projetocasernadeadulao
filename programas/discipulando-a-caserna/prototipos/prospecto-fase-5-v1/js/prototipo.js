/**
 * Candidato Fase 5 — progressive enhancement.
 * Sem este arquivo: sumário via <details>, todos os painéis da matriz legíveis.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setProgresso(root, now) {
    if (!root) return;
    var max = Number(root.getAttribute("aria-valuemax") || 100);
    var min = Number(root.getAttribute("aria-valuemin") || 0);
    var value = Math.max(min, Math.min(max, Number(now)));
    root.setAttribute("aria-valuenow", String(value));
    var barra = root.querySelector(".dc-progresso__barra");
    if (barra) barra.style.setProperty("--dc-progresso", value + "%");
  }

  var progresso = document.querySelector("[data-dc-progresso]");
  function atualizarProgresso() {
    if (!progresso) return;
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    var pct = maxScroll <= 0 ? 0 : Math.round((window.scrollY / maxScroll) * 100);
    setProgresso(progresso, pct);
  }

  if (progresso) {
    setProgresso(progresso, 0);
    window.addEventListener("scroll", atualizarProgresso, { passive: true });
    window.addEventListener("resize", atualizarProgresso, { passive: true });
  }

  var sumarioPe = document.getElementById("sumario-pe");
  var sumarioBtn = document.getElementById("sumario-btn");
  var sumarioPainel = document.getElementById("sumario-painel");

  function fecharSumario() {
    if (sumarioPe) sumarioPe.open = false;
  }

  function focarDestino(hash) {
    if (!hash || hash.charAt(0) !== "#") return;
    var alvo = document.getElementById(hash.slice(1));
    if (!alvo) return;
    var labelled = alvo.getAttribute("aria-labelledby");
    if (labelled) {
      var heading = document.getElementById(labelled);
      if (heading) alvo = heading;
    } else if (alvo.matches("h1, h2, h3, h4, h5, h6") === false) {
      var nested = alvo.querySelector("h1, h2, h3, h4, h5, h6");
      if (nested) alvo = nested;
    }
    if (!alvo.hasAttribute("tabindex")) {
      alvo.setAttribute("tabindex", "-1");
    }
    alvo.focus({ preventScroll: true });
  }

  if (sumarioPe && sumarioBtn && sumarioPainel) {
    sumarioPe.addEventListener("toggle", function () {
      sumarioBtn.setAttribute("aria-expanded", sumarioPe.open ? "true" : "false");
      if (sumarioPe.open) {
        var first = sumarioPainel.querySelector("a");
        if (first) first.focus();
      }
    });
    sumarioBtn.setAttribute("aria-expanded", sumarioPe.open ? "true" : "false");

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sumarioPe.open) {
        fecharSumario();
        sumarioBtn.focus();
      }
    });

    sumarioPainel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href") || "";
        if (href.charAt(0) !== "#") return;
        e.preventDefault();
        fecharSumario();
        var el = document.getElementById(href.slice(1));
        if (el) {
          el.scrollIntoView({ block: "start" });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
        window.requestAnimationFrame(function () {
          focarDestino(href);
        });
      });
    });
  }

  document.querySelectorAll("[aria-disabled='true']").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") e.preventDefault();
    });
  });

  document.querySelectorAll("[data-dc-abas]").forEach(function (abasRoot) {
    var tabs = Array.prototype.slice.call(
      abasRoot.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
    );
    var panels = Array.prototype.slice.call(abasRoot.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      tab.focus();
    }

    // Ativação automática (APG): setas selecionam e mostram o painel.
    var selected = tabs.find(function (t) {
      return t.getAttribute("aria-selected") === "true";
    });
    if (selected) {
      activateTab(selected);
    } else if (tabs[0]) {
      activateTab(tabs[0]);
    } else {
      panels.forEach(function (p, i) {
        p.hidden = i !== 0;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activateTab(tab);
          return;
        }
        if (next) {
          e.preventDefault();
          activateTab(next);
        }
      });
    });
  });

  if (!reduceMotion) {
    document.documentElement.classList.add("dc-motion-ok");
  }
})();
