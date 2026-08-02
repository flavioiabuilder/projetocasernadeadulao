/**
 * Validação estrutural do candidato Fase 5 (não julga visual).
 * Uso: node ferramentas/validar-prototipagem.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const cand = path.join(raiz, "prototipos", "prospecto-fase-5-v1");
const estadoPath = path.join(
  raiz,
  "docs",
  "metodo",
  "fase-5",
  "estado-prototipo-canonico.json"
);

let failures = 0;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures += 1;
}
function ok(msg) {
  console.log(`OK: ${msg}`);
}

function main() {
  console.log("validate:discipulando:prototipagem — Fase 5");

  const required = [
    "README.md",
    "index.html",
    "css/prototipo.css",
    "js/prototipo.js",
    "js/config.js",
    "parcial/relatorio.json",
  ];
  for (const rel of required) {
    if (!fs.existsSync(path.join(cand, rel))) fail(`ausente: ${rel}`);
    else ok(`presente: ${rel}`);
  }

  const html = fs.readFileSync(path.join(cand, "index.html"), "utf8");
  if (!/noindex/i.test(html)) fail("index sem noindex");
  else ok("noindex");

  if (!/design-system\/tokens\/tokens\.css/.test(html)) {
    fail("index não importa tokens.css do design-system");
  } else ok("tokens.css do DS");

  if (/laboratorio\/css\/lab\.css/.test(html)) {
    fail("index importa lab.css (proibido como runtime)");
  } else ok("sem lab.css");

  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) fail(`esperado 1 h1, encontrados ${h1}`);
  else ok("um h1");

  if (!/id="conteudo"/.test(html)) fail("main#conteudo ausente");
  else ok("landmark conteudo");

  for (let m = 1; m <= 5; m += 1) {
    if (!new RegExp(`id="movimento-${m}"`).test(html)) fail(`movimento ${m} ausente`);
  }
  if (failures === 0 || !required.some((r) => !fs.existsSync(path.join(cand, r)))) {
    // count movimento fails already recorded
  }
  if ([1, 2, 3, 4, 5].every((m) => new RegExp(`id="movimento-${m}"`).test(html))) {
    ok("cinco movimentos");
  }

  if (/lorem ipsum|imagina que aqui/i.test(html)) fail("placeholder proibido no HTML");
  else ok("sem lorem/imagina");

  const css = fs.readFileSync(path.join(cand, "css/prototipo.css"), "utf8");
  const cssCode = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const htmlCode = html.replace(/<!--[\s\S]*?-->/g, "");

  if (/--primitivo-/.test(cssCode)) fail("CSS do candidato usa --primitivo-*");
  else ok("sem primitivos no CSS do candidato");

  if (/referencias-devtools|aramco-birth|soul-church/i.test(cssCode + htmlCode)) {
    fail("referência a DevTools no candidato");
  } else ok("sem DevTools no candidato");

  if (/#[0-9a-fA-F]{3,8}\b/.test(cssCode)) fail("hex solto no CSS do candidato");
  else ok("sem hex solto");

  if (!fs.existsSync(estadoPath)) fail("estado-prototipo-canonico.json ausente");
  else {
    const estado = JSON.parse(fs.readFileSync(estadoPath, "utf8"));
    if (String(estado.status).toLowerCase() === "aprovado" && !estado.prototipoCanonico) {
      fail("estado aprovado sem prototipoCanonico");
    } else if (String(estado.fase6).toLowerCase() !== "bloqueada" && estado.status !== "aprovado") {
      fail("fase6 não bloqueada com status pendente");
    } else ok("estado F5 coerente");
  }

  if (/cdn\.|unpkg\.|jsdelivr\.|fonts\.google/i.test(html)) fail("rede/CDN externa no HTML");
  else ok("sem CDN");

  if (failures > 0) {
    console.error(`\nvalidate:discipulando:prototipagem FALHOU com ${failures} problema(s).`);
    process.exit(1);
  }
  console.log("\nvalidate:discipulando:prototipagem OK");
}

main();
