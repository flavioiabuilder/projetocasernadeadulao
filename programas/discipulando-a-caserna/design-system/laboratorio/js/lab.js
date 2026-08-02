/**
 * Laboratório DS — JS progressivo mínimo.
 * Não é runtime de produção.
 */
(function () {
  "use strict";

  var sumarioBtn = document.getElementById("sumario-btn");
  var sumarioPainel = document.getElementById("sumario-painel");

  if (sumarioBtn && sumarioPainel) {
    sumarioBtn.addEventListener("click", function () {
      var open = sumarioBtn.getAttribute("aria-expanded") === "true";
      sumarioBtn.setAttribute("aria-expanded", open ? "false" : "true");
      sumarioPainel.hidden = open;
      if (!open) {
        var first = sumarioPainel.querySelector("a");
        if (first) first.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && sumarioBtn.getAttribute("aria-expanded") === "true") {
        sumarioBtn.setAttribute("aria-expanded", "false");
        sumarioPainel.hidden = true;
        sumarioBtn.focus();
      }
    });
  }

  document.querySelectorAll("[aria-disabled='true']").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
      }
    });
  });

  /** CMP-09: uma origem — aria-valuenow sincroniza --dc-progresso */
  function setProgresso(root, now) {
    if (!root) return;
    var max = Number(root.getAttribute("aria-valuemax") || 100);
    var min = Number(root.getAttribute("aria-valuemin") || 0);
    var value = Math.max(min, Math.min(max, Number(now)));
    root.setAttribute("aria-valuenow", String(value));
    var barra = root.querySelector(".dc-progresso__barra");
    if (barra) {
      barra.style.setProperty("--dc-progresso", value + "%");
    }
  }

  var progressoDemo = document.querySelector("[data-dc-progresso]");
  if (progressoDemo) {
    setProgresso(progressoDemo, progressoDemo.getAttribute("aria-valuenow") || 40);
  }

  var abasRoot = document.querySelector("[data-dc-abas]");
  if (abasRoot) {
    var tabs = Array.prototype.slice.call(
      abasRoot.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')
    );

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
  }
})();
