# Inventário de tokens — Fase 3

- **Programa:** Discipulando a Caserna
- **Data:** 2026-08-01
- **Status:** EM REVISÃO / inventário para `0.1.0-candidate`
- **Escopo:** protótipos + identidade; **sem** migrar runtime

## Classificação

`CANÔNICO` · `CANDIDATO` · `SEMÂNTICO` · `LEGADO` · `ESPECÍFICO DE PROTÓTIPO` ·
`HARDCODED JUSTIFICADO` · `HARDCODED INDEVIDO` · `GERADO` · `NÃO VISUAL`

## Fontes inventariadas

| Superfície     | Path                                                     |
| -------------- | -------------------------------------------------------- |
| Prospecto      | `prototipos/prospecto-v1/css/*.css`                      |
| Storytelling   | `prototipos/storytelling-v1/css/*.css` + HTML/SVG        |
| Direções A/B/C | `prototipos/direcoes-visuais-v1/direcao-*/styles.css`    |
| Homologação    | `prototipos/homologacao-pastoral-v1/index.html` (inline) |
| Identidade     | `conteudo/identidade.md`                                 |
| Logo kit       | `assets/img/logo-pdac/LEIA-ME.md`                        |

## Cores — âncoras e drift

| Valor     | Papel aparente              | Fonte autoridade       | Classificação             | Candidato canônico     |
| --------- | --------------------------- | ---------------------- | ------------------------- | ---------------------- |
| `#1A2A44` | navy / superfície profunda  | identidade + consenso  | CANÔNICO                  | sim → `navy.800`       |
| `#101D33` | navy escuro                 | identidade + prospecto | CANÔNICO                  | sim → `navy.900`       |
| `#8C6A45` | bronze editorial            | identidade (Guia)      | CANÔNICO (proposto D3-05) | sim → `bronze.500`     |
| `#8C6A46` | latão logo / storytelling   | logo kit               | LEGADO / alias            | alias de `#8C6A45`     |
| `#9A7B4F` | bronze prospecto            | prospecto tokens       | LEGADO                    | não — migrar           |
| `#7C6038` | bronze escuro               | prospecto              | CANDIDATO                 | `bronze.700`           |
| `#C9A86A` | bronze claro / foco         | prospecto / homolog    | CANDIDATO                 | `bronze.300`           |
| `#F5F1E7` | creme                       | identidade + prospecto | CANÔNICO                  | `creme`                |
| `#FBF8F2` | papel                       | prospecto              | CANÔNICO                  | `papel`                |
| `#F4F4F1` | base storytelling / logo 1C | logo + storytelling    | LEGADO                    | mapear; não alias cego |
| `#C9BCA1` | régua / filete              | identidade + prospecto | CANÔNICO                  | `regua`                |
| `#23262B` | tinta / texto               | identidade + prospecto | CANÔNICO                  | `tinta`                |
| `#2B2B2B` | chumbo                      | storytelling           | LEGADO                    | revisar vs tinta       |
| `#4A4A4A` | estrut / 1C positiva        | logo + storytelling    | CANDIDATO                 | neutro estrutural      |
| `#111418` | sombra                      | storytelling           | ESPECÍFICO DE PROTÓTIPO   | elevação, não navy     |

**Hardcodes relevantes:** storytelling `layout.css`/`components.css` (rgba da família base/latao/sombra); direção B gradients; homologação SVG/checklist — `HARDCODED INDEVIDO` para unificação futura; **não** corrigir nesta fase.

## Tipografia

| Item                | Valor                               | Classificação         |
| ------------------- | ----------------------------------- | --------------------- |
| Display             | Montserrat 700–800 (woff2 local)    | CANÔNICO              |
| Corpo               | Source Serif 4 400/400i/600 (woff2) | CANÔNICO              |
| Storytelling stacks | Iowan/Palatino + Helvetica Neue     | LEGADO / fallback     |
| Medida              | 68ch (prospecto)                    | CANÔNICO              |
| LH corpo            | 1.7 prospecto; 1.62 storytelling    | CANDIDATO 1.65–1.7    |
| Escala fluid        | clamps prospecto xs…2xl             | CANDIDATO (evidência) |

## Espaço e layout

| Item       | Valor             | Classificação  |
| ---------- | ----------------- | -------------- |
| Base       | 4px / 0.25rem     | CANÔNICO       |
| Escala esp | 1…24 (múltiplos)  | CANÔNICO       |
| Container  | 40rem / 64rem     | CANDIDATO      |
| Gutters    | 1.25 / 2 / 2.5rem | CANDIDATO      |
| `--mx` 8vw | storytelling      | LEGADO de deck |

## Breakpoints observados

560, 700, 768, 800, 900, 960, 1100 (+ outros locais).  
Semânticos propostos: `navCompacta` (~900), `leituraAmpla` (~700–768),
`curriculoDuasColunas` (~960–1100).

## Forma / elevação

| Item    | Valor                 | Classificação              |
| ------- | --------------------- | -------------------------- |
| Raio    | ~0 (Dir A)            | CANÔNICO `nenhum`          |
| Filetes | color-mix régua/creme | CANDIDATO / composição CSS |
| Sombra  | token suave; uso raro | CANDIDATO `discreta`       |

## Motion / foco

| Item              | Valor                           | Classificação                |
| ----------------- | ------------------------------- | ---------------------------- |
| Duração revelação | 320ms                           | CANÔNICO candidato `lenta`   |
| Easing            | cubic-bezier(0.22, 1, 0.36, 1)  | CANÔNICO                     |
| RM                | implementações diversas         | SEMÂNTICO a unificar no JSON |
| Foco              | 2px solid bronze-cl; offset 3px | CANÔNICO                     |

## Mapa de autoridade (resumo)

1. Direção A (`decisao-visual-v1.md`) — princípios.
2. Identidade Guia (`identidade.md`) — âncoras de cor/tipo.
3. Logo kit — assets + `#8C6A46` / `#F4F4F1` (alias/legado).
4. Prospecto CSS — evidência editorial (não SoT pós-Fase 3).
5. Storytelling / homologação / dirs B·C — legado ou estudo.

## Próximo passo

Codificar candidatos em `design-system/tokens/tokens.json` (`0.1.0-candidate`)
e gerar `tokens.css`. Runtime dos protótipos permanece intocado.
