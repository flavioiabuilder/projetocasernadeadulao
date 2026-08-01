import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
const page = await context.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });

const toggle = page.locator("[data-nav-toggle]");
await toggle.click();
await page.locator('nav a[href="#caminho"]').click();
await page.waitForTimeout(500);

const canScrollX = await page.evaluate(() => {
  const before = window.scrollX;
  window.scrollTo(200, window.scrollY);
  const after = window.scrollX;
  window.scrollTo(before, window.scrollY);
  return after;
});
console.log("scrollX after attempt", canScrollX);

const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
  .analyze();
console.log("violations", axe.violations.length);
for (const v of axe.violations) {
  console.log("\n", v.id);
  for (const n of v.nodes) {
    console.log("-", n.target.join(" "));
    console.log((n.failureSummary || "").split("\n").slice(0, 3).join(" | "));
  }
}
await browser.close();
