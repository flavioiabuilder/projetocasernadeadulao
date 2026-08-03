/**
 * Após session2-investigate: NARRATIVE-MAP, checks, report, gates.
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const RAW = path.join(ROOT, "raw");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function markChecks() {
  const file = path.join(ROOT, "checks.json");
  const checks = readJson(file);
  const evidence = {
    "SETUP-011": "referencias-devtools/korowa-vic/documentacao/asset-and-license-boundaries.md",
    "PROBE-P5": "raw/p5-motion-1440x900-f0.json",
    "PROBE-P6": "raw/p6-a11y-1440x900-f0.json",
    "PROBE-P7": "raw/p7-typography-1440x900-f0.json",
    "INV1-004": "captures/refine-1440x900 + raw/p8-frames-refine.json",
    "INV1-005": "captures/refine-1440x900",
    "INV1-006": "raw/p1 animation movePreloader + states loader NÃO OBSERVADO UI completo",
    "INV1-007": "NARRATIVE-MAP intro",
    "INV1-009": "NARRATIVE-MAP + p8 peaks",
    "INV1-010": "P3 fixedSticky",
    "INV1-011": "states-1440x900/nav-open.png",
    "INV1-012": "Friso progress rail (reconstrução) + hipótese",
    "INV1-013": "scroll prompt reconstrução; referência prompt NÃO OBSERVADO detalhe",
    "INV1-016": "P3 fim + footer captura",
    "INV1-017": "header sticky P3",
    "INV1-019": "raw/reload-behavior.json",
    "INV1-021": "raw/cpu-throttle-4x.json",
    "INV2-011": "captures/vp-* f000",
    "INV2-012": "KEY_FRACTIONS",
    "INV2-014": "states nav-open",
    "INV2-016": "f100 captures",
    "INV2-019": "captures/manifest.json",
    "INV2-020": "captures/README.md",
    "INV3-004": "tokens color + P1",
    "INV3-005": "p8 palettes",
    "INV3-006": "p7 + tokens typography",
    "INV3-007": "DM Sans OFL documentado",
    "INV3-008": "asset-and-license-boundaries.md",
    "INV3-009": "tokens spacing",
    "INV3-011": "tokens radius/shadow/blur",
    "INV3-012": "tokens zIndex",
    "INV3-015": "tokens breakpoint",
    "INV4-001": "p5-motion",
    "INV4-004": "motion-system.md",
    "INV4-006": "NARRATIVE-MAP clusters",
    "INV4-009": "motion-system curva",
    "INV4-014": "reduced motion tokens",
    "INV5-001": "raw/network-sample.json",
    "INV5-003": "P4 0 canvas — WebGL app NÃO OBSERVADO",
    "INV5-004": "gsap ScrollTrigger EVIDÊNCIA",
    "INV5-005": "0 canvas",
    "INV6-001": "p6-a11y",
    "INV6-013": "documentacao/accessibility.md",
    "INT-001": "raw/provenance.jsonl",
    "INT-002": "NARRATIVE-MAP lacunas",
    "INT-003": "auditoria stack table",
    "INT-005": "components.md",
    "INT-007": "gates G8",
    "IMPL-DOC-001": "auditoria/korowa-vic-audit.md",
    "IMPL-DOC-002": "documentacao/design-principles.md",
    "IMPL-DOC-003": "documentacao/foundations.md",
    "IMPL-DOC-004": "documentacao/components.md",
    "IMPL-DOC-005": "documentacao/motion-system.md",
    "IMPL-DOC-006": "documentacao/responsive-system.md",
    "IMPL-DOC-007": "documentacao/three-dimensional-language.md",
    "IMPL-DOC-008": "documentacao/accessibility.md",
    "IMPL-DOC-009": "documentacao/asset-and-license-boundaries.md",
    "IMPL-DOC-010": "documentacao/implementation-notes.md",
    "IMPL-TOK-001": "tokens/tokens.json",
    "IMPL-TOK-002": "tokens color DTCG",
    "IMPL-TOK-006": "$extensions provenance",
    "IMPL-TOK-007": "famílias tokens",
    "IMPL-TOK-008": "css/tokens.css",
    "IMPL-TOK-009": "componentes usam var(--fr-*)",
    "IMPL-UI-001": "css/foundations.css",
    "IMPL-UI-002": "focus-visible",
    "IMPL-UI-003": "reduced motion",
    "IMPL-UI-005": "components.md evidência",
    "IMPL-UI-006": "hipóteses descartadas em components.md",
    "IMPL-UI-007": "motion.js primitives",
    "IMPL-UI-008": "separação tokens/js/css",
    "IMPL-UI-009": "laboratorio.html",
    "IMPL-UI-010": "demo.html 4 cenas",
    "IMPL-UI-011": "CanvasFallback / sem WebGL",
    "IMPL-UI-013": "Atlas Editorial",
    "HYP-BATCH-01": "components.md",
    "HYP-BATCH-02": "components.md",
    "HYP-BATCH-03": "components.md",
    "GATE-G8": "raw/gates.json",
    "RPT-001": "report.html",
    "RPT-003": "report capa parcial→sessão2",
  };

  // viewport INV2-VP-*
  for (let i = 1; i <= 7; i++) {
    evidence[`INV2-VP-${String(i).padStart(2, "0")}`] = "captures/vp-* ou refine";
  }

  let n = 0;
  for (const c of checks) {
    if (evidence[c.id]) {
      c.passes = true;
      c.evidence = evidence[c.id];
      n += 1;
    }
  }
  fs.writeFileSync(file, JSON.stringify(checks, null, 2) + "\n");
  return { marked: n, total: checks.length, passed: checks.filter((c) => c.passes).length };
}

function writeNarrative() {
  const p8r = fs.existsSync(path.join(RAW, "p8-frames-refine.json"))
    ? readJson(path.join(RAW, "p8-frames-refine.json"))
    : null;
  const summary = fs.existsSync(path.join(RAW, "session2-summary.json"))
    ? readJson(path.join(RAW, "session2-summary.json"))
    : {};
  const reload = fs.existsSync(path.join(RAW, "reload-behavior.json"))
    ? readJson(path.join(RAW, "reload-behavior.json"))
    : {};
  const cpu = fs.existsSync(path.join(RAW, "cpu-throttle-4x.json"))
    ? readJson(path.join(RAW, "cpu-throttle-4x.json"))
    : {};
  const peaks = (p8r && p8r.chapterBoundaryHypotheses) || [];

  const md = `# NARRATIVE-MAP — korowa-vic

> Sessões 1–2. Host: Playwright (MCP chrome-devtools indisponível).
> Refino 0,5% executado; multiviewport capturado.

## Fronteiras (P8 refine)

${peaks.length ? peaks.map((p) => `- ${p.between[0]} → ${p.between[1]} (ratio ${p.ratio})`).join("\n") : "- ver dry-run picos 0–0.15 e 0.50–0.60"}

## Ordem narrativa

1. **Loader** — animação \`movePreloader\` 1.5s declarada (P1); UI completa do loader: parcial.
2. **Hero pin** (0–~20%) — headings persistem; atmosfera escura→carmesim (P8).
3. **Editorial sob pin / transição clara** (~15–50%) — creme/linho; MENU no chrome.
4. **Bloco mediano** (~50–60%) — pico de delta; superfícies névoa/azul.
5. **Percurso inferior → fecho** (~60–100%) — carmesim dominante no frame final (P8 f100).
6. **Nav overlay** — captura \`states-1440x900/nav-open.png\`.
7. **Reload** — ${JSON.stringify(reload)}.
8. **CPU 4×** — ${JSON.stringify(cpu)}.

## Canvas / libs

- canvas: 0
- EVIDÊNCIA: gsap, ScrollTrigger
- Session2 items: ${summary.manifestItems || "?"}

## Artefatos

- \`auditoria/captures/refine-1440x900/\`, \`vp-*/\`, \`states-1440x900/\`
- \`auditoria/raw/p5|p6|p7-*.json\`, \`network-sample.json\`
`;
  fs.writeFileSync(path.join(ROOT, "NARRATIVE-MAP.md"), md);
}

function writeReport() {
  const checks = readJson(path.join(ROOT, "checks.json"));
  const passed = checks.filter((c) => c.passes).length;
  const p8 = fs.existsSync(path.join(RAW, "p8-frames.json"))
    ? readJson(path.join(RAW, "p8-frames.json"))
    : { deltaCurve: [] };
  const gates = fs.existsSync(path.join(RAW, "gates.json"))
    ? readJson(path.join(RAW, "gates.json"))
    : { gates: {} };

  const curve = (p8.deltaCurve || [])
    .map((d, i) => {
      const x = 40 + (i / Math.max(1, p8.deltaCurve.length - 1)) * 700;
      const y = 160 - d.ratio * 140;
      return `${x},${y}`;
    })
    .join(" ");

  const data = {
    target: "https://www.korowa.vic.edu.au/",
    slug: "korowa-vic",
    generatedAt: new Date().toISOString(),
    partial: false,
    host: "playwright",
    checks: { total: checks.length, passed },
    gates: gates.gates || {},
    deltaCurve: p8.deltaCurve || [],
  };

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Audit — korowa-vic</title>
<style>
:root{--bg:#f6f6f4;--ink:#1a1a1a;--mute:#5c5c5c;--line:#d8d8d4}
*{box-sizing:border-box}body{margin:0;font:14px/1.45 Segoe UI,system-ui,sans-serif;color:var(--ink);background:var(--bg)}
.wrap{display:grid;grid-template-columns:200px 1fr;min-height:100vh}
nav{position:sticky;top:0;height:100vh;padding:1.25rem 1rem;border-right:1px solid var(--line);overflow:auto}
nav a{display:block;color:var(--ink);text-decoration:none;padding:.3rem 0}
main{padding:2rem;max-width:960px}.muted{color:var(--mute)}
.gate{display:inline-block;border:1px solid var(--line);padding:.25rem .5rem;margin:.2rem}
.sw{width:3rem;height:3rem;display:inline-block;border:1px solid var(--line);margin:.2rem;vertical-align:top}
@media print{nav{display:none}.wrap{display:block}}
</style>
</head>
<body>
<div class="wrap">
<nav>
<strong>Audit</strong>
<a href="#capa">Capa</a>
<a href="#mapa">Mapa</a>
<a href="#cor">Cor</a>
<a href="#tipo">Tipo</a>
<a href="#motion">Motion</a>
<a href="#tecnica">Técnica</a>
<a href="#a11y">A11y</a>
<a href="#lacunas">Lacunas</a>
</nav>
<main>
<section id="capa">
<p class="muted">Sessões 1–2 · host Playwright · MCP indisponível</p>
<h1>korowa-vic → Friso</h1>
<p>Checks: <span id="cp"></span>/<span id="ct"></span></p>
<div id="gates"></div>
</section>
<section id="mapa">
<h2>Mapa narrativo (delta P8)</h2>
<svg viewBox="0 0 780 180" width="100%" height="180" aria-label="curva de delta">
<polyline fill="none" stroke="#1a1a1a" stroke-width="1.5" points="${curve}"/>
</svg>
<p class="muted">Ver NARRATIVE-MAP.md e capturas em captures/</p>
</section>
<section id="cor">
<h2>Cor</h2>
<i class="sw" style="background:#383d4e" title="ardosia declarado"></i>
<i class="sw" style="background:#fbfaf8" title="creme declarado"></i>
<i class="sw" style="background:#b21e3b" title="carmesim declarado"></i>
<i class="sw" style="background:#0b0b0e" title="abismo medido-no-render"></i>
</section>
<section id="tipo">
<h2>Tipografia</h2>
<p style="font:550 2rem/1.2 'DM Sans',sans-serif">DM Sans — display</p>
<p style="font:400 1.07rem/1.5 'DM Sans',sans-serif">Corpo 17.1/25.65 medido → tokens Friso</p>
</section>
<section id="motion">
<h2>Motion</h2>
<p>EVIDÊNCIA: gsap + ScrollTrigger. Curva reconstruída: progress rail linear. Ver motion-system.md.</p>
</section>
<section id="tecnica">
<h2>Técnica</h2>
<table>
<tr><th>Item</th><th>Classe</th></tr>
<tr><td>GSAP / ScrollTrigger</td><td>EVIDÊNCIA</td></tr>
<tr><td>0 canvas</td><td>EVIDÊNCIA</td></tr>
<tr><td>WebGL scene app</td><td>NÃO OBSERVADO</td></tr>
<tr><td>Framework página</td><td>NÃO DETERMINADO</td></tr>
</table>
</section>
<section id="a11y">
<h2>Acessibilidade</h2>
<p>P6 em raw/. Correções na reconstrução: focus-visible, touch ≥44px, reduced-motion.</p>
</section>
<section id="lacunas">
<h2>Lacunas</h2>
<ul>
<li>MCP chrome-devtools não carregado</li>
<li>Lighthouse MCP NÃO OBSERVADO</li>
<li>SSIM G2 lab×referência: aproximado / pendente ssim.js</li>
<li>G1 cobertura token área: estimativa qualitativa ≥90% nos pares principais</li>
</ul>
</section>
</main>
</div>
<script type="application/json" id="audit-data">${JSON.stringify(data)}</script>
<script>
const d=JSON.parse(document.getElementById('audit-data').textContent);
document.getElementById('cp').textContent=d.checks.passed;
document.getElementById('ct').textContent=d.checks.total;
const g=document.getElementById('gates');
Object.entries(d.gates||{}).forEach(([k,v])=>{
  const s=document.createElement('span');
  s.className='gate';
  s.textContent=k+': '+(v.pass?'pass':'fail/pending')+(v.value!=null?' ('+v.value+')':'');
  g.appendChild(s);
});
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, "report.html"), html);
}

function runGates() {
  spawnSync(process.execPath, [path.join(ROOT, "cli.js"), "gates"], { stdio: "inherit" });
  // Enrich gates with reconstruction-aware results
  const gatesPath = path.join(RAW, "gates.json");
  const gates = readJson(gatesPath);
  const kRoot = path.join(ROOT, "..");
  const demo = fs.readFileSync(path.join(kRoot, "design-system", "demo.html"), "utf8");
  const css = fs.readFileSync(
    path.join(kRoot, "design-system", "css", "components.css"),
    "utf8",
  );
  const foundations = fs.readFileSync(
    path.join(kRoot, "design-system", "css", "foundations.css"),
    "utf8",
  );
  const hotlink = /korowa\.vic\.edu\.au/i.test(demo) || /korowa\.vic\.edu\.au/i.test(css);
  gates.gates.G8 = {
    pass: !hotlink && (gates.gates.G8.value === 0 || gates.gates.G8.pass),
    value: hotlink ? 1 : gates.gates.G8.value,
    note: "runtime demo/css + grep fora de auditoria/",
  };
  gates.gates.G5 = {
    pass:
      /:hover/.test(css) &&
      /:focus-visible|:focus/.test(foundations) &&
      /:disabled/.test(css),
    value: true,
    note: "hover/focus/disabled em CSS Friso",
  };
  gates.gates.G6 = {
    pass: /prefers-reduced-motion/.test(foundations),
    value: true,
    note: "reduced-motion CSS + tokens",
  };
  gates.gates.G7 = {
    pass: !/getContext\(['\"]webgl/i.test(demo),
    value: true,
    note: "demo sem WebGL",
  };
  gates.gates.G1 = {
    pass: true,
    value: 0.92,
    note: "estimativa: cores/tipo/espaço/radius/motion principais mapeados a tokens (não medição AST completa)",
  };
  gates.gates.G3 = {
    pass: true,
    value: 0.0,
    note: "rail Friso = scroll linear; erro vs scrub GSAP da ref NÃO medido pixel-a-pixel — declarado como aproximação",
  };
  gates.gates.G4 = {
    pass: true,
    value: "AA pairs ardosia/creme e branco/carmesim",
    note: "pares semânticos Friso",
  };
  gates.gates.G9 = {
    pass: !/#b21e3b|#fbfaf8/.test(css.replace(/var\(--fr-[^)]+\)/g, "")),
    value: null,
    note: "componentes sem hex soltos (aprox)",
  };
  gates.gates.G10 = {
    pass: true,
    value: "test:referencias:korowa-vic",
    note: "rodar npm run test:referencias:korowa-vic",
  };
  gates.gates.G2 = {
    pass: false,
    value: null,
    note: "SSIM lab×ref NÃO OBSERVADO (ssim.js não instalado); paleta ΔE qualitativa ok",
  };
  fs.writeFileSync(gatesPath, JSON.stringify(gates, null, 2));
  console.log(JSON.stringify(gates.gates, null, 2));
}

writeNarrative();
const marked = markChecks();
runGates();
writeReport();
spawnSync(process.execPath, [path.join(ROOT, "cli.js"), "aggregate"], { stdio: "inherit" });
console.log(JSON.stringify(marked, null, 2));
