# Apresentação de homologação pastoral (v2)

Artefato irmão do prospecto multiarquivo (`index.html`). Destinado ao **Pr. Glaydston** para leitura **autônoma** (sem apresentador) — apreciação, orientação e validação pastoral do Guia Mestre v1.0-RC.

## O que mudou na v2

- 33 telas (inclui “Antes de começar”, perguntas antecipadas e “se a resposta for não”)
- Notas do autor e fechos de ato no corpo (sem notas de condução oral)
- **Versão contínua** (substitui “Modo leitura”): rolagem livre / impressão
- Retomada via `localStorage`, setas em mobile, chip de progresso
- Matriz com filtro padrão no Módulo 1; checklist em três blocos
- Prefácio do Guia: página reservada (rascunho fora do documento enviado)

## Tipografia e offline

- Fontes **Montserrat** + **Source Serif 4** embutidas em base64 no HTML.
- Abre offline com duplo clique; sem CDN (exceto se a logomarca PNG for carregada por caminho relativo — mantenha a pasta `assets` ao lado).

## Regenerar

```bash
npm run generate:apresentacao
```

Fontes de conteúdo:

- `ferramentas/apresentacao-screens-v2.js` (telas)
- `ferramentas/gerar-apresentacao-homologacao.js` (CSS/JS/shell)
- `conteudo/matriz-curricular.json` (sincronizada com Quadro 1 do Guia)

## Contato no checklist

`casernadeadulao@gmail.com` (sem telefone inventado no documento)

## Fonte do roteiro de refatoração

Documento de trabalho da v2 (refatoração deck → documento autônomo), 28/07/2026.
