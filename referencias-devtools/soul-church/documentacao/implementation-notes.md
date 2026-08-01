# Notas de implementação — Átrio

Decisões de engenharia, divergências deliberadas em relação à referência e
armadilhas encontradas durante a construção.

---

## 1. Arquitetura

```text
tokens.json  →  gerar-tokens.js  →  tokens.css     (fonte única de valores)
                                    foundations.css (base, escala, preferências)
                                    components.css  (estrutura e pele)
                                    motion.css      (curvas e primitivas)

main.js        núcleo: tokens, matemática pura, foco, rolagem, ciclo de vida
motion.js      quando revelar
navigation.js  menu, painel, carrossel, transição
forms.js       validação pura + ligação com o DOM
demo.js        conteúdo fictício — não conhece nenhum motor
```

Separação seguida à risca: **tokens** no CSS, **cálculo** em funções puras,
**estado** em atributos `data-*` e `aria-*`, **renderização** em CSS,
**efeitos** em módulos que devolvem `destruir()`, **conteúdo** em `demo.js`.

Convenção de módulo: IIFE clássica com namespace `window.Atrio`, seguindo a
referência Aramco do mesmo repositório. Funciona em `file://`, dispensa
bundler e respeita o `sourceType: "script"` do ESLint do projeto.

**Toda função que registra listener, observer, timer ou animação devolve
`destruir()`.** `Atrio.iniciar()` acumula os canceladores;
`Atrio.destruir()` executa todos. É isso que permite reinicializar a demo
sem vazar.

---

## 2. Dependências adicionadas

**Nenhuma.**

Antes de qualquer instalação foi verificado o que o repositório já tem:
Playwright, axe-core, ESLint, Stylelint, Prettier, html-validate e o test
runner do Node. Todos foram suficientes.

| Biblioteca que a referência usa   | Decisão       | Justificativa                                                                                                                                                                     |
| --------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GSAP + ScrollTrigger**          | não instalada | as animações são fade + translate + scale com curvas fixas; `transition`, `@keyframes` e `IntersectionObserver` cobrem tudo. GSAP custaria ~70KB para substituir 40 linhas de CSS |
| **SplitType**                     | não instalada | fatiar por palavra é ~20 linhas — e fatiar por letra, que é o que a biblioteca faz, é justamente o defeito de acessibilidade que não queremos                                     |
| **Splide**                        | não instalada | `overflow-x: auto` + `scroll-snap` entrega arraste, roda, inércia e leitura linear **de graça**; os controles só empurram `scrollLeft`. Ver §4                                    |
| **jQuery**                        | não instalada | nada aqui precisa                                                                                                                                                                 |
| **Lottie**                        | não instalada | o ícone de menu é CSS: três traços que viram X por `transform`                                                                                                                    |
| Biblioteca de focus trap          | não instalada | ~40 linhas com `inert` nativo e fallback                                                                                                                                          |
| Biblioteca de transição de página | não instalada | interceptar clique + animar overlay + navegar                                                                                                                                     |

Custo de bundle da reconstrução: **0 bytes de terceiros**.

---

## 3. Divergências deliberadas

### D-01 — Expansão do menu por `clip-path`, não por dimensão

|                          |                                                                                                                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Referência**           | anima `width`/`height` de `10em × 4em` até `280em × 280em` (4363px)                                                                                                                                                    |
| **Átrio**                | anima `clip-path: inset(… round …)` sobre um plano do tamanho da viewport                                                                                                                                              |
| **Princípio preservado** | o gatilho vira o painel; raio grande atravessando a tela                                                                                                                                                               |
| **Risco evitado**        | performático — animar dimensão de um elemento de 4363px força layout e paint a cada quadro                                                                                                                             |
| **Diferença visível**    | o raio interpola até zero em vez de permanecer constante. Na referência o plano é grande demais para os cantos entrarem na tela; aqui o plano é do tamanho do viewport, e manter o raio deixaria cantos vazados no fim |

### D-02 — Carrossel de rolagem nativa, não de transform

|                          |                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Referência**           | Splide, com pista transformada e setas em `<div>`                                                           |
| **Átrio**                | `overflow-x: auto` + `scroll-snap`; setas em `<button>`                                                     |
| **Princípio preservado** | transbordo horizontal deliberado sinalizando “há mais”                                                      |
| **Riscos evitados**      | acessibilidade (setas focáveis, pista navegável por teclado, `aria-current` nos pontos), manutenção, bundle |
| **Diferença visível**    | a inércia é a do sistema operacional, não a da biblioteca                                                   |

### D-03 — Fatiamento por palavra, não por letra

|                          |                                                                      |
| ------------------------ | -------------------------------------------------------------------- |
| **Referência**           | SplitType por caractere                                              |
| **Átrio**                | por palavra, com texto íntegro em nó oculto                          |
| **Princípio preservado** | revelação escalonada com stagger total constante                     |
| **Risco evitado**        | acessibilidade — a referência faz o leitor de tela soletrar o título |
| **Diferença visível**    | grão do stagger ligeiramente mais grosso                             |

### D-04 — Rodapé revelado sem `z-index` negativo

|                          |                                                                               |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Referência**           | `position: sticky; bottom: 0; z-index: -2`                                    |
| **Átrio**                | mesmo `sticky`, com índices positivos dentro de contexto isolado              |
| **Princípio preservado** | o conteúdo rola por cima do rodapé                                            |
| **Risco evitado**        | técnico — `z-index` negativo é frágil e quebra dentro de `isolation: isolate` |

### D-05 — Nenhum recurso externo

|                       |                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------- |
| **Referência**        | 72 requisições, 15 hosts, analytics disparando com consentimento recusado          |
| **Átrio**             | 11 requisições, todas locais                                                       |
| **Riscos evitados**   | privacidade, jurídico (redistribuição), performance, fragilidade                   |
| **Diferença visível** | tipografia é de sistema, mídia é gradiente — ver `asset-and-license-boundaries.md` |

### D-06 — Sem loader de entrada

A referência não tem loader e o Átrio também não. Registrado para deixar
claro que a ausência é observada, não omissão.

---

## 4. Armadilhas encontradas

Todas foram bugs reais durante a construção. Estão aqui porque são
consequências não óbvias das próprias decisões do sistema.

### 4.1 `em` resolve contra o próprio elemento

Um sistema todo em `em` tem uma armadilha: dentro de um elemento com
`font-size` próprio, `1em` vale **aquele** tamanho.

| Caso                                                                     | Esperado | Obtido                     | Correção                                                                                          |
| ------------------------------------------------------------------------ | -------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| Recuo do título sangrado com `--at-esp-14` (3.75em) num título de 8.33em | ~58px    | **487px** — o título sumia | valor auto-relativo: `-0.15em`                                                                    |
| Deslocamento da letra com `--at-mov-dist-letra: 0.6em` num glifo de 12em | ~9px     | **109px**                  | token ajustado para `0.05em`, que é proporcional ao glifo — e coincide com o medido na referência |

**Regra derivada:** tokens de espaçamento só valem em elementos com o
`font-size` do corpo. Dentro de display, use valores auto-relativos e
comente.

### 4.2 `IntersectionObserver` não notifica o que nunca intersecta

Um observer de disparo único não é suficiente para revelação por scroll.
Dois furos:

1. Elementos **já acima** da viewport na inicialização nunca disparam —
   chegar por âncora ou por restauração de sessão deixava tudo invisível.
2. Rolagem em **salto** (arrastar a barra, `End`, deep link) leva um elemento
   de baixo para cima da viewport sem cruzar limiar nenhum. Sem cruzamento,
   sem notificação. **Nunca.**

Correção: guarda na inicialização + varredura no fim da rolagem que percorre
só o que falta e se desliga sozinha quando o conjunto esvazia.

### 4.3 Ordem entre conteúdo e observers

`demo.js` inicialmente se registrava como módulo, junto com os outros.
Resultado: as primitivas observavam o DOM **antes** de o conteúdo existir, e
os cartões ficavam permanentemente invisíveis.

Correção: `Atrio.demo.montar()` é função exportada, chamada explicitamente
antes de `Atrio.iniciar()`. A dependência ficou visível no HTML.

### 4.4 Cor por descendência atravessa superfícies

`.at-superficie-tinta :is(h1,…,h6) { color: inverso }` pintava de branco os
títulos dos **cartões claros aninhados** dentro da laje escura.

Correção: cor por herança. Cada superfície declara a própria; os filhos
herdam. O mesmo erro apareceu no laboratório (`.lab h3` atingindo espécimes)
e derrubou o contraste de um cartão para 3.81:1 — detectado pelo axe.

### 4.5 `overflow` no contêiner de revelação: os dois eixos brigam

Dois bugs opostos no mesmo lugar.

**Primeiro:** `overflow: clip` cortava a cedilha de “começar” — com
entrelinha 0.70 a caixa de linha é menor que os glifos. Removi o `overflow`.

**Segundo:** sem `overflow`, as palavras ainda não reveladas ficam em
`translateX(1em)`. Num título de 8.33em isso são ~61px que empurram a última
palavra para fora e criam **rolagem horizontal na página inteira** — com a
palavra invisível, o que torna o sintoma difícil de atribuir. Detectado pelo
teste e2e em 768×1024, não a olho.

Correção final: `overflow-x: clip` com `overflow-y: visible`. `hidden` não
serviria — forçaria o outro eixo a `auto`.

### 4.6 Máscara recorta a própria borda

O filete separando horários do marquee ficava invisível: estava no elemento
com `mask-image`, que recorta a borda junto com o conteúdo.

Correção: o filete foi para o bloco de horários.

### 4.7 Papel ARIA em elemento semântico

`role="group"` numa `<ul>` remove o papel de lista e deixa os `<li>` órfãos
(axe: `listitem`, 4 nós). Correção: papel no contêiner.

### 4.8 Sticky dentro do contêiner errado

O rodapé revelado precisa ser **irmão** do contêiner de conteúdo. Dentro
dele, prendia-se à viewport desde o topo da página e ficava visível o tempo
todo.

### 4.9 Canto arredondado sem nada atrás

A laje com `border-radius` inferior não mostrava curva alguma: o contêiner de
conteúdo, do mesmo tom, preenchia atrás.

Correção: a seção seguinte sobe `-1 × raio` e recupera no padding.

---

## 5. Desempenho

| Métrica     | Referência (lab) | Referência (campo) | Átrio (lab) |
| ----------- | ---------------- | ------------------ | ----------- |
| LCP         | 1353ms           | 2128ms             | **1106ms**  |
| CLS         | 0.06             | **1.64**           | **0.00**    |
| Requisições | 72               | —                  | **11**      |
| Hosts       | 15               | —                  | **1**       |

O CLS é o resultado que importa. A referência sofre 1.64 em campo por causa
do carregamento de fontes web sob tipografia de 130px: qualquer diferença de
métrica entre fallback e definitiva desloca dezenas de pixels. O Átrio marca
0.00 porque **não carrega fonte** e **toda mídia reserva proporção**.

Insight aberto: o Lighthouse estima ~550ms de ganho de FCP eliminando o
bloqueio de renderização das 5 folhas de estilo. São 5 arquivos por clareza
arquitetural — um build de produção os concatenaria. Não foi feito porque
este é um estudo, e a separação vale mais que os 550ms.

Nenhuma animação toca propriedade de layout. Laços de rAF são ligados e
desligados por `IntersectionObserver`; marquees param fora da viewport e com
a aba oculta.

---

## 6. Integração com o repositório

Tudo aditivo. Nenhum script existente mudou de significado.

| Arquivo            | Mudança                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `package.json`     | 5 scripts novos; `lint:css`, `lint:js`, `lint:html`, `format`, `format:check`, `test`, `validate:referencias` estendidos |
| `eslint.config.js` | bloco próprio para esta referência, com seus globais                                                                     |
| `.prettierignore`  | `auditoria/` e o `tokens.css` gerado                                                                                     |

`playwright.config.js` desta referência é **separado** do da raiz: `testDir`,
`baseURL` e porta (4174) próprios. Rodar um não arrasta o outro.

O workflow de publicação (`.github/workflows/pages.yml`) copia caminhos
explícitos e **não inclui `referencias-devtools/`** — nenhuma alteração foi
necessária para manter esta pasta fora do artefato público.

---

## 7. Próximos passos concretos

Derivados de limitações reais desta execução, não de lista genérica.

1. **Testar com leitor de tela real.** Nada aqui substitui NVDA ou VoiceOver;
   problemas de ordem de anúncio não aparecem no axe.
2. **Verificar sob throttling de rede.** Nem a referência nem a reconstrução
   foram medidas em conexão lenta.
3. **Decidir a estratégia de fonte antes de usar em produto.** Se o Átrio
   receber webfont, `font-display` e `size-adjust` no fallback precisam ser
   resolvidos junto — é o que separa CLS 0.00 de 1.64.
4. **Substituir os placeholders por fotografia própria** se o sistema for
   avaliado como candidato a produto: a atmosfera depende disso, e a
   demonstração atual é declaradamente mais fria que a referência.
