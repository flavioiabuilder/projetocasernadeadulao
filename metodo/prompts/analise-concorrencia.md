# Prompt — Análise de concorrência

## Objetivo

Mapear alternativas reais e extrair o que extrair / descartar para o briefing
e o painel de referências.

## Entradas obrigatórias

- Briefing parcial ou completo (`01-briefing-estrategico.md`)
- Lista de URLs ou nomes de concorrentes/alternativas **reais**
- Setor e público

## Artefatos anteriores consumidos

- [`../templates/projeto-web/01-briefing-estrategico.md`](../templates/projeto-web/01-briefing-estrategico.md) (instanciado)

## Formato da saída

Seção “Análise competitiva” do briefing + fichas opcionais no painel
[`02-painel-referencias.md`](../templates/projeto-web/02-painel-referencias.md)
quando a concorrência for também referência visual/estrutural.

## Critérios de aceite

- Mínimo 3 alternativas reais com URL ou identificação clara
- Para cada uma: o que fazem bem, o que não copiar, evidência
- Distinção evidência vs inferência

## Proibições

- Inventar concorrentes
- Recomendar cópia de marca, texto ou ativos proprietários
- Tratar estudo DevTools como componente de produção

## Campos variáveis

`{{LISTA_URLS}}`, `{{CRITERIOS_COMPARACAO}}`, `{{IDIOMA}}`

## Como evitar resultados genéricos

Exigir screenshots/paths de evidência já existentes ou descrições amarradas a
elementos concretos (IA, hierarquia, prova social, formulário).

## Armazenamento e versionamento

Prompt em `metodo/prompts/analise-concorrencia.md`. Resultados no projeto.

## Quando não usar

Quando não há alternativas públicas relevantes ou a decisão competitiva já
está fechada no briefing aprovado.
