# PLAN — auditoria Korowa (korowa-vic)

| Campo | Valor |
| --- | --- |
| Alvo | https://www.korowa.vic.edu.au/ |
| Slug | `korowa-vic` |
| Reconstrução | **Friso** |
| Host de medição | Playwright (MCP chrome-devtools indisponível nas sessões 1–2) |

## Arquitetura (tudo sob a referência)

| Camada | Path |
| --- | --- |
| Harness + capturas + raw | [`referencias-devtools/korowa-vic/auditoria/`](./) |
| Documentação do sistema | [`../documentacao/`](../documentacao/) |
| Implementação Friso | [`../design-system/`](../design-system/) |
| Ferramentas / testes | [`../ferramentas/`](../ferramentas/), [`../testes/`](../testes/) |

Convenção do repo: estudos externos moram inteiros em `referencias-devtools/<slug>/` — sem harness na raiz.

## Modelo de duas camadas

1. **DOM** — sondas P1/P2/P5/P6/P7; procedência `declarado`.
2. **Canvas / frame** — P3+P4+P8; procedência `medido-no-render` (0 `<canvas>` observados).

## CLI

```bash
node referencias-devtools/korowa-vic/auditoria/cli.js probe styles
node referencias-devtools/korowa-vic/auditoria/cli.js frames --dir ... --out ...
node referencias-devtools/korowa-vic/auditoria/cli.js aggregate
node referencias-devtools/korowa-vic/auditoria/cli.js report
node referencias-devtools/korowa-vic/auditoria/cli.js gates
```

## Dependências do harness

`pixelmatch`, `pngjs` (devDependencies na raiz do monorepo).
