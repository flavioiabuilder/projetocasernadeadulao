# Auditoria de referência — Soul Church

**URL:** `https://www.soulchurch.com/`
**Data:** 2026-08-01
**Ferramenta principal:** Chrome DevTools MCP (`chrome-devtools-mcp`, Chrome 151)
**Ferramentas auxiliares:** Lighthouse (via MCP), Playwright + axe-core (só na reconstrução), Node test runner
**Status:** auditoria executada — homepage percorrida integralmente e quatro páginas internas inspecionadas

> Material de auditoria, não ativo de produção. Cada afirmação é marcada como
> **evidência** (medida ou lida do runtime), **inferência** (dedução forte a
> partir de evidência) ou **hipótese** (não confirmada). Nenhum texto,
> logotipo, fonte, fotografia, vídeo, folha de estilo ou script da referência
> foi copiado para este repositório. As capturas em `capturas/` são registro
> de auditoria e não são usadas pela reconstrução.

---

## 1. Escopo

| Item | Valor |
| --- | --- |
| Página primária | `/` (homepage) |
| Páginas internas inspecionadas | `/plan-your-visit`, `/events`, `/about-us`, `/connect` |
| Viewports medidos | 1920×1080, 1440×900, 1024×768, 991×1024, 390×844 @2–3× |
| Estado de consentimento | cookies não essenciais **recusados** (botão “Deny”) antes de qualquer medição |
| Capturas | 11 da referência e da reconstrução — ver [`capturas/MANIFESTO.md`](capturas/MANIFESTO.md) |
| Medições brutas | [`capturas/dados/medicoes-1440x900.json`](capturas/dados/medicoes-1440x900.json) |

**Não foi objetivo** espelhar o site, baixar ativos, reconstruir páginas
internas ou percorrer o catálogo completo de conteúdo. As páginas internas
serviram para separar o que é global do que é template.

---

## 2. Arquitetura em uma frase

Um site Webflow com escala tipográfica fluida governada por um único
`font-size` no `body`, montado como uma pilha de lajes arredondadas em
neutros quentes, onde a navegação global não é um painel que abre mas a
própria pílula do cabeçalho que se expande até cobrir a tela.

---

## 3. Stack — evidência, inferência e hipótese

| Item | Status | Evidência |
| --- | --- | --- |
| **Webflow** | evidência | `data-wf-page`/`data-wf-site` no `<html>`; `window.Webflow` presente; chunks `webflow.*.js` em `cdn.prod.website-files.com` |
| **jQuery 3.5.1** | evidência | `window.jQuery.fn.jquery === "3.5.1"` |
| **GSAP 3.11.3 + ScrollTrigger 3.11.3** | evidência | `gsap.version`, `ScrollTrigger.version`; carregados de `cdnjs.cloudflare.com` |
| **SplitType** | evidência | `window.SplitType` definido; script de `unpkg.com/split-type` |
| **Splide 3.2.2** | evidência | `splide.min.js` de `jsdelivr`; duas instâncias `.splide` no DOM |
| **Typekit (Adobe Fonts)** | evidência | `use.typekit.net/rbe2zgb.js`; 9 arquivos de fonte servidos |
| **Google Fonts** | evidência | requisição a `fonts.googleapis.com` para DM Mono, DM Sans, Darker Grotesque, Manrope |
| **Cookiebot (Usercentrics)** | evidência | `consent.cookiebot.com/uc.js`, id `df465c8e-…` |
| **GA4 via proxy de 1ª parte** | evidência | `POST /xa5e8du3i6yd…/ga/g/c?…tid=G-YWX2PJD58B` no próprio domínio |
| **Finsweet Attributes (copyclip)** | evidência | `cdn.jsdelivr.net/npm/@finsweet/attributes-copyclip@1` |
| **Lottie (ícone do menu)** | evidência | `data-animation-type="lottie"`, `Menu.json` no CDN do Webflow |
| **Script de animação em CodeSandbox** | evidência | `https://b13qux.csb.app/script.js` — **bloqueado** (`net::ERR_BLOCKED_BY_ORB`) |
| Webflow IX2 conduz as letras do palco | inferência forte | os `transform` inline têm o formato exato do IX2 (`translate3d(…) scale3d(…) rotateX(0deg)… preserve-3d`) e não aparecem em `ScrollTrigger.getAll()` |
| Barra de avisos alimentada por CMS | evidência | `.w-dyn-list` com `.w-dyn-item`; duas listas de banner em estado `.w-dyn-empty` |
| Lenis / Barba / Locomotive | **ausentes** | nenhum global correspondente; nenhuma classe característica |

O host expõe **12 custom properties**, todas amostras de cor do Webflow
(`--linen`, `--wheat`, `--cornflower-blue`, `--black-2`, `--black-3`,
`--white-smoke`, …). Não há sistema de tokens: escala, espaço, raio e
duração estão embutidos nas regras. Tudo abaixo vem de medição de estilo
computado.

---

## 4. Cartografia (passo 1)

### 4.1 Casca global

Presente em todas as páginas inspecionadas:

| # | Elemento | Papel | Observação |
| --- | --- | --- | --- |
| 1 | `.transition` | sobreposição de transição de página | `display:none` em repouso; `z-index: 9999` |
| 2 | `aside.banner` | aviso institucional via CMS | altura 0 — coleção vazia |
| 3 | `.navbar-component` | cabeçalho fixo | `z-index: 20`; padding `2em 2.25em` |
| 4 | `.mega-menu-wrapper` | navegação global | `display:none` em repouso |
| 5 | `.nav-bottom` | barra de horários + marquee | `position: sticky`, `z-index: 9999` |
| 6 | `.subject-wrapper` | painel de contato/oração | `display:none` em repouso |
| 7 | `.footer` | rodapé revelado | `position: sticky; bottom: 0; z-index: -2` |

### 4.2 Ordem da homepage

```text
hero (91vh, vídeo + cartão “what’s on”)
  ↓
barra de serviços (sticky, 8vh)
  ↓
seção branca “This is Home”      — cantos inferiores arredondados (3.75em)
  ↓
seção linho “Love in Action”     — palco sticky de 100vh, letras espalhadas
  ↓
laje escura “How we do church”   — arredondada nos quatro cantos, carrossel de cartões
  ↓
seção branca — marquee de valores, régua de 3px embaixo
  ↓
rodapé revelado
```

### 4.3 Estados verificados

| Estado | Como foi acionado | Resultado |
| --- | --- | --- |
| Menu aberto | clique no gatilho | `body{overflow:hidden}`; painel em grade `3fr 2fr` |
| Menu fechado por Escape | `press_key Escape` | **fecha** — comportamento herdado do componente `w-nav` do Webflow |
| Painel de contato | clique no ícone circular da barra | painel 626×540px com 5 assuntos e 4 formulários |
| Transição de página | clique em link interno | **contexto de execução destruído** → navegação real, não SPA |
| Recarregamento | reload | posição preservada pelo navegador; nada quebra |
| Rolagem em salto | `scrollTo` instantâneo | conteúdo revelado permanece revelado |
| Recusa de cookies | botão “Deny” | ver §8 — o analytics dispara mesmo assim |

---

## 5. Design system extraído (passo 3)

### 5.1 Escala fluida — **o achado estrutural**

O site não usa `clamp()` nem `rem` fixo. Todo o layout está em `em`, e a
única entrada fluida é o `font-size` do `body`. Três regimes, lidos das
regras CSS e confirmados por medição em cinco viewports:

| Regime | Regra medida | Verificação |
| --- | --- | --- |
| ≥ 1512px | `font-size: 1em` | 1920px → **16.000px** |
| 992–1511px | `calc(0.454808em + 0.576923vw)` | 1440px → **15.5846px**; 1024px → **13.1846px** |
| ≤ 991px | `calc(0.71875em + 0.250908vw)` | 991px → **13.9865px**; 390px → **12.4785px** |

A rampa desktop atinge exatamente 16px em 1512px — o ponto onde o teto
assume. A troca em 991px produz um **salto para cima** (12.99px → 13.99px):
no celular o texto sobe de tamanho relativo em vez de continuar encolhendo.

Consequência: quando o `body` cresce, título, moldura, raio e cartão crescem
juntos, em proporção fixa. É o oposto de um sistema com tipografia fluida e
espaçamento em `rem`.

### 5.2 Tipografia

Quatro famílias com papéis fixos (censo por elemento de folha na homepage):

| Papel | Família | Usos | Observação |
| --- | --- | --- | --- |
| Display | **Darker Grotesque** 700 | 73 | Google Fonts |
| Corpo | **DM Sans** 400 | 58 | Google Fonts |
| Cartaz | **rama-gothic-e** 900 | 12 | Typekit — proprietária |
| Legal | **DM Mono** 400 | 6 | só o aviso de rodapé |

Escala medida, em `em` do corpo fluido:

| Classe | Tamanho | Entrelinha | ≤991px | ≤767px |
| --- | --- | --- | --- | --- |
| `.text-size-h1` | 8.33em | **0.70** | 5.5em | 4em |
| `.text-size-h2` | 4.5em | 1.00 | — | 2.7em |
| `.text-size-h3` | 2.19em | 1.30 | — | — |
| `.text-size-h4` | 1.88em | 1.30 | — | — |
| `.text-size-h5` | 1.67em | 1.30 | — | — |
| corpo | 1em | 1.52 | — | — |
| aviso legal | 0.8em | 1.52 | — | — |

Duas coisas importam aqui. Primeiro, a razão entre `h1` e `h2` é **1.85** e
entre `h3` e `h4` é **1.16**: o contraste está concentrado no topo. Segundo,
a entrelinha **cresce quando o tamanho cai** — 0.70 no display, 1.52 no
corpo. É isso que dá ao título o aspecto compacto e ao texto o ar respirado.

`rama-gothic-e` aparece em 122.807px (7.88em) no marquee e 185.145px (11.88em)
nas letras espalhadas. Fontes Typekit e Google **não foram transferidas**;
substituição documentada em [`asset-and-license-boundaries.md`](../documentacao/asset-and-license-boundaries.md).

### 5.3 Cor

Amostras do Webflow lidas do `:root`:

| Amostra | Valor | Papel observado |
| --- | --- | --- |
| `--linen` | `#e8e1d8` | superfície quente principal |
| `--wheat` | `#d7c8b1` | fundo do menu, seção de eventos |
| `--white-smoke` | `#f8f6f6` | barra de serviços flutuante |
| `--black-2` | `#292927` | laje escura |
| `--black-3` | `#1d1d1b` | seção mais escura |
| `--cornflower-blue` | `#80aff5` | **um único cartão por grade** |
| `--gainsboro` | `#e9e7e7` | texto sobre preto |

O sistema é de neutros quentes com **um acento frio usado com extrema
parcimônia**: na página `/events`, entre nove cartões, exatamente um é azul —
o atalho para o calendário. Essa disciplina é o que faz o acento funcionar.

### 5.4 Espaço e geometria (1440×900, 1em = 15.5846px)

| Token reconstruído | Medido | Em `em` |
| --- | --- | --- |
| Largura máxima do contêiner | 1649.16px | 105.8em |
| Moldura editorial (esq.) | 121.716px | **7.81em** |
| Moldura editorial (dir.) | 50.65px | **3.25em** |
| Moldura editorial (topo/base) | 68.18 / 58.44px | 4.375em / 3.75em |
| Raio da laje | 58.4423px | **3.75em** |
| Raio do cartão | 29.2991px | 1.88em |
| Raio da barra flutuante | 16.5197px | 1.06em |
| Raio do arco (imagem) | 389.615px | **25em** |
| Grade editorial | 467.53px / 564px | **30em / 36.19em** |
| Gutter | 31.1692px | 2em |
| Pílula do menu | 155.844 × 62.328px | **10em × 4em** |
| Cartão de serviço | 327.266px | 21em |
| Padding do marquee | 187.015px | 12em |
| Régua editorial | 3px | — |

Três coisas merecem destaque:

1. **A moldura é assimétrica**: 7.81em à esquerda contra 3.25em à direita.
2. **A coluna de mídia é mais larga que a de texto** (36.19em × 30em).
3. **O arco**: `border-radius: 389.615px 0 57.6631px` numa imagem de 564px —
   o raio superior esquerdo vale 69% do lado. Não é um retângulo arredondado,
   é uma silhueta de abóbada. No celular ganha um quarto valor
   (`25em 0 3.75em 3.75em`).

Alturas ligadas ao viewport: hero **91vh** (819/900 e 982.8/1080), palco de
letras **100vh**, barra de serviços **8vh**.

### 5.5 Breakpoints — medidos, não supostos

Consultas de mídia encontradas nas 1685 regras: `479px`, `767px`, `768px`,
`991px`, `992px`, `1200px`, `1512px`, mais quatro por **altura**
(`max-height: 900px`, `min-height: 1710px`, `(min-width:991px) and
(max-height:690px)`, `(max-height:590px) and (max-width:479px)`).

A troca estrutural real é em **991/992px**. Em 991px, simultaneamente:

- a grade editorial vira **duas colunas iguais** (446 / 446px);
- a barra de serviços vira `flex-direction: column`;
- o rodapé vira `flex-direction: column`;
- a moldura assimétrica some (7.81em → 2em simétrico);
- o padding do marquee cai de 12em para 6em;
- o hero passa de 91vh para **100vh**.

Em 767px vem o segundo ajuste, todo tipográfico e de moldura: `.text-size-h1`
cai para 4em, a grade vira `flex` empilhado e a moldura vai a 1em.

> **Princípio derivado:** a assimetria é um luxo de desktop. Abaixo de 992px
> o sistema abandona a irregularidade e vira simétrico e empilhado.

Nenhuma container query. Nenhum `clamp()`.

---

## 6. Navegação e transições (passo 4)

### 6.1 O gesto central — a pílula vira o menu

Amostrado quadro a quadro com `requestAnimationFrame` sobre
`getComputedStyle`. **Evidência direta:**

| Estado | `.menu-content-wrapper` |
| --- | --- |
| Fechado | `width: 10em; height: 4em` (155.8×62.3px), `border-radius: 144px`, `background: #f4f1ec`, posicionado no canto superior direito |
| Aberto | `width: 280em; height: 280em` (4363×4363px), mesmo raio, `background: #d7c8b1` |

Ou seja: **o elemento fechado é a própria pílula “MENU” do cabeçalho**. Não
existe um painel separado que aparece; existe um plano que cresce. Como o
raio de 144px permanece constante enquanto o plano vai de 62px a 4363px, o
que se vê durante a transição é uma curva enorme e macia atravessando o
viewport na diagonal.

Duas animações sobrepostas:

| Animação | De → para | Duração | Curva |
| --- | --- | --- | --- |
| Translação diagonal | `(0,0)` → `(8vw, -8vw)` | ~790ms, após ~280ms de atraso | **easeOutQuart** |
| Expansão | `10em×4em` → `280em×280em` | > 2s (amostragem degradada pelo custo) | saída acentuada |

O ajuste de curva foi feito sobre 27 quadros úteis. Comparando com curvas
canônicas em tempo normalizado:

| τ | medido | easeOutCubic | **easeOutQuart** |
| --- | --- | --- | --- |
| 0.109 | 0.370 | 0.293 | **0.369** |
| 0.317 | 0.756 | 0.681 | **0.782** |
| 0.502 | 0.941 | 0.876 | **0.939** |
| 0.640 | 0.982 | 0.953 | **0.983** |

Equivalente CSS: `cubic-bezier(0.165, 0.84, 0.44, 1)`.

**Custo:** animar `width`/`height` de um elemento de 4363px força layout e
paint a cada quadro. Ver divergência D-01 em
[`implementation-notes.md`](../documentacao/implementation-notes.md).

### 6.2 Anatomia do menu aberto

`display: grid`, `grid-template-columns: 806.391px 532.797px` (razão
**1.514 ≈ 3:2**), `grid-template-rows: 828px 72px` — a segunda linha reserva
exatamente a altura da barra de serviços, que continua visível.

Divisórias em **régua preta de 3px** (`.menu-vertical-line` 3×828px em
`left: 803.391px`; `.menu-horizontal-line` 1440×3px em `y=828`). Não é
filete: é regra editorial.

Links: Darker Grotesque 700, **112.32px (7.207em)**, entrelinha 1.14,
`letter-spacing: 0.2px`. Sete destinos: Connect, About us, Giving, Church
life, Plan your visit, Ministries, Events.

No celular a coluna de apoio desaparece por completo (`display: none`) e só
os ícones sociais sobrevivem; os links caem para 39px (3.125em).

### 6.3 Transição de página

`.transition` → `.transition-bg` com `scale3d(0, 0, 1)` em repouso, dentro
dela duas linhas de texto: o nome do site e **o nome da página de destino**,
gravado por página no HTML (`is--home`, `is--plan-your-visit`, `about us`,
`connect`).

O clique em link interno **destrói o contexto de execução** — é navegação
real. O padrão é: interceptar o clique, escalar o plano até cobrir a tela
mostrando para onde se vai, e então navegar.

> **Princípio derivado:** a transição não é enfeite; ela informa o destino
> pelo nome.

---

## 7. Sistema de movimento (passo 5)

### 7.1 Revelação de texto — **parâmetros exatos**

`ScrollTrigger.getAll()` e `gsap.globalTimeline.getChildren()` expuseram os
valores reais:

| Parâmetro | Valor |
| --- | --- |
| Propriedades | `opacity`, `x` |
| Estado inicial | `translate(1em, 0)`, `opacity: 0` |
| Duração | **0.8s** |
| Atraso | **0.35s** |
| Easing | **`power2.out`** (cúbica de saída) |
| Stagger | **`{ amount: 0.2 }`** |
| Trigger | `start: "top bottom"`, `toggleActions: "play"` |

O `stagger: {amount: 0.2}` é o detalhe que importa: é um **orçamento total**,
não um atraso por item. Um título de 3 palavras e outro de 28 terminam
juntos. Reproduzido em `Atrio.distribuirStagger`, com teste unitário.

O texto é fatiado por **letra** com SplitType — e é daí que vem o pior
defeito de acessibilidade do site (§9).

**Defeito observado:** há 8 ScrollTriggers para 4 elementos. Cada gatilho
está registrado duas vezes, sinal de que o script de inicialização roda em
duplicidade.

### 7.2 Palco com scrub por scroll

`.love-in-action-container`: `position: sticky`, 100vh, `overflow: hidden`.
Dezoito `<span>` em `rama-gothic-e` de 185.145px, posicionados no fluxo e
espalhados por CSS. O scroll conduz apenas `opacity` e `translateY`.

Amostragem em dez posições (janela de scroll ≈ **530px**):

| scrollY | l1 | l4 | i2 | a1 | s6 |
| --- | --- | --- | --- | --- | --- |
| 1582 | 0.88 | 0.13 | 0.00 | 0.00 | 0.00 |
| 1750 | 1.00 | 1.00 | 0.71 | 0.56 | 0.00 |
| 1900 | 1.00 | 1.00 | 1.00 | 1.00 | 0.62 |
| 2050 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 |

As faixas de cada letra **se sobrepõem** — é por isso que a revelação lê
como onda e não como bloco. Os deslocamentos iniciais estão separados por
exatamente **9.257px** entre letras vizinhas, ou ~0.05em do próprio glifo.

Uma única cor (preto) com alfa variável produz toda a profundidade. Não há
cinzas na paleta desse bloco.

### 7.3 Marquee

`.marquee-container` com `overflow: hidden` e dois trilhos duplicados
(`is-1`, `is-2`) — laço sem salto. Conduzido por JavaScript
(`transform: matrix(...)`), não por `@keyframes` (`animation: none`).

Velocidade medida por delta de `matrix()` em 1s: **≈186 px/s**, ou
**~11.9em/s**. Conteúdo vindo do CMS.

### 7.4 `prefers-reduced-motion`

**Zero regras** em 1685 varridas. Também zero para `prefers-contrast` e
`forced-colors`. Nenhuma container query.

---

## 8. Rede, integrações e desempenho (passo 6)

### 8.1 Rede

72 requisições na homepage. Terceiros identificados:

`cdn.prod.website-files.com` · `d3e54v103j8qbb.cloudfront.net` ·
`cdnjs.cloudflare.com` · `cdn.jsdelivr.net` · `unpkg.com` ·
`ajax.googleapis.com` · `use.typekit.net` · `fonts.googleapis.com` ·
`fonts.gstatic.com` · `consent.cookiebot.com` · `consentcdn.cookiebot.com` ·
`assets.flodesk.com` · `www.googletagmanager.com` ·
`www.google-analytics.com` · `b13qux.csb.app`

Integrações de produto descobertas nas páginas internas:
`soulchurchnorwich.churchcenter.com` (Planning Center),
`soul.churchsuite.com`, `portal.trustbridgeglobal.com` (doações),
`soulchurch.myflodesk.com` (newsletter), `soulchurch.pixieset.com` (fotos),
`maps.app.goo.gl`, YouTube, Instagram, Facebook, Apple Podcasts.

### 8.2 Fragilidades observadas

| # | Achado | Evidência |
| --- | --- | --- |
| 1 | **Script de animação hospedado em CodeSandbox e bloqueado** | `b13qux.csb.app/script.js` → `net::ERR_BLOCKED_BY_ORB` + issue de CORB no console |
| 2 | **jQuery baixado 4 vezes** | reqids 456, 484, 512 e mais |
| 3 | **Preloads com `integrity` divergente** | 5 avisos “preload … not used due to an integrity mismatch” — os recursos são baixados duas vezes |
| 4 | **Analytics dispara com consentimento recusado** | após clicar “Deny”: `POST …/ga/g/c?…tid=G-YWX2PJD58B` e `POST google-analytics.com/g/s/collect` |
| 5 | Proxy de 1ª parte para GA | caminho ofuscado no próprio domínio, padrão de evasão de bloqueadores |

O item 4 é o mais sério e é o motivo pelo qual a reconstrução **não carrega
nenhum script de terceiro, cookie ou rastreador**.

### 8.3 Desempenho

| Métrica | Laboratório (sem throttle) | Campo (CrUX p75) |
| --- | --- | --- |
| LCP | 1353ms | **2128ms** |
| CLS | 0.06 | **1.64** |
| INP | — | 98ms |

O CLS de campo é catastrófico (bom < 0.1). Os culpados apontados pelo trace
são as **fontes web**: Darker Grotesque, DM Sans e DM Mono. Com display a
8.33em (≈130px), qualquer diferença de métrica entre a fonte de fallback e a
definitiva desloca dezenas de pixels de conteúdo. O insight `FontDisplay`
estima 420ms de ganho de FCP só ajustando a estratégia de carregamento.

> **Lição levada para a reconstrução:** com tipografia display desse tamanho,
> `font-display` e correspondência de métrica do fallback não são refinamento
> — são a diferença entre 0.06 e 1.64.

### 8.4 Lighthouse (snapshot, desktop)

Acessibilidade 93 · Boas práticas 100 · SEO 83 · Agentic Browsing 0.

Falhas automáticas: `aria-prohibited-attr` (setas do Splide),
`link-name` (link do logotipo no rodapé sem nome), `link-text` (três
“LEARN MORE” indistinguíveis).

A nota 93 subestima o problema: o que a auditoria automática não vê está em
§9.

---

## 9. Acessibilidade (passo 7) — defeitos a **não** reproduzir

Principal insumo negativo da reconstrução.

| # | Defeito | Evidência |
| --- | --- | --- |
| 1 | **Nome acessível destruído pelo fatiamento** | `<h1>` vira `<span class="char">` letra a letra; a árvore acessível lê “T h i s i s H o m e” |
| 2 | **Menu inacessível por teclado** | `focusableInNav: 0` — o gatilho é um `<p>` mais um `<div>` com Lottie; não há `<button>` |
| 3 | **Foco não entra no menu nem no painel** | com o overlay aberto, `document.activeElement` continua em `BODY` |
| 4 | **Fundo permanece focável** | `page-main` sem `inert`; links do hero seguem tabuláveis por trás do menu |
| 5 | **Sem `role="dialog"` / `aria-modal`** | ambos os overlays são `div` sem papel |
| 6 | **Zero `:focus-visible`** | 0 regras em 1685; anel de foco é o padrão do navegador |
| 7 | **Zero `prefers-reduced-motion`** | 0 regras — inclusive para os marquees contínuos |
| 8 | **Zero `forced-colors` e `prefers-contrast`** | 0 regras |
| 9 | **Campos de formulário sem rótulo** | 3 de 5 campos por formulário sem `<label>` nem `aria-label`; só o consentimento tem rótulo |
| 10 | **Feedback de formulário não anunciado** | `.w-form-done`/`.w-form-fail` têm `role="region"` e `aria-label`, mas **nenhum `aria-live`** |
| 11 | **Controles são `<div>`** | setas do carrossel e ícone do painel de contato não são botões |
| 12 | **Alvos de toque pequenos** | em 390×844, **25 de 35** alvos abaixo de 44×44px |
| 13 | **Sem link de salto** | nenhum em nenhuma página inspecionada |
| 14 | **Rodapé sem landmark** | `<div class="footer">` sem `role="contentinfo"` |
| 15 | **Duas `<h1>` na mesma página** | `/plan-your-visit` |
| 16 | **Toda a fotografia marcada como decorativa** | `alt=""` em 14/14 imagens em `/plan-your-visit` e 21/21 em `/connect` |

Nota sobre o item 16: `alt=""` é sintaticamente válido e por isso o
Lighthouse não reclama. Mas num site cuja mensagem é acolhimento, marcar
**toda** a fotografia de pessoas como decorativa retira do leitor de tela
justamente a informação que o site quer transmitir.

---

## 10. Padrões de conteúdo e CMS

| Padrão | Evidência |
| --- | --- |
| Coleções Webflow | 9 `.w-dyn-list` e 22 `.w-dyn-item` na homepage |
| **Estado vazio colapsa** | duas listas de banner em `.w-dyn-empty` → `aside.banner` com altura 0 |
| Marquee alimentado por CMS | `.navbar-marquee-collection-list`, `.maruqee-collection-list` (typo no original) |
| Cartão de destaque | `/events`: 1 cartão azul entre 9, apontando para o calendário |
| Newsletter delegada | “SIGN UP” é link externo para Flodesk, não formulário embutido |
| Rótulo de transição por página | texto do destino gravado no HTML de cada página |

Templates identificados:

| Template | Páginas | Casca |
| --- | --- | --- |
| Editorial com hero | `/`, `/about-us`, `/plan-your-visit`, `/connect` | hero + barra + lajes + rodapé |
| Listagem | `/events` | **sem hero, sem barra**; laje única em `wheat` |

---

## 11. Limitações — o que não foi possível apurar

| Item | Bloqueio | Evidência disponível | Solução adotada |
| --- | --- | --- | --- |
| Conteúdo do script de animação | bloqueado por ORB antes de executar | classes e transforms resultantes no DOM | Motor próprio, escrito do zero |
| Timelines exatas do IX2 | interações do Webflow não são inspecionáveis | estados inicial e final medidos, curva ajustada por amostragem | Curvas próprias, documentadas como decisão |
| Duração exata da expansão do menu | a amostragem degrada porque a própria animação satura o quadro | > 2s, com desaceleração acentuada | 790ms adotados na reconstrução, com justificativa |
| Conexão lenta / throttling | não testado | — | **Declarado não verificado** |
| Leitor de tela real | não executado | árvore acessível inspecionada | Conclusões limitadas ao que a árvore mostra |
| Envio real de formulário | não submetido — enviar dados a terceiro em auditoria seria indevido | estrutura, `action`, `method` e campos lidos | Formulário local simulado |
| Textura da classe `is-noise` | `background-image: none` | classe existe, efeito não | Registrado como nome herdado sem efeito |
| Comportamento com JS desligado | não testado na referência | — | Declarado não verificado |

---

## 12. Síntese — o sistema de decisões

O que faz esta experiência funcionar, independente da marca:

1. **A escala é uma só.** Um `font-size` fluido comanda tipografia,
   moldura, raio e cartão. Nada escala sozinho.
2. **Seções são lajes, não faixas.** Blocos arredondados empilhados, com o
   de baixo passando sob o de cima.
3. **A assimetria é luxo de desktop.** Acima de 992px a moldura e a grade
   são deliberadamente irregulares; abaixo, tudo vira simétrico.
4. **Um só acento.** Um cartão azul por grade, nunca dois.
5. **O gatilho vira o painel.** A pílula do menu é o menu.
6. **A transição diz o destino.** O nome da página aparece durante a
   navegação.
7. **O horário nunca sai da tela.** A barra persistente com horários e um
   caminho de contato é o que mais reduz ansiedade de quem visita pela
   primeira vez.

Estes sete princípios são o que a reconstrução preserva. Ver
[`design-principles.md`](../documentacao/design-principles.md).

---

## 13. Fronteiras de propriedade intelectual

- Nenhum texto editorial, logotipo, fotografia, vídeo, ícone, Lottie, fonte,
  folha de estilo, bundle ou conteúdo de CMS da referência foi copiado.
- Nenhum endpoint, identificador de integração, script de analytics ou de
  consentimento foi reproduzido.
- A reconstrução **Átrio** usa paleta, tipografia, geometria, conteúdo e
  código próprios, sob identidade demonstrativa fictícia.
- As capturas nesta pasta são registro de auditoria, na resolução mínima
  necessária, e não são carregadas por nenhuma página da reconstrução —
  garantido por teste em [`../testes/fronteiras.test.js`](../testes/fronteiras.test.js).

Detalhamento em
[`asset-and-license-boundaries.md`](../documentacao/asset-and-license-boundaries.md).
