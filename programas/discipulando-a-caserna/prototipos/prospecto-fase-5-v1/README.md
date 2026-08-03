# Prospecto Fase 5 — protótipo canônico v1

Protótipo **canônico técnico** da Fase 5 (Fluxo A). Prévia pública no Pages:
**SUSPENSA** (PUB-F5-01). Permanece no repositório como referência local.
**Não** é `prospecto/` de produção. **Não** implica homologação pastoral.

| Campo    | Valor                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Status   | APROVADO (canônico técnico)                                                                                              |
| Canônico | SIM — referência de implementação                                                                                        |
| Fase 6   | LIBERADA (não iniciada)                                                                                                  |
| Tokens   | `../../design-system/tokens/tokens.css`                                                                                  |
| Conteúdo | `conteudo/` via `npm run generate:discipulando:prototipo-fase-5`                                                         |
| Decisão  | [`../../docs/metodo/fase-5/decisao-do-prototipo-canonico.md`](../../docs/metodo/fase-5/decisao-do-prototipo-canonico.md) |

## Estrutura

- `index.html` — **artefato gerado por completo** (contrato: não editar à mão)
- `css/prototipo.css` — estilos do candidato (não importa `lab.css`)
- `js/config.js` — gerado de `ferramentas/institucional.js`
- `js/dados/licao1.js` — gerado do manifesto Lição 1
- `js/folheador.js` — SPC-F5-01 (progressive enhancement)
- `js/prototipo.js` — chrome PE (`html.js`; sumário `<details>`)
- `parcial/` — **gerado**; não editar à mão
- `capturas/` — evidências próprias da Fase 5

## Comandos

```bash
npm run generate:discipulando:prototipo-fase-5
npm run check:discipulando:prototipo-fase-5:stale
npm run validate:discipulando:prototipagem
npm run test:discipulando:prototipo-fase-5
npm run test:discipulando:prototipo-fase-5:e2e
npm run capture:discipulando:prototipo-fase-5
```

## Proibições

Não criar `prospecto/` nesta superfície. Não migrar runtime legado automaticamente.
Não inventar copy. Não expor download do PDF do dossiê enquanto o arquivo público
não existir. Folheador usa somente o manifesto local da Lição 1.
