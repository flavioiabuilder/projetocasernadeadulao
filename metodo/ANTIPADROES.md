# Anti-padrões

Os dez anti-padrões mais caros do método ([`O-SISTEMA.md`](O-SISTEMA.md),
Parte III C), com a **defesa correspondente neste repositório**.

A coluna “Defesa” é o que impede o anti-padrão de acontecer de novo. Onde a
defesa é `MANUAL`, o custo de reincidência é humano — vigie mais.

| #   | Anti-padrão                    | Custo                                           | Defesa aqui                                                                                                  | Classe       |
| --- | ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| 1   | Prompt sem briefing            | Retrabalho total; bonito e irrelevante          | Prompts exigem `Entradas obrigatórias`; briefing da instância é `integracaoObrigatoria` no manifesto         | AUTOMATIZADO |
| 2   | Referência sem anotação        | Painel vira colagem; direção fraca              | `checkPainelFase2Semantico` exige extrair / servir / descartar, 6–10 refs, eixos e anti-referências          | AUTOMATIZADO |
| 3   | Valor visual fora do token     | Sistema vaza; consistência morre em semanas     | `validate:discipulando:tokens` + varredura da auditoria final                                                | PARCIALMENTE |
| 4   | Pular a matriz de estados      | Profissional na captura, amador no uso          | `fase-4/matriz-de-estados.md` + `validate:discipulando:design-system`                                        | PARCIALMENTE |
| 5   | Acessibilidade no fim          | Custa 5× mais que embutida no componente        | Axe no e2e do lab (`test:a11y`) + `fase-4/matriz-de-acessibilidade.md`; roteiro manual continua humano       | PARCIALMENTE |
| 6   | Iterar sem eixo definido       | Conserta cor, quebra hierarquia, repete         | [`prompts/critica-estruturada.md`](prompts/critica-estruturada.md) — um eixo por rodada                      | MANUAL       |
| 7   | Aceitar o primeiro resultado   | O primeiro resultado é a média                  | Autoavaliação obrigatória no contrato de `PROMPT EXECUTÁVEL`                                                 | AUTOMATIZADO |
| 8   | Design system sem documentação | Sistema que só existe na cabeça não é sistema   | `checkManualFase4Semantico` + fichas em `design-system/componentes/` e `padroes/`                            | AUTOMATIZADO |
| 9   | Duas fontes de verdade         | Figma e código divergem; ninguém sabe qual vale | [ADR-004](../docs/arquitetura/ADR-004-fontes-da-verdade.md); Figma **não** é canônico até promoção explícita | MANUAL       |
| 10  | Não medir nada                 | Sem métrica não há método, só gosto com etapas  | [`biblioteca/decisoes/registro.md`](biblioteca/decisoes/registro.md) — resultado observado por entrada       | MANUAL       |

## Anti-padrões específicos deste repositório

Aprendidos no piloto; não estão no documento original.

| Anti-padrão                                                               | Por que dói aqui                                                                       | Defesa                                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Inventar endosso, aprovação, cargo, data ou resultado pastoral            | O produto é uma carta institucional; um fato inventado destrói a credibilidade inteira | [`../CONTEXT.md`](../CONTEXT.md); `TODO:` explícito em todo `PROMPT EXECUTÁVEL`       |
| Parafrasear citação canônica de `conteudo/`                               | Citações `>` são literais; paráfrase é adulteração de fonte                            | `check:paridade`, `check:guia-mestre`                                                 |
| Editar arquivo gerado à mão (`js/dados/*`, `_gerado/`, homologação)       | A próxima geração apaga o trabalho silenciosamente                                     | [ADR-005](../docs/arquitetura/ADR-005-artefatos-gerados.md)                           |
| Promover status para `APROVADO` / `1.0.0` sem validação humana registrada | O método inteiro depende de o julgamento ser humano                                    | `checkManualFase4Semantico`; roteiros `V*` / `D*` / `H*` das fases                    |
| Migrar runtime de protótipo “de passagem”, dentro de outra tarefa         | Mistura eixos; regressão difícil de reverter                                           | [`CONVENCOES.md`](CONVENCOES.md) — escopo `PROTOTIPO`                                 |
| Unificar identidades visuais distintas sem pedido                         | Prospecto e storytelling são propositalmente diferentes                                | [`CONVENCOES.md`](CONVENCOES.md) — Nomenclatura                                       |
| Segunda árvore de skills ou de ADRs dentro de `metodo/`                   | Drift entre fontes; peso triplicado                                                    | [ADR-006](../docs/arquitetura/ADR-006-ferramentas-de-ia.md); `checkNoCanonicalSkills` |
| Declarar gate verde sem exit code                                         | “Rodei e passou” não é evidência                                                       | Critérios de aceite dos prompts de Fase 6 e 7                                         |

## Como usar

- Antes de abrir uma fase: leia a tabela e escolha em qual deles você é reincidente.
- Na revisão de design: [`checklists/revisao-design.md`](checklists/revisao-design.md).
- Antes de publicar: [`checklists/pre-lancamento.md`](checklists/pre-lancamento.md).
- Ao descobrir um anti-padrão novo: registre em
  [`biblioteca/decisoes/registro.md`](biblioteca/decisoes/registro.md) **com o
  resultado observado**, depois promova para esta tabela se reincidir.
