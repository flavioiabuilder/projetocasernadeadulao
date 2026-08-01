# Prompt — Descoberta

## Objetivo

Produzir ou enriquecer o Briefing Estratégico a partir de fontes fornecidas,
sem inventar fatos.

## Entradas obrigatórias

- Nome do projeto
- Fontes disponíveis (docs, URLs, entrevistas, restrições)
- Path de saída desejado (em geral `01-briefing-estrategico.md`)

## Artefatos anteriores consumidos

Nenhum obrigatório (início da Fase 1). Pode consumir notas brutas do cliente.

## Formato da saída

Preencher as seções do template
[`../templates/projeto-web/01-briefing-estrategico.md`](../templates/projeto-web/01-briefing-estrategico.md).
Lacunas explícitas como `LACUNA` / `NÃO CONFIRMADO`.

## Critérios de aceite

- Todas as seções do template existem
- Cada afirmação factual cita fonte ou está marcada como não confirmada
- Há ação principal, objeção principal e critérios de rejeição

## Proibições

- Inventar métricas, endossos ou concorrentes fictícios
- Copiar texto pastoral/institucional de outro projeto sem pedido
- Preencher com jargão genérico de marketing sem evidência

## Campos variáveis

`{{NOME_DO_PROJETO}}`, `{{FONTES}}`, `{{SETOR}}`, `{{IDIOMA}}`

## Como evitar resultados genéricos

Exigir: (1) citação de trecho ou path; (2) pelo menos uma restrição concreta;
(3) critérios de rejeição mensuráveis ou observáveis.

## Armazenamento e versionamento

Versionado em `metodo/prompts/descoberta.md`. Saída do projeto fica na cópia
instanciada do template, não neste arquivo.

## Quando não usar

Quando o briefing já está aprovado e a tarefa é só implementação visual/código.
