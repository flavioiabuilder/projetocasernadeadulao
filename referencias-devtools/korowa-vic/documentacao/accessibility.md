# Acessibilidade — Friso

## Referência (amostra P6)

Achados típicos a corrigir na reconstrução (não copiar falhas):

- Alvos de toque &lt; 44px quando ocorrerem → Friso usa `min-height/min-width: 2.75rem` nos controles.
- Focus ring: referência com `outline-style: none` frequente → Friso força `:focus-visible` 3px carmesim.
- Canvas: N/A (0 canvas); fallback textual presente.
- `prefers-reduced-motion`: Friso implementa substituição de tokens + reveals estáticos.

## Lighthouse ao vivo (P9/P11 — MCP chrome-devtools, desktop, modo navigation)

Scores: Accessibility **83**, Best Practices **58**, SEO **100**, Agentic Browsing **50** (48 audits passaram, 9 falharam). Relatório completo em `auditoria/raw/lighthouse/report.html` (evidência, não publicado). Falhas relevantes para não copiar na reconstrução:

| Audit | Achado na referência | Friso |
| --- | --- | --- |
| `heading-order` | Hierarquia de headings não é sequencial | `demo.html` usa `h1`→`h2` sem pular níveis |
| `link-name` | Links sem nome discernível | Todo `.fr-action`/nav tem texto visível |
| `target-size` | Alvos de toque sem tamanho/espaçamento suficiente | `--fr-tam-controle-min: 2.75rem` em todos os controles |
| `aria-prohibited-attr` / `aria-required-children` | Uso de ARIA fora da spec | Friso não usa `role` fora do necessário (landmarks nativos) |
| `agent-accessibility-tree` | Árvore de acessibilidade malformada | N/A — reconstrução própria, mais simples |
| `third-party-cookies`, `deprecations`, `inspector-issues` | Ad-tech/rastreamento de terceiros (ver `NARRATIVE-MAP.md` — 23 hosts) | Friso não carrega nenhum script de terceiro |

Not-a-gotcha: Best Practices 58 e Agentic Browsing 50 vêm majoritariamente do volume de scripts de terceiros (ads/fingerprinting) já documentado em `three-dimensional-language.md` — não é algo que a reconstrução deveria replicar.

## Garantias Friso

Skip link, landmarks (`header`/`nav`/`main`/`footer`), `aria-expanded` no menu, fechar com Escape, contraste AA nos pares semânticos creme/ardósia e texto sobre carmesim.