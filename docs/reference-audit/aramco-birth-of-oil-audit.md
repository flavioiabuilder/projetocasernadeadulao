# Auditoria de referência — Aramco “The Birth of Oil”

**URL:** `https://www.aramco.com/en/about-us/our-history/the-birth-of-oil`
**Data:** 2026-07-31
**Ferramenta usada:** navegador embutido do Claude (Chromium 148, UA `Claude/1.24012.9`)
**Status:** **auditoria parcial — a experiência imersiva não pôde ser observada**

> Este documento é material de auditoria, não ativo de produção. Registra apenas
> o que foi tecnicamente verificado. As seções marcadas como *não observável*
> permanecem vazias de propósito: preenchê-las sem evidência seria invenção.

---

## 1. Resultado sumário

A página **não renderizou a experiência imersiva** neste ambiente. Só o *shell*
institucional (cabeçalho, navegação, rodapé) foi renderizado. Nenhum quadro da
narrativa, cena, capítulo ou animação chegou a existir no DOM.

Consequência: os passos 1 (cartografia), 2 (captura multirresolução) e 4 (sistema
de movimento) do protocolo de investigação **não puderam ser executados**.

## 2. Evidência do bloqueio

DOM completo do contêiner da experiência, após carregamento e recarga:

```html
<div data-rendering="Content_ImmersiveGarden" id="1a5b75ad-…">
  <section class="css-or5elr">
    <div class="css-ljfgun"></div>
    <div id="ig-wrapper" style="display:none" class="css-0"></div>
  </section>
</div>
```

Medições:

| Verificação | Valor observado |
|---|---|
| `<main>` innerHTML | 241 caracteres (só o shell acima) |
| `#ig-wrapper` | `display:none`, **0 filhos** |
| `<section>` da experiência | 1280 × **10px** |
| `document.scrollHeight` | 720px (= altura do viewport; sem página) |
| Headings `h1`/`h2`/`h3` do artigo | nenhum |
| Mensagens de console | **nenhuma** |
| `<canvas>` | 0 |
| `<video>` | 0 |
| Globais `THREE` / `gsap` / `Lenis` / `ScrollTrigger` | ausentes |

Ambiente gráfico do agente (portanto **não** era falta de suporte a WebGL):

| Capacidade | Valor |
|---|---|
| WebGL | **2.0 disponível** (`OpenGL ES 3.0 Chromium`) |
| Renderer | ANGLE (Intel HD Graphics 3000, Direct3D11) — GPU de 2011 |
| `deviceMemory` | 4 GB |
| `hardwareConcurrency` | 4 |
| `prefers-reduced-motion` | `false` |

### Hipóteses para o bloqueio (não confirmadas)

1. **Gate de User-Agent.** O navegador embutido identifica-se como
   `Claude/1.24012.9`; um caminho de “browser não suportado” explicaria a
   ausência total de erros no console.
2. **Gate de capacidade de GPU.** Intel HD Graphics 3000 (2011) é comumente
   colocada em blocklist por experiências WebGL pesadas. Um *capability check*
   que decide não iniciar seria, em si, uma decisão de design correta.
3. **Gate de consentimento.** Os cookies não essenciais foram recusados
   (opção mais preservadora de privacidade). Não foi possível isolar se a
   experiência depende disso.

Nenhuma das três foi confirmada: seria necessário um segundo navegador com UA
normal para discriminar entre elas. O Chrome real (extensão *Claude in Chrome*)
não está conectado nesta máquina.

## 3. Stack detectada — evidência de rede

Registro de rede (todas as respostas **200**; nenhuma falha ou bloqueio):

**Confirmado por evidência:**

- **React** com renderização em ilhas — atributos `data-rendering` e marcadores
  de Suspense (`<!--$-->` / `<!--/$-->`) no HTML servido.
- **Chakra UI / Emotion** — classes atômicas em runtime (`css-or5elr`,
  `css-ljfgun`, `css-0`). Ver §4.
- **Vite** como bundler — nomes de chunk com hash no padrão
  `dist/client/assets/<nome>-<hash>.js`.
- **react-markdown + micromark + remark-gfm** — conteúdo editorial vem de
  Markdown, não de HTML fixo. (~25 chunks do ecossistema micromark.)
- **react-hook-form** — há formulários em algum ponto do site.
- **Code splitting por componente**: `AramcoCom_Header-*.js`,
  `Navigation_FooterNavigation-*.js`, `Content_ImmersiveGarden-*.js`.
- **OneTrust** (`otSDKStub.js`, `otBannerSdk.js`) para consentimento.
- **Google Tag Manager / GA4 / Google Ads** (`GTM-PQ97PVQ`, `G-47FGP66ZSB`,
  `DC-9706120`).
- Widget de acessibilidade de terceiros (`remediation-tool.js`,
  `widget_app_base_*.js`, `nav_menu_helper_*.js`).

**Inferência (não confirmada):**

- O nome `Content_ImmersiveGarden` sugere autoria do estúdio criativo
  **Immersive Garden**. O chunk carregado é apenas o *wrapper* de montagem
  React — o runtime da experiência propriamente dita nunca foi buscado.

**Explicitamente NÃO observado** (portanto não afirmável):

- three.js, GSAP, Lenis, ScrollTrigger ou qualquer biblioteca de animação
- qualquer `<canvas>`, contexto WebGL, shader, textura ou modelo 3D
- qualquer vídeo, áudio ou spritesheet da narrativa
- service worker, web worker, scroll hijacking, pinning, snap

## 4. Design system global — o que foi extraído

Extraído por `getComputedStyle` sobre os elementos realmente renderizados
(cabeçalho, navegação, rodapé). **Não representa a experiência narrativa.**

### 4.1 Achado estrutural

O site **não expõe design tokens**. Existe exatamente **uma** custom property em
`:root` — `--chakra-vh: 100vh`. Todo o resto é classe atômica gerada em runtime
pelo Emotion. Não há folha de estilo externa: 83 blocos `<style>` inline.

Ou seja: **não existe um design system extraível ali**. Os valores abaixo são
engenharia reversa de estilos computados, não a fonte da verdade do sistema.

### 4.2 Tipografia — proprietária

| Família | Papel | Pesos observados |
|---|---|---|
| `ManifaPro3` | display / eyebrow | 300, 900 |
| `Ghawar` | texto | 300, 400, 600 |

Ambas são tipografias corporativas sob medida da Aramco, licenciadas para o
domínio deles. **Os arquivos não devem ser transferidos.** Carregadas com
`font-display: swap`.

Escala observada (viewport 1280 × 720):

| Papel | Tamanho / entrelinha | Peso | Tracking | Caixa |
|---|---|---|---|---|
| Eyebrow / kicker | 16px / 36px | 600 | +1.12px | UPPERCASE |
| Corpo | 16px / 24px | 400 | normal | — |
| Corpo menor, meta | 14px / 21px | 400 | normal | — |
| Link de navegação | 14px / 18px | 400 | +0.28px | — |

O padrão reutilizável é o *eyebrow*: display em caixa alta, tracking aberto e
entrelinha muito folgada (36px para corpo de 16px). Independe da fonte.

### 4.3 Cor

| Papel | Valor |
|---|---|
| Texto primário | `#1F1F1F` |
| Texto secundário | `#323232` |
| Texto terciário / meta | `#5F6369`, `#696968` |
| Acento / link | `#007FAD` |
| Acento alternativo | `#1371C3` |
| Superfície | `#FFFFFF` |
| Overlay | `rgba(0,0,0,.5)` |

Disciplina observada: **nenhum preto puro em texto corrido** — sempre grafite.

### 4.4 Raios

`2px`, `5px`, `8px`, `12px`, `50%` (circulares).

### 4.5 Não observável

Espaçamento da narrativa, grid da experiência, breakpoints medidos, camadas de
profundidade, blur/máscara/grain, iconografia da experiência, estados de
controle, comportamento fluido, movimento, ambientação, transições, progressão
narrativa, estados de carregamento e acessibilidade da experiência —
**tudo isso permanece não medido**, porque a experiência não renderizou.

## 5. Limitações desta auditoria

1. **Chrome DevTools MCP indisponível.** O comando `/plugin` não existe neste
   ambiente; não há skill `chrome-devtools` nem ferramentas
   `mcp__chrome-devtools__*`. Portanto não houve `performance_start_trace`,
   `lighthouse_audit`, `emulate`, `screencast_start` nem `new_page`.
2. **Captura de tela indisponível.** O painel do navegador embutido não estava
   sendo exibido, então não compõe frames: toda tentativa de screenshot
   expirou. A investigação foi feita por DOM, estilos computados, rede e
   console.
3. **Captura multirresolução não realizada.** Sem conteúdo para capturar, medir
   os sete viewports pedidos não produziria informação.
4. **Chrome real não conectado.** A extensão *Claude in Chrome* não está
   instalada ou não está autenticada nesta máquina.

## 6. Como retomar

Para tornar a experiência observável, na ordem de menor esforço:

1. Instalar e autenticar a extensão *Claude in Chrome*
   (<https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn>),
   abrindo a URL num Chrome com UA normal. Discrimina a hipótese 1 do §2.
2. Configurar o `chrome-devtools-mcp` manualmente como servidor MCP (o
   `/plugin` não está disponível aqui), habilitando trace, Lighthouse e
   emulação de dispositivo.
3. Alternativa sem ferramenta: gravar a experiência em vídeo/capturas no
   navegador do usuário e fornecer os arquivos para análise.
