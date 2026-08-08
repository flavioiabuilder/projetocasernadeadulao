"""PCA logo system — one colorway (Mono_1C), multiple structural configurations.

Canonical Master (never rewritten):
  assets/img/logo-pca/LOGO_PCA_Master_Mono_1C.webp

Wordmark ink: #000000 (not carvão/papel/bronze).
"""
from __future__ import annotations

import argparse
import base64
import io
import json
import math
from pathlib import Path

import numpy as np
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
LOGO_DIR = ROOT / "assets" / "img" / "logo-pca"
QA_DIR = ROOT / "marca" / "laboratorio" / "_qa"

PRIMARY_WEBP = LOGO_DIR / "LOGO_PCA_Master_Mono_1C.webp"
FONT_REG = Path(r"C:\Windows\Fonts\pala.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\palab.ttf")

AUTHORIZED_COLORWAYS = ("Mono_1C",)
# Master is source-of-truth on disk — script does not regenerate it.
AUTHORIZED_CONFIGURATIONS = (
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
WEBP_Q = 90

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
H_CREST_SIDE = 900  # Master drawn at this size (uniform from 1563)
H_GAP_X = 0.10  # of crest
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
W_H_GAP_WORDS = 0.55  # em of main size between PROJETO and rest


def load_primary() -> Image.Image:
    im = Image.open(PRIMARY_WEBP).convert("RGBA")
    if im.size[0] != im.size[1]:
        raise ValueError(f"PRIMARY not square: {im.size}")
    return im


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


def save_raster(im: Image.Image, base: Path) -> None:
    for ext, kwargs in (
        (".png", {"format": "PNG", "optimize": True}),
        (".webp", {"format": "WEBP", "quality": WEBP_Q, "method": 6}),
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


def export_ladder(im: Image.Image, base: Path, widths: tuple[int, ...]) -> dict:
    save_raster(im, base)
    out = {"master": list(im.size)}
    for w in widths:
        if w >= im.width:
            continue
        scaled = resize_width(im, w)
        save_raster(scaled, LOGO_DIR / f"{base.name}_{w}")
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


def write_hybrid_svg(path: Path, crest_bytes: bytes, crest_box: tuple[int, int, int, int], canvas: tuple[int, int], paths: str, title: str) -> None:
    w, h = canvas
    cx, cy, cs, _ = crest_box
    b64 = base64.b64encode(crest_bytes).decode("ascii")
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>SVG híbrido Mono_1C: Master WebP (data URI) + wordmark #000000 em contornos. Não é 100% vetorial.</desc>
  <image x="{cx}" y="{cy}" width="{cs}" height="{cs}"
         href="data:image/webp;base64,{b64}"
         xlink:href="data:image/webp;base64,{b64}"
         preserveAspectRatio="xMidYMid meet"/>
  <g class="wordmark" aria-hidden="true">
    {paths}
  </g>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


def write_vector_svg(path: Path, canvas: tuple[int, int], paths: str, title: str) -> None:
    w, h = canvas
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Wordmark Mono_1C vetorial (Palatino outlines, fill #000000). Auxiliar — não substitui o Master.</desc>
  <g class="wordmark">
    {paths}
  </g>
</svg>
'''
    path.write_text(svg, encoding="utf-8")


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

    # Fit line2 to ~1.15× crest width of text column
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
    # Optical vertical center of text block vs crest
    text_block_top = pad + (canvas_h - 2 * pad - text_h) // 2
    draw = ImageDraw.Draw(canvas)
    draw_tracked(draw, (text_x + (text_w - w1) / 2, text_block_top), LINE1, font1, track1)
    y2 = text_block_top + a1 + d1 + line_gap
    draw_tracked(draw, (text_x + (text_w - w2) / 2, y2), LINE2, font2, track2)

    # Full-res crest for MAE: paste primary scaled into crest box via LANCZOS from full file
    # For fidelity check, compare resized primary to crest region
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
    # Rebuild crest paste from full primary bytes path for SVG embed (full webp, scaled in SVG)
    return canvas, meta, PRIMARY_WEBP.read_bytes()


def compose_wordmark_stacked() -> tuple[Image.Image, dict]:
    # Use vertical type metrics at a generous master size
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
    """Single-line wordmark. Returns image, meta, evaluation dict."""
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
    # Align baselines optically
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
    # Approve if aspect is usable for ultrawide credits but not absurd
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
    fr.close(); fb.close()
    return p1 + "\n    " + p2


def svg_paths_horizontal_wm(meta: dict) -> str:
    fr, fb = TTFont(str(FONT_REG)), TTFont(str(FONT_BOLD))
    p1 = path_group_for_line(LINE1, fr, meta["font_project_px"], meta["track_project_px"], tuple(meta["project_xy"]), str(FONT_REG))
    p2 = path_group_for_line("CASERNA DE ADULÃO", fb, meta["font_main_px"], meta["track_main_px"], tuple(meta["rest_xy"]), str(FONT_BOLD))
    fr.close(); fb.close()
    return p1 + "\n    " + p2


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
        ("V + placa ink", assets["Lockup_Vertical"], ink),
        ("H + placa ink", assets["Lockup_Horizontal"], ink),
        ("Stacked + placa", assets["Wordmark_Stacked"], ink),
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
        if bg[0] < 80:
            plate = Image.new("RGBA", (thumb.width + 20, thumb.height + 20), paper)
            plate.paste(thumb, (10, 10), thumb)
            px = x0 + (cell_w - plate.width) // 2
            py = y0 + 36
            board.paste(plate, (px, py))
            fill = (255, 255, 255, 255)
        else:
            px = x0 + (cell_w - thumb.width) // 2
            py = y0 + 36
            board.paste(thumb, (px, py), thumb)
            fill = (20, 20, 20, 255)
        draw.text((x0 + 8, y0 + 8), label, font=font, fill=fill)
    out = QA_DIR / "LOGO_SYSTEM_CANDIDATES_BOARD.png"
    board.save(out, format="PNG", optimize=True)
    (QA_DIR / "logo_system_candidates.json").write_text(json.dumps(decisions, indent=2), encoding="utf-8")
    return out


def assert_no_forbidden_colors_in_svg(path: Path) -> None:
    t = path.read_text(encoding="utf-8")
    for bad in ("#0E1216", "#0e1216", "#F3EEE6", "#f3eee6", "#8B6F47", "#8b6f47"):
        if bad in t:
            # allow in desc? no — fail
            raise SystemExit(f"Forbidden color {bad} in {path.name}")


def generate_all(selected: list[str]) -> dict:
    if not FONT_REG.is_file() or not FONT_BOLD.is_file():
        raise SystemExit("Palatino fonts required on build machine")

    primary = load_primary()
    report: dict = {
        "authorized_colorways": list(AUTHORIZED_COLORWAYS),
        "authorized_configurations": list(AUTHORIZED_CONFIGURATIONS),
        "generated": [],
        "master_source": PRIMARY_WEBP.name,
        "master_untouched": True,
        "ink": INK_HEX,
        "exports": {},
        "fidelity": {},
        "decisions": {},
    }

    board_assets: dict[str, Image.Image] = {"Master": primary}

    # Always compute all for candidate board / decisions; export only selected
    v_img, v_meta, v_bytes = compose_lockup_vertical(primary)
    h_img, h_meta, h_bytes = compose_lockup_horizontal(primary)
    s_img, s_meta = compose_wordmark_stacked()
    wh_img, wh_meta, wh_eval = compose_wordmark_horizontal()

    board_assets["Lockup_Vertical"] = v_img
    board_assets["Lockup_Horizontal"] = h_img
    board_assets["Wordmark_Stacked"] = s_img
    board_assets["Wordmark_Horizontal"] = wh_img

    report["decisions"] = {
        "Master": {"status": "canonical", "note": "Não regenerado pelo script"},
        "Lockup_Vertical": {"status": "approved", "geometry": v_meta["canvas"], "ink": INK_HEX},
        "Lockup_Horizontal": {"status": "approved", "geometry": h_meta["canvas"], "ink": INK_HEX},
        "Wordmark_Stacked": {
            "status": "approved_auxiliary",
            "geometry": s_meta["canvas"],
            "note": "Não substitui o Master",
        },
        "Wordmark_Horizontal": wh_eval,
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

    board_path = build_candidate_board(board_assets, report["decisions"])
    report["candidate_board"] = str(board_path.relative_to(ROOT)).replace("\\", "/")

    if "Lockup_Vertical" in selected:
        base = LOGO_DIR / "LOGO_PCA_Lockup_Vertical_Mono_1C"
        report["exports"]["Lockup_Vertical"] = export_ladder(v_img, base, (400, 180, 128))
        paths = svg_paths_vertical(v_meta)
        write_hybrid_svg(base.with_suffix(".svg"), v_bytes, tuple(v_meta["crest_box"]), tuple(v_meta["canvas"]), paths, base.name)
        assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
        report["fidelity"]["Lockup_Vertical"] = crest_mae(v_img, primary, tuple(v_meta["crest_box"]))
        report["generated"].append("Lockup_Vertical")
        report["typo_vertical"] = v_meta

    if "Lockup_Horizontal" in selected:
        base = LOGO_DIR / "LOGO_PCA_Lockup_Horizontal_Mono_1C"
        report["exports"]["Lockup_Horizontal"] = export_ladder(h_img, base, (800, 400, 240, 180))
        paths = svg_paths_vertical(h_meta)  # same LINE1/LINE2 fields
        # Embed full Master webp; SVG scales via width/height of image element
        write_hybrid_svg(base.with_suffix(".svg"), h_bytes, tuple(h_meta["crest_box"]), tuple(h_meta["canvas"]), paths, base.name)
        assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
        # MAE vs LANCZOS of primary into crest box
        report["fidelity"]["Lockup_Horizontal"] = crest_mae(h_img, primary, tuple(h_meta["crest_box"]))
        report["generated"].append("Lockup_Horizontal")
        report["typo_horizontal"] = h_meta

    if "Wordmark_Stacked" in selected:
        base = LOGO_DIR / "LOGO_PCA_Wordmark_Stacked_Mono_1C"
        report["exports"]["Wordmark_Stacked"] = export_ladder(s_img, base, (800, 400, 240, 180))
        paths = svg_paths_vertical(s_meta)
        write_vector_svg(base.with_suffix(".svg"), tuple(s_meta["canvas"]), paths, base.name)
        assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
        report["generated"].append("Wordmark_Stacked")
        report["typo_wordmark_stacked"] = s_meta

    if "Wordmark_Horizontal" in selected:
        if wh_eval["decision"] != "approved":
            print("Wordmark_Horizontal rejected — not exported:", wh_eval["reason"])
        else:
            base = LOGO_DIR / "LOGO_PCA_Wordmark_Horizontal_Mono_1C"
            report["exports"]["Wordmark_Horizontal"] = export_ladder(wh_img, base, (800, 400, 240, 180))
            paths = svg_paths_horizontal_wm(wh_meta)
            write_vector_svg(base.with_suffix(".svg"), tuple(wh_meta["canvas"]), paths, base.name)
            assert_no_forbidden_colors_in_svg(base.with_suffix(".svg"))
            report["generated"].append("Wordmark_Horizontal")
            report["typo_wordmark_horizontal"] = wh_meta

    QA_DIR.mkdir(parents=True, exist_ok=True)
    (QA_DIR / "logo_system_build_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    return report


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate PCA Mono_1C logo configurations")
    p.add_argument("--colorway", default="Mono_1C", help="Must be Mono_1C")
    p.add_argument(
        "--config",
        nargs="+",
        metavar="NAME",
        help=f"Subset of {', '.join(AUTHORIZED_CONFIGURATIONS)} (default: all approved)",
    )
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> None:
    args = parse_args(argv)
    if args.colorway not in AUTHORIZED_COLORWAYS:
        raise SystemExit(
            f"Colorway nao autorizada: {args.colorway}. Somente Mono_1C."
        )
    selected = list(AUTHORIZED_CONFIGURATIONS) if not args.config else list(args.config)
    bad = [c for c in selected if c not in AUTHORIZED_CONFIGURATIONS and c != "Master"]
    if bad:
        raise SystemExit(
            f"Configuracao(oes) nao autorizada(s): {', '.join(bad)}. "
            f"Permitidas: {', '.join(AUTHORIZED_CONFIGURATIONS)}"
        )
    selected = [c for c in selected if c != "Master"]
    report = generate_all(selected)
    print(json.dumps({
        "generated": report["generated"],
        "exports": report["exports"],
        "fidelity": report["fidelity"],
        "decisions": {k: v.get("status") or v.get("decision") for k, v in report["decisions"].items()},
        "candidate_board": report.get("candidate_board"),
    }, indent=2))


if __name__ == "__main__":
    main()
