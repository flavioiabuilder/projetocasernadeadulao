"use strict";

/**
 * Configuração Playwright PRÓPRIA desta referência.
 *
 * Deliberadamente separada de playwright.config.js da raiz: os testes do
 * Discipulando a Caserna e os desta referência não devem compartilhar
 * testDir, baseURL nem ciclo de vida. Rodar um não pode arrastar o outro.
 *
 * Porta 4174 para não colidir com o servidor do programa principal (4173).
 */

const { defineConfig } = require("@playwright/test");

const PORTA = 4174;

module.exports = defineConfig({
  testDir: "testes/e2e",
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://127.0.0.1:${PORTA}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npx --yes serve -l ${PORTA} ../..`,
    url: `http://127.0.0.1:${PORTA}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
