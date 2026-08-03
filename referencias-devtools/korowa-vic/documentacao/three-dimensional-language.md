# Linguagem tridimensional — Friso

## Achado

- **0** elementos `<canvas>` (P4, todas as posições do dry-run).
- Valores de `perspective` no CSSOM (ex.: 720px) e `matrix3d` leves (P1).
- Globais WebGL* na P3 inicial eram builtins do browser — **não** evidência de app WebGL.

## Decisão de reconstrução

Não introduzir Three.js/OGL. Profundidade = camadas absolutas + `perspective` + parallax + escala da atmosfera no pin. Documenta a *decisão* da referência (DOM-first) em vez de inventar uma cena WebGL.