# Roteiro de validação do protótipo — Fase 5

- **Candidato:** `prototipos/prospecto-fase-5-v1/`
- **Status:** candidato validado estruturalmente + E2E (não canônico)

## Gates técnicos

| Gate | Comando | Exit | Notas |
| --- | --- | ---: | --- |
| Método | `npm run validate:metodo` | 0 | Inclui estado F5 + check F6 bloqueada |
| Tokens | `npm run validate:discipulando:tokens` | 0 | |
| Design system | `npm run validate:discipulando:design-system` | 0 | |
| Prototipagem | `npm run validate:discipulando:prototipagem` | 0 | Fidelidade + PE |
| Stale F5 | `npm run check:discipulando:prototipo-fase-5:stale` | 0 | Sem write no working tree |
| Teste unitário F5 | `npm run test:discipulando:prototipo-fase-5` | 0 | + `parse-md-blocos` |
| E2E F5 | `npm run test:discipulando:prototipo-fase-5:e2e` | 0 | 7/7 (Axe, PE sem JS, foco, abas) |
| Capturas | `npm run capture:discipulando:prototipo-fase-5` | 0 | PNGs em `capturas/` |

Exit codes registrados em 2026-08-02 após Onda 0 de saneamento.

## Checagens manuais

- [x] Skip + `#conteudo` + um `h1` (inspecionado no HTML gerado)
- [x] Cinco movimentos presentes
- [x] Umbral único (seção 4 / `dc-umbral`)
- [x] Pedido pastoral / assinatura (seção 15 + PAD-06)
- [x] Lacunas honestas (M3/M4 null; F6-05/F6-06 pendentes; sem lacuna falsa 10–11)
- [x] Sem rede/CDN no HTML
- [x] Teclado (sumário Escape + foco destino; abas automáticas) — e2e
- [x] Axe WCAG 2.2 A/AA — e2e
- [x] `prefers-reduced-motion` visual — captura `topo-1440x900-reduced-motion.png`
- [ ] Zoom 200% / reflow — inspeção humana residual

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
6. Decidir F6-05 (folheador) e F6-06 (PDF dossiê) antes ou junto da autorização.

Ver também [`../fase-6/pacote-gate-a-decisao-humana.md`](../fase-6/pacote-gate-a-decisao-humana.md).
