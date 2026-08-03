# Pacote Gate A — decisão F5-08 / F5-10 / F5-12

## Resultado

| Gate            | Resultado                                                         |
| --------------- | ----------------------------------------------------------------- |
| F5-08 Escolha   | **APROVADA** — `prospecto-fase-5-v1`                              |
| F5-10 Canonizar | **APROVADA** — responsável Flávio Alves da Costa; data 2026-08-03 |
| F5-12 Fase 6    | **APROVADA** — `fase6: liberada`, `autorizacaoFase6: true`        |

Canonização = referência de implementação. **Não** homologação pastoral.
**Não** publicação. **Não** criação de `prospecto/`.

## Evidências e exit codes (corrida 2026-08-03)

| Item                 | Path / comando                                                                               | Exit |
| -------------------- | -------------------------------------------------------------------------------------------- | ---: |
| Canônico             | `prototipos/prospecto-fase-5-v1/`                                                            |    — |
| Dossiê               | [`../fase-5/dossie-de-prototipagem.md`](../fase-5/dossie-de-prototipagem.md)                 |    — |
| Roteiro F5           | [`../fase-5/roteiro-de-validacao.md`](../fase-5/roteiro-de-validacao.md)                     |    — |
| Decisão              | [`../fase-5/decisao-do-prototipo-canonico.md`](../fase-5/decisao-do-prototipo-canonico.md)   |    — |
| Estado JSON          | [`../fase-5/estado-prototipo-canonico.json`](../fase-5/estado-prototipo-canonico.json)       |    — |
| Inventário semântico | [`../fase-5/inventario-semantica-editorial.md`](../fase-5/inventario-semantica-editorial.md) |    — |
| Tokens               | `npm run validate:discipulando:tokens`                                                       |    0 |
| Design system        | `npm run validate:discipulando:design-system`                                                |    0 |
| Gate estrutural      | `npm run validate:discipulando:prototipagem`                                                 |    0 |
| Stale                | `npm run check:discipulando:prototipo-fase-5:stale`                                          |    0 |
| Unitários            | `npm run test:discipulando:prototipo-fase-5`                                                 |    0 |
| E2E                  | `npm run test:discipulando:prototipo-fase-5:e2e`                                             |    0 |
| Capturas             | `npm run capture:discipulando:prototipo-fase-5` → `capturas/`                                |    0 |
| Format               | `npm run format:check`                                                                       |    0 |
| Programa             | `npm run validate:discipulando`                                                              |    0 |
| Método               | `npm run validate:metodo`                                                                    |    0 |
| Repo                 | `npm run validate`                                                                           |    0 |

## P0 encerrados neste saneamento

- Prosa sem blockquote indevido; citações reais preservadas
- Assinatura/rodapé únicos via `institucional.js`
- Folheador SPC-F5-01 (7+9) com PE no-JS
- PDF honestizado (sem link falso; backlog de circulação)
- Contextos §1/§13/§15
- Token `--cor-foco-sobre-papel` no CSS compartilhado
- Stale-check via `buildPrototype` (sem rewrite de source)
- Lint/format/custom properties

## Pendências que permanecem (não bloqueiam F5-12)

- Circulação pública do PDF do dossiê (quando houver arquivo autorizado)
- Migração para `prospecto/` (task de Fase 6)
- Pages / `noindex` / redirects (decisões humanas posteriores)
- Homologação pastoral do conteúdo

## Após este Gate A

1. Executar F6-01… sob blueprint — **task posterior**
2. Manter Pages/`noindex` inalterados até F6-11/F6-12
3. Não distribuir PDF inexistente
