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

## Lacunas honestas

- ~~MCP chrome-devtools~~ — **resolvido na sessão 3** (P9).
- G2 SSIM (`ssim.js` não instalado) — ainda pendente.
- P3 refine JSON >30KB (agregar numa limpeza futura) — ainda pendente.
- Lighthouse via MCP — ainda NÃO OBSERVADO nesta sessão (não executado; ver próximos passos).
- `report.html` e `checks.json` ainda não incorporam os achados da P9 (ficaram no escopo de motion/tokens/docs desta sessão).
