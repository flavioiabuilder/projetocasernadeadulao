# Roteiro de validação da implementação — Fase 6

## Pré-condições

- [ ] F5-08 registrada
- [ ] F5-10 registrada (path canônico)
- [ ] F5-12 `autorizacaoFase6: true`
- [ ] F6-02…F6-08 decididos

Estado atual: **pré-condições não satisfeitas** — não executar validação de produção.

## Comandos (quando `prospecto/` existir)

```bash
npm run generate:discipulando:prospecto
npm run check:discipulando:prospecto:stale
npm run validate:discipulando:prospecto
npm run test:discipulando:prospecto
npm run test:discipulando:prospecto:e2e
npm run capture:discipulando:prospecto
```

Scripts ainda não criados — nomes reservados pelo plano.

## Gates F5 já integrados (pré-produção)

```bash
npm run validate:discipulando:prototipagem
npm run check:discipulando:prototipo-fase-5:stale
npm run test:discipulando:prototipo-fase-5
npm run test:discipulando:prototipo-fase-5:e2e
npm run capture:discipulando:prototipo-fase-5
```

## Readiness F7

Congelar código/conteúdo; capturas-base; budgets; browser matrix; `noindex`
coerente; publicação ainda humana.
