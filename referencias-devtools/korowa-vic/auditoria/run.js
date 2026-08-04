#!/usr/bin/env node
/**
 * Runner de medição — host de injeção das sondas P1–P7 e da varredura de frames.
 *
 * O MCP chrome-devtools não está conectado nesta máquina (.mcp.json declara o
 * servidor, mas ele não sobe). Playwright cumpre o mesmo papel de INVESTIGAÇÃO
 * e atende melhor ao contrato de <execution_architecture>: screenshots vão para
 * disco e são processados pela P8, nunca trafegados pelo contexto do agente.
 *
 * Subcomandos:
 *   scan     varredura de scroll (P3 + screenshots sincronizados)
 *   probes   P1/P2/P5/P6/P7 em posições-chave
 *   degraded scan com CPU throttling e/ou rede lenta
 *
 * Exemplos:
 *   node audit/run.js scan --vw 1440 --vh 900 --step 0.05 --label coarse
 *   node audit/run.js scan --vw 1440 --vh 900 --list 0.00,0.005,0.01 --label refine
 *   node audit/run.js probes --vw 1440 --vh 900 --at 0,0.15,0.55,1
 *   node audit/run.js degraded --vw 1440 --vh 900 --cpu 4 --net slow4g
 */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("@playwright/test");

const ROOT = path.resolve(__dirname);
const TARGET = "https://www.korowa.vic.edu.au/";
const RAW = path.join(ROOT, "raw");
const CAPTURES = path.join(ROOT, "captures");

const NET_PROFILES = {
  slow4g: {
    offline: false,
    latency: 400,
    downloadThroughput: (400 * 1024) / 8,
    uploadThroughput: (400 * 1024) / 8,
  },
  fast4g: {
    offline: false,
    latency: 150,
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
  },
};

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) out[a.slice(2)] = argv[i + 1]?.startsWith("--") ? true : argv[++i];
    else out._.push(a);
  }
  return out;
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
  return d;
}

function writeJson(file, data) {
  ensureDir(path.dirname(file));
  const text = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, text, "utf8");
  return Buffer.byteLength(text);
}

function provenance(entry) {
  ensureDir(RAW);
  fs.appendFileSync(
    path.join(RAW, "provenance.jsonl"),
    JSON.stringify({ at: new Date().toISOString(), ...entry }) + "\n",
    "utf8",
  );
}

function probeSource(name) {
  return fs.readFileSync(path.join(ROOT, "probes", `${name}.js`), "utf8");
}

function fractionsFrom(args) {
  if (args.list) return String(args.list).split(",").map(Number);
  const step = Number(args.step || 0.05);
  const n = Math.round(1 / step) + 1;
  return Array.from({ length: n }, (_, i) => Number((i * step).toFixed(4)));
}

const tag = (f) => `f${String(Math.round(f * 1000)).padStart(4, "0")}`;

/** Dispensa banner de consentimento pela opção mais preservadora de privacidade. */
async function handleConsent(page) {
  const result = { found: false, action: "none", label: null };
  const patterns = [
    /^(reject|decline|refuse)( all)?/i,
    /only necessary|essential only|necessary only/i,
    /^(rejeitar|recusar)/i,
  ];
  const buttons = await page.$$("button, [role='button'], a[href='#']");
  for (const b of buttons) {
    const text = ((await b.innerText().catch(() => "")) || "").trim();
    if (!text || text.length > 40) continue;
    if (patterns.some((p) => p.test(text))) {
      result.found = true;
      result.label = text;
      await b.click({ timeout: 2000 }).catch(() => {});
      result.action = "declined-non-essential";
      await page.waitForTimeout(500);
      break;
    }
  }
  if (!result.found) {
    const banner = await page
      .$("[id*='cookie' i], [class*='cookie' i], [id*='consent' i], [class*='consent' i]")
      .catch(() => null);
    result.found = Boolean(banner);
    if (banner) result.action = "present-not-interacted";
  }
  return result;
}

async function settle(page) {
  // Dispara lazy-load para estabilizar scrollHeight antes de amostrar.
  await page.evaluate(async () => {
    const max = () => document.documentElement.scrollHeight - innerHeight;
    for (let y = 0; y <= max(); y += innerHeight) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function openPage(browser, args) {
  const vw = Number(args.vw || 1440);
  const vh = Number(args.vh || 900);
  const context = await browser.newContext({
    viewport: { width: vw, height: vh },
    deviceScaleFactor: 1,
    reducedMotion: args.reducedmotion ? "reduce" : "no-preference",
    isMobile: false,
  });
  const page = await context.newPage();
  const consoleMessages = [];
  page.on("console", (m) => {
    if (consoleMessages.length < 60) consoleMessages.push({ type: m.type(), text: m.text().slice(0, 200) });
  });

  const cdp = await context.newCDPSession(page);
  if (args.cpu) await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(args.cpu) });
  if (args.net && NET_PROFILES[args.net]) {
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", NET_PROFILES[args.net]);
  }

  const t0 = Date.now();
  await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
  const loadMs = Date.now() - t0;
  const consent = await handleConsent(page);
  if (!args.nosettle) await settle(page);

  return { context, page, cdp, vw, vh, consoleMessages, loadMs, consent };
}

async function cmdScan(browser, args) {
  const label = args.label || "scan";
  const fracs = fractionsFrom(args);
  const { context, page, vw, vh, consoleMessages, loadMs, consent } = await openPage(browser, args);
  const dir = ensureDir(path.join(CAPTURES, `${label}-${vw}x${vh}`));

  // Screenshots sincronizados com as mesmas frações da P3.
  const shots = [];
  for (const f of fracs) {
    const y = await page.evaluate((frac) => {
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const target = Math.round(max * Math.min(1, Math.max(0, frac)));
      scrollTo(0, target);
      return target;
    }, f);
    await page.waitForTimeout(Number(args.dwell || 450));
    const file = path.join(dir, `${tag(f)}.png`);
    await page.screenshot({ path: file });
    shots.push({ fraction: f, scrollY: y, file: path.relative(ROOT, file).replace(/\\/g, "/") });
  }

  // P3 na mesma grade.
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(400);
  const p3 = await page.evaluate(
    ([src, fr]) => new Function(`return (${src})`)()(fr),
    [probeSource("scroll-curve"), fracs],
  );
  const p3Bytes = writeJson(path.join(RAW, `p3-scroll-curve-${label}-${vw}x${vh}.json`), p3);

  const p4 = await page.evaluate((src) => new Function(`return (${src})`)(), probeSource("canvas"));
  const p4Bytes = writeJson(path.join(RAW, `p4-canvas-${label}-${vw}x${vh}.json`), p4);

  const meta = {
    label,
    viewport: { w: vw, h: vh },
    target: TARGET,
    host: "playwright",
    cpuThrottle: args.cpu ? Number(args.cpu) : 1,
    network: args.net || "unthrottled",
    reducedMotion: Boolean(args.reducedmotion),
    loadMs,
    consent,
    scrollHeight: p3.rows?.[0]?.scrollHeight ?? null,
    canvasCount: p4.canvasCount,
    globalsPresent: p4.globalsPresent,
    shots,
    probeBytes: { P3: p3Bytes, P4: p4Bytes },
    consoleMessages: consoleMessages.slice(0, 30),
  };
  writeJson(path.join(RAW, `scan-${label}-${vw}x${vh}.json`), meta);
  provenance({
    probe: "scan",
    label,
    url: TARGET,
    viewport: `${vw}x${vh}`,
    theme: "default",
    layer: "dom+render",
    provenancia: "medido-no-render",
    host: "playwright",
    cpuThrottle: meta.cpuThrottle,
    network: meta.network,
    positions: fracs.length,
  });

  console.log(
    JSON.stringify(
      {
        label,
        viewport: `${vw}x${vh}`,
        positions: fracs.length,
        scrollHeight: meta.scrollHeight,
        canvasCount: meta.canvasCount,
        globalsPresent: meta.globalsPresent,
        loadMs,
        consent,
        dir: path.relative(ROOT, dir).replace(/\\/g, "/"),
        probeBytes: meta.probeBytes,
        consoleErrors: consoleMessages.filter((m) => m.type === "error").length,
      },
      null,
      2,
    ),
  );
  await context.close();
}

async function cmdProbes(browser, args) {
  const at = String(args.at || "0").split(",").map(Number);
  const names = String(args.probes || "styles,cascade,motion,a11y,typography").split(",");
  const { context, page, vw, vh } = await openPage(browser, args);
  const sizes = {};

  for (const f of at) {
    await page.evaluate((frac) => {
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      scrollTo(0, Math.round(max * frac));
    }, f);
    await page.waitForTimeout(Number(args.dwell || 600));

    for (const name of names) {
      let data;
      try {
        data = await page.evaluate(
          (src) => new Function(`return (${src})`)(),
          probeSource(name.trim()),
        );
      } catch (err) {
        data = { probe: name, error: String(err).slice(0, 300), observed: false };
      }
      const key = `${name.trim()}-${vw}x${vh}-${tag(f)}`;
      sizes[key] = writeJson(path.join(RAW, `${key}.json`), data);
      provenance({
        probe: name.trim(),
        url: TARGET,
        viewport: `${vw}x${vh}`,
        scrollFraction: f,
        layer: "dom",
        provenancia: "declarado",
        host: "playwright",
        bytes: sizes[key],
      });
    }
  }

  console.log(JSON.stringify({ viewport: `${vw}x${vh}`, at, sizes }, null, 2));
  await context.close();
}

/**
 * Varredura barata só de presença/dimensão de canvas — sem screenshots.
 * Serve para achar as fronteiras de montagem/desmontagem do canvas condicional.
 */
async function cmdBracket(browser, args) {
  const from = Number(args.from ?? 0);
  const to = Number(args.to ?? 1);
  const step = Number(args.step ?? 0.01);
  const { context, page, vw, vh } = await openPage(browser, args);
  const wait_ = Number(args.dwell ?? 0);
  const rows = [];
  for (let f = from; f <= to + 1e-9; f += step) {
    const frac = Number(f.toFixed(4));
    const row = await page.evaluate(
      ([fr, wait]) => {
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      scrollTo(0, Math.round(max * fr));
      return new Promise((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const go = () => {
            // getContext devolve o contexto JÁ EXISTENTE quando o tipo casa e
            // null quando não casa. Num canvas já renderizado isso identifica o
            // tipo sem recriar nem destruir nada.
            const ctxType = (c) => {
              for (const t of ["webgl2", "webgl", "experimental-webgl", "2d", "bitmaprenderer"]) {
                try {
                  if (c.getContext(t)) return t;
                } catch {
                  /* contexto incompatível */
                }
              }
              return "undetermined";
            };
            const cs = [...document.querySelectorAll("canvas")].map((c) => ({
              w: c.clientWidth,
              h: c.clientHeight,
              aw: c.width,
              ah: c.height,
              id: c.id || null,
              cls: String(c.className || "").slice(0, 60),
              parent: c.parentElement ? c.parentElement.tagName.toLowerCase() : null,
              parentCls: c.parentElement
                ? String(c.parentElement.className || "").slice(0, 80)
                : null,
              parentId: c.parentElement ? c.parentElement.id || null : null,
              ancestorSection: (() => {
                let el = c.parentElement;
                for (let i = 0; i < 6 && el; i++, el = el.parentElement) {
                  if (/section|article|main/i.test(el.tagName) || el.id) {
                    return `${el.tagName.toLowerCase()}#${el.id || ""}.${String(el.className || "").slice(0, 60)}`;
                  }
                }
                return null;
              })(),
              vis: getComputedStyle(c).visibility,
              op: getComputedStyle(c).opacity,
              zIndex: getComputedStyle(c).zIndex,
              position: getComputedStyle(c).position,
              rectTop: Math.round(c.getBoundingClientRect().top),
              ctx: ctxType(c),
            }));
              resolve({ n: cs.length, cs });
            };
            if (wait > 0) setTimeout(go, wait);
            else go();
          }),
        ),
      );
      },
      [frac, wait_],
    );
    rows.push({ fraction: frac, ...row });
  }
  const transitions = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].n !== rows[i - 1].n) {
      transitions.push({ from: rows[i - 1].fraction, to: rows[i].fraction, n: rows[i].n });
    }
  }
  const out = {
    probe: "bracket-canvas",
    url: TARGET,
    viewport: { w: vw, h: vh },
    range: [from, to],
    step,
    positionsWithCanvas: rows.filter((r) => r.n > 0).length,
    positions: rows.length,
    transitions,
    sample: rows.find((r) => r.n > 0)?.cs ?? null,
    layer: "canvas",
    provenance: "medido-no-render",
  };
  writeJson(path.join(RAW, `bracket-canvas-${vw}x${vh}.json`), out);
  provenance({ probe: "bracket-canvas", url: TARGET, viewport: `${vw}x${vh}`, layer: "canvas", provenancia: "medido-no-render", host: "playwright", range: [from, to], step });
  console.log(JSON.stringify(out, null, 2));
  await context.close();
}

/**
 * Instrumenta a criação de <canvas> antes de qualquer script da página rodar e
 * grava o stack de quem criou. Resolve a pergunta "de onde veio aquele canvas"
 * sem inferência: o stack aponta o arquivo de origem.
 * Repete N carregamentos porque a ocorrência observada não foi reprodutível.
 */
async function cmdCanvasOrigin(browser, args) {
  const runs = Number(args.runs ?? 5);
  const vw = Number(args.vw || 1440);
  const vh = Number(args.vh || 900);
  const results = [];

  for (let i = 0; i < runs; i++) {
    const context = await browser.newContext({
      viewport: { width: vw, height: vh },
      deviceScaleFactor: 1,
    });
    await context.addInitScript(() => {
      window.__canvasCreations = [];
      const origCreate = Document.prototype.createElement;
      Document.prototype.createElement = function (tag, ...rest) {
        const el = origCreate.call(this, tag, ...rest);
        if (String(tag).toLowerCase() === "canvas") {
          window.__canvasCreations.push({
            via: "createElement",
            stack: String(new Error().stack || "").split("\n").slice(1, 6).join(" | "),
            t: Math.round(performance.now()),
          });
        }
        return el;
      };
      const origGetCtx = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        window.__canvasCreations.push({
          via: "getContext:" + type,
          stack: String(new Error().stack || "").split("\n").slice(1, 6).join(" | "),
          t: Math.round(performance.now()),
        });
        return origGetCtx.call(this, type, ...rest);
      };
    });

    const page = await context.newPage();
    const hosts = new Set();
    page.on("request", (r) => {
      try {
        hosts.add(new URL(r.url()).host);
      } catch {
        /* url inválida */
      }
    });
    await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
    await settle(page);
    const found = await page.evaluate(() => ({
      creations: (window.__canvasCreations || []).slice(0, 20),
      inDom: document.querySelectorAll("canvas").length,
    }));
    results.push({ run: i + 1, ...found, hostCount: hosts.size, hosts: [...hosts].sort() });
    await context.close();
  }

  const out = {
    probe: "canvas-origin",
    url: TARGET,
    viewport: { w: vw, h: vh },
    runs,
    runsWithCanvasInDom: results.filter((r) => r.inDom > 0).length,
    runsWithCreation: results.filter((r) => r.creations.length > 0).length,
    results,
    layer: "canvas",
    provenance: "medido-no-render",
  };
  writeJson(path.join(RAW, `canvas-origin-${vw}x${vh}.json`), out);
  provenance({ probe: "canvas-origin", url: TARGET, viewport: `${vw}x${vh}`, layer: "canvas", provenancia: "medido-no-render", host: "playwright", runs });
  console.log(
    JSON.stringify(
      {
        runs,
        runsWithCanvasInDom: out.runsWithCanvasInDom,
        runsWithCreation: out.runsWithCreation,
        creations: results.flatMap((r) => r.creations.map((c) => ({ run: r.run, ...c }))).slice(0, 12),
        hostsUnion: [...new Set(results.flatMap((r) => r.hosts))].sort(),
      },
      null,
      2,
    ),
  );
}

(async () => {
  const args = parseArgs(process.argv);
  const cmd = args._[0];
  if (!cmd) {
    console.error("Subcomandos: scan | probes | degraded | bracket");
    process.exit(1);
  }
  const browser = await chromium.launch({ headless: true, args: ["--force-color-profile=srgb"] });
  try {
    if (cmd === "scan") await cmdScan(browser, args);
    else if (cmd === "degraded") await cmdScan(browser, { ...args, label: args.label || "degraded" });
    else if (cmd === "probes") await cmdProbes(browser, args);
    else if (cmd === "bracket") await cmdBracket(browser, args);
    else if (cmd === "canvas-origin") await cmdCanvasOrigin(browser, args);
    else {
      console.error("Subcomando desconhecido:", cmd);
      process.exit(1);
    }
  } finally {
    await browser.close();
  }
})();
