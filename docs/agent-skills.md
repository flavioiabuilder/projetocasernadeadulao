# Catálogo de skills e ferramentas de agente

Norma de localização e espelhos: [`docs/skills.md`](skills.md) · [ADR-006](arquitetura/ADR-006-ferramentas-de-ia.md).

Este documento inventaria **o que instalar, quando usar e o que ficou só catalogado**
a partir de fontes externas (Matt Pocock, Anthropic, Superpowers, Ruflo,
awesome-claude-code, Chrome DevTools MCP, Repomix).

## Precedência

1. `conteudo/` + [`.cursor/rules/discipulando-caserna.mdc`](../.cursor/rules/discipulando-caserna.mdc) e qualidade estática
2. Skills de prosa (`writing-guidelines`, `avoid-ai-writing`, `doc-coauthoring`) — só chrome de UI ou rascunhos; **não** reescrever citações `>` literais nem inventar fatos institucionais
3. HTML estático do prospecto > Astryx/React
4. Gate de qualidade: `npm run validate` (ou `validate:discipulando`)

## Já instalado (design, a11y, mídia, DevTools)

| Família          | Skills (canônico `.claude/skills/`)                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design           | `frontend-design`, `impeccable`, `ui-ux-pro-max`, `brand`, `design`, `design-system`, `ui-styling`, `slides`, `banner-design`, `web-design-guidelines`, `astryx`, `scroll-world-storytelling` |
| A11y             | `web-a11y-*` (10 skills), `a11y-debugging`                                                                                                                                                    |
| Editorial / docs | `writing-guidelines`, `pdf`                                                                                                                                                                   |
| Higgsfield       | `higgsfield-*` (CLI autenticado)                                                                                                                                                              |
| Chrome DevTools  | `chrome-devtools`, `chrome-devtools-cli`, `debug-optimize-lcp`, `memory-leak-debugging`, `troubleshooting`                                                                                    |

## Integrado nesta rodada (workflow + editorial + contexto)

| Skill                      | Fonte                          | Quando usar                                          | Como invocar                  |
| -------------------------- | ------------------------------ | ---------------------------------------------------- | ----------------------------- |
| `grill-me` / `grilling`    | mattpocock/skills              | Alinhar decisões antes de implementar                | `/grill-me` ou pedir grilling |
| `grill-with-docs`          | mattpocock/skills              | Grilling + atualizar `CONTEXT.md` / ADRs             | `/grill-with-docs`            |
| `domain-modeling`          | mattpocock/skills              | Afiar glossário Caserna/Discipulando                 | sob demanda                   |
| `setup-matt-pocock-skills` | mattpocock/skills              | Config local do suite (já aplicado: arquivos locais) | uma vez                       |
| `tdd`                      | mattpocock/skills              | Red-green-refactor em JS/testes                      | `/tdd`                        |
| `diagnosing-bugs`          | mattpocock/skills              | Bugs de scroll, a11y, runtime                        | sob demanda                   |
| `code-review`              | mattpocock/skills              | Revisão standards + spec do diff                     | sob demanda                   |
| `handoff`                  | mattpocock/skills              | Compactar sessão para outro agente                   | `/handoff`                    |
| `doc-coauthoring`          | anthropics/skills              | Coautoria editorial com “reader testing”             | sob demanda                   |
| `webapp-testing`           | anthropics/skills              | Playwright no servidor local                         | sob demanda                   |
| `avoid-ai-writing`         | conorbronsdon/avoid-ai-writing | Auditar AI-isms (preferir detect em `conteudo/`)     | sob demanda                   |
| `repomix-explorer`         | yamadashy/repomix              | Empacotar contexto do repo para IA                   | `npm run pack:context`        |

### Domínio local (Matt Pocock)

- Vocabulário compartilhado: [`CONTEXT.md`](../CONTEXT.md) na raiz
- Notas / ADRs de agente: [`docs/agent/`](agent/)
- Issue tracker: **arquivos locais** (sem Linear obrigatório)

### MCP

| Servidor        | Config                                    | Uso                                                                                                                                                                                                                |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Astryx (`xds`)  | [`.cursor/mcp.json`](../.cursor/mcp.json) | Consulta de componentes Astryx (não é stack do prospecto)                                                                                                                                                          |
| Chrome DevTools | mesmo arquivo                             | Auditoria ao vivo (screenshot, a11y tree, Lighthouse, perf). Servir o site (`npx serve programas/discipulando-a-caserna/prototipos/prospecto-v1` ou fluxo do programa) antes. **Não** substitui `npm run validate` |

### Repomix

```bash
npm run pack:context
```

Gera pacote AI-friendly com includes focados (conteúdo, HTML/CSS/JS do programa, docs, testes) e ignore de `js/dados/**`, `node_modules/**` e demos pesadas de skills. Config: [`repomix.config.json`](../repomix.config.json).

## Catalogado sem instalar

### obra/superpowers

**Não** instalar o plugin completo (worktrees/branches conflitam com
[commits-na-main](../.cursor/rules/commits-na-main.mdc)).

| Ideia Superpowers              | Equivalente neste repo             |
| ------------------------------ | ---------------------------------- |
| brainstorming                  | `grill-me` / `grill-with-docs`     |
| TDD                            | `tdd`                              |
| systematic-debugging           | `diagnosing-bugs`                  |
| verification-before-completion | `npm run validate` + `code-review` |

### ruvnet/ruflo

Harness/MCP de swarms — **fora de escopo**. Revisitar só se houver necessidade
real de orquestração multiagente.

### awesome-claude-code (watchlist)

Lista: [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code).

| Item                 | Status                                                       |
| -------------------- | ------------------------------------------------------------ |
| avoid-ai-writing     | **Instalado**                                                |
| Dev Browser          | Coberto em parte por Chrome DevTools MCP + Playwright e2e    |
| StyleSeed / UI Craft | Sobreposição com impeccable / ui-ux-pro-max — não instalar   |
| MDXG Redline         | Watchlist (revisão humana de MD); não instalado nesta rodada |

## Atualização

```bash
npx skills update
```

Lock: [`skills-lock.json`](../skills-lock.json). Canônico: `.claude/skills/`.
