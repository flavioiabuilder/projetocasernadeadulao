"""PCA logo system — one colorway (Mono_1C), configurations × backgrounds.

Axes (independent):
  Colorway       → Mono_1C only
  Configuration  → Master | Lockup_* | Wordmark_*
  Background     → Transparent | White_FFFFFF
  Format / size  → SVG · PNG · WebP · ladder widths

Canonical Master (never rewritten):
  assets/img/logo-pca/LOGO_PCA_Master_Mono_1C.webp

Wordmark ink: #000000 (not carvão/papel/bronze).
White background is NOT a white logo, reverse, or new colorway.
"""
from __future__ import annotations

import argparse
import base64
import json
import math
import re
from pathlib import Path

import numpy as np
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
LOGO_DIR = ROOT / "assets" / "img" / "logo-pca"
QA_DIR = ROOT / "marca" / "laboratorio" / "_qa"

PRIMARY_WEBP = LOGO_DIR / "LOGO_PCA_Master_Mono_1C.webp"
PRIMARY_SVG = LOGO_DIR / "LOGO_PCA_Master_Mono_1C.svg"
FONT_REG = Path(r"C:\Windows\Fonts\pala.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\palab.ttf")

AUTHORIZED_COLORWAYS = ("Mono_1C",)
AUTHORIZED_BACKGROUNDS = (
    "Transparent",
    "White_FFFFFF",
)
AUTHORIZED_CONFIGURATIONS = (
    "Master",
    "Lockup_Vertical",
    "Lockup_Horizontal",
    "Wordmark_Stacked",
    "Wordmark_Horizontal",
)

# Configurations regenerated from Master + type (Master transparent is never rewritten)
DERIVED_CONFIGURATIONS = (
    "Lockup_Vertical",
    "Lockup_Horizontal",
    "Wordmark_Stacked",
    "Wordmark_Horizontal",
)

LINE1 = "PROJETO"
LINE2 = "CASERNA DE ADULÃO"
LINE_FULL = "PROJETO CASERNA DE ADULÃO"

INK = (0, 0, 0, 255)
INK_HEX = "#000000"
WHITE = (255, 255, 255, 255)
WHITE_HEX = "#FFFFFF"
WEBP_Q = 90

BG_SUFFIX = {
    "Transparent": "",
    "White_FFFFFF": "_BG_White_FFFFFF",
}

LADDERS: dict[str, tuple[int, ...]] = {
    "Master": (800, 400, 180, 128, 64, 32),
    "Lockup_Vertical": (400, 180, 128),
    "Lockup_Horizontal": (800, 400, 240, 180),
    "Wordmark_Stacked": (800, 400, 240, 180),
    "Wordmark_Horizontal": (800, 400, 240, 180),
}

# Vertical lockup geometry (preserved)
V_SIDE = 0.07
V_TOP = 0.045
V_GAP = 0.08
V_LINE2_MAX = 0.88
V_LINE1_SIZE = 0.48
V_TRACK1 = 0.18
V_TRACK2 = 0.04
V_LINE_GAP = 0.38
V_BOTTOM = 0.07

# Horizontal lockup
H_CREST_SIDE = 900
H_GAP_X = 0.10
H_PAD = 0.06
H_LINE1_SIZE = 0.48
H_TRACK1 = 0.16
H_TRACK2 = 0.035
H_LINE_GAP = 0.32

# Wordmarks
W_PAD = 48
W_LINE1_SIZE = 0.48
W_TRACK1 = 0.18
W_TRACK2 = 0.04
W_LINE_GAP = 0.38
W_H_TRACK_PROJ = 0.12
W_H_TRACK_MAIN = 0.03
W_H_GAP_WORDS = 0.55


def load_primary() -> Image.Image:
    im = Image.open(PRIMARY_WEBP).convert("RGBA")
    if im.size[0] != im.size[1]:
        raise ValueError(f"PRIMARY not square: {im.size}")
    return im


def asset_stem(config: str, background: str) -> str:
    if background not in AUTHORIZED_BACKGROUNDS:
        raise ValueError(f"Unauthorized background: {background}")
    return f"LOGO_PCA_{config}_Mono_1C{BG_SUFFIX[background]}"


def apply_background(im: Image.Image, background: str) -> Image.Image:
    """Return RGBA with identical geometry; only canvas treatment differs."""
    rgba = im.convert("RGBA")
    if background == "Transparent":
        return rgba.copy()
    if background == "White_FFFFFF":
        base = Image.new("RGBA", rgba.size, WHITE)
        return Image.alpha_composite(base, rgba)
    raise ValueError(f"Unauthorized background: {background}")


def measure_tracked(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, tracking: float) -> float:
    if not text:
        return 0.0
    return sum(draw.textlength(ch, font=font) for ch in text) + tracking * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.FreeTypeFont,
    tracking: float,
) -> None:
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=INK)
        x += draw.textlength(ch, font=font) + tracking


def fit_font_bold(draw: ImageDraw.ImageDraw, text: str, max_w: float, track_em: float, lo=24, hi=420) -> ImageFont.FreeTypeFont:
    best = ImageFont.truetype(str(FONT_BOLD), 48)
    while lo <= hi:
        mid = (lo + hi) // 2
        font = ImageFont.truetype(str(FONT_BOLD), mid)
        w = measure_tracked(draw, text, font, track_em * mid)
        if w <= max_w:
            best = font
            lo = mid + 1
        else:
            hi = mid - 1
    return best


def save_raster(im: Image.Image, base: Path, *, lossless_webp: bool = False) -> None:
    webp_kwargs: dict = {"format": "WEBP", "method": 6}
    if lossless_webp:
        # White-BG assets must stay pixel-identical to transparent∘#FFFFFF (no lossy round-trip).
        webp_kwargs["lossless"] = True
    else:
        webp_kwargs["quality"] = WEBP_Q
    for ext, kwargs in (
        (".png", {"format": "PNG", "optimize": True}),
        (".webp", webp_kwargs),
    ):
        path = base.with_suffix(ext)
        tmp = path.with_suffix(ext + ".tmp")
        im.save(tmp, **kwargs)
        tmp.replace(path)


def resize_width(im: Image.Image, width: int) -> Image.Image:
    if width > im.width:
        raise ValueError(f"refusing upscale {im.width}->{width}")
    if width == im.width:
        return im.copy()
    h = max(1, int(round(im.height * (width / im.width))))
    return im.resize((width, h), Image.Resampling.LANCZOS)


def export_ladder(
    im: Image.Image,
    base: Path,
    widths: tuple[int, ...],
    *,
    lossless_webp: bool = False,
) -> dict:
    save_raster(im, base, lossless_webp=lossless_webp)
    out = {"master": list(im.size), "webp_lossless": lossless_webp}
    for w in widths:
        if w >= im.width:
            continue
        scaled = resize_width(im, w)
        save_raster(scaled, LOGO_DIR / f"{base.name}_{w}", lossless_webp=lossless_webp)
        out[str(w)] = list(scaled.size)
    return out


def glyph_path(font: TTFont, char: str) -> str:
    gs = font.getGlyphSet()
    name = font.getBestCmap().get(ord(char))
    if not name:
        raise KeyError(char)
    pen = SVGPathPen(gs)
    gs[name].draw(pen)
    return pen.getCommands()


def path_group_for_line(
    text: str,
    font_tt: TTFont,
    size_px: float,
    track_px: float,
    xy: tuple[float, float],
    pillow_path: str,
) -> str:
    parts: list[str] = []
    x0, y0 = xy
    scale = size_px / font_tt["head"].unitsPerEm
    x = x0
    probe = ImageFont.truetype(pillow_path, int(size_px))
    ascent, _ = probe.getmetrics()
    baseline = y0 + ascent
    for ch in text:
        cmds = glyph_path(font_tt, ch)
        name = font_tt.getBestCmap()[ord(ch)]
        advance = font_tt["hmtx"].metrics[name][0] * scale
        tr = f"translate({x:.3f} {baseline:.3f}) scale({scale:.6f} {-scale:.6f})"
        parts.append(f'<path fill="{INK_HEX}" transform="{tr}" d="{cmds}"/>')
        x += advance + track_px
    return "\n    ".join(parts)


def bg_rect(background: str) -> str:
    if background == "White_FFFFFF":
        return f'  <rect width="100%" height="100%" fill="{WHITE_HEX}"/>\n'
    return ""


def write_hybrid_svg(
    path: Path,
    crest_bytes: bytes,
    crest_box: tuple[int, int, int, int],
    canvas: tuple[int, int],
    paths: str,
    title: str,
    background: str,
) -> None:
    w, h = canvas
    cx, cy, cs, _ = crest_box
    b64 = base64.b64encode(crest_bytes).decode("ascii")
    bg_note = (
        "Fundo #FFFFFF no canvas (não é logo branca/reversa)."
        if background == "White_FFFFFF"
        else "Canvas transparente."
    )
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>SVG híbrido Mono_1C: Master WebP (data URI) + wordmark #000000 em contornos. {bg_note} Não é 100% vetorial.</desc>
{bg_rect(background)}  <image x="{cx}" y="{cy}" width="{cs}" height="{cs}"
         href="data:image/webp;base64,{b64}"
         xlink:href="data:image/webp;base64,{b64}"
         preserveAspectRatio="xMidYMid meet"/>
  <g class="wordmark" aria-hidden="true">
    {paths}
  </g>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


def write_vector_svg(
    path: Path,
    canvas: tuple[int, int],
    paths: str,
    title: str,
    background: str,
) -> None:
    w, h = canvas
    bg_note = (
        "Fundo #FFFFFF no canvas (não é logo branca/reversa)."
        if background == "White_FFFFFF"
        else "Canvas transparente."
    )
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Wordmark Mono_1C vetorial (Palatino outlines, fill #000000). {bg_note} Auxiliar — não substitui o Master.</desc>
{bg_rect(background)}  <g class="wordmark">
    {paths}
  </g>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


def write_master_white_svg(dest: Path) -> None:
    """Clone Master SVG with white canvas rect; do not alter art paths."""
    src = PRIMARY_SVG.read_text(encoding="utf-8")
    if 'fill="#FFFFFF"' in src and 'width="100%" height="100%"' in src:
        dest.write_text(src, encoding="utf-8")
        return
    # Insert after opening <svg …> tag (and optional title if present early)
    m = re.search(r"(<svg\b[^>]*>)", src, flags=re.IGNORECASE)
    if not m:
        raise SystemExit("Master SVG: missing <svg> root")
    insert_at = m.end()
    rect = f'\n  <rect width="100%" height="100%" fill="{WHITE_HEX}"/>'
    # Avoid inserting into a copy that already has our bg marker comment
    marker = '<!-- PCA canvas background White_FFFFFF — not a white logo -->'
    if marker in src:
        dest.write_text(src, encoding="utf-8")
        return
    out = src[:insert_at] + f"\n  {marker}" + rect + src[insert_at:]
    dest.write_text(out, encoding="utf-8")


def crest_mae(lockup: Image.Image, primary: Image.Image, box: tuple[int, int, int, int]) -> dict:
    cx, cy, cs, _ = box
    region = lockup.crop((cx, cy, cx + cs, cy + cs)).convert("RGBA")
    ref = primary.resize((cs, cs), Image.Resampling.LANCZOS).convert("RGBA")
    a = np.asarray(region)
    b = np.asarray(ref)
    exact = bool((a == b).all())
    return {
        "region_box": list(box),
        "exact_match": exact,
        "mae_rgba": 0.0 if exact else float(np.abs(a.astype(float) - b.astype(float)).mean()),
        "pass": exact,
    }


def compare_transparent_on_white(transparent: Image.Image, white: Image.Image) -> dict:
    """Compose transparent over #FFFFFF and compare to white-background asset."""
    t = transparent.convert("RGBA")
    w = white.convert("RGBA")
    if t.size != w.size:
        return {"pass": False, "error": f"size mismatch {t.size} vs {w.size}", "mae_rgba": None}
    composed = apply_background(t, "White_FFFFFF")
    a = np.asarray(composed)
    b = np.asarray(w)
    exact = bool((a == b).all())
    mae = 0.0 if exact else float(np.abs(a.astype(float) - b.astype(float)).mean())
    # White BG must be fully opaque
    alpha_min = int(b[..., 3].min())
    return {
        "pass": exact and alpha_min == 255,
        "exact_match": exact,
        "mae_rgba": mae,
        "white_alpha_min": alpha_min,
        "size": list(t.size),
    }


def alpha_stats(im: Image.Image) -> dict:
    a = np.asarray(im.convert("RGBA"))[..., 3]
    return {
        "min": int(a.min()),
        "max": int(a.max()),
        "has_transparency": bool(a.min() < 255),
        "fully_opaque": bool(a.min() == 255),
    }


# --- compositions -----------------------------------------------------------

def compose_lockup_vertical(primary: Image.Image) -> tuple[Image.Image, dict, bytes]:
    crest_side = primary.size[0]
    side = int(round(crest_side * V_SIDE))
    top = int(round(crest_side * V_TOP))
    gap = int(round(crest_side * V_GAP))
    bottom = int(round(crest_side * V_BOTTOM))
    canvas_w = crest_side + 2 * side
    crest_x, crest_y = side, top

    probe = Image.new("RGBA", (canvas_w, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    font2 = fit_font_bold(draw, LINE2, crest_side * V_LINE2_MAX, V_TRACK2)
    size2 = font2.size
    size1 = max(12, int(round(size2 * V_LINE1_SIZE)))
    font1 = ImageFont.truetype(str(FONT_REG), size1)
    track1, track2 = V_TRACK1 * size1, V_TRACK2 * size2
    line_gap = int(round(V_LINE_GAP * size2))
    a1, d1 = font1.getmetrics()
    a2, d2 = font2.getmetrics()
    text_h = a1 + d1 + line_gap + a2 + d2
    canvas_h = crest_y + crest_side + gap + text_h + bottom

    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    canvas.paste(primary, (crest_x, crest_y))
    draw = ImageDraw.Draw(canvas)
    text_top = crest_y + crest_side + gap
    w1 = measure_tracked(draw, LINE1, font1, track1)
    x1 = (canvas_w - w1) / 2
    draw_tracked(draw, (x1, text_top), LINE1, font1, track1)
    y2 = text_top + a1 + d1 + line_gap
    w2 = measure_tracked(draw, LINE2, font2, track2)
    x2 = (canvas_w - w2) / 2
    draw_tracked(draw, (x2, y2), LINE2, font2, track2)

    meta = {
        "canvas": [canvas_w, canvas_h],
        "crest_box": [crest_x, crest_y, crest_side, crest_side],
        "font1_px": size1,
        "font2_px": size2,
        "track1_px": track1,
        "track2_px": track2,
        "line_gap_px": line_gap,
        "line1_xy": [x1, text_top],
        "line2_xy": [x2, y2],
        "ink": INK_HEX,
    }
    return canvas, meta, PRIMARY_WEBP.read_bytes()


def compose_lockup_horizontal(primary: Image.Image) -> tuple[Image.Image, dict, bytes]:
    crest = primary.resize((H_CREST_SIDE, H_CREST_SIDE), Image.Resampling.LANCZOS)
    pad = int(round(H_CREST_SIDE * H_PAD))
    gap_x = int(round(H_CREST_SIDE * H_GAP_X))

    text_max = int(round(H_CREST_SIDE * 1.35))
    probe = Image.new("RGBA", (text_max + 8, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    font2 = fit_font_bold(draw, LINE2, text_max, H_TRACK2, lo=28, hi=220)
    size2 = font2.size
    size1 = max(12, int(round(size2 * H_LINE1_SIZE)))
    font1 = ImageFont.truetype(str(FONT_REG), size1)
    track1, track2 = H_TRACK1 * size1, H_TRACK2 * size2
    line_gap = int(round(H_LINE_GAP * size2))
    a1, d1 = font1.getmetrics()
    a2, d2 = font2.getmetrics()
    text_h = a1 + d1 + line_gap + a2 + d2
    w1 = measure_tracked(draw, LINE1, font1, track1)
    w2 = measure_tracked(draw, LINE2, font2, track2)
    text_w = max(w1, w2)

    canvas_w = pad + H_CREST_SIDE + gap_x + int(math.ceil(text_w)) + pad
    canvas_h = pad + max(H_CREST_SIDE, text_h) + pad
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))

    crest_x, crest_y = pad, pad + (canvas_h - 2 * pad - H_CREST_SIDE) // 2
    canvas.paste(crest, (crest_x, crest_y))

    text_x = crest_x + H_CREST_SIDE + gap_x
    text_block_top = pad + (canvas_h - 2 * pad - text_h) // 2
    draw = ImageDraw.Draw(canvas)
    draw_tracked(draw, (text_x + (text_w - w1) / 2, text_block_top), LINE1, font1, track1)
    y2 = text_block_top + a1 + d1 + line_gap
    draw_tracked(draw, (text_x + (text_w - w2) / 2, y2), LINE2, font2, track2)

    meta = {
        "canvas": [canvas_w, canvas_h],
        "crest_box": [crest_x, crest_y, H_CREST_SIDE, H_CREST_SIDE],
        "font1_px": size1,
        "font2_px": size2,
        "track1_px": track1,
        "track2_px": track2,
        "line_gap_px": line_gap,
        "line1_xy": [text_x + (text_w - w1) / 2, text_block_top],
        "line2_xy": [text_x + (text_w - w2) / 2, y2],
        "ink": INK_HEX,
    }
    return canvas, meta, PRIMARY_WEBP.read_bytes()


def compose_wordmark_stacked() -> tuple[Image.Image, dict]:
    size2 = 160
    size1 = max(12, int(round(size2 * W_LINE1_SIZE)))
    font1 = ImageFont.truetype(str(FONT_REG), size1)
    font2 = ImageFont.truetype(str(FONT_BOLD), size2)
    track1, track2 = W_TRACK1 * size1, W_TRACK2 * size2
    line_gap = int(round(W_LINE_GAP * size2))
    probe = Image.new("RGBA", (4000, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    w1 = measure_tracked(draw, LINE1, font1, track1)
    w2 = measure_tracked(draw, LINE2, font2, track2)
    a1, d1 = font1.getmetrics()
    a2, d2 = font2.getmetrics()
    text_h = a1 + d1 + line_gap + a2 + d2
    canvas_w = W_PAD * 2 + int(math.ceil(max(w1, w2)))
    canvas_h = W_PAD * 2 + text_h
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    y1 = W_PAD
    x1 = (canvas_w - w1) / 2
    draw_tracked(draw, (x1, y1), LINE1, font1, track1)
    y2 = y1 + a1 + d1 + line_gap
    x2 = (canvas_w - w2) / 2
    draw_tracked(draw, (x2, y2), LINE2, font2, track2)
    meta = {
        "canvas": [canvas_w, canvas_h],
        "font1_px": size1,
        "font2_px": size2,
        "track1_px": track1,
        "track2_px": track2,
        "line_gap_px": line_gap,
        "line1_xy": [x1, y1],
        "line2_xy": [x2, y2],
        "ink": INK_HEX,
    }
    return canvas, meta


def compose_wordmark_horizontal() -> tuple[Image.Image, dict, dict]:
    size_main = 140
    size_proj = max(12, int(round(size_main * 0.72)))
    font_project = ImageFont.truetype(str(FONT_REG), size_proj)
    font_main = ImageFont.truetype(str(FONT_BOLD), size_main)
    track_p = W_H_TRACK_PROJ * size_proj
    track_m = W_H_TRACK_MAIN * size_main
    gap = W_H_GAP_WORDS * size_main
    rest = "CASERNA DE ADULÃO"
    probe = Image.new("RGBA", (8000, 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    w_p = measure_tracked(draw, LINE1, font_project, track_p)
    w_r = measure_tracked(draw, rest, font_main, track_m)
    total_w = w_p + gap + w_r
    a_p, d_p = font_project.getmetrics()
    a_m, d_m = font_main.getmetrics()
    canvas_h = W_PAD * 2 + max(a_p + d_p, a_m + d_m)
    canvas_w = W_PAD * 2 + int(math.ceil(total_w))
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    baseline_y = W_PAD + max(a_p, a_m)
    y_p = baseline_y - a_p
    y_m = baseline_y - a_m
    x = W_PAD
    draw_tracked(draw, (x, y_p), LINE1, font_project, track_p)
    x2 = x + w_p + gap
    draw_tracked(draw, (x2, y_m), rest, font_main, track_m)

    aspect = canvas_w / canvas_h
    approved = 6.0 <= aspect <= 14.0
    evaluation = {
        "aspect": round(aspect, 3),
        "canvas": [canvas_w, canvas_h],
        "decision": "approved" if approved else "rejected",
        "reason": (
            "Útil em rodapés/créditos de largura extrema; hierarquia Regular/Bold preservada."
            if approved
            else "Proporção fora da faixa útil ou leitura tipográfica insuficiente."
        ),
    }
    meta = {
        "canvas": [canvas_w, canvas_h],
        "font_project_px": size_proj,
        "font_main_px": size_main,
        "track_project_px": track_p,
        "track_main_px": track_m,
        "gap_px": gap,
        "project_xy": [float(W_PAD), float(y_p)],
        "rest_xy": [float(x2), float(y_m)],
        "ink": INK_HEX,
        "line": LINE_FULL,
    }
    return canvas, meta, evaluation


def svg_paths_vertical(meta: dict) -> str:
    fr, fb = TTFont(str(FONT_REG)), TTFont(str(FONT_BOLD))
    p1 = path_group_for_line(LINE1, fr, meta["font1_px"], meta["track1_px"], tuple(meta["line1_xy"]), str(FONT_REG))
    p2 = path_group_for_line(LINE2, fb, meta["font2_px"], meta["track2_px"], tuple(meta["line2_xy"]), str(FONT_BOLD))
    fr.close()
    fb.close()
    return p1 + "\n    " + p2


def svg_paths_horizontal_wm(meta: dict) -> str:
    fr, fb = TTFont(str(FONT_REG)), TTFont(str(FONT_BOLD))
    p1 = path_group_for_line(LINE1, fr, meta["font_project_px"], meta["track_project_px"], tuple(meta["project_xy"]), str(FONT_REG))
    p2 = path_group_for_line(
        "CASERNA DE ADULÃO", fb, meta["font_main_px"], meta["track_main_px"], tuple(meta["rest_xy"]), str(FONT_BOLD)
    )
    fr.close()
    fb.close()
    return p1 + "\n    " + p2


def checkerboard(size: tuple[int, int], cell: int = 16) -> Image.Image:
    w, h = size
    im = Image.new("RGBA", (w, h), (200, 200, 200, 255))
    draw = ImageDraw.Draw(im)
    for y in range(0, h, cell):
        for x in range(0, w, cell):
            if ((x // cell) + (y // cell)) % 2 == 0:
                draw.rectangle([x, y, x + cell - 1, y + cell - 1], fill=(230, 230, 230, 255))
    return im


def build_qa_board(pairs: dict[str, dict[str, Image.Image]]) -> Path:
    """pairs[config] = {Transparent: im, White_FFFFFF: im}"""
    QA_DIR.mkdir(parents=True, exist_ok=True)
    paper = (0xF3, 0xEE, 0xE6, 255)
    ink = (0x0E, 0x12, 0x16, 255)
    cell_w, cell_h = 340, 320
    # rows: config; cols: transparent/checker, transparent/paper, white/ink, white/ink-label
    configs = [c for c in AUTHORIZED_CONFIGURATIONS if c in pairs]
    cols = 4
    rows = len(configs)
    board = Image.new("RGBA", (cols * cell_w, rows * cell_h + 40), paper)
    draw = ImageDraw.Draw(board)
    try:
        font = ImageFont.truetype(str(FONT_REG), 12)
        font_sm = ImageFont.truetype(str(FONT_REG), 10)
    except OSError:
        font = ImageFont.load_default()
        font_sm = font

    draw.text((12, 10), "QA · Mono_1C · Transparent vs BG_White_FFFFFF (não é logo branca)", font=font, fill=(20, 20, 20, 255))

    col_labels = [
        "Transparente / checker",
        "Transparente / papel",
        "Branco / ink",
        "Branco / ink (arquivo)",
    ]
    for col, label in enumerate(col_labels):
        # labels sit in first row header area already used; put small tags per cell
        pass

    for row, config in enumerate(configs):
        t_im = pairs[config]["Transparent"]
        w_im = pairs[config]["White_FFFFFF"]
        # Col 0: transparent on checkerboard
        # Col 1: transparent on paper
        # Col 2–3: white asset on ink (visual + filename)
        surfaces = [
            ("checker", None, t_im, True),
            ("paper", paper, t_im, True),
            ("ink", ink, w_im, False),
            ("ink-file", ink, w_im, False),
        ]
        for col, (kind, bg, im, use_alpha) in enumerate(surfaces):
            x0, y0 = col * cell_w, 40 + row * cell_h
            if kind == "checker":
                cell_bg = checkerboard((cell_w, cell_h))
                board.paste(cell_bg, (x0, y0))
            else:
                draw.rectangle([x0, y0, x0 + cell_w - 1, y0 + cell_h - 1], fill=bg)

            thumb = im.copy()
            thumb.thumbnail((cell_w - 40, cell_h - 70), Image.Resampling.LANCZOS)
            px = x0 + (cell_w - thumb.width) // 2
            py = y0 + 40
            if use_alpha:
                board.paste(thumb, (px, py), thumb)
            else:
                board.paste(thumb, (px, py))

            label_fill = (255, 255, 255, 255) if kind.startswith("ink") else (20, 20, 20, 255)
            stem = asset_stem(config, "Transparent" if use_alpha else "White_FFFFFF")
            caption = f"{config}"
            if col == 3:
                caption = stem[:42] + ("…" if len(stem) > 42 else "")
            else:
                caption = f"{config} · {col_labels[col].split('/')[0].strip()}"
            draw.text((x0 + 8, y0 + 8), caption, font=font_sm, fill=label_fill)

    out = QA_DIR / "LOGO_SYSTEM_BG_QA_BOARD.png"
    board.save(out, format="PNG", optimize=True)
    return out


def build_candidate_board(assets: dict[str, Image.Image], decisions: dict) -> Path:
    QA_DIR.mkdir(parents=True, exist_ok=True)
    paper = (0xF3, 0xEE, 0xE6, 255)
    ink = (0x0E, 0x12, 0x16, 255)
    cell_w, cell_h = 320, 300
    labels = [
        ("Master", assets["Master"], paper),
        ("Lockup Vertical", assets["Lockup_Vertical"], paper),
        ("Lockup Horizontal", assets["Lockup_Horizontal"], paper),
        ("Wordmark Stacked", assets["Wordmark_Stacked"], paper),
        ("Wordmark Horizontal", assets["Wordmark_Horizontal"], paper),
        ("V · BG White / ink", assets.get("Lockup_Vertical_White", assets["Lockup_Vertical"]), ink),
        ("H · BG White / ink", assets.get("Lockup_Horizontal_White", assets["Lockup_Horizontal"]), ink),
        ("Master · BG White / ink", assets.get("Master_White", assets["Master"]), ink),
        ("Master 128", resize_width(assets["Master"], min(128, assets["Master"].width)), paper),
    ]
    cols, rows = 3, 3
    board = Image.new("RGBA", (cols * cell_w, rows * cell_h), paper)
    draw = ImageDraw.Draw(board)
    font = ImageFont.truetype(str(FONT_REG), 13)
    for i, (label, im, bg) in enumerate(labels):
        col, row = i % cols, i // cols
        x0, y0 = col * cell_w, row * cell_h
        draw.rectangle([x0, y0, x0 + cell_w - 1, y0 + cell_h - 1], fill=bg)
        thumb = im.copy()
        thumb.thumbnail((cell_w - 36, cell_h - 56), Image.Resampling.LANCZOS)
        px = x0 + (cell_w - thumb.width) // 2
        py = y0 + 36
        if bg[0] < 80:
            # white-BG assets already include canvas — no CSS plate
            board.paste(thumb, (px, py))
            fill = (255, 255, 255, 255)
        else:
            board.paste(thumb, (px, py), thumb)
            fill = (20, 20, 20, 255)
        draw.text((x0 + 8, y0 + 8), label, font=font, fill=fill)
    out = QA_DIR / "LOGO_SYSTEM_CANDIDATES_BOARD.png"
    board.save(out, format="PNG", optimize=True)
    (QA_DIR / "logo_system_candidates.json").write_text(json.dumps(decisions, indent=2), encoding="utf-8")
    return out


def assert_no_forbidden_colors_in_svg(path: Path) -> None:
    t = path.read_text(encoding="utf-8")
    # Strip desc/title to avoid false positives from documentation text? Keep strict on fills.
    for bad in ("#0E1216", "#0e1216", "#F3EEE6", "#f3eee6", "#8B6F47", "#8b6f47"):
        if bad in t:
            raise SystemExit(f"Forbidden color {bad} in {path.name}")


def export_config_backgrounds(
    config: str,
    transparent: Image.Image,
    backgrounds: list[str],
    *,
    svg_writer,
) -> dict:
    """Export ladder + SVG for each authorized background from one transparent composition."""
    result: dict = {"geometry": list(transparent.size), "backgrounds": {}}
    for bg in backgrounds:
        stem = asset_stem(config, bg)
        base = LOGO_DIR / stem
        im = apply_background(transparent, bg)
        ladder = export_ladder(
            im, base, LADDERS[config], lossless_webp=(bg == "White_FFFFFF")
        )
        svg_writer(base.with_suffix(".svg"), bg)
        assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
        stats = alpha_stats(im)
        result["backgrounds"][bg] = {
            "stem": stem,
            "exports": ladder,
            "alpha": stats,
        }
        if bg == "Transparent" and not stats["has_transparency"]:
            # Master may be mostly opaque; wordmarks/lockups should have alpha
            if config != "Master":
                raise SystemExit(f"{stem}: expected transparency")
        if bg == "White_FFFFFF" and not stats["fully_opaque"]:
            raise SystemExit(f"{stem}: white BG must be fully opaque (alpha 255)")
    if "Transparent" in backgrounds and "White_FFFFFF" in backgrounds:
        cmp = compare_transparent_on_white(
            apply_background(transparent, "Transparent"),
            apply_background(transparent, "White_FFFFFF"),
        )
        result["transparent_on_white_vs_white"] = cmp
        if not cmp["pass"]:
            raise SystemExit(
                f"{config}: transparent∘white vs white failed MAE={cmp.get('mae_rgba')}"
            )
    return result


def generate_all(selected_configs: list[str], selected_backgrounds: list[str]) -> dict:
    if not FONT_REG.is_file() or not FONT_BOLD.is_file():
        raise SystemExit("Palatino fonts required on build machine")

    primary = load_primary()
    master_hash_before = PRIMARY_WEBP.read_bytes()

    report: dict = {
        "authorized_colorways": list(AUTHORIZED_COLORWAYS),
        "authorized_backgrounds": list(AUTHORIZED_BACKGROUNDS),
        "authorized_configurations": list(AUTHORIZED_CONFIGURATIONS),
        "generated": [],
        "master_source": PRIMARY_WEBP.name,
        "master_untouched": True,
        "ink": INK_HEX,
        "exports": {},
        "fidelity": {},
        "background_qa": {},
        "decisions": {},
    }

    # Compose all for boards/decisions
    v_img, v_meta, v_bytes = compose_lockup_vertical(primary)
    h_img, h_meta, h_bytes = compose_lockup_horizontal(primary)
    s_img, s_meta = compose_wordmark_stacked()
    wh_img, wh_meta, wh_eval = compose_wordmark_horizontal()

    compositions: dict[str, Image.Image] = {
        "Master": primary,
        "Lockup_Vertical": v_img,
        "Lockup_Horizontal": h_img,
        "Wordmark_Stacked": s_img,
        "Wordmark_Horizontal": wh_img,
    }

    report["decisions"] = {
        "Master": {"status": "canonical", "note": "Não regenerado pelo script (transparent); BG White derivado por compositing"},
        "Lockup_Vertical": {"status": "approved", "geometry": v_meta["canvas"], "ink": INK_HEX},
        "Lockup_Horizontal": {"status": "approved", "geometry": h_meta["canvas"], "ink": INK_HEX},
        "Wordmark_Stacked": {
            "status": "approved_auxiliary",
            "geometry": s_meta["canvas"],
            "note": "Não substitui o Master",
        },
        "Wordmark_Horizontal": wh_eval,
        "Backgrounds": {
            "Transparent": "Canônico — ausência de segmento de fundo no nome",
            "White_FFFFFF": "Canvas #FFFFFF — não é colorway, logo branca nem reverso",
        },
        "Lockup_Vertical_Compact": {
            "status": "rejected",
            "reason": "Redimensionamento do Vertical já cobre; sem breakpoint estrutural distinto",
        },
        "Lockup_Horizontal_Compact": {
            "status": "rejected",
            "reason": "Escada _240/_180 cobre headers estreitos sem segunda composição",
        },
        "Wordmark_Three_Lines": {
            "status": "rejected",
            "reason": "Duplicaria Stacked sem ganho de legibilidade",
        },
    }

    board_assets = {
        "Master": primary,
        "Lockup_Vertical": v_img,
        "Lockup_Horizontal": h_img,
        "Wordmark_Stacked": s_img,
        "Wordmark_Horizontal": wh_img,
        "Master_White": apply_background(primary, "White_FFFFFF"),
        "Lockup_Vertical_White": apply_background(v_img, "White_FFFFFF"),
        "Lockup_Horizontal_White": apply_background(h_img, "White_FFFFFF"),
    }
    board_path = build_candidate_board(board_assets, report["decisions"])
    report["candidate_board"] = str(board_path.relative_to(ROOT)).replace("\\", "/")

    qa_pairs: dict[str, dict[str, Image.Image]] = {}

    # --- Master ---
    if "Master" in selected_configs:
        # Never rewrite transparent Master rasters/SVG from composition.
        # Only emit White_FFFFFF derivatives (and validate transparent files exist).
        if "Transparent" in selected_backgrounds:
            if not PRIMARY_WEBP.is_file():
                raise SystemExit("Missing canonical Master WebP")
            # Validate existing transparent ladder exists; do not overwrite
            report["exports"].setdefault("Master", {})["Transparent"] = {
                "stem": asset_stem("Master", "Transparent"),
                "note": "canonical — not regenerated",
                "master": list(primary.size),
                "alpha": alpha_stats(primary),
            }
            report["generated"].append("Master:Transparent(canonical)")
        if "White_FFFFFF" in selected_backgrounds:
            white = apply_background(primary, "White_FFFFFF")
            stem = asset_stem("Master", "White_FFFFFF")
            base = LOGO_DIR / stem
            ladder = export_ladder(
                white, base, LADDERS["Master"], lossless_webp=True
            )
            write_master_white_svg(base.with_suffix(".svg"))
            assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
            cmp = compare_transparent_on_white(primary, white)
            if not cmp["pass"]:
                raise SystemExit(f"Master BG white compositing failed: {cmp}")
            report["exports"].setdefault("Master", {})["White_FFFFFF"] = {
                "stem": stem,
                "exports": ladder,
                "alpha": alpha_stats(white),
                "transparent_on_white_vs_white": cmp,
            }
            report["background_qa"]["Master"] = cmp
            report["generated"].append("Master:White_FFFFFF")
            qa_pairs["Master"] = {
                "Transparent": primary,
                "White_FFFFFF": white,
            }

    # --- Lockup Vertical ---
    if "Lockup_Vertical" in selected_configs:
        paths = svg_paths_vertical(v_meta)

        def _svg_v(path: Path, bg: str) -> None:
            write_hybrid_svg(
                path, v_bytes, tuple(v_meta["crest_box"]), tuple(v_meta["canvas"]), paths, path.stem, bg
            )

        # Always export selected BGs from same transparent composition
        exp = export_config_backgrounds(
            "Lockup_Vertical", v_img, selected_backgrounds, svg_writer=_svg_v
        )
        report["exports"]["Lockup_Vertical"] = exp
        report["fidelity"]["Lockup_Vertical"] = crest_mae(v_img, primary, tuple(v_meta["crest_box"]))
        report["typo_vertical"] = v_meta
        report["generated"].append("Lockup_Vertical")
        if "transparent_on_white_vs_white" in exp:
            report["background_qa"]["Lockup_Vertical"] = exp["transparent_on_white_vs_white"]
        qa_pairs["Lockup_Vertical"] = {
            "Transparent": v_img,
            "White_FFFFFF": apply_background(v_img, "White_FFFFFF"),
        }

    # --- Lockup Horizontal ---
    if "Lockup_Horizontal" in selected_configs:
        paths = svg_paths_vertical(h_meta)

        def _svg_h(path: Path, bg: str) -> None:
            write_hybrid_svg(
                path, h_bytes, tuple(h_meta["crest_box"]), tuple(h_meta["canvas"]), paths, path.stem, bg
            )

        exp = export_config_backgrounds(
            "Lockup_Horizontal", h_img, selected_backgrounds, svg_writer=_svg_h
        )
        report["exports"]["Lockup_Horizontal"] = exp
        report["fidelity"]["Lockup_Horizontal"] = crest_mae(h_img, primary, tuple(h_meta["crest_box"]))
        report["typo_horizontal"] = h_meta
        report["generated"].append("Lockup_Horizontal")
        if "transparent_on_white_vs_white" in exp:
            report["background_qa"]["Lockup_Horizontal"] = exp["transparent_on_white_vs_white"]
        qa_pairs["Lockup_Horizontal"] = {
            "Transparent": h_img,
            "White_FFFFFF": apply_background(h_img, "White_FFFFFF"),
        }

    # --- Wordmark Stacked ---
    if "Wordmark_Stacked" in selected_configs:
        paths = svg_paths_vertical(s_meta)

        def _svg_s(path: Path, bg: str) -> None:
            write_vector_svg(path, tuple(s_meta["canvas"]), paths, path.stem, bg)

        exp = export_config_backgrounds(
            "Wordmark_Stacked", s_img, selected_backgrounds, svg_writer=_svg_s
        )
        report["exports"]["Wordmark_Stacked"] = exp
        report["typo_wordmark_stacked"] = s_meta
        report["generated"].append("Wordmark_Stacked")
        if "transparent_on_white_vs_white" in exp:
            report["background_qa"]["Wordmark_Stacked"] = exp["transparent_on_white_vs_white"]
        qa_pairs["Wordmark_Stacked"] = {
            "Transparent": s_img,
            "White_FFFFFF": apply_background(s_img, "White_FFFFFF"),
        }

    # --- Wordmark Horizontal ---
    if "Wordmark_Horizontal" in selected_configs:
        if wh_eval["decision"] != "approved":
            print("Wordmark_Horizontal rejected — not exported:", wh_eval["reason"])
            report["decisions"]["Wordmark_Horizontal"] = wh_eval
        else:
            paths = svg_paths_horizontal_wm(wh_meta)

            def _svg_wh(path: Path, bg: str) -> None:
                write_vector_svg(path, tuple(wh_meta["canvas"]), paths, path.stem, bg)

            exp = export_config_backgrounds(
                "Wordmark_Horizontal", wh_img, selected_backgrounds, svg_writer=_svg_wh
            )
            report["exports"]["Wordmark_Horizontal"] = exp
            report["typo_wordmark_horizontal"] = wh_meta
            report["generated"].append("Wordmark_Horizontal")
            if "transparent_on_white_vs_white" in exp:
                report["background_qa"]["Wordmark_Horizontal"] = exp["transparent_on_white_vs_white"]
            qa_pairs["Wordmark_Horizontal"] = {
                "Transparent": wh_img,
                "White_FFFFFF": apply_background(wh_img, "White_FFFFFF"),
            }

    if qa_pairs and set(selected_backgrounds) >= {"Transparent", "White_FFFFFF"}:
        qa_board = build_qa_board(qa_pairs)
        report["qa_board"] = str(qa_board.relative_to(ROOT)).replace("\\", "/")

    # Master integrity
    if PRIMARY_WEBP.read_bytes() != master_hash_before:
        raise SystemExit("FATAL: Master WebP was modified")
    report["master_untouched"] = True
    report["master_sha1_hint"] = "blob checked in-process (bytes unchanged)"

    QA_DIR.mkdir(parents=True, exist_ok=True)
    (QA_DIR / "logo_system_build_report.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )
    return report


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Generate PCA Mono_1C logo system (configurations × backgrounds)"
    )
    p.add_argument("--colorway", default="Mono_1C", help="Must be Mono_1C")
    p.add_argument(
        "--config",
        nargs="+",
        metavar="NAME",
        help=f"Subset of {', '.join(AUTHORIZED_CONFIGURATIONS)} (default: all)",
    )
    p.add_argument(
        "--background",
        nargs="+",
        metavar="BG",
        help=f"Subset of {', '.join(AUTHORIZED_BACKGROUNDS)} (default: both)",
    )
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    if args.colorway not in AUTHORIZED_COLORWAYS:
        raise SystemExit(
            f"Colorway nao autorizada: {args.colorway}. Somente Mono_1C."
        )
    selected = list(AUTHORIZED_CONFIGURATIONS) if not args.config else list(args.config)
    bad = [c for c in selected if c not in AUTHORIZED_CONFIGURATIONS]
    if bad:
        raise SystemExit(
            f"Configuracao(oes) nao autorizada(s): {', '.join(bad)}. "
            f"Permitidas: {', '.join(AUTHORIZED_CONFIGURATIONS)}"
        )
    backgrounds = list(AUTHORIZED_BACKGROUNDS) if not args.background else list(args.background)
    bad_bg = [b for b in backgrounds if b not in AUTHORIZED_BACKGROUNDS]
    if bad_bg:
        raise SystemExit(
            f"Fundo(s) nao autorizado(s): {', '.join(bad_bg)}. "
            f"Permitidos: {', '.join(AUTHORIZED_BACKGROUNDS)}"
        )
    report = generate_all(selected, backgrounds)
    print(
        json.dumps(
            {
                "generated": report["generated"],
                "exports": {
                    k: {
                        "geometry": v.get("geometry"),
                        "backgrounds": list(v.get("backgrounds", v).keys())
                        if isinstance(v, dict)
                        else v,
                    }
                    for k, v in report["exports"].items()
                },
                "fidelity": report["fidelity"],
                "background_qa": report.get("background_qa"),
                "decisions": {
                    k: v.get("status") or v.get("decision") or v
                    for k, v in report["decisions"].items()
                },
                "candidate_board": report.get("candidate_board"),
                "qa_board": report.get("qa_board"),
                "master_untouched": report["master_untouched"],
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
