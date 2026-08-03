# ADR-002 — Publicação e GitHub Pages

- **Status:** Aceita (emendada)
- **Data:** 2026-07-31
- **Emenda:** 2026-07-31 — `prototipos/` volta ao artefato público
- **Emenda:** 2026-08-03 — inclui `prospecto-fase-5-v1/` e `design-system/`
- **Relacionada:** D1 em [`docs/publicacao.md`](../publicacao.md); Rota B institucional

## Contexto

Enquanto faltarem confirmações documentais para circulação ampliada, a prévia
pública não deve expor Guia Mestre, apresentação de homologação nem docs
internos. Os protótipos públicos e o Design System (lab/tokens) permanecem
úteis na prévia com `noindex`.

## Decisão

1. **Hospedagem:** GitHub Pages via GitHub Actions (não deploy da raiz do branch).
2. **Artefato público (`_site/`):** raiz (`index.html`, `404.html`, `robots.txt`,
   `assets/`), sob o programa: `index.html`, `assets/`, `design-system/`,
   `prototipos/prospecto-fase-5-v1/`, `prospecto-v1/`, `storytelling-v1/`,
   `direcoes-visuais-v1/`, e shims legados em `/prototipos/`.
3. **Fora do artefato:** `homologacao-pastoral-v1/`, `fontes/`, `docs/`,
   `conteudo/`, `ferramentas/`, `testes/`, árvores de skills, `legado/`,
   `referencias-devtools/`, futuro `prospecto/` de produção.
4. **CDN de runtime:** proibida no produto publicado (scripts/fontes/CSS de
   terceiros). Metadados Open Graph podem usar URLs absolutas do próprio site.
5. **Indexação:** `robots.txt` + `noindex` permanecem até decisão humana.
6. **Build do Pages:** regenerar `generate:discipulando` e
   `generate:discipulando:prototipo-fase-5` antes de copiar a superfície.

## Consequências

- Circulação controlada depende da lista do artefato, não de autenticação.
- Clone completo do repositório continua necessário para homologação e Guia.
- URLs do canônico F5 e do lab do Design System passam a responder no Pages.
