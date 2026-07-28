# Apresentação de homologação pastoral

Artefato irmão do prospecto multiarquivo (`index.html`). Destinado ao **Pr. Glaydston** para apreciação, orientação e validação pastoral do Guia Mestre v1.0-RC.

## Tipografia e offline

- Fontes **Montserrat** + **Source Serif 4** embutidas em base64 no HTML (mesmas do prospecto).
- Abre offline com duplo clique; sem CDN.
- Paleta alinhada à Direção A; cantos retos (sem `border-radius`); filetes editoriais.

## Regenerar

```bash
npm run generate:apresentacao
```

Ou:

```bash
node ferramentas/gerar-apresentacao-homologacao.js
```

O script lê em tempo de geração:

- `conteudo/matriz-curricular.json` (matriz filtrável, Tela 16)
- `assets/img/marca-escudo.svg` (Tela 22)

## Navegação

- **Scroll** entre 30 telas (scroll-snap)
- **Teclado:** setas, Page Up/Down, Home, End
- **Menu lateral:** 9 atos (botão Menu)
- **Barra de armadura** (a partir da Tela 09): peças preenchem nas telas 10, 18, 22 e 30; clicáveis para saltar de ato
- **Modo leitura:** revela notas de condução (não projetadas ao vivo)

## Tela 29

Checklist em memória (sem `localStorage`). Botões **Copiar resumo** e **Imprimir** (checklist assinável via `@media print`).

## Governança

- Prefácio: apenas **convite** — página reservada, sem autoria pastoral antecipada
- Merch (Tela 24): **ESTUDO — NÃO APROVADO**
- Caderneta (Tela 23): **PROPOSTA**
- Logomarca (Tela 22): **estudo visual** — homologação pendente

## Fonte do roteiro

`docs/roteiro-apresentacao-homologacao-v1.md`
