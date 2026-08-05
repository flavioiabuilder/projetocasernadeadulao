/**
 * Laboratório DS / brand book DaC — demos dc-*, nav current, reveal.
 * Não é runtime de produção.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce) {
    document.documentElement.classList.add("enhance-reveal");
  }

  // Mark current nav item from pathname
  var path = (window.location.pathname || "").replace(/\\/g, "/");
  var file = path.split("/").pop() || "index.html";
  document.querySelectorAll(".lab-nav a[href]").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var target = href.split("/").pop();
    if (target === file || (file === "" && target === "index.html")) {
      a.setAttribute("aria-current", "page");
    }
  });

  // Scroll reveal
  if (!reduce && "IntersectionObserver" in window) {
    var nodes = document.querySelectorAll("[data-reveal]");
    nodes.forEach(function (el) {
      el.classList.add("lab-reveal");
      var i = el.getAttribute("data-i");
      if (i != null) el.style.setProperty("--reveal-i", i);
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  // Motion demo replay
  document.querySelectorAll("[data-replay-enter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-replay-enter");
      var box = sel ? document.querySelector(sel) : null;
      if (!box) return;
      box.classList.remove("is-enter");
      void box.offsetWidth;
      if (!reduce) box.classList.add("is-enter");
    });
  });

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
