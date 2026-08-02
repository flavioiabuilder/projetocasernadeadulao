# Projeto Caserna de Adulão

Repositório técnico do **Projeto Caserna de Adulão**: programas ministeriais em
desenvolvimento e estudos técnicos independentes.

## Estrutura

| Área                 | Caminho                                                                  | Papel                                                      |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Programa             | [`programas/discipulando-a-caserna/`](programas/discipulando-a-caserna/) | Discipulando a Caserna (protótipos, conteúdo, ferramentas) |
| Método “O Sistema”   | [`metodo/`](metodo/)                                                     | Fase 0 — templates, prompts, checklists (não publicado)    |
| Referências DevTools | [`referencias-devtools/`](referencias-devtools/)                         | Estudos e reconstruções técnicas independentes             |
| Docs globais         | [`docs/`](docs/)                                                         | Skills de agentes e política de IA do repositório          |

O Discipulando a Caserna **não** é o Projeto Caserna de Adulão inteiro — é um
programa dentro deste repositório. As referências DevTools não são produto
ministerial.

## Comandos globais

```bash
npm install
npx playwright install chromium
npm run validate                 # programa + referências + método
npm run validate:discipulando    # só o programa
npm run validate:referencias     # só referências DevTools
npm run validate:metodo          # contrato da camada metodo/
```

## Publicação

- URL: <https://flavioiabuilder.github.io/projetocasernadeadulao/>
- Artefato filtrado via GitHub Actions (sem docs internos, Guia, homologação
  restrita nem referências DevTools)
- Indexação bloqueada (`robots.txt` + `noindex`)
- Detalhe do programa: [`programas/discipulando-a-caserna/docs/publicacao.md`](programas/discipulando-a-caserna/docs/publicacao.md)

## Leitura

- Programa: [`programas/discipulando-a-caserna/README.md`](programas/discipulando-a-caserna/README.md)
- Método: [`metodo/README.md`](metodo/README.md) · ponte [`docs/metodo.md`](docs/metodo.md)
- Agentes: [`AGENTS.md`](AGENTS.md)
- Referências: [`referencias-devtools/README.md`](referencias-devtools/README.md)
- Skills: [`docs/skills.md`](docs/skills.md) · catálogo [`docs/agent-skills.md`](docs/agent-skills.md)
