# Estratos — fronteiras de ativo e licença

Regra única: **nada da Aramco entra neste repositório, e nada é carregado do
domínio deles em runtime.**

---

## Verificação

```bash
grep -ri "aramco" design-system/
```

Resultado verificado: **uma** ocorrência, no campo `$meta.origem` de
`tokens/tokens.json`, que cita o caminho do documento de auditoria como
proveniência. É uma referência bibliográfica, não um ativo. Nenhum arquivo de
código, estilo ou marcação contém o nome.

```bash
grep -rEo "https?://[^\"')  ]+" design-system/
```

Resultado verificado: **uma** ocorrência, `http://www.w3.org/2000/svg` — o
namespace XML do SVG, exigido pela especificação. Namespaces não são
requisições: nenhum byte é buscado nesse endereço.

Nenhum arquivo em `design-system/` faz requisição de rede. A demo e o
laboratório funcionam offline, abertos por `file://`.

---

## Inventário de substituições

### Fontes

| Papel   | Referência (proprietária)                | Substituta adotada  | Licença                   |
| ------- | ---------------------------------------- | ------------------- | ------------------------- |
| Display | `ManifaPro2` (Regular 400, SemiBold 453) | **Archivo**         | SIL Open Font License 1.1 |
| Corpo   | `Ghawar` Light 300                       | **Inter** Light 300 | SIL Open Font License 1.1 |

ManifaPro2 e Ghawar são tipografias corporativas sob medida, licenciadas para o
domínio da Aramco. Os arquivos `.woff2` **não foram baixados**.

**Critério da substituição** — o que precisava sobreviver:

| Característica medida                   | Por que importa                              | Archivo / Inter               |
| --------------------------------------- | -------------------------------------------- | ----------------------------- |
| Peso leve disponível (300)              | a entrelinha 0.80 só funciona com traço fino | ambas têm                     |
| Grotesca neutra, sem contraste modulado | a personalidade vem da escala, não da letra  | ambas são                     |
| Altura-x generosa                       | corpo a 14px precisa de legibilidade         | ambas têm                     |
| Largura estreita no display             | título de 70px em coluna de 450px            | Archivo tem versões estreitas |

**Estado atual:** os tokens declaram `"Estratos Display"` e `"Estratos Texto"`
como primeiro nome, com fallback para Archivo, Inter e `system-ui`. **Nenhum
arquivo de fonte é distribuído aqui.** Para auto-hospedar, baixe as famílias do
Google Fonts, coloque os `.woff2` em `design-system/fontes/` e declare:

```css
@font-face {
  font-family: "Estratos Display";
  src: url("../fontes/archivo-light.woff2") format("woff2");
  font-weight: 300;
  font-display: swap;
}
```

Sem esse passo o sistema cai em `system-ui` e permanece funcional — a escala,
os pesos e o ritmo não dependem da família específica.

### Geometria e texturas

| Referência                              | Tamanho | Substituto                          |
| --------------------------------------- | ------- | ----------------------------------- |
| `models/BirthOfOil.glb`                 | 1148 KB | esfera implícita no fragment shader |
| `textures/earth-topography.jpg`         | 1476 KB | fBm de 5 oitavas, procedural        |
| `textures/earth-lightmap.jpg`           | 320 KB  | Lambert analítico no shader         |
| `textures/depths.jpg`                   | 452 KB  | gradiente de campo no shader        |
| `textures/rock-RG_normal-B_Diffuse.jpg` | 181 KB  | ruído por valor, procedural         |
| `textures/noise-solid-normal.jpg`       | 33 KB   | `feTurbulence` em data URI (CSS)    |
| `textures/envmap.jpg`, `gradient.jpg`   | 14 KB   | gradientes CSS                      |
| `msdf/manifa-en.png` + `.json`          | 96 KB   | não reproduzido — texto é DOM       |

**Total substituído: ~3.7 MB de ativos binários → 0 bytes.**

### Áudio

| Referência                                          | Substituto |
| --------------------------------------------------- | ---------- |
| `audio/main.mp3` (683 KB, trilha ambiente)          | nenhum     |
| `audio/voiceover-en/*.mp3` (narração por parágrafo) | nenhum     |
| `audio/{open,close,click,hover}.mp3`                | nenhum     |

O controle de som existe como **componente** (`.es-som`), com estado, animação e
semântica corretos, mas não carrega mídia. Quem adotar o sistema fornece o
próprio áudio licenciado. Documentar o componente sem entregar o ativo é o
comportamento correto: o padrão de interação é reutilizável, o conteúdo sonoro
não é nosso para distribuir.

### Conteúdo editorial

Nenhuma frase da referência foi copiada. A demo usa um texto original em quatro
tempos ("Antes da luz", "Primeiro traço", "Pleno meio-dia", "Retorno"), escrito
para esta demonstração, sem relação com petróleo, geologia corporativa ou
história institucional.

### Logotipo e identidade

Nenhuma marca é reproduzida. O `.es-portico__marca` é um slot vazio.

### Paleta

A estrutura de papéis (campo dessaturado, texto quase branco com tintura, um
acento luminoso, filetes a 20%) é preservada porque é **arquitetura de
contraste**, não identidade. Os valores são independentes:

| Papel  | Referência                    | Estratos                           |
| ------ | ----------------------------- | ---------------------------------- |
| Campo  | verdes sálvia / menta pálidos | ardósia fria `#24333c` → `#a9bcc0` |
| Acento | azul-petróleo `#007FAD`       | âmbar `#e8b177`                    |
| Texto  | `#F4FFF3` (tintura verde)     | `#f2f7f4` (tintura fria)           |

O deslocamento de matiz — teal → âmbar — é deliberado: é a decisão que garante
que a reconstrução não seja confundível com a marca de origem, mesmo por quem
conhece as duas.

---

## O que foi preservado, e por quê é legítimo

Preservamos **decisões estruturais mensuráveis**, não expressão:

| Preservado                               | Natureza                                               |
| ---------------------------------------- | ------------------------------------------------------ |
| Escala tipográfica conduzida pela altura | solução técnica a um problema (palco de viewport fixo) |
| Proporções 0.80 / 1.60 / 1.30            | razões numéricas                                       |
| Breakpoint em 768px                      | medida                                                 |
| Distâncias 50 / 150 / 300px              | medida                                                 |
| Coluna editorial de 450px / 300px        | medida                                                 |
| Moldura de 60px / 30px                   | medida                                                 |
| DPR limitado a 2                         | estratégia de desempenho                               |
| Progressão discreta com trilho           | padrão de interação                                    |

Medidas e padrões de interação não são obra protegida; a expressão visual
concreta — fontes, cores de marca, textos, imagens, modelos, shaders, código —
é, e nenhuma delas foi usada.

---

## Sem hotlink

Nenhum arquivo referencia `aramco.com` nem qualquer domínio externo. Não há
`<link>`, `<img>`, `fetch`, `@import` ou `url()` apontando para fora do
repositório. As duas únicas ocorrências que um grep encontra são o namespace
SVG e o data URI do ruído — nenhuma delas gera requisição. Ver §Verificação.
