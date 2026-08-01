# Soul Church

Índice da referência DevTools e da reconstrução independente **Átrio**.

## Identificação

| Campo                    | Valor                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Nome da referência       | Soul Church                                                                                              |
| URL original             | https://www.soulchurch.com/                                                                              |
| Data da auditoria        | 2026-08-01                                                                                               |
| Ferramenta principal     | Chrome DevTools MCP (`chrome-devtools-mcp`, Chrome 151)                                                  |
| Ferramentas auxiliares   | Lighthouse (via MCP), Playwright, axe-core, html-validate, Stylelint, ESLint, Prettier, Node test runner |
| Reconstrução             | **Átrio** (prefixo CSS `at`)                                                                             |
| Identidade demonstrativa | Centro Comunitário Vale do Bosque — **fictícia**                                                         |

O nome **Átrio** foi escolhido por ser independente e descritivo do sistema:
o pátio de entrada, o espaço que recebe antes de a pessoa entrar. Não guarda
relação sonora nem semântica com a referência. O nome da referência aparece
apenas na documentação de auditoria, para indicar a fonte estudada.

## Objetivo

Descobrir, registrar e reconstruir o sistema de decisões que produz a
experiência da referência — não a aparência da homepage. Foram investigados:

- escala tipográfica fluida e sua relação com toda a geometria;
- composição editorial assimétrica e uso de espaço negativo;
- lajes arredondadas empilhadas como ritmo de página;
- navegação global por expansão do próprio gatilho;
- transição de página que nomeia o destino;
- palco preso com revelação conduzida por scroll;
- marquees, carrosséis, cartões e blocos de horário;
- barra persistente de horários e caminho de contato;
- formulários, consentimento e estados de feedback;
- padrões de CMS e estados vazios;
- acessibilidade, desempenho e integrações de terceiros.

## Mapa da pasta

| Pasta                              | Conteúdo                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`auditoria/`](auditoria/)         | Relatório, 11 capturas com manifesto e medições brutas                                                                                      |
| [`documentacao/`](documentacao/)   | Princípios, foundations, componentes, motion, navegação, responsivo, linguagem editorial, CMS, formulários, acessibilidade, licença e notas |
| [`design-system/`](design-system/) | Implementação Átrio — tokens, CSS, JS, demo e laboratório                                                                                   |
| [`ferramentas/`](ferramentas/)     | Gerador de `tokens.css` e lint de HTML                                                                                                      |
| [`testes/`](testes/)               | 48 testes unitários (Node) e 19 e2e (Playwright + axe)                                                                                      |

Leitura sugerida: [`auditoria/soul-church-audit.md`](auditoria/soul-church-audit.md)
→ [`documentacao/design-principles.md`](documentacao/design-principles.md)
→ [`design-system/laboratorio.html`](design-system/laboratorio.html).

## Como executar

Os HTML dependem de caminhos relativos e funcionam melhor sob servidor
estático. Na raiz do repositório:

```bash
npx serve -l 4173 .
```

Depois abra:

- **Demonstração** — `http://localhost:4173/referencias-devtools/soul-church/design-system/demo.html`
- **Laboratório** — `http://localhost:4173/referencias-devtools/soul-church/design-system/laboratorio.html`

Abrir por `file://` também funciona (não há `fetch` nem módulo ES), mas o
Chrome trata cada arquivo como origem única e registra um aviso de console.

**A demonstração** é uma página editorial completa: hero, barra persistente,
seção editorial com moldura em arco, palco de letras conduzido por scroll,
laje escura com grade de caminhos, agenda em carrossel, bloco de horários,
marquee de valores, painel de contato com formulário local e rodapé
revelado.

**O laboratório** é o inventário vivo em 14 seções: princípios, escala
fluida com leitura em tempo real, cor, tipografia, espaço e grade, forma e
mídia, ações e estados, cartões, navegação, painel, marquee, formulários,
movimento e preferências do usuário.

## Comandos

```bash
npm run generate:tokens:soul-church      # tokens.json → tokens.css
npm run lint:referencias:soul-church:html
npm run test:referencias:soul-church     # 48 testes unitários
npm run test:referencias:soul-church:e2e # 19 testes de navegador
npm run validate:referencias:soul-church # cadeia completa desta referência
npm run validate:referencias             # Aramco + Soul Church
npm run validate                         # cadeia global do repositório
```

`generate:tokens:soul-church` lê `design-system/tokens/tokens.json` e gera
`design-system/css/tokens.css` (203 custom properties). O CSS gerado é
artefato: um teste reprova se ele estiver desatualizado em relação ao JSON.

Os testes e2e usam configuração própria
([`playwright.config.js`](playwright.config.js)) na porta **4174**,
deliberadamente separada da configuração do Discipulando a Caserna. Rodar um
não arrasta o outro. É preciso ter o Chromium do Playwright instalado:

```bash
npx playwright install chromium
```

## Relação com o Discipulando a Caserna

- O Átrio **não** é o design system do produto principal.
- Não existe import desta referência no `index.html` oficial.
- Não existe integração com as apresentações nem com o pipeline do programa.
- Os padrões podem servir de inspiração futura.
- Qualquer adoção no produto exige tarefa específica e revisão própria.

Esta pasta permanece **fora do artefato público do GitHub Pages**: o
workflow copia caminhos explícitos e não inclui `referencias-devtools/`.

## Limites de propriedade intelectual

Resumo de [`documentacao/asset-and-license-boundaries.md`](documentacao/asset-and-license-boundaries.md):

- nenhum texto, logotipo, fotografia, vídeo, ícone, Lottie, fonte, folha de
  estilo, script, bundle ou conteúdo de CMS da referência foi copiado;
- **nenhum arquivo de fonte** é distribuído — nem Typekit, nem Google Fonts;
- nenhum endpoint, identificador de integração, cookie, script de
  consentimento ou de analytics foi reproduzido;
- a reconstrução usa paleta, tipografia, geometria, conteúdo e código
  próprios;
- a identidade demonstrativa é fictícia e declarada como tal na própria
  página.

### Sem hotlink, sem runtime externo

A reconstrução **não faz requisição a domínio algum**. Verificado de duas
formas: varredura estática de todos os arquivos de runtime
([`testes/fronteiras.test.js`](testes/fronteiras.test.js)) e observação de
todas as requisições em execução ([`testes/e2e/atrio.spec.js`](testes/e2e/atrio.spec.js)).

Medido no navegador: **11 requisições, todas locais**. A única com erro é
`/favicon.ico`, pedida pelo navegador e não pela página.

Os formulários da demonstração são interceptados incondicionalmente e não
transmitem nada. Não há cookie, `localStorage`, rastreador ou integração.

## Limitações conhecidas

| Item                                        | Situação                                                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Leitor de tela real                         | **não executado** — conclusões vêm da árvore acessível e do axe                                                        |
| Conexão lenta                               | **não verificada** em nenhum dos dois lados                                                                            |
| Comportamento da referência sem JavaScript  | **não testado**                                                                                                        |
| Gravação de vídeo da transição              | indisponível — o MCP desta sessão não expõe `screencast_*`; a animação foi apurada por amostragem numérica             |
| Timelines exatas do Webflow IX2             | não inspecionáveis; estados medidos, curvas próprias declaradas                                                        |
| Envio real de formulário na referência      | não submetido, por decisão                                                                                             |
| Fotografia                                  | a atmosfera da referência depende de fotografia de pessoas; a demonstração usa gradientes e é declaradamente mais fria |
| `forced-colors`                             | implementado, não testado em execução                                                                                  |
| 5 folhas de estilo bloqueiam a renderização | ~550ms estimados; mantido por clareza arquitetural do estudo                                                           |
