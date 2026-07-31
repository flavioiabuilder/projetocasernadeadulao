---
name: writing-guidelines
description: Review docs/prose for Writing Guidelines compliance. Use when asked to "review my docs", "check writing style", "audit prose", "review docs voice and tone", or "check this page against the writing handbook".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Writing Guidelines

## Project scope (Discipulando a Caserna)

Use this skill for **UI chrome copy only** (nav labels, skip link, buttons, empty/error states in the interface shell).

Do **not** apply Vercel Writing Guidelines as authority over `conteudo/*.md`, citações literais `>`, voz pastoral/institucional, or Scripture (NAA). Those follow `.cursor/rules/discipulando-caserna.mdc` and the canonical content files. Never invent institutional claims while "clarifying" prose.

---

Review files for compliance with Writing Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/writing-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
