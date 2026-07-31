# Manifesto de capturas — auditoria de referência

Material de **auditoria**, não ativo de produção. As capturas da referência
registram o que foi medido; nenhuma delas é redistribuída como arte, nem
serve de base para reprodução de identidade visual alheia.

Ficheiros `01`–`04` são da referência; `10`+ são da reconstrução local.

| Arquivo | Viewport | Posição narrativa | Interação necessária | Componente observado | Observação |
|---|---|---|---|---|---|
| `01-intro-1440x900.webp` | 1370×637 (janela 1440×900) | Portão de entrada | nenhuma | `#intro`, `.header`, botão *Start* | Display gigante em caixa alta, botão translúcido, linha de horizonte luminosa, textura mineral |
| `02-interchapter-1440x900.webp` | 1370×637 | Cap. I, slide 1 | clique em *Start* | `.chapter`, `.slide`, `.content`, `.footer`, `.longpress-cta` | Coluna editorial de 450px à direita do corpo 3D; trilho inferior com capítulos I e II e "PRESS TO DISCOVER" |
| `03-intro-390x844.webp` | 390×844 (DPR 3) | Portão de entrada | emulação mobile | `#intro` mobile | Rótulo "Sound" oculto; moldura reduzida |
| `04-slide-390x844.webp` | 390×844 (DPR 3) | Cap. I, slide 1 | clique em *Start* | `.chapter` mobile | Trilho troca marcadores por rótulos textuais **Prev. / I / título / Next**; coluna editorial 300px |
| `10-demo-cena1-1370x637.webp` | 1370×637 | Reconstrução, cena 1 | nenhuma | `es-palco`, `es-editorial`, `es-trilho`, cena procedural | Verificação do ciclo 1 |
| `11-laboratorio.webp` | 1370×637, página inteira | Reconstrução, laboratório | nenhuma | inventário completo | Verificação dos ciclos 1 e 2 |

## Medições brutas

`dados/tokens-1440.json` — estilos computados da referência em 1370×637:
tipografia, layout, controles e wrapper da canvas. Gerado por
`evaluate_script`, não editado à mão.

## Viewports investigados

Medidos por emulação no Chrome DevTools MCP: **1440×900**, **1370×637**,
**1024×768**, **768×1024**, **767×1024** (para isolar o breakpoint) e
**390×844 @3×**. As capturas acima cobrem os estados visualmente distintos;
os viewports intermediários foram medidos numericamente sem captura, por não
apresentarem mudança estrutural — o sistema tem um único breakpoint (768px).
