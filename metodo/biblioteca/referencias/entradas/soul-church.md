# Ficha — soul-church

| Campo                   | Conteúdo                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Origem                  | Estudo DevTools do site Soul Church (URL original documentada no estudo)                                                                                                                                     |
| Data da análise         | 2026-08-01                                                                                                                                                                                                   |
| Setor                   | Comunidade / organização religiosa / experiência editorial                                                                                                                                                   |
| Eixo                    | estrutura (escala fluida, lajes, grade assimétrica); atmosfera (neutros quentes, arco, espaço negativo); detalhe (menu por expansão, scrub, marquee)                                                         |
| O que extrair           | Motor de escala em `em` com teto; assimetria como luxo de desktop; acento único por grade; gatilho que vira painel; barra persistente de horários e contato; transição que nomeia o destino                  |
| Por que serve           | Segundo estudo DevTools do repositório; primeira referência de experiência **comunitária e acolhedora**, com padrões de conversão pastoral (oração, primeira visita) reutilizáveis em contexto ministerial   |
| O que descartar         | Ativos proprietários, hotlink, fontes comerciais, endpoints, integrações, analytics com consentimento recusado, fatiamento de texto por letra, overlays sem foco preso, ausência de `prefers-reduced-motion` |
| Evidência               | [`../../../../referencias-devtools/soul-church/`](../../../../referencias-devtools/soul-church/)                                                                                                             |
| Limites e licença       | Ver `documentacao/asset-and-license-boundaries.md` no estudo; nada proprietário no produto; reconstrução independente sob identidade fictícia                                                                |
| Evidência vs inferência | A auditoria marca cada afirmação como evidência, inferência ou hipótese; parâmetros de movimento foram lidos do runtime, curvas não inspecionáveis são declaradas como decisão própria                       |
| Tipo                    | DevTools                                                                                                                                                                                                     |

## Nota

Esta ficha **não** duplica `auditoria/`, capturas ou `design-system/`.
Navegue até a evidência pelo link acima. A pasta não entra no GitHub Pages.

Reconstrução: **Átrio** (prefixo CSS `at`), com demonstração e laboratório
executáveis. Ver o README do estudo para comandos.

Insumo negativo relevante: a referência declara **zero** regras de
`:focus-visible`, `prefers-reduced-motion`, `prefers-contrast` e
`forced-colors` em 1685 regras de estilo, e apresenta CLS de **1.64** em
campo. Os dois achados orientaram decisões concretas do sistema
reconstruído — ver `documentacao/accessibility.md` e
`documentacao/implementation-notes.md`.
