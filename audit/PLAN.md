# PLAN — auditoria Korowa (sessão 1: ambiente + reconhecimento)

| Campo | Valor |
| --- | --- |
| Alvo | https://www.korowa.vic.edu.au/ |
| Slug | `korowa-vic` (domínio sem TLD institucional + host) |
| Data | 2026-08-03 |
| Branch | `main` @ `1191c73` (working tree limpo = baseline) |
| Escopo desta sessão | Harness + sondas + checks + dry-run PASSO 1–2 em 1440×900. **Sem** design system. |

## Reconhecimento do repositório

- Monorepo ministerial + estudos técnicos. Stack raiz: HTML/CSS/JS, Node ≥18, Playwright, ESLint, Stylelint, Prettier. Sem React/Vite no produto.
- Estudos externos vivem em `referencias-devtools/<slug>/` (precedentes: Aramco/Estratos, Soul Church/Átrio) — HTML estático, tokens JSON→CSS, laboratório + demo, sem hotlink.
- Discipulando a Caserna é produto separado; esta auditoria **não** o altera.
- Dependências de motion/WebGL atuais: nenhuma no root além de Playwright. `pixelmatch` / `ssim.js` serão adicionadas só para o harness de frames (G2/P8).
- Chrome DevTools MCP: configurado em `.mcp.json` (`npx chrome-devtools-mcp@latest --isolated`), mas **não carregado** nesta sessão (`GetMcpTools` → servers vazios). Dry-run usa Playwright como host de injeção das **mesmas** sondas; sessões seguintes devem usar MCP quando o servidor estiver ativo.

## Arquitetura de entrega (após sessão 1)

| Camada | Path |
| --- | --- |
| Harness de medição | `./audit/` (esta pasta; material de auditoria) |
| Estudo + reconstrução | `referencias-devtools/korowa-vic/` (convenção do repo) |
| Docs de auditoria espelhadas | `docs/reference-audit/korowa-vic-audit.md` + `referencias-devtools/korowa-vic/documentacao/` |
| Tokens DTCG | `referencias-devtools/korowa-vic/design-system/tokens/tokens.json` → CSS gerado |
| Lab / demo | HTML estático no design-system da referência |

Preserva stack: HTML + CSS custom properties + JS modular, sem trocar framework.

## Modelo de duas camadas

1. **DOM** — sondas P1/P2/P5/P6/P7; procedência `declarado`.
2. **Canvas** — P3+P4+P8 (delta pixel / paleta); procedência `medido-no-render`. Entregável: curva scroll→estado, não tokens CSS inventados.

## Fluxo de investigação (sessões seguintes)

1. PASSO 1 completo (refino 0,5%, CPU 4×, Slow 4G) → `NARRATIVE-MAP.md`
2. PASSO 2 multiviewport → `captures/manifest.json`
3. PASSO 3–6 → tokens, motion, técnica, a11y
4. Implementação do sistema + lab + demo curta
5. `./audit/init.sh gates` + `report.html`

## Dependências a introduzir (justificativa)

| Pacote | Motivo |
| --- | --- |
| `pixelmatch` | Delta entre frames (P8 / G2 canvas exclusão) |
| `pngjs` | Decodificar PNG de capturas no Node |
| `ssim.js` | Gate G2 SSIM em regiões editoriais |

Sem Three.js/GSAP/Lenis até evidência de necessidade na reconstrução (proporcionalidade: CSS/SVG primeiro).

## Riscos / bloqueios

- MCP ausente nesta sessão → dry-run via Playwright; marcar em provenance.
- Site pode ter consent/cookie wall, WebGL sem `preserveDrawingBuffer`, scroll hijack — sondas tratam timeouts e registram NÃO OBSERVADO.
- Fontes/marcas/fotos proprietárias: nunca transferir; mapear em `asset-and-license-boundaries.md`.

## Critério de parada desta sessão

Commit do harness + dry-run 1440×900; entregar contagem de checks, mapa narrativo detectado, tamanhos das sondas, inventário de canvases. Parar antes de implementar o design system.
