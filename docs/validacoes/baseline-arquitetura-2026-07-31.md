# Baseline — revisão arquitetural (T0-01)

Data: **31 de julho de 2026**.  
HEAD no registro: `830910139b36e352f23c84e4702a78249acce0b1` (`main`).  
Runtime: Node `v24.18.0`, npm `11.16.0`.

Este baseline preserva o estado das superfícies oficiais antes das mudanças de
governança, README, pipeline editorial e Pages da revisão arquitetural.

## Comandos executados

| Comando                         | Exit | Observação                                     |
| ------------------------------- | ---: | ---------------------------------------------- |
| `npm run generate`              |    0 | Regenera `js/dados/*` e fallback noscript      |
| `npm run generate:apresentacao` |    0 | `apresentacao/homologacao-pastoral.html`       |
| `npm run check:encoding`        |    0 | OK                                             |
| `npm run check:paridade`        |    0 | 4 âncoras OK                                   |
| `npm run check:guia-mestre`     |    0 | Aviso: PDF sem extrator determinístico         |
| `npm test`                      |    0 | 42 testes unitários                            |
| `npm run lint:html`             |    0 | 1 aviso `element-permitted-content` (noscript) |
| `npm run lint:css`              |    0 | OK                                             |
| `npm run lint:js`               |    0 | 8 warnings (sem erros) em `ferramentas/`       |
| `npm run format:check`          |    1 | Dívida Prettier em `docs/reference-audit/`     |
| `npm run test:e2e`              |  n/a | Não reexecutado neste snapshot (custo CI)      |

## SHA-256 das superfícies oficiais (após generate)

| Arquivo                                  | SHA-256                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| `index.html`                             | `57B56D6D44BCE7F6CBA6820582E7EB7A3F3D0C28D936C215C5AD1F235D9D0BB5` |
| `404.html`                               | `74FE15B4EDCDEB005535DCA46078B7DC7946FE244790477D3DA985AFBEC313A5` |
| `apresentacao/homologacao-pastoral.html` | `40420BC54E0B09F63BE8376EC087D76A3C85F2DEE6958D25E17E785B93B5CF07` |
| `js/dados/modulos.js`                    | `3192D3983F47D39EA57F5845BF0D4D03E367DF0FECE12C2FEDD5B7B07214350D` |
| `js/dados/matriz.js`                     | `FE5BD7F21C0B1CA8044909798F40EA92FF67BD1BE0AB65452CAB7FBCE5552176` |
| `js/dados/licao1.js`                     | `E67078B52A1215A50DEC2E2A3C8FA35CE607DF9EB5B275346B23B25B355A61EC` |

Tamanhos: `index.html` 112 689 bytes; homologação 288 110 bytes.

## Superfícies (D4)

- Oficiais: prospecto (`index.html`) e apresentação (`apresentacao/homologacao-pastoral.html`).
- Protótipo testado: `prototipos/storytelling-v1/`.
- Público Pages: ver `docs/arquitetura/ADR-002-publicacao-e-github-pages.md`.

## Nota

Este arquivo não altera o produto. Serve de referência para rollback e para a
PoC MD→HTML (`docs/validacoes/poc-editorial-movimento-i-2026-07-31.md`).
