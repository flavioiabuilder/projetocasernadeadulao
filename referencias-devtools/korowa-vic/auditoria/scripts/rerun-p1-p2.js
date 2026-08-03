const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const TARGET = "https://www.korowa.vic.edu.au/";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(TARGET, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2500);
  for (const name of ["styles.js", "cascade.js"]) {
    const src = fs.readFileSync(path.join(ROOT, "probes", name), "utf8");
    const data = await page.evaluate(src);
    const out =
      name === "styles.js"
        ? "p1-styles-1440x900-f0.json"
        : "p2-cascade-1440x900-f0.json";
    const text = JSON.stringify(data);
    fs.writeFileSync(path.join(ROOT, "raw", out), text);
    console.log(out, Buffer.byteLength(text));
  }
  await browser.close();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
