import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
fs.mkdirSync("tmp-homepage-qa", { recursive: true });
await page.screenshot({ path: "tmp-homepage-qa/hero-390.png", fullPage: false });

const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
  .analyze();
for (const v of axe.violations) {
  console.log("\n==", v.id, v.help);
  for (const n of v.nodes) {
    console.log("-", n.target.join(" "));
    console.log(" ", n.failureSummary?.split("\n").slice(0, 4).join(" | "));
  }
}

await context.close();

const context2 = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page2 = await context2.newPage();
await page2.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page2.screenshot({ path: "tmp-homepage-qa/hero-1440.png", fullPage: false });

const axe2 = await new AxeBuilder({ page: page2 })
  .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
  .analyze();
console.log("\n== DESKTOP violations", axe2.violations.length);
for (const v of axe2.violations) {
  for (const n of v.nodes) {
    console.log("-", n.target.join(" "));
    console.log(" ", n.failureSummary?.split("\n").slice(0, 4).join(" | "));
  }
}

const context3 = await browser.newContext({
  viewport: { width: 768, height: 1024 },
});
const page3 = await context3.newPage();
await page3.goto("http://localhost:4173/", { waitUntil: "networkidle" });
const overflow768 = await page3.evaluate(() => {
  const doc = document.documentElement;
  const offenders = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1) {
      offenders.push({
        tag: el.tagName,
        cls: String(el.className || "").slice(0, 100),
        w: Math.round(r.width),
        right: Math.round(r.right),
      });
    }
  });
  return {
    scrollWidth: doc.scrollWidth,
    innerWidth: window.innerWidth,
    offenders: offenders.slice(0, 20),
  };
});
console.log("\nOVERFLOW 768", JSON.stringify(overflow768, null, 2));
await page3.screenshot({ path: "tmp-homepage-qa/hero-768.png", fullPage: false });

await browser.close();
