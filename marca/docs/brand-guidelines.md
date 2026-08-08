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

**H1 (homologado):** paleta de interface = carvão + papel + filete bronze dos tokens. Isso **não** autoriza uma logomarca colorida (H2c: kit = `Mono_1C`).

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

### Colorway e configurações

| Tipo | Valor |
|------|-------|
| Colorway | Somente `Mono_1C` |
| Canônica | Master `LOGO_PCA_Master_Mono_1C` |
| Oficiais | Lockup Vertical · Lockup Horizontal |
| Auxiliares | Wordmark Stacked · Wordmark Horizontal |
| Tinta wordmark | `#000000` |

**Histórico:** Branca / Color / Reverso removidas. Em fundos escuros: placa `--color-papel`, nunca filter nem colorway invertida.

### Clear space e não-usos

- Área livre ≈ ¼ da altura do escudo (ou do bloco tipográfico, nos wordmarks).
- Não distorcer, não recolorir, não inventar colorways.
- Não extrair shield-only / monograma sem gate.
- Wordmarks não substituem o Master.
- Preferir WebP; PNG fallback; SVG híbrido nos lockups com Master.

**H2 / H2c:** Master = logo; colorway única; configurações estruturais documentadas no LEIA-ME.

Matriz de uso, geometrias e escadas: [`assets/img/logo-pca/LEIA-ME.md`](../../assets/img/logo-pca/LEIA-ME.md).

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
| Paleta UI (carvão/papel/bronze) | Homologado (H1) — não gera logo colorida |
| Kit logomarca Mono_1C | Decidido (H2c) |
| Logo Master + Lockup Vertical | Feito (H2) |
| Tipografia stacks | Homologado (H3) |
| Voz | Homologado (H4) |
| Motion presença sóbria | Homologado (H5) |
| Lab HTML | Entregue; só local (H6) |
