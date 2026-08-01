# Linguagem editorial e de mídia — Átrio

Como texto, fotografia e espaço negativo se relacionam. É aqui que mora a
atmosfera acolhedora — e ela é resultado de decisões mensuráveis, não de
tom de voz.

---

## 1. A composição assimétrica

A seção editorial da referência não é um layout de duas colunas. É uma
composição com quatro decisões simultâneas:

| Decisão                         | Medida                                      | Efeito                                  |
| ------------------------------- | ------------------------------------------- | --------------------------------------- |
| Moldura desigual                | 7.81em à esquerda, 3.25em à direita         | o texto recua; a mídia respira na borda |
| Mídia mais larga que o texto    | 36.19em × 30em                              | a imagem domina sem gritar              |
| Vão vertical grande             | 4.69em entre título e parágrafo             | silêncio no meio da coluna              |
| Alinhamentos não compartilhados | título no topo, parágrafo no terço inferior | a leitura salta em vez de escorrer      |

O resultado é uma página que parece **espaçosa**, não vazia. A diferença é
que o espaço está concentrado num lugar (o meio da coluna de texto) em vez de
distribuído igualmente.

Na reconstrução: `.at-container-editorial` + `.at-grade-editorial` +
`.at-demo-coluna-texto` com `gap: 6em`.

---

## 2. O arco

`border-radius: 25em 0 3.75em 0` numa moldura de 36em.

O raio superior esquerdo consome dois terços do lado. A silhueta que resulta
não é um retângulo arredondado — é uma **abóbada**. Num contexto comunitário
a associação é imediata: portal, entrada, abrigo.

É a assinatura formal do sistema, e funciona porque é usada **uma vez por
página**. Aplicada a todas as imagens, viraria maneirismo.

No celular ganha um quarto valor (`25em 0 3.75em 3.75em`): com a coluna
estreita, o canto inferior esquerdo reto ficaria duro contra a borda.

---

## 3. Escala como contraste

A escala tipográfica tem um salto deliberado no topo (8.33em → 4.5em, razão
1.85) e uma progressão calma abaixo (razão ~1.20).

Consequência editorial: **uma página tem no máximo uma voz gigante**. O
título de seção em `display-xl` não compete com nada, porque tudo o mais está
pelo menos 4× menor.

O **título sangrado** — cortado pela borda superior da laje — é o que
converte tamanho em escala. A palavra não cabe, e é justamente isso que
comunica a dimensão do bloco.

> Medida do recorte: `-0.15em` do **próprio título**, não do corpo de texto.
> Um recuo escrito com token de espaçamento valeria doze vezes mais e
> apagaria o título por completo. Ver
> [`implementation-notes.md`](implementation-notes.md).

---

## 4. As lajes

Seções são blocos arredondados empilhados. A regra de composição:

```css
.laje-de-cima {
  border-radius: 0 0 3.75em 3.75em;
  position: relative;
  z-index: 2;
}
.secao-abaixo {
  margin-top: -3.75em;
  padding-top: 3.75em;
}
```

A seção de baixo sobe exatamente a altura do raio e recupera o espaço no
próprio padding. Sem isso o canto arredondado não tem nada atrás e
simplesmente não aparece — erro cometido e corrigido durante a
implementação.

Ritmo cromático da homepage: papel → linho → tinta → papel → areia. A laje
escura no meio é o ponto de virada: é ela que separa “quem somos” de “o que
fazer agora”.

---

## 5. Tratamento de mídia

| Regra                           | Implementação                                   |
| ------------------------------- | ----------------------------------------------- |
| Toda mídia reserva proporção    | `aspect-ratio` em `.at-midia`                   |
| Enquadramento padrão            | `object-fit: cover`, `object-position: 50% 40%` |
| Ancoragem acima do centro       | rostos ficam no terço superior                  |
| Placeholder é gradiente próprio | `--at-grad-midia-vazia`                         |
| Mídia nunca desliza             | entra fechando escala (1.08 → 1)                |

`object-position: 50% 40%` não é arbitrário: em fotografia de grupo o
conteúdo relevante está acima do centro geométrico, e centralizar corta
cabeças em enquadramentos verticais.

**A demonstração não usa fotografia.** Os placeholders são gradientes
originais em CSS. Isso é limitação declarada, não escolha estética: a
atmosfera acolhedora da referência depende de fotografia de pessoas reais, e
nenhuma foi copiada. Ver
[`asset-and-license-boundaries.md`](asset-and-license-boundaries.md).

---

## 6. O marquee como identidade

O marquee de valores não transmite informação — transmite **repetição**. Cinco
frases curtas passando em `cartaz-lg` com padding de 6em em cima e embaixo e
uma régua de 3px por baixo.

Funciona por três razões:

1. **A escala é monumental** (7.88em) — é a maior tipografia da página.
2. **O padding é enorme** — o bloco tem 12em de respiro vertical.
3. **A régua o fecha** — o movimento contínuo precisa de um limite fixo,
   senão a seção parece não terminar.

Velocidade constante em `em/s`, nunca duração fixa: dois marquees de
comprimentos diferentes precisam andar no mesmo passo.

---

## 7. Progressão narrativa da homepage

| Posição | Bloco                  | Pergunta que responde           |
| ------- | ---------------------- | ------------------------------- |
| 1       | Hero + cartão          | “o que está acontecendo agora?” |
| 2       | Barra persistente      | “quando?”                       |
| 3       | Seção editorial + arco | “que lugar é este?”             |
| 4       | Palco de letras        | “o que vocês são?”              |
| 5       | Laje escura + cartões  | “o que eu faço?”                |
| 6       | Agenda                 | “o que vem a seguir?”           |
| 7       | Horários               | “quando, em detalhe”            |
| 8       | Marquee de valores     | “o que vocês valorizam”         |
| 9       | Rodapé revelado        | “como falo com vocês”           |

A ordem é: **agora → sempre → quem → o quê → depois → contato**. O evento
mais próximo vem antes da apresentação institucional, e o horário aparece
duas vezes (na barra persistente e em detalhe). Numa experiência comunitária
isso é o oposto de um site institucional, que abre com a missão.

---

## 8. Ritmo de leitura

| Dispositivo                     | Efeito                                                   |
| ------------------------------- | -------------------------------------------------------- |
| Medida de 62ch                  | o olho não perde a linha no retorno                      |
| Entrelinha 1.52 no corpo        | leitura confortável em bloco                             |
| Entrelinha 0.70 no display      | título compacto, lido como imagem                        |
| Vão de 6em entre título e texto | separa o gesto tipográfico da informação                 |
| Alternância de densidade        | seção densa (cartões) seguida de seção rarefeita (palco) |

A alternância é o que impede a fadiga: nenhuma tela pede o mesmo tipo de
atenção que a anterior.

---

## 9. Continuidade entre páginas

Todas as páginas com hero compartilham a mesma casca: cabeçalho, barra de
serviços, menu, painel de contato, rodapé. O que muda é o miolo.

A página de listagem (`/events` na referência) **abandona hero e barra** e usa
uma laje única em tom mais quente. É uma variação legítima: numa página cuja
função é varredura, o hero atrasa e a barra compete com o conteúdo.

A transição de página nomeia o destino, o que costura as duas experiências.
