#!/usr/bin/env node
/**
 * P8 — fora da página. Delta pixelmatch entre frames + paleta por grade 32×32.
 *
 * Uso:
 *   node audit/probes/frames.js --dir audit/captures/dry-run-1440x900 --out audit/raw/p8-frames.json
 */
const fs = require("node:fs");
const path = require("node:path");

function parseArgs(argv) {
  const out = { dir: null, out: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--dir") out.dir = argv[++i];
    else if (argv[i] === "--out") out.out = argv[++i];
  }
  return out;
}

function loadPng(file) {
  const { PNG } = require("pngjs");
  const buf = fs.readFileSync(file);
  return PNG.sync.read(buf);
}

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function rgbToLab(r, g, b) {
  let R = srgbToLinear(r);
  let G = srgbToLinear(g);
  let B = srgbToLinear(b);
  let x = R * 0.4124564 + G * 0.3575761 + B * 0.1804375;
  let y = R * 0.2126729 + G * 0.7151522 + B * 0.072175;
  let z = R * 0.0193339 + G * 0.119192 + B * 0.9503041;
  x /= 0.95047;
  y /= 1;
  z /= 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function deltaE76(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function paletteFromPng(png, grid = 32) {
  const { width, height, data } = png;
  const cells = [];
  for (let gy = 0; gy < grid; gy++) {
    for (let gx = 0; gx < grid; gx++) {
      const x0 = Math.floor((gx * width) / grid);
      const x1 = Math.floor(((gx + 1) * width) / grid);
      const y0 = Math.floor((gy * height) / grid);
      const y1 = Math.floor(((gy + 1) * height) / grid);
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * width + x) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          n += 1;
        }
      }
      if (!n) continue;
      cells.push({
        r: Math.round(r / n),
        g: Math.round(g / n),
        b: Math.round(b / n),
        lab: rgbToLab(r / n, g / n, b / n),
      });
    }
  }
  const clusters = [];
  for (const cell of cells) {
    let found = null;
    for (const c of clusters) {
      if (deltaE76(c.lab, cell.lab) < 3) {
        found = c;
        break;
      }
    }
    if (found) {
      found.count += 1;
      found.r = Math.round((found.r * (found.count - 1) + cell.r) / found.count);
      found.g = Math.round((found.g * (found.count - 1) + cell.g) / found.count);
      found.b = Math.round((found.b * (found.count - 1) + cell.b) / found.count);
      found.lab = rgbToLab(found.r, found.g, found.b);
    } else {
      clusters.push({
        r: cell.r,
        g: cell.g,
        b: cell.b,
        lab: cell.lab,
        count: 1,
      });
    }
  }
  clusters.sort((a, b) => b.count - a.count);
  return clusters.slice(0, 24).map((c) => ({
    hex: `#${[c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, "0")).join("")}`,
    rgb: [c.r, c.g, c.b],
    weight: c.count,
    provenance: "medido-no-render",
    layer: "canvas",
  }));
}

function main() {
  const args = parseArgs(process.argv);
  const dir = path.resolve(args.dir || "audit/captures/dry-run-1440x900");
  const outPath = path.resolve(args.out || "audit/raw/p8-frames.json");

  let pixelmatch;
  try {
    const mod = require("pixelmatch");
    pixelmatch = typeof mod === "function" ? mod : mod.default;
  } catch {
    console.error("pixelmatch não instalado. npm i -D pixelmatch pngjs");
    process.exit(1);
  }
  if (typeof pixelmatch !== "function") {
    console.error("pixelmatch export inválido");
    process.exit(1);
  }
  const { PNG } = require("pngjs");

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.png$/i.test(f))
    .sort();
  if (files.length < 2) {
    console.error(`Precisa ≥2 PNGs em ${dir}; achou ${files.length}`);
    process.exit(1);
  }

  const deltas = [];
  let prev = loadPng(path.join(dir, files[0]));
  const palettes = {
    [files[0]]: paletteFromPng(prev),
  };

  for (let i = 1; i < files.length; i++) {
    const cur = loadPng(path.join(dir, files[i]));
    const w = Math.min(prev.width, cur.width);
    const h = Math.min(prev.height, cur.height);
    const diff = new PNG({ width: w, height: h });
    const mistmatches = pixelmatch(prev.data, cur.data, diff.data, w, h, {
      threshold: 0.1,
    });
    const total = w * h;
    const ratio = mistmatches / total;
    const parseFrac = (name) => {
      const m3 = name.match(/f(\d{3})\b/i);
      if (m3) return Number(m3[1]) / 100;
      const m = name.match(/f([\d.]+)/i);
      return m ? Number(m[1]) : null;
    };
    const fracA = parseFrac(files[i - 1]);
    const fracB = parseFrac(files[i]);
    deltas.push({
      from: files[i - 1],
      to: files[i],
      fractionFrom: Number.isFinite(fracA) ? fracA : null,
      fractionTo: Number.isFinite(fracB) ? fracB : null,
      mismatchedPixels: mistmatches,
      ratio: Math.round(ratio * 1e6) / 1e6,
    });
    palettes[files[i]] = paletteFromPng(cur);
    prev = cur;
  }

  const ratios = deltas.map((d) => d.ratio);
  const mean = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  const std = Math.sqrt(ratios.reduce((a, b) => a + (b - mean) ** 2, 0) / ratios.length);
  const peakThreshold = mean + std;
  const peaks = deltas
    .filter((d) => d.ratio >= peakThreshold && d.ratio > 0.01)
    .sort((a, b) => b.ratio - a.ratio);

  // Paletas só nos extremos + frames adjacentes a picos (limite ~30KB)
  const keep = new Set([files[0], files[files.length - 1]]);
  for (const p of peaks.slice(0, 8)) {
    keep.add(p.from);
    keep.add(p.to);
  }
  const palettesSlim = {};
  for (const f of keep) {
    if (palettes[f]) palettesSlim[f] = palettes[f].slice(0, 12);
  }

  const result = {
    probe: "P8-frames",
    dir,
    frameCount: files.length,
    deltaCurve: deltas,
    peakThreshold,
    peaks,
    chapterBoundaryHypotheses: peaks.map((p) => ({
      between: [p.fractionFrom, p.fractionTo],
      ratio: p.ratio,
      note: "pico de delta — candidata a fronteira de capítulo",
    })),
    palettes: palettesSlim,
    paletteNote: "subset: first/last + peak neighbors; full grid discarded for size",
    layer: "canvas",
    provenance: "medido-no-render",
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result), "utf8");
  console.log(
    JSON.stringify(
      {
        out: outPath,
        frames: files.length,
        peaks: result.chapterBoundaryHypotheses,
        bytes: Buffer.byteLength(JSON.stringify(result)),
      },
      null,
      2,
    ),
  );
}

main();
