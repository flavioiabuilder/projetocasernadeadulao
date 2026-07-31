# ADR-002 — Publicação e GitHub Pages

- **Status:** Aceita (emendada)
- **Data:** 2026-07-31
- **Emenda:** 2026-07-31 — `prototipos/` volta ao artefato público
- **Relacionada:** D1 em [`docs/publicacao.md`](../publicacao.md); Rota B institucional

## Contexto

Enquanto faltarem confirmações documentais para circulação ampliada, a prévia
pública não deve expor Guia Mestre, apresentação de homologação nem docs
internos. Os protótipos em `prototipos/` (em especial `storytelling-v1`)
permanecem úteis na prévia pública e voltam a ser publicados.

## Decisão

1. **Hospedagem:** GitHub Pages via GitHub Actions (não deploy da raiz do branch).
2. **Artefato público (`_site/`):** `index.html`, `404.html`, `robots.txt`,
   `css/`, `js/`, `assets/`, `prototipos/`.
3. **Fora do artefato:** `apresentacao/`, `fontes/`, `docs/`,
   `conteudo/`, `ferramentas/`, `testes/`, árvores de skills, `legado/`.
4. **CDN de runtime:** proibida no produto publicado (scripts/fontes/CSS de
   terceiros). Metadados Open Graph podem usar URLs absolutas do próprio site.
5. **Indexação:** `robots.txt` + `noindex` permanecem até decisão humana.
6. **Build do Pages:** o workflow deve regenerar dados (`npm run generate`) antes
   de copiar a superfície, para reduzir drift entre JSON e `js/dados/`.

## Consequências

- Circulação controlada depende da lista do artefato, não de autenticação.
- Clone completo do repositório continua necessário para homologação e Guia.
- URLs como `/prototipos/storytelling-v1/` passam a responder no Pages.
