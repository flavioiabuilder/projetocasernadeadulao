# Motion system — Átrio

Implementação em [`../design-system/css/motion.css`](../design-system/css/motion.css)
(curvas) e [`../design-system/js/motion.js`](../design-system/js/motion.js)
(quando trocar de estado).

---

## Contrato

1. Só `transform` e `opacity` são animados. Nenhuma propriedade de layout.
2. **O estado de repouso é o estado visível.** Sem JavaScript, tudo aparece.
3. `prefers-reduced-motion` neutraliza distância, escala e stagger **pelos
   tokens** — os nomes semânticos não mudam.
4. O runtime só escreve atributos e custom properties; a curva mora no CSS.
5. Toda primitiva devolve `destruir()`. Nada registra observer, timer ou
   listener sem devolver a forma de removê-lo.

O ponto 2 é a diferença mais importante em relação à referência, que hoje
depende de um script hospedado no CodeSandbox — **bloqueado por ORB em
produção** (auditoria §8.2). Ali, um script que falha esconde conteúdo. Aqui,
a classe `at-js` só é adicionada pelo runtime; enquanto ela não existe,
nenhuma primitiva oculta nada.

---

## Tokens

| Grupo     | Tokens                                                                                              | Origem                 |
| --------- | --------------------------------------------------------------------------------------------------- | ---------------------- |
| Duração   | `rapida` 260ms · `media` 420ms · `revelacao` **800ms** · `menu` **790ms** · `transicaoPagina` 620ms | 800ms e 790ms medidos  |
| Easing    | `saidaCubica` · `saidaQuart` · `padrao` · `entrada`                                                 | duas primeiras medidas |
| Stagger   | `totalPalavras` **200ms** · `item` 70ms · `bloco` 120ms                                             | 200ms medido           |
| Distância | `palavra` **1em** · `bloco` 2.5em · `letra` 0.05em                                                  | 1em e 0.05em medidos   |
| Escala    | `midiaEntrada` 1.08 · `pressionado` 0.97                                                            | decisão própria        |
| Marquee   | `velocidade` **11.9em/s** · `velocidadeLenta` 6em/s                                                 | 11.9em/s medido        |

**Curvas medidas.** `--at-ease-saida-cubica` = `cubic-bezier(0.215, 0.61,
0.355, 1)`, equivalente ao `power2.out` lido de `gsap.globalTimeline`.
`--at-ease-saida-quart` = `cubic-bezier(0.165, 0.84, 0.44, 1)`, ajustado
sobre 27 quadros amostrados da abertura do menu (auditoria §6.1).

**Curvas próprias.** `padrao` e `entrada` não correspondem a nada medido: as
timelines do Webflow IX2 não são inspecionáveis. São decisão nossa,
declarada.

---

## Primitivas

### `at-revelar` — revelação por palavras

Parâmetros **medidos** na referência: opacidade 0→1, deslocamento horizontal
de 1em, 800ms, saída cúbica, stagger total de 200ms, disparo único quando o
topo cruza a base da viewport.

O detalhe que importa é o stagger ser um **orçamento total**, não um atraso
por item:

```js
distribuirStagger(indice, quantidade, totalMs)
  = (indice / (quantidade - 1)) * totalMs
```

Um título de 3 palavras e outro de 28 terminam juntos. Coberto por teste em
[`../testes/nucleo.test.js`](../testes/nucleo.test.js).

**Fatiamento por palavra, nunca por letra.** A referência usa SplitType e
fatia por caractere, o que faz o leitor de tela soletrar o título. Aqui o
texto original permanece num nó `at-visualmente-oculto` e os spans animados
são `aria-hidden`.

Variante `--vertical` para títulos-cartaz, onde o eixo horizontal competiria
com a largura da palavra.

> **Recorte só no eixo horizontal.** Antes de revelar, cada palavra está
> deslocada 1em à direita — num título de 8.33em isso são dezenas de pixels
> que criam rolagem horizontal na página inteira, mesmo com a palavra
> invisível. `overflow-x: clip` resolve; `overflow-y` continua `visible`
> porque, com entrelinha 0.70, a caixa de linha é menor que os glifos e
> recortar em Y comeria cedilhas, acentos e descidas. `hidden` não serve:
> forçaria o outro eixo a `auto`.

### `at-subir` — revelação de bloco

Opacidade + `translateY` de 2.5em, mesma duração e curva. `data-escalonar`
no contêiner distribui `--at-bloco-atraso` de 70ms entre irmãos.

### `at-midia-revela` — revelação de mídia

Escala 1.08 → 1, em 1120ms (1.4× a duração base), saída quart. **Sem
deslocamento** — princípio 6 em
[`design-principles.md`](design-principles.md).

### `at-parallax`

Escreve `--at-parallax` (−0.5 a 0.5) conforme o elemento cruza a viewport.
Desligada em movimento reduzido **e em ponteiro grosso**: no celular o custo
de repintura não paga o efeito.

### `at-hover-sublinha` e `at-hover-eleva`

Sublinhado varrido por `scaleX` sobre pseudoelemento — não `background-size`,
que repinta a caixa inteira. Elevação de cartão só em
`(hover: hover) and (pointer: fine)`, para evitar o estado preso em telas
táteis.

### Marquee

Velocidade constante em `em/s`; a duração é derivada da largura medida.
Remedido por `ResizeObserver` quando a fonte carrega ou a largura muda.

### Palco com scrub

Faixas sobrepostas: a letra _n_ começa antes de a _n−1_ terminar. É a
sobreposição que faz a revelação ler como onda e não como bloco — confirmado
na amostragem da auditoria §7.2, onde em qualquer posição há ~4 letras em
trânsito.

Um único laço `requestAnimationFrame`, ligado e desligado por
`IntersectionObserver`. Fora da tela o laço **para**, não desacelera.

> A distância da letra (`--at-mov-dist-letra: 0.05em`) é resolvida contra o
> **próprio glifo**, não contra o corpo de texto — o que reproduz o
> comportamento medido (≈9px de offset para glifos de ≈185px). Escrever esse
> valor com um token de espaçamento produziria um deslocamento doze vezes
> maior; foi o que aconteceu na primeira implementação.

---

## Quando trocar de estado

Nada usa listener de scroll para animar. Revelação usa
`IntersectionObserver`; scrub e paralaxe usam um rAF que só roda quando há
alvo visível.

**Duas guardas de correção**, ambas descobertas em teste:

1. Elementos já acima da viewport na inicialização entram revelados, sem
   animação. Sem isso, chegar por âncora ou por restauração de sessão deixa
   todo o conteúdo anterior invisível para sempre.
2. Uma varredura no fim da rolagem cobre o salto grande — arrastar a barra,
   `End`, deep link. `IntersectionObserver` só notifica quando um **limiar é
   cruzado**; um elemento que vai de baixo da viewport para cima dela sem
   nunca intersectar não gera notificação alguma. A varredura percorre só o
   que falta e se desliga sozinha quando o conjunto esvazia.

---

## Taxonomia

| Tipo                    | Exemplo                           | Duração                   |
| ----------------------- | --------------------------------- | ------------------------- |
| Microinteração          | hover de link, `:active` de botão | 120–260ms                 |
| Transição de componente | menu, painel, acordeão            | 420–790ms                 |
| Animação editorial      | revelação de título e bloco       | 800ms                     |
| Orientada por scroll    | palco de letras, paralaxe         | contínua, atada ao scroll |
| Ambiental contínua      | marquee                           | velocidade constante      |
| Transição de página     | overlay com o nome do destino     | 620ms                     |
| Feedback de formulário  | erro e sucesso                    | imediato + anúncio        |

---

## Movimento reduzido

Os tokens já zeram distância, escala e stagger. `motion.css` desliga o que é
estrutural e não tem token equivalente: animações contínuas, o gesto de
escala da transição e a elevação de hover.

O `criarPalcoScrub` verifica a preferência **antes de instalar qualquer
observer**: com movimento reduzido as letras vão direto ao estado final e o
laço nunca existe.

Verificado por teste e2e, que também confirma que a emulação está ativa antes
de asseverar qualquer coisa.
