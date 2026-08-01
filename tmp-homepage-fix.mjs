import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const browser = await chromium.launch({ headless: true });

async function run(label, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });

  const overflow = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    return {
      htmlSW: html.scrollWidth,
      bodySW: body.scrollWidth,
      iw: window.innerWidth,
      cw: html.clientWidth,
    };
  });

  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();

  console.log("\n##", label, overflow);
  for (const v of axe.violations) {
    console.log(v.id, v.nodes.length);
    for (const n of v.nodes.slice(0, 12)) {
      console.log(" ", n.target.join(" "));
      const line = (n.failureSummary || "").split("\n")[1] || n.failureSummary;
      console.log(" ", line);
    }
  }
  if (!axe.violations.length) console.log("axe clean");
  await context.close();
}

await run("390", { width: 390, height: 844 });
await run("768", { width: 768, height: 1024 });
await run("1440", { width: 1440, height: 900 });
await browser.close();
