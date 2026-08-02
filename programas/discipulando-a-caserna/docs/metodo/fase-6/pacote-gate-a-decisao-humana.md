# Pacote Gate A — decisão humana F5-08 / F5-10 / F5-12

O agente **não** altera `estado-prototipo-canonico.json` para aprovado.

## Evidências para o responsável humano

| Item | Path / comando |
| --- | --- |
| Candidato | `prototipos/prospecto-fase-5-v1/` |
| Dossiê | [`../fase-5/dossie-de-prototipagem.md`](../fase-5/dossie-de-prototipagem.md) |
| Roteiro F5 | [`../fase-5/roteiro-de-validacao.md`](../fase-5/roteiro-de-validacao.md) |
| Decisão (preencher) | [`../fase-5/decisao-do-prototipo-canonico.md`](../fase-5/decisao-do-prototipo-canonico.md) |
| Estado JSON | [`../fase-5/estado-prototipo-canonico.json`](../fase-5/estado-prototipo-canonico.json) |
| Gate estrutural | `npm run validate:discipulando:prototipagem` |
| Stale | `npm run check:discipulando:prototipo-fase-5:stale` |
| Unitários | `npm run test:discipulando:prototipo-fase-5` |
| E2E | `npm run test:discipulando:prototipo-fase-5:e2e` |
| Capturas | `npm run capture:discipulando:prototipo-fase-5` → `capturas/` |

## Pendências que a decisão deve mencionar

- F6-05 Folheador da Lição 1 (amostra / preview / alteração editorial)
- F6-06 PDF público do dossiê de apreciação (7 páginas)
- Tokens e Design System permanecem **candidatos** (não promover automaticamente)

## Após F5-12

1. Confirmar F6-01…F6-08
2. Criar `prospecto/` conforme [`plano-de-implementacao.md`](plano-de-implementacao.md)
3. Manter Pages/`noindex` inalterados até F6-11/F6-12
