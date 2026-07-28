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
- `assets/img/logo-pdac/LOGO_DaC_Master_Flat_2D_Color.png` (Tela 22)

Inventário completo da marca: [`assets/img/logo-pdac/LEIA-ME.md`](../assets/img/logo-pdac/LEIA-ME.md).

## Navegação

- **Scroll** entre 30 telas (scroll-snap)
- **Teclado:** setas, Page Up/Down, Home, End
- **Menu lateral:** 9 atos (botão Menu)
- **Barra de armadura** (a partir da Tela 09): peças preenchem nas telas 10, 18, 22 e 30; clicáveis para saltar de ato
- **Modo leitura:** revela notas de condução (não projetadas ao vivo)

## Motion (onda 1)

- Entrada em stagger quando a tela entra no viewport (revelação unidirecional)
- Aberturas de ato com filete bronze; fundo muda de temperatura por ato
- Armadura: aparece com deslize; peças “travam” em cascata ao preencher
- Grade 48 e linha da timeline animam só quando a tela respectiva está à vista
- Respeita `prefers-reduced-motion: reduce` (tudo estático)

## Motion (onda 2)

- Flip cards: hover, flip com spring, borda bronze ao virar
- Escudo (Tela 22): parallax leve ao pointer + vinheta brass na entrada
- Matriz: filtro com fade/slide das linhas; underline nos chips ativos
- Anatomia: painéis expandem/recolhem; hover nos botões
- Microinterações: merch, checklist, Adulão tags, eixos, botões de UI

## Tela 29

Checklist em memória (sem `localStorage`). Botões **Copiar resumo** e **Imprimir** (checklist assinável via `@media print`).

## Governança

- Prefácio: apenas **convite** — página reservada, sem autoria pastoral antecipada
- Merch (Tela 24): **ESTUDO — NÃO APROVADO**
- Caderneta (Tela 23): **PROPOSTA**
- Logomarca (Tela 22): arte oficial em `assets/img/logo-pdac/` — apreciação pastoral pendente

## Fonte do roteiro

`docs/roteiro-apresentacao-homologacao-v1.md`
