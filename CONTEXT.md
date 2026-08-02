# CONTEXT — vocabulário compartilhado do repositório

Documento de domínio para agentes (Matt Pocock / grill-with-docs).
**Só fatos já confirmados** nas rules e em `conteudo/`. Não inventar.

## Hierarquia (não sinônimos)

| Termo | Significado |
| --- | --- |
| Projeto Caserna de Adulão | Projeto ministerial/institucional mais amplo; raiz deste repositório |
| Discipulando a Caserna | Programa específico em `programas/discipulando-a-caserna/` — protagonista das apresentações do programa |
| Pr. Glaydston | Destinatário pastoral da apresentação (apreciação, orientação, validação) |

## Natureza do prospecto

- Prospecto pastoral + carta institucional + apresentação de projeto — **não** portal de igreja, landing comercial, plataforma de cursos nem captação.
- Superfícies HTML atuais são **protótipos** sob `programas/discipulando-a-caserna/prototipos/`.
- Fonte canônica de conteúdo do programa: `programas/discipulando-a-caserna/conteudo/`.
- Citações `>` em Markdown canônico são **literais** — não parafrasear.
- Escrituras: NAA, referências decimais; o texto bíblico governa a aplicação.

## Áreas do repositório

| Área | Path | Papel |
| --- | --- | --- |
| Programa | `programas/discipulando-a-caserna/` | Discipulando a Caserna |
| Método | `metodo/` | Fase 0 — templates/prompts (não publicado) |
| Referências DevTools | `referencias-devtools/` | Estudos técnicos — **não** produto ministerial |
| Skills de agente | `.claude/skills/` | Canônico (ADR-006) |

## Restrições duras para agentes

- Não inventar endossos, aprovações, cargos, datas, resultados ou lacunas do Guia Mestre.
- Não editar manualmente `js/dados/*.js` gerados nem blocos `FALLBACK-DADOS`.
- Commits na branch `main` (sem feature branches no dia a dia).
- Gate: `npm run validate` / `npm run validate:discipulando`.

## Docs de agente

- Catálogo: [`docs/agent-skills.md`](docs/agent-skills.md)
- Notas / ADRs de sessão: [`docs/agent/`](docs/agent/)
