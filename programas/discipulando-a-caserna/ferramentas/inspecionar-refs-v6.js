#!/usr/bin/env node
/**
 * Inspeção V6 (Fase 2) — viewports + reduced motion nas REFs externas.
 * Não versiona capturas. Saída: docs/metodo/fase-2/inspecao-v6.md
 *
 * Uso: node programas/discipulando-a-caserna/ferramentas/inspecionar-refs-v6.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const OUT = path.join(
  ROOT,
  "programas/discipulando-a-caserna/docs/metodo/fase-2/inspecao-v6.md"
);

const VIEWPORTS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

const REFS = [
  {
    id: "REF-01",
    url: "https://ptsem.edu/academics/our-curriculum/",
  },
  {
    id: "REF-02",
    url: "https://rapport2023-2024.upadi.ca/en/",
  },
  {
    id: "REF-03",
    url: "https://report.dogwoodhealthtrust.org/",
  },
  {
    id: "REF-04",
    url: "https://bibleproject.com/",
  },
  {
    id: "REF-05",
    url: "https://www.themarshallproject.org/about/inside",
  },
  {
    id: "REF-06",
    url: "https://www.primary-paper.com/",
  },
  {
    id: "REF-06b",
    url: "https://www.lapa.ninja/post/primary-paper/",
    note: "galeria secundária",
  },
  {
    id: "REF-07",
    url: "https://www.aramco.com/en/about-us/our-history",
    optional: true,
  },
];

async function inspectOne(browser, ref) {
  const page = await browser.newPage();
  const result = {
    id: ref.id,
    url: ref.url,
    note: ref.note || "",
    ok: false,
    status: null,
    title: "",
    error: "",
    viewports: [],
    reducedMotion: "",
    overflowX: false,
    bodyTextLen: 0,
  };
  try {
    const resp = await page.goto(ref.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    result.status = resp ? resp.status() : null;
    result.title = await page.title();
    result.ok = Boolean(resp && resp.ok());
    result.bodyTextLen = await page.evaluate(() =>
      document.body && document.body.innerText ? document.body.innerText.length : 0
    );

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(400);
      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflowX = doc.scrollWidth > doc.clientWidth + 2;
        const h1 = document.querySelector("h1");
        const nav = document.querySelector("nav, [role='navigation']");
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          overflowX,
          hasH1: Boolean(h1),
          h1Text: h1 ? h1.textContent.trim().slice(0, 120) : "",
          hasNav: Boolean(nav),
          scrollHeight: doc.scrollHeight,
        };
      });
      result.viewports.push({ name: vp.name, ...metrics });
      if (metrics.overflowX) result.overflowX = true;
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(200);
    result.reducedMotion = await page.evaluate(() => {
      const anim = getComputedStyle(document.body).animation;
      const transition = getComputedStyle(document.body).transition;
      return `body animation=${anim || "none"}; transition=${transition || "none"}`;
    });
  } catch (e) {
    result.error = e.message || String(e);
    result.ok = false;
  } finally {
    await page.close();
  }
  return result;
}

function renderMd(results, when) {
  const lines = [
    "# Inspeção V6 — referências externas (Fase 2)",
    "",
    `- **Data:** ${when}`,
    "- **Ferramenta:** Playwright (Chromium)",
    "- **Viewports:** 360×800, 768×1024, 1440×900",
    "- **Reduced motion:** emulado com `prefers-reduced-motion: reduce`",
    "- **Capturas:** **não** versionadas (V3 pendente)",
    "",
    "## Resumo",
    "",
    "| REF | URL | HTTP | Título | Overflow-X | Erro |",
    "| --- | --- | ---- | ------ | ---------- | ---- |",
  ];
  for (const r of results) {
    lines.push(
      `| ${r.id} | ${r.url} | ${r.status ?? "—"} | ${(r.title || "").replace(/\|/g, "/").slice(0, 60)} | ${r.overflowX ? "sim" : "não"} | ${(r.error || "").replace(/\|/g, "/").slice(0, 80)} |`
    );
  }
  lines.push("", "## Detalhe por referência", "");
  for (const r of results) {
    lines.push(`### ${r.id}${r.note ? ` (${r.note})` : ""}`, "");
    lines.push(`- URL: ${r.url}`);
    lines.push(`- Status HTTP: ${r.status ?? "falha"}`);
    lines.push(`- Título: ${r.title || "—"}`);
    lines.push(`- Texto body (chars): ${r.bodyTextLen}`);
    lines.push(`- Reduced motion (amostra body): ${r.reducedMotion || "—"}`);
    if (r.error) lines.push(`- Erro: \`${r.error}\``);
    lines.push(
      "",
      "| Viewport | overflow-X | h1 | nav | scrollHeight |",
      "| --- | --- | --- | --- | --- |"
    );
    for (const vp of r.viewports) {
      lines.push(
        `| ${vp.name} | ${vp.overflowX ? "sim" : "não"} | ${vp.hasH1 ? "sim" : "não"}${vp.h1Text ? ` (${vp.h1Text.replace(/\|/g, "/")})` : ""} | ${vp.hasNav ? "sim" : "não"} | ${vp.scrollHeight} |`
      );
    }
    lines.push("");
  }
  lines.push(
    "## Achados para curadoria",
    "",
    "- REF-06 site original acessível; galeria Lapa Ninja é fonte secundária.",
    "- REF-04/05: confirmar se a dobra reforça apenas ética/pedagogia (ver painel).",
    "- REF-07: se timeout/erro, evidência permanece o estudo DevTools interno.",
    "- REF-08 (acervo): não inspecionada aqui — paths locais + capturas próprias.",
    "- Esta inspeção **não** aprova V1/V2.",
    ""
  );
  return lines.join("\n");
}

async function main() {
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch {
    console.error("Playwright não encontrado. Rode npm ci na raiz.");
    process.exit(1);
  }
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const ref of REFS) {
      process.stderr.write(`V6: ${ref.id} …\n`);
      const r = await inspectOne(browser, ref);
      results.push(r);
      if (!r.ok && ref.optional) {
        process.stderr.write(`V6: ${ref.id} opcional falhou — ok continuar\n`);
      }
    }
  } finally {
    await browser.close();
  }
  const when = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, renderMd(results, when), "utf8");
  console.log(`Escrito: ${path.relative(ROOT, OUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
