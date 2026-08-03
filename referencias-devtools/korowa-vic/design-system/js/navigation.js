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
    const finish = () => loader.setAttribute("data-done", "true");
    if (document.readyState === "complete") {
      setTimeout(finish, 400);
    } else {
      addEventListener("load", () => setTimeout(finish, 400));
    }
    // fallback
    setTimeout(finish, 2200);
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
