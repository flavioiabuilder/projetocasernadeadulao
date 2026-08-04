/**
 * G2 — SSIM macro (composição/luminância) entre captura da referência
 * (`captures/dry-run-1440x900`, medido-no-render, sessão 1) e captura da
 * Friso (`captures/friso-lab-1440x900`, P9, MCP chrome-devtools).
 *
 * Não é SSIM fotográfico pixel-a-pixel: Friso não reproduz copy/fotos reais
 * (decisão de licença, ver documentacao/asset-and-license-boundaries.md), então
 * comparar detalhe fino não mediria nada além dessa diferença deliberada. Em
 * vez disso, as duas imagens são reamostradas (área-média) para uma grade
 * pequena comum antes do SSIM — isso mede se a distribuição espacial de
 * claro/escuro (composição: onde estão os blocos de imagem, texto, vazio)
 * é comparável, ignorando conteúdo literal. SSIM janelado padrão
 * (Wang et al. 2004), sem o filtro gaussiano da recomendação original —
 * suficiente para este propósito, não para benchmarking de codec.
 */
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { PNG } = require("pngjs");

const ROOT = path.resolve(__dirname, "..");
const RAW = path.join(ROOT, "raw");
const REF_DIR = path.join(ROOT, "captures", "dry-run-1440x900");
const LAB_DIR = path.join(ROOT, "captures", "friso-lab-1440x900");

const THUMB_W = 96;
const THUMB_H = 60;
const WINDOW = 8;

function readPng(p) {
  return PNG.sync.read(fs.readFileSync(p));
}

/** Reamostragem por área-média para uma grade fixa, em luminância (0–255). */
function toLumaThumbnail(png, tw, th) {
  const { width: sw, height: sh, data } = png;
  const out = new Float64Array(tw * th);
  for (let ty = 0; ty < th; ty++) {
    const y0 = Math.floor((ty / th) * sh);
    const y1 = Math.max(y0 + 1, Math.floor(((ty + 1) / th) * sh));
    for (let tx = 0; tx < tw; tx++) {
      const x0 = Math.floor((tx / tw) * sw);
      const x1 = Math.max(x0 + 1, Math.floor(((tx + 1) / tw) * sw));
      let sum = 0;
      let n = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * sw + x) * 4;
          const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          sum += luma;
          n += 1;
        }
      }
      out[ty * tw + tx] = n > 0 ? sum / n : 0;
    }
  }
  return out;
}

function windowStats(a, b, tw, th, wx, wy, w) {
  let sumA = 0;
  let sumB = 0;
  let n = 0;
  for (let y = wy; y < Math.min(wy + w, th); y++) {
    for (let x = wx; x < Math.min(wx + w, tw); x++) {
      sumA += a[y * tw + x];
      sumB += b[y * tw + x];
      n += 1;
    }
  }
  const muA = sumA / n;
  const muB = sumB / n;
  let varA = 0;
  let varB = 0;
  let cov = 0;
  for (let y = wy; y < Math.min(wy + w, th); y++) {
    for (let x = wx; x < Math.min(wx + w, tw); x++) {
      const da = a[y * tw + x] - muA;
      const db = b[y * tw + x] - muB;
      varA += da * da;
      varB += db * db;
      cov += da * db;
    }
  }
  varA /= n;
  varB /= n;
  cov /= n;
  const L = 255;
  const C1 = (0.01 * L) ** 2;
  const C2 = (0.03 * L) ** 2;
  return ((2 * muA * muB + C1) * (2 * cov + C2)) / ((muA * muA + muB * muB + C1) * (varA + varB + C2));
}

function ssimWindowed(a, b, tw, th, w) {
  const scores = [];
  for (let wy = 0; wy < th; wy += w) {
    for (let wx = 0; wx < tw; wx += w) {
      scores.push(windowStats(a, b, tw, th, wx, wy, w));
    }
  }
  const mean = scores.reduce((s, v) => s + v, 0) / scores.length;
  return { mean, windows: scores.length };
}

function compareFraction(fraction) {
  const name = `f${String(Math.round(fraction * 100)).padStart(3, "0")}.png`;
  const refPath = path.join(REF_DIR, name);
  const labPath = path.join(LAB_DIR, name);
  if (!fs.existsSync(refPath) || !fs.existsSync(labPath)) return null;
  const ref = readPng(refPath);
  const lab = readPng(labPath);
  const refThumb = toLumaThumbnail(ref, THUMB_W, THUMB_H);
  const labThumb = toLumaThumbnail(lab, THUMB_W, THUMB_H);
  const { mean, windows } = ssimWindowed(refThumb, labThumb, THUMB_W, THUMB_H, WINDOW);
  return {
    fraction,
    refPath: path.relative(ROOT, refPath),
    labPath: path.relative(ROOT, labPath),
    refSize: { w: ref.width, h: ref.height },
    labSize: { w: lab.width, h: lab.height },
    thumbnail: { w: THUMB_W, h: THUMB_H, window: WINDOW, windows },
    ssimMacro: Number(mean.toFixed(4)),
  };
}

function main() {
  const fractions = [0, 0.5, 1];
  const results = fractions.map(compareFraction).filter(Boolean);
  const meanAll = results.length
    ? Number((results.reduce((s, r) => s + r.ssimMacro, 0) / results.length).toFixed(4))
    : null;
  const out = {
    probe: "ssim-macro-g2",
    method:
      "Reamostragem área-média para grade 96x60 (luminância), SSIM janelado 8x8 (Wang et al. 2004, sem filtro gaussiano). Mede composição espacial claro/escuro, não conteúdo pixel-a-pixel.",
    threshold: 0.85,
    results,
    ssimMacroMean: meanAll,
    layer: "dom+render",
    provenance: "medido-no-render",
    note: "Comparação macro entre captures/dry-run-1440x900 (referência, sessão 1, Playwright) e captures/friso-lab-1440x900 (Friso, sessão 3, MCP chrome-devtools). Conteúdo (copy/fotos) difere por decisão de licença — ver documentacao/asset-and-license-boundaries.md; SSIM baixo pode refletir isso, não necessariamente composição divergente.",
  };
  fs.mkdirSync(RAW, { recursive: true });
  fs.writeFileSync(path.join(RAW, "p10-ssim-g2-1440x900.json"), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
}

main();
