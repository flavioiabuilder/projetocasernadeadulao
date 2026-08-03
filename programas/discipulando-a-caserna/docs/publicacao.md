# Publicação — superfície autorizada

Norma detalhada: [`arquitetura/ADR-002-publicacao-e-github-pages.md`](arquitetura/ADR-002-publicacao-e-github-pages.md).
Perfis offline: [`ADR-003`](arquitetura/ADR-003-requisito-offline.md).

## Decisão D1 (default técnico)

Enquanto a matriz institucional da Rota B permanecer sem confirmações
documentais (`validacoes/task-p0-08-e-p0-10-validacao-institucional.md`),
a publicação pública no GitHub Pages deve expor:

Na raiz do artefato:

- `index.html` (índice do Projeto Caserna de Adulão)
- `assets/` (marca institucional do Projeto, ex.: `assets/img/logo-pca/`)
- `404.html`
- `robots.txt`
- shims em `prototipos/` (redirecionamentos das URLs antigas)

Sob `programas/discipulando-a-caserna/`:

- `index.html` (índice técnico de protótipos)
- `assets/`
- `prototipos/prospecto-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`

Fora do artefato público:

- `prototipos/homologacao-pastoral-v1/`
- `fontes/`, `docs/`, `conteudo/`
- `ferramentas/`, `testes/`, `legado/`
- `referencias-devtools/`
- skills e configurações de agentes

## Mecanismo

O workflow [`.github/workflows/pages.yml`](../../../.github/workflows/pages.yml)
instala dependências, roda `npm run generate:discipulando` e monta `_site`
seletivamente.

Configure Pages com fonte **GitHub Actions** (Settings → Pages).

## Indexação

`robots.txt` e `noindex` permanecem. Não são autenticação.

## Offline

Ver ADR-003: prospecto por `file://` ou `npx serve .` na raiz do repositório;
homologação com fontes tipográficas embutidas (logo PNG ainda depende de
`assets/`).
