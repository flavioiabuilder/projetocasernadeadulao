# Roteiro de validação do protótipo — Fase 5

- **Candidato / canônico:** `prototipos/prospecto-fase-5-v1/`
- **Status:** canônico técnico (F5-10) — Fase 6 liberada, não iniciada

## Gates técnicos

| Gate              | Comando                                             | Exit | Notas                         |
| ----------------- | --------------------------------------------------- | ---: | ----------------------------- |
| Método            | `npm run validate:metodo`                           |    0 | Estado aprovado + F6 liberada |
| Tokens            | `npm run validate:discipulando:tokens`              |    0 |                               |
| Design system     | `npm run validate:discipulando:design-system`       |    0 | Inclui custom properties      |
| Prototipagem      | `npm run validate:discipulando:prototipagem`        |    0 | Fidelidade + PE               |
| Stale F5          | `npm run check:discipulando:prototipo-fase-5:stale` |    0 | `buildPrototype` em temp      |
| Teste unitário F5 | `npm run test:discipulando:prototipo-fase-5`        |    0 | Semântica, folheador, PDF     |
| E2E F5            | `npm run test:discipulando:prototipo-fase-5:e2e`    |    0 | 10 passed (2026-08-03)        |
| Capturas          | `npm run capture:discipulando:prototipo-fase-5`     |    0 | HTTP local + `meta.json`      |
| Format            | `npm run format:check`                              |    0 | Inclui JS gerado F5           |
| Programa          | `npm run validate:discipulando`                     |    0 | Suite completa                |
| Repo              | `npm run validate`                                  |    0 | discipulando + refs + método  |

## Checagens

- [x] Skip + `#conteudo` + um `h1`
- [x] Cinco movimentos presentes
- [x] Umbral único (seção 4 / `dc-umbral`)
- [x] Contextos navy §1 / §13 / §15
- [x] Pedido pastoral / assinatura única + rodapé institucional único
- [x] Folheador SPC-F5-01 (7+9) com PE no-JS
- [x] PDF sem link falso (status editorial)
- [x] Sem rede/CDN no HTML
- [x] Teclado (sumário; abas; folheador)
- [x] Axe WCAG 2.2 A/AA (suite e2e)
- [x] `prefers-reduced-motion`
- [ ] Zoom 200% / forced colors — inspeção ou evidência residual formal

## Vetos (reprovam canônico)

Conteúdo inventado; citação alterada; direção ≠ A; primitivos; dependência de
motion; inacessível sem JS; alteração de históricos; Pages sem decisão humana;
PDF inventado.

## Decisão

Registrada em
[`decisao-do-prototipo-canonico.md`](decisao-do-prototipo-canonico.md) e
[`estado-prototipo-canonico.json`](estado-prototipo-canonico.json).

Pacote Gate A:
[`../fase-6/pacote-gate-a-decisao-humana.md`](../fase-6/pacote-gate-a-decisao-humana.md).
