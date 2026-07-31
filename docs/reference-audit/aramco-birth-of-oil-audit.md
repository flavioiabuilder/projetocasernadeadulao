# Auditoria de referência — Aramco "The Birth of Oil"

**URL:** `https://www.aramco.com/en/about-us/our-history/the-birth-of-oil`
**Data:** 2026-07-31
**Ferramenta:** Chrome DevTools MCP (Chrome 150, `chrome-devtools-mcp --isolated`)
**Status:** auditoria executada — experiência percorrida e medida

> Material de auditoria, não ativo de produção. Cada afirmação é marcada como
> **evidência** (medida ou lida do runtime) ou **inferência**. Nenhum texto,
> logotipo, fonte, textura, modelo, áudio ou código da referência foi copiado
> para este repositório. As capturas em `capturas/` são registro de auditoria.

---

## 0. Nota sobre a tentativa anterior

Uma auditoria anterior, feita com o navegador embutido do agente, registrou que
a experiência **não renderizava**: `#ig-wrapper` com `display:none` e zero
filhos. Com o Chrome real ela carrega normalmente — o que confirma a primeira
hipótese daquele documento (gate de user-agent ou de capacidade gráfica) e
descarta a de consentimento, já que os cookies não essenciais continuam
recusados nesta sessão. Este documento substitui aquele resultado.

---

## 1. Arquitetura em uma frase

Um app autônomo de WebGL sobreposto a um site institucional React: o scroll
nativo é desligado e substituído por progressão discreta de cenas, cada uma um
palco de viewport inteiro onde texto DOM se sobrepõe a um corpo mineral
renderizado em Three.js.

## 2. Stack — evidência vs. inferência

| Item | Status | Evidência |
|---|---|---|
| Three.js **r158** | evidência | `data-engine="three.js r158"` na `<canvas>`; `window.__THREE__ === "158"` |
| GSAP | evidência | warning de console: `GSAP target undefined not found. https://greensock.com` |
| Lenis | evidência | classes `lenis lenis-smooth lenis-stopped` nos painéis "learn more" |
| Texto MSDF dentro do WebGL | evidência | assets `textures/msdf/manifa-en.png` + `manifa-en.json` |
| App isolado do site | evidência | bundle único `/ig/oil/aramco-app.js`; `ig` = Immersive Garden, estúdio nomeado em `data-rendering="Content_ImmersiveGarden"` |
| Host Vite + React | evidência | `dist/client/assets/*-[hash].js`, chunks `react-markdown`, `react-hook-form`, `vendor-*` |
| Chakra UI no host | evidência | única custom property global é `--chakra-vh`; classes atômicas `css-*` |
| Lenis só nos painéis editoriais | inferência | as classes só aparecem em `.learn-more-section`; a progressão principal não tem scroll nativo |

O host **não expõe design tokens**: em 1696 regras CSS varridas há uma única
custom property (`--chakra-vh`). Tudo abaixo vem de medição de estilo computado.

## 3. Cartografia da experiência (passo 1)

Filhos diretos de `#ig-application`, em ordem de empilhamento:

| # | Elemento | Papel | z-index |
|---|---|---|---|
| 1 | `#ig-canvas-wrapper > canvas` | cena WebGL | base |
| 2 | `#loader` | carregamento, "Loading" letra a letra | auto |
| 3 | `.cursor` | cursor customizado com rótulo | 20 |
| 4 | `#intro` | portão de entrada: logo, `h1.sr-only`, botão **Start** | auto |
| 5 | `.header` | `.left` som · `.right` menu | 10 |
| 6–8 | `.chapter` × 3 | capítulos com 4, 6 e 2 slides | auto |
| 9 | `#longpress` | mapa de capítulos com `.progress-map` e `.drag` | 1 |
| 10–16 | `.learn-more-section` × 7 | painéis editoriais com scroll Lenis | auto |
| 17–19 | `.interchapter` × 3 | transições entre capítulos | auto |
| 20 | `.end` | estado final, com "Restart the experience" | auto |

Ordem narrativa: **intro → cap. I (4 slides) → interchapter → cap. II (6) →
interchapter → cap. III (2) → end**. 12 slides em 3 capítulos, mais 7 painéis
"learn more" sob demanda.

Estados observados:

- **A entrada é bloqueada por gesto explícito.** Nada anima antes do clique em
  *Start*. Resolve autoplay de áudio e dá ao carregamento um lugar honesto.
- **O scroll nativo não existe.** `body{overflow:hidden}` e
  `document.scrollHeight === window.innerHeight`. Roda, arraste e teclado viram
  avanço/recuo de slide.
- **Pressão longa** (`.longpress-cta`, rótulo "Explore") abre o mapa com arraste.
- **Recarregar volta ao início.** A rota não muda durante a experiência, então o
  botão voltar do navegador sai do artigo em vez de voltar uma cena.

## 4. Captura multirresolução (passo 2)

Manifesto em [`capturas/MANIFESTO.md`](capturas/MANIFESTO.md).

## 5. Design system extraído (passo 3)

### 5.1 Tipografia — **escala conduzida pela altura**

O achado mais estrutural. Mesmo `h2`, três viewports:

| Viewport | `h2` font-size | line-height | corpo |
|---|---|---|---|
| 1440 × 900 | 70.000px | 56.000px | 16.000px |
| 1024 × 768 | 64.512px | 51.610px | 16.000px |
| 1370 × 637 | 53.508px | 42.806px | 14.014px |

64.512 ÷ 768 = 0.0840 e 53.508 ÷ 637 = 0.0840 — constante. Em 900px de altura,
8.4% daria 75.6px, mas observa-se 70px: há teto.

> **Display = `min(8.4vh, 70px)`, entrelinha 0.80**
> **Corpo = `min(2.2vh, 16px)`, entrelinha 1.60**
> **Rótulo = 12px, entrelinha 1.30**

A tipografia escala pela **altura**, não pela largura, porque cada cena é um
palco de viewport fixo: o texto precisa caber verticalmente ao lado do objeto 3D,
e a largura já está resolvida por uma coluna de medida fixa. É o oposto do
`clamp()` sobre `vw` que quase todo design system usa.

Entrelinha do display **abaixo de 1** (0.80) é o que dá o aspecto compacto e
monumental ao título.

Famílias proprietárias, **não transferidas**: `ManifaPro2` (display, 400/453) e
`Ghawar` (corpo, 300). Substituição documentada em
[`asset-and-license-boundaries.md`](../design-system/asset-and-license-boundaries.md).

### 5.2 Cor

| Papel | Valor medido |
|---|---|
| Texto display | `rgb(244,255,243)` |
| Texto corpo | `#FFFFFF` |
| Texto do cabeçalho | `rgb(235,254,233)` |
| Fundo da ação primária | `#FFFFFF` |
| Texto da ação primária | `rgb(104,122,126)` |
| Filete | `rgba(235,254,233,0.2)` |

Nenhum preto puro em texto. A **única** superfície de alto contraste em toda a
experiência é o botão branco sólido "Learn more" — é assim que a ação primária
se destaca sem cor de marca.

### 5.3 Espaço e geometria

| Token | ≥768px | <768px |
|---|---|---|
| Moldura (padding do cabeçalho) | `60px 60px 0` | `32px 30px` |
| Coluna editorial | `450px` | `300px` |
| Altura reservada do cabeçalho | `134px` | `80px` |
| Raio da ação primária | `5px` | idem |
| Raio da ação secundária | `30px` (pílula) | idem |

Padding da ação primária: `13px 40px 13px 15px` — assimétrico, abrindo espaço à
direita para o ponto decorativo.

### 5.4 Breakpoint

**Medido, não suposto.** Em 768px o layout ainda é desktop (moldura 60px, rótulo
"Sound" visível); em 767px já é mobile (moldura 32/30px, rótulo oculto,
`--ig-header-height` 134px → 80px).

> Breakpoint estrutural único: **768px**.

## 6. Sistema de movimento (passo 4)

### 6.1 Revelação por linhas com paralaxe de profundidade

O padrão central. O texto é fatiado e cada peça entra de um deslocamento
horizontal de magnitude **hierárquica**:

| Elemento | `transform` inicial observado |
|---|---|
| `.slide` (contêiner) | `translate3d(2740px, 0, 0)` |
| `h2` | `translate3d(300px, 0, 0)` |
| `.slide-line` (linha do título) | `translate3d(150px, 0, 0)`, `opacity: 0` |
| linha do parágrafo | `translate3d(50px, 0, 0)`, `opacity: 0` |

Quanto mais ao fundo na hierarquia editorial, **menor** o deslocamento: título
150px, corpo 50px. Isso produz paralaxe dentro do próprio texto — a revelação tem
profundidade, não é fade uniforme. Os três valores (50 / 150 / 300) viram tokens
de distância.

Todo movimento é `transform` + `opacity`; nenhuma propriedade de layout é animada.

### 6.2 Outros padrões

- **Progressão discreta**, não scrub contínuo: cada gesto avança uma unidade.
- **Onda sonora**: `.scrollpane` com `translate3d(-98.99px,0,0)` deslizando sobre
  SVGs repetidos.
- **Cursor** amortecido, com estado por `data-cursor="pointer"`.
- **Interchapter**: cena dedicada entre capítulos, não transição direta.

### 6.3 `prefers-reduced-motion`

**Zero regras** em 1696 varridas — nem `prefers-contrast`. Ver §7.

## 7. Acessibilidade (passo 6) — defeitos a **não** reproduzir

Principal insumo negativo da reconstrução.

| # | Defeito | Evidência |
|---|---|---|
| 1 | **Nome acessível destruído pelo split de texto** | itens do mapa com `aria-label="I T h e b i r t h o f o i l …"` — letra a letra, porque o rótulo foi montado concatenando os spans da animação. O leitor de tela soletra o título |
| 2 | **Todos os itens anunciam "You are here"** | os 12 `.bullet` terminam com `You are here` simultaneamente; nenhum `aria-current` distingue o atual |
| 3 | **Zero `prefers-reduced-motion`** | 0 ocorrências em 1696 regras |
| 4 | **Zero `prefers-contrast`** | idem |
| 5 | **`<canvas>` opaca** | sem `role`, sem `aria-label`, sem fallback |
| 6 | **Nenhuma live region** | `[aria-live]` em `#ig-application`: 0. A troca de cena não é anunciada |
| 7 | **Menu sem nome útil** | `aria-label="button"` |
| 8 | **7 botões "Learn more" indistinguíveis** | nenhum com `aria-label` |
| 9 | **Narrativa fora da árvore** | antes de *Start* a árvore contém só `h1`, `Start`, `Sound` e um botão sem nome; os 12 `h2` ficam em contêineres `display:none` |

O widget UserWay presente é sobreposição de terceiros; não corrige nenhum item.

## 8. Rede, ativos e desempenho (passo 5)

158 requisições, ~6.2 MB.

| Ativo | Tamanho | Observação |
|---|---|---|
| `textures/earth-topography.jpg` | 1476 KB | maior ativo isolado |
| `models/BirthOfOil.glb` | 1148 KB | modelo único |
| `audio/main.mp3` | 683 KB | trilha ambiente |
| `textures/depths.jpg` | 452 KB | |
| `textures/earth-lightmap.jpg` | 320 KB | lightmap pré-calculado |
| `textures/rock-RG_normal-B_Diffuse.jpg` | 181 KB | **canais empacotados**: normal em RG, difuso em B |
| `textures/msdf/manifa-en.png` + `.json` | 96 KB | atlas MSDF para texto dentro do WebGL |
| `audio/voiceover-en/chapter-N-*.mp3` | ~285 KB/faixa | narração por parágrafo |
| `audio/{open,close,click,hover}.mp3` | 17–22 KB | design sonoro de interface |
| 3 × `woff2` | 136 KB | ManifaPro2 Regular/SemiBold, Ghawar Light |

Estratégias de desempenho confirmadas:

1. **DPR limitado a 2.** Em 390×844 com `devicePixelRatio: 3`, a canvas é
   780×1688 — razão 2.00.
2. **Empacotamento de canais** de textura.
3. **Lightmap assado** em vez de iluminação dinâmica.
4. **Carregamento sob demanda**: nenhum ativo da experiência antes do *Start*.

## 9. O que não foi possível apurar

| Item | Bloqueio | Evidência disponível | Solução adotada |
|---|---|---|---|
| Durações e easings exatos | GSAP empacotado; timelines não inspecionáveis | classes de estado, transforms lidos em quadros isolados | Curvas próprias, documentadas em `motion-system.md` como decisão nossa, não medição |
| Conteúdo dos shaders | código proprietário minificado | tipos e nomes das texturas | Shader original escrito do zero |
| Geometria do GLB | ativo proprietário, não baixado | silhueta esférica nas capturas | Esfera implícita procedural |
| Conexão lenta | não testado sob throttling | — | Declarado não verificado |
| Lighthouse na referência | não executado — auditar site de terceiro sob consentimento recusado distorce o resultado | — | Lighthouse rodado só na reconstrução |
| Sincronia exata voiceover ↔ slide | áudio não reproduzido (som desligado por padrão) | nomes dos arquivos por capítulo/parágrafo | Não reproduzido; a demo não carrega mídia |

## 10. Síntese: o sistema de decisões

O que faz esta experiência funcionar, independente da marca:

1. **O palco é fixo; o conteúdo é discreto.** Viewport inteiro, sem scroll
   nativo, progressão unidade a unidade.
2. **A tipografia escala pela altura**, porque o palco é limitado na vertical.
3. **A profundidade vem do movimento, não da sombra.** Deslocamentos
   hierárquicos criam paralaxe; não há uma sombra projetada sequer na cena.
4. **Um só elemento de alto contraste por cena** — a ação primária branca.
5. **O ambiente é contínuo; o editorial é episódico.** A cena 3D nunca corta; o
   texto entra e sai sobre ela.
6. **A entrada é consentida.** Nada se move antes do gesto do usuário.
7. **A moldura é constante** (60/30px), dando estabilidade a um conteúdo que muda
   o tempo todo.

Estes sete princípios são o que a reconstrução preserva. Ver
[`design-principles.md`](../design-system/design-principles.md).
