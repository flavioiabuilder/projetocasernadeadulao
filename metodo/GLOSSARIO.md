# Glossário — O Sistema

Vocabulário do **método** ([`O-SISTEMA.md`](O-SISTEMA.md), Parte III E).

Para o vocabulário **do domínio** deste repositório (Caserna de Adulão,
Discipulando a Caserna, prospecto pastoral, protótipo), ver
[`../CONTEXT.md`](../CONTEXT.md). Os dois não se substituem: este descreve como
se produz; aquele descreve o que se produz aqui.

## Especificação

**Artefato de especificação** — documento estruturado que descreve problema e
solução com precisão suficiente para qualquer executor, humano ou máquina,
produzir a coisa certa. São cinco:
[templates/projeto-web/](templates/projeto-web/).

**Contexto composto** — princípio de que a qualidade cresce de forma
não-linear quando se fornecem camadas **diferentes** de informação (intenção,
restrição, referência, sistema, julgamento), não mais informação do mesmo tipo.

**Frase de direção** — sentença única que resume a atmosfera pretendida,
escrita de forma que um terceiro consiga julgar se o resultado a cumpriu.
Não pode usar “moderno”, “limpo” ou “minimalista”.

**JTBD (Jobs To Be Done)** — modelo que descreve o que a pessoa está tentando
realizar, não quem ela é demograficamente.

**Critério de aceite** — condição verificável que separa entregue de não
entregue. Sem ele, “pronto” é opinião.

## Sistema visual

**Design token** — valor visual nomeado e centralizado (cor, espaço, tipo,
raio) que serve como fonte única de verdade.

**Token primitivo** — descreve o valor: `blue-600`, `space-4`. Vocabulário bruto.

**Token semântico** — descreve o uso: `action-primary`, `surface-raised`.
Componentes consomem **apenas** semânticos; referenciar primitivo direto quebra
o contrato.

**Token de componente** — terceira camada (`botao.*`, `card.*`). Neste
repositório é **proibida por ora** — ver [`CONVENCOES.md`](CONVENCOES.md).

**ME-T (Método Estendido Tipado)** — contrato JSON deste repositório: camadas
PT-BR `primitivos` / `semanticos`, folhas com `$value`, `$type`,
`$description`. Subconjunto alinhado ao DTCG 2025.10 (Community Group Report,
não recomendação W3C). Schema:
[`schemas/tokens.template.schema.json`](schemas/tokens.template.schema.json).

**OKLCH** — espaço de cor perceptualmente uniforme, no qual variações
numéricas iguais correspondem a variações visuais iguais. O documento o
recomenda; o piloto aqui é **hex-first**, sem mandato.

**Escala modular** — progressão de tamanhos tipográficos gerada por uma razão
constante (1,200 / 1,250 / 1,333 / 1,414).

**Matriz de estados** — especificação de `default`, `hover`, `focus-visible`,
`active`, `disabled`, `loading`, `error`, `empty` e `overflow` para cada
componente interativo. É o que separa um kit de UI de um design system.

**Camadas do sistema** — primitivos → componentes → padrões → páginas. A
página deve ser a camada mais burra.

## Qualidade

**WCAG 2.2 AA** — nível de conformidade de acessibilidade adotado como padrão
profissional.

**Core Web Vitals** — LCP (carregamento), INP (resposta) e CLS (estabilidade
visual). Ver alvos em [`fases/fase-7-qualidade.md`](fases/fase-7-qualidade.md).

**Lei da Proximidade** — espaço entre blocos relacionados deve ser
sensivelmente menor que entre blocos não relacionados.

**Iteração dirigida** — crítica em quatro campos (observação, diagnóstico,
direção, restrição), um eixo por rodada.

## Agentes

**MCP (Model Context Protocol)** — protocolo que conecta agentes de IA a
ferramentas e dados externos ao vivo.

**Skill** — pasta com um `SKILL.md` que o agente carrega sob demanda quando a
tarefa corresponde à descrição. Árvore canônica aqui: `.claude/skills/`
([ADR-006](../docs/arquitetura/ADR-006-ferramentas-de-ia.md)).

**Subagente** — instância separada, com contexto próprio, que executa uma
tarefa pesada e devolve só o resultado.

**Hook** — efeito determinístico disparado por evento do ciclo de vida do
agente.

**Revelação progressiva** — manter instruções em camadas, carregando o detalhe
apenas quando necessário. É por isso que `AGENTS.md` é curto e as skills são
profundas.

**Code Connect** — mapeamento entre componentes do Figma e componentes reais
do código, para que o agente reutilize em vez de recriar. `A CONFIGURAR` aqui.

**PROMPT EXECUTÁVEL** — seção obrigatória dos prompts em
[`prompts/`](prompts/): bloco colável com placeholders `{{…}}`, proibições e
autoavaliação. Contrato verificado por `npm run validate:metodo`.

## Status usados neste repositório

| Status            | Significa                                        |
| ----------------- | ------------------------------------------------ |
| `EM REVISÃO`      | Artefato preenchido, aguardando validação humana |
| `CANDIDATO`       | Estrutura completa, ainda não normativa          |
| `0.1.0-candidate` | Versão de tokens sem promoção a `1.0.0`          |
| `APROVADO`        | Validado por humano nomeado, com data registrada |
| `AUTOMATIZADO`    | Verificado por script no gate                    |
| `PARCIALMENTE`    | Parte verificada por script, parte humana        |
| `MANUAL`          | Só humano verifica                               |
| `NÃO APLICÁVEL`   | Fora de escopo, com motivo declarado             |

Nenhum status sobe para `APROVADO` ou `1.0.0` por decisão de agente.
