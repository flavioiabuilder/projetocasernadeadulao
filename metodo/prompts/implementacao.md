# Prompt — Implementação a partir do design (Fase 6)

## Objetivo

Converter uma seção ou tela aprovada em código de produção sustentável,
montando a partir do design system existente — sem inventar componente,
sem valor visual fora dos tokens e sem reabrir direção de arte.

## Entradas obrigatórias

- Seção/tela alvo, delimitada (uma por execução)
- Manual do design system do projeto (componentes, padrões, estados)
- Tokens canônicos (`tokens.json` → `tokens.css` gerado)
- Stack e regras do agente do projeto
- Lista de paths gerados que **não** podem ser editados à mão

## Artefatos anteriores consumidos

- `01-briefing-estrategico.md` (arquitetura de mensagem — a ordem das seções)
- `02-painel-referencias.md` (frase de direção)
- `03-tokens.json` / `tokens.css`
- `04-manual-sistema.md` (contrato de componentes e padrões)
- `05-regras-agente.md` (stack, convenções, proibições do projeto)
- [`../fases/fase-6-implementacao.md`](../fases/fase-6-implementacao.md)

## Procedimento

1. Ler manual e tokens **antes** de abrir qualquer arquivo de código.
2. Mapear a seção em componentes e padrões **já existentes**.
3. Se faltar peça, parar e justificar a criação antes de escrever código.
4. Apresentar o plano (componentes usados, criados, estrutura) e aguardar aprovação.
5. Implementar mobile-first, consumindo apenas tokens semânticos.
6. Implementar a matriz de estados aplicável a cada elemento interativo.
7. Verificar renderização nos breakpoints do projeto.
8. Rodar os gates do repositório e reportar exit codes.
9. Revisar o próprio diff antes de declarar concluído.

## Formato da saída

1. Plano (pré-código): componentes reutilizados, criados com justificativa, estrutura da seção
2. Diff proposto, arquivo a arquivo
3. Tabela de estados implementados por elemento interativo
4. Lista de valores visuais usados e o token de origem de cada um
5. Comandos executados + exit codes
6. Pendências e decisões humanas necessárias

## Critérios de aceite

- Nenhum valor de cor, espaço, raio, tipografia ou motion fora dos tokens
- Componentes consomem tokens **semânticos**, nunca primitivos
- Todo elemento interativo tem `default`, `hover`, `focus-visible`, `active`,
  `disabled` e, quando aplicável, `loading`, `erro` e `vazio`
- Hierarquia de cabeçalhos sem saltos; um `h1` por página
- Ordem do DOM igual à ordem visual de leitura
- Alvos de toque ≥ 44×44 quando aplicável
- `prefers-reduced-motion` respeitado
- Gates do repositório verdes ou falha explicada
- Nenhum arquivo gerado editado à mão

## Proibições

- Criar componente sem justificar a ausência de equivalente
- Introduzir framework, biblioteca de UI ou utilitário CSS não previsto na stack
- Editar arquivos gerados (dados, homologação, `_gerado/`)
- Alterar copy canônica para acomodar layout
- Reabrir direção de arte, paleta ou tipografia
- Migrar runtime de protótipos sem decisão humana registrada
- `outline: none` sem substituto visível
- Estilo inline, `!important` ou valor mágico "só desta vez"
- Commit sem revisão do diff

## Campos variáveis

`{{ALVO}}`, `{{PATH_MANUAL}}`, `{{PATH_TOKENS_CSS}}`, `{{PATH_COMPONENTES}}`,
`{{BREAKPOINTS}}`, `{{COMANDOS_VALIDATE}}`, `{{PATHS_GERADOS}}`, `{{STACK}}`

## Como evitar resultados genéricos

Exigir montagem a partir do inventário, não geração livre: o agente deve
**citar o identificador** do componente/padrão que está usando em cada bloco.
Quando não houver identificador para citar, é sinal de que ele está inventando.

## Armazenamento e versionamento

Prompt em `metodo/prompts/implementacao.md`.
Saída de código no repositório do projeto; evidência de fase em
`docs/metodo/fase-6/` da instância.

## Quando não usar

Quando a direção ainda não foi aprovada (volte à Fase 5), quando o manual do
sistema ainda é stub (Fase 4 incompleta) ou quando a tarefa é auditoria —
use [`auditoria-final.md`](auditoria-final.md).

## PROMPT EXECUTÁVEL

Cole o bloco abaixo em um agente com acesso ao repositório (leitura/escrita
apenas nos paths autorizados). Substitua os placeholders `{{…}}` antes de executar.

```text
Papel: Você é engenheiro front-end sênior implementando contra um design
system já documentado. Você monta; você não inventa.
Idioma: português brasileiro.

Contexto:
- Projeto: {{NOME_DO_PROJETO}}
- Alvo desta execução (uma seção/tela): {{ALVO}}
- Manual do design system: {{PATH_MANUAL}}
- Tokens CSS gerados: {{PATH_TOKENS_CSS}}
- Diretório de componentes: {{PATH_COMPONENTES}}
- Stack: {{STACK}}
- Breakpoints a verificar: {{BREAKPOINTS}}
- Paths gerados (NÃO editar à mão): {{PATHS_GERADOS}}
- Comandos de validação: {{COMANDOS_VALIDATE}}

Entradas obrigatórias:
1. Leia o manual e os tokens antes de abrir arquivos de código.
2. Liste os componentes e padrões existentes que cobrem o alvo, por identificador.
3. Não reabra direção de arte, paleta, tipografia ou copy canônica.

Procedimento:
1. PRIMEIRO apresente o plano e AGUARDE aprovação humana:
   - componentes/padrões reutilizados (por identificador)
   - o que precisa ser criado e por que não existe equivalente
   - estrutura da seção e hierarquia de cabeçalhos
2. Só depois implemente, mobile-first, consumindo apenas tokens semânticos.
3. Implemente a matriz de estados de cada elemento interativo.
4. Verifique a renderização em {{BREAKPOINTS}}.
5. Rode {{COMANDOS_VALIDATE}} e reporte exit codes reais.
6. Apresente o diff para revisão; não conclua sem ela.

Formato da saída:
- plano pré-código
- diff arquivo a arquivo
- tabela: elemento interativo × estados implementados
- tabela: valor visual usado × token de origem
- comandos + exit codes
- pendências humanas

Proibições:
- Valor visual fora dos tokens; componente consumindo primitivo direto.
- Criar componente sem justificar ausência de equivalente.
- Framework, biblioteca de UI ou utilitário CSS fora da stack declarada.
- Editar arquivos gerados; alterar copy canônica; migrar runtime de protótipo.
- outline: none sem substituto; estilo inline; !important; valor mágico.
- Declarar gate verde sem exit code.
- TODO: não inventar conteúdo institucional, endossos, datas ou resultados.

Autoavaliação (responda antes de entregar):
- [ ] todo valor visual tem token de origem citado
- [ ] nenhum componente consome primitivo diretamente
- [ ] matriz de estados completa por elemento interativo
- [ ] cabeçalhos sem salto; ordem do DOM = ordem de leitura
- [ ] foco visível; reduced motion respeitado; alvos ≥ 44×44 quando aplicável
- [ ] gates rodados com exit code reportado
- [ ] nenhum arquivo gerado tocado à mão
- [ ] o que ainda NÃO cumpre está listado explicitamente

Critérios de aceite: iguais à seção “Critérios de aceite” deste arquivo.
```
