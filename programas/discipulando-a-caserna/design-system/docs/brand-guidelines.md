# Brand Guidelines — Discipulando a Caserna (DaC)

> Last updated: 2026-08-05  
> Status: **Candidato** (gates H1–H4 — ver `decisoes.md`)

Manual operacional de identidade visual e tokens do programa **Discipulando a Caserna**.

**Não** é a marca institucional do Projeto Caserna de Adulão (`marca/` na raiz).

## Quick Reference

| Elemento | Valor |
|----------|-------|
| Superfície profunda | Navy `#1A2A44` |
| Profundidade máxima | Navy escuro `#101D33` |
| Acento editorial | Bronze Guia `#8C6A45` |
| Papel / creme | `#FBF8F2` / `#F5F1E7` |
| Texto (tinta) | `#23262B` |
| Display | Montserrat 700–800 |
| Corpo | Source Serif 4 |
| Logo canônico | `assets/img/logo-pdac/` |
| Tokens machine | `design-system/tokens/tokens.json` |
| Copy literal da marca | `conteudo/identidade.md` (Guia §1.6) |

---

## 0. Fronteira de marca

| | Projeto Caserna de Adulão (PCA) | Discipulando a Caserna |
|--|--------------------------------|------------------------|
| Papel | Projeto ministerial / institucional amplo | Programa específico (protagonista das superfícies do programa) |
| Logo | `assets/img/logo-pca/` | `programas/…/logo-pdac/` |
| Paleta âncora | Carvão + papel + bronze PCA | Navy + bronze Guia + creme |
| Tipografia | Serif display stack + system sans | Montserrat + Source Serif 4 |
| Superfície web | `index.html` (raiz) | `programas/discipulando-a-caserna/` |
| Brand book | `marca/` | Este `design-system/docs/` + lab |

Não misturar kits, tokens ou messaging sem decisão humana explícita.

Destinatário da apresentação digital: **Pr. Glaydston** (apreciação pastoral) — prospecto submetido, não portal público nem landing comercial.

---

## 1. Color Palette

### Primários (Guia / identidade)

| Nome | Hex | Token semântico / primitivo | Uso |
|------|-----|----------------------------|-----|
| Navy | `#1A2A44` | `--cor-superficie-profunda` / navy-800 | Banners, umbrais, fundos profundos |
| Navy escuro | `#101D33` | `--cor-superficie-profunda-escura` / navy-900 | Contemplação, profundidade máxima |
| Bronze | `#8C6A45` | `--cor-acento-editorial` / bronze-500 | Filetes, rótulos, acento editorial |
| Creme | `#F5F1E7` | `--cor-superficie-creme` | Caixas, blocos |
| Papel | `#FBF8F2` | `--cor-superficie-papel` | Superfície principal de leitura |
| Régua | `#C9BCA1` | `--cor-borda-sutil` | Filetes, divisórias |
| Tinta | `#23262B` | `--cor-texto-primario` | Texto corrido |

### Aliases do kit de logo (H1)

| Nome | Hex | Primitivo | Nota |
|------|-----|-----------|------|
| Latão logo | `#8C6A46` | bronze-600 | Drift perceptivo vs Guia `#8C6A45` — **não** unificar sem H1 |
| Cinza 1C | `#4A4A4A` | neutroQuente-500 | Mono positiva |
| Creme 1C | `#F4F4F1` | neutroQuente-100 | Mono negativa |
| Taupe | `#5B5349` | neutroQuente-400 | Apoio do kit |
| Bronze claro | `#C9A86A` | bronze-300 | Acento/foco sobre navy |

### Semânticos (usar nos componentes)

| Papel | Token |
|-------|-------|
| Superfície papel | `--cor-superficie-papel` |
| Superfície creme | `--cor-superficie-creme` |
| Superfície profunda | `--cor-superficie-profunda` |
| Texto primário | `--cor-texto-primario` |
| Texto sobre profunda | `--cor-texto-sobre-profunda` |
| Acento editorial | `--cor-acento-editorial` |
| Foco sobre papel | `--cor-foco-sobre-papel` |
| Foco sobre profunda | `--cor-foco-sobre-profunda` |

**Proibido** em CSS de componentes/lab de produto: hex soltos e `--primitivo-*` direto.

### Acessibilidade

- Meta contraste AA para texto e componentes.
- Bronze como CTA comercial em papel: evitar (Direção A).
- Foco visível com anel bronze / bronze claro conforme superfície.

**H1:** paleta oficial permanece **candidata** até homologação (incl. drift bronze).

---

## 2. Typography

### Faces (H3 — manter até decisão de loading)

```css
--tipografia-familia-display: "Montserrat", sans-serif;
--tipografia-familia-corpo: "Source Serif 4", "Source Serif Pro", Georgia, serif;
```

| Papel | Face | Pesos | Uso |
|-------|------|-------|-----|
| Display | Montserrat | 700–800 | Títulos, rótulos, numeração |
| Corpo | Source Serif 4 | 400 / 400i / 600 | Prosa, citações |

### Escala semântica

`--tipografia-pagina-titulo`, `--tipografia-secao-titulo`, `--tipografia-prosa-corpo`, `--tipografia-nota`, `--tipografia-rotulo`, etc. — ver `tokens.json` → `semanticos.tipografia`.

Lab e e2e: **sem CDN externo**; faces caem no stack local/sistema até H3 definir self-host.

---

## 3. Logo

Fonte canônica: [`assets/img/logo-pdac/LEIA-ME.md`](../../assets/img/logo-pdac/LEIA-ME.md).

### Famílias do kit (inventário)

| Família | Papel |
|---------|-------|
| `Master_Flat_2D` | Padrão web (abertura, § marca) |
| `Primaria_Hero_3D` | Destaque máximo (evitar peso na web) |
| `Emblema` / `Mono` | Só escudo |
| `Lockup_Horizontal` / `Vertical` | Escudo + tipografia (+ linha PCA nas coloridas) |
| `Wordmark_Horizontal` | Só tipografia |
| `Micro_XS` | Favicon / barra |

### Matriz candidata de uso (H2)

Conforme LEIA-ME “Uso no prospecto” (até homologação):

| Superfície | Arquivo |
|------------|---------|
| Favicon / barra papel | `ICON_DaC_Micro_XS_Color_Institucional_40px` |
| Barra sobre navy | `ICON_DaC_Micro_XS_Color_Institucional_Reverso_40px` |
| Hero / seção marca | `LOGO_DaC_Master_Flat_2D_Color` |

### Clear space e não-usos

- Área livre ≈ ¼ da altura do escudo.
- Não distorcer, não recolorir fora da paleta do kit.
- Não substituir pelo logo PCA.
- Preferir WebP no runtime; PNG como fonte/fallback.
- Legados `brasao.svg` / `marca-escudo.svg` / `favicon.svg`: **não** são fonte ativa.

**H2:** matriz oficial de quando usar Lockup/Wordmark/Emblema vs Master — **candidata** (LEIA-ME).

---

## 4. Spacing & layout (Direção A)

| Token / regra | Valor / nota |
|---------------|--------------|
| Medida de prosa | `--layout-medida-prosa` (~68ch) |
| Container leitura | `--layout-container-leitura` (~40rem) |
| Gutters | mobile / tablet / desktop em `--espacamento-pagina-gutter-*` |
| Ritmo | `--espacamento-secao`, `--espacamento-bloco`, `--espacamento-grupo` |
| Grid | Coluna estreita; container amplo só para ferramentas curriculares |

Espaço negativo e filetes (`--cor-borda-sutil`) fazem hierarquia — não cards de feature nem dashboard.

---

## 5. Components

Contratos em `design-system/componentes/` (API pública `dc-*`).  
CSS de produção previsto em `design-system/styles/` — lab demo espelha contratos; **não** é runtime do prospecto.

| Família | Exemplos |
|---------|----------|
| Navegação / chrome | link, sumário, progresso, abas, disclosure |
| Editorial | selo, citação bíblica, rótulo de estado, checklist |
| Currículo | item curricular, comparação |
| Padrões | umbral, abertura, pedido de fechamento |

Classes `.lab-*` = scaffolding do laboratório — **não** API pública.

---

## 6. Motion

Ver [`motion-spec.md`](motion-spec.md). Default **H5: mínimo e progressivo**.

---

## 7. Voice

**H4 pendente** de homologação formal (3–5 traços).

Enquanto isso, só o que já está autorizado nas regras do repositório e no `conteudo/`:

- Tom pastoral e institucional; português brasileiro natural.
- Não inventar endossos, aprovações, cargos, datas ou resultados.
- Citações `>` em `conteudo/*.md` são literais — não parafrasear.
- Linguagem militar serve ao evangelho, nunca o contrário (`identidade.md`).
- Superfície = prospecto pastoral submetido, não landing comercial.

Doutrina visual literal da marca: [`conteudo/identidade.md`](../../conteudo/identidade.md).  
Não importar voz PCA como se fosse a do programa (nem o inverso).

---

## 8. Assets & sync

```bash
npm run generate:discipulando:tokens
npm run validate:discipulando:tokens
npm run validate:discipulando:design-system
```

| Arquivo | Papel |
|---------|-------|
| `design-system/docs/brand-guidelines.md` | SoT humano operacional |
| `conteudo/identidade.md` | Copy / doutrina literal (Guia) |
| `design-system/tokens/tokens.json` | SoT machine |
| `design-system/tokens/tokens.css` | Gerado |
| `design-system/laboratorio/` | Brand book + demos (local) |
| `assets/img/logo-pdac/` | Kit binário |

---

## Approval

| Item | Status |
|------|--------|
| Paleta Guia + tokens | Candidato (H1) |
| Kit logo inventariado | Feito; matriz H2 candidata |
| Tipografia Guia | Adiado loading (H3) |
| Voz operacional formal | Adiado (H4) |
| Motion mínimo | Candidato (H5) |
| Lab HTML brand book | Entrega Onda 3 |
| Publicação Pages | Adiado (H6) |
