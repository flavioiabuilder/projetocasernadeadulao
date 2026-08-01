# Checklist — Preparação de projeto

Classificação por item: `MANUAL` | `AUTOMATIZADO` | `PARCIALMENTE AUTOMATIZADO` | `NÃO APLICÁVEL`.

Quando existir comando no repositório, use o comando — não uma verificação abstrata.

## Ambiente

| Item                                                | Classe                    | Como verificar                                                             |
| --------------------------------------------------- | ------------------------- | -------------------------------------------------------------------------- |
| Node.js ≥ 18                                        | MANUAL                    | `node -v`                                                                  |
| npm instalado                                       | MANUAL                    | `npm -v`                                                                   |
| Dependências instaladas                             | AUTOMATIZADO              | `npm ci`                                                                   |
| Playwright Chromium                                 | MANUAL / setup            | `npx playwright install chromium`                                          |
| Git configurado (sem alterar git config via agente) | MANUAL                    | `git status`                                                               |
| Cursor / agente com acesso ao FS                    | MANUAL                    | Abrir workspace                                                            |
| Credenciais **não** versionadas                     | PARCIALMENTE AUTOMATIZADO | `.gitignore` cobre `.env*`; `npm run validate:metodo` grepa padrões óbvios |
| MCP Chrome DevTools disponível                      | MANUAL                    | Ver `.cursor/mcp.json` / teste no IDE                                      |
| NVDA ou VoiceOver disponível (se a11y manual)       | MANUAL                    | Ferramenta do SO — não é dep npm                                           |
| Lighthouse disponível                               | MANUAL                    | Chrome DevTools — não é dep npm                                            |
| Figma (se necessário)                               | MANUAL                    | Conta humana; **não** canônico por padrão                                  |

## Contrato do método (neste repo)

| Item                                   | Classe       | Como verificar                                          |
| -------------------------------------- | ------------ | ------------------------------------------------------- |
| Camada `metodo/` íntegra               | AUTOMATIZADO | `npm run validate:metodo`                               |
| Bootstrap dos 5 templates              | AUTOMATIZADO | `npm run validate:metodo -- --bootstrap`                |
| Templates copiados para o novo projeto | MANUAL       | Checklist de cópia em `templates/projeto-web/README.md` |

## Produto piloto (Discipulando a Caserna)

| Item                         | Classe       | Como verificar                                               |
| ---------------------------- | ------------ | ------------------------------------------------------------ |
| Validação do programa        | AUTOMATIZADO | `npm run validate:discipulando`                              |
| Validação global             | AUTOMATIZADO | `npm run validate`                                           |
| Referências DevTools         | AUTOMATIZADO | `npm run validate:referencias`                               |
| Instância método do programa | MANUAL       | Ler `programas/discipulando-a-caserna/docs/metodo/README.md` |

## Pré-requisitos externos (resumo)

Ver [`../FERRAMENTAS.md`](../FERRAMENTAS.md) para status completo e fallbacks.
