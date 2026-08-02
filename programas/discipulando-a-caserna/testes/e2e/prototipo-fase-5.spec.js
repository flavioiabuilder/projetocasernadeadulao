"use strict";

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const CAND = "/programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/";

test.describe("prototipo fase 5 — candidato", () => {
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

    await page.goto(CAND);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("#movimento-1")).toBeVisible();
    await expect(page.locator("#movimento-5")).toBeAttached();
    expect(erros, erros.join("\n")).toEqual([]);
    expect(externos, externos.join("\n")).toEqual([]);
  });

  test("sumário Escape restaura foco", async ({ page }) => {
    await page.goto(CAND);
    const btn = page.locator("#sumario-btn");
    await btn.focus();
    await btn.press("Enter");
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toBeFocused();
  });

  test("abas da matriz com teclado", async ({ page }) => {
    await page.goto(CAND);
    const tab = page.locator("#tab-mod-1");
    await tab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#tab-mod-2")).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(page.locator("#tab-mod-1")).toHaveAttribute("aria-selected", "true");
  });

  test("axe WCAG 2.2 A/AA sem violações graves", async ({ page }) => {
    await page.goto(CAND);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("viewports sem overflow horizontal indevido", async ({ page }) => {
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(CAND);
      const overflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        );
      });
      expect(overflow, `overflow em ${width}`).toBeFalsy();
    }
  });
});
