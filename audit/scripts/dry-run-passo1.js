/**
 * Dry-run PASSO 1 (+ capturas base PASSO 2) em 1440×900.
 * Host: Playwright (MCP chrome-devtools indisponível na sessão 1).
 * Injeta as mesmas sondas de audit/probes/.
 */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const TARGET = "https://www.korowa.vic.edu.au/";
const VP = { width: 1440, height: 900 };
const OUT_CAP = path.join(ROOT, "captures", "dry-run-1440x900");
const OUT_RAW = path.join(ROOT, "raw");
const FRACTIONS = Array.from({ length: 21 }, (_, i) => i / 20);

function readProbe(name) {
  return fs.readFileSync(path.join(ROOT, "probes", name), "utf8");
}

function wrapIife(source) {
  // probes are IIFEs already; evaluate as expression
  return source.trim();
}

async function evalProbe(page, filename) {
  const src = wrapIife(readProbe(filename));
  return page.evaluate(src);
}

async function evalScrollCurve(page, fractions) {
  const src = readProbe("scroll-curve.js").trim();
  // Playwright aceita um único arg serializável
  return page.evaluate(async ({ fracs, probeSrc }) => {
    // eslint-disable-next-line no-new-func
    const fn = eval(`(${probeSrc})`);
    return fn(fracs);
  }, { fracs: fractions, probeSrc: src });
}

function writeJson(file, data) {
  const text = JSON.stringify(data);
  fs.writeFileSync(file, text, "utf8");
  return Buffer.byteLength(text);
}

function appendProvenance(entry) {
  const p = path.join(OUT_RAW, "provenance.jsonl");
  fs.appendFileSync(p, JSON.stringify(entry) + "\n", "utf8");
}

async function dismissNoise(page) {
  // cookie / consent — best effort, não falha
  const candidates = [
    "button:has-text('Accept')",
    "button:has-text('I accept')",
    "button:has-text('Agree')",
    "button:has-text('Allow')",
    "button:has-text('OK')",
    "[aria-label*='accept' i]",
    "#onetrust-accept-btn-handler",
  ];
  for (const sel of candidates) {
    try {
      const loc = page.locator(sel).first();
      if (await loc.isVisible({ timeout: 800 })) {
        await loc.click({ timeout: 1000 });
        break;
      }
    } catch {
      /* continue */
    }
  }
}

async function main() {
  fs.mkdirSync(OUT_CAP, { recursive: true });
  fs.mkdirSync(OUT_RAW, { recursive: true });
  const provPath = path.join(OUT_RAW, "provenance.jsonl");
  if (fs.existsSync(provPath)) fs.writeFileSync(provPath, "", "utf8");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VP,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  const meta = {
    target: TARGET,
    viewport: VP,
    host: "playwright",
    hostNote: "MCP chrome-devtools não carregado — dry-run via Playwright",
    startedAt: new Date().toISOString(),
  };

  console.log("navigate", TARGET);
  await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2500);
  await dismissNoise(page);
  await page.waitForTimeout(1000);

  // P4 early
  const p4 = await evalProbe(page, "canvas.js");
  const p4bytes = writeJson(path.join(OUT_RAW, "p4-canvas-1440x900.json"), p4);
  appendProvenance({
    url: TARGET,
    viewport: "1440x900",
    theme: "default",
    scroll: null,
    selector: "document",
    layer: "canvas",
    provenance: "medido-no-render",
    probe: "P4",
    file: "raw/p4-canvas-1440x900.json",
  });

  // Screenshots + lightweight per-position notes (full P3 after)
  const shotMeta = [];
  for (const f of FRACTIONS) {
    const maxScroll = await page.evaluate(
      () => document.documentElement.scrollHeight - window.innerHeight,
    );
    const y = Math.round(Math.max(0, maxScroll) * f);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(200);
    await page.evaluate(
      () =>
        new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
    );
    const name = `f${f.toFixed(2).replace(".", "")}.png`;
    const file = path.join(OUT_CAP, name);
    await page.screenshot({ path: file, fullPage: false });
    shotMeta.push({ fraction: f, scrollY: y, file: name });
    appendProvenance({
      url: TARGET,
      viewport: "1440x900",
      theme: "default",
      scroll: { fraction: f, y },
      selector: "viewport",
      layer: "canvas",
      provenance: "medido-no-render",
      probe: "screenshot",
      file: `captures/dry-run-1440x900/${name}`,
    });
    console.log("shot", name, "y=", y);
  }

  writeJson(path.join(OUT_RAW, "dry-run-shots.json"), { ...meta, shots: shotMeta });

  console.log("P3 scroll-curve…");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const p3 = await evalScrollCurve(page, FRACTIONS);
  const p3bytes = writeJson(path.join(OUT_RAW, "p3-scroll-curve-1440x900.json"), p3);
  appendProvenance({
    url: TARGET,
    viewport: "1440x900",
    theme: "default",
    scroll: "0..1 step 0.05",
    selector: "document",
    layer: "dom+canvas",
    provenance: "medido-no-render",
    probe: "P3",
    file: "raw/p3-scroll-curve-1440x900.json",
  });

  // Spot P1/P2 sizes at top
  await page.evaluate(() => window.scrollTo(0, 0));
  const p1 = await evalProbe(page, "styles.js");
  const p1bytes = writeJson(path.join(OUT_RAW, "p1-styles-1440x900-f0.json"), p1);
  const p2 = await evalProbe(page, "cascade.js");
  const p2bytes = writeJson(path.join(OUT_RAW, "p2-cascade-1440x900-f0.json"), p2);

  appendProvenance({
    url: TARGET,
    viewport: "1440x900",
    scroll: { fraction: 0 },
    layer: "dom",
    provenance: "declarado",
    probe: "P1",
    file: "raw/p1-styles-1440x900-f0.json",
  });
  appendProvenance({
    url: TARGET,
    viewport: "1440x900",
    scroll: { fraction: 0 },
    layer: "dom",
    provenance: "declarado",
    probe: "P2",
    file: "raw/p2-cascade-1440x900-f0.json",
  });

  await browser.close();

  // P8
  console.log("P8 frames…");
  const { spawnSync } = require("node:child_process");
  const p8 = spawnSync(
    process.execPath,
    [
      path.join(ROOT, "probes", "frames.js"),
      "--dir",
      OUT_CAP,
      "--out",
      path.join(OUT_RAW, "p8-frames.json"),
    ],
    { encoding: "utf8" },
  );
  if (p8.status !== 0) {
    console.error(p8.stderr || p8.stdout);
    throw new Error("P8 failed");
  }
  console.log(p8.stdout);

  const p8data = JSON.parse(fs.readFileSync(path.join(OUT_RAW, "p8-frames.json"), "utf8"));

  // Narrative map draft from peaks + P3 headings
  const boundaries = (p8data.chapterBoundaryHypotheses || []).map((b) => ({
    between: b.between,
    ratio: b.ratio,
  }));
  const chapterHints = (p3.rows || []).map((row) => ({
    fraction: row.fraction,
    headings: (row.text && row.text.headings) || [],
    canvasCount: (row.canvases || []).length,
    fixedCount: (row.fixedSticky || []).length,
  }));

  const narrative = `# NARRATIVE-MAP — korowa-vic (dry-run 1440×900)

> Parcial. Host: Playwright (MCP ausente). Sem refino 0,5%, sem CPU/network throttle.

## Fronteiras candidatas (P8 picos de delta)

${boundaries.length ? boundaries.map((b) => `- fração ~${b.between[0]}→${b.between[1]} (ratio ${b.ratio})`).join("\n") : "- Nenhum pico acima do limiar (página pouco animada no scroll ou delta baixo)"}

## Amostras P3 (headings visíveis)

${chapterHints
  .filter((h) => h.headings.length)
  .map((h) => `- **${Math.round(h.fraction * 100)}%**: ${h.headings.join(" | ")}`)
  .join("\n") || "- Sem headings visíveis agregados"}

## Inventário canvas (P4)

- count: ${p4.canvasCount}
${(p4.canvases || []).map((c) => `- #${c.index} id=${c.id} css=${c.css.w}x${c.css.h} buffer=${c.drawingBuffer.width}x${c.drawingBuffer.height} hints=${JSON.stringify(c.context)}`).join("\n")}

## Globais (P4)

- presentes: ${(p4.globalsPresent || []).join(", ") || "(nenhum da lista)"}
- ausentes: evidência negativa não conclusiva (${(p4.globalsAbsent || []).length} nomes)

## Tamanhos das sondas (bytes)

| Sonda | Bytes |
| --- | ---: |
| P1 | ${p1bytes} |
| P2 | ${p2bytes} |
| P3 | ${p3bytes} |
| P4 | ${p4bytes} |
| P8 | ${fs.statSync(path.join(OUT_RAW, "p8-frames.json")).size} |

## Estados ainda NÃO OBSERVADOS neste dry-run

Loader detalhado, hover, menu aberto, CPU 4×, Slow 4G, botão voltar, refino de fronteiras, viewports ≠ 1440×900.
`;

  fs.writeFileSync(path.join(ROOT, "NARRATIVE-MAP.md"), narrative, "utf8");

  const summary = {
    ...meta,
    finishedAt: new Date().toISOString(),
    probeBytes: { P1: p1bytes, P2: p2bytes, P3: p3bytes, P4: p4bytes },
    canvasCount: p4.canvasCount,
    peaks: boundaries,
    shots: shotMeta.length,
  };
  writeJson(path.join(OUT_RAW, "dry-run-summary.json"), summary);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
