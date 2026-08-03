#!/usr/bin/env node
/**
 * CLI do harness: probe | frames | aggregate | report | gates
 * Windows: node audit/cli.js <cmd>
 * Unix: ./audit/init.sh <cmd>
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname);
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
  console.log(`Usage: node audit/cli.js <probe|frames|aggregate|report|gates> [args]
  probe <nome>   Imprime sonda pronta para evaluate_script (P1–P7)
  frames         Roda P8 (pixelmatch) — args: --dir --out
  aggregate      Consolida audit/raw/*.json → audit/raw/agg.json
  report         Gera audit/report.html (stub até dados completos)
  gates          Avalia portões G1–G10 com números disponíveis`);
}

function cmdProbe(name) {
  if (!name || !PROBES[name]) {
    console.error("Sondas:", Object.keys(PROBES).filter((k) => !/^p\d$/i.test(k)).join(", "));
    process.exit(1);
  }
  const file = path.join(ROOT, "probes", PROBES[name]);
  if (PROBES[name] === "frames.js") {
    console.log("// P8 é Node — use: node audit/cli.js frames --dir <captures> --out <json>");
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
  const agg = fs.existsSync(aggPath) ? JSON.parse(fs.readFileSync(aggPath, "utf8")) : {};
  const checks = fs.existsSync(checksPath)
    ? JSON.parse(fs.readFileSync(checksPath, "utf8"))
    : [];
  const passed = checks.filter((c) => c.passes).length;
  const data = {
    target: "https://www.korowa.vic.edu.au/",
    slug: "korowa-vic",
    generatedAt: new Date().toISOString(),
    partial: true,
    partialNote: "Sessão 1 — harness + dry-run 1440×900 apenas",
    checks: { total: checks.length, passed },
    aggSummary: {
      files: agg.files || [],
      sizes: agg.sizes || {},
    },
    gates: null,
  };
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Audit report — korowa-vic (parcial)</title>
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
  <p class="muted">Varredura parcial — sessão 1</p>
  <h1>korowa-vic</h1>
  <p>Alvo: https://www.korowa.vic.edu.au/</p>
  <p>Checks: <span id="check-pass"></span> / <span id="check-total"></span></p>
  <p class="muted">Portões G1–G10: não avaliados nesta sessão (stub).</p>
</section>
<section id="mapa">
  <h2>Mapa narrativo</h2>
  <p class="muted">Ver <code>audit/NARRATIVE-MAP.md</code> e curva P8 em raw.</p>
  <div id="delta-mount"></div>
</section>
<section id="tecnica">
  <h2>Técnica</h2>
  <p>Host de injeção do dry-run: documentado em progress.md (MCP vs Playwright).</p>
</section>
<section id="lacunas">
  <h2>Lacunas</h2>
  <p>PASSOS 2–6 multiviewport, tokens, lab e gates completos: NÃO OBSERVADO nesta sessão.</p>
</section>
</main>
</div>
<script type="application/json" id="audit-data">${JSON.stringify(data)}</script>
<script>
const data = JSON.parse(document.getElementById('audit-data').textContent);
document.getElementById('check-pass').textContent = data.checks.passed;
document.getElementById('check-total').textContent = data.checks.total;
</script>
</body>
</html>`;
  const out = path.join(ROOT, "report.html");
  fs.writeFileSync(out, html, "utf8");
  console.log(JSON.stringify({ out, partial: true, checks: data.checks }, null, 2));
}

function cmdGates() {
  const checks = JSON.parse(fs.readFileSync(path.join(ROOT, "checks.json"), "utf8"));
  const hotlink = spawnSync(
    process.platform === "win32" ? "rg" : "rg",
    ["-n", "korowa\\.vic\\.edu\\.au", "--glob", "!audit/**", "--glob", "!**/node_modules/**", "."],
    { encoding: "utf8", cwd: path.join(ROOT, "..") },
  );
  // fallback grep via node if rg missing
  let hotlinkHits = 0;
  if (hotlink.error || hotlink.status === null) {
    const walk = (dir, acc) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ent.name === "node_modules" || ent.name === ".git" || ent.name === "audit") continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else if (/\.(html|js|css|json|md)$/i.test(ent.name)) {
          const t = fs.readFileSync(p, "utf8");
          if (/korowa\.vic\.edu\.au/i.test(t)) acc.push(p);
        }
      }
    };
    const hits = [];
    walk(path.join(ROOT, ".."), hits);
    hotlinkHits = hits.length;
  } else {
    hotlinkHits = (hotlink.stdout || "").trim() ? (hotlink.stdout.trim().split("\n").length) : 0;
  }

  const numbers = {
    G1: { pass: false, value: null, note: "NÃO OBSERVADO — tokens ainda não gerados" },
    G2: { pass: false, value: null, note: "NÃO OBSERVADO — lab ainda não existe" },
    G3: { pass: false, value: null, note: "NÃO OBSERVADO — reconstrução ausente" },
    G4: { pass: false, value: null, note: "NÃO OBSERVADO — pares semânticos da reconstrução" },
    G5: { pass: false, value: null, note: "NÃO OBSERVADO" },
    G6: { pass: false, value: null, note: "NÃO OBSERVADO" },
    G7: { pass: false, value: null, note: "NÃO OBSERVADO" },
    G8: {
      pass: hotlinkHits === 0,
      value: hotlinkHits,
      note: "hotlink hits fora de audit/ (0 esperado pré-impl)",
    },
    G9: { pass: false, value: null, note: "NÃO OBSERVADO — sem componentes" },
    G10: { pass: false, value: null, note: "NÃO OBSERVADO — pacote korowa-vic ausente" },
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
