# ADR-003 — Perfis offline

- **Status:** Aceita
- **Data:** 2026-07-31

## Contexto

“Offline” e “autocontido” foram usados de forma genérica. Há necessidades
diferentes por superfície.

## Decisão — três perfis

### P1 — Prospecto (`index.html`)

- **Desejável:** abrir por duplo clique (`file://`) ou `npx serve .` na raiz.
- Caminhos relativos; fontes self-hosted em `assets/fonts/`.
- Scripts clássicos (sem `type="module"`) enquanto o perfil `file://` for
  desejável. ESM sob servidor/Pages é opção futura, não padrão atual.
- Não exige HTML monocarquivo.

### P2 — Apresentação de homologação

- **Obrigatório:** um HTML gerado, sem CDN de script/fonte.
- Fontes tipográficas embutidas (base64) no artefato.
- Logomarca PNG pode continuar por caminho relativo `../assets/...` — o deck
  **não** é portátil se separado da pasta `assets/`. Documentar com honestidade;
  “autocontido” refere-se a CSS/JS/fontes tipográficas, não ao PNG da marca.

### P3 — Hospedagem estática

- Suficiente para o público Pages: arquivos servidos sem back-end.
- Não implica PWA nem cache offline após primeira visita.

## Consequências

- Não usar “offline” para justificar monólitos desnecessários no prospecto.
- Testes da apresentação verificam ausência de CDN; não exigem inline do PNG.
