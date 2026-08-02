# Roteiro de validação visual — Fase 2

- **Programa:** Discipulando a Caserna
- **Data:** 2026-08-01
- **Status:** Aberto
- **Painel:** [`../02-painel-referencias.md`](../02-painel-referencias.md)
- **Inventário:** [`inventario-e-triagem.md`](inventario-e-triagem.md)

Este roteiro **não** duplica H1–H17 da Fase 1. Trata só de decisões visuais da
curadoria.

## Pacote de decisão (V1 + V2) — DECISÃO HUMANA

Não responder automaticamente. Tokens da Fase 3 permanecem
`0.1.0-candidate` / EM REVISÃO até estas respostas.

**V1 — o que confirmar:** seleção proposta REF-01…REF-08; nota de que REF-04/05
são sobretudo éticas; REF-06 site original OK, galeria Lapa 403 (secundária);
REF-04 telemetria instável; REF-02 overflow-X em viewports estreitos; eixo Detalhe =
Aramco + acervo interno.

**V2 — formulação recomendada (candidata #1):**

> Prospecto pastoral editorial tipográfico, de leitura sustentada e
> solenidade contida, que acolhe com humanidade sobre papel/creme e
> profundidade navy, marca Adulão num único umbral sem bravata, torna
> estados e pedido legíveis sem linguagem comercial, e permanece digno
> e completo mesmo sem animação.

## V1 — Seleção proposta das 8 referências

| Campo                        | Conteúdo                                                        |
| ---------------------------- | --------------------------------------------------------------- |
| Pergunta                     | Confirma a seleção REF-01…REF-08 do painel?                     |
| Recomendação                 | Manter os 8; suplentes R09 Bulletin / R14 Impetus se algum cair |
| Responsável                  | Diretor de arte + mantenedor                                    |
| Bloqueia APROVADO do painel? | Sim                                                             |
| Resposta                     | _pendente_ — **DECISÃO HUMANA**                                 |

## V2 — Frase de direção

| Campo                        | Conteúdo                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| Pergunta                     | Qual das três formulações do painel (ou emenda) é normativa? |
| Recomendação                 | Formulação 1 (recomendada no painel)                         |
| Responsável                  | Diretor de arte (+ liderança pastoral se desejar)            |
| Bloqueia APROVADO do painel? | Sim                                                          |
| Resposta                     | _pendente_ — **DECISÃO HUMANA**                              |

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

## V6 — Inspeção viewport (obrigatória antes de APROVADO)

Quando Playwright/Chrome DevTools estiverem disponíveis, confirmar REF-01…07
em ~360×800, ~768×1024, ~1440×900 e, se houver motion, `prefers-reduced-motion:
reduce`. Registrar achados; **não** versionar PNGs externos sem V3.

**Registro:** [`inspecao-v6.md`](inspecao-v6.md) (2026-08-01).
Status da inspeção técnica: ver arquivo. **Não** promove o painel a APROVADO
sem V1+V2 humanos.

## Fechamento

Só marcar o painel como **APROVADO** após V1 + V2 (e V5 se houver dúvida sobre
Adulão). Até lá: **EM REVISÃO**. Tokens Fase 3: `0.1.0-candidate` enquanto
V1/V2 pendentes.
