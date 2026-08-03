"use strict";

const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "../../../..");
const PROG = path.join(ROOT, "programas/discipulando-a-caserna");
const {
  loadPolitica,
  isPubF5Suspensa,
  normalizePosix,
  isForbiddenInSite,
  shouldExcludeSurfaceFile,
  resolveInsideRoot,
} = require("../../ferramentas/politica-publicacao");

const BUILDER = path.join(PROG, "ferramentas/montar-artefato-pages.js");
const POLICY = path.join(PROG, "ferramentas/validar-pages-policy.js");
const ARTIFACT = path.join(PROG, "ferramentas/validar-pages-artifact.js");

describe("política de publicação Pages", () => {
  it("carrega estado-publicacao.json com PUB-F5-01 suspensa", () => {
    const p = loadPolitica();
    assert.equal(p.pubF5.id, "PUB-F5-01");
    assert.equal(isPubF5Suspensa(p), true);
    assert.ok(p.surfaces.every((s) => !s.includes("prospecto-fase-5-v1")));
    assert.ok(p.surfaces.every((s) => !s.includes("design-system")));
    assert.ok(p.forbidden.some((f) => f.includes("prospecto-fase-5-v1")));
    assert.ok(p.forbidden.some((f) => f.includes("design-system")));
  });

  it("normaliza paths posix", () => {
    assert.equal(normalizePosix("a\\b//c"), "a/b/c");
  });

  it("classifica paths proibidos no artefato", () => {
    const p = loadPolitica();
    assert.equal(
      isForbiddenInSite(
        "programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/index.html",
        p
      ),
      true
    );
    assert.equal(
      isForbiddenInSite(
        "programas/discipulando-a-caserna/design-system/laboratorio/index.html",
        p
      ),
      true
    );
    assert.equal(
      isForbiddenInSite(
        "programas/discipulando-a-caserna/prototipos/prospecto-v1/index.html",
        p
      ),
      false
    );
  });

  it("exclui markdown e capturas das superfícies", () => {
    assert.equal(shouldExcludeSurfaceFile("README.md"), true);
    assert.equal(shouldExcludeSurfaceFile("capturas/foo.png"), true);
    assert.equal(shouldExcludeSurfaceFile("index.html"), false);
  });

  it("recusa path que escapa da raiz", () => {
    assert.throws(() => resolveInsideRoot(ROOT, "../outside.txt"));
  });

  it("validar-pages-policy sai 0", () => {
    const r = spawnSync(process.execPath, [POLICY], { encoding: "utf8", cwd: ROOT });
    assert.equal(r.status, 0, r.stdout + r.stderr);
  });

  it("pages.yml não reintroduz cópia de F5/DS nem push direto", () => {
    const yml = fs.readFileSync(path.join(ROOT, ".github/workflows/pages.yml"), "utf8");
    assert.match(yml, /workflow_run:/);
    assert.doesNotMatch(yml, /^\s*workflow_dispatch:\s*$/m);
    assert.match(yml, /workflow_run\.head_sha/);
    assert.doesNotMatch(yml, /design-system/);
    assert.doesNotMatch(yml, /prospecto-fase-5-v1/);
    assert.doesNotMatch(yml, /generate:discipulando:prototipo-fase-5/);
    assert.match(yml, /build:pages/);
  });

  it("índice público não aponta para F5 nem lab", () => {
    const html = fs.readFileSync(path.join(PROG, "index.html"), "utf8");
    assert.doesNotMatch(html, /href=["'][^"']*prospecto-fase-5-v1/);
    assert.doesNotMatch(html, /href=["'][^"']*design-system\//);
  });
});

describe("montagem do artefato Pages", () => {
  let tmp;

  before(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pages-artifact-"));
  });

  after(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it("monta allowlist sem F5/DS/docs e passa validação de artefato", () => {
    const out = path.join(tmp, "_site");
    const manifest = path.join(tmp, "manifest.json");
    const build = spawnSync(
      process.execPath,
      [BUILDER, `--out=${out}`, `--manifest=${manifest}`],
      { encoding: "utf8", cwd: ROOT }
    );
    assert.equal(build.status, 0, build.stdout + build.stderr);

    assert.equal(
      fs.existsSync(
        path.join(
          out,
          "programas/discipulando-a-caserna/prototipos/prospecto-v1/index.html"
        )
      ),
      true
    );
    assert.equal(
      fs.existsSync(
        path.join(out, "programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1")
      ),
      false
    );
    assert.equal(
      fs.existsSync(path.join(out, "programas/discipulando-a-caserna/design-system")),
      false
    );
    assert.equal(fs.existsSync(path.join(out, "metodo")), false);
    assert.equal(
      fs.existsSync(path.join(out, "programas/discipulando-a-caserna/docs")),
      false
    );
    assert.equal(
      fs.existsSync(
        path.join(
          out,
          "programas/discipulando-a-caserna/assets/img/licao1/aluno-l1-01.webp"
        )
      ),
      true
    );
    assert.equal(
      fs.existsSync(
        path.join(out, "programas/discipulando-a-caserna/assets/img/logo-pdac/LEIA-ME.md")
      ),
      false
    );
    assert.equal(
      fs.existsSync(
        path.join(
          out,
          "programas/discipulando-a-caserna/prototipos/storytelling-v1/LEIA-ME.md"
        )
      ),
      false
    );

    const validate = spawnSync(process.execPath, [ARTIFACT, `--out=${out}`], {
      encoding: "utf8",
      cwd: ROOT,
    });
    assert.equal(validate.status, 0, validate.stdout + validate.stderr);

    const inv = JSON.parse(fs.readFileSync(manifest, "utf8"));
    assert.ok(inv.fileCount > 20);
    assert.equal(inv.pubF5.status, "suspensa");
  });
});
