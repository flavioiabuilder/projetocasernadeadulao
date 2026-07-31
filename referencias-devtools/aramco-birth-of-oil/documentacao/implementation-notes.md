# Estratos — notas de implementação

## Onde as coisas estão

```
referencias-devtools/aramco-birth-of-oil/
  design-system/
    tokens/tokens.json        fonte canônica — edite aqui
    css/tokens.css            GERADO por ../ferramentas/gerar-tokens.js
    css/foundations.css       reset, tipografia, camadas, foco, preferências
    css/components.css        componentes
    js/matematica.js          camada pura (sem DOM) — testável em Node
    js/estratos.js            namespace, tokens, laço rAF único
    js/motion.js              primitivas de movimento
    js/cena.js                cena WebGL procedural + detecção de fallback
    js/experiencia.js         controlador de cenas, trilho, mapa, anúncios
    laboratorio.html          inventário vivo
    demo.html                 narrativa de 4 cenas
  ferramentas/gerar-tokens.js
  testes/estratos-progresso.test.js
```

Ordem de carregamento dos scripts é obrigatória:
`matematica → estratos → motion → cena → experiencia`.

## Como abrir

Sem instalação, sem servidor:

```bash
start referencias-devtools/aramco-birth-of-oil/design-system/laboratorio.html
```

Ou com servidor estático na raiz do repositório:

```bash
npx serve .
```

Depois: `/referencias-devtools/aramco-birth-of-oil/design-system/laboratorio.html` e `/referencias-devtools/aramco-birth-of-oil/design-system/demo.html`.

## Como regerar os tokens

```bash
npm run generate:tokens
```

Edite **apenas** `tokens/tokens.json`. `css/tokens.css` é artefato e será
sobrescrito.

## Decisões de arquitetura

### Nenhuma dependência nova

A referência usa Three.js r158, GSAP e Lenis. Nenhuma delas foi adotada.

| Biblioteca | Papel na referência          | Nossa solução                                     | Justificativa                                                                       |
| ---------- | ---------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Three.js   | cena 3D com GLB e 9 texturas | fragment shader em WebGL cru (~120 linhas)        | O projeto proíbe CDN e bundler; uma esfera com ruído não justifica 600 KB de engine |
| GSAP       | timelines                    | transições CSS com atraso escalonado por `--es-i` | O movimento observado é entrada/saída com stagger — CSS resolve                     |
| Lenis      | scroll suave nos painéis     | não reproduzido                                   | O painel editorial longo ficou fora de escopo (ver abaixo)                          |

O `package.json` não ganhou nenhuma dependência. `devDependencies` permanece
idêntico.

### Por que a matemática vive num arquivo separado

`matematica.js` não referencia `window`, `document` nem timers. Isso permite
testá-la em Node sem DOM nem navegador
(`../testes/estratos-progresso.test.js` / `npm run test:referencias:aramco`, 11 casos).

Essa separação **surgiu de uma falha real**: a primeira versão punha as funções
puras em `estratos.js`, que acessa `matchMedia` no carregamento. O teste
quebrou com `ReferenceError: window is not defined`, expondo o acoplamento. O
teste pagou por si mesmo antes de rodar verde uma única vez.

### Um só requestAnimationFrame

`Estratos.aCadaQuadro(fn)` é o único rAF do sistema. Cursor, paralaxe e cena 3D
compartilham o mesmo quadro. O laço:

- para sozinho quando não há inscritos;
- pausa em `visibilitychange`;
- limita `dt` a 100ms, para que uma aba retomada não produza salto.

### Toda primitiva devolve um cancelador

Não existe `addEventListener` sem o `removeEventListener` correspondente, nem
`IntersectionObserver` sem `disconnect()`, nem contexto WebGL sem
`WEBGL_lose_context`. `criarExperiencia()` acumula os canceladores num array e
`destruir()` executa todos.

## Bugs encontrados durante a validação

### 1. Colapso da coluna editorial

`.es-cena__conteudo` (padding de posicionamento) e `.es-coluna-editorial`
(largura 450px) aplicadas ao **mesmo** elemento: com `box-sizing: border-box`, o
padding de 46vw consumiu toda a largura e a caixa de conteúdo foi a zero. Cada
palavra virou uma linha.

Detectado porque `fatiarLinhas` reportou 3 linhas para "Antes da luz".
Corrigido separando posicionamento (pai) de medida (filho).

### 2. `composes:` em CSS puro

`composes` é sintaxe de CSS Modules. Removido; `.es-acao-contorno` agora
acompanha `.es-controle` no atributo `class`.

### 3. Nome acessível com espaço em branco cru

`fatiarLinhas` copiava o `textContent` com indentação do HTML para o elemento
`.es-sr-only`. Normalizado com `replace(/\s+/g, " ").trim()`.

### 4. Shader caro demais — `PAGE_HUNG` no Lighthouse

O achado mais sério. A primeira versão do shader avaliava fBm de **5 oitavas
duas vezes** por pixel (~10 avaliações de ruído), a 1440×900 sem redução de
resolução. Medição:

| Métrica             | Antes     | Depois  |
| ------------------- | --------- | ------- |
| Pixels renderizados | 1.296.000 | 466.560 |
| Quadro mediano      | 19.2 ms   | 16.9 ms |
| Quadro P95          | 67.5 ms   | 21.9 ms |
| Quadro máximo       | 91.7 ms   | 66.7 ms |

O Lighthouse abortava com `PAGE_HUNG` — a página deixava de responder sob a
instrumentação. Não era artefato da ferramenta: os picos de 67–91 ms são reais.

**Correção em duas frentes**, ambas parametrizadas por token:

1. `--es-amb-escala-render: 0.6` — a cena é um campo de gradiente suave;
   renderizar a 60% e deixar o navegador escalar corta 64% dos pixels sem
   diferença perceptível.
2. fBm reduzido de 5 para 3 oitavas, e a segunda passada de detalhe removida.

Depois disso o Lighthouse completa e pontua 100 em acessibilidade e boas
práticas.

**Lição:** procedural não é automaticamente barato. A referência usa texturas
assadas e lightmap justamente porque ruído em tempo real por pixel é caro — a
troca "sem ativos binários" tem um custo de GPU que precisa ser medido, não
presumido.

### 5. Seletor do cursor divergente

O controlador procurava `[data-es-cursor]`, que é o atributo dos **gatilhos**;
o elemento do cursor usa `[data-es-cursor-elemento]`.

## Como reutilizar em outra página

1. Inclua os três CSS na ordem: `tokens → foundations → components`.
2. Inclua os cinco JS na ordem indicada acima.
3. Monte a marcação mínima:

```html
<main class="es-palco" data-es-palco aria-label="…">
  <canvas class="es-tela" data-es-tela aria-hidden="true"></canvas>
  <div class="es-cena-alternativa" data-es-cena-alternativa aria-hidden="true" hidden>
    <div class="es-cena-alternativa__corpo"></div>
  </div>

  <section class="es-cena" data-es-cena data-es-titulo="…" aria-label="…">
    <div class="es-cena__conteudo">
      <div class="es-editorial es-coluna-editorial">…</div>
    </div>
  </section>

  <p class="es-sr-only" role="status" aria-live="polite" data-es-anunciador></p>
</main>
```

4. Inicialize:

```js
const experiencia = Estratos.criarExperiencia(document.querySelector("[data-es-palco]"));
window.addEventListener("pagehide", () => experiencia.destruir());
```

O controlador descobre cenas, marcadores, trilho e mapa pelos atributos `data-`.
Nenhuma configuração é passada por JS — a marcação é a configuração.

### Adaptando a identidade

Troque os valores em `tokens.json` e regere. A cena WebGL lê as mesmas cores, de
modo que a paleta muda no CSS **e** no shader de uma vez. Nenhum valor de cor
aparece hardcoded em componente ou shader.

## Relação com o restante do repositório

Este design system é **independente** do prospecto pastoral em `index.html`. Não
compartilha CSS (`css/tokens.css` do projeto usa prefixo diferente e permanece
intocado), não altera o `index.html`, e não entra no `npm run validate` do site.

Foi acrescentado ao pipeline apenas o que lhe diz respeito:

- `npm run generate:tokens` — geração dos tokens desta referência;
- `npm run lint:js` e `lint:css` — cobrem o JS/CSS desta referência;
- `npm test` / `npm run test:referencias:aramco` — incluem os testes da camada pura.

Nenhuma alteração foi feita em arquivos do prospecto.

## Próximos passos realmente necessários

| #   | Item                                                                        | Motivo                                                                                         |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | Auto-hospedar Archivo e Inter em `design-system/fontes/` (desta referência) | Hoje o sistema cai em `system-ui`; a escala funciona, a personalidade não                      |
| 2   | Painel editorial longo com scroll interno                                   | O equivalente ao `.learn-more-section` da referência; ficou fora de escopo                     |
| 3   | Medir contraste pixel a pixel sobre a cena WebGL                            | O véu mitiga, mas não foi medido sob a cena real                                               |
| 4   | Teste com leitor de tela real (NVDA / VoiceOver)                            | A árvore de acessibilidade do Chrome não substitui                                             |
| 5   | Versão em documento único do conteúdo narrativo                             | Alternativa para quem não deve navegar cena a cena                                             |
| 6   | Estado por URL (`#cena-2`)                                                  | Hoje recarregar volta ao início e o botão voltar sai da página — mesma limitação da referência |
| 7   | Teste e2e Playwright do percurso por teclado                                | O projeto já tem Playwright; o percurso não está coberto                                       |

Os itens 1 e 6 são os de maior retorno.
