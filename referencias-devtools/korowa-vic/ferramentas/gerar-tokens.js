"use strict";

const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const ORIGEM = path.join(RAIZ, "design-system", "tokens", "tokens.json");
const DESTINO = path.join(RAIZ, "design-system", "css", "tokens.css");

const GRUPOS = [
  ["color", "color"],
  ["gradient", "grad"],
  ["typography", "tipo"],
  ["spacing", "esp"],
  ["sizing", "tam"],
  ["border", "borda"],
  ["radius", "raio"],
  ["opacity", "opac"],
  ["blur", "blur"],
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
  ["environment", "env"],
  ["scrollPhysics", "scroll"],
];

function kebab(nome) {
  return nome.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function valorToken(v) {
  if (v && typeof v === "object" && v.$value) {
    const val = v.$value;
    if (val && typeof val === "object" && val.hex) {
      if (val.alpha != null && val.alpha < 1) {
        const [r, g, b] = val.components.map((c) => Math.round(c * 255));
        return `rgba(${r}, ${g}, ${b}, ${val.alpha})`;
      }
      return val.hex;
    }
    if (typeof val === "string") return val;
  }
  if (typeof v === "string" || typeof v === "number") return String(v);
  return null;
}

function main() {
  const tokens = JSON.parse(fs.readFileSync(ORIGEM, "utf8"));
  const prefix = tokens.$meta.prefixoCSS || "fr";
  const lines = [
    `/* Gerado — não editar. Fonte: tokens/tokens.json */`,
    `:root {`,
  ];
  for (const [grupo, cssGrupo] of GRUPOS) {
    const obj = tokens[grupo];
    if (!obj || typeof obj !== "object") continue;
    lines.push(`  /* ${grupo} */`);
    for (const [chave, bruto] of Object.entries(obj)) {
      if (/note$/i.test(chave)) continue;
      const val = valorToken(bruto);
      if (val == null) continue;
      lines.push(`  --${prefix}-${cssGrupo}-${kebab(chave)}: ${val};`);
    }
  }
  lines.push(`}`);
  lines.push(``);
  lines.push(`@media (prefers-reduced-motion: reduce) {`);
  lines.push(`  :root {`);
  const rm = tokens.reducedMotion || {};
  lines.push(`    --${prefix}-dur-rapida: ${rm.duracao || "0.01ms"};`);
  lines.push(`    --${prefix}-dur-media: ${rm.duracao || "0.01ms"};`);
  lines.push(`    --${prefix}-dur-lenta: ${rm.duracao || "0.01ms"};`);
  lines.push(`    --${prefix}-mov-dist-reveal: ${rm.distancia || "0px"};`);
  lines.push(`    --${prefix}-mov-dist-parallax: ${rm.distancia || "0px"};`);
  lines.push(`    --${prefix}-mov-escala-hover: ${rm.escala || "1"};`);
  lines.push(`    --${prefix}-mov-escala-destaque: ${rm.escala || "1"};`);
  lines.push(`  }`);
  lines.push(`}`);
  lines.push(``);

  fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
  fs.writeFileSync(DESTINO, lines.join("\n"), "utf8");
  console.log("wrote", DESTINO);
}

main();
