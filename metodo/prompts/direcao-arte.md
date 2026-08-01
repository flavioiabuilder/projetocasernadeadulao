# Prompt — Direção de arte

## Objetivo

Traduzir briefing + painel de referências em direção visual e rascunho de
tokens (camadas primitivo/semântico), sem implementar o site completo.

## Entradas obrigatórias

- Briefing aprovado ou em revisão avançada
- Painel de referências anotado
- Restrições de marca / tipografia / motion já conhecidas

## Artefatos anteriores consumidos

- `01-briefing-estrategico.md`
- `02-painel-referencias.md`
- Template [`03-tokens.json`](../templates/projeto-web/03-tokens.json)

## Formato da saída

1. Frase de direção (1–2 frases)
2. Princípios visuais
3. Preenchimento parcial de `03-tokens.json` (placeholders restantes explícitos)
4. Lista do que **não** fazer (anti-padrões)

## Critérios de aceite

- Tokens com `primitivos` e `semanticos` parseáveis
- Ligação explícita a referências do painel
- Sem impor framework de UI

## Proibições

- Unificar identidades distintas sem pedido
- Declarar Figma canônico sem governança
- Converter tudo para OKLCH só por moda
- Usar paleta de um projeto piloto em template genérico

## Campos variáveis

`{{TOM}}`, `{{RESTRICOES_MARCA}}`, `{{UNIDADE_ESPACO}}`, `{{NOTACAO_COR}}`

## Como evitar resultados genéricos

Exigir: contraste com pelo menos uma referência descartada; tokens nomeados
pelo papel semântico; motion amarrado a `prefers-reduced-motion`.

## Armazenamento e versionamento

Prompt em `metodo/prompts/direcao-arte.md`.

## Quando não usar

Quando a direção visual já está aprovada e a tarefa é só implementação fiel.
