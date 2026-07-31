---
name: astryx
description: >-
  Meta's open-source Astryx design system (React + StyleX): components, themes,
  tokens, templates, CLI, and agent docs. Use when the user asks for Astryx,
  XDS, @astryxdesign, design-system components in React, themes/tokens via
  astryx CLI, or MCP-backed component lookup. Do not treat as the default UI
  stack for this project's static pastoral prospectus unless the user
  explicitly chooses to adopt Astryx/React.
metadata:
  author: meta
  source: https://github.com/facebook/astryx
  docs: https://astryx.atmeta.com
  version: "0.2.0"
---

# Astryx

Open-source design system from Meta: 90+ accessible React components, brand theming, patterns/templates, CLI, and agent-ready docs. **System, not moodboard inspiration.**

Official: [GitHub](https://github.com/facebook/astryx) · [Docs](https://astryx.atmeta.com) · [Working with AI](https://astryx.atmeta.com/docs/working-with-ai)

## Scope on this repository

This repo's public surface is a **static HTML/CSS/JS** pastoral prospectus (Discipulando a Caserna). Canonical delivery constraints stay in force: no CDN runtime framework, no inventing institutional content, content from `conteudo/`.

- **Use this skill** when building or discussing Astryx/React UI, exploring the CLI/MCP, or the user explicitly asks to adopt Astryx.
- **Do not** rewrite `index.html` / existing prospecto CSS to Astryx components, inject React, or apply “no raw `<div>`” Astryx rules to the static site unless the user requests that migration.

## Agent reference (generated)

Read [REFERENCE.md](REFERENCE.md) for the managed Astryx block (workflow, rules, CLI cheat sheet). Refresh after CLI upgrades:

```bash
npx @astryxdesign/cli init --features agents --agent-docs-path .claude/skills/astryx/REFERENCE.md
```

## CLI workflow

Prefer the scoped package so agents do not hit the unrelated bare `astryx` npm name:

```bash
npx @astryxdesign/cli help
npx @astryxdesign/cli build "<idea>"
npx @astryxdesign/cli component --list
npx @astryxdesign/cli component Button --dense
npx @astryxdesign/cli template --list
npx @astryxdesign/cli docs tokens --dense
npx @astryxdesign/cli search "dialog"
```

When `@astryxdesign/cli` is a project dependency, add:

```json
"scripts": {
  "astryx": "node node_modules/@astryxdesign/cli/bin/astryx.mjs"
}
```

Then run `npm run astryx -- component --list`.

### Adopting Astryx in an app (only if requested)

```bash
npm install @astryxdesign/core @astryxdesign/theme-neutral
npm install -D @astryxdesign/cli
npx @astryxdesign/cli init
```

Entry CSS (required or components render unstyled):

```js
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
```

## MCP (optional)

Remote MCP for live component/doc lookup ([docs](https://astryx.atmeta.com/docs/working-with-ai)):

```json
{
  "mcpServers": {
    "xds": {
      "type": "url",
      "url": "https://astryx.atmeta.com/mcp"
    }
  }
}
```

## Before writing Astryx UI

Follow REFERENCE.md: discover with CLI (`build` → `template` → `component`), use tokens/components instead of inventing props or raw layout primitives, and verify with `astryx component <Name>` / `astryx search` when unsure.
