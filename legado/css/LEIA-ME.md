# CSS legado (não carregar no prospecto)

Arquivos movidos de `css/` em 28/07/2026 após auditoria de consistência visual.

| Arquivo | Motivo |
|---|---|
| `prospecto.css` | Não estava linkado em `index.html`; padrões conflitantes (sombra, radius) |
| `atos.css` | Não estava linkado; vestígio de protótipo de atos |

## Stack canônica (viva)

```
css/tokens.css
css/base.css
css/layout.css
css/nav.css
css/editorial.css
css/escudo.css
css/curricular.css
css/secoes.css
```

Não reintroduzir estes arquivos no `<head>` sem revisão explícita da Direção A.
Não reintroduzir o monólito `componentes.css`.
