"use strict";
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const files = ["checks.json", "progress.md", "NARRATIVE-MAP.md", "raw/gates.json"];

for (const rel of files) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) continue;
  let t = fs.readFileSync(p, "utf8");
  t = t.split("audit/").join("auditoria/");
  t = t.split("./auditoria/init.sh").join("referencias-devtools/korowa-vic/auditoria/init.sh");
  t = t
    .split("docs/reference-audit/korowa-vic-audit.md")
    .join("referencias-devtools/korowa-vic/auditoria/korowa-vic-audit.md");
  t = t.split("fora de audit/").join("fora de auditoria/");
  fs.writeFileSync(p, t);
  console.log("updated", rel);
}
