# Fronteiras de ativos e licença

| Ativo da referência | Tratamento |
| --- | --- |
| Logotipo / marca Korowa | Não copiado |
| Fotografias / vídeo da Korowa | Não copiados. `hero-back.webp`/`hero-front.webp` (URLs `cdn.prod.website-files.com`) nunca foram baixados — a **técnica** de composição foi medida via DOM/CSSOM (P9), não o arquivo |
| Copy editorial | Não copiado; Atlas Editorial neutro |
| Modelos 3D / shaders | N/A (0 canvas) |
| Fontes | **DM Sans** observada — SIL OFL, permitida; carregada via Google Fonts |
| Bundles / código | Não redistribuídos |

## Técnica clonada, ativo substituído: HeroVisualComposite

A referência sobrepõe duas fotos (`.hero-special_bg-visual-wrapper`: back + front, front com canal alfa próprio) para um efeito visual notável no hero. Essa **técnica de composição** (wrapper + 2 camadas, escalas, ordem de z-index — ver `documentacao/motion-system.md` e `components.md`) foi reconstruída em `.fr-hero-visual`. As **fotos são do próprio projeto** (`img/hero-back.webp`, `img/hero-front.webp` — Polícia Militar do Ceará / Discipulando a Caserna), fornecidas para esta reconstrução, não baixadas da Korowa. Nenhum pixel da referência entra no repositório.

Hotlink ao domínio da referência proibido no runtime. Evidências e URL ficam só em `auditoria/` (material de auditoria desta referência).