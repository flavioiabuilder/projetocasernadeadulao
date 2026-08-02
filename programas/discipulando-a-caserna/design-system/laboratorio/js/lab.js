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
  });

  var abasRoot = document.querySelector("[data-dc-abas]");
  if (abasRoot) {
    var tabs = Array.prototype.slice.call(abasRoot.querySelectorAll('[role="tab"]'));

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
        if (next) {
          e.preventDefault();
          activateTab(next);
        }
      });
    });
  }
})();
