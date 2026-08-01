# Inspeção V6 — referências externas (Fase 2)

- **Data:** 2026-08-01
- **Ferramenta:** Playwright (Chromium)
- **Viewports:** 360×800, 768×1024, 1440×900
- **Reduced motion:** emulado com `prefers-reduced-motion: reduce`
- **Capturas:** **não** versionadas (V3 pendente)

## Resumo

| REF     | URL                                             | HTTP | Título                                                    | Overflow-X | Erro                                                                             |
| ------- | ----------------------------------------------- | ---- | --------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| REF-01  | https://ptsem.edu/academics/our-curriculum/     | 200  | Our Curriculum - Princeton Theological Seminary           | não        |                                                                                  |
| REF-02  | https://rapport2023-2024.upadi.ca/en/           | 200  | Annual Report 2023-2024 / UPA DI / Lands of Engagement    | sim        |                                                                                  |
| REF-03  | https://report.dogwoodhealthtrust.org/          | 200  | 2024 Annual Report - Dogwood Health Trust / Annual Report | não        |                                                                                  |
| REF-04  | https://bibleproject.com/                       | 202  |                                                           | não        | page.evaluate: Execution context was destroyed, most likely because of a navigat |
| REF-05  | https://www.themarshallproject.org/about/inside | 200  | The Marshall Project Inside / The Marshall Project        | não        |                                                                                  |
| REF-06  | https://www.primary-paper.com/                  | 200  | PRIMARY PAPER                                             | não        |                                                                                  |
| REF-06b | https://www.lapa.ninja/post/primary-paper/      | 403  | Attention Required! / Cloudflare                          | não        |                                                                                  |
| REF-07  | https://www.aramco.com/en/about-us/our-history  | —    |                                                           | não        | page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.aramco.com/en/about-us/o |

## Detalhe por referência

### REF-01

- URL: https://ptsem.edu/academics/our-curriculum/
- Status HTTP: 200
- Título: Our Curriculum - Princeton Theological Seminary
- Texto body (chars): 5202
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1                   | nav | scrollHeight |
| -------- | ---------- | -------------------- | --- | ------------ |
| 360x800  | não        | sim (Our Curriculum) | sim | 7699         |
| 768x1024 | não        | sim (Our Curriculum) | sim | 4568         |
| 1440x900 | não        | sim (Our Curriculum) | sim | 3922         |

### REF-02

- URL: https://rapport2023-2024.upadi.ca/en/
- Status HTTP: 200
- Título: Annual Report 2023-2024 | UPA DI | Lands of Engagement
- Texto body (chars): 7632
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1                           | nav | scrollHeight |
| -------- | ---------- | ---------------------------- | --- | ------------ |
| 360x800  | sim        | sim (Annual Report2023-2024) | sim | 52010        |
| 768x1024 | sim        | sim (Annual Report2023-2024) | sim | 8660         |
| 1440x900 | não        | sim (Annual Report2023-2024) | sim | 9277         |

### REF-03

- URL: https://report.dogwoodhealthtrust.org/
- Status HTTP: 200
- Título: 2024 Annual Report - Dogwood Health Trust | Annual Report
- Texto body (chars): 6234
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1                       | nav | scrollHeight |
| -------- | ---------- | ------------------------ | --- | ------------ |
| 360x800  | não        | sim (Annual Report 2024) | não | 8456         |
| 768x1024 | não        | sim (Annual Report 2024) | não | 7967         |
| 1440x900 | não        | sim (Annual Report 2024) | não | 7136         |

### REF-04

- URL: https://bibleproject.com/
- Status HTTP: 202
- Título: —
- Texto body (chars): 0
- Reduced motion (amostra body): —
- Erro: `page.evaluate: Execution context was destroyed, most likely because of a navigation`

| Viewport | overflow-X | h1  | nav | scrollHeight |
| -------- | ---------- | --- | --- | ------------ |

### REF-05

- URL: https://www.themarshallproject.org/about/inside
- Status HTTP: 200
- Título: The Marshall Project Inside | The Marshall Project
- Texto body (chars): 2050
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1                                | nav | scrollHeight |
| -------- | ---------- | --------------------------------- | --- | ------------ |
| 360x800  | não        | sim (The Marshall Project Inside) | não | 3938         |
| 768x1024 | não        | sim (The Marshall Project Inside) | não | 2503         |
| 1440x900 | não        | sim (The Marshall Project Inside) | não | 2167         |

### REF-06

- URL: https://www.primary-paper.com/
- Status HTTP: 200
- Título: PRIMARY PAPER
- Texto body (chars): 1304
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1  | nav | scrollHeight |
| -------- | ---------- | --- | --- | ------------ |
| 360x800  | não        | não | não | 9444         |
| 768x1024 | não        | não | não | 3408         |
| 1440x900 | não        | não | não | 4107         |

### REF-06b (galeria secundária)

- URL: https://www.lapa.ninja/post/primary-paper/
- Status HTTP: 403
- Título: Attention Required! | Cloudflare
- Texto body (chars): 687
- Reduced motion (amostra body): body animation=none; transition=all

| Viewport | overflow-X | h1                                 | nav | scrollHeight |
| -------- | ---------- | ---------------------------------- | --- | ------------ |
| 360x800  | não        | sim (Sorry, you have been blocked) | não | 1126         |
| 768x1024 | não        | sim (Sorry, you have been blocked) | não | 1024         |
| 1440x900 | não        | sim (Sorry, you have been blocked) | não | 1021         |

### REF-07

- URL: https://www.aramco.com/en/about-us/our-history
- Status HTTP: falha
- Título: —
- Texto body (chars): 0
- Reduced motion (amostra body): —
- Erro: `page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.aramco.com/en/about-us/our-history
  Call log:
  - navigating to "https://www.aramco.com/en/about-us/our-history", waiting until "domcontentloaded"
    `

| Viewport | overflow-X | h1  | nav | scrollHeight |
| -------- | ---------- | --- | --- | ------------ |

## Achados para curadoria

- REF-06 site original acessível; galeria Lapa Ninja é fonte secundária.
- REF-04/05: confirmar se a dobra reforça apenas ética/pedagogia (ver painel).
- REF-07: se timeout/erro, evidência permanece o estudo DevTools interno.
- REF-08 (acervo): não inspecionada aqui — paths locais + capturas próprias.
- Esta inspeção **não** aprova V1/V2.
