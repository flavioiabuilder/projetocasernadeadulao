# Prompt — Prototipagem com IA (Fase 5)

## Objetivo

Construir um **candidato de protótipo** avaliável a partir do Briefing, Painel,
Tokens e Manual do Design System — sem promover o candidato a canônico e sem
iniciar a Fase 6.

## Entradas obrigatórias

- Briefing Estratégico (arquitetura de mensagem + hipóteses)
- Painel de Referências (frase de direção / extrações)
- `tokens.css` semântico (não editar; não usar primitivos)
- Manual do Design System + fichas CMP/PAD usadas
- Conteúdo canônico do projeto (`conteudo/` ou equivalente)
- Path isolado do candidato (nome que **não** simule aprovação)

## Artefatos anteriores consumidos

- `01` … `04` da instância
- [`../fases/fase-5-prototipagem.md`](../fases/fase-5-prototipagem.md)
- Decisão visual normativa do piloto (quando existir)
- Protótipos históricos apenas como **baseline**, não como rivais a “votar”

## Procedimento

1. Confirmar que o path do candidato está isolado e que históricos não serão editados.
2. Montar a composição com os sete blocos deste prompt.
3. Consumir apenas tokens semânticos e contratos CMP/PAD.
4. Usar conteúdo real; declarar lacunas; não inventar prova, CTA ou endosso.
5. Entregar candidato + autoavaliação do que ainda falha.
6. **Não** declarar aprovado, canônico ou liberado para Fase 6.

## Formato da saída

1. Path do candidato e arquivos tocados
2. Mapa movimento → PAD/CMP → fontes de conteúdo
3. Lacunas declaradas
4. Exceções técnicas documentadas
5. Autoavaliação (o que ainda não cumpre)
6. Próximo passo sugerido: crítica estruturada (não canonização)

## Critérios de aceite

- Experiência apresentável sem “imagina que aqui vai ter…”
- Cinco movimentos da arquitetura shipped presentes
- Direção normativa preservada (sem reabrir A/B/C)
- Sem lorem, sem fatos inventados, sem rede/CDN externos
- Autoavaliação explícita; candidato **não** auto-aprovado

## Proibições

- Aceitar a primeira geração como final
- Criar três identidades novas ou Direção D
- Comparar candidatos com conteúdos diferentes
- Inventar conteúdo pastoral, prova, CTA comercial, doação, inscrição
- Hero genérico, cards com ícones, stat strip, glow, glassmorphism
- Editar `tokens.css` / acessar `--primitivo-*`
- Importar CSS do laboratório como runtime de produto sem justificativa
- Alterar protótipos históricos ou migrar runtime (Fase 6)
- Publicar no Pages ou declarar canônico sem decisão humana
- Framework, Tailwind, Storybook, Figma/Stitch como fonte canônica

## Campos variáveis

`{{NOME_DO_PROJETO}}`, `{{PATH_BRIEFING}}`, `{{PATH_PAINEL}}`,
`{{PATH_TOKENS_CSS}}`, `{{PATH_MANUAL}}`, `{{PATH_CONTEUDO}}`,
`{{PATH_CANDIDATO}}`, `{{FRASE_DIRECAO}}`, `{{DIRECAO_NORMATIVA}}`,
`{{MOVIMENTOS}}`, `{{LACUNAS}}`, `{{PROIBICOES_EXTRA}}`

## Como evitar resultados genéricos

Exigir citação de IDs CMP/PAD em cada bloco composto. Se não houver ID, parar
e documentar lacuna — não inventar componente.

## Armazenamento e versionamento

Prompt em `metodo/prompts/prototipagem.md`. Candidato no path da instância;
decisão canônica só em artefato humano da Fase 5.

## Quando não usar

Quando a tarefa for **criticar** um candidato existente — use
[`critica-estruturada.md`](critica-estruturada.md). Quando for implementar
produção — use [`implementacao.md`](implementacao.md) (Fase 6).

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório. Substitua os
placeholders `{{…}}` antes de executar. Este prompt **constrói** candidatos;
não os aprova.

```text
Papel: Você é diretor de arte digital, UX editorial e frontend prototyper
sênior. Nível já rejeitado: landing comercial, dashboard, template religioso
genérico, hero com dois CTAs, cards com ícones, stat strip. Gênero: documento
pastoral/editorial submetido à apreciação. Você NÃO inventa conteúdo
institucional, endossos, cargos, resultados, citações ou contatos.
Idioma: português brasileiro.

Contexto (resumo do briefing — não copie o briefing inteiro):
- Projeto: {{NOME_DO_PROJETO}}
- Destinatário / JTBD / problema / objeção / prova / pedido / status:
  ler {{PATH_BRIEFING}} e condensar em 3–5 linhas factuais.
- Hipóteses e lacunas humanas permanecem hipóteses: {{LACUNAS}}

Direção visual:
- Frase de direção: {{FRASE_DIRECAO}}
- Direção normativa: {{DIRECAO_NORMATIVA}}
- Umbral atmosférico: no máximo UMA ocorrência (import B), se autorizado.
- Estados/checklist: clareza operacional (import C), sem estética SaaS.
- Extrair do painel {{PATH_PAINEL}} apenas o anotado; descartar o descartado.
- NÃO reabrir competição A/B/C; NÃO criar Direção D.

Sistema inegociável:
- Tokens CSS: {{PATH_TOKENS_CSS}} — só semânticos; proibido --primitivo-*.
- Manual: {{PATH_MANUAL}} — classes dc-*; contratos CMP/PAD.
- Acessibilidade essencial: um h1, landmarks, skip, foco visível, teclado,
  reduced motion, conteúdo legível sem JS quando possível.
- Proibido valor visual solto (hex/rgb/hsl/oklch) fora de exceção documentada.
- NÃO importar design-system/laboratorio/css/lab.css como folha de produto.

Estrutura requerida (movimentos shipped):
{{MOVIMENTOS}}
Para cada movimento: pergunta do destinatário → conteúdo canônico → PAD → CMP
→ lacunas declaradas. Uma leitura contínua, não cinco landings.

Conteúdo:
- Fonte: {{PATH_CONTEUDO}}
- Citações literais (>) sem paráfrase.
- Campos null: omitir, sem placeholder inventado.
- Contato/autoria: só de fonte canônica existente; senão LACUNA.

Path do candidato: {{PATH_CANDIDATO}}
- Criar/atualizar apenas este path (HTML/CSS/JS estático, sem build/CDN).
- noindex; fontes/assets locais.
- NÃO editar protótipos históricos; NÃO migrar runtime; NÃO tocar pages.yml.

Restrições e proibições:
- Lista deste prompt + {{PROIBICOES_EXTRA}}
- Sem lorem; sem “imagina que aqui vai ter…”; sem CTA de captação.
- Sem WebGL, parallax contínuo, scroll hijacking, trailer, gamificação.

Critérios de aceite / autoavaliação (OBRIGATÓRIO no final):
1. Liste o que Cumpre / Não cumpre frente a: cinco movimentos, Direção A,
   um umbral, tokens semânticos, Manual, conteúdo real, a11y essencial, RM.
2. Declare explicitamente: "Candidato NÃO aprovado; NÃO canônico; Fase 6 BLOQUEADA."
3. Sugira crítica estruturada no próximo passo — não canonização.
4. Se algo crítico falhar, não maquie: registre lacuna ou bloqueio.

Proibições finais: não simular decisão humana F5-08/F5-10/F5-12; não publicar;
não promover pasta por nome (final/aprovado/vencedor).
```
