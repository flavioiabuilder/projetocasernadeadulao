"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const PROG = path.resolve(__dirname, "../..");
const VALIDATOR = path.join(PROG, "ferramentas/validar-design-system.js");
const {
  FICHA_FIELDS,
  REQUIRED_FASE4,
} = require("../../ferramentas/validar-design-system");

describe("design system Fase 4", () => {
  it("exporta contrato de campos de ficha", () => {
    assert.ok(FICHA_FIELDS.includes("15. Estados"));
    assert.ok(REQUIRED_FASE4.includes("cobertura-de-composicao.md"));
  });

  it("validar-design-system.js sai 0", () => {
    const r = spawnSync(process.execPath, [VALIDATOR], {
      encoding: "utf8",
      cwd: path.resolve(PROG, "../.."),
    });
    assert.equal(r.status, 0, r.stdout + r.stderr);
  });

  it("lab.css não consome --primitivo- fora de comentários", () => {
    const css = fs.readFileSync(
      path.join(PROG, "design-system/laboratorio/css/lab.css"),
      "utf8"
    );
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    assert.equal(stripped.includes("--primitivo-"), false);
    assert.match(css, /tokens\.css/);
  });

  it("cobertura menciona prospecto e PAD-01", () => {
    const cov = fs.readFileSync(
      path.join(PROG, "docs/metodo/fase-4/cobertura-de-composicao.md"),
      "utf8"
    );
    assert.match(cov, /prospecto-v1/);
    assert.match(cov, /PAD-01/);
    assert.match(cov, /CMP-01/);
  });
});
