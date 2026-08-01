# Foundations — Átrio

Camada base: escala, cor, tipografia, espaço, forma e preferências.
Implementação em [`../design-system/css/foundations.css`](../design-system/css/foundations.css);
valores em [`../design-system/tokens/tokens.json`](../design-system/tokens/tokens.json).

---

## 1. O motor de escala

O único valor fluido do sistema é o `font-size` do `body`. Tudo o mais é
`em`, e portanto proporcional a ele.

```css
body {
  font-size: calc(0.7188em + 0.2509vw);
}
@media (min-width: 992px) {
  body {
    font-size: calc(0.4548em + 0.5769vw);
  }
}
@media (min-width: 1512px) {
  body {
    font-size: 1em;
  }
}
```

| Viewport | 1em vale | Regime                   |
| -------- | -------- | ------------------------ |
| 1920px   | 16.00px  | teto                     |
| 1512px   | 16.00px  | teto (ponto de encontro) |
| 1440px   | 15.16px  | principal                |
| 1024px   | 12.79px  | principal                |
| 991px    | 13.99px  | suave                    |
| 390px    | 12.48px  | suave                    |

> Os coeficientes vêm da referência, arredondados a 4 casas para satisfazer o
> lint de CSS do repositório. A diferença é de 0.0005px em 1512px —
> imperceptível. Os valores medidos com precisão total estão registrados na
> auditoria §5.1.

**Consequência prática.** Para mudar a densidade de uma página inteira,
altera-se um valor. Para quebrar o sistema, basta escrever `px` num
componente.

**Exceções legítimas ao `em`:** filete (1px), régua (3px), área mínima de
toque (44px) e a espessura do anel de foco (3px). São medidas físicas, não
proporcionais — encolher um filete junto com o texto o faria desaparecer.

---

## 2. Cor

Neutros quentes com um único acento frio. A paleta é **original**: os valores
medidos na referência estão apenas na auditoria.

### Superfícies

| Token                     | Valor     | Uso                         |
| ------------------------- | --------- | --------------------------- |
| `--at-cor-papel`          | `#faf8f5` | superfície padrão da página |
| `--at-cor-linho`          | `#f0ebe3` | seção de respiro            |
| `--at-cor-areia`          | `#e6ded2` | cartão editorial, rodapé    |
| `--at-cor-areia-profunda` | `#d5c8b4` | fundo do menu               |
| `--at-cor-tinta-suave`    | `#2b2926` | hover da ação primária      |
| `--at-cor-tinta`          | `#1b1a17` | laje escura, texto          |

### Texto

| Token                    | Valor     | Contraste sobre papel      |
| ------------------------ | --------- | -------------------------- |
| `--at-cor-texto`         | `#1b1a17` | 16.6:1                     |
| `--at-cor-texto-tenue`   | `#4a4640` | 8.9:1                      |
| `--at-cor-texto-inverso` | `#faf8f5` | — (para superfície escura) |

`--at-cor-pedra` (`#8a8378`) é reservado a **placeholder e gradiente de
mídia**, nunca a texto de leitura: sobre papel ele fica em 3.4:1.

### Acento e sinal

| Token                                | Valor                 | Regra de uso                      |
| ------------------------------------ | --------------------- | --------------------------------- |
| `--at-cor-acento`                    | `#7ba7e8`             | **um item por grade**, nunca dois |
| `--at-cor-texto-sobre-acento`        | `#12213a`             | obrigatório sobre o acento        |
| `--at-cor-sucesso` / `--at-cor-erro` | `#2f6b4f` / `#93331f` | só feedback de formulário         |

> **A cor é resolvida por herança, nunca por seletor de descendência.**
> Uma regra como `.at-superficie-tinta h3 { color: … }` atravessa qualquer
> cartão claro aninhado e apaga seus títulos. Cada superfície declara a
> própria cor; os filhos herdam. Este erro foi cometido e corrigido durante
> a implementação.

---

## 3. Tipografia

Quatro vozes com papéis fixos, espelhando os quatro papéis medidos na
referência.

| Papel       | Token                       | Onde aparece                    |
| ----------- | --------------------------- | ------------------------------- |
| **Display** | `--at-tipo-familia-display` | títulos, rótulos, botões        |
| **Cartaz**  | `--at-tipo-familia-cartaz`  | marquee, letras do palco, marca |
| **Corpo**   | `--at-tipo-familia-corpo`   | texto corrido, links de rodapé  |
| **Mono**    | `--at-tipo-familia-mono`    | apenas aviso legal e metadados  |

Nenhuma fonte é distribuída nem carregada de rede. As pilhas nomeiam
famílias open source plausíveis e caem em fontes de sistema. Ver
[`asset-and-license-boundaries.md`](asset-and-license-boundaries.md).

### Escala

| Classe           | Tamanho | Entrelinha | ≤767px |
| ---------------- | ------- | ---------- | ------ |
| `.at-display-xl` | 8.33em  | **0.70**   | 4em    |
| `.at-display-lg` | 4.5em   | 1.00       | 2.7em  |
| `.at-display-md` | 2.25em  | 1.22       | —      |
| `.at-display-sm` | 1.88em  | 1.22       | —      |
| `.at-display-xs` | 1.46em  | 1.22       | —      |
| `.at-cartaz-xl`  | 12em    | 0.85       | 6.25em |
| `.at-cartaz-lg`  | 7.88em  | 0.85       | 4.4em  |
| `.at-corpo-lg`   | 1.5em   | 1.52       | 1.25em |
| `.at-corpo`      | 1em     | 1.52       | —      |
| `.at-rotulo`     | 1.19em  | 1.20       | —      |
| `.at-micro`      | 0.8em   | 1.52       | —      |

Duas propriedades da escala importam mais que os números:

1. **O salto está no topo.** `xl → lg` é 1.85×; `md → sm` é 1.20×. O
   contraste dramático mora entre os dois primeiros degraus; abaixo disso a
   progressão é calma.
2. **A entrelinha é inversa ao tamanho.** 0.70 no display, 1.52 no corpo.
   Título compacto, texto respirado.

Medida máxima de leitura: **62ch** (`.at-medida-texto`). Coluna editorial:
**30em** (`.at-medida`).

---

## 4. Espaço

Escala em `em`, portanto fluida. Os degraus largos (20, 24, 32, 40) são o que
produz o silêncio entre seções — não são “espaço sobrando”.

| Token                         | Valor        | Uso típico                            |
| ----------------------------- | ------------ | ------------------------------------- |
| `--at-esp-2` … `--at-esp-6`   | 0.5–1.5em    | dentro de componentes                 |
| `--at-esp-8`                  | 2em          | gutter, moldura de contêiner          |
| `--at-esp-12` / `--at-esp-14` | 3em / 3.75em | entre blocos                          |
| `--at-esp-20`                 | 6em          | vão editorial deliberado              |
| `--at-esp-24`                 | 7.75em       | padding de seção                      |
| `--at-esp-32` / `--at-esp-40` | 10em / 12em  | marquee, seções amplas                |
| `--at-esp-moldura-lateral`    | 7.81em       | margem esquerda assimétrica (desktop) |

---

## 5. Contêineres e grades

| Classe                          | Comportamento                                                  |
| ------------------------------- | -------------------------------------------------------------- |
| `.at-container`                 | 105.8em, centrado, padding lateral 2em                         |
| `.at-container-editorial`       | moldura assimétrica (`4.375em 3.25em 3.75em 7.81em`) até 991px |
| `.at-grade-editorial`           | `30em 36.19em` acima de 992px; coluna única abaixo             |
| `.at-grade-cartoes`             | `repeat(auto-fill, minmax(21em, 1fr))`                         |
| `.at-pilha` / `.at-pilha-larga` | coluna com gap de 1.5em / 3em                                  |

---

## 6. Forma e mídia

| Token              | Valor  | Uso                                        |
| ------------------ | ------ | ------------------------------------------ |
| `--at-raio-sutil`  | 1em    | barra flutuante, campo                     |
| `--at-raio-cartao` | 1.88em | cartões, painéis                           |
| `--at-raio-laje`   | 3.75em | seções                                     |
| `--at-raio-arco`   | 25em   | canto superior esquerdo da mídia editorial |
| `--at-raio-pilula` | 999em  | todos os botões                            |

**Toda mídia reserva proporção antes de carregar** (`aspect-ratio` em
`.at-midia`). Não é refinamento: a referência marca **CLS 1.64** em campo, e
reservar caixa é metade da correção. A outra metade é a estratégia de fonte
(§3).

O **arco** — `border-radius: 25em 0 3.75em 0` — é a assinatura formal do
sistema. Num quadro de 36em, o raio de 25em consome dois terços do lado: a
imagem lê como abóbada, não como retângulo arredondado. No celular ganha um
quarto valor.

---

## 7. Controles

Um só formato: **pílula**. O que distingue as ações é a superfície.

| Classe                  | Superfície                         | Papel                                          |
| ----------------------- | ---------------------------------- | ---------------------------------------------- |
| `.at-botao--primario`   | tinta sólida                       | ação principal da seção                        |
| `.at-botao--secundario` | areia                              | ação de apoio                                  |
| `.at-botao--fantasma`   | transparente, borda `currentcolor` | ação discreta, funciona em qualquer superfície |
| `.at-botao-circulo`     | transparente, circular             | setas e atalhos persistentes                   |

Todos com `min-height: 44px`. O estado `:active` aplica `scale(0.97)`.

---

## 8. Foco

A referência declara **zero** regras `:focus-visible` em 1685. Aqui o anel é
explícito:

```css
:focus-visible {
  outline: 3px solid var(--at-cor-tinta);
  outline-offset: 3px;
  border-radius: var(--at-raio-sutil);
}
```

Sobre superfície escura o anel inverte para `--at-cor-papel`. Há também um
link de salto (`.at-pular`), primeiro elemento tabulável do documento — que a
referência não possui em nenhuma página inspecionada.

---

## 9. Preferências do usuário

Três consultas que a referência ignora por completo:

| Consulta                         | Comportamento                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `prefers-reduced-motion: reduce` | tokens de duração, distância, escala e stagger vão a zero; marquees param e passam a rolar por gesto; a transição de página é ignorada |
| `forced-colors: active`          | botões, cartões, painéis e molduras de mídia ganham `1px solid currentcolor`; o anel de foco vira `CanvasText`                         |
| `prefers-contrast: more`         | `--at-cor-texto-tenue` colapsa em `--at-cor-tinta`; filetes tênues viram sólidos                                                       |

A substituição de movimento é feita **pelos tokens**, não por regras
espalhadas: os nomes semânticos não mudam, só os valores. Isso é verificado
por teste (`../testes/tokens.test.js`), que reprova qualquer token de
duração ou distância sem substituição declarada.
