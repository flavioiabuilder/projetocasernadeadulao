# Convenções — O Sistema

Cada convenção tem **escopo**. Não imponha regra de um protótipo a outro projeto
sem decisão explícita.

Escopos: `GLOBAL` (futuros projetos do método) · `REPO` (este repositório) ·
`PROGRAMA` (Discipulando a Caserna) · `PROTOTIPO` (uma superfície HTML).

## Espaçamento

| Escopo                   | Decisão                                                                                  | Fonte                                       |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------- |
| PROGRAMA / prospecto     | Unidade base **4px** (`--esp-1` = 0.25rem)                                               | `prototipos/prospecto-v1/css/tokens.css`    |
| PROTOTIPO / storytelling | Sem escala `--esp-*`; gutters `--mx`                                                     | `prototipos/storytelling-v1/css/tokens.css` |
| GLOBAL                   | Preferir escala tipada em tokens (template `03-tokens.json`); valor default sugerido 4px | Template do método                          |

## Cor

| Escopo    | Decisão                                                                                                | Fonte                        |
| --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------- |
| PROGRAMA  | Variáveis CSS hex por protótipo; navy compartilhado `#1A2A44` / `#1a2a44`                              | tokens.css de cada protótipo |
| PROTOTIPO | Prospecto: bronze `#9a7b4f` + creme; storytelling: latão `#8C6A46` + base `#F4F4F1` — **drift aceito** | Não unificar na Fase 0       |
| GLOBAL    | Template com camadas primitivo/semântico; **sem mandato OKLCH** nesta fase                             | Fase 3                       |

## Tokens (primitivos e semânticos)

| Escopo   | Decisão                                                                    | Fonte                                  |
| -------- | -------------------------------------------------------------------------- | -------------------------------------- |
| PROGRAMA | Runtime canônico = CSS vivo por protótipo; não há `tokens.json` de produto | ADR-004, tokens.css                    |
| GLOBAL   | Template JSON com `primitivos` e `semanticos`                              | `templates/projeto-web/03-tokens.json` |
| GLOBAL   | O template **não** substitui tokens do piloto                              | ADR-007                                |

## Nomenclatura

| Escopo    | Decisão                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| PROTOTIPO | Prospecto usa `--navy`, `--bronze`; storytelling usa `--caserna`, `--latao` — documentar, não “corrigir” agora |
| GLOBAL    | Preferir nomes semânticos (`--cor-superficie`, `--cor-marca`) apontando a primitivos                           |

## Tipografia

| Escopo                   | Decisão                                               | Fonte                   |
| ------------------------ | ----------------------------------------------------- | ----------------------- |
| PROGRAMA / prospecto     | Montserrat + Source Serif 4                           | tokens.css prospecto    |
| PROTOTIPO / storytelling | Empilhamentos de sistema (Iowan/Palatino + Helvetica) | tokens.css storytelling |
| GLOBAL                   | Declarar pares display/corpo no template de tokens    | Fase 3                  |

## Breakpoints

| Escopo                   | Decisão                                            | Fonte                   |
| ------------------------ | -------------------------------------------------- | ----------------------- |
| PROTOTIPO / storytelling | 900px e 560px                                      | tokens.css storytelling |
| PROGRAMA / prospecto     | Gutters mobile/tablet/desktop via tokens de layout | tokens.css prospecto    |
| GLOBAL                   | Registrar breakpoints no template (`breakpoints`)  | `03-tokens.json`        |

## Motion e `prefers-reduced-motion`

| Escopo   | Decisão                                                                                      | Fonte                                    |
| -------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| PROGRAMA | Movimento mínimo; identidade não depende de animação; respeitar `prefers-reduced-motion`     | `docs/decisao-visual-v1.md`, regras a11y |
| GLOBAL   | Tokens `motion` no template; política: reduzir/desligar sob `prefers-reduced-motion: reduce` | Template + checklists                    |

## Stack de runtime

| Escopo   | Decisão                                                                                                        | Fonte   |
| -------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| PROGRAMA | HTML estático + CSS modular + JS clássico progressivo; sem React/Vue/Next/Astro/Tailwind no produto por padrão | ADR-001 |
| GLOBAL   | Registrar stack escolhida por projeto no template `05-regras-agente.md`; não impor framework na Fase 0         | Método  |

## Stack de ferramentas

| Escopo | Decisão                                                                    | Fonte          |
| ------ | -------------------------------------------------------------------------- | -------------- |
| REPO   | Node ≥18, npm, ESLint, Stylelint, Prettier, Playwright, Axe, html-validate | `package.json` |
| REPO   | Validação: `npm run validate` (programa + referências + método)            | `package.json` |

## Commits

| Escopo | Decisão                                                                               | Fonte                               |
| ------ | ------------------------------------------------------------------------------------- | ----------------------------------- |
| REPO   | Conventional Commits (`feat`/`fix`/`docs`/…); trabalho cotidiano na `main`            | `.cursor/rules/commits-na-main.mdc` |
| REPO   | Idioma: PT-BR preferido em docs do método; commits EN ou PT aceitos (histórico misto) | Convenção                           |

## Política de componentes

| Escopo   | Decisão                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------- |
| PROGRAMA | Sem biblioteca UI obrigatória no runtime; CSS modular                                                |
| GLOBAL   | Skills `design-system` / `brand` orientam agentes; não criam segunda fonte de componentes no produto |

## Acessibilidade

| Escopo          | Decisão                                                                                                                      | Fonte                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| REPO / PROGRAMA | Um `h1`; headings em ordem; skip `#conteudo`; `:focus-visible`; nomes acessíveis; alvos ≥44×44 quando possível; contraste AA | `.cursor/rules/*`, e2e Axe |
| GLOBAL          | Checklists + skills `web-a11y-*`                                                                                             | `metodo/skills/README.md`  |

## Performance

| Escopo | Decisão                                                           |
| ------ | ----------------------------------------------------------------- |
| REPO   | Sem budget numérico formal nesta fase                             |
| GLOBAL | Lighthouse = ferramenta externa / MANUAL até decisão futura de CI |

## Arquivos gerados

| Escopo   | Decisão                                                                            | Fonte       |
| -------- | ---------------------------------------------------------------------------------- | ----------- |
| PROGRAMA | Não editar `js/dados/*.js`, FALLBACK-DADOS, `_gerado/`, HTML de homologação gerado | ADR-005     |
| GLOBAL   | Declarar paths gerados nas regras do agente do projeto                             | Template 05 |

## Referências externas e segredos

| Escopo | Decisão                                                                      | Fonte                            |
| ------ | ---------------------------------------------------------------------------- | -------------------------------- |
| REPO   | `.env` / `.env.*` ignorados; não versionar API keys, cookies, sessões        | `.gitignore`                     |
| REPO   | `referencias-devtools/` fora do Pages; sem redistribuir ativos proprietários | `referencias-devtools/README.md` |
| GLOBAL | Fichas em `metodo/biblioteca/referencias/` = metadados + links               | Biblioteca                       |

## Fonte de verdade visual

| Escopo   | Decisão                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| PROGRAMA | Código CSS + decisão visual; Stitch = composição não canônica; Figma **não** é canônico até promoção explícita |
| GLOBAL   | Campo “Figma URL” nos templates permanece vazio até governança suficiente                                      |

## Storytelling CSS e lint

| Escopo    | Decisão                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------ |
| PROTOTIPO | CSS de `storytelling-v1` **não** entra hoje em `lint:discipulando:css` — gap PARCIALMENTE AUTOMATIZADO |
