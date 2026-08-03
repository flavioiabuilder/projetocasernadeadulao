# Auditoria korowa-vic

Ponte para o harness na raiz do repositório e o relatório espelhado:

- [`../../../audit/NARRATIVE-MAP.md`](../../../audit/NARRATIVE-MAP.md)
- [`../../../audit/raw/`](../../../audit/raw/)
- [`../../../docs/reference-audit/korowa-vic-audit.md`](../../../docs/reference-audit/korowa-vic-audit.md)

## Stack — EVIDÊNCIA vs INFERÊNCIA

| Item | Coluna |
| --- | --- |
| GSAP + ScrollTrigger | EVIDÊNCIA (global) |
| Animações `cloud-scroll_*` / parallax | EVIDÊNCIA (computed animation-name) |
| CMS / framework de página | NÃO DETERMINADO (bundle minificado; rede amostrada em session2) |
| WebGL runtime scene | INFERÊNCIA rejeitada — 0 canvas |
| Smooth scroll lib (Lenis) | NÃO OBSERVADO no global |
