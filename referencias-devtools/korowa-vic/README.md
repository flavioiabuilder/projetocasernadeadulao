# Korowa (auditoria) → reconstrução **Friso**

| Campo | Valor |
| --- | --- |
| Referência | ver `audit/PLAN.md` (URL só no harness de auditoria) |
| Slug | `korowa-vic` |
| Reconstrução | **Friso** (prefixo CSS `fr`) |
| Identidade demo | Atlas Editorial — fictícia |
| Host de medição | Playwright (MCP chrome-devtools indisponível nas sessões 1–2) |

Estudo técnico em `referencias-devtools/`. Não é produto do Discipulando a Caserna.
Nada da marca, copy, fotos ou fontes proprietárias da referência entra no runtime.

## Mapa

| Pasta | Conteúdo |
| --- | --- |
| [`auditoria/`](auditoria/) | Relatório + ponte para `audit/` na raiz |
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

```bash
npm run generate:tokens:korowa-vic
npm run test:referencias:korowa-vic
```
