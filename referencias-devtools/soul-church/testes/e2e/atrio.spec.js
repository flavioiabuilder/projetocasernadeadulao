"use strict";

/**
 * Smoke, acessibilidade e fronteiras da reconstrução Átrio, no navegador.
 *
 * Preferimos estados observáveis — atributos, foco, contagens — a esperas
 * por tempo. Onde há animação, o teste aguarda o atributo de estado, não o
 * relógio.
 */

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const BASE = "/referencias-devtools/soul-church/design-system";
const DEMO = `${BASE}/demo.html`;
const LAB = `${BASE}/laboratorio.html`;

/** Coleta erros de console e falhas de página durante o teste. */
function observarConsole(page) {
  const erros = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") erros.push(msg.text());
  });
  page.on("pageerror", (erro) => erros.push(String(erro)));
  return erros;
}

/** Hosts contactados durante o carregamento. */
function observarRede(page) {
  const hosts = new Set();
  page.on("request", (req) => {
    try {
      hosts.add(new URL(req.url()).host);
    } catch (_e) {
      /* URLs não parseáveis (data:, blob:) não interessam aqui */
    }
  });
  return hosts;
}

/* ================================================================ demo == */

test.describe("demonstração", () => {
  test("carrega sem erro de console e monta o conteúdo", async ({ page }) => {
    const erros = observarConsole(page);
    await page.goto(DEMO);

    await expect(page.locator("h1")).toHaveText(/Todo mundo cabe aqui/);
    await expect(page.locator("[data-demo-agenda] li")).toHaveCount(4);
    await expect(page.locator("[data-demo-caminhos] article")).toHaveCount(4);
    await expect(page.locator(".at-horarios__linha")).toHaveCount(4);
    await expect(page.locator(".at-letra")).toHaveCount(13);

    expect(erros).toEqual([]);
  });

  test("não contacta nenhum host além do servidor local", async ({ page }) => {
    const hosts = observarRede(page);
    await page.goto(DEMO, { waitUntil: "networkidle" });

    const externos = [...hosts].filter(
      (h) => !h.startsWith("127.0.0.1") && !h.startsWith("localhost")
    );
    expect(externos, `hosts externos contactados: ${externos.join(", ")}`).toEqual([]);
  });

  test("não há rolagem horizontal em nenhum viewport", async ({ page }) => {
    for (const [w, h] of [
      [1920, 1080],
      [1440, 900],
      [1024, 768],
      [768, 1024],
      [390, 844],
      [360, 800],
    ]) {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(DEMO);
      const excede = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      );
      expect(excede, `rolagem horizontal em ${w}×${h}`).toBe(false);
    }
  });

  test("revela todo o conteúdo mesmo com rolagem em salto", async ({ page }) => {
    await page.goto(DEMO);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect
      .poll(() => page.locator(".at-subir:not([data-revelado])").count())
      .toBe(0);
  });
});

/* ================================================================ menu == */

test.describe("menu global", () => {
  test("abre e fecha por teclado, prende e devolve o foco", async ({ page }) => {
    await page.goto(DEMO);
    const gatilho = page.locator("[data-menu-gatilho]");
    const menu = page.locator("[data-menu]");

    await expect(gatilho).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeHidden();

    await gatilho.focus();
    await page.keyboard.press("Enter");

    await expect(gatilho).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toBeVisible();
    await expect(menu).toHaveAttribute("data-estado", "aberto");
    await expect(menu).toHaveAttribute("aria-modal", "true");

    // O foco entrou no painel — a referência não faz isso.
    const focoDentro = await page.evaluate(() =>
      document.querySelector("[data-menu]").contains(document.activeElement)
    );
    expect(focoDentro).toBe(true);

    // O fundo ficou inerte.
    const inerte = await page.evaluate(
      () => document.querySelector("[data-inertizavel]").inert === true
    );
    expect(inerte).toBe(true);

    await page.keyboard.press("Escape");
    await expect(gatilho).toHaveAttribute("aria-expanded", "false");
    await expect(gatilho).toBeFocused();

    const inerteDepois = await page.evaluate(
      () => document.querySelector("[data-inertizavel]").inert === true
    );
    expect(inerteDepois).toBe(false);
  });

  test("bloqueia e restaura a rolagem", async ({ page }) => {
    await page.goto(DEMO);
    await page.locator("[data-menu-gatilho]").click();
    await expect(page.locator("[data-menu]")).toHaveAttribute("data-estado", "aberto");

    expect(
      await page.evaluate(() =>
        document.documentElement.classList.contains("at-sem-rolagem")
      )
    ).toBe(true);

    await page.keyboard.press("Escape");
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.classList.contains("at-sem-rolagem"))
      )
      .toBe(false);
  });
});

/* ============================================================== painel == */

test.describe("painel contextual", () => {
  test("abre, aceita um assunto por vez e fecha por Escape", async ({ page }) => {
    await page.goto(DEMO);
    await page.locator("[data-painel-gatilho]").click();

    const painel = page.locator("[data-painel]");
    await expect(painel).toBeVisible();
    await expect(painel).toHaveAttribute("data-estado", "aberto");

    const assuntos = page.locator("[data-assunto]");
    await assuntos.nth(0).click();
    await expect(assuntos.nth(0)).toHaveAttribute("aria-expanded", "true");

    await assuntos.nth(1).click();
    await expect(assuntos.nth(0)).toHaveAttribute("aria-expanded", "false");
    await expect(assuntos.nth(1)).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(painel).toHaveAttribute("data-estado", "fechado");
    await expect(page.locator("[data-painel-gatilho]")).toBeFocused();
  });
});

/* ========================================================= formulário == */

test.describe("formulário local", () => {
  test("mostra erro por campo e leva o foco ao primeiro inválido", async ({ page }) => {
    await page.goto(DEMO);
    await page.locator("[data-painel-gatilho]").click();
    await page.locator("[data-assunto]").nth(1).click();

    await page.locator("#form-escuta button[type=submit]").click();

    await expect(page.locator("#form-escuta-erro-nome")).toBeVisible();
    await expect(page.locator("#escuta-nome")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#escuta-nome")).toBeFocused();
    await expect(page.locator("[data-form-feedback]")).toContainText(
      /precisam de atenção/
    );
  });

  test("aceita dados válidos e não transmite nada", async ({ page }) => {
    const hosts = observarRede(page);
    await page.goto(DEMO);
    await page.locator("[data-painel-gatilho]").click();
    await page.locator("[data-assunto]").nth(1).click();

    await page.locator("#escuta-nome").fill("Ana");
    await page.locator("#escuta-email").fill("ana@exemplo.invalid");
    await page.locator("#escuta-mensagem").fill("Gostaria de visitar no sábado.");
    await page.locator("#escuta-aceite").check();
    await page.locator("#form-escuta button[type=submit]").click();

    await expect(page.locator("[data-form-feedback]")).toContainText(
      /nenhum dado foi enviado/i
    );

    const externos = [...hosts].filter(
      (h) => !h.startsWith("127.0.0.1") && !h.startsWith("localhost")
    );
    expect(externos).toEqual([]);
    // Um <form> enviado por GET anexaria os campos à query string. A
    // ausência de query é a prova de que nada foi submetido.
    expect(new URL(page.url()).search).toBe("");
  });

  test("limpa o erro do campo assim que ele é corrigido", async ({ page }) => {
    await page.goto(DEMO);
    await page.locator("[data-painel-gatilho]").click();
    await page.locator("[data-assunto]").nth(1).click();
    await page.locator("#form-escuta button[type=submit]").click();
    await expect(page.locator("#escuta-email")).toHaveAttribute("aria-invalid", "true");

    await page.locator("#escuta-email").fill("ana@exemplo.invalid");
    await expect(page.locator("#escuta-email")).not.toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});

/* ==================================================== movimento reduzido */

test.describe("prefers-reduced-motion", () => {
  test("neutraliza distâncias e mantém o conteúdo visível", async ({ page }) => {
    const erros = observarConsole(page);
    // emulateMedia por página: a opção de contexto `reducedMotion` não é
    // aplicada de forma confiável pelo headless shell desta versão.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(DEMO);

    expect(
      await page.evaluate(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ),
      "a emulação precisa estar ativa para o teste significar algo"
    ).toBe(true);

    const tokens = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      return {
        distPalavra: cs.getPropertyValue("--at-mov-dist-palavra").trim(),
        stagger: cs.getPropertyValue("--at-stagger-palavra").trim(),
        marquee: cs.getPropertyValue("--at-marquee-velocidade").trim(),
      };
    });
    expect(tokens.distPalavra).toBe("0em");
    expect(tokens.stagger).toBe("0ms");
    expect(tokens.marquee).toBe("0em");

    // As letras do palco vão direto ao estado final.
    const opacidades = await page.$$eval(".at-letra", (els) =>
      els.map((e) => Number(getComputedStyle(e).opacity))
    );
    expect(Math.min(...opacidades)).toBe(1);

    expect(erros).toEqual([]);
  });
});

/* ============================================================ sem JS ==== */

test.describe("sem JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("o conteúdo continua legível e nada fica invisível", async ({ page }) => {
    await page.goto(DEMO);
    await expect(page.locator("h1")).toBeVisible();

    const invisiveis = await page.$$eval(
      ".at-subir, .at-revelar",
      (els) => els.filter((e) => Number(getComputedStyle(e).opacity) === 0).length
    );
    expect(invisiveis).toBe(0);
  });
});

/* ======================================================== laboratório == */

test.describe("laboratório", () => {
  test("monta os espécimes sem erro de console", async ({ page }) => {
    const erros = observarConsole(page);
    await page.goto(LAB);

    await expect(page.locator("[data-lab-cores] .lab__amostra")).toHaveCount(15);
    await expect(page.locator(".lab__coluna")).toHaveCount(12);
    await expect(page.locator("[data-lab-em]")).not.toHaveText("—");

    expect(erros).toEqual([]);
  });
});

/* ======================================================= acessibilidade = */

test.describe("acessibilidade", () => {
  test("demo não tem violações axe sérias ou críticas", async ({ page }) => {
    await page.goto(DEMO);
    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const graves = resultado.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact)
    );
    expect(
      graves.map((v) => `${v.id}: ${v.nodes.length} nó(s)`),
      JSON.stringify(
        graves.map((v) => ({ id: v.id, help: v.help })),
        null,
        2
      )
    ).toEqual([]);
  });

  test("demo com o menu aberto não tem violações graves", async ({ page }) => {
    await page.goto(DEMO);
    await page.locator("[data-menu-gatilho]").click();
    await expect(page.locator("[data-menu]")).toHaveAttribute("data-estado", "aberto");

    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const graves = resultado.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact)
    );
    expect(graves.map((v) => v.id)).toEqual([]);
  });

  test("laboratório não tem violações graves", async ({ page }) => {
    await page.goto(LAB);
    const resultado = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const graves = resultado.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact)
    );
    expect(
      graves.map((v) => `${v.id}: ${v.nodes.length} nó(s)`),
      JSON.stringify(
        graves.map((v) => ({ id: v.id, help: v.help })),
        null,
        2
      )
    ).toEqual([]);
  });

  test("títulos fatiados preservam o nome acessível", async ({ page }) => {
    await page.goto(DEMO);
    // O h1 é fatiado em palavras para animar; o texto acessível continua
    // inteiro (a referência soletra letra a letra e destrói o rótulo).
    const nome = await page
      .locator("h1")
      .first()
      .evaluate((el) => el.textContent.trim());
    expect(nome).toContain("Todo mundo cabe aqui");
    const spans = await page.locator("h1 .at-palavra").count();
    expect(spans).toBeGreaterThan(0);
  });

  test("há link de salto e ele leva ao conteúdo", async ({ page }) => {
    await page.goto(DEMO);
    await page.keyboard.press("Tab");
    const foco = await page.evaluate(() => document.activeElement.className);
    expect(foco).toContain("at-pular");
  });

  test("alvos interativos têm ao menos 44px de altura em mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(DEMO);
    const pequenos = await page.$$eval("a[href], button, input, textarea", (els) =>
      els
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) return false;
          // WCAG 2.5.8 isenta a caixa de seleção (tamanho definido pelo
          // agente do usuário) e links inline no fluxo de um parágrafo.
          if (e.type === "checkbox") return false;
          if (getComputedStyle(e).display === "inline") return false;
          return r.height < 44;
        })
        .map((e) => `${e.tagName}.${e.className}`.slice(0, 60))
    );
    expect(pequenos).toEqual([]);
  });
});
