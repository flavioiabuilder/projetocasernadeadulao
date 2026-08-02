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

## PROMPT EXECUTÁVEL

Cole o bloco abaixo. Substitua `{{…}}`. Este prompt verifica conformidade
visual; não redesenha e não canoniza.

```text
Papel: Você é QA visual e de interface. Mede e reporta; não inventa requisitos
nem altera conteúdo canônico para “passar”.
Idioma: português brasileiro.

Alvo: {{URL_LOCAL}}
Viewports: {{VIEWPORTS}}
Comandos de validação do repo: {{COMANDOS_VALIDATE}}

Procedimento:
1. Execute os comandos aplicáveis; registre exit codes reais.
2. Inspecione viewports listados (topo, meio, fim; estados interativos).
3. Verifique prefers-reduced-motion: reduce.
4. Anote achados visuais, a11y e regressões com evidência.
5. Emita go / no-go explícito para handoff — não para canonização de Fase 5
   (isso é decisão humana separada).

Critérios de aceite:
- Comandos rodados ou N/A justificado.
- Viewports checados; RM considerado.
- Decisão go/no-go explícita com evidências.

Proibições:
- Declarar Lighthouse/Axe OK sem evidência.
- Publicar docs internos ou referências DevTools.
- Alterar copy canônica; simular aprovação pastoral.
- Promover protótipo a canônico ou abrir Fase 6.

Autoavaliação: liste o que não foi possível verificar manualmente (leitor de
tela, etc.) como pendência humana.
```
