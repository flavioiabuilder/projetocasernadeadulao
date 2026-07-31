# Discipulando a Caserna | Projeto Caserna de Adulão

Prospecto pastoral digital do programa **Discipulando a Caserna**, submetido ao
**Pr. Glaydston** para apreciação, orientação e validação.

Versão: **v1.0** (cinco movimentos — seções 1 a 15).

## O que é

Não é landing page, portal de igreja nem plataforma de cursos. É uma **carta que
se abre em prospecto**: começa pessoal e desenvolve a necessidade, a resposta, o
programa, a prova e o pedido pastoral.

### Hierarquia

- **Discipulando a Caserna** — protagonista desta apresentação
- **Projeto Caserna de Adulão** — contexto institucional ao qual o discipulado serve

### O que o produto não é

Portal de igreja, eventos, catálogo de ministérios, arrecadação, LMS, dashboard
ou captação de participantes. Limites de **produto** estão em `TODO.md` e
`docs/contexto-do-projeto.md`. Limites de **stack** estão em
[`docs/arquitetura/`](docs/arquitetura/README.md).

## Quick start

```bash
# Abrir o prospecto
# 1) Duplo clique em index.html  ou  2) servidor estático:
npx serve .

# Qualidade (Node ≥ 18)
npm install
npx playwright install chromium
npm run validate
```

## Mapa de superfícies

| Superfície        | Caminho                                  | Papel                                       | Público Pages |
| ----------------- | ---------------------------------------- | ------------------------------------------- | ------------- |
| Prospecto         | `index.html`                             | Experiência oficial de leitura              | Sim           |
| 404               | `404.html`                               | Página não encontrada do deploy             | Sim           |
| Homologação       | `apresentacao/homologacao-pastoral.html` | Deck gerado (33 telas), circulação restrita | Não           |
| Storytelling      | `prototipos/storytelling-v1/`            | Protótipo institucional testado             | Não           |
| Direções A/B/C    | `prototipos/direcao-*`                   | Referência histórica de direção visual      | Não           |
| Guia Mestre       | `fontes/guia-mestre/`                    | Referência pastoral (não é fonte do site)   | Não           |
| Spec storytelling | `docs/storytelling/`                     | Roteiro e exports de referência             | Não           |

Ver também [`prototipos/LEIA-ME.md`](prototipos/LEIA-ME.md).

## Arquitetura narrativa

| Movimento         | Seções | Status    |
| ----------------- | ------ | --------- |
| I — A necessidade | 1–4    | publicado |
| II — A resposta   | 5–7    | publicado |
| III — O programa  | 8–11   | publicado |
| IV — A prova      | 12–13  | publicado |
| V — O pedido      | 14–15  | publicado |

## Conteúdo canônico e geração

| Fonte                 | Uso                                                    |
| --------------------- | ------------------------------------------------------ |
| `conteudo/*.md`       | Texto editorial literal (citações `>` não parafrasear) |
| `conteudo/*.json`     | Módulos e matriz curricular                            |
| `js/config.js`        | Destinatário, versão, contato (manual)                 |
| `fontes/guia-mestre/` | Referência; não editar o site a partir do PDF/DOCX     |

**Gerados (não editar à mão):** `js/dados/*.js`, bloco `FALLBACK-DADOS` em
`index.html`, `apresentacao/homologacao-pastoral.html`.

```bash
npm run generate                 # JSON → js/dados + fallback
npm run generate:apresentacao    # deck de homologação
npm run generate:editorial       # PoC/pipeline MD → fragmentos em _gerado/ (não substitui index.html)
```

Detalhe: [ADR-004](docs/arquitetura/ADR-004-fontes-da-verdade.md),
[ADR-005](docs/arquitetura/ADR-005-artefatos-gerados.md).

## Stack (resumo)

Runtime: HTML + CSS modular + JS clássico progressivo, sem framework de UI e
sem CDN de runtime no produto. Fontes self-hosted em `assets/fonts/`.

Ferramentas Node (generate, lint, testes) fazem parte do fluxo de qualidade —
não confundir com dependência de runtime. Decisões: [`docs/arquitetura/`](docs/arquitetura/README.md).

## Comandos

| Comando                         | Função                                |
| ------------------------------- | ------------------------------------- |
| `npm run generate`              | Dados a partir de `conteudo/*.json`   |
| `npm run generate:apresentacao` | HTML da homologação                   |
| `npm run generate:editorial`    | Fragmentos editoriais a partir dos MD |
| `npm run validate`              | Cadeia completa de qualidade          |
| `npm test` / `npm run test:e2e` | Unitários / Playwright                |

## Publicação

- URL: <https://flavioiabuilder.github.io/projetocasernadeadulao/>
- Indexação bloqueada (`robots.txt` + `noindex`)
- Artefato filtrado via GitHub Actions — [`docs/publicacao.md`](docs/publicacao.md) / [ADR-002](docs/arquitetura/ADR-002-publicacao-e-github-pages.md)
- Confirmar em Settings → Pages → Source: **GitHub Actions**

## Offline

Três perfis ([ADR-003](docs/arquitetura/ADR-003-requisito-offline.md)):

1. Prospecto — caminhos relativos; duplo clique desejável
2. Homologação — CSS/JS/fontes tipográficas no HTML; logo PNG ainda usa `../assets/`
3. Pages — hospedagem estática (não é PWA)

## Agentes de IA

Skills canônicas em `.claude/skills/` ([ADR-006](docs/arquitetura/ADR-006-ferramentas-de-ia.md),
[`docs/skills.md`](docs/skills.md)). Regras Cursor em `.cursor/rules/` cobrem
fidelidade pastoral e qualidade — stack aponta para as ADRs.

## Referência de layout

Mockups em `referencia/stitch/` (gitignored) orientam composição das seções 1, 3,
9 e 12. Nenhum código Tailwind/CDN deles entra no produto.

## Pendências

Ver [`TODO.md`](TODO.md). Decisões humanas (apreciação pastoral da marca, licença,
indexação) permanecem abertas — não inventar. Arte oficial em
`assets/img/logo-pdac/`.
