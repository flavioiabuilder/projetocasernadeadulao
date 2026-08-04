/**
 * Regenera report.html a partir do checks.json e raw/gates.json ATUAIS, sem
 * tocar nos portões. `cli.js gates` reseta G1-G10 (exceto G8) para
 * null/enriquecer-depois — não é seguro chamá-lo depois que os portões já
 * foram enriquecidos manualmente (sessões 2-3). Use este script sempre que
 * checks.json ou raw/gates.json mudarem e report.html precisar refletir.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const RAW = path.join(ROOT, "raw");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
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
  const lighthouse = fs.existsSync(path.join(RAW, "p11-lighthouse-summary.json"))
    ? readJson(path.join(RAW, "p11-lighthouse-summary.json"))
    : null;
  const ssim = fs.existsSync(path.join(RAW, "p10-ssim-g2-1440x900.json"))
    ? readJson(path.join(RAW, "p10-ssim-g2-1440x900.json"))
    : null;

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
    host: "playwright + chrome-devtools-mcp (sessão 3)",
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
table{border-collapse:collapse}td,th{padding:.25rem .5rem;border:1px solid var(--line);text-align:left}
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
<p class="muted">Sessões 1-3 · host Playwright (1-2) + MCP chrome-devtools (3, P9-P11)</p>
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
<p>EVIDÊNCIA (P9, MCP ao vivo): gsap 3.15.0 + ScrollTrigger, scrub 0.8 real, 9 keyframes completos, curva de assinatura <code>cubic-bezier(.491,.153,.094,.884)</code>. Curva reconstruída: pin com lag exponencial (scrub real); rail/parallax 1:1. Ver motion-system.md e DESIGN_AND_EFFECTS.md.</p>
${
  ssim
    ? `<p>G2 SSIM macro medido: <strong>${ssim.ssimMacroMean}</strong> (limiar ${ssim.threshold}) — abaixo por decisão de não reproduzir fotos/copy reais, não por falha de composição. Ver raw/p10-ssim-g2-1440x900.json.</p>`
    : ""
}
</section>
<section id="tecnica">
<h2>Técnica</h2>
<table>
<tr><th>Item</th><th>Classe</th></tr>
<tr><td>GSAP 3.15.0 / ScrollTrigger</td><td>EVIDÊNCIA (P9 ao vivo)</td></tr>
<tr><td>Plataforma</td><td>Webflow (EVIDÊNCIA, P9)</td></tr>
<tr><td>0 canvas da aplicação</td><td>EVIDÊNCIA (canvas transitório = fingerprinting de terceiro)</td></tr>
<tr><td>WebGL scene app</td><td>NÃO OBSERVADO</td></tr>
</table>
${
  lighthouse
    ? `<p>Lighthouse (P11, MCP ao vivo): Accessibility ${lighthouse.scores.accessibility}, Best Practices ${Math.round(lighthouse.scores.bestPractices)}, SEO ${lighthouse.scores.seo}, Agentic Browsing ${lighthouse.scores.agenticBrowsing}. Relatório completo em raw/lighthouse/.</p>`
    : ""
}
</section>
<section id="a11y">
<h2>Acessibilidade</h2>
<p>P6 em raw/. Correções na reconstrução: focus-visible, touch ≥44px, reduced-motion. Falhas Lighthouse da referência documentadas (não reproduzidas) em documentacao/accessibility.md.</p>
</section>
<section id="lacunas">
<h2>Lacunas</h2>
<ul>
<li>P3 refine JSON &gt;30KB — agregar numa limpeza futura</li>
<li>Trigger global de scroll (start 50, end 12339) sem scrub identificado — fora do escopo da P9</li>
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
  console.log(JSON.stringify({ out: "report.html", checks: data.checks }, null, 2));
}

writeReport();
