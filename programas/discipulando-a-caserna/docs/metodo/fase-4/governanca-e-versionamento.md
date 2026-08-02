# Governança e versionamento — Design System

- **Versão do DS:** `0.1.0-candidate`
- **Status do pacote:** CANDIDATO
- **Tokens relacionados:** `0.1.0-candidate` / EM REVISÃO (versionamento **independente**)

## Ciclo de vida

```text
PROPOSTO → CANDIDATO → EXPERIMENTAL → PRONTO PARA PROTÓTIPO
  → ESTÁVEL → DEPRECADO → RETIRADO
         ↘ REJEITADO
```

- Nenhum componente novo nasce ESTÁVEL.
- Promoção a ESTÁVEL / DS `1.0.0` exige decisão humana explícita (após uso em
  Fase 5–6 e revisão a11y).

## SemVer do design system

| Tipo  | Quando                                                       |
| ----- | ------------------------------------------------------------ |
| PATCH | Correção compatível de ficha/exemplo/lab                     |
| MINOR | Novo componente, padrão ou variante compatível               |
| MAJOR | Quebra de contrato público (classes, DOM, tokens consumidos) |

Não sincronizar artificialmente com versão dos tokens ou dos protótipos.
Documentar a relação no Manual.

## Registro por peça

Cada ficha mantém: versão de introdução, status, cobertura, limitações,
dependências, evidências, substituto se DEPRECADO.

**Responsável (até designação humana):** mantenedor do repositório / agente sob
revisão humana.

## Depreciação

1. Marcar DEPRECADO na ficha + substituto.
2. Manter no lab com aviso por um ciclo MINOR.
3. RETIRADO remove do índice do Manual; arquivo histórico permanece.

## Figma

Não canônico. Mapeamento futuro: tokens→Variables; variantes→properties;
slots→Auto Layout; estados→variants. Code Connect só se a stack justificar.
