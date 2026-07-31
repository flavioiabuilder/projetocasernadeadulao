# Estratos — foundations

Fonte canônica dos tokens: [`../design-system/tokens/tokens.json`](../design-system/tokens/tokens.json).
O CSS consumido pelo projeto é **gerado**:

```bash
npm run generate:tokens
```

`../design-system/css/tokens.css` é artefato — não edite à mão. 157 custom
properties, prefixo `--es-`.

---

## Por que uma fonte canônica em JSON

O JS da cena WebGL precisa das mesmas cores que o CSS, e o shader precisa delas
como floats. Manter dois lugares de verdade garantiria divergência. O JSON gera
o CSS; o JS lê o CSS em runtime via `Estratos.token()`. Um valor, três consumidores.

---

## Cor

Paleta **independente** — a estrutura de papéis vem da referência, os valores não
(ver [`asset-and-license-boundaries.md`](asset-and-license-boundaries.md)).

| Papel                    | Token                        | Valor                   |
| ------------------------ | ---------------------------- | ----------------------- |
| Fundo mais profundo      | `--es-cor-abismo`            | `#0d1418`               |
| Campo atmosférico escuro | `--es-cor-profundo`          | `#132029`               |
| Campo médio              | `--es-cor-mineral`           | `#24333c`               |
| Corpo mineral            | `--es-cor-limo`              | `#6b7f86`               |
| Bruma                    | `--es-cor-bruma`             | `#a9bcc0`               |
| Texto display            | `--es-cor-texto`             | `#f2f7f4`               |
| Texto corpo              | `--es-cor-texto-corpo`       | `#ffffff`               |
| Texto tênue              | `--es-cor-texto-tenue`       | `#a9bcc0`               |
| Acento luminoso          | `--es-cor-brasa-clara`       | `#e8b177`               |
| Superfície de ação       | `--es-cor-superficie-solida` | `#ffffff`               |
| Filete                   | `--es-cor-filete`            | `rgba(242,247,244,0.2)` |

**Regras:**

1. Nunca preto puro em texto — sempre `--es-cor-texto*`.
2. Filetes vêm em três densidades (`tenue` 10%, padrão 20%, `forte` 42%).
   Não invente opacidades ad hoc.
3. O acento (`brasa`) é usado em **um** lugar por cena: marcador atual do trilho,
   ponto da ação primária ou linha de horizonte — nunca nos três ao mesmo tempo.

## Tipografia

| Papel   | Token                      | Desktop                             | Mobile        |
| ------- | -------------------------- | ----------------------------------- | ------------- |
| Display | `--es-tipo-display-fluido` | `min(8.4vh, 70px)` / 0.80           | `45px`        |
| Título  | `--es-tipo-titulo-fluido`  | `min(5.2vh, 36px)` / 1.05           | idem          |
| Corpo   | `--es-tipo-corpo-fluido`   | `min(2.2vh, 16px)` / 1.60           | `14px` / 1.45 |
| Rótulo  | `--es-tipo-rotulo`         | `12px` / 1.30                       | idem          |
| Micro   | `--es-tipo-micro`          | `11px` / 1.30, `0.16em`, caixa alta | idem          |

A entrelinha do display é **0.80** — menor que o corpo da fonte. É intencional e
é o que produz o aspecto compacto. Só funciona com peso leve (300) e caixa
alta ou frases curtas; em parágrafos seria ilegível.

**Medida editorial:** `450px` no desktop, `300px` no mobile. Largura fixa, não
fração da tela — o texto não deve reflow ao mudar a largura da janela, só ao
cruzar o breakpoint.

### Famílias

`--es-tipo-familia-display` e `--es-tipo-familia-corpo` declaram
`"Estratos Display"` / `"Estratos Texto"` com fallback para Archivo, Inter e
`system-ui`. **Nenhum arquivo de fonte é distribuído neste repositório.** Ver
[`asset-and-license-boundaries.md`](asset-and-license-boundaries.md) para o
mapeamento e as instruções de auto-hospedagem.

## Espaço

Escala de 4px: `--es-esp-1` (4px) a `--es-esp-20` (80px), mais dois valores de
moldura medidos: `--es-esp-moldura` (60px) e `--es-esp-moldura-mobile` (30px).

## Grade

`--es-grade-colunas: 12`, gutter 24px (16px mobile), largura máxima 1440px.

A grade de 12 colunas serve páginas de documentação e conteúdo tabular. **As
cenas imersivas não usam grade** — usam posicionamento absoluto sobre o palco,
com a coluna editorial ancorada por `padding-inline-start: max(60px, 46vw)`,
que a mantém à direita do corpo 3D em qualquer largura.

## Profundidade e camadas

| Camada | Token                 | Conteúdo                            |
| ------ | --------------------- | ----------------------------------- |
| 0      | `--es-z-cena`         | canvas WebGL ou alternativa CSS     |
| 1      | `--es-z-ambiente`     | véu, granulação, horizonte, vinheta |
| 2      | `--es-z-editorial`    | cenas, pórtico, estado final        |
| 3      | `--es-z-trilho`       | trilho de progresso                 |
| 10     | `--es-z-cabecalho`    | som e menu                          |
| 15     | `--es-z-mapa`         | mapa de cenas (diálogo modal)       |
| 20     | `--es-z-cursor`       | cursor customizado                  |
| 30     | `--es-z-carregamento` | tela de carregamento                |

Nenhum `z-index` literal fora desta escala.

## Foco, seleção e cursor

- **Anel de foco:** 2px sólido em `--es-cor-foco`, `outline-offset: 3px`.
  Aplicado por `:focus-visible`, nunca removido.
- **Seleção:** acento sobre abismo.
- **Cursor customizado:** só em `(hover: hover) and (pointer: fine)`. Em
  toque, `.es-cursor` fica `display: none` e nada é registrado.

## Preferências do usuário

`prefers-reduced-motion` é tratado **no nível do token**: `tokens.css` reescreve
durações para 1ms e distâncias para 0 dentro da media query. Componentes não
consultam a preferência — herdam-na. O JS complementa desativando paralaxe,
amortecimento e a rotação da cena.

`prefers-contrast: more` eleva filetes para 55%/85%, troca o gradiente de fundo
por cor sólida e escurece o véu.

`forced-colors: active` devolve `ButtonBorder`/`ButtonText` aos controles e força
o marcador do trilho a permanecer visível.

## Área segura e viewport curto

`.es-palco` reserva `env(safe-area-inset-*)`. Abaixo de 520px de altura, a coluna
editorial ganha `overflow-y: auto` com `overscroll-behavior: contain`, para que o
texto continue alcançável em landscape de telefone sem quebrar o palco.
