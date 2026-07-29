# Auditoria de fidelidade — storytelling v1

Gate antes de promover o deck. Fontes: `conteudo/`, Guia Mestre v1.0-RC, `docs/contexto-do-projeto.md`.

Classificação: **canônico** | **proposto/estudo** | **lacuna** | **corrigido no protótipo**.

## Contagem

| Item | Spec MD (após correção) | HTML |
|---|---|---|
| Slides | 69 (S01–S69) | 69 seções `.slide` |
| Atos | 10 | `data-ato` 1–10 |

## Regras C.3

| Regra | Status no HTML de referência |
|---|---|
| Emblema sem explicação antes de S52 | OK (S01 só imagem; texto em S52) |
| Frase-âncora 3× (S04, S31, S69) | **Faltava em S31** — adicionada no protótipo |
| Silêncios S12, S19, S29, S67 sem gráfico | OK (sem ícones); fechos tipográficos em S12/S19 herdados — não densificados |
| Caverna 3× (S02, S26, S68) | OK (SVG repetido) |
| Sem referência a slide por número | OK |
| Sem métricas de alcance como valor | OK |

## Claims institucionais (prioridade alta)

| Claim | Onde | Classificação | Ação no protótipo |
|---|---|---|---|
| CNPJ 63.724.286/0001-78 | S33, S69 | **canônico** (Guia + `conteudo/secoes-12-15`) | Mantido |
| Programa de evangelização/discipulado; público segurança pública | S33 | **canônico** / alinhado ao contexto do projeto | Mantido |
| “Casa de Oração para Todos os Povos” (vínculo eclesiástico) | S33 | **lacuna** no repositório (`conteudo/` e contexto não documentam) | Texto e ficha marcados `ESTUDO · PENDENTE DE VALIDAÇÃO` |
| “Personalidade jurídica própria” além do CNPJ | S33 | **parcial** — CNPJ canônico; formulação ampla não detalhada em `conteudo/` | Mantida com selo de estudo junto ao vínculo |
| Setores P1–P9 / estado-maior | S34 | **lacuna** no repositório | Prosa e organograma com rótulo `ESTUDO · ESTRUTURA EM VALIDAÇÃO` |
| Liderança pastoral definida | S33–S34 | **proposto** (destinatário Pr. Glaydston em config; relação jurídica não esclarecida no contexto) | Sem cargo inventado; organograma sem nomes |

## Conteúdo doutrinário / programa

Módulos, 4×12, armadura, marchas, sete elementos da lição, Ordem do Dia, Guia Mestre, edições, pendências (formação de instrutores, apêndices, caderno de IV) — alinháveis ao Guia / `conteudo/programa.md` / matriz. Tratar como **canônico** na linha do Guia v1.0-RC (homologação pastoral ainda pendente).

Caderneta de Campanha / merch: no plano como proposta — manter selo `PROPOSTA` onde o HTML já marca.

## Voz

Apresentação institucional imersiva: “você” de leitura (sem hierarquia). O protótipo em `prototipos/storytelling-v1/` **não** endereça o leitor como “o senhor” nem com vocativo “Pastor,”. Homologação e prefácio falam da liderança pastoral em terceira pessoa. Mantém “vocês” em Fp 1.6 e “você” em exemplos da Ordem do Dia dirigidos ao discípulo. “Senhor” teológico (Cristo) na matriz permanece.

## Bloco de homologação (C.1)

Após S63, o protótipo inclui telas de estado de homologação, convite ao prefácio e “se a resposta for não”, com prosa adaptada de [`conteudo/secoes-12-15-a-prova-e-o-pedido.md`](../conteudo/secoes-12-15-a-prova-e-o-pedido.md) — em voz institucional (liderança pastoral em 3ª pessoa), sem prazo e sem prefácio preenchido.

## Pendências humanas

1. Confirmar ou retirar vínculo “Casa de Oração…” e texto sobre P1–P9 antes de promoção.
2. Teste C.4 (três perguntas a leitor externo).
3. Decidir se este deck substitui, complementa ou permanece irmão da homologação em `apresentacao/`.
