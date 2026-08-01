# Roteiro de validação visual — Fase 2

- **Programa:** Discipulando a Caserna
- **Data:** 2026-08-01
- **Status:** Aberto
- **Painel:** [`../02-painel-referencias.md`](../02-painel-referencias.md)
- **Inventário:** [`inventario-e-triagem.md`](inventario-e-triagem.md)

Este roteiro **não** duplica H1–H17 da Fase 1. Trata só de decisões visuais da
curadoria.

## V1 — Seleção final das 8 referências

| Campo                        | Conteúdo                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Pergunta                     | Confirma a seleção REF-01…REF-08 do painel?                     |
| Recomendação                 | Manter os 8; suplentes R09 Bulletin / R14 Impetus se algum cair |
| Responsável                  | Diretor de arte + mantenedor                                    |
| Bloqueia APROVADO do painel? | Sim                                                             |
| Resposta                     | _pendente_                                                      |

## V2 — Frase de direção

| Campo                        | Conteúdo                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| Pergunta                     | Qual das três formulações do painel (ou emenda) é normativa? |
| Recomendação                 | Formulacão 1 (recomendada no painel)                         |
| Responsável                  | Diretor de arte (+ liderança pastoral se desejar)            |
| Bloqueia APROVADO do painel? | Sim                                                          |
| Resposta                     | _pendente_                                                   |

## V3 — Capturas externas no repositório

| Campo                | Conteúdo                                       |
| -------------------- | ---------------------------------------------- |
| Pergunta             | Versionar alguma screenshot externa?           |
| Recomendação         | **Não** — manter evidência por URL + descrição |
| Responsável          | Mantenedor                                     |
| Bloqueia EM REVISÃO? | Não                                            |
| Resposta             | _pendente_                                     |

## V4 — Promoção à biblioteca global do método

| Campo                | Conteúdo                                         |
| -------------------- | ------------------------------------------------ |
| Pergunta             | Promover alguma REF além de Aramco já existente? |
| Recomendação         | **Nenhuma** nesta fase                           |
| Responsável          | Mantenedor do método                             |
| Bloqueia EM REVISÃO? | Não                                              |
| Resposta             | _pendente_                                       |

## V5 — Interpretação visual do umbral de Adulão

| Campo              | Conteúdo                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Pergunta           | O umbral atmosférico único (import B) permanece nos limites já autorizados na decisão visual? |
| Recomendação       | Sim — um momento; não fullscreen; não depender de animação; não reabrir Direção B             |
| Responsável        | Diretor de arte + pastoral                                                                    |
| Bloqueia APROVADO? | Se reinterpretar além do autorizado                                                           |
| Resposta           | _pendente_                                                                                    |

## V6 — Inspeção viewport (opcional técnica)

Quando Playwright/Chrome DevTools estiverem disponíveis, confirmar REF-01…07
em ~360×800, ~768×1024, ~1440×900 e, se houver motion, `prefers-reduced-motion:
reduce`. Registrar achados no inventário; não versionar PNGs externos sem V3.

## Fechamento

Só marcar o painel como **APROVADO** após V1 + V2 (e V5 se houver dúvida sobre
Adulão). Até lá: **EM REVISÃO**.
