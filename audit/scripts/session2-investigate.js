/**
 * Sessão 2: PASSO 1 completo (refino) + PASSO 2 multiviewport + P5/P6/P7.
 * Host: Playwright (MCP chrome-devtools ausente).
 */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const TARGET = "https://www.korowa.vic.edu.au/";
const RAW = path.join(ROOT, "raw");
const CAP = path.join(ROOT, "captures");

const VIEWPORTS = [
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "360x800", width: 360, height: 800 },
];

const PEAK_CENTERS = [0.025, 0.075, 0.125, 0.525, 0.575, 0.9];
const KEY_FRACTIONS = [0, 0.05, 0.125, 0.2, 0.35, 0.525, 0.575, 0.75, 0.9, 1];

function readProbe(name) {
  return fs.readFileSync(path.join(ROOT, "probes", name), "utf8");
}

function writeJson(file, data) {
  const text = JSON.stringify(data);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
  return Buffer.byteLength(text);
}

function appendProv(entry) {
  fs.appendFileSync(path.join(RAW, "provenance.jsonl"), JSON.stringify(entry) + "\n");
}

function refineFractions(centers) {
  const set = new Set();
  for (const c of centers) {
    for (let f = Math.max(0, c - 0.03); f <= Math.min(1, c + 0.03) + 1e-9; f += 0.005) {
      set.add(Math.round(f * 1000) / 1000);
    }
  }
  return [...set].sort((a, b) => a - b);
}

async function dismiss(page) {
  for (const sel of [
    "#onetrust-accept-btn-handler",
    "button:has-text('Accept')",
    "button:has-text('Agree')",
    "button:has-text('OK')",
  ]) {
    try {
      const loc = page.locator(sel).first();
      if (await loc.isVisible({ timeout: 600 })) await loc.click({ timeout: 800 });
    } catch {
      /* ignore */
    }
  }
}

async function scrollToFraction(page, f) {
  const y = await page.evaluate((frac) => {
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const yy = Math.round(max * frac);
    scrollTo(0, yy);
    return yy;
  }, f);
  await page.evaluate(
    () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );
  return y;
}

async function evalIife(page, file) {
  return page.evaluate(readProbe(file));
}

async function evalScroll(page, fractions) {
  const src = readProbe("scroll-curve.js").trim();
  return page.evaluate(
    async ({ fracs, probeSrc }) => {
      const fn = eval(`(${probeSrc})`);
      return fn(fracs);
    },
    { fracs: fractions, probeSrc: src },
  );
}

async function shot(page, dir, name) {
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function main() {
  fs.mkdirSync(RAW, { recursive: true });
  const manifest = {
    note: "Material de auditoria — não produção. Sessão 2.",
    target: TARGET,
    host: "playwright",
    mcp: "unavailable",
    partial: false,
    items: [],
  };

  const browser = await chromium.launch({ headless: true });
  const refine = refineFractions(PEAK_CENTERS);
  console.log("refine positions", refine.length);

  // --- PASSO 1 refine 1440×900 ---
  {
    const vp = VIEWPORTS[0];
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(60000);
    await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(3000);
    await dismiss(page);

    const dir = path.join(CAP, "refine-1440x900");
    for (const f of refine) {
      const y = await scrollToFraction(page, f);
      const name = `f${String(Math.round(f * 1000)).padStart(4, "0")}.png`;
      await shot(page, dir, name);
      manifest.items.push({
        name: `refine-${name}`,
        viewport: vp.name,
        narrativePosition: `${Math.round(f * 1000) / 10}%`,
        interaction: "scroll-refine",
        componentObserved: "chapter-boundary",
        observations: "refino 0.5% ±3% picos",
        path: `refine-1440x900/${name}`,
      });
      appendProv({
        url: TARGET,
        viewport: vp.name,
        scroll: { fraction: f, y },
        layer: "canvas",
        provenance: "medido-no-render",
        probe: "screenshot-refine",
      });
    }

    // P3 refine
    await scrollToFraction(page, 0);
    const p3 = await evalScroll(page, refine);
    writeJson(path.join(RAW, "p3-scroll-refine-1440x900.json"), p3);

    // States: menu
    await scrollToFraction(page, 0);
    let menuOpened = false;
    for (const sel of [
      "button:has-text('MENU')",
      "button:has-text('Menu')",
      "[aria-label*='menu' i]",
      "a:has-text('MENU')",
    ]) {
      try {
        const loc = page.locator(sel).first();
        if (await loc.isVisible({ timeout: 1000 })) {
          await loc.click({ timeout: 2000 });
          await page.waitForTimeout(800);
          menuOpened = true;
          break;
        }
      } catch {
        /* try next */
      }
    }
    await shot(page, path.join(CAP, "states-1440x900"), "nav-open.png");
    manifest.items.push({
      name: "nav-open",
      viewport: vp.name,
      narrativePosition: "0%",
      interaction: menuOpened ? "open-menu" : "open-menu-attempt-failed",
      componentObserved: "GlobalHeader/ContextMenu",
      observations: menuOpened ? "menu aberto" : "NÃO OBSERVADO gatilho menu",
      path: "states-1440x900/nav-open.png",
    });

    // close menu best-effort
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    // P5 P6 P7 at top
    for (const [probe, file, out] of [
      ["P5", "motion.js", "p5-motion-1440x900-f0.json"],
      ["P6", "a11y.js", "p6-a11y-1440x900-f0.json"],
      ["P7", "typography.js", "p7-typography-1440x900-f0.json"],
    ]) {
      await scrollToFraction(page, 0);
      const data = await evalIife(page, file);
      const bytes = writeJson(path.join(RAW, out), data);
      console.log(out, bytes);
      appendProv({
        url: TARGET,
        viewport: vp.name,
        scroll: { fraction: 0 },
        layer: "dom",
        provenance: "declarado",
        probe,
        file: `raw/${out}`,
      });
    }

    // mid + end P1 samples
    for (const f of [0.125, 0.55, 1]) {
      await scrollToFraction(page, f);
      const p1 = await evalIife(page, "styles.js");
      writeJson(
        path.join(RAW, `p1-styles-1440x900-f${String(Math.round(f * 100)).padStart(2, "0")}.json`),
        p1,
      );
    }

    // reload behavior
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    const afterReload = await page.evaluate(() => ({
      scrollY,
      title: document.title,
      canvas: document.querySelectorAll("canvas").length,
      gsap: typeof window.gsap !== "undefined",
      ScrollTrigger: typeof window.ScrollTrigger !== "undefined",
    }));
    writeJson(path.join(RAW, "reload-behavior.json"), afterReload);
    await shot(page, path.join(CAP, "states-1440x900"), "after-reload.png");

    // network summary via CDP
    const client = await ctx.newCDPSession(page);
    await client.send("Network.enable");
    const netLog = [];
    client.on("Network.responseReceived", (e) => {
      if (netLog.length < 80) {
        netLog.push({
          type: e.type,
          url: e.response.url.slice(0, 160),
          status: e.response.status,
          mime: e.response.mimeType,
        });
      }
    });
    await page.goto(TARGET, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(2000);
    writeJson(path.join(RAW, "network-sample.json"), { host: "playwright-cdp", items: netLog });

    // slow-ish: CPU throttle
    try {
      await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      const t0 = Date.now();
      await page.reload({ waitUntil: "domcontentloaded", timeout: 120000 });
      await page.waitForTimeout(3000);
      const slow = {
        cpuThrottle: 4,
        loadMs: Date.now() - t0,
        gsap: await page.evaluate(() => typeof window.gsap !== "undefined"),
      };
      writeJson(path.join(RAW, "cpu-throttle-4x.json"), slow);
      await shot(page, path.join(CAP, "states-1440x900"), "cpu-4x.png");
      await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    } catch (e) {
      writeJson(path.join(RAW, "cpu-throttle-4x.json"), {
        error: String(e.message || e),
        note: "NÃO OBSERVADO completo",
      });
    }

    await ctx.close();
  }

  // P8 on refine
  {
    const { spawnSync } = require("node:child_process");
    const r = spawnSync(
      process.execPath,
      [
        path.join(ROOT, "probes", "frames.js"),
        "--dir",
        path.join(CAP, "refine-1440x900"),
        "--out",
        path.join(RAW, "p8-frames-refine.json"),
      ],
      { encoding: "utf8" },
    );
    console.log(r.stdout || r.stderr);
  }

  // --- PASSO 2 other viewports ---
  for (const vp of VIEWPORTS.slice(1)) {
    console.log("viewport", vp.name);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(60000);
    await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2500);
    await dismiss(page);
    const dir = path.join(CAP, `vp-${vp.name}`);
    for (const f of KEY_FRACTIONS) {
      await scrollToFraction(page, f);
      const name = `f${String(Math.round(f * 100)).padStart(3, "0")}.png`;
      await shot(page, dir, name);
      manifest.items.push({
        name: `${vp.name}-${name}`,
        viewport: vp.name,
        narrativePosition: `${Math.round(f * 100)}%`,
        interaction: "scroll",
        componentObserved: "key-position",
        observations: "PASSO 2 chave",
        path: `vp-${vp.name}/${name}`,
      });
    }
    await scrollToFraction(page, 0);
    const p1 = await evalIife(page, "styles.js");
    writeJson(path.join(RAW, `p1-styles-${vp.name}-f0.json`), p1);
    const p7 = await evalIife(page, "typography.js");
    writeJson(path.join(RAW, `p7-typography-${vp.name}-f0.json`), p7);
    await ctx.close();
  }

  writeJson(path.join(CAP, "manifest.json"), manifest);
  writeJson(path.join(RAW, "session2-summary.json"), {
    finishedAt: new Date().toISOString(),
    refineCount: refine.length,
    manifestItems: manifest.items.length,
    host: "playwright",
    mcp: "unavailable",
  });

  await browser.close();
  console.log("done", manifest.items.length, "captures");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
