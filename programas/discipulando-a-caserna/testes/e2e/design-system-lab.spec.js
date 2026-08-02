"use strict";

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const LAB = "/programas/discipulando-a-caserna/design-system/laboratorio/";

test.describe("design system — laboratório", () => {
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
    expect(erros, erros.join("\n")).toEqual([]);
    expect(externos, externos.join("\n")).toEqual([]);
  });

  test("sumário abre/fecha e Esc restaura foco", async ({ page }) => {
    await page.goto(LAB);
    const btn = page.locator("#sumario-btn");
    await btn.focus();
    await btn.press("Enter");
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#sumario-painel")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    await expect(btn).toBeFocused();
  });

  test("abas alternam com teclado", async ({ page }) => {
    await page.goto(LAB);
    await page.locator("#tab-a").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#tab-b")).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#panel-b")).toBeVisible();
  });

  test("axe WCAG 2.2 A/AA sem violações graves", async ({ page }) => {
    await page.goto(LAB);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("viewports sem overflow horizontal indevido", async ({ page }) => {
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
