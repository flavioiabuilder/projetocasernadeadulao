#!/usr/bin/env node
/**
 * Monta o artefato público `_site` a partir de estado-publicacao.json.
 * npm run build:pages
 *
 * Opções:
 *   --out=<dir>           destino (default: <repo>/_site)
 *   --manifest=<file>     escreve inventário JSON (não publicado no Pages)
 */
"use strict";

const fs = require("fs");
const path = require("path");
const {
  ROOT,
  loadPolitica,
  normalizePosix,
  shouldExcludeSurfaceFile,
  resolveInsideRoot,
  isPubF5Suspensa,
} = require("./politica-publicacao");

function parseArgs(argv) {
  let out = path.join(ROOT, "_site");
  let manifest = null;
  for (const arg of argv) {
    if (arg.startsWith("--out=")) out = path.resolve(arg.slice("--out=".length));
    if (arg.startsWith("--manifest=")) {
      manifest = path.resolve(arg.slice("--manifest=".length));
    }
  }
  return { out, manifest };
}

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSafe(srcAbs, destAbs) {
  mkdirp(path.dirname(destAbs));
  // refuse symlink escape: resolve source realpath under ROOT
  const srcReal = fs.realpathSync(srcAbs);
  const rootReal = fs.realpathSync(ROOT);
  const rel = path.relative(rootReal, srcReal);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`recusa copiar fora da raiz: ${srcAbs}`);
  }
  if (fs.lstatSync(srcAbs).isSymbolicLink()) {
    const linkTarget = fs.readlinkSync(srcAbs);
    const resolved = path.resolve(path.dirname(srcAbs), linkTarget);
    const relLink = path.relative(rootReal, fs.realpathSync(resolved));
    if (relLink.startsWith("..") || path.isAbsolute(relLink)) {
      throw new Error(`symlink escapa da raiz: ${srcAbs}`);
    }
  }
  fs.copyFileSync(srcAbs, destAbs);
}

function walkFiles(dirAbs, baseAbs = dirAbs, acc = []) {
  if (!fs.existsSync(dirAbs)) return acc;
  for (const name of fs.readdirSync(dirAbs)) {
    const abs = path.join(dirAbs, name);
    const st = fs.lstatSync(abs);
    if (st.isDirectory()) {
      walkFiles(abs, baseAbs, acc);
    } else if (st.isFile() || st.isSymbolicLink()) {
      acc.push({
        abs,
        rel: normalizePosix(path.relative(baseAbs, abs)),
      });
    }
  }
  return acc;
}

function inventoryTree(dirAbs) {
  const files = [];
  if (!fs.existsSync(dirAbs)) return files;
  for (const { abs, rel } of walkFiles(dirAbs)) {
    const st = fs.statSync(abs);
    files.push({ path: rel, bytes: st.size });
  }
  files.sort((a, b) => a.path.localeCompare(b.path));
  return files;
}

function assertSourceExists(relPosix) {
  const abs = resolveInsideRoot(ROOT, relPosix);
  if (!fs.existsSync(abs)) {
    throw new Error(`fonte obrigatória ausente: ${relPosix}`);
  }
  return abs;
}

function copySurface(surfaceRel, outRoot, politica) {
  const srcDir = assertSourceExists(surfaceRel.replace(/\/$/, ""));
  const destDir = path.join(outRoot, surfaceRel.replace(/\/$/, ""));
  const files = walkFiles(srcDir);
  let copied = 0;
  for (const { abs, rel } of files) {
    if (shouldExcludeSurfaceFile(rel, politica)) continue;
    copyFileSafe(abs, path.join(destDir, rel));
    copied += 1;
  }
  if (copied === 0) {
    throw new Error(`superfície sem arquivos copiáveis: ${surfaceRel}`);
  }
  return copied;
}

function main() {
  const { out, manifest } = parseArgs(process.argv.slice(2));
  const politica = loadPolitica();

  if (!isPubF5Suspensa(politica)) {
    console.warn(
      "AVISO: pubF5 não está suspensa — allowlist atual ainda exclui F5/DS por forbidden[]."
    );
  }

  // limpar somente o diretório de saída autorizado
  if (fs.existsSync(out)) {
    const outReal = fs.realpathSync(out);
    const rootReal = fs.realpathSync(ROOT);
    if (outReal === rootReal) {
      throw new Error("recusa limpar a raiz do repositório");
    }
    const rel = normalizePosix(path.relative(rootReal, outReal));
    const outsideRepo = rel.startsWith("..") || path.isAbsolute(rel);
    // Dentro do repo, só `_site` (ou subpath) pode ser apagado — evita wipe de fontes.
    if (!outsideRepo && rel !== "_site" && !rel.startsWith("_site/")) {
      throw new Error(
        `recusa limpar caminho dentro do repositório que não é _site: ${rel || "."}`
      );
    }
    rmrf(out);
  }
  mkdirp(out);

  for (const file of politica.rootFiles) {
    const src = assertSourceExists(file);
    copyFileSafe(src, path.join(out, file));
  }

  for (const file of politica.rootAssets) {
    const src = assertSourceExists(file);
    copyFileSafe(src, path.join(out, file));
  }

  {
    const src = assertSourceExists(politica.programIndex);
    copyFileSafe(src, path.join(out, politica.programIndex));
  }

  for (const rel of politica.programAssets) {
    const srcRel = normalizePosix(
      path.join("programas/discipulando-a-caserna/assets", rel)
    );
    const src = assertSourceExists(srcRel);
    copyFileSafe(src, path.join(out, srcRel));
  }

  for (const surface of politica.surfaces) {
    copySurface(surface, out, politica);
  }

  for (const shim of politica.shims) {
    const src = assertSourceExists(shim);
    copyFileSafe(src, path.join(out, shim));
  }

  fs.writeFileSync(path.join(out, ".nojekyll"), "");

  const inv = inventoryTree(out);
  const payload = {
    generatedAt: new Date().toISOString(),
    pubF5: politica.pubF5,
    out: normalizePosix(path.relative(ROOT, out) || out),
    fileCount: inv.length,
    files: inv,
  };

  if (manifest) {
    mkdirp(path.dirname(manifest));
    fs.writeFileSync(manifest, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  }

  console.log(`OK: artefato Pages em ${out} (${inv.length} arquivos)`);
  if (manifest) console.log(`OK: inventário ${manifest}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(`FAIL: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { main, inventoryTree, copySurface, walkFiles };
