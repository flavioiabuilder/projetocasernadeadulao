# Estratos — princípios de design

Sete princípios destilados da auditoria em
[`../reference-audit/aramco-birth-of-oil-audit.md`](../reference-audit/aramco-birth-of-oil-audit.md).
São a razão de ser do sistema: os tokens e componentes existem para servi-los.

---

## 1. O palco é fixo; o conteúdo é discreto

A experiência ocupa um viewport inteiro que **não rola**. O avanço acontece
unidade a unidade — roda, arraste, seta ou clique deslocam uma cena, nunca
alguns pixels.

**Por quê:** um palco fixo permite compor cada cena como uma peça acabada, com o
objeto 3D e o texto em relação estável. Scroll contínuo obrigaria a projetar
todos os estados intermediários.

**Implementação:** `.es-palco` com `height: 100dvh` e `overflow: hidden`;
`Estratos.motion.conduzirPorGesto` converte gesto em avanço discreto.

**Custo aceito:** perde-se a barra de rolagem como indicador de progresso. Por
isso o trilho (`.es-trilho`) é obrigatório, não decorativo.

---

## 2. A tipografia escala pela altura

`min(8.4vh, 70px)` no display, `min(2.2vh, 16px)` no corpo — medido na
referência, não arbitrado.

**Por quê:** num palco de viewport fixo, o recurso escasso é a **altura**. A
largura já está resolvida por uma coluna de medida fixa (450px). Escalar por
`vw`, como é hábito, produziria títulos que estouram verticalmente em telas
baixas e largas.

**Consequência prática:** em notebooks de 13" com barra de favoritos aberta, o
título encolhe automaticamente e a cena continua cabendo. Nenhum breakpoint
extra é necessário para isso.

---

## 3. A profundidade vem do movimento, não da sombra

Não há uma sombra projetada sequer na cena da referência. A hierarquia espacial
é criada por **deslocamentos de magnitude diferente** na revelação: o título
entra de 150px, o corpo de 50px.

**Por quê:** objetos distantes parecem mover-se menos. Aplicar essa regra ao
texto faz a composição ganhar profundidade sem nenhum artifício de iluminação —
e sem custo de pintura.

**Implementação:** tokens `--es-mov-dist-curta|media|longa` (50/150/300px),
aplicados por `.es-linha__interior` e `[data-es-revelar]`.

---

## 4. Um só elemento de alto contraste por cena

A ação primária é um retângulo branco sólido. Todo o resto vive em filetes de
20% de opacidade e texto quase branco sobre campo dessaturado.

**Por quê:** com um único ponto de contraste máximo, o olho sabe sempre onde
está a saída. Multiplicar ênfases é o que faz interfaces imersivas virarem ruído.

**Regra de uso:** se uma cena precisa de duas ações, a segunda é `.es-controle`
(contorno), nunca uma segunda superfície sólida.

---

## 5. O ambiente é contínuo; o editorial é episódico

A cena 3D nunca corta. O texto entra e sai sobre ela.

**Por quê:** a continuidade do fundo é o que sustenta a sensação de um único
lugar percorrido, em vez de uma sequência de telas. É o que separa uma
experiência de um carrossel.

**Implementação:** a canvas fica fora do ciclo de troca de cenas; apenas
`.es-cena` alterna `hidden`. `definirProgresso()` informa a cena 3D do avanço
para que ela derive sem cortar.

---

## 6. A entrada é consentida

Nada se move — nem áudio, nem câmera, nem carregamento pesado — antes de um
gesto explícito do usuário.

**Por quê:** resolve autoplay, respeita conexões medidas e dá ao carregamento um
lugar honesto na narrativa em vez de escondê-lo atrás de um spinner.

**Nota de acessibilidade:** o portão de entrada não pode ser a única via. O
conteúdo editorial deve existir na árvore de acessibilidade independentemente
dele — falha que a referência comete e que corrigimos
([`accessibility.md`](accessibility.md)).

---

## 7. A moldura é constante

60px no desktop, 30px no mobile. Sempre.

**Por quê:** num conteúdo que muda a cada gesto, a moldura invariável é o que dá
ao usuário a sensação de permanecer no mesmo lugar. É o enquadramento que
estabiliza a troca.

**Implementação:** `--es-esp-moldura` / `--es-esp-moldura-mobile`, consumidos por
`.es-moldura`, `.es-cabecalho` e `.es-trilho`.

---

## O que deliberadamente não herdamos

| Prática da referência                           | Decisão   | Motivo                                                                     |
| ----------------------------------------------- | --------- | -------------------------------------------------------------------------- |
| Split de texto que destrói o nome acessível     | Rejeitada | Leitor de tela soletra letra a letra                                       |
| Ausência de `prefers-reduced-motion`            | Rejeitada | Barreira vestibular                                                        |
| `<canvas>` sem alternativa                      | Rejeitada | Conteúdo inacessível e sem fallback                                        |
| Sequestro total do scroll sem saída por teclado | Adaptada  | Mantivemos a progressão discreta, mas teclado é cidadão de primeira classe |
| 6.2 MB de ativos                                | Rejeitada | A cena é procedural; nenhum ativo binário                                  |
