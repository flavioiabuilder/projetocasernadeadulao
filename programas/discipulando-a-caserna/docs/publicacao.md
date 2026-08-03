# Publicação — superfície autorizada

Norma detalhada: [`arquitetura/ADR-002-publicacao-e-github-pages.md`](arquitetura/ADR-002-publicacao-e-github-pages.md).
Decisão vigente: [`publicacao/PUB-F5-01.md`](publicacao/PUB-F5-01.md).
**Fonte verificável da allowlist:** [`publicacao/estado-publicacao.json`](publicacao/estado-publicacao.json).

Perfis offline: [`ADR-003`](arquitetura/ADR-003-requisito-offline.md).

## Princípios

```text
noindex ≠ autenticação
robots.txt ≠ controle de acesso
URL pública ≠ circulação controlada
```

## Decisão D1 (default técnico)

Enquanto a matriz institucional da Rota B permanecer sem confirmações
documentais (`validacoes/task-p0-08-e-p0-10-validacao-institucional.md`) e
enquanto **PUB-F5-01** estiver **SUSPENSA**, a publicação pública no GitHub
Pages deve expor **somente** a allowlist de `estado-publicacao.json`:

Na raiz do artefato:

- `index.html` (índice do Projeto Caserna de Adulão)
- assets de marca PCA listados em `rootAssets`
- `404.html`
- `robots.txt`
- shims em `prototipos/` (URLs antigas)

Sob `programas/discipulando-a-caserna/`:

- `index.html` (índice técnico — sem links para F5/lab)
- assets listados em `programAssets` (dependência real)
- `prototipos/prospecto-v1/`
- `prototipos/storytelling-v1/`
- `prototipos/direcoes-visuais-v1/`

**Fora do artefato público (denylist):**

- `prototipos/prospecto-fase-5-v1/` (canônico local; prévia pública suspensa)
- `design-system/` (interno, incl. laboratório)
- `prototipos/homologacao-pastoral-v1/`
- `fontes/`, `docs/`, `conteudo/`
- `ferramentas/`, `testes/`, `legado/`
- `referencias-devtools/`
- skills e configurações de agentes
- futuro `prospecto/` de produção (Fase 6)

## Mecanismo

1. Workflow **Qualidade** valida o SHA em `main`.
2. Workflow **Publicar Pages** dispara via `workflow_run` somente se Qualidade
   concluiu com `success` em `push` de `main`, e faz checkout do
   `head_sha` validado.
3. Montagem: `npm run build:pages` →
   [`ferramentas/montar-artefato-pages.js`](../ferramentas/montar-artefato-pages.js).
4. Validação: `npm run validate:pages:policy` (repositório) e
   `npm run validate:pages:artifact` (`_site`).

Configure Pages com fonte **GitHub Actions** (Settings → Pages).

## Indexação

`robots.txt` (`Disallow: /`) e `noindex` permanecem. Não são autenticação.

## Offline

Ver ADR-003: prospecto por `file://` ou `npx serve .` na raiz do repositório;
homologação com fontes tipográficas embutidas (logo PNG ainda depende de
`assets/`).
