(() => {
  const groups = new Map();

  function walk(root, acc) {
    const stack = [root];
    while (stack.length) {
      const n = stack.pop();
      if (!n) continue;
      if (n.nodeType === 1) {
        if (n.shadowRoot) stack.push(n.shadowRoot);
        for (let i = n.childNodes.length - 1; i >= 0; i--) stack.push(n.childNodes[i]);
      } else if (n.nodeType === 3) {
        const t = n.nodeValue;
        if (t && t.trim()) acc.push(n);
      }
    }
  }

  const textNodes = [];
  walk(document.documentElement, textNodes);
  const sample =
    textNodes.length > 800
      ? textNodes.filter((_, i) => i % Math.ceil(textNodes.length / 800) === 0)
      : textNodes;

  for (const tn of sample) {
    const el = tn.parentElement;
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const cs = getComputedStyle(el);
    const size = cs.fontSize;
    const lh = cs.lineHeight;
    const ls = cs.letterSpacing;
    const key = `${size}|${lh}|${ls}`;
    let g = groups.get(key);
    if (!g) {
      g = {
        fontSize: size,
        lineHeight: lh,
        letterSpacing: ls,
        occurrences: 0,
        area: 0,
        familiesDeclared: {},
        maxLineCh: 0,
        fontsCheck: {},
      };
      groups.set(key, g);
    }
    g.occurrences += 1;
    g.area += r.width * r.height;
    const fam = cs.fontFamily;
    g.familiesDeclared[fam] = (g.familiesDeclared[fam] || 0) + 1;
    // rough ch width: width / font-size px
    const px = parseFloat(size) || 16;
    const ch = r.width / px;
    if (ch > g.maxLineCh) g.maxLineCh = ch;

    const primary = (fam.split(",")[0] || "").replace(/['"]/g, "").trim();
    if (primary && g.fontsCheck[primary] == null && document.fonts && document.fonts.check) {
      try {
        g.fontsCheck[primary] = document.fonts.check(`${cs.fontWeight} ${size} "${primary}"`);
      } catch {
        g.fontsCheck[primary] = null;
      }
    }
  }

  const list = [...groups.values()]
    .map((g) => ({
      ...g,
      area: Math.round(g.area),
      maxLineCh: Math.round(g.maxLineCh * 10) / 10,
      weight: Math.log(g.occurrences + 1) * g.area,
      topFamily: Object.entries(g.familiesDeclared).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 40)
    .map(({ familiesDeclared, weight, ...rest }) => ({
      ...rest,
      weight: Math.round(weight),
      familySamples: Object.entries(familiesDeclared)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([family, count]) => ({ family, count })),
    }));

  return {
    probe: "P7-typography",
    url: location.href,
    textNodesSampled: sample.length,
    groups: list,
    layer: "dom",
    provenance: "declarado",
  };
})()
