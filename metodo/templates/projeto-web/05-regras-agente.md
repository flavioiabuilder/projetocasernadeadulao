# 05 — Regras do agente (template portável)

> Template genérico para Cursor (`.mdc` / `AGENTS.md`), Claude Code (`CLAUDE.md`)
> ou outros agentes. Adapte paths. **Não** copie regras pastorais de outro
> programa sem necessidade.

## Contexto

- **Projeto:** {{NOME_DO_PROJETO}}
- **Finalidade:** TODO
- **Público da superfície:** TODO
- **Idioma:** TODO

## Fontes canônicas

| Domínio           | Path / URL    | Não é fonte |
| ----------------- | ------------- | ----------- |
| Conteúdo          | {{PATH}}      | TODO        |
| Dados             | {{PATH}}      | TODO        |
| Tokens / visual   | {{PATH}}      | TODO        |
| Decisões técnicas | {{PATH_ADRS}} | TODO        |

## Regras invioláveis

1. TODO
2. TODO
3. Não inventar fatos, endossos, métricas ou aprovações sem fonte.
4. Não editar arquivos gerados listados abaixo.
5. Não versionar segredos (`.env`, tokens de API, cookies, sessões).

## Stack

- **Runtime:** TODO (ex.: HTML/CSS/JS estático)
- **Ferramentas:** TODO (lint, test, generate)
- **Não adotar por padrão:** TODO

## Convenções

- Espaçamento / tokens: TODO
- Commits: TODO
- Idioma de código/docs: TODO

## Arquivos gerados

Não editar manualmente:

- {{PATH_GERADO_1}}
- {{PATH_GERADO_2}}

Após alterar fontes: {{COMANDO_GENERATE}}

## Segurança

- Credenciais só em variáveis de ambiente / config local ignorada pelo Git.
- Não colar chaves em Markdown, issues ou commits.

## Comandos de validação

```bash
{{COMANDO_VALIDATE}}
```

Antes de declarar conclusão: executar validação relevante e reportar o resultado.

## Definição de conclusão

Uma tarefa só está concluída quando:

1. As fontes canônicas foram respeitadas.
2. Validações acordadas passaram (ou falhas foram reportadas com causa).
3. Nenhuma regra inviolável foi violada.
4. Mudanças fora de escopo foram evitadas ou pedidas explicitamente.

## Limites de autonomia

O agente **pode** sem perguntar:

- TODO

O agente **deve pedir validação humana** antes de:

- Mudança de stack ou publicação
- Alteração de identidade visual canônica
- Conteúdo sensível / institucional não confirmado
- Introdução de Figma (ou outra ferramenta) como segunda fonte de verdade

## Mapeamento para loaders

| Loader       | Como usar este arquivo                                  |
| ------------ | ------------------------------------------------------- |
| Cursor Rules | Extrair seções para `.cursor/rules/*.mdc` com globs     |
| `AGENTS.md`  | Resumo + links para este arquivo e ADRs                 |
| `CLAUDE.md`  | Resumo + Design Context se necessário; evitar triplicar |
