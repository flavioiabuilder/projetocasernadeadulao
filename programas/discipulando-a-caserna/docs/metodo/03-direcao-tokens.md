# 03 — Direção e tokens (instância piloto)

> **Status:** `0.1.0-candidate` / **EM REVISÃO**
> Fonte de verdade: [`../../design-system/tokens/tokens.json`](../../design-system/tokens/tokens.json)
> CSS derivado (gerado): [`../../design-system/tokens/tokens.css`](../../design-system/tokens/tokens.css)
> Protótipos **não** migrados nesta fase — CSS vivo por superfície permanece legado operacional.

Template GLOBAL (sem paleta do piloto):
[`../../../../metodo/templates/projeto-web/03-tokens.json`](../../../../metodo/templates/projeto-web/03-tokens.json).

## Frase de direção

**Candidata (V2 / D3-02 — DECISÃO HUMANA):**

> Prospecto pastoral editorial tipográfico, de leitura sustentada e
> solenidade contida, que acolhe com humanidade sobre papel/creme e
> profundidade navy, marca Adulão num único umbral sem bravata, torna
> estados e pedido legíveis sem linguagem comercial, e permanece digno
> e completo mesmo sem animação.

## Fontes

| Fonte                                                                            | Papel                                        |
| -------------------------------------------------------------------------------- | -------------------------------------------- |
| [`../decisao-visual-v1.md`](../decisao-visual-v1.md)                             | Direção A normativa                          |
| [`02-painel-referencias.md`](02-painel-referencias.md)                           | Atmosfera / estrutura / detalhe (EM REVISÃO) |
| [`../../conteudo/identidade.md`](../../conteudo/identidade.md)                   | Âncoras Guia                                 |
| [`../../assets/img/logo-pdac/LEIA-ME.md`](../../assets/img/logo-pdac/LEIA-ME.md) | Aliases logo                                 |
| CSS vivo dos protótipos                                                          | Evidência / legado                           |
| [`fase-3/inventario-de-tokens.md`](fase-3/inventario-de-tokens.md)               | Inventário                                   |
| [`fase-3/matriz-de-contraste.md`](fase-3/matriz-de-contraste.md)                 | Contraste                                    |

## Arquitetura

```text
tokens.json (ME-T)  →  gerar-tokens.js  →  tokens.css
Primitivos          →  Semânticos
```

- **Formato:** ME-T (folhas `$value` / `$type` / `$description`; aliases `{primitivos…}`).
- **DTCG 2025.10:** referência de folhas (CG Report, não W3C Rec); sem `component`.
- **Scripts:** `generate:discipulando:tokens` · `validate:discipulando:tokens` ·
  `test:discipulando:tokens` — **não** colidir com `generate:tokens` (Aramco).
- **Path:** `programas/discipulando-a-caserna/design-system/tokens/`.

## Decisões cromáticas (candidato)

| Papel             | Valor     | Nota                 |
| ----------------- | --------- | -------------------- |
| Navy              | `#1A2A44` | consenso             |
| Navy escuro       | `#101D33` | identidade           |
| Bronze canônico   | `#8C6A45` | D3-05 default (Guia) |
| Latão logo        | `#8C6A46` | alias                |
| Bronze prospecto  | `#9A7B4F` | LEGADO               |
| Creme             | `#F5F1E7` | identidade           |
| Papel             | `#FBF8F2` | prospecto            |
| Base storytelling | `#F4F4F1` | legado               |
| Tinta             | `#23262B` | texto                |
| Régua             | `#C9BCA1` | filetes              |

**OKLCH:** hex-first; oklch opcional só com equivalência validada (não adotado no CSS gerado desta candidate).

**Sem dark mode:** contextos `papel` / `creme` / `profunda` (`data-superficie`).

**Acento:** bronze ≤ ~5% da área (regra de composição).

## Tipografia

- Display: Montserrat 700–800 (self-hosted)
- Corpo: Source Serif 4 400/400i/600
- Medida: 68ch (faixa 60–75)
- LH corpo: 1.7
- Storytelling stacks: legado / fallback futuro

## Espaço, layout, breakpoints

- Base **4px**
- Containers 40rem / 64rem; gutters 1.25 / 2 / 2.5rem
- Breakpoints semânticos: `navCompacta` 900px · `leituraAmpla` 700px ·
  `curriculoDuasColunas` 960px

## Forma, elevação, motion, foco

- Raio default: nenhum (filete-first)
- Elevação: exceção discreta
- Motion: 120 / 200 / 320ms; easing prospecto; RM obrigatório
- Foco: 2px + offset 3px; cor `#8C6A45` sobre papel, `#C9A86A` sobre navy
  (padrão interno ≈ AAA Focus Appearance; AA exige foco visível)

## Compatibilidade (sem migração agora)

Ver `compat.legado` em `tokens.json` e inventário Fase 3.

| Legado                 | Futuro                                             |
| ---------------------- | -------------------------------------------------- |
| `--navy` / `--caserna` | `--cor-superficie-profunda`                        |
| `--bronze` / `--latao` | `--cor-acento-editorial` (revisar valor prospecto) |
| `--creme` / `--papel`  | superfícies semânticas                             |
| `--tinta`              | `--cor-texto-primario`                             |
| `--duracao`            | `--motion-revelacao-lenta`                         |

Runtime prospecto / storytelling / homologação / direções A·B·C: **NÃO TOCAR**
nesta fase.

## Geração e validação

```bash
npm run generate:discipulando:tokens
npm run validate:discipulando:tokens
npm run test:discipulando:tokens
```

## Decisões humanas

[`fase-3/roteiro-de-validacao-direcao.md`](fase-3/roteiro-de-validacao-direcao.md)
e V1/V2 em
[`fase-2/roteiro-de-validacao-visual.md`](fase-2/roteiro-de-validacao-visual.md).

## Ligação com a Fase 4

A Fase 4 (Manual do Sistema) consome **semânticos** deste JSON para especificar
componentes. Não reabre âncoras nem inventa tokens de componente na Fase 3.
Figma continua não canônico. Aramco permanece só referência DevTools.

## Figma / Stitch

- **URL Figma:** (vazio)
- Stitch não é canônico
