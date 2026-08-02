# Prospecto Fase 5 — candidato v1

Candidato **isolado** da Fase 5 (Fluxo A). **Não** é protótipo canônico.
**Não** substitui `prospecto-v1/`. **Não** está no GitHub Pages por padrão.

| Campo | Valor |
| --- | --- |
| Status | CANDIDATO |
| Canônico | NÃO |
| Fase 6 | BLOQUEADA |
| Tokens | `../../design-system/tokens/tokens.css` |
| Conteúdo | `conteudo/` via `npm run generate:discipulando:prototipo-fase-5` |
| Decisão | [`../../docs/metodo/fase-5/decisao-do-prototipo-canonico.md`](../../docs/metodo/fase-5/decisao-do-prototipo-canonico.md) |

## Estrutura

- `index.html` — **artefato gerado por completo** (contrato: não editar à mão)
- `css/prototipo.css` — estilos do candidato (não importa `lab.css`)
- `js/config.js` — gerado de `ferramentas/institucional.js`
- `js/prototipo.js` — progressive enhancement (`html.js`; sumário `<details>`)
- `parcial/` — **gerado**; não editar à mão
- `capturas/` — evidências próprias da Fase 5

## Comandos

```bash
npm run generate:discipulando:prototipo-fase-5
npm run check:discipulando:prototipo-fase-5:stale
npm run validate:discipulando:prototipagem
npm run test:discipulando:prototipo-fase-5
npm run test:discipulando:prototipo-fase-5:e2e
npm run capture:discipulando:prototipo-fase-5
```

## Proibições

Não promover por nome de pasta. Não migrar runtime legado. Não inventar copy.
Não expor PDF/folheador sem decisão humana (F6-05 / F6-06).
