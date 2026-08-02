/**
 * Validação HTML mínima com html-validate.
 */
"use strict";

const { HtmlValidate } = require("html-validate");
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const alvos = [
  path.join(raiz, "prototipos", "prospecto-v1", "index.html"),
  path.join(raiz, "prototipos", "prospecto-fase-5-v1", "index.html"),
];

const htmlvalidate = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "no-inline-style": "off",
    "void-style": "off",
    "no-implicit-button-type": "off",
    "element-permitted-content": "warn",
    "prefer-native-element": "off",
    "text-content": "off",
    "wcag/h30": "off",
    "long-title": "off",
    "no-trailing-whitespace": "off",
    "aria-label-misuse": "off",
  },
});

async function validarArquivo(abs) {
  const rel = path.relative(raiz, abs).replace(/\\/g, "/");
  if (!fs.existsSync(abs)) {
    console.error(`ERR ausente: ${rel}`);
    return false;
  }
  const html = fs.readFileSync(abs, "utf8");
  const report = await htmlvalidate.validateString(html, rel);
  const errors = report.results.flatMap((r) =>
    (r.messages || []).filter((m) => m.severity === 2)
  );
  const warnings = report.results.flatMap((r) =>
    (r.messages || []).filter((m) => m.severity === 1)
  );

  warnings.slice(0, 20).forEach((m) => {
    console.warn(`WARN ${rel}:${m.line}:${m.column} ${m.ruleId}: ${m.message}`);
  });

  if (errors.length) {
    errors.forEach((m) => {
      console.error(`ERR ${rel}:${m.line}:${m.column} ${m.ruleId}: ${m.message}`);
    });
    return false;
  }

  console.log(`lint:html OK ${rel} (${warnings.length} avisos)`);
  return true;
}

(async () => {
  let okAll = true;
  for (const abs of alvos) {
    const ok = await validarArquivo(abs);
    if (!ok) okAll = false;
  }
  if (!okAll) process.exit(1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
