# Baseline — auditoria integral (T0-01)

Data: **31 de julho de 2026**.  
HEAD no registro: `1058e575ac17ad4727c260fbad11d29f399daafb` (`main`).  
Runtime: Node `v24.18.0`, npm `11.16.0`.

## Exit codes observados antes das correções

| Comando                     | Exit | Observação                                                                                 |
| --------------------------- | ---: | ------------------------------------------------------------------------------------------ |
| `npm test`                  |    1 | `storytelling-p0.test.js` espera IDs antigos (`decisao-modulo-1`, `observacoes-pastorais`) |
| `npm run check:encoding`    |    0 | OK; reescreve artefatos via `gerar-dados.js` (efeito colateral)                            |
| `npm run lint:html`         |    0 | 1 aviso `element-permitted-content` (style em noscript)                                    |
| `npm run lint:css`          |    0 | —                                                                                          |
| `npm run lint:js`           |    0 | 8 warnings `no-unused-vars` / `prefer-const` em ferramentas                                |
| `npm run format:check`      |    1 | Dívida ampla de Prettier (não integrado a `validate`)                                      |
| `npm run test:e2e`          |   1* | *Chromium Playwright ausente no ambiente da auditoria                                      |
| `npm run check:guia-mestre` |    0 | Aviso: PDF sem extrator determinístico                                                     |

## CI vs validate (antes)

- Workflow [`.github/workflows/qualidade.yml`](../../.github/workflows/qualidade.yml): encoding, lint HTML, unitários, e2e.
- `npm run validate`: generate + encoding + guia-mestre + lint HTML/CSS/JS + test + e2e.
- Lacunas CI: `check:guia-mestre`, `lint:css`, `lint:js`, `generate:apresentacao`.

## Superfícies oficiais (D4 — default técnico)

- Oficiais: prospecto (`index.html`) e apresentação de homologação (`apresentacao/homologacao-pastoral.html`).
- Protótipo: `prototipos/storytelling-v1/` (mantém testes alinhados ao HTML vigente).

## Notas

- Working tree limpa no início da implementação.
- Este baseline não altera produto; serve de referência para as tasks seguintes.
