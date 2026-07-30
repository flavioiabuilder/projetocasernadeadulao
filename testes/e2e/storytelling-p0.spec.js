"use strict";

const { test, expect } = require("@playwright/test");

const caminho = "/prototipos/storytelling-v1/";

test.describe("storytelling-v1 — decisão pastoral", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(caminho + "#s63a");
    await page.locator("#s63a").scrollIntoViewIfNeeded();
  });

  test("gera resumo, mailto e feedback de cópia acessível", async ({ page, context }) => {
    let copiado = "";
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

    await page.locator("#decisao-modulo-1").check();
    await page.locator("#observacoes-pastorais").fill("Revisar a lição inicial.");
    await page.locator("#copiar-resumo").click();
    await expect(page.locator("#estado-copia")).toHaveText("Resumo copiado.");
    copiado = await page.evaluate(() => window.__textoCopiado);
    expect(copiado).toContain("- Apreciação doutrinária e pastoral do Módulo 1");
    expect(copiado).toContain("Observações:\nRevisar a lição inicial.");

    const href = await page.locator("#responder-email").getAttribute("href");
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
    await page.locator("#observacoes-pastorais").focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.type("Texto pelo teclado");
    await expect(page.locator("#observacoes-pastorais")).toHaveValue(
      "Texto pelo teclado"
    );
    await expect(page.locator(`#${slideInicial}`)).toBeInViewport();

    await page.locator("#observacoes-pastorais").fill("");
    const href = await page.locator("#responder-email").getAttribute("href");
    const corpo = new URL(href).searchParams.get("body");
    expect(corpo).toContain("Nenhum item assinalado.");
    expect(corpo).toContain("Sem observações adicionais.");
  });

  test("permanece navegável depois da interação", async ({ page }) => {
    await page.locator("#decisao-guia-mestre").focus();
    await page.keyboard.press("Space");
    await expect(page.locator("#decisao-guia-mestre")).toBeChecked();
    await page.locator("#prox").click();
    await expect(page.locator("#s63b")).toBeInViewport();
  });
});
