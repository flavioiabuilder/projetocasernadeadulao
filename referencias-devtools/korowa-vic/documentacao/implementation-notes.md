# Notas de implementação

- Stack: HTML + CSS custom properties + JS IIFE (igual ao restante de `referencias-devtools/`).
- Tokens: editar JSON → `node referencias-devtools/korowa-vic/ferramentas/gerar-tokens.js`.
- Host de auditoria: Playwright quando MCP ausente; sondas em `auditoria/probes/`.
- GSAP **não** incluído na reconstrução: o padrão pin/scrub foi reimplementado com sticky + scroll listeners (proporcionalidade).
- `ssim.js` opcional para G2; comparação editorial pode usar pixelmatch nas capturas do lab vs referência com máscara de hero.