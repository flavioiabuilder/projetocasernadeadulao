# Discipulando a Caserna | Projeto Caserna de Adulão

Prospecto pastoral digital do programa **Discipulando a Caserna**, submetido ao
**Pr. Glaydston** para apreciação, orientação e validação.

Versão: **v1.0** (cinco movimentos — seções 1 a 15).

## O que é

Não é landing page, portal de igreja nem plataforma de cursos. É uma **carta que
se abre em prospecto**: começa pessoal e desenvolve a necessidade, a resposta, o
programa, a prova e o pedido pastoral.

## Hierarquia

- **Discipulando a Caserna** — protagonista desta apresentação
- **Projeto Caserna de Adulão** — contexto institucional ao qual o discipulado serve

## Arquitetura narrativa

Cinco movimentos, quinze seções:

| Movimento | Seções | Status |
|---|---|---|
| I — A necessidade | 1–4 | publicado |
| II — A resposta | 5–7 | publicado |
| III — O programa | 8–11 | publicado |
| IV — A prova | 12–13 | publicado |
| V — O pedido | 14–15 | publicado |

## Como abrir

Offline, sem instalação:

1. Abra `index.html` no navegador (duplo clique), ou
2. Sirva a raiz com qualquer servidor estático:

```bash
npx serve .
```

Zero CDN. Fontes self-hosted em `assets/fonts/`.

## Conteúdo

Fonte da verdade do site: `conteudo/`. Ver `conteudo/LEIA-ME.md`.

Referência pastoral (não substitui `conteudo/`): `fontes/guia-mestre/`.

Citações (`>`) nos Markdown são literais — não parafrasear.

## Qualidade

```bash
npm install
npm run validate
```

## Publicação

- URL prevista: <https://flavioiabuilder.github.io/projetocasernadeadulao/>
- Indexação bloqueada (`robots.txt` + `noindex`)

## Referência de layout

Mockups em `referencia/stitch/` (ignorados pelo git) orientam composição das
seções 1, 3, 9 e 12. Ver `referencia/stitch/LEIA-ME.md` (o que extrair / rejeitar).
Nenhum código Tailwind/CDN deles entra no produto.

## Pendências

Ver [`TODO.md`](TODO.md). Decisões humanas (apreciação pastoral da marca, licença,
indexação) permanecem abertas — não inventar. Arte oficial em
`assets/img/logo-pdac/` (ver `LEIA-ME.md` lá).
