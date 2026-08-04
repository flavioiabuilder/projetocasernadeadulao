#!/usr/bin/env node
/**
 * Valida o artefato `_site` após a montagem.
 * npm run validate:pages:artifact [-- --out=<dir>]
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  ROOT,
  loadPolitica,
  normalizePosix,
  isForbiddenInSite,
  stripTrailingSlash,
} = require("./politica-publicacao");

let failures = 0;

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

function parseOut(argv) {
  for (const arg of argv) {
    if (arg.startsWith("--out=")) return path.resolve(arg.slice("--out=".length));
  }
  return path.join(ROOT, "_site");
}

function walk(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const st = fs.lstatSync(abs);
    if (st.isDirectory()) walk(abs, base, acc);
    else acc.push(normalizePosix(path.relative(base, abs)));
  }
  return acc;
}

function requiredPaths(politica) {
  const req = [...politica.rootFiles, ...politica.rootAssets, politica.programIndex];
  for (const rel of politica.programAssets) {
    req.push(normalizePosix(path.join("programas/discipulando-a-caserna/assets", rel)));
  }
  // índices HTML conhecidos das superfícies allowlisted
  req.push("programas/discipulando-a-caserna/prototipos/prospecto-v1/index.html");
  req.push("programas/discipulando-a-caserna/prototipos/storytelling-v1/index.html");
  req.push(
    "programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-a/index.html"
  );
  req.push(
    "programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-b/index.html"
  );
  req.push(
    "programas/discipulando-a-caserna/prototipos/direcoes-visuais-v1/direcao-c/index.html"
  );
  for (const surface of politica.surfaces) {
    const base = stripTrailingSlash(surface);
    if (!fs.existsSync(path.join(ROOT, base))) {
      fail(`superfície allowlisted ausente no repo: ${surface}`);
    }
  }
  for (const shim of politica.shims) req.push(shim);
  req.push(".nojekyll");
  return req;
}

function collectLocalRefs(text, { fromCss = false } = {}) {
  const refs = [];
  if (fromCss) {
    for (const match of text.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)) {
      refs.push(match[2]);
    }
    return refs;
  }
  for (const match of text.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    refs.push(match[1]);
  }
  for (const match of text.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const part of match[1].split(",")) {
      const candidate = part.trim().split(/\s+/)[0];
      if (candidate) refs.push(candidate);
    }
  }
  return refs;
}

function checkLocalRef(siteRoot, filesSet, rel, href) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("data:") ||
    href.startsWith("blob:")
  ) {
    return;
  }
  if (/^https?:\/\//i.test(href)) return;
  if (href.includes("prospecto-fase-5-v1") || href.includes("design-system/")) {
    fail(`link público para path suspenso em ${rel}: ${href}`);
    return;
  }
  if (href.toLowerCase().endsWith(".pdf")) {
    fail(`link para PDF em ${rel}: ${href}`);
    return;
  }
  const cleaned = href.split("#")[0].split("?")[0];
  if (!cleaned) return;

  const abs = path.join(siteRoot, rel);
  let targetAbs;
  if (cleaned.startsWith("/")) {
    // caminho absoluto do host (shims legados) → relativo à raiz do artefato
    targetAbs = path.join(siteRoot, cleaned.replace(/^\/+/, ""));
  } else {
    targetAbs = path.resolve(path.dirname(abs), cleaned);
  }
  const target = normalizePosix(path.relative(siteRoot, targetAbs));
  if (target.startsWith("..")) return;
  const asFile = target;
  const asIndex = normalizePosix(path.join(target, "index.html"));
  if (
    !filesSet.has(asFile) &&
    !filesSet.has(asIndex) &&
    !fs.existsSync(path.join(siteRoot, asFile))
  ) {
    if (!fs.existsSync(path.join(siteRoot, asIndex))) {
      fail(`link quebrado em ${rel}: ${href} → ${target}`);
    }
  }
}

function checkLinks(siteRoot, files) {
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  const cssFiles = files.filter((f) => f.endsWith(".css"));
  const set = new Set(files);
  const cdnRe =
    /https?:\/\/(?:cdn\.|unpkg\.com|cdnjs\.|jsdelivr\.net|fonts\.googleapis|fonts\.gstatic)/i;

  for (const rel of htmlFiles) {
    const abs = path.join(siteRoot, rel);
    const html = fs.readFileSync(abs, "utf8");
    if (cdnRe.test(html)) {
      fail(`CDN de runtime em ${rel}`);
    }
    for (const href of collectLocalRefs(html)) {
      checkLocalRef(siteRoot, set, rel, href);
    }
  }

  for (const rel of cssFiles) {
    const abs = path.join(siteRoot, rel);
    const css = fs.readFileSync(abs, "utf8");
    if (cdnRe.test(css)) {
      fail(`CDN de runtime em ${rel}`);
    }
    for (const href of collectLocalRefs(css, { fromCss: true })) {
      checkLocalRef(siteRoot, set, rel, href);
    }
  }
}

function main() {
  console.log("validate:pages:artifact");
  const out = parseOut(process.argv.slice(2));
  const politica = loadPolitica();

  if (!fs.existsSync(out)) {
    fail(`artefato ausente: ${out}`);
    console.error(`\nvalidate:pages:artifact FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }

  const files = walk(out);
  ok(`${files.length} arquivos no artefato`);

  for (const req of requiredPaths(politica)) {
    const abs = path.join(out, req);
    if (!fs.existsSync(abs)) fail(`obrigatório ausente: ${req}`);
  }

  for (const rel of files) {
    if (isForbiddenInSite(rel, politica)) {
      fail(`path proibido no artefato: ${rel}`);
    }
    if (rel.endsWith(".md")) {
      fail(`markdown interno publicado: ${rel}`);
    }
    if (rel.includes("capturas/")) {
      fail(`capturas publicadas: ${rel}`);
    }
  }

  // superfícies suspensas
  const suspensas = [
    "programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1",
    "programas/discipulando-a-caserna/design-system",
    "programas/discipulando-a-caserna/prospecto",
  ];
  for (const s of suspensas) {
    if (fs.existsSync(path.join(out, s))) {
      fail(`superfície suspensa presente: ${s}`);
    }
  }

  const robots = path.join(out, "robots.txt");
  if (fs.existsSync(robots)) {
    const text = fs.readFileSync(robots, "utf8");
    if (!/Disallow:\s*\//.test(text)) fail("robots.txt do artefato sem Disallow: /");
    else ok("robots.txt coerente");
  }

  checkLinks(out, files);

  if (failures) {
    console.error(`\nvalidate:pages:artifact FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }
  console.log("\nvalidate:pages:artifact OK");
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(`FAIL: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { main };
