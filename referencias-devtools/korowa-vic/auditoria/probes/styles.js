(() => {
  const FAMILIES = {
    color: ["color"],
    background: ["background-color", "background-image"],
    gradient: ["background-image"],
    border: ["border-top-width", "border-top-style", "border-top-color", "border-right-width", "border-bottom-width", "border-left-width"],
    radius: ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"],
    outline: ["outline-width", "outline-style", "outline-color", "outline-offset"],
    shadow: ["box-shadow", "text-shadow"],
    filter: ["filter"],
    backdropFilter: ["backdrop-filter", "-webkit-backdrop-filter"],
    mixBlendMode: ["mix-blend-mode"],
    typography: ["font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "text-transform", "text-decoration-line", "font-variation-settings"],
    spacing: ["margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left"],
    gap: ["gap", "row-gap", "column-gap"],
    layout: ["display", "position", "flex-direction", "justify-content", "align-items", "grid-template-columns", "grid-template-rows", "float"],
    dimension: ["width", "height", "max-width", "min-width", "max-height", "min-height"],
    opacity: ["opacity"],
    zIndex: ["z-index"],
    overflow: ["overflow", "overflow-x", "overflow-y"],
    cursor: ["cursor"],
    transition: ["transition-property", "transition-duration", "transition-timing-function", "transition-delay"],
    animation: ["animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-iteration-count"],
    transform: ["transform"],
    perspective: ["perspective", "perspective-origin"],
    containerType: ["container-type", "container-name"],
  };

  const NONE = new Set(["", "none", "normal", "auto", "static", "rgba(0, 0, 0, 0)", "transparent", "0px", "0s", "0", "visible", "stretch", "start", "baseline"]);

  function cssPath(el) {
    if (!el || el.nodeType !== 1) return "unknown";
    if (el.id) return `#${CSS.escape(el.id)}`;
    const tag = el.tagName.toLowerCase();
    const cls = (el.classList && [...el.classList].slice(0, 2).map((c) => `.${CSS.escape(c)}`).join("")) || "";
    const parent = el.parentElement;
    if (!parent) return tag + cls;
    const idx = [...parent.children].indexOf(el) + 1;
    return `${cssPath(parent)} > ${tag}${cls}:nth-child(${idx})`.split(" > ").slice(-3).join(" > ");
  }

  function walk(root, out) {
    const nodes = [];
    const stack = [root];
    while (stack.length) {
      const n = stack.pop();
      if (!n) continue;
      if (n.nodeType === 1) {
        nodes.push(n);
        if (n.shadowRoot) stack.push(n.shadowRoot);
        const ch = n.children || [];
        for (let i = ch.length - 1; i >= 0; i--) stack.push(ch[i]);
      } else if (n.nodeType === 11) {
        const ch = n.children || [];
        for (let i = ch.length - 1; i >= 0; i--) stack.push(ch[i]);
      }
    }
    return nodes;
  }

  const buckets = {};
  for (const k of Object.keys(FAMILIES)) buckets[k] = new Map();

  function bump(family, value, el, area) {
    if (value == null) return;
    const v = String(value).trim();
    if (!v || NONE.has(v)) return;
    if (family === "gradient" && !/gradient\(/i.test(v)) return;
    if (family === "background" && /gradient\(/i.test(v)) return;
    const map = buckets[family];
    let rec = map.get(v);
    if (!rec) {
      rec = { value: v, occurrences: 0, nodes: 0, area: 0, selectors: [] };
      map.set(v, rec);
    }
    rec.occurrences += 1;
    rec.nodes += 1;
    rec.area += area;
    if (rec.selectors.length < 3) {
      const sel = cssPath(el);
      if (!rec.selectors.includes(sel)) rec.selectors.push(sel);
    }
  }

  const all = walk(document.documentElement);
  const maxNodes = 4000;
  const sample = all.length > maxNodes ? all.filter((_, i) => i % Math.ceil(all.length / maxNodes) === 0) : all;

  for (const el of sample) {
    let rect;
    try {
      rect = el.getBoundingClientRect();
    } catch {
      continue;
    }
    const area = Math.max(0, rect.width) * Math.max(0, rect.height);
    let cs;
    try {
      cs = getComputedStyle(el);
    } catch {
      continue;
    }
    for (const [family, props] of Object.entries(FAMILIES)) {
      if (family === "typography") {
        const trio = props.map((p) => cs.getPropertyValue(p) || cs[p]).join(" | ");
        bump(family, trio, el, area);
        continue;
      }
      if (family === "border" || family === "radius" || family === "spacing" || family === "transition" || family === "animation" || family === "outline") {
        const compound = props.map((p) => `${p}:${cs.getPropertyValue(p) || cs[p]}`).join(";");
        bump(family, compound, el, area);
        continue;
      }
      for (const p of props) {
        bump(family, cs.getPropertyValue(p) || cs[p], el, area);
      }
    }
  }

  const families = {};
  for (const [family, map] of Object.entries(buckets)) {
    const arr = [...map.values()].map((r) => ({
      ...r,
      weight: Math.log(r.occurrences + 1) * r.area,
    }));
    arr.sort((a, b) => b.weight - a.weight);
    families[family] = arr.slice(0, 20).map(({ value, occurrences, nodes, area, selectors, weight }) => ({
      value: String(value).slice(0, 160),
      occurrences,
      nodes,
      area: Math.round(area),
      selectors: selectors.map((s) => s.slice(0, 80)),
      weight: Math.round(weight),
    }));
  }

  // Encolhe até ~28KB se necessário
  let payload = {
    probe: "P1-styles",
    url: location.href,
    viewport: { w: innerWidth, h: innerHeight },
    sampledNodes: sample.length,
    totalNodes: all.length,
    families,
    layer: "dom",
    provenance: "declarado",
  };
  let json = JSON.stringify(payload);
  if (json.length > 28000) {
    for (const k of Object.keys(payload.families)) {
      payload.families[k] = payload.families[k].slice(0, 12);
    }
    json = JSON.stringify(payload);
  }
  if (json.length > 28000) {
    for (const k of Object.keys(payload.families)) {
      payload.families[k] = payload.families[k].slice(0, 8).map((r) => ({
        v: r.value.slice(0, 80),
        n: r.occurrences,
        a: r.area,
        w: r.weight,
      }));
    }
    payload.trimmed = true;
  }
  return payload;
})()
