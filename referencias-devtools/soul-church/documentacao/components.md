# Componentes — Átrio

Só entrou como componente o que a investigação encontrou **repetido em mais
de uma página ou em mais de um contexto**. Blocos que apareceram uma única
vez ficaram como composição na demo.

A hipótese inicial de nomes (`SiteShell`, `GlobalHeader`, `MegaMenu`,
`EventCard`, …) foi ajustada ao que o sistema realmente tem: alguns
componentes previstos não existem, e um previsto como dois é um só.

Implementação em [`../design-system/css/components.css`](../design-system/css/components.css).
Espécimes vivos em [`../design-system/laboratorio.html`](../design-system/laboratorio.html).

---

## Inventário

| Componente        | Classe                              | Confirmado por             |
| ----------------- | ----------------------------------- | -------------------------- |
| Casca             | `.at-casca` / `.at-casca__conteudo` | presente nas 5 páginas     |
| Cabeçalho         | `.at-cabecalho`                     | idem                       |
| Marca             | `.at-marca`                         | idem                       |
| Gatilho do menu   | `.at-menu-gatilho`                  | idem                       |
| Menu global       | `.at-menu`                          | idem                       |
| Barra de serviços | `.at-barra-servicos`                | 4 de 5 páginas             |
| Marquee           | `.at-marquee`                       | 3 contextos distintos      |
| Hero              | `.at-hero`                          | 4 de 5 páginas             |
| Carrossel         | `.at-carrossel`                     | 2 contextos                |
| Cartão            | `.at-cartao`                        | homepage + about           |
| Cartão de evento  | `.at-evento`                        | `/events` (9×) + homepage  |
| Bloco de horários | `.at-horarios`                      | homepage + plan-your-visit |
| Painel contextual | `.at-painel`                        | global                     |
| Rodapé            | `.at-rodape`                        | global                     |
| Palco de letras   | `.at-palco`                         | homepage                   |
| Transição         | `.at-transicao`                     | global                     |

---

## Casca — `.at-casca`

Envelope da página. Existe por um motivo estrutural único: **o rodapé
revelado**.

```html
<div class="at-casca">
  <header class="at-cabecalho">…</header>
  <div class="at-menu">…</div>
  <div class="at-casca__conteudo" data-inertizavel>
    <main>…</main>
  </div>
  <footer class="at-rodape" data-inertizavel>…</footer>
</div>
```

O conteúdo tem fundo opaco e índice maior; o rodapé é `sticky bottom: 0` com
índice menor. O conteúdo rola **por cima** do rodapé, que só aparece quando
acaba.

> **Requisito não óbvio:** o rodapé precisa ser **irmão** do contêiner de
> conteúdo. Dentro dele, o `sticky` se prende à viewport desde o topo da
> página e o rodapé fica visível o tempo todo. Foi exatamente esse o erro na
> primeira montagem.

`data-inertizavel` marca o que deve ficar inerte quando um overlay abre.
Ambos os blocos precisam do atributo.

---

## Marca — `.at-marca`

Disco claro com a palavra da instituição. **Um ativo, dois comportamentos:**
sobre mídia escura o disco aparece; sobre papel ele desaparece no fundo e só
as letras permanecem.

É o mesmo truque da referência, e é o motivo de não existir troca de
logotipo por seção — algo que parecia necessário até a medição mostrar que o
`src` nunca muda.

---

## Gatilho do menu — `.at-menu-gatilho`

`<button>` de `10em × 4em`, com `aria-expanded` e `aria-controls`.

Dois rótulos empilhados dentro de um contêiner de altura fixa; abrir desliza
o par para cima, trocando “Menu” por “Fechar”. O ícone de três traços vira um
X por `transform`.

**Sem JavaScript o gatilho some** (`html:not(.at-js) .at-menu-gatilho`). A
navegação completa continua no rodapé, que é markup estático. Um controle que
não faz nada é pior que um controle ausente.

---

## Menu global — `.at-menu`

Grade de duas colunas em `3fr 2fr`, com linha inferior reservando a altura da
barra de serviços — que permanece visível com o menu aberto.

| Parte                        | Papel                                                |
| ---------------------------- | ---------------------------------------------------- |
| `.at-menu__coluna-principal` | `<nav>` com os destinos, em `display-lg`             |
| `.at-menu__coluna-apoio`     | endereço, contato e nota; **oculta abaixo de 992px** |
| `.at-menu__rodape`           | faixa que fecha a grade                              |

Divisórias em régua de 3px (`--at-borda-regua`), não filete. É regra
editorial, e o peso importa: um filete de 1px aqui faria a divisão sumir sob
a escala do tipo.

Comportamento e animação em
[`navigation-and-page-transitions.md`](navigation-and-page-transitions.md).

---

## Barra de serviços — `.at-barra-servicos`

O componente mais claramente pastoral do sistema. `sticky bottom: 0`,
cartão flutuante com sombra, contendo:

1. **horários** — lista, não parágrafo, com filete separando os itens;
2. **marquee de avisos** — conteúdo rotativo de CMS;
3. **ação persistente** — botão circular que abre o painel de contato.

Abaixo de 767px empilha em coluna e **abandona os filetes**: com quebra de
linha eles viram traços órfãos no fim das linhas.

> O filete que separa horários do marquee vive no bloco de horários, não no
> marquee: a máscara de esmaecimento do marquee recortaria qualquer borda
> própria.

---

## Marquee — `.at-marquee`

Trilho duplicado em runtime (o clone recebe `aria-hidden`, para o leitor de
tela ler o conteúdo uma só vez).

A duração vem da **largura real medida** dividida pela velocidade em token —
nunca de um valor fixo. Dois marquees com textos de tamanhos diferentes
precisam andar no mesmo passo; senão a página parece ter dois relógios.

Pausa em três situações: ponteiro sobre ele, fora da viewport, aba oculta.
Sob `prefers-reduced-motion` a animação some e o contêiner vira rolável.

Variante `--cartaz`: padding de 6em e régua de 3px embaixo.

---

## Hero — `.at-hero`

91vh no desktop, 100vh abaixo de 992px. Mídia absoluta ao fundo com véu
superior; cartão editorial em areia ancorado embaixo.

No celular o cartão perde a margem, ganha cantos superiores arredondados e
**reserva padding inferior para a barra de serviços** — sem isso a última
linha nasce coberta.

A mídia do hero sobrescreve o `aspect-ratio` de `.at-midia`: aqui a proporção
é ditada pelo palco, não pelo enquadramento padrão.

---

## Carrossel — `.at-carrossel`

Pista com `scroll-snap` nativo e `overflow-x: auto`.

**Decisão de engenharia:** a referência usa Splide. Aqui não há biblioteca.
Rolagem nativa entrega arraste por toque, roda do mouse, inércia do sistema e
leitura linear de graça; os controles apenas empurram `scrollLeft`. Ver a
justificativa completa em
[`implementation-notes.md`](implementation-notes.md).

A pista é `tabIndex = 0` e responde a `ArrowLeft`/`ArrowRight`. O papel de
grupo fica no **contêiner**, não na `<ul>`: sobrescrever o papel de lista
deixaria os `<li>` órfãos na árvore acessível — erro cometido e corrigido
durante a implementação.

Setas ganham `disabled` nos extremos; os pontos usam `aria-current`.

---

## Cartão — `.at-cartao`

Superfície clara, raio de 1.88em, sombra mínima, ação alinhada à esquerda com
`margin-top: auto` (todas as ações de uma grade ficam na mesma linha,
independentemente do texto).

**`.at-cartao--acento` marca no máximo um item por grade.** Dois cartões
azuis lado a lado significam hierarquia perdida — a regra é do sistema, não
sugestão.

---

## Cartão de evento — `.at-evento`

Variante com ordem própria: **quando → o quê → resumo → ação**. O “quando”
vem primeiro porque numa listagem de agenda a data é o critério de varredura.

A ação encosta no canto inferior **direito** (`align-self: flex-end`),
diferente do cartão comum. Foi o padrão medido em `/events` e é o que faz a
grade ler como agenda e não como catálogo.

Cada ação recebe `aria-label` completo (“Participar — Mutirão da horta”): a
referência tem três “LEARN MORE” indistinguíveis, apontado pelo Lighthouse.

---

## Bloco de horários — `.at-horarios`

Linhas com filete, `quando` em cartaz e `o quê` em corpo. Componente
separado do cartão porque aparece em dois contextos e porque a informação de
horário tem hierarquia própria: o número é o que se procura.

---

## Painel contextual — `.at-painel`

Diálogo real: `role="dialog"`, `aria-modal`, título associado, foco preso e
devolvido, Escape, clique fora, fundo inerte, rolagem bloqueada com
contagem de profundidade.

Dentro, uma lista de assuntos em acordeão — **um aberto por vez** — e um
formulário local. Ver
[`forms-and-conversion-patterns.md`](forms-and-conversion-patterns.md).

---

## Rodapé — `.at-rodape`

Quatro colunas: marca, contato, navegação, ação. Aviso legal em mono,
separado por filete.

Os links de lista têm `min-height: 44px` — são alvos de navegação, não links
inline no meio de uma frase, e a isenção de tamanho da WCAG 2.5.8 não se
aplica a eles.

Abaixo de 992px perde o `sticky` (o efeito de revelação não faz sentido em
tela pequena, e o custo de composição não se paga).

---

## Palco de letras — `.at-palco`

Contêiner `sticky` de 100vh dentro de uma seção de três viewports de altura.
As letras estão posicionadas por percentual; o scroll conduz apenas
`opacity` e `translateY`.

Uma única cor com alfa variável produz toda a profundidade — não há cinzas
neste bloco. Ver [`motion-system.md`](motion-system.md).

O texto real fica num nó `at-visualmente-oculto` ao lado da camada de letras,
que é `aria-hidden`. A frase permanece legível para leitor de tela.

---

## Componentes previstos que **não** foram criados

| Previsto                                   | Motivo                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `MegaMenu` separado de `MobileNavigation`  | é o **mesmo** componente com outra grade; separá-lo duplicaria estado               |
| `MenuToggle` separado de `GlobalHeader`    | o gatilho só existe no cabeçalho                                                    |
| `ValuesMarquee` separado de `Marquee`      | é o mesmo componente com uma variante de escala                                     |
| `IconAction` separado de `SecondaryAction` | `.at-botao-circulo` cobre os dois usos                                              |
| `ServiceGrid`                              | é `.at-grade-cartoes` — uma grade, não um componente                                |
| `ImageFrame`                               | é `.at-midia` com modificadores; não tem estado                                     |
| `ReducedMotionAlternative`                 | movimento reduzido é resolvido por token e mídia query, não por componente paralelo |
| `NewsletterPanel`                          | na referência a newsletter é um **link externo**, não um painel                     |
| `ConsentField`                             | é um `FormField` do tipo checkbox com rótulo em frase                               |
