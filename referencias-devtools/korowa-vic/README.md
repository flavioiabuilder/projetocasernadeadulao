# Korowa (auditoria) → reconstrução **Friso**

| Campo | Valor |
| --- | --- |
| Referência | ver [`auditoria/PLAN.md`](auditoria/PLAN.md) (URL só no harness) |
| Slug | `korowa-vic` |
| Reconstrução | **Friso** (prefixo CSS `fr`) |
| Identidade demo | Atlas Editorial — fictícia |
| Host de medição | Playwright (MCP chrome-devtools indisponível nas sessões 1–2) |

Estudo técnico completo nesta pasta. Não é produto do Discipulando a Caserna.
Nada da marca, copy, fotos ou fontes proprietárias da referência entra no runtime.

## Mapa

| Pasta | Conteúdo |
| --- | --- |
| [`auditoria/`](auditoria/) | Harness, sondas, capturas, raw, checks, report, mapa narrativo |
| [`documentacao/`](documentacao/) | Princípios, foundations, componentes, motion, a11y, licença |
| [`design-system/`](design-system/) | Tokens, CSS, JS, lab, demo |
| [`ferramentas/`](ferramentas/) | Gerador de tokens |
| [`testes/`](testes/) | Testes unitários essenciais |

## Executar

```bash
npx serve -l 4173 .
```

- Demo: `/referencias-devtools/korowa-vic/design-system/demo.html`
- Lab: `/referencias-devtools/korowa-vic/design-system/laboratorio.html`
- Report: `/referencias-devtools/korowa-vic/auditoria/report.html`

```bash
npm run generate:tokens:korowa-vic
npm run test:referencias:korowa-vic
npm run audit:korowa-vic -- gates
```
