# Prompt — Direção de arte

## Objetivo

Traduzir briefing + painel de referências em direção visual e rascunho de
tokens (camadas primitivo/semântico), sem implementar o site completo e sem
criar tokens de componente (Fase 4).

## Entradas obrigatórias

- Briefing aprovado ou em revisão avançada
- Painel de referências anotado (seleção proposta ou final)
- Direção visual já aprovada (se existir) — **não reabrir** A/B/C
- Restrições de marca / tipografia / motion já conhecidas
- Inventário de CSS vivo / identidade (quando houver protótipos)

## Artefatos anteriores consumidos

- `01-briefing-estrategico.md`
- `02-painel-referencias.md`
- Decisão visual humana (se houver)
- Template [`03-tokens.json`](../templates/projeto-web/03-tokens.json)
- Schema [`tokens.template.schema.json`](../schemas/tokens.template.schema.json)

## Procedimento

1. Confirmar Direção A (ou equivalente) e frase de direção (candidata ou aprovada).
2. Inventariar âncoras de cor, tipografia, espaço, motion e foco.
3. Resolver drifts com autoridade explícita (identidade > logo kit > legado).
4. Preencher `tokens.json` do programa com `primitivos` e `semanticos` tipados.
5. Gerar `tokens.css` de forma determinística; não editar o CSS à mão.
6. Validar contraste AA, foco visível e `prefers-reduced-motion`.
7. Documentar mapa legado → futuro sem migrar runtime nesta fase.
8. Manter status `0.1.0-candidate` / EM REVISÃO até decisão humana de promoção.

## Arquitetura de tokens

```text
tokens.json  (fonte canônica)
     ↓ geração determinística
tokens.css   (derivado; não editar)

Primitivos → Semânticos
(sem camada de componentes nesta fase)
```

- Formato: contrato Método Estendido Tipado (ME-T): camadas PT-BR
  `primitivos` / `semanticos`; folhas com `$value`, `$type`, `$description`
  (subconjunto alinhado ao DTCG 2025.10 Community Group Report — não W3C Rec).
- Aliases resolvíveis; ciclos rejeitados.
- Semânticos referenciam primitivos; primitivos não referenciam semânticos.
- Nomenclatura semântica em PT-BR por função (`cor.superficie.profunda`).

## Formato da saída

1. Frase de direção (1–2 frases) — candidata ou aprovada
2. Princípios visuais ligados ao painel
3. `tokens.json` parseável sem placeholders de produto
4. `tokens.css` gerado
5. Matriz de contraste e mapa legado
6. Lista do que **não** fazer (anti-padrões)
7. Decisões humanas pendentes (bronze, V1/V2, promoção 1.0.0)

## Critérios de aceite

- Tokens com `primitivos` e `semanticos` parseáveis
- Ligação explícita a referências do painel e à direção aprovada
- Geração JSON → CSS determinística e validada
- Contraste texto normal ≥ 4,5:1; UI/gráfico ≥ 3:1 quando aplicável
- Foco visível; reduced motion previsto
- Sem impor framework de UI
- Sem tokens de componente (`botao.*`, `card.*`, `modal.*`)
- Protótipos runtime não migrados nesta fase

## Proibições

- Unificar identidades distintas sem pedido
- Declarar Figma canônico sem governança
- Converter tudo para OKLCH só por moda
- Usar paleta de um projeto piloto no template genérico GLOBAL
- Criar tokens de componente (Fase 4)
- Introduzir dark mode / `.dark` sem requisito
- Importar Tailwind, React, HSL obrigatório ou pipeline Aramco (`--es-*`)
- Editar CSS/HTML/JS dos protótipos nesta fase
- Promover `1.0.0` sem V1/V2 (ou manter candidate)
- Misturar dialetos (`primitive` / `{{ref:}}` / `$value`) sem adaptador

## Campos variáveis

`{{TOM}}`, `{{RESTRICOES_MARCA}}`, `{{UNIDADE_ESPACO}}`, `{{NOTACAO_COR}}`,
`{{PATH_BRIEFING}}`, `{{PATH_PAINEL}}`, `{{PATH_DECISAO_VISUAL}}`,
`{{PATH_TOKENS_JSON}}`, `{{VERSAO_CANDIDATA}}`

## Como evitar resultados genéricos

Exigir: contraste com pelo menos uma referência descartada; tokens nomeados
pelo papel semântico; motion amarrado a `prefers-reduced-motion`; bronze como
acento editorial (não superfície dominante); papel/creme + navy como contextos,
não tema escuro genérico.

## Armazenamento e versionamento

Prompt em `metodo/prompts/direcao-arte.md`.
Tokens de produto do piloto: `programas/<programa>/design-system/tokens/`.

## Quando não usar

Quando a direção visual já está aprovada e a tarefa é só implementação fiel
de componentes (Fase 4+) ou migração de runtime (Fase 6).

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório (leitura/escrita
apenas nos paths autorizados). Substitua os placeholders `{{…}}` antes de executar.

```text
Papel: Você é Principal Design Systems Architect e diretor de arte sênior.
Idioma: português brasileiro.

Contexto:
- Projeto: {{NOME_DO_PROJETO}}
- Programa: {{NOME_DO_PROGRAMA}}
- Briefing (path): {{PATH_BRIEFING}}
- Painel (path): {{PATH_PAINEL}}
- Decisão visual (path): {{PATH_DECISAO_VISUAL}}
- Saída tokens JSON: {{PATH_TOKENS_JSON}}
- Versão candidata: {{VERSAO_CANDIDATA}}
- Unidade de espaço: {{UNIDADE_ESPACO}}
- Notação de cor: {{NOTACAO_COR}}
- Restrições de marca: {{RESTRICOES_MARCA}}
- Tom: {{TOM}}

Entradas obrigatórias:
1. Leia briefing, painel e decisão visual. Não reabra A/B/C.
2. Inventarie CSS vivo e identidade; classifique CANÔNICO / CANDIDATO / LEGADO.
3. Não aprove V1/V2 automaticamente; se pendentes, mantenha candidate.

Procedimento:
1. Estabeleça tokens.json como fonte canônica e tokens.css como derivado.
2. Preencha primitivos e semanticos (ME-T: $value/$type/$description).
3. Resolva bronze e tipografia com autoridade explícita.
4. Derive escalas com método documentado; valide contraste e gamut.
5. Sistematize espaço (base 4px se aplicável), breakpoints semânticos, foco e motion.
6. Gere CSS deterministicamente; valide aliases e ciclos.
7. Documente mapa legado sem migrar protótipos.
8. Status: EM REVISÃO / {{VERSAO_CANDIDATA}} até decisão humana.

Formato da saída:
- tokens.json + tokens.css gerado
- documento 03-direcao-tokens (ou equivalente de instância)
- matriz de contraste e inventário de drift
- lista de decisões humanas pendentes

Proibições:
- Tokens de componente (botao, card, modal).
- Dark mode inventado; Figma canônico; Tailwind/React obrigatório.
- OKLCH só por moda; interpolação RGB ingênua.
- Contaminar produto com tokens/prefixos Aramco.
- Editar runtime HTML/CSS/JS dos protótipos; alterar copy canônica.
- Misturar dialetos JSON sem contrato.
- Declarar 1.0.0 sem aprovação humana.
- TODO: não inventar endossos pastorais ou conteúdo institucional.

Autoavaliação:
- [ ] primitivos e semanticos parseáveis sem placeholders de produto
- [ ] CSS gerado; geração idempotente
- [ ] contraste AA documentado; foco e reduced motion previstos
- [ ] sem tokens de componente; sem dark mode
- [ ] mapa legado presente; protótipos intocados
- [ ] status candidate se V1/V2 pendentes

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
