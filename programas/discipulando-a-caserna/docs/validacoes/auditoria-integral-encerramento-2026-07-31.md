# Encerramento — auditoria integral (T8-01)

Data: **31 de julho de 2026**.

## Executado

- T0-01 baseline documentado
- T1-01 testes storytelling alinhados
- T1-02 CI chama `npm run validate`
- T1-03 `_guia_tmp.pdf` removido e ignorado
- T2-01 superfície Pages filtrada (`pages.yml` + `docs/publicacao.md`)
- T2-02 skills canônicas em `.claude/skills/`
- T3-01 `js/marcha.js` removido
- T3-02 geração de `licao1.js`
- T3-03 checker de paridade editorial
- T4 encoding read-only, apresentação no gate, Prettier no validate
- T5 headings do Movimento I
- T6 OG web-safe; `package-lock` em 1.0.0
- T7 documentação README/contexto/CHANGELOG

## Decisões técnicas aplicadas (defaults do plano)

| ID  | Default aplicado                                                    |
| --- | ------------------------------------------------------------------- |
| D1  | Artefato Pages = prospecto + assets (não raiz completa)             |
| D2  | `.claude/skills/` canônico                                          |
| D4  | Oficiais: prospecto + homologação; storytelling = protótipo testado |

## Pendências humanas (não inventar)

- Licença (D3 / `TODO.md`)
- Confirmar no GitHub: Pages Source = **GitHub Actions**
- Apreciação pastoral e demais itens de `TODO.md`

## Segurança (devDependencies)

`npm audit --package-lock-only` ainda reporta highs transitivos em
`eslint` / `html-validate` / `minimatch` / `glob`. Não afetam o runtime do
Pages (só tooling). Upgrade major forçado (`npm audit fix --force`) ficou
adiado para evitar quebra de lint; revisar em ciclo próprio.

## Como validar

```bash
npm install
npx playwright install chromium
npm run validate
```

Após esta onda: unitários 42/42; e2e storytelling 3/3 e prospecto cobertos pelo
`validate`.
