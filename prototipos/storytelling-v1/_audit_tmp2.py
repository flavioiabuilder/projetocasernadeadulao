# -*- coding: utf-8 -*-
import re

path = r"d:\Faculdade\IA-Builder\Projetos\projetocasernadeadulao\prototipos\storytelling-v1\index.html"
raw = open(path, encoding="utf-8").read()

# JS strings
sc = re.search(r"<script>(.*?)</script>", raw, re.S).group(1)
for needle in ("Retomar", "lições", "licoes", "mtcont", "textContent"):
    for line in sc.splitlines():
        if needle in line:
            print(repr(line.strip()[:160]))

# indice
im = re.search(r'id="indice"([\s\S]*?)</div>\s*<button class="retomar"', raw)
if not im:
    im = re.search(r'class="indice"([\s\S]*?)</div>\s*<button', raw)
if im:
    links = re.findall(r'href="#([^"]+)"', im.group(1))
    texts = re.findall(r"<a[^>]*>([\s\S]*?)</a>", im.group(1))
    print("indice count", len(links), links)
    for t in texts:
        t2 = re.sub(r"<[^>]+>", "", t)
        t2 = re.sub(r"\s+", " ", t2).strip()
        print(" -", t2[:80])

# s25 faixa
m = re.search(r'id="s25"[^>]*>(.*?)</section>', raw, re.S)
body = m.group(1)
body = re.sub(r"<svg[\s\S]*?</svg>", "<svg/>", body)
body = re.sub(r"\s+", " ", body)
print("s25:", body[:700])

# s01 has seta?
m = re.search(r'id="s01"[^>]*>(.*?)</section>', raw, re.S)
print("s01 seta", "seta-rolar" in m.group(1))
print("s01 sem-chrome", "sem-chrome" in raw[m.start() - 80 : m.start() + 40])

# Check arm-ic colors on dark topo - stroke hardcoded #8C6A46
print("arm svg stroke hardcoded latao", 'stroke="#8C6A46"' in raw)

# fecho overlap risk: slides with fecho and long content markers
pat = re.compile(
    r'<section class="([^"]+)" id="([^"]+)"[^>]*>(.*?)</section>', re.S
)
for m in pat.finditer(raw):
    if not re.search(r'class="fecho"', m.group(3)):
        continue
    body = m.group(3)
    risk = []
    if "cards" in body:
        risk.append("cards")
    if "dupla" in body:
        risk.append("dupla")
    if len(re.findall(r"<p\b", body)) >= 4:
        risk.append("many-p")
    if risk:
        print("fecho risk", m.group(2), risk)

# Contrast ratios approximate
# rodape.claro on base: #F4F4F1 at 50% on #F4F4F1 = invisible
# nav estrut #4A4A4A @ 34% on sombra #111418
print("---")
# Check if identidade class missing where text suggests brand block on other slides
print("class identidade count in body", len(re.findall(r'class="identidade"', raw)))

# s08 identidade sample
for sid in ("s08", "s10", "s21", "s54", "s57", "s42"):
    m = next(pat.finditer(raw))
# better:
for sid in ("s08", "s10", "s21", "s42", "s51", "s64"):
    m = re.search(rf'id="{sid}"[^>]*>(.*?)</section>', raw, re.S)
    has = 'class="identidade"' in m.group(1)
    print(sid, "has .identidade", has, "layout snippet", re.search(r'class="([^"]+)"', raw[m.start()-120:m.start()+30]))

# Print CSS vs screen: bg-caserna h2 color override to dark - but carta?
# Check prefers-reduced-motion kills transitions on topo chrome too - OK

# Keyboard: ArrowLeft/Right?
print("arrow left/right handled", "ArrowLeft" in sc or "ArrowRight" in sc)
print("Home/End handled", "Home" in sc)

# Hash + retomar both
print("retomar ignores hash if hash present", "location.hash" in sc)

# Matrix default filter module 1 not all
print("filtra(1) default", "filtra(1)" in sc)

# Accordion no aria-expanded
print("aria-expanded on acc", "aria-expanded" in raw)

# Check s69 chrome - not sem-chrome so chrome on final dark slide
print("s69 classes", re.search(r'<section class="([^"]+)" id="s69"', raw).group(1))

# Overlap chrome: slide padding-top barra+4vh; fecho bottom 5.2vh; rodape at bottom with pointer-events none
# On mobile nav at bottom - CONFLICT with fecho and rodape!
print("mobile nav bottom:10px + fecho bottom 5.2vh + rodape = triple stack")
