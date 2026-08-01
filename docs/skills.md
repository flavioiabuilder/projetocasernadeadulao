# Skills de agente — fonte canônica

Norma detalhada: [`docs/arquitetura/ADR-006-ferramentas-de-ia.md`](arquitetura/ADR-006-ferramentas-de-ia.md).

## Decisão D2 (default técnico)

A árvore canônica de skills do projeto é:

**`.claude/skills/`**

Ali ficam Impeccable, brand, design, design-system, frontend-design, ui-ux-pro-max,
slides, banner-design, ui-styling, web-design-guidelines, astryx, Higgsfield
(`higgsfield-generate`, soul-id, product-photoshoot, marketplace-cards, websites,
video-explainer, game-generation), Chrome DevTools MCP (`chrome-devtools`,
`chrome-devtools-cli`, `debug-optimize-lcp`, `memory-leak-debugging`,
`a11y-debugging`, `troubleshooting`) etc.

## Espelhos

| Árvore            | Papel                            |
| ----------------- | -------------------------------- |
| `.cursor/skills/` | Subconjunto para o IDE Cursor    |
| `.agents/skills/` | Subconjunto para o agente Cursor |
| `.github/skills/` | **Removida** — não reintroduzir  |

Os espelhos **não** precisam ser cópias 1:1 do canônico. Lock: `skills-lock.json`.
CLI: `@higgsfield/cli` (devDependency); autenticar com `higgsfield auth login`.

Mapa do método (equivalências e gaps, **sem** segunda árvore canônica):
[`../metodo/skills/README.md`](../metodo/skills/README.md).

## Hooks

Hooks em [`.github/hooks/impeccable.json`](../.github/hooks/impeccable.json)
apontam para `.claude/skills/impeccable/`.

Se uma ferramenta externa ainda procurar `.github/skills/impeccable`, atualize o
caminho ou restaure um symlink local não versionado — não reintroduza a cópia
completa no Git.

## Política de sync (default)

Disciplina documental + `skills-lock.json`. Script automático de sync ou
submódulo externo fica como decisão humana futura (ADR-006).
