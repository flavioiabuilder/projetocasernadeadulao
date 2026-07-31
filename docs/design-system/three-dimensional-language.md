# Estratos — linguagem tridimensional

## O que a referência faz

| Elemento      | Evidência                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Motor         | Three.js **r158** (`data-engine` na canvas, `window.__THREE__`)                                    |
| Geometria     | um `BirthOfOil.glb` de 1148 KB                                                                     |
| Texturas      | 9 arquivos, 2.6 MB — topografia, lightmap, profundidade, normais, padrão, ruído, envmap, gradiente |
| Texto em 3D   | atlas **MSDF** (`msdf/manifa-en.png` + `.json`)                                                    |
| Canvases      | **uma só**, em tela cheia                                                                          |
| Iluminação    | lightmap **assado**, não dinâmica                                                                  |
| Empacotamento | `rock-RG_normal-B_Diffuse.jpg` — normal em RG, difuso em B                                         |

Composição: um corpo esférico à esquerda do centro, sob campo atmosférico
gradiente, com linha de horizonte luminosa atravessando a cena e o texto DOM
sobreposto à direita.

## O que reconstruímos, e por quê diferente

**Decisão: WebGL cru, sem engine.**

| Critério                              | Three.js                                 | WebGL cru      |
| ------------------------------------- | ---------------------------------------- | -------------- |
| Peso                                  | ~600 KB minificado                       | 0 KB adicional |
| Compatível com o projeto              | ❌ exige CDN ou bundler, ambos proibidos | ✅             |
| Necessário para uma esfera com ruído? | não                                      | —              |

O projeto proíbe CDN e bundler (`README.md`, seção "Como abrir"). Vendorizar
Three.js contradiria isso, e o briefing é explícito: _"Não introduza uma engine
3D apenas para renderizar efeitos que CSS e SVG resolvem adequadamente."_

A cena inteira é **um triângulo em tela cheia com um fragment shader**. Não há
malha, nem câmera, nem grafo de cena. A esfera é implícita: para cada pixel,
calcula-se se ele cai dentro do disco e, em caso positivo, deriva-se a normal
por `z = √(r² − d²)`.

## Anatomia do shader

`design-system/js/cena.js`, ~120 linhas de GLSL:

1. **Campo atmosférico** — interpolação vertical entre `--es-cor-mineral` e
   `--es-cor-bruma`.
2. **Corpo mineral** — esfera implícita; normal analítica; superfície por fBm de
   3 oitavas sobre ruído por valor, amostrado em coordenadas **rotacionadas**
   pelo tempo e pelo progresso narrativo (é isso que faz o corpo "girar" sem
   geometria).
3. **Iluminação** — difusa Lambert com luz fixa, mais um termo rasante
   (`pow(1 − N·V, 2.5)`) que produz o halo de borda.
4. **Horizonte** — `smoothstep` sobre a distância a uma linha, multiplicado por
   uma extensão horizontal, na cor de acento.
5. **Vinheta** — `smoothstep` radial.

Nenhuma textura. Nenhum arquivo. Nenhuma licença envolvida.

## Cores: uma fonte, dois consumidores

O shader não tem paleta própria. Ele recebe uniforms lidos dos **mesmos tokens**
que o CSS consome:

```js
const paleta = {
  fundoA: hexParaRGB(E.token("cor-mineral")),
  fundoB: hexParaRGB(E.token("cor-bruma")),
  corpo: hexParaRGB(E.token("cor-limo")),
  luz: hexParaRGB(E.token("cor-brasa-clara")),
};
```

Trocar `tokens.json` e regerar muda o CSS **e** a cena 3D. É o principal ganho
de ter uma fonte canônica.

## Profundidade sem 3D

A maior parte da sensação de profundidade **não vem do WebGL**. Vem de:

| Recurso                                    | Camada                    | Custo            |
| ------------------------------------------ | ------------------------- | ---------------- |
| Paralaxe hierárquica na revelação de texto | CSS                       | zero             |
| Deslocamento de camadas por ponteiro       | JS + `transform`          | desprezível      |
| Granulação (`feTurbulence` em data URI)    | CSS                       | zero requisições |
| Vinheta e véu                              | gradientes CSS            | zero             |
| Horizonte luminoso                         | gradiente + `drop-shadow` | zero             |

O WebGL contribui com **um** elemento: o corpo mineral. Todo o resto da
atmosfera é CSS. Essa proporção é intencional — é o que permite ao fallback ser
convincente.

## Fallback

`criarCena()` devolve `null` quando o contexto não pode ser obtido ou o shader
não compila. O controlador então:

```js
canvas.hidden = true; // sai da árvore
alternativa.hidden = false; // gradiente + esfera CSS assumem
```

`.es-cena-alternativa__corpo` é um `border-radius: 50%` com
`radial-gradient` posicionado no mesmo ponto da esfera do shader. Perde-se o
relevo procedural; a composição, a paleta e todo o movimento editorial
permanecem idênticos.

**A referência não tem fallback:** a canvas fica vazia, sem `role`, sem
`aria-label`, sem conteúdo alternativo.

## Custo e contenção

| Estratégia             | Implementação                                                               |
| ---------------------- | --------------------------------------------------------------------------- |
| DPR limitado a 2       | `Math.min(devicePixelRatio, --es-amb-dpr-maximo)`                           |
| Sem antialias          | `getContext("webgl", { antialias: false })` — inútil num campo de gradiente |
| Sem canal alfa         | `alpha: false` — evita composição com a página                              |
| Render só em vista     | `IntersectionObserver` inicia/para o laço                                   |
| Pausa em aba oculta    | `visibilitychange` no laço compartilhado                                    |
| Um triângulo, não dois | 3 vértices cobrindo a tela, sem costura na diagonal                         |
| Liberação explícita    | `destruir()` apaga buffer e programa e chama `WEBGL_lose_context`           |

## Acessibilidade da cena

`aria-hidden="true"` na canvas: ela é decorativa por decisão de projeto — toda
informação narrativa vive no DOM editorial, nunca só no pixel. Isso é o que
torna legítimo escondê-la da árvore, e é a diferença entre uma canvas decorativa
e a canvas opaca da referência, que carrega conteúdo sem alternativa.

## Texto MSDF: não reproduzido

A referência renderiza títulos **dentro** do WebGL via atlas MSDF, o que permite
texto ocluído pela geometria e movido pela câmera. Não reproduzimos: exigiria
gerar um atlas a partir de uma fonte (com implicações de licença) e uma segunda
via de renderização de texto, com o custo de acessibilidade que isso traz. Todo
texto do sistema é DOM.
