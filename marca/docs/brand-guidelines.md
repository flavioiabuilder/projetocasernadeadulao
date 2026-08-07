# Brand Guidelines — Projeto Caserna de Adulão (PCA)

> Last updated: 2026-08-05  
> Status: **Homologado** (gates H1–H5; H6 lab só local — ver `decisoes.md`)

Manual de identidade visual e tokens da marca **institucional** do Projeto Caserna de Adulão.

**Não** é o Caderno do programa Discipulando a Caserna.

## Quick Reference

| Elemento | Valor |
|----------|-------|
| Primary (acento) | Bronze `#8B6F47` |
| Ink / carvão | `#0E1216` |
| Papel | `#F3EEE6` |
| Display | Iowan Old Style / Palatino / Georgia (stack) |
| Sans / UI | system-ui / Segoe UI / Roboto… |
| Logo canônico | `assets/img/logo-pca/` (Master) |
| Voz | Sóbrio · acolhedor com firmeza · honesto · direcional · pastoral-institucional |
| Tokens machine | `marca/tokens/tokens.json` |

---

## 0. Fronteira de marca

| | Projeto Caserna de Adulão (PCA) | Discipulando a Caserna |
|--|--------------------------------|------------------------|
| Papel | Projeto ministerial / institucional amplo | Programa específico |
| Logo | `assets/img/logo-pca/` | `programas/…/logo-pdac/` |
| Paleta âncora | Carvão + papel + bronze | Navy + bronze Guia + creme |
| Tipografia | Serif display stack + system sans | Montserrat + Source Serif 4 |
| Superfície web | `index.html` (raiz) | `programas/discipulando-a-caserna/` |

Não misturar kits, tokens ou messaging sem decisão humana explícita.

---

## 1. Color Palette

### Primários (uso na marca)

| Nome | Hex | Token | Uso |
|------|-----|-------|-----|
| Carvão | `#0E1216` | `--color-carvao` | Campo escuro, superfícies ink |
| Papel | `#F3EEE6` | `--color-papel` | Superfície clara |
| Bronze | `#8B6F47` | `--color-bronze` | Acento, filete do escudo, CTAs |

### Família estendida (página institucional)

| Nome | Hex | Token |
|------|-----|-------|
| Azul pedra | `#151C24` | `--color-azul-pedra` |
| Pedra | `#5C6570` | `--color-pedra` |
| Areia | `#C4B8A5` | `--color-areia` |
| Papel quente | `#EBE4D8` | `--color-papel-quente` |
| Bronze deep | `#6E5634` | `--color-bronze-deep` |
| Bronze claro | `#A8875A` | `--color-bronze-claro` |
| Âmbar | `#E8C98A` | `--color-ambar` |
| Branco suave | `#F7F3EC` | `--color-branco-suave` |
| Texto escuro | `#1A1F24` | `--color-texto-escuro` |
| Texto médio | `#3D4650` | `--color-texto-medio` |

### Semânticos

| Papel | Token | Resolve para |
|-------|-------|--------------|
| Surface ink | `--surface-ink` | carvão |
| Surface paper | `--surface-paper` | papel |
| Accent | `--accent` | bronze |
| Accent soft | `--accent-soft` | âmbar |
| Focus ring | `--focus-ring` | âmbar |

### Acessibilidade

- Texto escuro sobre papel: contraste alto (meta WCAG AA+).
- Texto claro sobre ink: `--text-on-ink` / muted.
- Foco visível: `--focus-ring` (âmbar) com offset.
- Homologação formal de contrastes do lab: contínua na QA.

**H1 (homologado):** colorização `Color_Institucional` = carvão + papel + filete bronze dos tokens.

---

## 2. Typography

### Font stacks (H3 homologado — stacks atuais)

```css
--font-display: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif;
--font-sans: system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

| Papel | Face | Uso |
|-------|------|-----|
| Display | `--font-display` | h1–h3, pull quotes, marca tipográfica |
| UI / body | `--font-sans` | corpo, navegação, botões |

### Escala

`--text-xs` … `--text-3xl` (clamp fluido) — ver `tokens.json` → `primitive.text`.

---

## 3. Logo

Fonte canônica: [`assets/img/logo-pca/LEIA-ME.md`](../../assets/img/logo-pca/LEIA-ME.md).

### Variantes Master (disponíveis)

| Variante | Fundo recomendado |
|----------|-------------------|
| `Mono_1C` | Claro / papel |
| `Mono_1C_Branca_FFFFFF` | Escuro |
| `Color_Institucional` | Claro ou escuro com contraste |
| `Color_Institucional_Reverso` | Escuro (com cor) |

### Clear space e não-usos

- Manter área livre ≈ ¼ da altura do escudo em volta.
- Não distorcer, não recolorir fora da paleta documentada.
- Não substituir por logo do Discipulando.
- Preferir WebP no runtime; PNG como fonte/fallback; SVG para escala.

**H2 (decidido):** o escudo Master **é** a logomarca. Texto fora do escudo não compete com a tipografia da borda.

**Lockup Vertical** (composição de layout, opcional): Master completo no topo + `PROJETO` / `CASERNA DE ADULÃO` em **Palatino Linotype** (Regular + Bold; família da stack `--font-display`). Hierarquia: apoio com tracking aberto + nome Bold. Arte superior a partir de `LOGO_PCA_Master_Mono_1C.webp` (e Masters de cor oficiais no mesmo frame). SVG **híbrido** (Master WebP embutido + contornos do wordmark) — não descrever como 100% vetorial. Geometria canônica **1781×2080**. Arquivos `LOGO_PCA_Lockup_Vertical_*` — ver `assets/img/logo-pca/LEIA-ME.md`.

---

## 4. Spacing & layout

Escala `--space-2xs` … `--space-5xl`.  
Shell: `--shell` + gutters seguros.  
Medidas de prosa: `--measure`, `--measure-wide`, `--measure-narrow`.

---

## 5. Components (institucional)

Espelhados da home — HTML/CSS estático, sem React/shadcn.

| Componente | Notas |
|------------|-------|
| `.btn` / `.btn--primary` / `--ghost` / `--ink` | min-height 2.75rem; tokens `--button-*` |
| Skip link | foco visível, transform off-screen |
| Header / brand mark | escudo 128px web ladder |
| Superfícies section | ink / deep / paper / paper-alt |

---

## 6. Motion

Ver [`motion-spec.md`](motion-spec.md). **H5 homologado: presença sóbria.**

- Entradas: 180–320ms, fade + translateY curto  
- Hover CTA: ~150–180ms  
- Respeitar `prefers-reduced-motion`  
- Sem glow, bounce, partículas ou parallax agressivo  

---

## 7. Voice

**H4 homologado.** Traços extraídos da prosa já publicada em `index.html` — não inventar doutrina, endossos, cargos ou resultados.

### Traços (5)

| Traço | Significa | Evitar |
|-------|-----------|--------|
| Sóbrio | Sem palco, sem espetáculo; homens feridos precisam de lugar, não de vitrine | Marketing de impacto, slogans vazios |
| Acolhedor com firmeza | Chegada + direção; acolher não é condescendência | Tom terapêutico genérico ou “coach” |
| Honesto | Em construção; sem métricas, vínculos ou promessas inventadas | Claims institucionais não validados |
| Direcional | Caminho, travessia, recomeço com responsabilidade | Só empatia sem convite ao passo seguinte |
| Pastoral-institucional | Português brasileiro natural; linguagem de fé sem jargão de campanha | Tom corporativo startup ou “disruptivo” |

### Exemplos já na home (âncoras)

- “Um lugar para chegar. Um caminho para recomeçar.”
- “homens feridos não precisam de um palco”
- “Sem métricas inventadas. Sem vínculos presumidos.”
- “Acolher para restaurar. Restaurar para preparar. Preparar para servir.”

UI chrome: claro, curto, em PT-BR.

---

## 8. Assets & sync

```bash
npm run generate:marca:tokens
npm run validate:marca:tokens
```

| Arquivo | Papel |
|---------|-------|
| `marca/docs/brand-guidelines.md` | SoT humano |
| `marca/tokens/tokens.json` | SoT machine |
| `marca/tokens/tokens.css` | Gerado |
| `marca/laboratorio/` | Brand book + DS HTML (local) |

---

## Approval

| Item | Status |
|------|--------|
| Paleta / Color_Institucional | Homologado (H1) |
| Logo Master + Lockup Vertical | Feito (H2) |
| Tipografia stacks | Homologado (H3) |
| Voz | Homologado (H4) |
| Motion presença sóbria | Homologado (H5) |
| Lab HTML | Entregue; só local (H6) |
