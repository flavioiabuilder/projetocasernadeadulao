"use strict";

const fs = require("fs");

function migrate(file) {
  let s = fs.readFileSync(file, "utf8");
  const before = s;

  s = s.replace(/font-size:\s*0\.625rem/g, "font-size: var(--rotulo-sm)");
  s = s.replace(/font-size:\s*0\.65rem/g, "font-size: var(--rotulo)");
  s = s.replace(/font-size:\s*0\.6875rem/g, "font-size: var(--rotulo-barra)");
  s = s.replace(/font-size:\s*0\.7rem/g, "font-size: var(--rotulo-md)");

  s = s.replace(
    /letter-spacing:\s*0\.3em/g,
    "letter-spacing: var(--rotulo-tracking-hero)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.18em/g,
    "letter-spacing: var(--rotulo-tracking-largo)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.16em/g,
    "letter-spacing: var(--rotulo-tracking-largo)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.14em/g,
    "letter-spacing: var(--rotulo-tracking)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.12em/g,
    "letter-spacing: var(--rotulo-tracking-aperto)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.1em/g,
    "letter-spacing: var(--rotulo-tracking-aperto)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.08em/g,
    "letter-spacing: var(--rotulo-tracking-aperto)"
  );
  s = s.replace(
    /letter-spacing:\s*0\.06em/g,
    "letter-spacing: var(--rotulo-tracking-aperto)"
  );

  const reguaMap = [
    [30, "var(--traco-suave)"],
    [35, "var(--traco-suave)"],
    [40, "var(--traco-suave)"],
    [45, "var(--traco)"],
    [50, "var(--traco)"],
    [55, "var(--traco)"],
    [65, "var(--traco-forte)"],
    [70, "var(--traco-forte)"],
  ];
  for (const [pct, token] of reguaMap) {
    const re = new RegExp(
      `color-mix\\(in srgb, var\\(--regua\\) ${pct}%, transparent\\)`,
      "g"
    );
    s = s.replace(re, token);
  }

  s = s.replace(
    /color-mix\(in srgb, var\(--creme\) 18%, transparent\)/g,
    "var(--traco-creme-suave)"
  );
  s = s.replace(
    /color-mix\(in srgb, var\(--creme\) 22%, transparent\)/g,
    "var(--traco-creme)"
  );

  if (s !== before) {
    fs.writeFileSync(file, s);
    console.log("migrated", file, before.length, "→", s.length);
  } else {
    console.log("unchanged", file);
  }
}

migrate("css/componentes.css");
migrate("css/secoes.css");
migrate("css/layout.css");
