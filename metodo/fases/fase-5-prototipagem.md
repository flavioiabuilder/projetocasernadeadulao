# Fase 5 — Prototipagem com IA

**Objetivo.** Explorar direções e validar a mais promissora **antes** de
investir em código de produção.

Estado no piloto: **aberta**. Existem múltiplas superfícies em
[`prototipos/`](../../programas/discipulando-a-caserna/prototipos/) e uma
decisão visual normativa em
[`decisao-visual-v1.md`](../../programas/discipulando-a-caserna/docs/decisao-visual-v1.md),
mas não há registro de qual protótipo é o **canônico** para a Fase 6.

## 5.1 Os três fluxos canônicos

| Fluxo                  | Caminho                                                                 | Serve a                                                       |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| **A — Código direto**  | Briefing + tokens → protótipo em HTML → iteração por crítica → produção | Landing pages, sites pequenos e médios, sem designer dedicado |
| **B — Figma primeiro** | Briefing + tokens → sistema no Figma → telas → MCP → código             | Produtos com equipe, sistemas que evoluem por anos            |
| **C — Híbrido**        | Exploração rápida → direção vencedora normalizada → implementação       | Quase todo mundo                                              |

**Aqui é o Fluxo A.** O código é a fonte visual
([ADR-004](../../docs/arquitetura/ADR-004-fontes-da-verdade.md)); o Figma não é
canônico até promoção explícita; mockups do Stitch em
[`referencia/stitch/`](../../programas/discipulando-a-caserna/referencia/stitch/)
são composição **não canônica**.

## 5.2 Anatomia de um prompt de design

Sete blocos, sempre na mesma ordem:

1. **Papel e padrão** — quem o agente é e que nível já foi rejeitado
2. **Contexto de negócio** — 3–5 linhas do briefing
3. **Direção visual** — a frase de direção + o que extrair de cada referência
4. **Sistema (inegociável)** — os tokens; nada fora deles
5. **Estrutura requerida** — derivada da arquitetura de mensagem, não inventada
6. **Restrições e proibições** — a lista específica do que não pode existir
7. **Critério de aceite** — verificável, com autoavaliação antes de entregar

Os blocos 6 e 7 são os mais subestimados. **Proibições são mais eficientes que
instruções**, porque removem exatamente as saídas de alta probabilidade — que
são as genéricas. Uma lista de dez proibições específicas muda mais o resultado
do que dois parágrafos de adjetivos.

O prompt dedicado a **construir** candidatos é
[`../prompts/prototipagem.md`](../prompts/prototipagem.md). A crítica usa
[`../prompts/critica-estruturada.md`](../prompts/critica-estruturada.md). Ambos
(e os demais prompts do manifesto) implementam `## PROMPT EXECUTÁVEL`; o gate
`validate:metodo` verifica o contrato mínimo.

## 5.3 Iteração dirigida

“Melhora isso” é um pedido vazio. Critique em quatro campos:

```text
OBSERVAÇÃO: o que eu vejo, de forma factual e localizada
DIAGNÓSTICO: qual princípio foi violado
DIREÇÃO:    o que deve acontecer, sem microgerenciar a solução
RESTRIÇÃO:  o que não pode mudar junto
```

**Modelo de rodadas (inequívoco):**

1. **Avaliação inicial** — crítica em todos os eixos; **sem** alterar código.
2. **Rodada corretiva 1** — só estrutura e hierarquia.
3. **Rodada corretiva 2** — só tipografia e ritmo.
4. **Rodada corretiva 3** — cor + detalhe + movimento, **somente se** as
   rodadas 1–2 estiverem estáveis.

Misturar eixos corretivos na mesma rodada produz regressão. Fidelidade ao
conteúdo, clareza pastoral, responsividade e a11y são **gates transversais** em
toda passagem — não “rodadas de embelezamento”.

> **Armadilha.** Iterar infinitamente sobre uma direção fraca. Se após **três
> rodadas corretivas** o resultado ainda não convence, o problema não é
> execução: é direção. Volte à Fase 2.

## Procedimento

1. Confirmar que a Fase 4 entregou manual e inventário utilizáveis.
2. Montar o prompt de design com os sete blocos.
3. Gerar a direção; **não** aceitar o primeiro resultado.
4. Criticar em eixos separados, um por rodada.
5. Comparar candidatos entre si com o mesmo conteúdo real — nunca com lorem.
6. Registrar a escolha e **por que as outras foram descartadas**.
7. Marcar o protótipo vencedor como canônico para a Fase 6.

## Entregável

Protótipo aprovado + registro da escolha em
[`../biblioteca/decisoes/registro.md`](../biblioteca/decisoes/registro.md),
com hipótese, decisão, justificativa e alternativas descartadas.

## Critério de aceite

> O protótipo pode ser apresentado sem nenhuma frase começando com
> “imagina que aqui vai ter…”.

E, específico deste repositório:

- Existe **um** protótipo declarado canônico, com data e responsável.
- As alternativas descartadas têm motivo registrado.
- Nenhum conteúdo institucional foi inventado para preencher o protótipo.

## Proibições

- Comparar candidatos com conteúdo falso ou placeholder
- Declarar vencedor sem registrar o descarte dos outros
- Promover Figma ou Stitch a fonte canônica sem governança
- Unificar identidades visuais distintas sem pedido explícito
- Reabrir a Direção A durante a iteração
