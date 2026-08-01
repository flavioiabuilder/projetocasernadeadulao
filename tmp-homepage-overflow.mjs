import { chromium } from "@playwright/test";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 768, height: 1024 },
});
const page = await context.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });

const info = await page.evaluate(() => {
  const limit = window.innerWidth + 0.5;
  const offenders = [];
  document.querySelectorAll("body *").forEach((el) => {
    if (el.closest("svg")) return;
    const r = el.getBoundingClientRect();
    const sw = el.scrollWidth;
    if (r.right > limit + 1 || sw > window + 1) {
      offenders.push({
        tag: el.tagName,
        cls: String(el.className || "").slice(0, 120),
        right: Math.round(r.right * 10) / 10,
        w: Math.round(r.width * 10) / 10,
        sw,
      });
    }
  });
  offenders.sort((a, b) => b.right - a.right);
  return {
    bodySW: document.body.scrollWidth,
    htmlSW: document.documentElement.scrollWidth,
    offenders: offenders.slice(0, 25),
  };
});

console.log(JSON.stringify(info, null, 2));

// Also run axe after scrolling through page (like user)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, 0));

const { default: AxeBuilder } = await import("@axe-core/playwright");
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
  .analyze();
console.log(
  "axe after scroll",
  axe.violations.map((v) => ({ id: v.id, n: v.nodes.length }))
);
for (const v of axe.violations) {
  for (const n of v.nodes) {
    console.log(n.target.join(" "), (n.failureSummary || "").split("\n")[1]);
  }
}

await browser.close();
