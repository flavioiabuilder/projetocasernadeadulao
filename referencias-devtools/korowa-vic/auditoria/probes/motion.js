(() => {
  function sel(el) {
    if (!el || el.nodeType !== 1) return "non-element";
    if (el.id) return `#${CSS.escape(el.id)}`;
    const tag = el.tagName.toLowerCase();
    const cls = el.classList && el.classList[0] ? `.${CSS.escape(el.classList[0])}` : "";
    return `${tag}${cls}`;
  }

  const running = [];
  let animations = [];
  try {
    animations = document.getAnimations({ subtree: true });
  } catch {
    try {
      animations = document.getAnimations();
    } catch {
      animations = [];
    }
  }

  for (const anim of animations.slice(0, 80)) {
    let timing = {};
    let keyframes = [];
    try {
      timing = anim.effect && anim.effect.getTiming ? anim.effect.getTiming() : {};
    } catch {
      timing = {};
    }
    try {
      keyframes =
        anim.effect && anim.effect.getKeyframes ? anim.effect.getKeyframes().slice(0, 8) : [];
    } catch {
      keyframes = [];
    }
    const kfSlim = keyframes.map((k) => {
      const o = {};
      for (const [key, val] of Object.entries(k)) {
        if (key === "offset" || key === "easing" || key === "composite") o[key] = val;
        else if (typeof val === "string" || typeof val === "number") o[key] = val;
      }
      return o;
    });
    running.push({
      playState: anim.playState,
      composite: anim.effect && anim.effect.composite,
      target: sel(anim.effect && anim.effect.target),
      timing: {
        duration: timing.duration,
        delay: timing.delay,
        iterations: timing.iterations,
        direction: timing.direction,
        easing: timing.easing,
        fill: timing.fill,
      },
      keyframes: kfSlim,
    });
  }

  // Declared transition/animation from computed styles (sample)
  const declared = { transition: {}, animation: {} };
  const nodes = [...document.querySelectorAll("body *")].slice(0, 1500);
  for (const el of nodes) {
    const cs = getComputedStyle(el);
    const td = cs.transitionDuration || "";
    const tn = cs.transitionProperty || "";
    if (td && td !== "0s" && tn && tn !== "none") {
      const key = `${tn}|${td}|${cs.transitionTimingFunction}|${cs.transitionDelay}`;
      declared.transition[key] = (declared.transition[key] || 0) + 1;
    }
    const an = cs.animationName || "";
    const ad = cs.animationDuration || "";
    if (an && an !== "none" && ad && ad !== "0s") {
      const key = `${an}|${ad}|${cs.animationTimingFunction}|${cs.animationDelay}`;
      declared.animation[key] = (declared.animation[key] || 0) + 1;
    }
  }

  const top = (obj, n) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([value, count]) => ({ value, count }));

  // GSAP / ScrollTrigger — same surface used in soul-church audits
  // (ScrollTrigger.getAll + globalTimeline). WAAPI alone misses scrub/pin.
  const gsapPresent = typeof window.gsap !== "undefined";
  const stPresent = typeof window.ScrollTrigger !== "undefined";
  let gsapInventory = {
    present: gsapPresent,
    scrollTriggerPresent: stPresent,
    version: gsapPresent && window.gsap.version ? window.gsap.version : null,
    scrollTriggerVersion:
      stPresent && window.ScrollTrigger.version ? window.ScrollTrigger.version : null,
    triggers: [],
    tweens: [],
    note: null,
  };

  if (gsapPresent && stPresent) {
    try {
      const triggers = window.ScrollTrigger.getAll();
      gsapInventory.triggers = triggers.slice(0, 60).map((t) => {
        const anim = t.animation;
        let tweenSummary = null;
        if (anim) {
          const vars = anim.vars || {};
          const props = {};
          for (const [k, v] of Object.entries(vars)) {
            if (
              k === "ease" ||
              k === "duration" ||
              k === "delay" ||
              k === "stagger" ||
              k === "immediateRender" ||
              typeof v === "number" ||
              typeof v === "string" ||
              typeof v === "boolean"
            ) {
              props[k] = v;
            }
          }
          tweenSummary = {
            duration: typeof anim.duration === "function" ? anim.duration() : anim._dur,
            delay: typeof anim.delay === "function" ? anim.delay() : anim._delay,
            totalDuration:
              typeof anim.totalDuration === "function" ? anim.totalDuration() : null,
            targets: (() => {
              try {
                const ts = typeof anim.targets === "function" ? anim.targets() : [];
                return (ts || []).slice(0, 6).map(sel);
              } catch {
                return [];
              }
            })(),
            vars: props,
          };
        }
        return {
          id: t.vars && t.vars.id != null ? t.vars.id : t.id || null,
          trigger: sel(t.trigger),
          start: t.start,
          end: t.end,
          scrub: t.vars ? t.vars.scrub : null,
          pin: !!(t.pin || (t.vars && t.vars.pin)),
          pinSpacing: t.vars ? t.vars.pinSpacing : null,
          toggleActions: t.vars ? t.vars.toggleActions : null,
          once: t.vars ? t.vars.once : null,
          progress: typeof t.progress === "number" ? Number(t.progress.toFixed(4)) : null,
          direction: t.direction,
          isActive: !!t.isActive,
          animation: tweenSummary,
        };
      });
      gsapInventory.triggerCount = triggers.length;
      // Duplicate-trigger smell (soul-church: 8 ST for 4 elements)
      const byTrigger = {};
      for (const row of gsapInventory.triggers) {
        const k = row.trigger;
        byTrigger[k] = (byTrigger[k] || 0) + 1;
      }
      gsapInventory.duplicateTriggerSelectors = Object.entries(byTrigger)
        .filter(([, n]) => n > 1)
        .map(([selector, count]) => ({ selector, count }));
    } catch (e) {
      gsapInventory.note = `ScrollTrigger.getAll failed: ${e && e.message}`;
    }
  }

  if (gsapPresent) {
    try {
      const children = window.gsap.globalTimeline.getChildren(true, true, true);
      gsapInventory.tweens = children.slice(0, 80).map((tw) => {
        const vars = tw.vars || {};
        const slim = {};
        for (const [k, v] of Object.entries(vars)) {
          if (k === "scrollTrigger") {
            slim.scrollTrigger = {
              trigger:
                v && v.trigger != null
                  ? typeof v.trigger === "string"
                    ? v.trigger
                    : sel(v.trigger)
                  : null,
              start: v && v.start,
              end: v && v.end,
              scrub: v && v.scrub,
              pin: v && v.pin,
              toggleActions: v && v.toggleActions,
            };
            continue;
          }
          if (
            k === "ease" ||
            k === "duration" ||
            k === "delay" ||
            k === "stagger" ||
            k === "repeat" ||
            k === "yoyo" ||
            typeof v === "number" ||
            typeof v === "string" ||
            typeof v === "boolean"
          ) {
            slim[k] = v;
          }
        }
        let targets = [];
        try {
          targets = (typeof tw.targets === "function" ? tw.targets() : []).slice(0, 6).map(sel);
        } catch {
          targets = [];
        }
        return {
          duration: typeof tw.duration === "function" ? tw.duration() : null,
          delay: typeof tw.delay === "function" ? tw.delay() : null,
          paused: !!tw.paused && tw.paused(),
          targets,
          vars: slim,
        };
      });
      gsapInventory.tweenCount = children.length;
    } catch (e) {
      gsapInventory.note = [gsapInventory.note, `globalTimeline failed: ${e && e.message}`]
        .filter(Boolean)
        .join("; ");
    }
  } else if (!gsapPresent) {
    gsapInventory.note =
      "gsap ausente no window (bundler/scope possível — ausência NÃO prova ausência)";
  }

  return {
    probe: "P5-motion",
    url: location.href,
    runningCount: running.length,
    running,
    declaredIdleOrReady: {
      transitionTop: top(declared.transition, 30),
      animationTop: top(declared.animation, 30),
    },
    gsap: gsapInventory,
    distinction:
      "running = getAnimations() agora; declared* = computed style mesmo ocioso; gsap = ScrollTrigger.getAll + globalTimeline (EVIDÊNCIA runtime)",
    layer: "dom",
    provenance: "declarado",
  };
})()
