#!/usr/bin/env node
/**
 * Fonte única da política de publicação Pages (PUB-F5-01).
 * Consumida pelo builder e pelos validadores.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const PROG = path.join(ROOT, "programas/discipulando-a-caserna");
const ESTADO_PATH = path.join(PROG, "docs/publicacao/estado-publicacao.json");
const PAGES_YML = path.join(ROOT, ".github/workflows/pages.yml");
const PROGRAM_INDEX = path.join(PROG, "index.html");

function normalizePosix(p) {
  return String(p || "")
    .replace(/\\/g, "/")
    .replace(/^\.\//, "")
    .replace(/\/+/g, "/");
}

function ensureTrailingSlash(p) {
  const n = normalizePosix(p);
  return n.endsWith("/") ? n : `${n}/`;
}

function stripTrailingSlash(p) {
  const n = normalizePosix(p);
  return n.endsWith("/") ? n.slice(0, -1) : n;
}

function loadPolitica(estadoPath = ESTADO_PATH) {
  if (!fs.existsSync(estadoPath)) {
    throw new Error(`estado-publicacao.json ausente: ${estadoPath}`);
  }
  const raw = JSON.parse(fs.readFileSync(estadoPath, "utf8"));
  if (!raw || typeof raw !== "object") {
    throw new Error("estado-publicacao.json inválido");
  }
  if (!raw.pubF5 || !raw.pubF5.status) {
    throw new Error("estado-publicacao.json sem pubF5.status");
  }
  if (!Array.isArray(raw.surfaces) || !Array.isArray(raw.forbidden)) {
    throw new Error("estado-publicacao.json precisa de surfaces[] e forbidden[]");
  }
  return raw;
}

function isPubF5Suspensa(politica = loadPolitica()) {
  return String(politica.pubF5.status).toLowerCase() === "suspensa";
}

function pathUnder(child, parent) {
  const c = normalizePosix(child);
  const p = ensureTrailingSlash(parent);
  return c === stripTrailingSlash(p) || c.startsWith(p);
}

function isForbiddenInSite(relPath, politica = loadPolitica()) {
  const rel = normalizePosix(relPath).replace(/^_site\//, "");
  for (const forbidden of politica.forbidden) {
    const f = stripTrailingSlash(forbidden);
    if (
      rel === f ||
      rel.startsWith(`${f}/`) ||
      rel.includes(`/${f}/`) ||
      rel.endsWith(`/${f}`)
    ) {
      return true;
    }
  }
  if (!isPubF5Suspensa(politica)) return false;
  return (
    rel.includes("prospecto-fase-5-v1") ||
    /(^|\/)design-system(\/|$)/.test(rel) ||
    /(^|\/)metodo(\/|$)/.test(rel) ||
    rel.includes("homologacao-pastoral-v1") ||
    rel.includes("referencias-devtools") ||
    /(^|\/)programas\/discipulando-a-caserna\/prospecto(\/|$)/.test(rel)
  );
}

function shouldExcludeSurfaceFile(relWithinSurface, politica = loadPolitica()) {
  const rel = normalizePosix(relWithinSurface);
  const parts = rel.split("/");
  const excludeNames = politica.surfaceExcludeNames || ["capturas"];
  const excludeSuffixes = politica.surfaceExcludeSuffixes || [".md", ".local.json"];
  for (const part of parts) {
    if (excludeNames.includes(part)) return true;
  }
  for (const suf of excludeSuffixes) {
    if (rel.endsWith(suf)) return true;
  }
  return false;
}

function resolveInsideRoot(rootAbs, relativePosix) {
  const rootReal = fs.realpathSync(rootAbs);
  const target = path.resolve(rootAbs, relativePosix);
  let targetReal;
  try {
    targetReal = fs.existsSync(target) ? fs.realpathSync(target) : target;
  } catch {
    targetReal = target;
  }
  const rel = path.relative(rootReal, targetReal);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`path escapa da raiz: ${relativePosix}`);
  }
  return target;
}

module.exports = {
  ROOT,
  PROG,
  ESTADO_PATH,
  PAGES_YML,
  PROGRAM_INDEX,
  normalizePosix,
  ensureTrailingSlash,
  stripTrailingSlash,
  loadPolitica,
  isPubF5Suspensa,
  pathUnder,
  isForbiddenInSite,
  shouldExcludeSurfaceFile,
  resolveInsideRoot,
};
