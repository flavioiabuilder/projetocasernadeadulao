(() => {
  function contrastRatio(fg, bg) {
    const lum = (rgb) => {
      const s = rgb.map((c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
    };
    const L1 = lum(fg);
    const L2 = lum(bg);
    const light = Math.max(L1, L2);
    const dark = Math.min(L1, L2);
    return (light + 0.05) / (dark + 0.05);
  }

  function parseColor(str) {
    if (!str) return null;
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    const a = m[4] == null ? 1 : Number(m[4]);
    if (a < 0.05) return null;
    return [Number(m[1]), Number(m[2]), Number(m[3]), a];
  }

  function composite(fg, bg) {
    const a = fg[3];
    return [
      Math.round(fg[0] * a + bg[0] * (1 - a)),
      Math.round(fg[1] * a + bg[1] * (1 - a)),
      Math.round(fg[2] * a + bg[2] * (1 - a)),
    ];
  }

  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,[role='heading']")].map(
    (el) => ({
      level: el.getAttribute("aria-level") || el.tagName.replace(/\D/g, "") || null,
      text: (el.innerText || "").trim().slice(0, 100),
    }),
  );

  const landmarks = [...document.querySelectorAll("header,nav,main,footer,aside,[role]")].map(
    (el) => ({
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute("role"),
      name: el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || null,
    }),
  ).slice(0, 40);

  const focusableSel =
    'a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])';
  const focusables = [...document.querySelectorAll(focusableSel)].slice(0, 80).map((el) => {
    const name =
      el.getAttribute("aria-label") ||
      el.getAttribute("alt") ||
      (el.innerText || "").trim().slice(0, 60) ||
      el.getAttribute("title") ||
      el.getAttribute("name") ||
      el.tagName;
    return { tag: el.tagName.toLowerCase(), name, tabIndex: el.tabIndex };
  });

  // focus-visible sample on first button/link
  let focusVisible = null;
  const probeEl = document.querySelector("a[href],button");
  if (probeEl) {
    try {
      probeEl.focus({ preventScroll: true });
      const cs = getComputedStyle(probeEl);
      focusVisible = {
        outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
        outlineOffset: cs.outlineOffset,
        boxShadow: cs.boxShadow,
        target: probeEl.tagName.toLowerCase(),
      };
      probeEl.blur();
    } catch {
      focusVisible = { error: "focus failed" };
    }
  }

  const canvases = [...document.querySelectorAll("canvas")].map((c) => ({
    id: c.id || null,
    ariaLabel: c.getAttribute("aria-label"),
    role: c.getAttribute("role"),
    altChild: (c.textContent || "").trim().slice(0, 80),
  }));
  const audio = [...document.querySelectorAll("audio")].map((a) => ({
    controls: a.hasAttribute("controls"),
    ariaLabel: a.getAttribute("aria-label"),
    tracks: a.querySelectorAll("track").length,
  }));

  const contrastPairs = [];
  for (const el of [...document.querySelectorAll("p,h1,h2,h3,h4,li,a,button,span,label")].slice(
    0,
    120,
  )) {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    const cs = getComputedStyle(el);
    const fg = parseColor(cs.color);
    let bg = parseColor(cs.backgroundColor);
    let node = el.parentElement;
    while ((!bg || bg[3] < 0.05) && node) {
      bg = parseColor(getComputedStyle(node).backgroundColor);
      node = node.parentElement;
    }
    if (!fg || !bg) continue;
    const composed = composite(fg, [bg[0], bg[1], bg[2], 1]);
    const ratio = contrastRatio([fg[0], fg[1], fg[2]], composed);
    contrastPairs.push({
      text: (el.innerText || "").trim().slice(0, 40),
      fg: cs.color,
      bg: `rgb(${composed.join(",")})`,
      ratio: Math.round(ratio * 100) / 100,
      fontSize: cs.fontSize,
    });
    if (contrastPairs.length >= 40) break;
  }

  const smallTouch = [];
  for (const el of document.querySelectorAll("a,button,input,summary,[role='button']")) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
      smallTouch.push({
        tag: el.tagName.toLowerCase(),
        w: Math.round(r.width),
        h: Math.round(r.height),
        name: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40),
      });
    }
    if (smallTouch.length >= 30) break;
  }

  const mqlReduce = matchMedia("(prefers-reduced-motion: reduce)");
  const mqlContrast = matchMedia("(prefers-contrast: more)");
  let reducedMotionRules = 0;
  let contrastRules = 0;
  try {
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules || []) {
        if (rule.media && /prefers-reduced-motion/i.test(rule.media.mediaText)) reducedMotionRules += 1;
        if (rule.media && /prefers-contrast/i.test(rule.media.mediaText)) contrastRules += 1;
      }
    }
  } catch {
    /* ignore */
  }

  return {
    probe: "P6-a11y",
    url: location.href,
    headings: headings.slice(0, 40),
    landmarks,
    focusOrder: focusables,
    focusVisible,
    canvasAlternatives: canvases,
    audioAlternatives: audio,
    contrastPairs,
    touchBelow44: smallTouch,
    prefersReducedMotion: {
      matches: mqlReduce.matches,
      mediaRuleCount: reducedMotionRules,
    },
    prefersContrast: {
      matches: mqlContrast.matches,
      mediaRuleCount: contrastRules,
    },
    layer: "dom",
    provenance: "declarado",
  };
})()
