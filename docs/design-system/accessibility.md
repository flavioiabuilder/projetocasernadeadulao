# Estratos — acessibilidade

O briefing determina: _"O design system reconstruído deve preservar a força
visual da referência sem reproduzir eventuais falhas de acessibilidade
existentes nela."_ A referência tem nove falhas documentadas. Este documento
mostra o tratamento de cada uma.

---

## Os nove defeitos e seus tratamentos

### 1. Split de texto que destrói o nome acessível — **corrigido**

Na referência, os itens do mapa têm
`aria-label="I T h e b i r t h o f o i l …"` — letra a letra, porque o rótulo
foi montado concatenando os spans da animação. O leitor de tela soletra.

**Tratamento.** `fatiarLinhas()` preserva o texto íntegro num filho
`.es-sr-only` e marca **todas** as fatias visuais com `aria-hidden="true"`:

```html
<h2 class="es-display">
  <span class="es-sr-only">Antes da luz</span>
  <span class="es-linha" aria-hidden="true">
    <span class="es-linha__interior">Antes da luz</span>
  </span>
</h2>
```

**Verificado** — árvore de acessibilidade da demo:
`heading "Antes da luz" level="2"`, uma única vez, sem soletração.

### 2. Todos os itens anunciam "You are here" — **corrigido**

`aria-current="true"` é aplicado a **um** item e removido de todos os outros a
cada troca de cena (`experiencia.js`, função `renderizar`).

### 3. Zero `prefers-reduced-motion` — **corrigido**

Substituição em três camadas (token, foundations, JS). Ver
[`motion-system.md`](motion-system.md#movimento-reduzido).

### 4. Zero `prefers-contrast` — **corrigido**

`prefers-contrast: more` eleva filetes de 20%/42% para 55%/85%, substitui o
gradiente de fundo por cor sólida e escurece o véu. Há também suporte a
`forced-colors: active`.

### 5. `<canvas>` opaca sem alternativa — **corrigido**

Duas medidas: a canvas é `aria-hidden="true"` **porque é decorativa por projeto**
(nenhuma informação existe só nela), e há fallback visual real quando não há
WebGL. Ver [`three-dimensional-language.md`](three-dimensional-language.md#fallback).

### 6. Nenhuma live region — **corrigido**

A troca de cena é anunciada:

```html
<p class="es-sr-only" role="status" aria-live="polite" data-es-anunciador></p>
```

O anúncio traz posição e título: _"Cena 2 de 4: Primeiro traço"_. Só dispara em
navegação iniciada pelo usuário — a renderização inicial passa `anunciar: false`
para não falar sozinha no carregamento.

### 7. Botão de menu com `aria-label="button"` — **corrigido**

Todos os controles têm nome descritivo. O botão do índice declara ainda
`aria-expanded` e `aria-controls`.

### 8. Sete botões "Learn more" indistinguíveis — **corrigido**

`aria-label` específico é obrigatório sempre que o texto visível se repete:
`aria-label="Ler nota sobre o segundo tempo"`.

### 9. Narrativa fora da árvore de acessibilidade — **parcialmente tratado**

Cenas inativas usam o atributo `hidden`, então saem da árvore e da ordem de
foco — o mesmo efeito da referência. A diferença é que a cena **ativa** está
plenamente exposta, com `role="region"` e rótulo próprio, e a live region
informa a mudança.

**Limitação assumida:** um usuário de leitor de tela ainda percorre a narrativa
sequencialmente, cena a cena; não há visão geral de todo o texto num só lugar.
Para conteúdo editorial extenso, o padrão correto é oferecer uma versão em
documento único. Registrado como próximo passo em
[`implementation-notes.md`](implementation-notes.md).

---

## Estrutura semântica

| Elemento                         | Papel                                                         |
| -------------------------------- | ------------------------------------------------------------- |
| `<main class="es-palco">`        | landmark principal, com `aria-roledescription` e `aria-label` |
| `<section data-es-cena>`         | `region` com rótulo — cada cena é navegável como marco        |
| `<h2>` por cena                  | hierarquia de títulos contínua                                |
| `<nav class="es-trilho">`        | landmark de navegação rotulado                                |
| `<div role="dialog" aria-modal>` | mapa de cenas                                                 |
| `<p role="status" aria-live>`    | anúncio de mudança                                            |

Link "Pular para o conteúdo" como primeiro elemento focável.

## Teclado

| Tecla                       | Ação                               |
| --------------------------- | ---------------------------------- |
| `→` `↓` `PageDown` `Espaço` | próxima cena                       |
| `←` `↑` `PageUp`            | cena anterior                      |
| `Tab`                       | percorre controles na ordem visual |
| `Escape`                    | fecha o mapa                       |
| `Enter` / `Espaço`          | aciona o controle focado           |

O palco recebe `tabindex="0"` para ser alvo de teclado. **O teclado não é
retrofit:** as ações de navegação são as mesmas funções que roda e toque
chamam, não um caminho paralelo.

### Gestão de foco no mapa

Ao abrir: guarda `document.activeElement`, move o foco ao primeiro item.
Ao fechar: devolve o foco ao elemento guardado. `Escape` fecha.

## Foco visível

`:focus-visible` com anel de 2px em `--es-cor-foco` e `outline-offset: 3px`.
Nunca `outline: none` sem substituto — não há uma única ocorrência no sistema.

## Alvos de toque

`--es-tam-alvo-minimo: 44px`, aplicado a `.es-controle`, `.es-som`,
`.es-menu-botao`, `.es-trilho__extremo` e `.es-mapa__item`.

## Contraste

Texto sobre o campo atmosférico:

| Combinação                                                    | Razão   | Critério |
| ------------------------------------------------------------- | ------- | -------- |
| `--es-cor-texto` (#f2f7f4) sobre `--es-cor-mineral` (#24333c) | ~11.6:1 | AAA      |
| `--es-cor-texto-corpo` (#ffffff) sobre `--es-cor-mineral`     | ~12.6:1 | AAA      |
| `--es-cor-texto-inverso` (#24333c) sobre branco               | ~11.6:1 | AAA      |
| `--es-cor-texto-tenue` (#a9bcc0) sobre `--es-cor-mineral`     | ~6.2:1  | AA       |

O risco real está sobre a **cena WebGL**, cuja luminância varia por pixel. Duas
mitigações: o véu (`--es-grad-painel`) escurece o lado do texto, e a vinheta
reduz a luminância das bordas. Medição sob a cena real no ciclo 3 de validação
— ver [`implementation-notes.md`](implementation-notes.md).

## Experiência sem hover

Cursor customizado e resposta ao ponteiro só são registrados sob
`(hover: hover) and (pointer: fine)`. Em toque, nenhum ouvinte é criado — não é
só CSS escondendo, é ausência de código ativo.

## Zoom

A tipografia usa `rem` nos tetos (`min(8.4vh, 4.375rem)`), então respeita o
tamanho de fonte do navegador. `text-size-adjust: 100%` impede o ajuste
automático do iOS.

## O que ainda não foi verificado

| Item                                              | Situação                                                    |
| ------------------------------------------------- | ----------------------------------------------------------- |
| Leitura por leitor de tela real (NVDA/VO)         | **não testado** — apenas árvore de acessibilidade do Chrome |
| Contraste medido pixel a pixel sobre a cena WebGL | **não medido** — ver ciclo 3                                |
| Zoom a 400%                                       | **não testado**                                             |
| Navegação por voz                                 | **não testado**                                             |

Declarados por honestidade: a auditoria automática não substitui teste com
usuário de tecnologia assistiva.
