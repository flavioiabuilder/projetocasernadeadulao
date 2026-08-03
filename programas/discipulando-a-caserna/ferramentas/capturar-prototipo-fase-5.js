/**
 * Capturas do candidato Fase 5 (evidências próprias).
 * Uso: node ferramentas/capturar-prototipo-fase-5.js
 * Sobe servidor HTTP local; aguarda fonts.ready e layout estável.
 */
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("@playwright/test");

const raiz = path.join(__dirname, "..");
const repoRoot = path.resolve(raiz, "../..");
const outDir = path.join(raiz, "prototipos", "prospecto-fase-5-v1", "capturas");
const candRel = "/programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/";

const VIEWPORTS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let rel = urlPath === "/" ? "/index.html" : urlPath;
      let filePath = path.join(repoRoot, rel.replace(/^\//, ""));
      if (!filePath.startsWith(repoRoot)) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
    server.on("error", reject);
  });
}

async function waitStable(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
  await page.waitForTimeout(120);
}

async function shot(page, name) {
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: false,
  });
}

async function captureRegions(page, vpName) {
  await shot(page, `topo-${vpName}`);
  for (const [sel, label] of [
    ["#secao-4", "umbral"],
    ["#preview-licao-1", "folheador"],
    ["#secao-13", "secao-13"],
    ["#secao-15 .dc-convite-prefacio", "convite"],
    ["#secao-15", "final"],
  ]) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      await loc.scrollIntoViewIfNeeded();
      await page.waitForTimeout(80);
      await shot(page, `${label}-${vpName}`);
    }
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const { server, base } = await startServer();
  const url = `${base}${candRel}`;
  const meta = {
    url,
    capturadoEm: new Date().toISOString(),
    viewports: VIEWPORTS,
  };

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await waitStable(page);
      await captureRegions(page, vp.name);
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await waitStable(page);
    await shot(page, "topo-1440x900-reduced-motion");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await waitStable(page);
    const folheador = page.locator("[data-folheador]");
    if (await folheador.count()) {
      await folheador.scrollIntoViewIfNeeded();
      await page.locator('[data-folheador-edicao="aluno"]').click();
      await shot(page, "folheador-aluno-1440x900");
      await page.locator('[data-folheador-edicao="instrutor"]').click();
      await shot(page, "folheador-instrutor-1440x900");
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    const btn = page.locator("#sumario-btn");
    await btn.waitFor({ state: "visible", timeout: 10000 });
    await btn.focus();
    await shot(page, "foco-sumario-1440x900");

    const noJs = await browser.newContext({ javaScriptEnabled: false });
    const pageNoJs = await noJs.newPage();
    await pageNoJs.setViewportSize({ width: 1440, height: 900 });
    await pageNoJs.goto(url, { waitUntil: "domcontentloaded" });
    await pageNoJs.locator("#preview-licao-1").scrollIntoViewIfNeeded();
    await pageNoJs.screenshot({
      path: path.join(outDir, "folheador-nojs-1440x900.png"),
      fullPage: false,
    });
    await noJs.close();

    fs.writeFileSync(
      path.join(outDir, "meta.json"),
      JSON.stringify(meta, null, 2) + "\n",
      "utf8"
    );

    const readmePath = path.join(outDir, "README.md");
    if (!fs.existsSync(readmePath)) {
      fs.writeFileSync(
        readmePath,
        `# Capturas — prospecto-fase-5-v1

Geradas por \`npm run capture:discipulando:prototipo-fase-5\`.
Servidor HTTP local; aguarda \`document.fonts.ready\`.
Metadados em \`meta.json\`. Não substituem inspeção teclado/DOM.
`,
        "utf8"
      );
    } else {
      // Preserve manual documentation; only append notice if missing.
      const atual = fs.readFileSync(readmePath, "utf8");
      if (!/meta\.json/.test(atual)) {
        fs.writeFileSync(
          readmePath,
          `${atual.trim()}\n\nMetadados técnicos da última corrida: \`meta.json\`.\n`,
          "utf8"
        );
      }
    }

    console.log(`OK capturas → ${outDir}`);
    console.log(`URL: ${url}`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
