# Fase 6 — Implementação

**Objetivo.** Transformar protótipo aprovado em código de produção sustentável
— código que outra pessoa, ou você em seis meses, consiga manter.

Estado no piloto: **BLOQUEADA** até autorização humana F5-12
([`estado-prototipo-canonico.json`](../../programas/discipulando-a-caserna/docs/metodo/fase-5/estado-prototipo-canonico.json)).
O candidato F5 consome `tokens.css`; a superfície de produção prevista
(`programas/discipulando-a-caserna/prospecto/`) ainda não existe. Runtime
Pages permanece em `prospecto-v1` até F6-11.

## 6.1 Stack

O documento-fonte recomenda Astro / Next / Tailwind / shadcn. **Aqui não**:
HTML estático + CSS modular + JS clássico progressivo, por
[ADR-001](../../docs/arquitetura/ADR-001-stack-do-projeto.md) — o produto é uma
carta institucional que precisa abrir offline
([ADR-003](../../docs/arquitetura/ADR-003-requisito-offline.md)).

O que **não** muda com a stack: os tokens são a única origem dos valores.

## 6.2 Estrutura

Docs vivem no repositório para que o agente leia briefing e sistema a qualquer
momento, sem recolar contexto em toda sessão. Neste repositório:

| Papel               | Path                                                     |
| ------------------- | -------------------------------------------------------- |
| Regras do agente    | [`../../AGENTS.md`](../../AGENTS.md) + `.cursor/rules/`  |
| Método              | [`../README.md`](../README.md)                           |
| Instância do método | `programas/discipulando-a-caserna/docs/metodo/`          |
| Tokens              | `programas/discipulando-a-caserna/design-system/tokens/` |
| Componentes/padrões | `programas/discipulando-a-caserna/design-system/`        |
| Superfícies         | `programas/discipulando-a-caserna/prototipos/`           |
| Testes              | `programas/discipulando-a-caserna/testes/`               |

## 6.3 Regras do agente

O arquivo de regras é contexto **sempre ativo** — por isso deve ser curto e
conter só o que vale para quase toda tarefa. Tudo situacional vai para skill.

Aqui a ponte é [`../../AGENTS.md`](../../AGENTS.md); o template portável para
projetos novos é
[`../templates/projeto-web/05-regras-agente.md`](../templates/projeto-web/05-regras-agente.md).
Não triplicar o mesmo texto em `.mdc`, `CLAUDE.md` e `AGENTS.md`.

## 6.4 Onde colocar cada conhecimento

| Se…                                                | Use                                      |
| -------------------------------------------------- | ---------------------------------------- |
| A regra vale para quase toda tarefa                | Arquivo de regras (`AGENTS.md` / `.mdc`) |
| O conhecimento vale só às vezes, mas é profundo    | **Skill** (`.claude/skills/`)            |
| A tarefa é pesada e polui o contexto principal     | **Subagente**                            |
| É efeito determinístico em evento do ciclo de vida | **Hook**                                 |
| Precisa de dado externo ao vivo                    | **MCP**                                  |
| Quer distribuir tudo isso empacotado               | **Plugin**                               |

Árvore canônica de skills: `.claude/skills/`
([ADR-006](../../docs/arquitetura/ADR-006-ferramentas-de-ia.md)). Mapa em
[`../skills/README.md`](../skills/README.md). O que mais importa numa skill é a
**descrição**: é ela que decide se a skill dispara. Descrição vaga significa
skill que nunca é acionada.

## 6.5 MCPs

| MCP                  | Ganho                                                           | Estado aqui  |
| -------------------- | --------------------------------------------------------------- | ------------ |
| Navegador / DevTools | O agente vê o que produziu — o que mais eleva a qualidade final | Configurado  |
| Playwright           | Verificação automatizada + Axe                                  | Configurado  |
| Figma                | Ler design, escrever de volta, Code Connect                     | A configurar |

> Um agente que não consegue ver o que produziu está codificando com os olhos
> fechados. Dê a ele um navegador antes de dar mais um parágrafo de instrução.

## 6.6 Disciplina de trabalho

- **Uma tarefa, uma conversa.** Sessões longas acumulam contexto contraditório.
- **Planejar antes de codar.** Aprovar plano custa dois minutos; revisar código
  errado custa duas horas.
- **Commits pequenos e frequentes.** Facilita reverter quando o agente erra — e ele erra.
- **Revisar o diff, sempre.** Código que você não leu é código que você não mantém.

## Procedimento

1. Confirmar protótipo canônico definido na Fase 5.
2. Pedir o plano ao agente ([`../prompts/implementacao.md`](../prompts/implementacao.md)) e aprová-lo.
3. Implementar uma seção por vez, montando a partir do inventário.
4. Rodar os gates e reportar exit codes.
5. Revisar o diff antes de commitar.

## Entregável

Código em repositório, com os gates verdes e o diff revisado.

## Critério de aceite

> Um desenvolvedor externo consegue adicionar uma seção nova ao site sem
> perguntar nada a você.

E, específico deste repositório:

- `npm run validate` exit 0.
- Nenhum valor visual fora dos tokens na superfície migrada.
- Nenhum arquivo gerado editado à mão
  ([ADR-005](../../docs/arquitetura/ADR-005-artefatos-gerados.md)).

## Proibições

- Migrar runtime de protótipo sem decisão humana registrada
- Introduzir framework, biblioteca de UI ou utilitário CSS fora do ADR-001
- Editar `js/dados/*`, blocos `FALLBACK-DADOS`, `_gerado/` ou HTML de homologação
- Alterar copy canônica de `conteudo/` para acomodar layout
- Criar segunda árvore de skills ou de ADRs
