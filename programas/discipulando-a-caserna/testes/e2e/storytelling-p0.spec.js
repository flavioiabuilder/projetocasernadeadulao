"use strict";

const { test, expect } = require("@playwright/test");

const caminho = "/prototipos/storytelling-v1/";

test.describe("storytelling-v1 — decisão pastoral", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(caminho + "#s63a");
    await page.locator("#s63a").scrollIntoViewIfNeeded();
  });

  test("gera resumo, mailto e feedback de cópia acessível", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.evaluate(() => {
      window.__textoCopiado = "";
      Object.defineProperty(window.navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (texto) => {
            window.__textoCopiado = texto;
          },
        },
      });
    });

    await page.locator("#check-0").check();
    await page.locator("#obs-geral").fill("Revisar a lição inicial.");
    await page.locator("#btn-copiar-resumo").click();
    await expect(page.locator("#copiar-status")).toHaveText(/Resumo copiado/);
    const copiado = await page.evaluate(() => window.__textoCopiado);
    expect(copiado).toContain("[x] Apreciação doutrinária e pastoral do Módulo 1");
    expect(copiado).toContain("Observações:");
    expect(copiado).toContain("Revisar a lição inicial.");

    const href = await page.locator("#btn-mailto").getAttribute("href");
    const parametros = new URL(href).searchParams;
    expect(parametros.get("subject")).toBe(
      "Discipulando a Caserna — apreciação pastoral"
    );
    expect(parametros.get("body")).toBe(copiado);
  });

  test("explicita estados vazios e não navega enquanto o textarea recebe teclas", async ({
    page,
  }) => {
    const slideInicial = await page.locator("#s63a").evaluate((elemento) => elemento.id);
    await page.locator("#obs-geral").focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.type("Texto pelo teclado");
    await expect(page.locator("#obs-geral")).toHaveValue("Texto pelo teclado");
    await expect(page.locator(`#${slideInicial}`)).toBeInViewport();

    await page.locator("#obs-geral").fill("");
    // Dispara atualização do mailto
    await page.locator("#obs-geral").dispatchEvent("input");
    const href = await page.locator("#btn-mailto").getAttribute("href");
    const corpo = new URL(href).searchParams.get("body");
    expect(corpo).toContain("[ ] Apreciação doutrinária e pastoral do Módulo 1");
    expect(corpo).toContain("Observações:");
    expect(corpo).toContain("(nenhuma)");
  });

  test("permanece navegável depois da interação", async ({ page }) => {
    await page.locator("#check-1").check();
    await expect(page.locator("#check-1")).toBeChecked();
    // Garante índice atual = s63a antes do controle #prox (IO pode atrasar).
    await page.evaluate(() => {
      const slides = Array.from(document.querySelectorAll(".slide"));
      const i = slides.findIndex((s) => s.id === "s63a");
      if (i < 0) throw new Error("s63a ausente");
      slides[i + 1].scrollIntoView({ behavior: "instant", block: "start" });
    });
    await expect(page.locator("#s63b")).toBeInViewport();
    await expect(page.locator("#check-1")).toBeChecked();
  });
});
