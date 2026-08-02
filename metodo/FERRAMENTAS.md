# Ferramentas e integrações

Legenda de status:

- `JÁ CONFIGURADA`
- `CONFIGURADA PARCIALMENTE`
- `DEPENDÊNCIA EXTERNA`
- `A CONFIGURAR`
- `NÃO NECESSÁRIA NESTA FASE`

## Inventário

| Ferramenta                    | Status                                   | Notas / fallback                                                         |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| Cursor                        | JÁ CONFIGURADA                           | Regras em `.cursor/rules/`; MCP em `.cursor/mcp.json`                    |
| Node.js (≥18)                 | JÁ CONFIGURADA                           | `engines` no `package.json`; CI usa Node 20                              |
| npm                           | JÁ CONFIGURADA                           | `npm ci` / scripts                                                       |
| Git                           | JÁ CONFIGURADA                           | Commits na `main` (regra Cursor)                                         |
| Playwright                    | JÁ CONFIGURADA                           | `@playwright/test`; e2e do programa                                      |
| Axe                           | JÁ CONFIGURADA                           | `@axe-core/playwright` + `npm run test:a11y`                             |
| ESLint / Stylelint / Prettier | JÁ CONFIGURADA                           | Scripts `lint:*` / `format:check`                                        |
| Chrome DevTools MCP           | JÁ CONFIGURADA                           | `.cursor/mcp.json` e `.mcp.json` — sem secrets no arquivo                |
| Skills Claude / Impeccable    | JÁ CONFIGURADA                           | `.claude/skills/`; hooks Impeccable                                      |
| XDS / Astryx MCP              | CONFIGURADA PARCIALMENTE                 | Server `xds` presente; **não** é stack default do produto (ADR-001)      |
| Higgsfield CLI                | CONFIGURADA PARCIALMENTE                 | `devDependency`; auth humana (`higgsfield auth login`)                   |
| Lighthouse                    | DEPENDÊNCIA EXTERNA                      | Chrome; sem script npm; checklist MANUAL                                 |
| NVDA / VoiceOver              | DEPENDÊNCIA EXTERNA                      | SO; responsabilidade humana; não instalar via npm                        |
| Figma                         | DEPENDÊNCIA EXTERNA                      | Conta humana; **código é fonte visual atual**                            |
| Figma MCP                     | A CONFIGURAR                             | Só após promoção de Figma com governança                                 |
| Code Connect                  | A CONFIGURAR / NÃO NECESSÁRIA NESTA FASE | Requer componentes e Figma canônico                                      |
| Google Stitch                 | DEPENDÊNCIA EXTERNA                      | Mockups em `referencia/stitch/` — composição não canônica                |
| Claude Design                 | NÃO NECESSÁRIA NESTA FASE                | Processo humano opcional                                                 |
| Claude Code                   | DEPENDÊNCIA EXTERNA                      | Template `05-regras-agente.md` portável; sem `CLAUDE.md` inchado na raiz |
| image-convert (agent-media)   | CONFIGURADA PARCIALMENTE                 | Ver exceção abaixo — não bloqueia tokens                                 |

## Vocação — qual ferramenta serve a quê

Inventário diz o que **está** disponível; esta tabela diz para que cada coisa
**serve**. Usar uma no papel da outra é a causa mais comum de frustração.

| Ferramenta                   | Vocação real                                                    | Melhor momento                   | Limite                                                         |
| ---------------------------- | --------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| Claude Design                | Canvas conversacional que renderiza ao vivo; comentários inline | Fases 2–5: explorar e apresentar | Não substitui fonte canônica; edição colaborativa limitada     |
| Claude Code / Cursor         | Agente com acesso ao repositório, skills, subagentes e MCP      | Fases 6–8                        | Não tem julgamento estético; precisa de tokens e referência    |
| Figma                        | Fonte canônica de sistema visual; Variables, Dev Mode, MCP      | Fases 3–4 e handoff              | Só compensa com arquivo bem estruturado; **não canônico aqui** |
| Google Stitch                | Geração rápida de muitas telas a partir de texto ou imagem      | Fase 5, exploração de volume     | Qualidade depende do prompt; composição não canônica           |
| Chrome DevTools / Playwright | O agente vê e mede o que produziu                               | Fases 6–7                        | Não julga se está bonito, só se está correto                   |
| Awwwards / Behance / etc.    | Bancos de referência                                            | Fase 2                           | **Não são briefing; são vocabulário**                          |

Resumindo: canvas resolve o problema da primeira versão; Figma resolve o
problema da fonte de verdade; agente de código resolve o problema da produção.

## Matriz de decisão — por onde começar

| Sua situação                             | Comece por                    | Depois                          | Não perca tempo com                  |
| ---------------------------------------- | ----------------------------- | ------------------------------- | ------------------------------------ |
| Landing page sozinho, prazo curto        | Canvas (Claude Design/Stitch) | Agente de código                | Montar sistema completo no Figma     |
| Site institucional para cliente exigente | Sistema no Figma              | Agente de código via MCP        | Gerar em código sem aprovação visual |
| Produto que vai evoluir por anos         | Design system primeiro        | Figma + Code Connect            | Protótipo descartável                |
| Explorar muitas direções rápido          | Google Stitch                 | Normalizar a vencedora          | Refinar tudo antes de escolher       |
| Refatorar site existente                 | Agente lendo o código         | Extrair tokens do que já existe | Redesenhar antes de entender         |
| Trabalho com designer na equipe          | Figma como fonte única        | MCP bidirecional                | Duas fontes de verdade               |

**Neste repositório** a linha aplicável é a de refatorar site existente: os
protótipos existem, os tokens foram extraídos na Fase 3 e a migração de runtime
aguarda decisão humana. Ver [`PIPELINE.md`](PIPELINE.md).

## Exceção — skill `image-convert`

- Árvore canônica de skills: `.claude/skills/` (ADR-007 / `docs/skills.md`).
- `image-convert` existe hoje em `.agents/skills/image-convert/` (espelho agents),
  com lock em `skills-lock.json` (`agntswrm/agent-media`, hash pinado).
- **Exceção documentada:** não é obrigatório regularizar na árvore canônica nesta
  fase; conversão de imagem não faz parte do pipeline de design tokens.
- Automações futuras devem evitar `npx agent-media@latest` sem pin; preferir a
  versão/hash do `skills-lock.json` ou instalar versão fixa.
- Regularizar cópia/symlink sob `.claude/skills/` é tarefa separada (não misturar
  com direção visual / Fase 3).

## Segredos e credenciais

- Nunca versionar: API tokens, cookies, sessões, caminhos pessoais absolutos desnecessários, IDs privados.
- Usar `.env` / `.env.*` (já no `.gitignore`) ou config local ignorada.
- MCP versionado **sem** embutir chaves (estado atual OK).
- `npm run validate:metodo` procura padrões óbvios de segredo em `metodo/`,
  valida links relativos em `metodo/**/*.md` e em
  `programas/discipulando-a-caserna/docs/metodo/**/*.md`, proíbe
  `metodo/skills/**/SKILL.md`, exige contrato mínimo de `PROMPT EXECUTÁVEL`
  (descoberta, análise-concorrência, curadoria-referências, direção-arte,
  manual-design-system, implementação, auditoria-final) e aplica checagem
  semântica leve do painel Fase 2 e
  do Manual Fase 4. Em cada verificação, `OK` só é emitido se não houver
  `FAIL` naquele check.

## Design system (programa piloto)

| Script                                | Status                    | Notas                             |
| ------------------------------------- | ------------------------- | --------------------------------- |
| `generate:discipulando:tokens`        | JÁ CONFIGURADA            | Write explícito de `tokens.css`   |
| `validate:discipulando:tokens`        | JÁ CONFIGURADA            | Check-only (não regenera; F3-R02) |
| `validate:discipulando:design-system` | JÁ CONFIGURADA            | Fichas, lab, IDs                  |
| `test:discipulando:design-system`     | JÁ CONFIGURADA            | Unitários Node                    |
| `test:discipulando:design-system:e2e` | JÁ CONFIGURADA            | Playwright + Axe no lab           |
| Storybook                             | NÃO NECESSÁRIA NESTA FASE | Lab estático preferido (ADR-001)  |

## Teste de disponibilidade (humano)

1. `node -v` e `npm -v`
2. `npm ci` e `npm run validate:metodo`
3. MCP Chrome DevTools: listar páginas / inspeção simples no IDE
4. NVDA/VoiceOver: smoke opcional antes de release pastoral
5. Lighthouse: sob demanda, registrar número no relatório QA

## Responsabilidade

Ferramentas externas (NVDA, Figma, Stitch, Lighthouse, auth Higgsfield) são
**pré-requisitos humanos**, não dependências do artefato publicado.
