# Protótipos e superfícies não públicas

Mapa de retenção (revisão arquitetural 2026-07-31). Nenhuma destas pastas entra
no artefato GitHub Pages (ADR-002).

| Caminho            | Status                         | Papel                                                                                 |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------- |
| `direcao-a/`       | Legado de decisão              | Direção visual A (editorial) — referência histórica; versão de UI pode estar em 0.4.0 |
| `direcao-b/`       | Legado de decisão              | Direção B (atmosférica) — não produção                                                |
| `direcao-c/`       | Legado de decisão              | Direção C (ferramentas) — não produção                                                |
| `storytelling-v1/` | Protótipo oficial testado (D4) | Deck institucional; testes e2e/unitários específicos                                  |

Exports grandes em `docs/storytelling/*.html` e o HTML do Guia em `fontes/` são
**referência**, não UI a editar para o prospecto.

Para a superfície de produção, use `index.html` na raiz.
Para homologação pastoral restrita, use `apresentacao/homologacao-pastoral.html`.
