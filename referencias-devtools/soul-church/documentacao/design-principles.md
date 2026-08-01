# Princípios de design — Átrio

Sete decisões extraídas da auditoria em
[`../auditoria/soul-church-audit.md`](../auditoria/soul-church-audit.md).
São o que a reconstrução preserva; tudo o mais é consequência.

Cada princípio tem a mesma estrutura: **o que foi observado**, **por que
funciona** e **como o sistema o implementa**.

---

## 1. A escala é uma só

**Observado.** O `font-size` do `body` é a única entrada fluida do site
inteiro. Todo o resto — título, moldura, raio, cartão, gutter — está em `em`.
Medido em cinco viewports: 16.000px em 1920, 15.5846px em 1440, 13.1846px em
1024, 13.9865px em 991, 12.4785px em 390.

**Por que funciona.** Sistemas que misturam tipografia fluida com espaçamento
em `rem` desmontam nos extremos: o texto encolhe e a moldura não, ou o
contrário. Aqui a proporção entre letra e espaço é uma constante do sistema.
Um título de 8.33em está sempre a 4.375em do topo da seção, em qualquer
largura.

**No sistema.** `foundations.css` declara os três regimes no `body`; os
tokens dimensionais em `tokens.json` são todos `em`. Nenhum componente
declara `px` a não ser filetes, réguas e a área mínima de toque — os três
casos onde o valor é físico, não proporcional.

> **Armadilha.** `em` dentro de um elemento com `font-size` próprio resolve
> contra ele mesmo. Um recuo de `--at-esp-14` (3.75em) aplicado a um título
> de 8.33em vale 486px, não 58px. Isso aconteceu durante a implementação e
> está documentado em [`implementation-notes.md`](implementation-notes.md).

---

## 2. Seções são lajes, não faixas

**Observado.** `border-radius: 3.75em` nas seções — nos quatro cantos na laje
escura, só nos inferiores na seção branca que a antecede. A seção seguinte
passa por baixo.

**Por que funciona.** Uma faixa colorida colada na anterior lê como divisão
administrativa. Um bloco arredondado que se sobrepõe lê como objeto — e a
página vira uma pilha de cartões, não uma lista de seções. O efeito só existe
se houver outra superfície visível atrás do canto.

**No sistema.** `.at-laje`, `.at-laje-base`, `.at-laje-topo`. A regra de
composição: a seção seguinte sobe `-1 × raio` e recupera o espaço no próprio
padding.

---

## 3. A assimetria é luxo de desktop

**Observado.** Acima de 992px a moldura editorial é `4.375em 3.25em 3.75em
7.81em` — a margem esquerda é 2.4× a direita — e a grade é `30em 36.19em`,
com a coluna de mídia mais larga que a de texto. Em 991px ambas viram
simétricas num único passo.

**Por que funciona.** A irregularidade precisa de largura para ser lida como
intenção; num viewport estreito ela vira só desalinhamento. O sistema não
tenta preservar a assinatura onde ela não cabe: abandona.

**No sistema.** `.at-container-editorial` e `.at-grade-editorial` trocam de
regime em 992px. Ver [`responsive-system.md`](responsive-system.md).

---

## 4. Um só acento

**Observado.** A paleta é de neutros quentes com um único azul
(`--cornflower-blue`). Em `/events`, entre nove cartões, exatamente **um** é
azul: o atalho para o calendário.

**Por que funciona.** Um acento usado duas vezes na mesma grade deixa de ser
acento. A disciplina — e não a cor — é o que produz hierarquia.

**No sistema.** `.at-cartao--acento`. A documentação em
[`components.md`](components.md) declara a regra explicitamente: se dois
cartões da mesma grade recebem o modificador, o sistema foi usado errado.

---

## 5. O gatilho vira o painel

**Observado.** O elemento que no estado fechado mede `10em × 4em` no canto
superior direito — a pílula “MENU” — é o mesmo que no estado aberto mede
`280em × 280em` e cobre a tela. Raio constante de 144px durante toda a
expansão.

**Por que funciona.** Não há corte de contexto. O usuário não vê um painel
aparecer sobre a página; vê o botão que ele acabou de tocar se tornar o
espaço em que está. A curva enorme atravessando o viewport é o que dá a
sensação de material, não de camada.

**No sistema.** Reproduzido com `clip-path: inset(… round …)` em vez de
animar dimensões — mesmo gesto, sem custo de layout. Ver
[`navigation-and-page-transitions.md`](navigation-and-page-transitions.md) e a
divergência D-01 em [`implementation-notes.md`](implementation-notes.md).

---

## 6. A mídia não desliza; o texto sim

**Observado.** O texto entra com deslocamento horizontal de 1em e opacidade.
As imagens não têm deslocamento — quando animam, animam escala.

**Por que funciona.** Deslocar um bloco grande de imagem arrasta a atenção
para o movimento; fechar a escala devolve a moldura ao lugar sem competir com
a leitura. É a diferença entre uma página que se apresenta e uma que se
exibe.

**No sistema.** `.at-revelar` (texto, translação) e `.at-midia-revela`
(mídia, escala 1.08 → 1) são primitivas distintas em
[`motion-system.md`](motion-system.md).

---

## 7. O horário nunca sai da tela

**Observado.** `.nav-bottom` é `sticky` com `z-index: 9999`, presente em
todas as páginas com hero. Contém horários dos encontros, um atalho de mídia
e um ícone que abre um painel de contato com cinco assuntos — inclusive
oração e primeira visita.

**Por que funciona.** É o padrão mais claramente pastoral do site inteiro.
Quem visita pela primeira vez tem duas perguntas — _quando_ e _e se eu não
souber o que fazer_ — e as duas respostas ficam permanentemente ao alcance,
sem exigir que a pessoa encontre a página certa.

**No sistema.** `.at-barra-servicos` + `.at-painel`. A reconstrução mantém a
persistência e corrige o acesso: o gatilho é `<button>`, o painel é um
diálogo real com foco preso e Escape.

---

## O que a reconstrução deliberadamente **não** preserva

Estes não são princípios; são defeitos que a auditoria encontrou e que seriam
reproduzidos por descuido.

| Não preservado                       | Motivo                                                      |
| ------------------------------------ | ----------------------------------------------------------- |
| Fatiamento por letra                 | destrói o nome acessível: o leitor de tela soletra o título |
| Gatilho de menu sem `<button>`       | torna a navegação global inalcançável por teclado           |
| Overlay sem foco preso nem `inert`   | o fundo continua tabulável por trás do painel               |
| Ausência de `prefers-reduced-motion` | 0 regras em 1685                                            |
| Campos sem `<label>`                 | 3 de 5 por formulário                                       |
| Feedback sem `aria-live`             | o envio não é anunciado                                     |
| Analytics com consentimento recusado | a reconstrução não carrega rastreador algum                 |
| Animar `width`/`height` de 4363px    | custo de layout evitável sem perder o gesto                 |
| Fontes web sem estratégia de métrica | CLS 1.64 em campo                                           |

Detalhamento e correções em [`accessibility.md`](accessibility.md).
