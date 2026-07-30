# Auditoria visual — storytelling-v1

Estudo do protótipo [`prototipos/storytelling-v1/`](../../prototipos/storytelling-v1/) contra o [Plano de Slides](Plano_de_Slides_Discipulando_a_Caserna.md) e a [auditoria de fidelidade](auditoria-fidelidade-v1.md). Planos Cursor antigos ignorados.

**Data:** 29/07/2026 · **Status:** correções P0/P1 aplicadas no protótipo

## Inventário

| Item | Estado |
|---|---|
| Slides | 72 (S01–S69 + s63a/b/c) |
| Atos | 10 |
| Fundos | base · sombra · caserna · transição (s05, s30 em duas faixas sólidas) |
| Layouts | L1–L8; L9 sem uso |

## Coerente

- Paleta e inversão Caserna/Sombra
- Voz institucional; fechamento em 3ª pessoa
- C.3: emblema → S52; âncora 3×; caverna 3×; sem refs a nº de slide; sem métricas de alcance
- Claims institucionais com `selo-estudo` onde cabível
- Skip, `:focus-visible`, reduced-motion, retomada

## Achados e tratamento

### P0 (corrigidos)

| # | Problema | Correção |
|---|---|---|
| 1 | Rodapé claro sobre zona clara em s05/s30 | Topo escuro em transição; rodapé **sem** `.claro` |
| 2 | Setas nav ilegíveis em fundo escuro | Classe `chrome-escuro` no `body` + setas claras |
| 3 | Space navega com foco em controles | Ignora Space se alvo for controle interativo |
| 4 | `.fecho` / `.nota-slide` absolutos | Fluxo estático + margem |
| 5 | S12/S19 densificados (C.3.3) | Fechos removidos; S12 com D1 primeiro |
| 6 | S25 faixa | Mantida (conforme Plano S25 — faixa Sombra 8%) |
| 7 | `data-arm` antecipado | Cronograma A.4: 1@S41, 2@S45, 3@S46, 4@S47+; fill latão |
| 8 | S01 sem fade/seta | Fade 1,2s no emblema + `.seta-rolar` após 4s |

### P1 (corrigidos)

| # | Problema | Correção |
|---|---|---|
| 1 | D1 baixo | `.display` clamp até ~76/40 |
| 2 | Sem stagger | Delay 80ms entre irmãos em `.visivel` |
| 3 | Nav mobile vs chrome | Espaço inferior reservado; fecho no fluxo |
| 4 | Cards g5 órfão | Breakpoint 3+2 / 1 col |
| 5 | Sem h1 | `h1.sr-only` no documento |
| 6 | `--barra` | 44px |

### P2 (dívida restante)

- Índice sem âncoras s63a–c
- Acordeão sem `aria-expanded`
- Clique na armadura abre índice (affordance)
- Stacks tipográficos de sistema (offline)
- Classes `l-L*` majoritariamente semânticas

## Claims

Pendência humana: confirmar ou retirar Casa de Oração e P1–P9 antes de promover.
