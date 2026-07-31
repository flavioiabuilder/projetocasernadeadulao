"use strict";

/**
 * Gera design-system/css/tokens.css a partir da fonte canônica
 * design-system/tokens/tokens.json.
 *
 * Fonte única: nenhum valor de token deve ser escrito à mão no CSS.
 * Rode `npm run generate:tokens` após editar o JSON.
 */

const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ORIGEM = path.join(RAIZ, "design-system", "tokens", "tokens.json");
const DESTINO = path.join(RAIZ, "design-system", "css", "tokens.css");

/** Grupos exportados como custom properties, na ordem de escrita. */
const GRUPOS = [
  ["color", "cor"],
  ["gradient", "grad"],
  ["typography", "tipo"],
  ["spacing", "esp"],
  ["sizing", "tam"],
  ["border", "borda"],
  ["radius", "raio"],
  ["opacity", "opac"],
  ["blur", "desfoque"],
  ["shadow", "sombra"],
  ["zIndex", "z"],
  ["grid", "grade"],
  ["breakpoint", "bp"],
  ["duration", "dur"],
  ["easing", "ease"],
  ["stagger", "stagger"],
  ["motionDistance", "mov-dist"],
  ["motionScale", "mov-escala"],
  ["perspective", "persp"],
  ["environment", "amb"],
];

/** camelCase → kebab-case, preservando dígitos. */
function paraKebab(nome) {
  return nome.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function nomeVariavel(prefixo, grupo, chave) {
  return `--${prefixo}-${grupo}-${paraKebab(chave)}`;
}

function bloco(titulo, linhas) {
  return [`  /* ${titulo} */`, ...linhas, ""].join("\n");
}

function gerar(tokens) {
  const prefixo = tokens.$meta.prefixoCSS;
  const partes = [];

  for (const [grupoJson, grupoCss] of GRUPOS) {
    const valores = tokens[grupoJson];
    if (!valores) continue;
    const linhas = Object.keys(valores).map(
      (chave) => `  ${nomeVariavel(prefixo, grupoCss, chave)}: ${valores[chave]};`
    );
    partes.push(bloco(`${grupoJson} → ${prefixo}-${grupoCss}-*`, linhas));
  }

  // Substituições de movimento reduzido: mesmos nomes semânticos, valores neutros.
  const rm = tokens.reducedMotion;
  const linhasRM = [
    `    ${nomeVariavel(prefixo, "dur", "instantanea")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "dur", "rapida")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "dur", "media")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "dur", "lenta")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "dur", "cena")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "dur", "capitulo")}: ${rm.duracao};`,
    `    ${nomeVariavel(prefixo, "mov-dist", "curta")}: ${rm.distancia};`,
    `    ${nomeVariavel(prefixo, "mov-dist", "media")}: ${rm.distancia};`,
    `    ${nomeVariavel(prefixo, "mov-dist", "longa")}: ${rm.distancia};`,
    `    ${nomeVariavel(prefixo, "mov-dist", "saida")}: ${rm.distancia};`,
    `    ${nomeVariavel(prefixo, "stagger", "linha")}: ${rm.stagger};`,
    `    ${nomeVariavel(prefixo, "stagger", "item")}: ${rm.stagger};`,
    `    ${nomeVariavel(prefixo, "stagger", "bloco")}: ${rm.stagger};`,
    `    ${nomeVariavel(prefixo, "mov-escala", "recuo")}: ${rm.escala};`,
    `    ${nomeVariavel(prefixo, "mov-escala", "avanco")}: ${rm.escala};`,
    `    ${nomeVariavel(prefixo, "amb", "amplitudeFlutuacao")}: ${rm.amplitudeFlutuacao};`,
    `    ${nomeVariavel(prefixo, "amb", "velocidadeAmbiente")}: ${rm.velocidadeAmbiente};`,
  ];

  const cabecalho = [
    "/*",
    ` * ${tokens.$meta.nome} — tokens v${tokens.$meta.versao}`,
    " *",
    " * ARQUIVO GERADO. Não edite à mão.",
    ` * Fonte: design-system/tokens/tokens.json → ${tokens.$meta.geradoPor}`,
    " */",
    "",
    ":root {",
  ].join("\n");

  const rodape = [
    "}",
    "",
    "/* Substituição de movimento: mesmos nomes, valores neutros. */",
    "@media (prefers-reduced-motion: reduce) {",
    "  :root {",
    linhasRM.join("\n"),
    "  }",
    "}",
    "",
  ].join("\n");

  return `${cabecalho}\n${partes.join("\n")}${rodape}`;
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(ORIGEM, "utf8"));
  const css = gerar(tokens);
  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, css, "utf8");
  const total = css.split("\n").filter((l) => l.includes("--es-")).length;
  console.log(`tokens.css gerado — ${total} custom properties`);
}

if (require.main === module) main();

module.exports = { gerar, paraKebab, nomeVariavel };
