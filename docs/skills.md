# Skills de agente — fonte canônica

## Decisão D2 (default técnico da auditoria integral)

A árvore canônica de skills do projeto é:

**`.claude/skills/`**

Ali ficam Impeccable, brand, design, design-system, frontend-design, ui-ux-pro-max,
slides, banner-design, ui-styling, web-design-guidelines, astryx, Higgsfield
(`higgsfield-generate`, soul-id, product-photoshoot, marketplace-cards, websites,
video-explainer, game-generation) etc.

Espelho em `.agents/skills/` para o agente Cursor. Lock: `skills-lock.json`.
CLI: `@higgsfield/cli` (devDependency); autenticar com `higgsfield auth login`.

## `.github/skills/`

Removida a duplicata. Hooks em [`.github/hooks/impeccable.json`](../.github/hooks/impeccable.json)
apontam para `.claude/skills/impeccable/`.

Se uma ferramenta externa ainda procurar `.github/skills/impeccable`, atualize o
caminho ou restaure um symlink local não versionado — não reintroduza a cópia
completa no Git.
