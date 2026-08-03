# ADR-002 — Publicação e GitHub Pages

- **Status:** Aceita (emendada)
- **Data:** 2026-07-31
- **Emenda:** 2026-07-31 — `prototipos/` volta ao artefato público
- **Emenda:** 2026-08-03 — inclui `prospecto-fase-5-v1/` e `design-system/` —
  **SUPERADA / SUSPENSA por PUB-F5-01**
- **Emenda:** 2026-08-03 — PUB-F5-01 restaura allowlist restrita + gate Qualidade
- **Relacionada:** D1 em [`docs/publicacao.md`](../publicacao.md); Rota B
  institucional; [`PUB-F5-01`](../publicacao/PUB-F5-01.md)

## Contexto

Enquanto faltarem confirmações documentais para circulação ampliada, a prévia
pública não deve expor Guia Mestre, apresentação de homologação, Design System
interno nem o protótipo canônico F5 sem autorização específica de circulação.

A emenda de 2026-08-03 que ampliou o artefato para F5 + Design System conflitava
com a decisão de Gate A (“não alterar Pages/noindex”). PUB-F5-01 reconhece essa
ampliação, suspende a prévia e restaura a allowlist restrita — sem apagar o
registro histórico da emenda.

```text
noindex ≠ autenticação
robots.txt ≠ controle de acesso
URL pública ≠ circulação controlada
```

## Decisão

1. **Hospedagem:** GitHub Pages via GitHub Actions (não deploy da raiz do branch).
2. **Fonte da allowlist:**
   [`docs/publicacao/estado-publicacao.json`](../publicacao/estado-publicacao.json)
   — única lista editável; docs humanos derivam dela.
3. **Artefato público (`_site/`):** somente paths em `rootFiles`, `rootAssets`,
   `programIndex`, `programAssets`, `surfaces` e `shims` do JSON.
4. **Fora do artefato:** paths em `forbidden[]`, incluindo
   `prospecto-fase-5-v1/`, `design-system/`, `homologacao-pastoral-v1/`,
   `fontes/`, `docs/`, `conteudo/`, `ferramentas/`, `testes/`,
   `referencias-devtools/`, futuro `prospecto/` de produção.
5. **CDN de runtime:** proibida no produto publicado (scripts/fontes/CSS de
   terceiros). Metadados Open Graph podem usar URLs absolutas do próprio site.
6. **Indexação:** `robots.txt` + `noindex` permanecem até decisão humana.
7. **Build do Pages:** regenerar `generate:discipulando`, montar com
   `build:pages`, validar com `validate:pages:policy` e
   `validate:pages:artifact`.
8. **Gate de qualidade:** o workflow Pages dispara apenas via `workflow_run`
   após **Qualidade** `success` em `push` de `main`, com checkout do
   `head_sha` validado. Sem `push` direto e sem `workflow_dispatch`.

## Consequências

- Circulação controlada depende da lista do artefato, não de autenticação.
- Clone completo do repositório continua necessário para canônico F5, lab DS,
  homologação e Guia.
- Ampliar publicação exige alterar `estado-publicacao.json` + decisão formal
  (não apenas o workflow).
