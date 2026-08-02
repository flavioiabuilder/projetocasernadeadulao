# Roteiro de validação do protótipo — Fase 5

- **Candidato:** `prototipos/prospecto-fase-5-v1/`
- **Status:** candidato validado estruturalmente (não canônico)

## Gates técnicos

| Gate | Comando | Exit | Notas |
| --- | --- | ---: | --- |
| Método | `npm run validate:metodo` | 0 | Inclui estado F5 |
| Tokens | `npm run validate:discipulando:tokens` | 0 | Pré-Onda 5 |
| Design system | `npm run validate:discipulando:design-system` | 0 | |
| Prototipagem | `npm run validate:discipulando:prototipagem` | 0 | |
| Teste unitário F5 | `npm run test:discipulando:prototipo-fase-5` | 0 | |
| E2E F5 | `npm run test:discipulando:prototipo-fase-5:e2e` | — | **Pendente:** Chromium Playwright ausente neste ambiente (`npx playwright install chromium`) |
| Capturas | `npm run capture:discipulando:prototipo-fase-5` | — | Mesma dependência de browser |

## Checagens manuais

- [x] Skip + `#conteudo` + um `h1` (inspecionado no HTML gerado)
- [x] Cinco movimentos presentes
- [x] Umbral único (seção 4 / `dc-umbral`)
- [x] Pedido pastoral / assinatura (seção 15 + PAD-06)
- [x] Lacunas declaradas (PAD-04; M3/M4 null)
- [x] Sem rede/CDN no HTML
- [ ] Teclado completo no browser (sumário Escape, abas) — rodar e2e após install
- [ ] Axe WCAG 2.2 — rodar e2e após install
- [ ] `prefers-reduced-motion` visual — captura após install
- [ ] Zoom 200% / reflow — inspeção humana

## Vetos (reprovam canônico)

Conteúdo inventado; citação alterada; direção ≠ A; primitivos; dependência de
motion; inacessível sem JS; alteração de históricos; Pages sem F5-11.

## Decisão

A validação técnica **não** canoniza. Ver
[`decisao-do-prototipo-canonico.md`](decisao-do-prototipo-canonico.md).

Pacote para decisão humana (F5-08…12):

1. Abrir `prototipos/prospecto-fase-5-v1/index.html` localmente.
2. Comparar com baselines (completude/gênero) sem conteúdos diferentes.
3. Preencher aceite F5-03…07 no dossiê.
4. Registrar escolha em `decisao-do-prototipo-canonico.md` + JSON.
5. Só então considerar F5-12 (Fase 6).
