# Fase 7 — Qualidade e conformidade

**Objetivo.** Provar, com evidência, que a superfície atende ao padrão
prometido. Sem esta fase, “profissional” é opinião.

Estado no piloto: **parcial**. Há gates automatizados fortes e auditorias
pontuais em
[`docs/validacoes/`](../../programas/discipulando-a-caserna/docs/validacoes/),
mas nenhum relatório integral com números de performance.

Prompt: [`../prompts/auditoria-final.md`](../prompts/auditoria-final.md).
Checklist: [`../checklists/pre-lancamento.md`](../checklists/pre-lancamento.md).

## 7.1 Performance

Meça em condições realistas — rede móvel simulada, dispositivo de gama média —
não no desktop com fibra.

| Métrica | O que mede                                 | Alvo de referência |
| ------- | ------------------------------------------ | ------------------ |
| **LCP** | Quando o conteúdo principal aparece        | ≤ 2,5 s            |
| **INP** | Resposta à interação do usuário            | ≤ 200 ms           |
| **CLS** | Estabilidade visual durante o carregamento | ≤ 0,1              |

> **Estes alvos são referência, não budget contratado deste repositório.**
> [`../CONVENCOES.md`](../CONVENCOES.md) registra `REPO — sem budget numérico
formal nesta fase`. Adotá-los como gate é decisão humana pendente; até lá,
> medir e registrar o número já é o ganho.

As causas de falha são quase sempre as mesmas cinco: imagem grande sem formato
moderno; fonte web sem `font-display` e sem `preload`; JavaScript de terceiro
bloqueante; ausência de `width`/`height` em mídia; animação de propriedade que
força recálculo de layout.

Correções de maior retorno: AVIF/WebP com dimensões declaradas;
`loading="lazy"` abaixo da dobra; subsetting de fontes variáveis; adiar
scripts de terceiros; animar somente `transform` e `opacity`.

## 7.2 Acessibilidade

Automatize o que dá — mas ferramentas automáticas detectam cerca de **um terço**
dos problemas reais. O resto é julgamento humano.

Automatizado aqui: `npm run test:a11y` (Axe via Playwright) e o e2e do
laboratório do design system.

**Roteiro manual — quinze minutos, obrigatório:**

1. Navegue a página inteira **só com Tab**. O foco está sempre visível? A ordem
   faz sentido? Dá para sair de todos os componentes?
2. Amplie para **200%**. Algo se sobrepõe, corta ou some?
3. Desligue o CSS. O conteúdo continua em ordem lógica?
4. Passe um leitor de tela pelos cabeçalhos. A estrutura conta a história da página?
5. Verifique o contraste dos estados de **foco, hover e desabilitado** — não só
   do texto em repouso. É onde quase todo projeto falha.

## 7.3 SEO técnico

Aplicar **conforme a política de indexação do projeto**. Neste repositório há
superfícies com `noindex` deliberado — ver
[`docs/publicacao.md`](../../docs/publicacao.md). Metadados corretos continuam
valendo para compartilhamento por link, mesmo sem indexação.

- Título único por página, 50–60 caracteres, com o termo real de busca.
- Meta description 140–160 caracteres, escrita para o clique.
- Um único `h1` por página; hierarquia sem saltos.
- Dados estruturados schema.org compatíveis com o tipo de organização.
- Open Graph e Twitter Card com imagem 1200×630 — a primeira impressão do link.
- URLs curtas, semânticas e estáveis; canônicas definidas; `sitemap` e `robots.txt` corretos.
- Texto alternativo real; nomes de arquivo descritivos.

## 7.4 QA visual automatizado

Abrir a superfície em 375, 768, 1280 e 1920 px; capturar cada seção; comparar
com a referência aprovada; listar divergências **com localização**. Pega em
minutos o que passa despercebido em revisão manual: espaçamento inconsistente
entre seções, quebra de texto em telas intermediárias, estado de foco ausente,
imagem esticada.

Prompt: [`../prompts/qa-visual.md`](../prompts/qa-visual.md).

## Procedimento

1. Registrar ambiente de medição.
2. Rodar gates automatizados; anotar exit codes.
3. Executar o roteiro manual de acessibilidade.
4. Medir CWV em rede móvel simulada.
5. Conferir SEO conforme a política de indexação.
6. Varrer valores visuais fora dos tokens.
7. Ordenar achados por impacto × esforço; emitir go / no-go.

## Entregável

Relatório de QA em `docs/metodo/fase-7/` ou `docs/validacoes/` da instância,
com ambiente, números, seletores e decisão go / no-go.

## Critério de aceite

> Existe um relatório com números, não uma afirmação de que está bom.

## Proibições

- “Lighthouse OK” sem o número
- Métrica de desktop reportada como rede móvel
- Tratar scanner automático como cobertura completa
- Corrigir durante a auditoria — auditar e corrigir são passos separados
- Alterar conteúdo canônico para melhorar métrica
- Publicar docs internos, fontes restritas ou referências de estudo
