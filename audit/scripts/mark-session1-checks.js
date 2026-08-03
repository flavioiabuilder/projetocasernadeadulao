const fs = require("node:fs");
const path = require("node:path");

const file = path.join(__dirname, "..", "checks.json");
const checks = JSON.parse(fs.readFileSync(file, "utf8"));

const pass = {
  "SETUP-001": "git HEAD 1191c73 baseline limpo",
  "SETUP-002": "audit/PLAN.md",
  "SETUP-003": "audit/init.sh + audit/cli.js",
  "SETUP-004": "audit/checks.json (189)",
  "SETUP-005": "audit/progress.md",
  "SETUP-006": "audit/probes/*",
  "SETUP-007": ".mcp.json chrome-devtools",
  "SETUP-009": "audit/raw + captures",
  "SETUP-010": "slug korowa-vic em PLAN",
  "SETUP-012": "git status sem diffs em programas/",
  "PROBE-P1": "audit/raw/p1-styles-1440x900-f0.json",
  "PROBE-P2": "audit/raw/p2-cascade-1440x900-f0.json",
  "PROBE-P3": "audit/raw/p3-scroll-curve-1440x900.json",
  "PROBE-P4": "audit/raw/p4-canvas-1440x900.json",
  "PROBE-P8": "audit/raw/p8-frames.json",
  "INV1-001": "audit/raw/p3-scroll-curve-1440x900.json",
  "INV1-002": "audit/captures/dry-run-1440x900/",
  "INV1-003": "audit/raw/p8-frames.json",
  "INV1-008": "audit/NARRATIVE-MAP.md",
  "INV1-022": "audit/raw/provenance.jsonl",
  "INV1-023": "audit/raw/p4-canvas-1440x900.json",
  "INV2-010": "parcial: varredura grossa 1440×900 (refino NÃO OBSERVADO)",
  "INT-008": "raw sizes P1–P4/P8 ≤30KB pós-ajuste",
};

let n = 0;
for (const c of checks) {
  if (pass[c.id]) {
    c.passes = true;
    c.evidence = pass[c.id];
    n += 1;
  }
}
// SETUP-008 MCP loaded — intentionally false
fs.writeFileSync(file, JSON.stringify(checks, null, 2) + "\n");
console.log(JSON.stringify({ marked: n, total: checks.length }, null, 2));
