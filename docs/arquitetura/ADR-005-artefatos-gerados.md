# ADR-005 — Artefatos gerados

- **Status:** Aceita
- **Data:** 2026-07-31

## Decisão

### Versionados no Git (estado atual)

- `js/dados/*.js`
- Bloco `FALLBACK-DADOS` em `index.html`
- `apresentacao/homologacao-pastoral.html`

**Motivo:** clone utilizável sem `npm install` para leitura local; CI de
qualidade regenera e falha se houver drift.

### Não versionar / efêmeros

- `_site/` (artefato Pages)
- Saída da PoC/geração editorial em `_gerado/` (gitignore)
- `node_modules/`, relatórios Playwright

### Regras

1. Não editar à mão arquivos gerados.
2. Após alterar JSON (ou manifesto Lição 1): `npm run generate`.
3. Após alterar screens da apresentação: `npm run generate:apresentacao`.
4. O workflow Pages executa `npm run generate` antes de montar `_site/`.
5. Geração editorial MD→HTML permanece **paralela** até aceite humano de paridade;
   `index.html` de produção continua canônico até lá.

## Alternativa rejeitada por agora

- Remover gerados do Git e gerar só na CI: complica abertura imediata do clone
  e revisão offline sem Node. Pode ser revisitada depois.
