# Decisão do protótipo canônico — Fase 5

| Campo                   | Valor                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| **Status**              | APROVADO                                                           |
| **Registro**            | Status: APROVADO                                                   |
| **Protótipo canônico**  | `programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/` |
| **Candidato principal** | `prototipos/prospecto-fase-5-v1/`                                  |
| **Fase 6**              | LIBERADA                                                           |
| **Data**                | 2026-08-03                                                         |
| **Responsável**         | Flávio Alves da Costa                                              |

## Hipótese

Um único candidato integrado em
[`prototipos/prospecto-fase-5-v1/`](../../../prototipos/prospecto-fase-5-v1/)
materializa Direção A + umbral B + clareza C + tokens `0.1.0-candidate` + Manual
CANDIDATO + conteúdo canônico, sem migrar o prospecto legado.

## Decisão

### F5-08 — APROVADA

Candidato escolhido:
`programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/`

### F5-10 — APROVADA

Protótipo canônico:
`programas/discipulando-a-caserna/prototipos/prospecto-fase-5-v1/`

Responsável: Flávio Alves da Costa

Data: 2026-08-03

A canonização **não** é homologação pastoral do conteúdo. Significa somente:
este é o protótipo escolhido como referência de implementação.

### F5-12 — APROVADA

Fase 6: **LIBERADA** (`autorizacaoFase6: true`).

A liberação **não** autoriza: publicação; inclusão no Pages; remoção de
`noindex`; criação de `prospecto/`; redirects; exclusão de protótipos;
distribuição do PDF inexistente.

## Justificativa

Gates técnicos P0 zerados no saneamento final: semântica editorial, folheador
SPC-F5-01 com acervo local (7+9), PDF representado honestamente, contextos
visuais §1/§13/§15, token de foco corrigido, stale-check parametrizado sem
rewrite de source, lint/format/custom properties e testes objetivos.

## Critérios e evidências

Ver [`dossie-de-prototipagem.md`](dossie-de-prototipagem.md),
[`roteiro-de-validacao.md`](roteiro-de-validacao.md) e
[`inventario-semantica-editorial.md`](inventario-semantica-editorial.md).

## Alternativas descartadas

| Alternativa                      | Motivo do descarte                                                     |
| -------------------------------- | ---------------------------------------------------------------------- |
| `prospecto-v1/` como canônico F5 | Runtime legado; não prova Manual `dc-*` / tokens DS; migração = Fase 6 |
| `direcao-a/b/c`                  | Evidências históricas; não reabrir votação                             |
| `storytelling-v1/`               | Deck, não carta pastoral                                               |
| `homologacao-pastoral-v1/`       | Circulação restrita; não candidato público                             |

## Limitações e lacunas aceitas

- PDF público de 7 páginas do dossiê **ausente** — bloqueia download/circulação,
  não bloqueia canonização técnica (DEC-F5-06).
- Tokens/DS permanecem em status candidato (`0.1.0-candidate`).
- Seção 7 (marca) ainda aponta para conteúdo em `identidade.md` sem fusão completa.
- Produção (`prospecto/`), Pages e indexação permanecem bloqueados.

## Gates executados

Exit codes **0** registrados em
[`roteiro-de-validacao.md`](roteiro-de-validacao.md) e
[`../fase-6/pacote-gate-a-decisao-humana.md`](../fase-6/pacote-gate-a-decisao-humana.md)
(corrida 2026-08-03): generate F5, tokens, DS, prototipagem, stale, unit, E2E,
capturas, `format:check`, `validate:discipulando`, `validate:metodo`, `validate`.

## Autorização para Fase 6

**LIBERADA** (F5-12). Implementação de produção **não iniciada**.

## Rollback conceitual

Se o canônico for rejeitado após registro: status → `rejeitado` ou
`retorno-fase-2`; `prototipoCanonico` → null; `fase6` → `bloqueada`;
`autorizacaoFase6` → false.
