# Pipeline — as nove fases

Mapa operacional do método ([`O-SISTEMA.md`](O-SISTEMA.md), Parte II) e o
estado de cada fase **neste repositório**, que é o piloto.

Regra de ouro: **não avance de fase sem o entregável da anterior.** Pular fase
não economiza tempo — transfere o tempo para o retrabalho, com juros.

## Estado no piloto (Discipulando a Caserna)

| Fase | Nome                     | Entregável             | Guia genérico                                                          | Instância do piloto                                                                                                      | Estado            |
| ---- | ------------------------ | ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| 0    | Preparação do ambiente   | Repositório-método     | [`README.md`](README.md)                                               | `metodo/` + `npm run validate:metodo`                                                                                    | **Concluída**     |
| 1    | Mapeamento de nicho      | Briefing Estratégico   | [`prompts/descoberta.md`](prompts/descoberta.md)                       | [`01-briefing-estrategico.md`](../programas/discipulando-a-caserna/docs/metodo/01-briefing-estrategico.md)               | EM REVISÃO        |
| 2    | Curadoria de referências | Painel Anotado         | [`prompts/curadoria-referencias.md`](prompts/curadoria-referencias.md) | [`02-painel-referencias.md`](../programas/discipulando-a-caserna/docs/metodo/02-painel-referencias.md)                   | EM REVISÃO        |
| 3    | Direção de arte e tokens | `tokens.json` + `.css` | [`prompts/direcao-arte.md`](prompts/direcao-arte.md)                   | [`03-direcao-tokens.md`](../programas/discipulando-a-caserna/docs/metodo/03-direcao-tokens.md)                           | `0.1.0-candidate` |
| 4    | Design system            | Manual do Sistema      | [`prompts/manual-design-system.md`](prompts/manual-design-system.md)   | [`04-manual-design-system.md`](../programas/discipulando-a-caserna/docs/metodo/04-manual-design-system.md)               | CANDIDATO         |
| 5    | Prototipagem com IA      | Protótipo aprovado     | [`fases/fase-5-prototipagem.md`](fases/fase-5-prototipagem.md)         | [`prototipos/`](../programas/discipulando-a-caserna/prototipos/) — múltiplas direções, sem seleção final registrada      | **Aberta**        |
| 6    | Implementação            | Código em repositório  | [`fases/fase-6-implementacao.md`](fases/fase-6-implementacao.md)       | Protótipos em runtime legado; migração para `tokens.css` **não** iniciada                                                | **Aberta**        |
| 7    | Qualidade e conformidade | Relatório de QA        | [`fases/fase-7-qualidade.md`](fases/fase-7-qualidade.md)               | [`docs/validacoes/`](../programas/discipulando-a-caserna/docs/validacoes/) — auditorias parciais, sem relatório integral | **Parcial**       |
| 8    | Entrega e evolução       | Handoff + roadmap      | [`fases/fase-8-entrega-evolucao.md`](fases/fase-8-entrega-evolucao.md) | Ledger ativo em [`biblioteca/decisoes/`](biblioteca/decisoes/); handoff não formalizado                                  | **Aberta**        |

Fases 0–4 têm prompt próprio e validação semântica no gate. Fases 5–8 têm guia
em [`fases/`](fases/) e checklist, mas a validação é majoritariamente humana —
é onde o método ainda depende mais de disciplina do que de script.

## Dependências reais entre fases

```text
0 ──> 1 ──> 2 ──> 3 ──> 4 ──> 5 ──> 6 ──> 7 ──> 8
                  │                        │     │
                  └── tokens ──────────────┘     │
                                                 └──> alimenta a Fase 1 do
                                                      próximo projeto
```

- A Fase 3 alimenta a Fase 7: sem tokens não há como auditar “valor fora do sistema”.
- A Fase 8 alimenta a Fase 1 seguinte: é o que faz o décimo projeto ser melhor
  que o primeiro.
- Voltar da 5 para a 2 é normal. Se três rodadas dirigidas não convencem, o
  problema é direção, não execução.

## Bloqueios humanos abertos

Nenhum agente resolve estes; são decisões de julgamento:

| Bloqueio                                     | Trava                               | Onde está                                                                                                                                |
| -------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Validação humana do briefing (H1–H17)        | Fase 1 → `APROVADO`                 | [`fase-1/roteiro-de-validacao-humana.md`](../programas/discipulando-a-caserna/docs/metodo/fase-1/roteiro-de-validacao-humana.md)         |
| Decisões visuais V1–V5                       | Fase 2 → `APROVADO`                 | [`fase-2/roteiro-de-validacao-visual.md`](../programas/discipulando-a-caserna/docs/metodo/fase-2/roteiro-de-validacao-visual.md)         |
| V1/V2 + D3-12                                | tokens → `1.0.0`                    | [`fase-3/roteiro-de-validacao-direcao.md`](../programas/discipulando-a-caserna/docs/metodo/fase-3/roteiro-de-validacao-direcao.md)       |
| Aprovação do sistema                         | Fase 4 → `ESTÁVEL`                  | [`fase-4/roteiro-de-validacao-do-sistema.md`](../programas/discipulando-a-caserna/docs/metodo/fase-4/roteiro-de-validacao-do-sistema.md) |
| Escolha do protótipo canônico                | abre a Fase 6                       | [`fases/fase-5-prototipagem.md`](fases/fase-5-prototipagem.md)                                                                           |
| Autorização de migrar runtime dos protótipos | Fase 6 real                         | [`CONVENCOES.md`](CONVENCOES.md) — escopo `PROTOTIPO`                                                                                    |
| Validação pastoral / institucional           | qualquer publicação como definitiva | [`checklists/pre-lancamento.md`](checklists/pre-lancamento.md)                                                                           |

## Em cada fase

Toda fase tem quatro campos. Se algum estiver vazio, a fase não começou:

1. **Objetivo** — o que muda no mundo quando ela termina.
2. **Procedimento** — os passos, na ordem.
3. **Entregável** — o arquivo que fica.
4. **Critério de aceite** — a frase verificável que autoriza avançar.
