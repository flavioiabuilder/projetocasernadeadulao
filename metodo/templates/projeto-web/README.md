# Template — projeto web (cinco artefatos)

Estrutura-base do método **O Sistema**. Copie esta pasta para iniciar um
projeto novo e preencha os cinco arquivos.

## Arquivos

| Arquivo                      | Fase principal | Papel                                     |
| ---------------------------- | -------------- | ----------------------------------------- |
| `01-briefing-estrategico.md` | 1              | Intenção, público, provas, restrições     |
| `02-painel-referencias.md`   | 2              | Referências anotadas por eixo             |
| `03-tokens.json`             | 3              | Tokens primitivos e semânticos            |
| `04-manual-sistema.md`       | 4              | Manual do design system                   |
| `05-regras-agente.md`        | 0–6            | Regras portáveis do agente para o projeto |

Prompt executável da Fase 4: [`../../prompts/manual-design-system.md`](../../prompts/manual-design-system.md).

## Como copiar

```bash
# Exemplo: destino temporário ou novo diretório de projeto
cp -r metodo/templates/projeto-web /caminho/do/novo-projeto/docs/metodo-base
```

No Windows (PowerShell):

```powershell
Copy-Item -Recurse metodo\templates\projeto-web C:\caminho\do\novo-projeto\docs\metodo-base
```

## Placeholders

- Use `{{NOME_DO_CAMPO}}` ou seções marcadas `TODO:` até confirmar o fato.
- Não invente métricas, endossos, datas ou provas.
- Marque lacunas como `LACUNA` ou `NÃO CONFIRMADO`.

## Critério de aceite (bootstrap)

1. Os cinco arquivos existem no destino.
2. `03-tokens.json` é JSON válido com `primitivos` e `semanticos`.
3. Há placeholders ou seções TODO suficientes para orientar o preenchimento.
4. Instruções deste README são suficientes para começar a Fase 1.

Validação automatizada no repositório piloto:

```bash
npm run validate:metodo -- --bootstrap
```
