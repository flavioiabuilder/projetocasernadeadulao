(function () {
  "use strict";

  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readScrollLag() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--fr-scroll-lag-segundos");
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 0.8;
  }

  /**
   * Suavização exponencial independente de framerate: a cada frame, o valor
   * atual persegue o alvo com constante de tempo `lagSeconds`. Reproduz o
   * "scrub" do GSAP ScrollTrigger (0,8s medido ao vivo em section_hero-special
   * e steps-stagger_component — P9), onde a timeline não segue o scroll 1:1,
   * ela atrasa e alcança.
   */
  function createScrollLag(lagSeconds) {
    let value = 0;
    let target = 0;
    let lastT = null;
    return {
      set(t) {
        target = t;
      },
      tick(now) {
        if (REDUCE) {
          value = target;
          return value;
        }
        if (lastT == null) {
          lastT = now;
          value = target;
          return value;
        }
        const dt = Math.max(0, (now - lastT) / 1000);
        lastT = now;
        const k = 1 - Math.exp(-dt / lagSeconds);
        value += (target - value) * k;
        return value;
      },
      get() {
        return value;
      },
    };
  }

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
    if (!pins.length) return;
    const lagSeconds = readScrollLag();

    const rigs = [...pins]
      .map((pin) => {
        const sticky = pin.querySelector("[data-fr-pin-sticky]");
        if (!sticky) return null;
        return {
          pin,
          sticky,
          atm: sticky.querySelector("[data-fr-atmosphere]"),
          lag: createScrollLag(lagSeconds),
        };
      })
      .filter(Boolean);

    function localTarget(pin) {
      const rect = pin.getBoundingClientRect();
      const range = Math.max(1, pin.offsetHeight - innerHeight);
      return Math.min(1, Math.max(0, -rect.top / range));
    }

    function apply(rig, local) {
      rig.sticky.style.setProperty("--fr-pin-p", local.toFixed(4));
      if (rig.atm) {
        // Véu escurece progressivamente no pin (P8: frame mede transição
        // escura→carmesim). A foto de fundo em si (.fr-hero-visual) é
        // estática — P9 mediu 0 variação de transform/opacity em 9 posições
        // de scroll; o "atmosfera muda" da referência é o véu, não a imagem.
        const opacity = 0.45 + local * 0.3;
        rig.atm.style.opacity = opacity.toFixed(3);
      }
    }

    function onScroll() {
      rigs.forEach((rig) => rig.lag.set(localTarget(rig.pin)));
    }

    function frame(now) {
      rigs.forEach((rig) => apply(rig, rig.lag.tick(now)));
      requestAnimationFrame(frame);
    }

    onScroll();
    rigs.forEach((rig) => apply(rig, rig.lag.get()));
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    requestAnimationFrame(frame);
  }

  function bindHeaderShrink() {
    const header = document.querySelector("[data-fr-header]");
    if (!header) return;
    const THRESHOLD = 24;
    const update = () => {
      header.dataset.frScrolled = scrollY > THRESHOLD ? "true" : "false";
    };
    update();
    addEventListener("scroll", update, { passive: true });
  }

  function init() {
    bindProgressRail();
    bindReveals();
    bindParallax();
    bindPinProgress();
    bindHeaderShrink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.FrisoMotion = { progress, init };
})();
