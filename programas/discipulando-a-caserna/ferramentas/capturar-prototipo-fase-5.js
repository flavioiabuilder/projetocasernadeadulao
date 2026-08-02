/**
 * Capturas do candidato Fase 5 (evidências próprias).
 * Uso: node ferramentas/capturar-prototipo-fase-5.js
 * Requer Playwright instalado; sobe server estático via npx serve ou usa file://.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const raiz = path.join(__dirname, "..");
const outDir = path.join(raiz, "prototipos", "prospecto-fase-5-v1", "capturas");
const indexPath = path.join(raiz, "prototipos", "prospecto-fase-5-v1", "index.html");

const VIEWPORTS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const fileUrl = "file://" + indexPath.replace(/\\/g, "/");
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(fileUrl);
    await page.screenshot({
      path: path.join(outDir, `topo-${vp.name}.png`),
      fullPage: false,
    });
    const umbral = page.locator("#secao-4");
    if (await umbral.count()) {
      await umbral.scrollIntoViewIfNeeded();
      await page.screenshot({
        path: path.join(outDir, `umbral-${vp.name}.png`),
        fullPage: false,
      });
    }
    const pedido = page.locator("#secao-15");
    if (await pedido.count()) {
      await pedido.scrollIntoViewIfNeeded();
      await page.screenshot({
        path: path.join(outDir, `pedido-${vp.name}.png`),
        fullPage: false,
      });
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(fileUrl);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({
    path: path.join(outDir, "topo-1440x900-reduced-motion.png"),
    fullPage: false,
  });

  await browser.close();
  const readme = `# Capturas — prospecto-fase-5-v1

Geradas por \`npm run capture:discipulando:prototipo-fase-5\`.
Evidências do candidato; não substituem inspeção teclado/DOM.
Não incluem homologação pastoral nem screenshots externos.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme, "utf8");
  console.log(`OK capturas → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
