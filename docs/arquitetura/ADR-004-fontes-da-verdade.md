# ADR-004 — Fontes da verdade

- **Status:** Aceita
- **Data:** 2026-07-31

## Decisão

| Camada                           | Fonte canônica                                       | Não é fonte                          |
| -------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| Texto editorial do site          | `conteudo/*.md`                                      | PDF/DOCX do Guia; protótipos; Stitch |
| Dados estruturados               | `conteudo/*.json`, `assets/img/licao1/manifest.json` | `js/dados/*.js` (gerado)             |
| Metadados de destinatário/versão | `js/config.js` (manual)                              | —                                    |
| Referência pastoral              | `fontes/guia-mestre/`                                | Não editar o site a partir do PDF    |
| Visual de composição             | decisão visual + CSS vivo                            | Mockups Tailwind em `referencia/`    |

## Fluxo atual e alvo

- **JSON → JS:** `npm run generate` (obrigatório após editar JSON).
- **MD → HTML do prospecto:** historicamente embed manual em `index.html` com
  `check:paridade`. Alvo: geração editorial (`npm run generate:editorial`) em
  coexistência até go/no-go de substituição (ver ADR-005 e PoC).
- Citações `>` nos Markdown são literais — não parafrasear.
- Campos `null` no JSON: omitir na UI, sem placeholder inventado.

## Consequências

- Agentes consomem `conteudo/`, nunca inventam endossos, cargos ou resultados.
- Divergência MD↔HTML é defeito de pipeline, não licença para “melhorar” o texto.
