# Navegação e transições de página — Átrio

Implementação em [`../design-system/js/navigation.js`](../design-system/js/navigation.js).

---

## 1. O gesto: o gatilho vira o painel

### O que a medição mostrou

Amostrando `getComputedStyle` quadro a quadro durante a abertura, o elemento
`.menu-content-wrapper` da referência revelou-se ser **a própria pílula do
cabeçalho**:

| Estado  | Dimensão                        | Raio  | Cor       |
| ------- | ------------------------------- | ----- | --------- |
| Fechado | `10em × 4em` (155.8 × 62.3px)   | 144px | `#f4f1ec` |
| Aberto  | `280em × 280em` (4363 × 4363px) | 144px | `#d7c8b1` |

O raio permanece constante enquanto o plano cresce 70×. Como o elemento fica
muito maior que a viewport, os cantos saem da tela — e o que se vê durante a
transição é uma **curva enorme atravessando o viewport na diagonal**.

Duas animações sobrepostas: translação diagonal `(0,0) → (8vw, −8vw)` em
~790ms com **easeOutQuart**, e a expansão dimensional, mais longa.

### Como o Átrio reproduz

`clip-path: inset(… round …)` sobre um plano que já tem o tamanho final:

```css
.at-menu {
  clip-path: inset(
    var(--at-menu-recorte-topo) var(--at-menu-recorte-dir) var(--at-menu-recorte-base)
      var(--at-menu-recorte-esq) round var(--at-menu-raio)
  );
  transition: clip-path var(--at-dur-menu) var(--at-ease-saida-quart);
}
```

| Estado    | Recorte                                       | Raio   |
| --------- | --------------------------------------------- | ------ |
| `fechado` | insets que sobram exatamente a área da pílula | 9.24em |
| `aberto`  | `0 0 0 0`                                     | 0      |

O raio **também interpola**. Na referência o painel é grande demais para os
cantos entrarem na tela; aqui o plano é do tamanho do viewport, então manter
o raio deixaria cantos vazados no estado final. Interpolar até zero devolve
exatamente a mesma leitura: curva atravessando durante a transição, plano
reto no fim.

Ganho: nenhum layout é forçado. Ver divergência D-01 em
[`implementation-notes.md`](implementation-notes.md).

---

## 2. Anatomia do menu

Grade `3fr 2fr` (razão medida: 1.514), com linha inferior reservando a altura
da barra de serviços — que **permanece visível** com o menu aberto. É uma
decisão de conteúdo, não de layout: o horário continua na tela mesmo quando a
pessoa está navegando.

Divisórias em régua de 3px. Abaixo de 992px a coluna de apoio some por
completo e os links caem para `display-md`.

---

## 3. Comportamento — o que a referência não faz

| Comportamento                  | Referência                     | Átrio                                   |
| ------------------------------ | ------------------------------ | --------------------------------------- |
| Gatilho é `<button>`           | ✗ (`<p>` + `<div>` com Lottie) | ✓                                       |
| `aria-expanded`                | ✗                              | ✓                                       |
| `aria-controls`                | ✗                              | ✓                                       |
| `role="dialog"` + `aria-modal` | ✗                              | ✓                                       |
| Foco entra no painel           | ✗ (fica em `BODY`)             | ✓                                       |
| Foco volta ao gatilho          | ✗                              | ✓                                       |
| Foco preso (Tab circula)       | ✗                              | ✓                                       |
| Fundo inerte                   | ✗                              | ✓ (`inert`, com fallback `aria-hidden`) |
| Escape fecha                   | ✓ (herdado do Webflow)         | ✓                                       |
| Rolagem bloqueada              | ✓                              | ✓ com contagem de profundidade          |
| Posição de rolagem restaurada  | não verificado                 | ✓                                       |
| Abertura anunciada             | ✗                              | ✓ (região viva)                         |

**Contagem de profundidade** no bloqueio de rolagem: se menu e painel
abrirem juntos, o primeiro a fechar não libera a rolagem do outro. Sem isso
o bug aparece só na combinação, que é onde ninguém testa.

**Fechar ao navegar:** um clique em link dentro do painel fecha o menu antes
de sair, para que o retorno pelo botão “voltar” não encontre a página com
overlay aberto.

---

## 4. Transição de página

### O que a referência faz

`.transition` contém `.transition-bg` com `scale3d(0,0,1)` em repouso e duas
linhas de texto: o nome do site e **o nome da página de destino**, gravado
por página no HTML (`is--home`, `is--plan-your-visit`, `about us`,
`connect`).

Clicar num link interno **destrói o contexto de execução** — é navegação
real, não SPA. O padrão é: interceptar o clique, escalar o plano até cobrir
a tela mostrando o destino, e então navegar.

> O princípio vale a pena: a transição não é enfeite, ela **informa para onde
> se está indo**. Numa arquitetura de informação com sete destinos, isso
> reduz a sensação de ter clicado errado.

### Como o Átrio reproduz

Mesma mecânica, com quatro guardas que a referência não tem:

1. **`prefers-reduced-motion` pula a animação** e deixa a navegação
   acontecer normalmente.
2. **Modificadores passam batido** — `Ctrl`, `Cmd`, `Shift`, `Alt`, botão do
   meio, `target` diferente de `_self`, `download`. Abrir em nova aba
   continua abrindo em nova aba.
3. **Só origem própria.** Links externos, `mailto:`, `tel:` e âncoras não são
   interceptados.
4. **A navegação acontece mesmo se a animação falhar** — o `setTimeout` de
   guarda usa o token de duração, não o evento de fim de animação.

O overlay é `aria-hidden` e `pointer-events: none`: ele nunca captura foco
nem clique.

---

## 5. Carrossel

Rolagem nativa com `scroll-snap`, sem biblioteca.

| Aspecto            | Comportamento                                            |
| ------------------ | -------------------------------------------------------- |
| Toque              | arraste nativo, com inércia do sistema                   |
| Roda / trackpad    | nativo                                                   |
| Teclado            | pista focável; `ArrowLeft` / `ArrowRight`                |
| Setas              | empurram `scrollLeft`; `disabled` nos extremos           |
| Pontos             | `aria-current="true"` no ativo                           |
| Movimento reduzido | `behavior: "auto"` em vez de `"smooth"`                  |
| Semântica          | `role="group"` no **contêiner**; a `<ul>` continua lista |

A referência usa `<div>` para as setas, com `aria-label="Go to last slide"`
no botão “anterior” — rótulo enganoso apontado pelo Lighthouse
(`aria-prohibited-attr`).

---

## 6. Histórico, âncoras e restauração

- Navegação real preserva o histórico; voltar e avançar funcionam sem código.
- Âncoras internas usam `scroll-margin-top` para compensar o cabeçalho fixo.
- Chegar por deep link ou por restauração de sessão **não** deixa conteúdo
  invisível: as duas guardas descritas em
  [`motion-system.md`](motion-system.md) cobrem o caso.
- O menu fecha antes de navegar, então o retorno nunca encontra overlay
  aberto.
