# Estratos — componentes

Todos os componentes são HTML + CSS; o JS apenas orquestra estado. Inventário
vivo em [`design-system/laboratorio.html`](../../design-system/laboratorio.html).

## Mapa de equivalência com a referência

Os nomes foram ajustados à arquitetura realmente encontrada. Componentes
hipotéticos do briefing que **não** existem na referência não foram criados.

| Estratos                                                    | Referência                           | Situação                                            |
| ----------------------------------------------------------- | ------------------------------------ | --------------------------------------------------- |
| `.es-palco`                                                 | `#ig-application`                    | implementado                                        |
| `.es-tela` + `.es-cena-alternativa`                         | `#ig-canvas-wrapper > canvas`        | implementado, com fallback que a referência não tem |
| `.es-carregamento`                                          | `#loader`                            | implementado                                        |
| `.es-portico`                                               | `#intro`                             | implementado                                        |
| `.es-cabecalho`                                             | `.header`                            | implementado                                        |
| `.es-som`                                                   | `.header .sound`                     | implementado                                        |
| `.es-menu-botao`                                            | `.header .menu`                      | implementado                                        |
| `.es-cena`                                                  | `.chapter > .inner > .slide`         | achatado — ver nota 1                               |
| `.es-editorial`                                             | `.slide .content`                    | implementado                                        |
| `.es-acao-solida`                                           | `.learn-more-button`                 | implementado                                        |
| `.es-acao-contorno`                                         | `.longpress-cta`                     | implementado                                        |
| `.es-prompt`                                                | "PRESS TO DISCOVER"                  | implementado                                        |
| `.es-trilho`                                                | `.chapter > .footer`                 | implementado                                        |
| `.es-mapa`                                                  | `#longpress .progress-map`           | implementado                                        |
| `.es-cursor`                                                | `.cursor`                            | implementado                                        |
| `.es-horizonte`, `.es-vinheta`, `.es-granulacao`, `.es-veu` | camadas do shader                    | implementado em CSS                                 |
| `.es-fim`                                                   | `.end`                               | implementado                                        |
| —                                                           | `.interchapter`                      | **não implementado** — ver nota 2                   |
| —                                                           | `.learn-more-section` (painel Lenis) | **não implementado** — ver nota 3                   |

**Nota 1.** A referência tem dois níveis (capítulo → slide). O sistema achata
para um: `.es-cena` é a unidade, e o agrupamento em capítulos é metadado
(`data-es-capitulo`) consumido pelo mapa. Motivo: a hierarquia dupla só se
justifica com 12+ unidades; abaixo disso ela adiciona estado sem ganho.

**Nota 2.** `interchapter` é um recurso narrativo, não um componente de sistema:
é uma `.es-cena` sem coluna editorial. Não merece código próprio.

**Nota 3.** O painel editorial longo com scroll suave foi deixado de fora por
decisão de escopo — exigiria uma dependência de scroll suave ou reimplementá-la,
e a demonstração não precisa dele. Registrado em
[`implementation-notes.md`](implementation-notes.md) como próximo passo real.

---

## Referência de uso

### `.es-palco`

Contêiner raiz. Exige `data-es-palco` e um rótulo acessível.

```html
<main
  class="es-palco"
  data-es-palco
  aria-roledescription="experiência narrativa"
  aria-label="Título da experiência"
></main>
```

### `.es-cena`

Uma unidade narrativa. Alterna via atributo `hidden` — nunca por opacidade, para
que o conteúdo saia de fato da árvore de acessibilidade e da ordem de foco.

```html
<section
  class="es-cena"
  data-es-cena
  data-es-titulo="Antes da luz"
  aria-label="Cena 1: Antes da luz"
  hidden
>
  <div class="es-cena__conteudo">
    <div class="es-editorial es-coluna-editorial">…</div>
  </div>
</section>
```

> **Atenção:** `es-cena__conteudo` carrega o padding de posicionamento e
> `es-coluna-editorial` carrega a largura. Aplicar as duas classes ao **mesmo**
> elemento colapsa a largura de conteúdo a zero (bug encontrado e corrigido
> durante o ciclo 1 de validação).

### `.es-editorial`

Sequência canônica: sobrancelha (`.es-micro`) → título (`.es-display`) → corpo
(`.es-corpo`) → ações.

Marque para animação com `data-es-fatiar` (fatia em linhas) e `data-es-revelar`
(revela). Blocos que não devem ser fatiados usam `data-es-revelar="bloco"`.

### `.es-acao-solida`

A **única** superfície de alto contraste. No máximo uma por cena.

```html
<button type="button" class="es-acao-solida" aria-label="Ler nota sobre o segundo tempo">
  Ler a nota
  <span class="es-acao-solida__marca" aria-hidden="true"></span>
</button>
```

O `aria-label` específico é obrigatório quando há mais de uma ação com o mesmo
texto visível na experiência — é exatamente o defeito nº 8 da auditoria.

### `.es-trilho`

Navegação entre cenas. Os marcadores são `aria-hidden` (decorativos); a
navegação real acontece pelos botões anterior/próxima, que têm nome acessível.

Estados do marcador via `data-estado`: `visitado`, `atual`, `futuro`.

No mobile os marcadores somem e restam os rótulos textuais — comportamento
observado na referência e mantido.

### `.es-mapa`

Diálogo modal. O controlador gerencia foco: guarda o elemento anterior, move o
foco ao primeiro item ao abrir, devolve ao fechar, e fecha com `Escape`.
`aria-current="true"` marca **apenas** a cena atual.

### `.es-som`

`aria-pressed` reflete o estado; o `aria-label` muda entre "Ativar" e
"Desativar". O rótulo visível some abaixo de 768px, mas o nome acessível
permanece.

### `.es-cursor`

Só existe em ponteiro fino. Elementos que devem alterá-lo declaram
`data-es-cursor="rótulo"`.

---

## Estados

| Estado         | Tratamento                                               |
| -------------- | -------------------------------------------------------- |
| default        | filete 20%, texto pleno                                  |
| hover          | filete 42%, fundo 10%, elevação de 1px na ação primária  |
| focus-visible  | anel de 2px no acento, offset 3px                        |
| disabled       | opacidade 42%, `cursor: not-allowed`, sem hover          |
| atual (trilho) | acento luminoso, `scaleY(3)`                             |
| carregando     | `.es-carregamento__progresso` via `--es-progresso` (0–1) |

Todos os alvos interativos respeitam `--es-tam-alvo-minimo` (44px).
