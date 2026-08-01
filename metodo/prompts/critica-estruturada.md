# Prompt — Crítica estruturada

## Objetivo

Auditar um protótipo ou página contra briefing, painel, tokens e manual —
produzindo achados priorizados, não elogios vagos.

## Entradas obrigatórias

- URL local ou paths dos arquivos sob crítica
- Briefing + painel + tokens (e manual se existir)
- Critérios de rejeição do briefing

## Artefatos anteriores consumidos

- `01` … `04` conforme disponíveis
- Checklists [`../checklists/revisao-design.md`](../checklists/revisao-design.md)

## Formato da saída

Lista de achados com: severidade (bloqueante/major/minor), evidência (seletor
ou trecho), princípio violado, correção proposta, esforço relativo.

## Critérios de aceite

- Pelo menos um achado bloqueante **ou** declaração justificada de ausência
- Cada achado aponta evidência verificável
- Separar gosto pessoal de violação de especificação

## Proibições

- Redesign completo sem pedido
- Inventar requisitos que não estão nos artefatos
- Ignorar a11y e conteúdo canônico

## Campos variáveis

`{{PATHS_OU_URL}}`, `{{FOCO}}` (hero / fluxo / tipografia / a11y), `{{VIEWPORT}}`

## Como evitar resultados genéricos

Exigir âncoras no DOM ou no CSS; citar seção do briefing/manual violada.

## Armazenamento e versionamento

Prompt em `metodo/prompts/critica-estruturada.md`. Achados podem ir ao ledger
`biblioteca/decisoes/registro.md` quando virarem decisão.

## Quando não usar

Em brainstorm livre sem especificação; ou quando só se pede implementação de
ticket já especificado.
