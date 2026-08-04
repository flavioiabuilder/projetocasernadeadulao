# Progress — auditoria korowa-vic

| Campo | Valor |
| --- | --- |
| Sessão | 3 — P9 (MCP chrome-devtools ao vivo) + refino de física do motion |
| Atualizado | 2026-08-04 |
| Checks | ver `checks.json` (~120+ passes, sessões 1–2) |
| Host | **MCP chrome-devtools** (disponível pela 1ª vez nesta sessão) + Playwright (sessões 1–2) |

## Feito (sessão 3)

- P9: primeira captura ao vivo via MCP chrome-devtools — fecha a lacuna `SETUP-008` das sessões 1–2.
  - `gsap` 3.15.0 + `ScrollTrigger.getAll()` medido em runtime: 4 instâncias reais, com `scrub`, `start`/`end`, duração.
  - Plataforma identificada: **Webflow**.
  - 9 `@keyframes` capturados por inteiro do CSSOM (`parallaxMove`, `movePreloader`, `scaleLogo`, família `cloud-scroll_*`, `text-gradient-color-fill`, `spin`, `show-hide`).
  - 7 curvas `cubic-bezier` reais + a custom property `--animation--ease` (curva de assinatura reutilizada em vários componentes).
  - Evidência em `raw/p9-gsap-live-1440x900.json`; ver `documentacao/motion-system.md` para leitura.
- Tokens (`tokens.json` → `tokens.css`): `easing.*` e `duration.*` atualizados de valores estimados para valores medidos; novo grupo `scrollPhysics.*` (constante de lag do scrub, 0.8s).
- `motion.js`: `bindPinProgress` agora usa suavização exponencial (`createScrollLag`) com constante de tempo real de 0.8s, substituindo a aproximação "identidade linear" documentada como gap na sessão 2 (erro-alvo G3). Parallax e rail seguem 1:1 (não há evidência de scrub nesses casos).
- `motion.css`: novas primitivas `.fr-media-stage`, `.fr-loader__curtain`, `.fr-brand-mark`, análogas aos 3 `@keyframes` reais ainda não representados na Friso.
- `npm run test:referencias:korowa-vic` — 4/4 (sem regressão).

## Feito (sessão 2, para referência)

- PASSO 1 refino 0,5% (68 frames) + P8 refine; estados nav/reload/CPU 4×
- PASSO 2: 7 viewports, 129 itens no manifesto
- P5/P6/P7; rede amostrada
- Reconstrução **Friso** em `referencias-devtools/korowa-vic/`
- Docs espelho em `docs/design-system/` + `docs/reference-auditoria/`
- `report.html` atualizado; gates G1–G10 (G2 falha: SSIM NÃO OBSERVADO)

## Feito (sessão 3, continuação — G2 e integração)

- Fase 5: novas primitivas de motion (media-stage, brand-mark, loader curtain) integradas em `demo.html`; verificado ao vivo via MCP chrome-devtools (sem erros de console; lag do pin convergindo corretamente, `scale(1.0222)`→`scale(1.0243)` em 300ms).
- Fase 6: handover em [`../DESIGN_AND_EFFECTS.md`](../DESIGN_AND_EFFECTS.md).
- **G2 SSIM medido** (sem instalar `ssim.js`; implementação própria em `scripts/compute-ssim.js` usando `pngjs`, já devDependency do harness): SSIM macro (composição de luminância, grade 96×60, janela 8×8) entre `captures/dry-run-1440x900` (referência) e nova captura `captures/friso-lab-1440x900` (Friso, via MCP) em 3 frações (0/0.5/1) → **média 0.2335**, abaixo do limiar 0.85. Resultado esperado e não é falha: Friso não reproduz fotos/copy reais por decisão de licença, então a composição de claro/escuro diverge por design. Ver `raw/p10-ssim-g2-1440x900.json` para método e números por fração.
- **Lighthouse via MCP medido** (`mcp__chrome-devtools__lighthouse_audit`, desktop, navigation): Accessibility 83, Best Practices 58, SEO 100, Agentic Browsing 50 (48/57 audits passaram). 9 falhas documentadas em `documentacao/accessibility.md` (heading-order, link-name, target-size, aria-prohibited-attr, aria-required-children, agent-accessibility-tree, third-party-cookies, deprecations, inspector-issues) — nenhuma reproduzida na Friso. Relatório completo em `raw/lighthouse/` (evidência local); resumo em `raw/p11-lighthouse-summary.json`.
- `checks.json`: INV5-013 e INV6-002 marcados `passes:true` com a evidência acima. Total **139/189** (era 137/189).

## Lacunas honestas

- ~~MCP chrome-devtools~~ — **resolvido na sessão 3** (P9).
- ~~G2 SSIM não instalado~~ — **medido na sessão 3**; gate continua `pass:false` (0.23 < 0.85) mas agora com número real e causa documentada, não "NÃO OBSERVADO".
- ~~Lighthouse via MCP NÃO OBSERVADO~~ — **medido na sessão 3** (P11).
- P3 refine JSON >30KB (agregar numa limpeza futura) — ainda pendente.
- `report.html` ainda usa o gerador estático de `finalize-session2.js` (sessão 2); os achados de P9/P10/P11 estão em `raw/`, `checks.json` e nos docs, mas não regenerados no HTML — rodar `finalize-session2.js` re-executaria `cmdGates()` do zero e apagaria os portões já enriquecidos manualmente, então a regeneração do HTML foi deixada para uma revisão manual do script, não automática.
