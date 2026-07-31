# Estratos — sistema responsivo

## Um breakpoint, medido

A referência tem **um único breakpoint estrutural: 768px**. Isso foi medido, não
suposto — o protocolo de auditoria proíbe inventar breakpoints.

| Largura | Moldura       | Rótulo "Sound" | `--ig-header-height` |
| ------- | ------------- | -------------- | -------------------- |
| 768px   | `60px 60px 0` | visível        | 134px                |
| 767px   | `32px 30px`   | oculto         | 80px                 |

A troca é abrupta e completa entre 767 e 768. Nenhum breakpoint intermediário
existe.

## O que muda no breakpoint

| Propriedade         | ≥ 768px                   | < 768px                           |
| ------------------- | ------------------------- | --------------------------------- |
| Moldura             | 60px                      | 30px (32px no topo)               |
| Coluna editorial    | 450px                     | 300px                             |
| Display             | `min(8.4vh, 70px)`        | 45px                              |
| Corpo               | `min(2.2vh, 16px)` / 1.60 | 14px / 1.45                       |
| Altura do cabeçalho | 134px                     | 80px                              |
| Trilho              | marcadores gráficos       | rótulos textuais                  |
| Rótulo do som       | visível                   | oculto (nome acessível permanece) |

## Por que quase tudo é fluido em vez de escalonado

Com um só breakpoint, o trabalho pesado é feito pela **escala conduzida pela
altura**:

```css
font-size: min(8.4vh, 4.375rem);
```

Isso cobre todo o intervalo de alturas — de um notebook de 13" com barras
abertas a um monitor 4K — sem uma única media query. O breakpoint de 768px
existe só para o que a altura não resolve: a largura da coluna editorial e a
densidade da moldura.

**Consequência de projeto:** ao adicionar um componente, pergunte primeiro se ele
não pode responder à altura ou usar `min()`/`max()`. Só crie media query se a
mudança for estrutural (o que muda, não o quanto).

## Viewports verificados

Medidos por emulação no Chrome DevTools MCP:

| Viewport      | Uso                                   |
| ------------- | ------------------------------------- |
| 1440 × 900    | referência desktop                    |
| 1370 × 637    | janela real com chrome do navegador   |
| 1024 × 768    | tablet landscape / laptop pequeno     |
| 768 × 1024    | limite superior do breakpoint         |
| 767 × 1024    | limite inferior — isolou o breakpoint |
| 430 × 932     | telefone grande                       |
| 390 × 844 @3× | telefone padrão                       |
| 360 × 800     | telefone pequeno                      |

## Densidade de pixel

A referência **limita o DPR a 2**: em 390×844 com `devicePixelRatio: 3`, a canvas
mede 780×1688 (razão exata 2.00). Reproduzido via `--es-amb-dpr-maximo`,
consumido por `cena.js`:

```js
const dpr = Math.min(window.devicePixelRatio || 1, dprMaximo);
```

Em um telefone 3×, isso corta 55% dos pixels a sombrear sem diferença visível
numa cena de gradiente suave. É a otimização de melhor relação custo-benefício
de todo o sistema.

## Orientação e viewport curto

Landscape de telefone (altura < 520px) é o caso hostil: a escala por altura
encolhe o display corretamente, mas o texto corrido pode não caber. Tratamento:

```css
@media (max-height: 520px) {
  .es-coluna-editorial {
    max-height: 68dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
}
```

`overscroll-behavior: contain` impede que o scroll do painel escape para o
documento. O elemento também carrega `data-es-rolavel`, que faz
`conduzirPorGesto` ignorar a roda dentro dele.

## Área segura

`.es-palco` reserva `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)`,
para que o trilho não fique sob a barra de gestos do iOS.

## Unidades

- `dvh` no palco (não `vh`): a barra de endereço móvel muda a altura, e `vh`
  produziria corte.
- `vh` na tipografia: aqui a estabilidade importa mais que a exatidão — usar
  `dvh` faria o texto redimensionar continuamente durante o scroll do navegador
  móvel, o que é pior que um pequeno erro de ajuste.

Essa distinção é deliberada: **o palco acompanha o viewport dinâmico; a
tipografia acompanha o estático.**

## Redução de complexidade gráfica

| Condição                 | Comportamento                                                                    |
| ------------------------ | -------------------------------------------------------------------------------- |
| Sem WebGL                | `.es-tela` sai da árvore; `.es-cena-alternativa` (gradiente + esfera CSS) assume |
| `prefers-reduced-motion` | tempo do shader congela; paralaxe e amortecimento desligam                       |
| Aba oculta               | laço rAF pausa por completo                                                      |
| Canvas fora de vista     | `IntersectionObserver` para o laço                                               |
| Ponteiro grosso (toque)  | cursor customizado e resposta ao ponteiro não são registrados                    |
