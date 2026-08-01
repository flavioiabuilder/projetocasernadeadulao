# Roteiro de validação — Direção e tokens (Fase 3)

- **Programa:** Discipulando a Caserna
- **Data:** 2026-08-01
- **Status:** Aberto
- **Tokens:** [`../../../design-system/tokens/`](../../../design-system/tokens/)
  (`0.1.0-candidate`)

Não duplica V1–V6 da Fase 2. Complementa com decisões de tokens.

| ID    | Decisão                          | Evidência                                                     | Recomendação                | Responsável     | Bloqueia 1.0.0?  | Resposta                         |
| ----- | -------------------------------- | ------------------------------------------------------------- | --------------------------- | --------------- | ---------------- | -------------------------------- |
| D3-01 | Confirmar V1 — seleção do painel | Painel + inspeção V6                                          | Manter 8 REFs propostas     | Humano          | Sim (indireto)   | _pendente_                       |
| D3-02 | Confirmar V2 — frase de direção  | Painel candidata #1                                           | Formulação 1                | Humano          | Sim (indireto)   | _pendente_                       |
| D3-03 | Fonte de verdade JSON → CSS      | Entregável Fase 3                                             | JSON canônico               | Arquiteto       | Contrato         | **Adotado no repo** — confirmar  |
| D3-04 | Formato ME-T / subset DTCG       | Schema + gerador                                              | Folhas `$value`/`$type`     | Arquiteto       | Contrato         | **Adotado** — confirmar          |
| D3-05 | Bronze canônico                  | identidade `#8C6A45` vs logo `#8C6A46` vs prospecto `#9A7B4F` | `#8C6A45` + aliases         | Humano + design | Escala acento    | Default no JSON — confirmar      |
| D3-06 | Montserrat + Source Serif 4      | identidade + woff2                                            | Confirmar par               | Humano          | Tipografia       | Default no JSON — confirmar      |
| D3-07 | Unidade base 4px                 | prospecto                                                     | Manter                      | Design          | Baixo            | Default — confirmar              |
| D3-08 | OKLCH + fallback                 | sem oklch no runtime                                          | Hex-first                   | Arquiteto       | Baixo            | **Adotado** hex                  |
| D3-09 | Sem dark mode                    | Direção A                                                     | Contextos de superfície     | Arquiteto       | Conceitual       | **Adotado**                      |
| D3-10 | Status arte/logo                 | TODOs identidade; PNGs existem                                | Utilizável ≠ SVG homologado | Humano          | Não bloqueia cor | _pendente_                       |
| D3-11 | Path `design-system/tokens/`     | pasta criada                                                  | Confirmar path              | Arquiteto       | Path             | **Criado** — confirmar           |
| D3-12 | Promover a 1.0.0                 | gates V1/V2 + validate                                        | Só após humanos             | Humano          | Release          | _pendente_ — permanece candidate |

## Fechamento

Promover `meta.versao` para `1.0.0` e status estável **somente** após D3-01,
D3-02 e D3-12 (e validações verdes). Até lá: **EM REVISÃO** /
`0.1.0-candidate`.
