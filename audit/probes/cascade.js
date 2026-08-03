(() => {
  const customProperties = [];
  const mediaQueries = [];
  const containerQueries = [];
  const fontFaces = [];
  const keyframes = [];
  const properties = [];
  const layers = [];
  const errors = [];

  function scopeFromRule(rule, sheetHref) {
    const parts = [];
    let r = rule;
    while (r) {
      if (r.media && r.media.mediaText) parts.push(`@media ${r.media.mediaText}`);
      if (r.conditionText && r.constructor && /Container/.test(r.constructor.name)) {
        parts.push(`@container ${r.conditionText}`);
      }
      if (r.conditionText && r.constructor && /Supports/.test(r.constructor.name)) {
        parts.push(`@supports ${r.conditionText}`);
      }
      if (r.name != null && /Layer/.test((r.constructor && r.constructor.name) || "")) {
        parts.push(`@layer ${r.name || "(anonymous)"}`);
      }
      r = r.parentRule;
    }
    parts.reverse();
    return { nest: parts, sheet: sheetHref || "inline" };
  }

  function scanStyleSheet(sheet) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      errors.push({ sheet: sheet.href || "inline", error: String(e && e.message) });
      return;
    }
    if (!rules) return;
    walkRules(rules, sheet.href || document.location.href);
  }

  function walkRules(rules, sheetHref) {
    for (const rule of rules) {
      const type = rule.type;
      const name = (rule.constructor && rule.constructor.name) || "";
      if (type === CSSRule.STYLE_RULE || name === "CSSStyleRule") {
        const sel = rule.selectorText || "";
        const style = rule.style;
        for (let i = 0; i < style.length; i++) {
          const prop = style[i];
          if (prop && prop.startsWith("--")) {
            customProperties.push({
              name: prop,
              value: style.getPropertyValue(prop).trim().slice(0, 120),
              selector: sel.slice(0, 160),
              ...scopeFromRule(rule, sheetHref),
            });
          }
        }
      } else if (type === CSSRule.MEDIA_RULE || name === "CSSMediaRule") {
        mediaQueries.push({ media: rule.media.mediaText, sheet: sheetHref });
        if (rule.cssRules) walkRules(rule.cssRules, sheetHref);
      } else if (name === "CSSContainerRule") {
        containerQueries.push({ condition: rule.conditionText, sheet: sheetHref });
        if (rule.cssRules) walkRules(rule.cssRules, sheetHref);
      } else if (type === CSSRule.SUPPORTS_RULE || name === "CSSSupportsRule") {
        if (rule.cssRules) walkRules(rule.cssRules, sheetHref);
      } else if (type === CSSRule.FONT_FACE_RULE || name === "CSSFontFaceRule") {
        const s = rule.style;
        fontFaces.push({
          family: (s.getPropertyValue("font-family") || "").replace(/['"]/g, ""),
          src: (s.getPropertyValue("src") || "").slice(0, 200),
          weight: s.getPropertyValue("font-weight") || null,
          style: s.getPropertyValue("font-style") || null,
          stretch: s.getPropertyValue("font-stretch") || null,
          unicodeRange: s.getPropertyValue("unicode-range") || null,
          display: s.getPropertyValue("font-display") || null,
          sheet: sheetHref,
        });
      } else if (type === CSSRule.KEYFRAMES_RULE || name === "CSSKeyframesRule") {
        const frames = [];
        for (const fr of rule.cssRules || []) {
          const decls = {};
          for (let i = 0; i < fr.style.length; i++) {
            const p = fr.style[i];
            decls[p] = fr.style.getPropertyValue(p);
          }
          frames.push({ keyText: fr.keyText, decls });
        }
        keyframes.push({ name: rule.name, frames, sheet: sheetHref });
      } else if (name === "CSSLayerBlockRule" || name === "CSSLayerStatementRule") {
        layers.push({
          kind: name,
          name: rule.name || null,
          nameList: rule.nameList ? [...rule.nameList] : null,
          sheet: sheetHref,
        });
        if (rule.cssRules) walkRules(rule.cssRules, sheetHref);
      } else if (name === "CSSPropertyRule") {
        properties.push({
          name: rule.name,
          syntax: rule.syntax,
          inherits: rule.inherits,
          initialValue: rule.initialValue,
          sheet: sheetHref,
        });
      } else if (rule.cssRules) {
        walkRules(rule.cssRules, sheetHref);
      }
    }
  }

  for (const sheet of document.styleSheets) scanStyleSheet(sheet);
  if (document.adoptedStyleSheets) {
    for (const sheet of document.adoptedStyleSheets) scanStyleSheet(sheet);
  }

  // Dedup media list (keep unique media strings)
  const mediaUnique = [...new Set(mediaQueries.map((m) => m.media))].slice(0, 80).map((media) => ({ media }));
  const containerUnique = [...new Set(containerQueries.map((c) => c.condition))]
    .slice(0, 40)
    .map((condition) => ({ condition }));

  // Cap custom props by unique name+selector
  const seen = new Set();
  const caps = [];
  for (const cp of customProperties) {
    const k = `${cp.name}|${cp.selector}|${cp.nest.join(",")}`;
    if (seen.has(k)) continue;
    seen.add(k);
    caps.push(cp);
    if (caps.length >= 200) break;
  }

  const kfSlim = keyframes.slice(0, 20).map((k) => ({
    name: k.name,
    frameCount: (k.frames || []).length,
    props: [
      ...new Set(
        (k.frames || []).flatMap((fr) => Object.keys(fr.decls || {})).slice(0, 12),
      ),
    ].slice(0, 12),
    sheet: k.sheet,
  }));

  return {
    probe: "P2-cascade",
    url: location.href,
    customProperties: caps.slice(0, 80).map((c) => ({
      name: c.name,
      value: String(c.value).slice(0, 60),
      selector: String(c.selector).slice(0, 80),
      nest: c.nest,
    })),
    mediaQueries: mediaUnique.slice(0, 40),
    containerQueries: containerUnique.slice(0, 20),
    fontFaces: fontFaces.slice(0, 30).map((f) => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      display: f.display,
      unicodeRange: f.unicodeRange,
      srcHost: (f.src.match(/https?:\/\/([^/"']+)/) || [])[1] || "local/data",
    })),
    keyframes: kfSlim,
    propertyRules: properties.slice(0, 20),
    layers: layers.slice(0, 30),
    crossOriginBlocked: errors.length,
    errors: errors.slice(0, 5),
    layer: "dom",
    provenance: "declarado",
  };
})()
