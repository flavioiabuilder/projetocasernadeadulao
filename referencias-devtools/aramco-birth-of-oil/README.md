# Aramco — The Birth of Oil

Índice da referência DevTools e da reconstrução independente **Estratos**.

## Identificação

| Campo             | Valor                                                           |
| ----------------- | --------------------------------------------------------------- |
| Nome              | Aramco — The Birth of Oil                                       |
| URL original      | https://www.aramco.com/en/about-us/our-history/the-birth-of-oil |
| Data da auditoria | 2026-07-31                                                      |
| Ferramenta        | Chrome DevTools (MCP / inspeção de runtime)                     |
| Reconstrução      | Estratos                                                        |

## Objetivo

A referência foi estudada para compreender:

- progressão discreta de cenas;
- composição em viewport fixo;
- motion hierárquico;
- revelações por profundidade;
- tipografia escalada pela altura;
- relação entre conteúdo DOM e cena WebGL;
- trilhos de progresso;
- gestos e navegação;
- desempenho;
- acessibilidade.

## Mapa da pasta

| Pasta                              | Conteúdo                                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`auditoria/`](auditoria/)         | Relatório de auditoria, capturas e medições brutas                                                              |
| [`documentacao/`](documentacao/)   | Princípios, foundations, componentes, motion, responsivo, a11y, 3D, limites de licença e notas de implementação |
| [`design-system/`](design-system/) | Implementação Estratos (tokens, CSS, JS, demo e laboratório)                                                    |
| [`ferramentas/`](ferramentas/)     | Gerador de `tokens.css` a partir de `tokens.json`                                                               |
| [`testes/`](testes/)               | Teste unitário da matemática de progresso                                                                       |

## Como executar

Os HTML podem ser abertos por `file://` (duplo clique). Com servidor estático na
raiz do repositório o caminho fica mais estável:

```bash
npx serve .
```

Depois abra:

- `/referencias-devtools/aramco-birth-of-oil/design-system/demo.html`
- `/referencias-devtools/aramco-birth-of-oil/design-system/laboratorio.html`

Comandos:

```bash
npm run generate:tokens
npm run test:referencias:aramco
npm run validate
```

`generate:tokens` lê `design-system/tokens/tokens.json` e gera
`design-system/css/tokens.css` (caminhos relativos a esta referência).

## Relação com o Discipulando a Caserna

- O Estratos **não** é atualmente o design system do produto principal.
- Não existe import desta referência no `index.html` oficial.
- Não existe integração automática com as apresentações.
- Os padrões podem ser usados futuramente como inspiração.
- Qualquer adoção no produto exige tarefa específica e revisão própria.

Esta pasta permanece fora do artefato público do GitHub Pages.

## Limites de propriedade intelectual

Resumo de [`documentacao/asset-and-license-boundaries.md`](documentacao/asset-and-license-boundaries.md):

- nenhum ativo proprietário da Aramco é distribuído;
- fontes corporativas não foram copiadas;
- modelos e texturas não foram incorporados;
- áudio não foi incorporado;
- textos institucionais não foram copiados;
- a reconstrução utiliza código, shaders, geometria, paleta e conteúdo próprios.
