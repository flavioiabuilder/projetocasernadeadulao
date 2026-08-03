/**
 * Uso: avaliar com args = { fractions: [0,0.05,...,1] }
 * Em Playwright: page.evaluate(fn, fractions)
 * Em MCP evaluate_script: embutir fractions no closure via wrapper.
 */
(async (fractions) => {
  const fracs =
    fractions && fractions.length
      ? fractions
      : Array.from({ length: 21 }, (_, i) => i / 20);

  function waitFrames(n) {
    return new Promise((resolve) => {
      let left = n;
      const step = () => {
        left -= 1;
        if (left <= 0) resolve();
        else requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function visibleTextSummary() {
    const heads = [...document.querySelectorAll("h1,h2,h3,[role='heading']")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < innerHeight && r.width > 0;
      })
      .slice(0, 6)
      .map((el) => (el.innerText || el.textContent || "").trim().slice(0, 80));
    const labels = [...document.querySelectorAll("a,button,[role='button'],label")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < innerHeight && r.width > 0;
      })
      .slice(0, 8)
      .map((el) => (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40));
    return { headings: heads, labels };
  }

  function fixedSticky() {
    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      const st = getComputedStyle(el);
      if (st.position !== "fixed" && st.position !== "sticky") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom < 0 || r.top > innerHeight) continue;
      out.push({
        position: st.position,
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        className: String(el.className || "").slice(0, 80),
        w: Math.round(r.width),
        h: Math.round(r.height),
      });
      if (out.length >= 20) break;
    }
    return out;
  }

  function canvases() {
    return [...document.querySelectorAll("canvas")].map((c, i) => ({
      i,
      id: c.id || null,
      className: String(c.className || "").slice(0, 80),
      cssW: c.clientWidth,
      cssH: c.clientHeight,
      attrW: c.width,
      attrH: c.height,
    }));
  }

  function sceneGlobals() {
    const builtin =
      /^(WebGL|HTML|SVG|CSS|DOM|IDB|RTC|USB|Bluetooth|MIDI|Serial|XR|GPU|Offscreen|ImageBitmap|Canvas|Audio|Video|Media|Performance|Navigator|Screen|BarProp|History|Location|VisualViewport|IdleDeadline|Animation|Document|View|Scroll|Progress|Pointer|Touch|Keyboard|Clipboard|Credential|Payment|Lock|Storage|Cache|Cookie|FormData|Headers|Request|Response|Abort|Readable|Writable|Transform)/;
    const keys = Object.getOwnPropertyNames(window).filter(
      (k) =>
        /^(gsap|ScrollTrigger|THREE|Lenis|PIXI|OGL|barba|locomotive|lottie|anime|ScrollMagic|__THREE)/i.test(
          k,
        ) ||
        (/scene|lenis|gsap|three|progress|camera|timeline|stage/i.test(k) &&
          !builtin.test(k) &&
          !/^(scrollX|scrollY|scrollbars|onscroll)$/.test(k)),
    );
    const vals = {};
    for (const k of keys.slice(0, 30)) {
      try {
        const v = window[k];
        const t = typeof v;
        if (t === "number" || t === "string" || t === "boolean") vals[k] = v;
        else if (v && t === "object") {
          vals[k] = {
            type: (v.constructor && v.constructor.name) || "object",
            keys: Object.keys(v).slice(0, 12),
          };
        } else if (t === "function") vals[k] = "function";
      } catch {
        vals[k] = "unreadable";
      }
    }
    return vals;
  }

  function signature() {
    const bits = [];
    for (const el of document.querySelectorAll("[class],[data-state],[data-active],[aria-current],body,html")) {
      const ds = el.dataset ? JSON.stringify(el.dataset).slice(0, 120) : "";
      const cls = String(el.className || "").slice(0, 80);
      if (ds || /is-|active|open|visible|current|progress/i.test(cls)) {
        bits.push(`${el.tagName}:${cls}:${ds}`);
      }
      if (bits.length >= 40) break;
    }
    return bits;
  }

  const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const rows = [];
  let prevSig = null;

  for (const f of fracs) {
    const y = Math.round(maxScroll() * Math.min(1, Math.max(0, f)));
    scrollTo(0, y);
    await waitFrames(2);
    const sig = signature();
    const changed = prevSig
      ? sig.filter((s) => !prevSig.includes(s)).slice(0, 15)
      : sig.slice(0, 15);
    prevSig = sig;
    rows.push({
      fraction: f,
      scrollY: scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight,
      fixedSticky: fixedSticky(),
      text: visibleTextSummary(),
      classOrDataChanges: changed,
      canvases: canvases(),
      sceneGlobals: sceneGlobals(),
    });
  }

  return {
    probe: "P3-scroll-curve",
    url: location.href,
    viewport: { w: innerWidth, h: innerHeight },
    rows,
    layer: "dom+canvas",
    provenance: "medido-no-render",
  };
})
