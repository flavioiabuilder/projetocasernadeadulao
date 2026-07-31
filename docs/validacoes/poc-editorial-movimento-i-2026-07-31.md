# PoC — geração editorial MD→HTML (T4-01 / T5-01)

Data: **31 de julho de 2026**.  
Script: `ferramentas/gerar-editorial.js` (`npm run generate:editorial`).  
Saída efêmera: `_gerado/editorial/` (gitignored).

## Escopo da PoC

- Preferência do plano: PoC-A (Node), não Eleventy/Astro/React.
- Implementação estendida a **15 seções** (todos os movimentos), mantendo
  `index.html` como canônico de produção (não injeta no prospecto).

## Medições (execução local)

| Métrica                                           | Valor                         |
| ------------------------------------------------- | ----------------------------- |
| Tempo `generate:editorial`                        | ~196 ms                       |
| Seções geradas                                    | 15                            |
| Quotes extraídas do MD                            | 60                            |
| Quotes encontradas no `index.html` (normalizadas) | 57 (95%)                      |
| Bytes HTML gerados                                | ver `relatorio.json` na saída |
| Substitui produção?                               | **Não**                       |

## Interpretação

- Cobertura alta indica que o texto canônico em `conteudo/*.md` já está,
  em grande parte, presente no prospecto — o gerador é viável como fonte de
  fragmentos.
- Os ~5% ausentes refletem prosa/layout do `index.html` que não está só em
  blockquotes do MD (tabelas parciais, UI curricular, selos tipográficos, etc.).
- O HTML gerado **não** reproduz a marcação visual completa (abertura com
  brasão, escudo interativo, matriz JS, etc.). Substituição cega quebraria a UI.

## Go / No-go

| Critério                           | Resultado               |
| ---------------------------------- | ----------------------- |
| Cobertura textual de quotes ≥ 85%  | **GO_CONDICIONAL**      |
| Paridade visual/a11y por movimento | Pendente (humano + e2e) |
| Substituir `index.html` agora      | **NO_GO**               |

**Decisão técnica registrada:** manter pipeline paralelo; evoluir templates por
movimento; só promover a produção após review visual/a11y e expansão do checker
de paridade. Eleventy (PoC-B) **não** necessário nesta etapa.

## Como reproduzir

```bash
npm run generate:editorial
# inspecionar _gerado/editorial/secao-1.html … secao-15.html
# e _gerado/editorial/relatorio.json
npm test -- testes/unitarios/editorial.test.js
```
