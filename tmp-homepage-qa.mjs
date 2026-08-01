import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

const base = "http://localhost:4173/";
const out = [];
const browser = await chromium.launch({ headless: true });

async function checkPage(label, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  const resp = await page.goto(base, { waitUntil: "networkidle" });
  const status = resp?.status();
  const title = await page.title();
  const h1 = await page.locator("h1").count();
  const h1Text = (await page.locator("h1").first().innerText())
    .replace(/\s+/g, " ")
    .trim();
  const bodyText = await page.locator("body").innerText();
  const hasDiscip = /Discipulando/i.test(bodyText);
  const overflow = await page.evaluate(() => {
    const wider = document.documentElement.scrollWidth > window.innerWidth + 1;
    window.scrollTo(120, 0);
    const scrolled = window.scrollX > 0;
    window.scrollTo(0, 0);
    return wider && scrolled;
  });
  const lcpCandidate = await page.evaluate(() => {
    const el = document.querySelector("h1");
    if (!el) return null;
    const style = getComputedStyle(el);
    return {
      opacity: style.opacity,
      visibility: style.visibility,
      text: el.textContent.trim().slice(0, 80),
    };
  });

  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(
    () => document.activeElement?.className || document.activeElement?.tagName
  );
  await page.evaluate(() => document.activeElement?.blur());

  const toggle = page.locator("[data-nav-toggle]");
  let menuOk = "n/a";
  if (await toggle.isVisible()) {
    await toggle.click();
    const expanded = await toggle.getAttribute("aria-expanded");
    await page.keyboard.press("Escape");
    const after = await toggle.getAttribute("aria-expanded");
    menuOk = `open=${expanded} escape=${after}`;
  }

  if (await toggle.isVisible()) {
    const open = await toggle.getAttribute("aria-expanded");
    if (open !== "true") await toggle.click();
  }
  await page.locator('nav a[href="#caminho"]').click();
  await page.waitForTimeout(700);
  const hash = await page.evaluate(() => location.hash);

  const canScrollX = await page.evaluate(() => {
    window.scrollTo(120, window.scrollY);
    const x = window.scrollX;
    window.scrollTo(0, window.scrollY);
    return x;
  });

  let axeViolations = [];
  try {
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    axeViolations = axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help,
      targets: v.nodes.map((n) => ({
        target: n.target,
        summary: (n.failureSummary || "").split("\n").slice(0, 3).join(" "),
      })),
    }));
  } catch (e) {
    axeViolations = [{ id: "axe-error", help: String(e) }];
  }

  const resources = await page.evaluate(() =>
    performance.getEntriesByType("resource").map((r) => r.name)
  );

  out.push({
    label,
    status,
    title,
    h1,
    h1Text,
    hasDiscip,
    overflow,
    canScrollX,
    lcpCandidate,
    firstFocused,
    menuOk,
    hash,
    consoleErrors,
    externalResources: resources.filter(
      (u) => !u.startsWith(base) && !u.startsWith("data:")
    ),
    axeViolations,
  });

  const dir = "tmp-homepage-qa";
  fs.mkdirSync(dir, { recursive: true });
  const safe = label.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  await page.screenshot({ path: `${dir}/${safe}.png`, fullPage: false });

  await context.close();
}

const viewports = [
  ["320x568", { viewport: { width: 320, height: 568 } }],
  ["360x800", { viewport: { width: 360, height: 800 } }],
  ["390x844", { viewport: { width: 390, height: 844 } }],
  ["412x915", { viewport: { width: 412, height: 915 } }],
  ["768x1024", { viewport: { width: 768, height: 1024 } }],
  ["1024x768", { viewport: { width: 1024, height: 768 } }],
  ["1366x768", { viewport: { width: 1366, height: 768 } }],
  ["1440x900", { viewport: { width: 1440, height: 900 } }],
  ["1920x1080", { viewport: { width: 1920, height: 1080 } }],
];

for (const [label, opts] of viewports) {
  await checkPage(label, opts);
}

await checkPage("reduced-motion-390", {
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});

fs.writeFileSync("tmp-homepage-qa/report.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
