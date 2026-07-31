# ADR-002 — Publicação e GitHub Pages

- **Status:** Aceita
- **Data:** 2026-07-31
- **Relacionada:** D1 em [`docs/publicacao.md`](../publicacao.md); Rota B institucional

## Contexto

Enquanto faltarem confirmações documentais para circulação ampliada, a prévia
pública não deve expor Guia Mestre, apresentação de homologação, docs internos
nem protótipos.

## Decisão

1. **Hospedagem:** GitHub Pages via GitHub Actions (não deploy da raiz do branch).
2. **Artefato público (`_site/`):** apenas `index.html`, `404.html`, `robots.txt`,
   `css/`, `js/`, `assets/`.
3. **Fora do artefato:** `apresentacao/`, `fontes/`, `docs/`, `prototipos/`,
   `conteudo/`, `ferramentas/`, `testes/`, árvores de skills, `legado/`.
4. **CDN de runtime:** proibida no produto publicado (scripts/fontes/CSS de
   terceiros). Metadados Open Graph podem usar URLs absolutas do próprio site.
5. **Indexação:** `robots.txt` + `noindex` permanecem até decisão humana.
6. **Build do Pages:** o workflow deve regenerar dados (`npm run generate`) antes
   de copiar a superfície, para reduzir drift entre JSON e `js/dados/`.

## Consequências

- Circulação controlada depende da lista do artefato, não de autenticação.
- Clone completo do repositório continua necessário para homologação e Guia.
