# -*- coding: utf-8 -*-
import re
from collections import Counter

path = r"d:\Faculdade\IA-Builder\Projetos\projetocasernadeadulao\prototipos\storytelling-v1\index.html"
raw = open(path, encoding="utf-8").read()
pat = re.compile(
    r'<section class="([^"]+)" id="([^"]+)"[^>]*data-ato="(\d+)"[^>]*>(.*?)</section>',
    re.S,
)
slides = list(pat.finditer(raw))
print("total", len(slides))
by_ato, by_l, by_bg = Counter(), Counter(), Counter()
for m in slides:
    cls, i, ato, body = m.group(1), m.group(2), m.group(3), m.group(4)
    by_ato[ato] += 1
    by_l[re.search(r"l-L\d", cls).group(0)] += 1
    by_bg[re.search(r"bg-\w+", cls).group(0)] += 1
print("atos", dict(sorted(by_ato.items())))
print("layouts", dict(sorted(by_l.items())))
print("bgs", dict(sorted(by_bg.items())))
print(
    "fecho+nota",
    [m.group(2) for m in slides if "fecho" in m.group(4) and "nota-slide" in m.group(4)],
)
sc = re.search(r"<script>(.*?)</script>", raw, re.S).group(1)
for line in sc.splitlines():
    if any(b in line for b in ("â€", "Ã§", "Ã£", "liÃ", "\uFFFD")):
        print("JS encoding line:", line.strip()[:120])
print("nav escuro companion", bool(re.search(r"nav-l.*escuro|\.escuro .*nav", raw)))
print("dead rule", ".slide.bg-sombra ~ .x{}" in raw)
print("transicao", [m.group(2) for m in slides if "bg-transicao" in m.group(1)])
print(
    "L2 no dupla",
    [
        m.group(2)
        for m in slides
        if "l-L2" in m.group(1) and "dupla" not in m.group(4)
    ],
)
print(
    "L5 no cards/acc",
    [
        m.group(2)
        for m in slides
        if "l-L5" in m.group(1)
        and "cards" not in m.group(4)
        and "acc" not in m.group(4)
    ],
)
print(
    "L6 kinds",
    [
        (
            m.group(2),
            "tab"
            if "tab-" in m.group(4)
            else "matriz"
            if "matriz" in m.group(4)
            else "other",
        )
        for m in slides
        if "l-L6" in m.group(1)
    ],
)
print("identidade", [m.group(2) for m in slides if "identidade" in m.group(4)])
print("fecho", [m.group(2) for m in slides if re.search(r'class="fecho"', m.group(4))])
print("nota", [m.group(2) for m in slides if "nota-slide" in m.group(4)])
print(
    "cards on dark",
    [
        m.group(2)
        for m in slides
        if ("bg-sombra" in m.group(1) or "bg-caserna" in m.group(1))
        and re.search(r'class="card', m.group(4))
    ],
)
print("sem-chrome", [m.group(2) for m in slides if "sem-chrome" in m.group(1)])
print(
    "pastoral",
    [m.group(2) + " | " + m.group(1) for m in slides if "slide-pastoral" in m.group(1)],
)
print("h1", len(re.findall(r"<h1\b", raw)))
print("seta-rolar", [m.group(2) for m in slides if "seta-rolar" in m.group(4)])
print("faixa-caverna", [m.group(2) for m in slides if "faixa-caverna" in m.group(4)])
# Extract short structure for key slides
for sid in ("s05", "s30", "s12", "s27", "s63c", "s31"):
    m = next(x for x in slides if x.group(2) == sid)
    body = m.group(4)
    body = re.sub(r"data:image/[^\"']+", "data:…", body)
    body = re.sub(r"<svg[\s\S]*?</svg>", "<svg…/>", body)
    body = re.sub(r"<img[^>]*>", "<img…/>", body)
    # collapse whitespace
    brief = re.sub(r"\s+", " ", body)[:900]
    print("\n====", sid, m.group(1), "====")
    print(brief)
# Check overlap fecho with padding
print("\n.slide padding bottom vs fecho bottom")
print("fecho absolute bottom 5.2vh; rodape fixed; nota absolute bottom 5.4vh")
# Check if s27 tab on sombra has th color
print("bg-sombra tab-equiv th override?", bool(re.search(r"bg-sombra .tab-equiv th", raw)))
# indice links vs pastoral slides
idx = re.search(r'id="indice"[^>]*>(.*?)</nav>|<div class="indice"[^>]*>(.*?)</div>\s*<button', raw, re.S)
# find indice block
im = re.search(r'class="indice"[^>]*>([\s\S]*?)</div>\s*<button class="retomar"', raw)
if im:
    links = re.findall(r'href="#(s[^"]+)"', im.group(1))
    print("indice links", links)
    ids = [m.group(2) for m in slides]
    print("slides not in indice", [i for i in ids if i not in links and not i.startswith("s63")])
    print("pastoral in indice?", [i for i in ("s63a", "s63b", "s63c") if i in links])
# space key steals from accordion?
print("space always preventDefault on keydown: yes")
# check modulo identidade only s42
print(
    "modulo+identidade",
    [m.group(2) for m in slides if "modulo" in m.group(4) and "identidade" in m.group(4)],
)
# visivel animation on transicao: .quadro > * > *
for sid in ("s05", "s30"):
    m = next(x for x in slides if x.group(2) == sid)
    has_quadro = "quadro" in m.group(4)
    # structure under quadro
    qm = re.search(r'<div class="quadro">(.*)$', m.group(4), re.S)
    if qm:
        kids = re.findall(r'^<(div|p|h2)\b[^>]*class="([^"]*)"', qm.group(1).strip()[:200])
        print(sid, "quadro kids pattern", "has_quadro", has_quadro)
        # direct children class names
        dc = re.findall(r'<div class="quadro">\s*<(\w+)([^>]*)>', m.group(4))
        print(sid, "direct child", dc[:3])
        # zona structure
        z = re.findall(r'class="(zona-[^"]+|texto[^"]*|identidade|tab-[^"]*)"', m.group(4))
        print(sid, "classes", z[:20])
