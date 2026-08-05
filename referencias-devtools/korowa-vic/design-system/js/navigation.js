(function () {
  "use strict";

  function initNav() {
    const toggle = document.querySelector("[data-fr-nav-toggle]");
    const nav = document.querySelector("[data-fr-nav]");
    if (!toggle || !nav) return;

    const setOpen = (open) => {
      nav.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        const first = nav.querySelector("a,button");
        if (first) first.focus({ preventScroll: true });
      } else {
        toggle.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(nav.dataset.open !== "true");
    });

    nav.addEventListener("click", (e) => {
      if (e.target === nav || e.target.closest("a")) setOpen(false);
    });

    addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function initLoader() {
    const loader = document.querySelector("[data-fr-loader]");
    if (!loader) return;

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      loader.setAttribute("data-done", "true");
    };

    const onWipeEnd = (e) => {
      if (e.animationName !== "fr-loader-wipe") return;
      loader.setAttribute("data-gone", "true");
      loader.setAttribute("aria-hidden", "true");
      loader.removeAttribute("aria-live");
    };
    loader.addEventListener("animationend", onWipeEnd);

    // Referência: animações CSS com delay 0.8s a partir do mount; disparamos
    // assim que o documento está pronto (não espera networkidle).
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
      start();
    }
    // Fallback se animationend não disparar (reduced-motion / falha).
    setTimeout(() => {
      start();
      loader.setAttribute("data-gone", "true");
      loader.setAttribute("aria-hidden", "true");
    }, 3200);
  }

  function init() {
    initNav();
    initLoader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
