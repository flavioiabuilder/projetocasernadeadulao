#!/usr/bin/env node
/**
 * CLI do harness: probe | frames | aggregate | report | gates
 * Windows: node referencias-devtools/korowa-vic/auditoria/cli.js <cmd>
 * Unix: ./referencias-devtools/korowa-vic/auditoria/init.sh <cmd>
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname);
const REPO_ROOT = path.resolve(ROOT, "..", "..", "..");
const AUDIT_REL = "referencias-devtools/korowa-vic/auditoria";
const PROBES = {
  styles: "styles.js",
  cascade: "cascade.js",
  "scroll-curve": "scroll-curve.js",
  canvas: "canvas.js",
  motion: "motion.js",
  a11y: "a11y.js",
  typography: "typography.js",
  frames: "frames.js",
  p1: "styles.js",
  p2: "cascade.js",
  p3: "scroll-curve.js",
  p4: "canvas.js",
  p5: "motion.js",
  p6: "a11y.js",
  p7: "typography.js",
  p8: "frames.js",
};

function usage() {
  console.log(`Usage: node ${AUDIT_REL}/cli.js <probe|frames|aggregate|report|gates> [args]
  probe <nome>   Imprime sonda pronta para evaluate_script (P1–P7)
  frames         Roda P8 (pixelmatch) — args: --dir --out
  aggregate      Consolida auditoria/raw/*.json → auditoria/raw/agg.json
  report         Gera auditoria/report.html
  gates          Avalia portões G1–G10 com números disponíveis`);
}

function cmdProbe(name) {
  if (!name || !PROBES[name]) {
    console.error(
      "Sondas:",
      Object.keys(PROBES)
        .filter((k) => !/^p\d$/i.test(k))
        .join(", "),
    );
    process.exit(1);
  }
  const file = path.join(ROOT, "probes", PROBES[name]);
  if (PROBES[name] === "frames.js") {
    console.log(
      `// P8 é Node — use: node ${AUDIT_REL}/cli.js frames --dir <captures> --out <json>`,
    );
    process.exit(0);
  }
  process.stdout.write(fs.readFileSync(file, "utf8"));
}

function cmdFrames(argv) {
  const script = path.join(ROOT, "probes", "frames.js");
  const r = spawnSync(process.execPath, [script, ...argv], { stdio: "inherit" });
  process.exit(r.status || 0);
}

function cmdAggregate() {
  const rawDir = path.join(ROOT, "raw");
  const files = fs.existsSync(rawDir)
    ? fs.readdirSync(rawDir).filter((f) => f.endsWith(".json") && f !== "agg.json")
    : [];
  const agg = {
    generatedAt: new Date().toISOString(),
    files: [],
    probes: {},
    sizes: {},
  };
  for (const f of files) {
    const p = path.join(rawDir, f);
    const text = fs.readFileSync(p, "utf8");
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      agg.files.push({ file: f, error: "invalid json" });
      continue;
    }
    const bytes = Buffer.byteLength(text);
    agg.files.push({ file: f, bytes, probe: data.probe || null });
    agg.sizes[f] = bytes;
    const key = data.probe || f;
    agg.probes[key] = data;
  }
  const out = path.join(rawDir, "agg.json");
  fs.writeFileSync(out, JSON.stringify(agg, null, 2));
  console.log(JSON.stringify({ out, fileCount: files.length, sizes: agg.sizes }, null, 2));
}

function cmdReport() {
  const aggPath = path.join(ROOT, "raw", "agg.json");
  const checksPath = path.join(ROOT, "checks.json");
  const gatesPath = path.join(ROOT, "raw", "gates.json");
  const agg = fs.existsSync(aggPath) ? JSON.parse(fs.readFileSync(aggPath, "utf8")) : {};
  const checks = fs.existsSync(checksPath)
    ? JSON.parse(fs.readFileSync(checksPath, "utf8"))
    : [];
  const gates = fs.existsSync(gatesPath)
    ? JSON.parse(fs.readFileSync(gatesPath, "utf8"))
    : {};
  const passed = checks.filter((c) => c.passes).length;
  const data = {
    target: "https://www.korowa.vic.edu.au/",
    slug: "korowa-vic",
    generatedAt: new Date().toISOString(),
    partial: false,
    host: "playwright",
    checks: { total: checks.length, passed },
    gates: gates.gates || null,
    aggSummary: {
      files: agg.files || [],
      sizes: agg.sizes || {},
    },
  };
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Audit report — korowa-vic</title>
<style>
:root { --bg:#f6f6f4; --ink:#1a1a1a; --mute:#5c5c5c; --line:#d8d8d4; }
* { box-sizing:border-box; }
body { margin:0; font:14px/1.45 "Segoe UI", system-ui, sans-serif; color:var(--ink); background:var(--bg); }
.wrap { display:grid; grid-template-columns:220px 1fr; min-height:100vh; }
nav { position:sticky; top:0; height:100vh; padding:1.5rem 1rem; border-right:1px solid var(--line); }
nav a { display:block; color:var(--ink); text-decoration:none; padding:.35rem 0; }
main { padding:2rem; max-width:920px; }
h1,h2 { font-weight:600; letter-spacing:-0.02em; }
.muted { color:var(--mute); }
.gate { display:inline-block; padding:.2rem .5rem; border:1px solid var(--line); margin:.2rem; }
@media print { nav { display:none; } .wrap { display:block; } }
</style>
</head>
<body>
<div class="wrap">
<nav>
  <strong>Audit</strong>
  <a href="#capa">Capa</a>
  <a href="#mapa">Mapa</a>
  <a href="#tecnica">Técnica</a>
  <a href="#lacunas">Lacunas</a>
</nav>
<main>
<section id="capa">
  <p class="muted">Harness em referencias-devtools/korowa-vic/auditoria/</p>
  <h1>korowa-vic → Friso</h1>
  <p>Checks: <span id="check-pass"></span> / <span id="check-total"></span></p>
  <div id="gates"></div>
</section>
<section id="mapa">
  <h2>Mapa narrativo</h2>
  <p class="muted">Ver <code>NARRATIVE-MAP.md</code> e curva P8 em raw/.</p>
</section>
<section id="tecnica">
  <h2>Técnica</h2>
  <p>Host de injeção: Playwright quando MCP ausente. Artefatos só nesta pasta de referência.</p>
</section>
<section id="lacunas">
  <h2>Lacunas</h2>
  <p>Ver NARRATIVE-MAP.md e progress.md.</p>
</section>
</main>
</div>
<script type="application/json" id="audit-data">${JSON.stringify(data)}</script>
<script>
const data = JSON.parse(document.getElementById('audit-data').textContent);
document.getElementById('check-pass').textContent = data.checks.passed;
document.getElementById('check-total').textContent = data.checks.total;
const g=document.getElementById('gates');
Object.entries(data.gates||{}).forEach(([k,v])=>{
  const s=document.createElement('span');
  s.className='gate';
  s.textContent=k+': '+(v.pass?'pass':'fail/pending');
  g.appendChild(s);
});
</script>
</body>
</html>`;
  const out = path.join(ROOT, "report.html");
  fs.writeFileSync(out, html, "utf8");
  console.log(JSON.stringify({ out, checks: data.checks }, null, 2));
}

function isAuditDir(p) {
  const norm = p.split(path.sep).join("/");
  return norm.includes("referencias-devtools/korowa-vic/auditoria");
}

function cmdGates() {
  const checks = JSON.parse(fs.readFileSync(path.join(ROOT, "checks.json"), "utf8"));
  const hits = [];
  const walk = (dir) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (ent.name === "node_modules" || ent.name === ".git") continue;
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === "auditoria" && dir.endsWith("korowa-vic")) continue;
        walk(p);
      } else if (/\.(html|js|css|json|md)$/i.test(ent.name)) {
        if (isAuditDir(p)) continue;
        const t = fs.readFileSync(p, "utf8");
        if (/korowa\.vic\.edu\.au/i.test(t)) hits.push(p);
      }
    }
  };
  walk(REPO_ROOT);
  const hotlinkHits = hits.length;

  const numbers = {
    G1: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G2: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G3: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G4: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G5: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G6: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G7: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G8: {
      pass: hotlinkHits === 0,
      value: hotlinkHits,
      note: "hotlink fora de auditoria/ (URL permitida só no harness)",
      hits: hits.slice(0, 10),
    },
    G9: { pass: false, value: null, note: "enriquecer via finalize-session2" },
    G10: { pass: false, value: null, note: "enriquecer via finalize-session2" },
  };

  const out = path.join(ROOT, "raw", "gates.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const payload = {
    generatedAt: new Date().toISOString(),
    checksPassed: checks.filter((c) => c.passes).length,
    checksTotal: checks.length,
    gates: numbers,
  };
  fs.writeFileSync(out, JSON.stringify(payload, null, 2));
  console.log(JSON.stringify(payload, null, 2));
}

const [cmd, ...rest] = process.argv.slice(2);
if (!cmd) {
  usage();
  process.exit(1);
}
switch (cmd) {
  case "probe":
    cmdProbe(rest[0]);
    break;
  case "frames":
    cmdFrames(rest);
    break;
  case "aggregate":
    cmdAggregate();
    break;
  case "report":
    cmdReport();
    break;
  case "gates":
    cmdGates();
    break;
  default:
    usage();
    process.exit(1);
}
