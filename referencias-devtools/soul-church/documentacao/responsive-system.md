# Sistema responsivo — Átrio

---

## 1. Como o sistema realmente responde

Não é um sistema de breakpoints com um punhado de ajustes. É um **motor de
escala contínuo** com dois pontos de reorganização estrutural.

| Camada        | Mecanismo                                         |
| ------------- | ------------------------------------------------- |
| Escala        | `font-size` fluido no `body`; tudo o mais em `em` |
| Reorganização | duas consultas de mídia: **992px** e **768px**    |
| Ajuste fino   | uma consulta em **480px** para o rodapé           |

Nenhuma container query. Nenhum `clamp()`. Nenhuma lógica de largura em
JavaScript.

---

## 2. Os três regimes de escala

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

| Viewport | 1em     | Regime            | Verificado                        |
| -------- | ------- | ----------------- | --------------------------------- |
| 1920px   | 16.00px | teto              | ✓ na referência e na reconstrução |
| 1512px   | 16.00px | ponto de encontro | ✓                                 |
| 1440px   | 15.16px | principal         | ✓                                 |
| 1024px   | 12.79px | principal         | ✓                                 |
| 991px    | 13.99px | suave             | ✓                                 |
| 390px    | 12.48px | suave             | ✓                                 |

**Duas propriedades não óbvias:**

1. A rampa principal atinge exatamente 16px em 1512px, onde o teto assume.
   Não há salto.
2. A troca em 991px produz um **salto para cima** — 12.99px pela fórmula
   desktop contra 13.99px pela mobile. No celular o texto **cresce** de
   tamanho relativo em vez de continuar encolhendo. É uma decisão de
   legibilidade, não um efeito colateral.

Acima de 1512px a página não escala mais: ela só fica mais larga, até o teto
de 105.8em do contêiner.

---

## 3. O que muda em 992px

Este é o breakpoint estrutural. Sete coisas mudam de uma vez:

| Propriedade             | ≥992px                         | ≤991px                       |
| ----------------------- | ------------------------------ | ---------------------------- |
| Grade editorial         | `30em 36.19em` (assimétrica)   | coluna única                 |
| Moldura do contêiner    | `4.375em 3.25em 3.75em 7.81em` | `3.75em 2em 2em` (simétrica) |
| Coluna de apoio do menu | visível                        | `display: none`              |
| Links do menu           | `display-lg`                   | `display-md`                 |
| Barra de serviços       | linha                          | coluna                       |
| Rodapé                  | 4 colunas, `sticky`            | 2 colunas, estático          |
| Hero                    | 91vh                           | 100vh                        |

> **O princípio:** a assimetria é luxo de desktop. A irregularidade da
> moldura e da grade precisa de largura para ser lida como intenção; num
> viewport estreito vira desalinhamento. O sistema não tenta preservá-la —
> abandona de uma vez.

O rodapé também perde o `sticky`: o efeito de revelação não faz sentido em
tela pequena e o custo de composição não se paga.

---

## 4. O que muda em 768px

Ajuste tipográfico e de moldura, sem reorganização:

| Propriedade      | ≥768px               | ≤767px                        |
| ---------------- | -------------------- | ----------------------------- |
| `.at-display-xl` | 8.33em               | 4em                           |
| `.at-display-lg` | 4.5em                | 2.7em                         |
| `.at-cartaz-xl`  | 12em                 | 6.25em                        |
| `.at-cartaz-lg`  | 7.88em               | 4.4em                         |
| `.at-corpo-lg`   | 1.5em                | 1.25em                        |
| Moldura lateral  | 2em                  | 1em                           |
| Cartão do hero   | flutuante com margem | full-bleed, cantos superiores |
| Arco da mídia    | `25em 0 3.75em 0`    | `25em 0 3.75em 3.75em`        |
| Grade de cartões | `auto-fill`          | coluna única                  |
| Filetes da barra | presentes            | removidos                     |

O arco ganha um quarto valor no celular: com a coluna estreita, o canto
inferior esquerdo reto ficaria duro contra a borda da tela.

Os filetes da barra saem porque, empilhada e com quebra de linha, eles viram
traços órfãos no fim das linhas.

---

## 5. Alturas ligadas ao viewport

| Elemento          | Valor                           | Motivo                                                                              |
| ----------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Hero              | 91vh (desktop) / 100vh (mobile) | os 9% que sobram no desktop mostram a borda da próxima laje e sinalizam que há mais |
| Palco de letras   | 100vh, dentro de seção de 300vh | o palco fica preso; a seção fornece o alcance do scrub                              |
| Barra de serviços | 8vh                             | acompanha a altura da janela sem virar tarja                                        |

Em telas baixas (notebook em 637px de altura útil, por exemplo) o hero de
91vh continua deixando o cartão editorial inteiro visível — verificado
durante a auditoria.

---

## 6. Toque, ponteiro e orientação

| Condição                         | Comportamento                                                       |
| -------------------------------- | ------------------------------------------------------------------- |
| `hover: hover` e `pointer: fine` | elevação de cartão e sublinhado varrido ativos                      |
| Toque                            | efeitos de hover **desligados** — evita o estado preso após o toque |
| Ponteiro grosso                  | paralaxe desligada (custo de repintura não paga o efeito)           |
| Alvos                            | mínimo de 44px de altura em todos os controles não inline           |
| Orientação                       | nada depende de orientação; o layout responde só a largura          |

---

## 7. Verificação

Todos os viewports foram medidos com Chrome DevTools MCP na referência e na
reconstrução: **1920×1080, 1440×900, 1024×768, 991×1024, 768×1024, 430×932,
390×844, 360×800**.

O teste e2e verifica **ausência de rolagem horizontal** em seis viewports
(`../testes/e2e/atrio.spec.js`), e o laboratório exibe largura, valor de 1em
e regime ativo em tempo real, para inspeção manual ao redimensionar.

---

## 8. Limitação declarada

O comportamento sob **conexão lenta** não foi verificado nem na referência
nem na reconstrução. A reconstrução carrega 5 folhas de estilo e 5 scripts
locais, sem nenhum recurso externo; o impacto de rede é conhecido em
tamanho, mas não foi medido sob throttling.
