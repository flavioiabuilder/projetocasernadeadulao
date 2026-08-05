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
          tint: sticky.querySelector("[data-fr-hero-tint]"),
          lag: createScrollLag(lagSeconds),
        };
      })
      .filter(Boolean);

    function localTarget(pin) {
      const rect = pin.getBoundingClientRect();
      const range = Math.max(1, pin.offsetHeight - innerHeight);
      return Math.min(1, Math.max(0, -rect.top / range));
    }

    /**
     * P14 — medido ao vivo na referência (dispatch de scroll real +
     * `anim.getChildren()` da timeline do GSAP em section_hero-special):
     * a timeline por trás do "scrub 0.8, duração 0.5" tem 2 tweens, não 1:
     *   1. `.hero-special_bg-visual-wrapper` → scale 1.02→1.2, ease "none"
     *      (linear) — é isso que dá o "leve zoom".
     *   2. `.image_scroll-overlay` (entre back e front no z-index) →
     *      opacity 0→1, ease "power3.out" — cobre a camada de trás com um
     *      tingimento (carmesim/tema, ΔE~70%), a de frente fica por cima e
     *      ilesa. Efeito visual: "back some, front dá zoom" — são 2 tweens
     *      diferentes, não 1.
     * `power3.out` = 1 - (1-t)^3.
     */
    function apply(rig, local) {
      rig.sticky.style.setProperty("--fr-pin-p", local.toFixed(4));
      if (rig.atm) {
        const scale = 1.02 + local * 0.18;
        rig.atm.style.transform = `scale(${scale.toFixed(4)})`;
      }
      if (rig.tint) {
        const eased = 1 - (1 - local) ** 3;
        rig.tint.style.opacity = eased.toFixed(3);
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

  function readPointerAmp() {
    const cs = getComputedStyle(document.documentElement);
    const px = (name, fallback) => {
      const n = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(n) ? n : fallback;
    };
    return {
      lagSeconds: (() => {
        const n = parseFloat(cs.getPropertyValue("--fr-cursor-lag-segundos"));
        return Number.isFinite(n) && n > 0 ? n : 0.08;
      })(),
      ampX: px("--fr-cursor-amp-frente-x", 6.8),
      ampY: px("--fr-cursor-amp-frente-y", 3.2),
      backMultiplier: px("--fr-cursor-multiplicador-fundo", 2),
    };
  }

  /**
   * Parallax por cursor (P13 — medido ao vivo com dispatch real de mousemove
   * no hero-special_bg-visual da referência): as camadas se deslocam na
   * direção OPOSTA ao cursor, proporcional à distância ao centro do
   * viewport. Camada de trás = 2x a de frente, sempre. Suave e rápido
   * (~20-25ms medidos) — muito mais ágil que o lag de scroll (0.8s), porque
   * resposta ao cursor precisa parecer imediata.
   */
  function bindCursorParallax() {
    const layers = document.querySelectorAll("[data-fr-cursor-parallax]");
    if (!layers.length) return;
    if (REDUCE) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const { lagSeconds, ampX, ampY } = readPointerAmp();
    const rigs = [...layers].map((el) => ({
      el,
      multiplier: Number(el.getAttribute("data-fr-cursor-parallax")) || 1,
      lagX: createScrollLag(lagSeconds),
      lagY: createScrollLag(lagSeconds),
    }));

    function onMove(e) {
      const nx = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const ny = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      rigs.forEach((rig) => {
        rig.lagX.set(-nx * ampX * rig.multiplier);
        rig.lagY.set(-ny * ampY * rig.multiplier);
      });
    }

    function frame(now) {
      rigs.forEach((rig) => {
        const x = rig.lagX.tick(now);
        const y = rig.lagY.tick(now);
        rig.el.style.transform = `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0) scale(1.1)`;
      });
      requestAnimationFrame(frame);
    }

    addEventListener("mousemove", onMove, { passive: true });
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
    bindCursorParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.FrisoMotion = { progress, init };
})();
