# Evidência — Gate PUB-A

- **Data:** 2026-08-03
- **Decisão:** PUB-F5-01 SUSPENSA
- **Baseline anterior:** `ecfd6ab6065521b5c801c49441866673c77968be`

## Critérios verificados

- [x] F5 e Design System ausentes do artefato `_site` após `npm run build:pages`
- [x] Índice público sem `href` para paths suspensos
- [x] `validate:pages:policy` OK
- [x] `validate:pages:artifact` OK
- [x] `test:pages` OK
- [x] Deploy Pages depende de Qualidade (`workflow_run` + `head_sha`)
- [x] Fase 5 permanece aprovada / canônico intacto
- [x] Fase 6 permanece liberada, não iniciada
- [x] Produção `prospecto/` não criada
- [x] `noindex` / `robots.txt` Disallow preservados

## Comandos

```bash
npm run validate:pages:policy
npm run build:pages
npm run validate:pages:artifact
npm run test:pages
```

## Estado

```text
Fase 5: APROVADA
Protótipo canônico: prospecto-fase-5-v1
Fase 6: LIBERADA — NÃO INICIADA
Prévia pública F5: SUSPENSA
Design System: INTERNO
Produção: BLOQUEADA
Indexação: BLOQUEADA
Pages: ALLOWLIST RESTRITA E VALIDADA
```
