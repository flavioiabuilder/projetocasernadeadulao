# Publicação — superfície autorizada

## Decisão D1 (default técnico da auditoria integral)

Enquanto a matriz institucional da Rota B permanecer sem confirmações
documentais (`docs/validacoes/task-p0-08-e-p0-10-validacao-institucional.md`),
a publicação pública no GitHub Pages deve expor **somente** o prospecto:

- `index.html`
- `404.html`
- `robots.txt`
- `css/`
- `js/`
- `assets/`

Fora do artefato público (circulação restrita / uso local ou compartilhamento
controlado):

- `apresentacao/`
- `fontes/`
- `docs/`
- `prototipos/`
- `conteudo/` (fonte editorial; não precisa estar no Pages)
- `.claude/`, `.github/skills/`, `legado/`, `ferramentas/`, `testes/`

## Mecanismo

O workflow [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) monta
a pasta `_site` com a lista acima e faz deploy via GitHub Pages.

É necessário, uma vez, configurar o repositório para **GitHub Actions** como
fonte do Pages (Settings → Pages → Source: GitHub Actions), em substituição a
“Deploy from branch” da raiz, se ainda estiver ativo.

## Indexação

`robots.txt` e `noindex` permanecem. Não são autenticação: apenas reduzem
indexação. O controle de exposição é a lista do artefato.

## Offline

Abertura local por `index.html` (duplo clique) ou `npx serve .` na raiz do
clone continua válida para desenvolvimento e para a apresentação de homologação.
