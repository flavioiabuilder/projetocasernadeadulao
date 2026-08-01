# Prompt — QA visual

## Objetivo

Verificar conformidade visual e de interface antes do handoff ou publicação,
combinando checagens manuais com comandos automatizados do repositório.

## Entradas obrigatórias

- Superfície a testar (paths / URL local)
- Tokens e/ou CSS canônicos
- Checklist [`../checklists/pre-lancamento.md`](../checklists/pre-lancamento.md)

## Artefatos anteriores consumidos

- Direção de arte / tokens
- Manual do sistema (se existir)
- Resultado de `critica-estruturada` se houver

## Formato da saída

Relatório com: ambiente, viewports, comandos rodados + exit codes, achados
visuais, a11y, performance (se medida), go / no-go.

## Critérios de aceite

- Comandos automatizados aplicáveis foram executados ou marcados N/A com motivo
- Viewports relevantes checados
- `prefers-reduced-motion` considerado
- Decisão go/no-go explícita

## Proibições

- Declarar “Lighthouse OK” sem número/evidência
- Publicar docs internos ou referências DevTools
- Alterar conteúdo canônico para “passar” no visual

## Campos variáveis

`{{COMANDOS_VALIDATE}}`, `{{VIEWPORTS}}`, `{{URL_LOCAL}}`

## Como evitar resultados genéricos

Anexar comandos reais do `package.json` do projeto (neste repo:
`npm run validate`, `npm run test:a11y`, etc.).

## Armazenamento e versionamento

Prompt em `metodo/prompts/qa-visual.md`.

## Quando não usar

Em exploração criativa precoce (Fases 1–2) sem superfície implementada.
