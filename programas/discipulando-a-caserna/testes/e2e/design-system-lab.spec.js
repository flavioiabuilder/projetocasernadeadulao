"use strict";

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const LAB = "/programas/discipulando-a-caserna/design-system/laboratorio/";
const CMP = `${LAB}capitulos/06-componentes.html`;
const CHAPTERS = [
  "capitulos/01-marca.html",
  "capitulos/02-logo.html",
  "capitulos/03-cores.html",
  "capitulos/04-tipografia.html",
  "capitulos/05-espacamento.html",
  "capitulos/06-componentes.html",
  "capitulos/07-motion.html",
  "capitulos/08-voz.html",
];

test.describe("design system — laboratório hub", () => {
  test("carrega sem erros de console ou rede externa", async ({ page }) => {
    const erros = [];
    const externos = [];
    page.on("pageerror", (err) => erros.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") erros.push(msg.text());
    });
    page.on("request", (req) => {
      const url = req.url();
      if (
        /^https?:\/\//i.test(url) &&
        !url.includes("localhost") &&
        !url.includes("127.0.0.1")
      ) {
        externos.push(url);
      }
    });

    await page.goto(LAB);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".lab-banner")).toContainText(/DEMO/i);
    await expect(page.locator(".lab-nav")).toBeVisible();
    expect(erros, erros.join("\n")).toEqual([]);
    expect(externos, externos.join("\n")).toEqual([]);
  });

  test("axe WCAG 2.2 A/AA sem violações graves (hub)", async ({ page }) => {
    await page.goto(LAB);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("viewports sem overflow horizontal indevido (hub)", async ({ page }) => {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(LAB);
      const overflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        );
      });
      expect(overflow, `overflow em ${width}`).toBeFalsy();
    }
  });
});

test.describe("design system — capítulos brand book", () => {
  for (const rel of CHAPTERS) {
    test(`smoke ${rel}: h1 + nav + tokens`, async ({ page }) => {
      const erros = [];
      page.on("pageerror", (err) => erros.push(String(err)));
      await page.goto(`${LAB}${rel}`);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator(".lab-nav")).toBeVisible();
      const hasTokens = await page.evaluate(() => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(
          "--cor-superficie-papel"
        );
        return Boolean(v && v.trim());
      });
      expect(hasTokens, "token --cor-superficie-papel ausente").toBeTruthy();
      expect(erros, erros.join("\n")).toEqual([]);
    });
  }
});

test.describe("design system — demos dc-* (cap. 06)", () => {
  test("sumário abre/fecha e Esc restaura foco", async ({ page }) => {
    await page.goto(CMP);
    const btn = page.locator("#sumario-btn");
    await btn.focus();
    await btn.press("Enter");
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#sumario-painel")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toBeFocused();
  });

  test("abas alternam com teclado (setas, Home, End)", async ({ page }) => {
    await page.goto(CMP);
    await page.locator("#tab-a").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#tab-b")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#panel-b")).toBeVisible();
    await page.keyboard.press("Home");
    await expect(page.locator("#tab-a")).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(page.locator("#tab-b")).toHaveAttribute("aria-selected", "true");
  });

  test("progresso sincroniza aria-valuenow e --dc-progresso", async ({ page }) => {
    await page.goto(CMP);
    const sync = await page.locator("#progresso-demo").evaluate((el) => {
      const now = el.getAttribute("aria-valuenow");
      const barra = el.querySelector(".dc-progresso__barra");
      const css = barra
        ? getComputedStyle(barra).getPropertyValue("--dc-progresso").trim()
        : "";
      return { now, css };
    });
    expect(sync.now).toBe("40");
    expect(sync.css).toBe("40%");
  });

  test("ação aria-disabled expõe motivo via aria-describedby", async ({ page }) => {
    await page.goto(CMP);
    const btn = page.locator('#CMP-02 [aria-disabled="true"]');
    await expect(btn).toHaveAttribute("aria-describedby", "acao-motivo-demo");
    await expect(page.locator("#acao-motivo-demo")).toBeVisible();
  });
});
