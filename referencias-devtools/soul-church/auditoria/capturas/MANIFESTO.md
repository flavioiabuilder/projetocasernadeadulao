# Manifesto de capturas — auditoria Soul Church

Material de **auditoria**, não ativo de produção. As capturas da referência
registram o que foi medido; nenhuma delas é redistribuída como arte, nem
serve de base para reprodução de identidade visual alheia. Nenhuma é
carregada por `demo.html` ou `laboratorio.html` — há teste automatizado
garantindo isso (`../../testes/fronteiras.test.js`).

Arquivos `01`–`11` são da referência; `20`+ são da reconstrução **Átrio**.

Todas foram feitas com **Chrome DevTools MCP** (`take_screenshot`), em WebP
com qualidade 70–72, na resolução mínima necessária para sustentar a
medição. Data de captura: **2026-08-01**.

## Referência

| ID | Arquivo | URL | Viewport | Posição | Interação | Componente | Estado | Observação |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | `01-home-hero-1440x900.webp` | `/` | 1440×900 | topo | recusa de cookies | hero, cabeçalho, barra de serviços | inicial | Vídeo full-bleed, disco da marca, pílula MENU, cartão editorial em linho, barra com horários + marquee |
| 02 | `02-home-megamenu-aberto-1440x900.webp` | `/` | 1440×900 | topo | clique no gatilho | mega menu | aberto | Divisão assimétrica 3:2, réguas pretas de 3px, sete destinos, coluna de contato |
| 03 | `03-home-welcome-1440x900.webp` | `/` | 1440×900 | y≈950 | rolagem | seção editorial | revelado | Moldura em arco (raio 25em no canto superior esquerdo), grade 30em/36.19em, barra flutuante em estado `scrolled` |
| 04 | `04-home-missao-1440x900.webp` | `/` | 1440×900 | y≈1700 | rolagem | palco sticky | scrub parcial | Letras espalhadas em `rama-gothic-e`, círculo de 1px, profundidade só por alfa |
| 05 | `05-home-cards-escuro-1440x900.webp` | `/` | 1440×900 | y≈3100 | rolagem | laje escura, carrossel | inicial | Título sangrado no topo, quatro cartões brancos, último cortado à direita |
| 06 | `06-home-rodape-1440x900.webp` | `/` | 1440×900 | fim | rolagem ao fim | rodapé revelado | revelado | Quatro colunas, disco preto da marca, aviso legal em DM Mono, régua de 3px |
| 07 | `07-home-painel-contato-1440x900.webp` | `/` | 1440×900 | fim | clique no ícone circular | painel contextual | aberto | Véu escurecido, cartão branco sobre camada em linho deslocada, cinco assuntos com régua |
| 08 | `08-planyourvisit-hero-1440x900.webp` | `/plan-your-visit` | 1440×900 | topo | navegação | template editorial | inicial | Mesma casca global; `super-text` em 14.78em |
| 09 | `09-events-listagem-1440x900.webp` | `/events` | 1440×900 | topo | navegação | template de listagem | inicial | **Sem hero e sem barra**; fundo `wheat`; grade de 3 colunas; exatamente um cartão azul |
| 10 | `10-home-mobile-390x844.webp` | `/` | 390×844 @3× | topo | emulação mobile | hero mobile | inicial | Cartão vai para baixo do vídeo com cantos superiores arredondados; setas junto ao CTA |
| 11 | `11-home-menu-mobile-390x844.webp` | `/` | 390×844 @3× | topo | clique no gatilho | menu mobile | aberto | Coluna de apoio oculta; só ícones sociais; barra de serviços persiste em duas linhas |

## Reconstrução (Átrio)

| ID | Arquivo | Página | Viewport | Posição | Componente | Estado | Verificação |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 20 | `20-atrio-hero-1440x900.webp` | `demo.html` | 1440×900 | topo | hero, cabeçalho, barra | inicial | Ciclo 1 — proporção, moldura, superfícies |
| 21 | `21-atrio-editorial-1440x900.webp` | `demo.html` | 1440×900 | y≈1150 | grade editorial, arco, laje | revelado | Ciclo 1 — assimetria, arco, canto de laje sobre a seção seguinte |
| 22 | `22-atrio-caminhos-1440x900.webp` | `demo.html` | 1440×900 | y≈4180 | laje escura, cartões | revelado | Ciclo 2 — título sangrado, contraste dentro de superfície escura |
| 23 | `23-atrio-menu-aberto-1440x900.webp` | `demo.html` | 1440×900 | topo | menu global | aberto | Ciclo 2 e 3 — divisão 3:2, régua, foco no primeiro link |
| 24 | `24-atrio-mobile-390x844.webp` | `demo.html` | 390×844 @2× | topo | hero mobile, barra | inicial | Ciclo 2 — empilhamento, cantos superiores, espaço reservado para a barra |
| 25 | `25-atrio-laboratorio-1440x900.webp` | `laboratorio.html` | 1440×900 | página inteira | inventário | — | Ciclos 1–3 — todos os espécimes |

## Medições brutas

`dados/medicoes-1440x900.json` — estilos computados da referência em
1440×900, gerados por `evaluate_script` e gravados direto em disco pelo MCP,
sem edição manual. Contém escala fluida verificada em cinco viewports,
tipografia, geometria, movimento medido, auditoria de CSS e contagem de
alvos de toque.

## Viewports investigados

Medidos por emulação: **1920×1080**, **1440×900**, **1024×768**,
**991×1024** (para isolar o breakpoint estrutural) e **390×844 @3×**. As
capturas cobrem os estados visualmente distintos; os viewports intermediários
foram medidos numericamente sem captura, por não apresentarem mudança
estrutural — a troca real acontece em 991/992px, com um segundo ajuste
tipográfico em 767px.

## Limitações desta coleta

- Não há captura de quadro intermediário da expansão do menu: a animação
  satura o quadro e a latência do MCP não garante o instante desejado. O
  comportamento foi apurado por **amostragem numérica** de
  `getComputedStyle`, registrada na auditoria §6.1 — evidência mais forte
  que uma imagem borrada.
- Não há gravação de vídeo: o MCP disponível nesta sessão não expõe
  `screencast_start` / `screencast_stop`.
- Não há captura sob throttling de rede nem com JavaScript desligado na
  referência; ambos declarados como não verificados.
