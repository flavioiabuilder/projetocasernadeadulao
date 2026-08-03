(function () {
  "use strict";

  function progress() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    return Math.min(1, Math.max(0, scrollY / max));
  }

  function bindProgressRail() {
    const fill = document.querySelector("[data-fr-progress]");
    if (!fill) return;
    const update = () => {
      fill.style.width = `${(progress() * 100).toFixed(2)}%`;
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
  }

  function bindReveals() {
    const nodes = document.querySelectorAll("[data-fr-reveal]");
    if (!nodes.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    nodes.forEach((n) => io.observe(n));
  }

  function bindParallax() {
    const layers = document.querySelectorAll("[data-fr-parallax]");
    if (!layers.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const p = progress();
      layers.forEach((el) => {
        const factor = Number(el.getAttribute("data-fr-parallax") || "0.15");
        const y = (p - 0.5) * 80 * factor;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
  }

  function bindPinProgress() {
    const pins = document.querySelectorAll("[data-fr-pin]");
    pins.forEach((pin) => {
      const sticky = pin.querySelector("[data-fr-pin-sticky]");
      if (!sticky) return;
      const update = () => {
        const rect = pin.getBoundingClientRect();
        const range = Math.max(1, pin.offsetHeight - innerHeight);
        const local = Math.min(1, Math.max(0, -rect.top / range));
        sticky.style.setProperty("--fr-pin-p", local.toFixed(4));
        const atm = sticky.querySelector("[data-fr-atmosphere]");
        if (atm) {
          const scale = 1.1 - local * 0.08;
          atm.style.transform = `scale(${scale.toFixed(4)})`;
        }
      };
      update();
      addEventListener("scroll", update, { passive: true });
    });
  }

  function init() {
    bindProgressRail();
    bindReveals();
    bindParallax();
    bindPinProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.FrisoMotion = { progress, init };
})();
