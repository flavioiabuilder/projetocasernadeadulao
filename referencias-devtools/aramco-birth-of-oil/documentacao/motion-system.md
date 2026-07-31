# Estratos — sistema de movimento

> **Aviso de proveniência.** As _distâncias_ e a _hierarquia_ de deslocamento
> são medidas na referência. As _durações_ e _curvas_ são decisão nossa: as
> timelines da referência rodam em GSAP empacotado e não são inspecionáveis.
> Não há aqui nenhum número apresentado como medido que não o seja.

---

## O padrão central: revelação com paralaxe hierárquica

Medido na referência:

| Elemento           | Deslocamento inicial |
| ------------------ | -------------------- |
| Contêiner do slide | 2740px               |
| `h2`               | 300px                |
| Linha do título    | 150px                |
| Linha do parágrafo | 50px                 |

Quanto mais ao fundo na hierarquia editorial, **menor** o deslocamento. Objetos
distantes movem-se menos; aplicar isso ao texto dá profundidade à revelação sem
sombra nem blur.

Tokens resultantes:

```
--es-mov-dist-curta:  50px   /* linhas de corpo */
--es-mov-dist-media:  150px  /* linhas de título */
--es-mov-dist-longa:  300px  /* blocos e contêineres */
--es-mov-dist-saida: -40px   /* recuo na saída */
```

Todo o movimento é `transform` + `opacity`. Nenhuma propriedade de layout é
animada, em lugar nenhum do sistema.

## Tokens de tempo

| Token                  | Valor  | Uso                             |
| ---------------------- | ------ | ------------------------------- |
| `--es-dur-instantanea` | 120ms  | resposta tátil de controle      |
| `--es-dur-rapida`      | 260ms  | hover, foco, estado de controle |
| `--es-dur-media`       | 520ms  | saída de cena, abertura do mapa |
| `--es-dur-lenta`       | 900ms  | revelação de linha              |
| `--es-dur-cena`        | 1400ms | entrada completa de cena        |
| `--es-dur-capitulo`    | 2000ms | transição entre capítulos       |

| Token               | Curva                            | Uso                            |
| ------------------- | -------------------------------- | ------------------------------ |
| `--es-ease-padrao`  | `cubic-bezier(0.22, 1, 0.36, 1)` | geral                          |
| `--es-ease-entrada` | `cubic-bezier(0.16, 1, 0.3, 1)`  | entradas (desaceleração longa) |
| `--es-ease-saida`   | `cubic-bezier(0.55, 0, 0.45, 1)` | saídas                         |
| `--es-ease-suave`   | `cubic-bezier(0.4, 0, 0.2, 1)`   | ambiente, pulsos               |

Nenhuma curva com _bounce_ ou elástico: a linguagem é mineral, e overshoot
contradiz peso.

## Escalonamento

| Token                | Valor | Uso                            |
| -------------------- | ----- | ------------------------------ |
| `--es-stagger-linha` | 90ms  | entre linhas de um mesmo bloco |
| `--es-stagger-item`  | 60ms  | entre itens de lista           |
| `--es-stagger-bloco` | 140ms | entre blocos editoriais        |

O índice é publicado como `--es-i` no elemento; o CSS calcula
`transition-delay: calc(var(--es-i) * var(--es-stagger-linha))`. O JS não
agenda atrasos — só numera.

## Catálogo de primitivas

Todas em `design-system/js/motion.js`. **Toda primitiva devolve um cancelador.**

| Primitiva                            | Assinatura     | Responsabilidade                                   |
| ------------------------------------ | -------------- | -------------------------------------------------- |
| `fatiarLinhas(el)`                   | → `() => void` | fatia texto em linhas preservando o nome acessível |
| `revelar(el)` / `ocultar(el)`        | → `void`       | alterna `.is-revelado`                             |
| `observarRevelacao(raiz)`            | → `() => void` | revela ao entrar em vista                          |
| `escalonar(elementos, inicio)`       | → `void`       | publica `--es-i`                                   |
| `criarProgresso(total)`              | → objeto       | estado discreto **puro**, sem DOM                  |
| `criarParalaxe(camadas)`             | → objeto       | desloca por `data-es-profundidade`                 |
| `responderAoPonteiro(area, camadas)` | → `() => void` | inclinação amortecida                              |
| `seguirPonteiro(cursor, area)`       | → `() => void` | cursor customizado                                 |
| `conduzirPorGesto(area, acoes)`      | → `() => void` | roda/toque/teclado → avanço discreto               |

### Separação de responsabilidades

```
tokens        → tokens.css (gerado do JSON)
progresso     → funções puras em estratos.js (limitar/normalizar/interpolar/aproximar)
estado        → atributos e classes no DOM
renderização  → transform e opacity apenas
efeitos       → motion.js, cada um com cancelador
conteúdo      → HTML; nenhuma primitiva escreve texto
```

`criarProgresso` é deliberadamente puro e testado em
`../testes/estratos-progresso.test.js` — a matemática de percurso não
deve depender de DOM para ser verificável.

## Laço único

`Estratos.aCadaQuadro(fn)` registra no **único** `requestAnimationFrame` do
sistema. Nada agenda rAF por conta própria. O laço:

- para sozinho quando não há inscritos;
- pausa em `visibilitychange` (aba oculta não gasta GPU);
- entrega `dt` limitado a 100ms, para que uma aba retomada não produza um salto.

`Estratos.aproximar(atual, alvo, suavidade, dt)` é amortecimento independente de
framerate — a mesma sensação a 60Hz e a 144Hz.

## Movimento reduzido

Substituição em **três camadas**:

1. **Token** — `tokens.css` reescreve durações para 1ms e distâncias para 0 sob
   `prefers-reduced-motion: reduce`. Componentes herdam sem saber.
2. **Foundations** — regra de segurança que zera qualquer animação residual.
3. **JS** — `responderAoPonteiro` e a paralaxe retornam no-op; a cena WebGL
   congela o tempo (`uTempo` deixa de avançar) mas continua desenhando, de modo
   que a imagem permanece, sem movimento.

A preferência é observada em runtime (`Estratos.observarMovimento`): se o usuário
mudar a configuração do sistema com a página aberta, o cache de tokens é
invalidado.

## Condução por gesto

| Entrada                     | Limiar          | Resultado             |
| --------------------------- | --------------- | --------------------- |
| Roda                        | 40px acumulados | avança/recua uma cena |
| Arraste horizontal          | 60px            | idem                  |
| `→` `↓` `PageDown` `Espaço` | —               | avança                |
| `←` `↑` `PageUp`            | —               | recua                 |
| `Escape`                    | —               | fecha o mapa          |

Intervalo mínimo entre disparos: 520ms, para que um gesto contínuo não atravesse
a narrativa inteira.

**Diferença deliberada:** elementos com `data-es-rolavel` mantêm o scroll nativo.
Sequestrar a roda dentro de um painel de texto longo seria uma armadilha.

## Taxonomia

| Categoria               | Exemplo                                 | Token de duração              |
| ----------------------- | --------------------------------------- | ----------------------------- |
| Microinteração          | hover de controle, anel do cursor       | `rapida`                      |
| Transição de componente | abertura do mapa                        | `media`                       |
| Transição de cena       | saída editorial + entrada da próxima    | `cena`                        |
| Animação ambiental      | onda do som, pulso do prompt, flutuação | ciclos longos                 |
| Movimento de câmera     | deriva do corpo 3D por progresso        | interpolado, sem duração fixa |
| Resposta a ponteiro     | inclinação de camadas                   | amortecida, sem duração       |

## O que não foi reproduzido

- **Scrub contínuo por scroll** — a referência não usa (progressão é discreta).
- **Pinning** — desnecessário: o palco já é fixo.
- **Snap** — idem; não há scroll para ancorar.
- **Timeline sincronizada com áudio** — a referência tem voiceover por parágrafo;
  a reconstrução não carrega mídia.
