"""Compose LOGO_PCA_Lockup_Vertical_Mono_1C from Master WebP + Palatino wordmark.

Primary visual source (inegociável):
  assets/img/logo-pca/LOGO_PCA_Master_Mono_1C.webp

Kit autorizado: somente Mono_1C.
  - Full Master WebP content; uniform scale + position only
  - No SVG Master as crest source; no _800 / ladder derivatives as source
  - SVG is hybrid: embedded Master WebP (data URI) + outlined wordmark
  - Do not commit pala.ttf / palab.ttf
  - Do not generate Branca / Color / Reverso variants
"""
from __future__ import annotations

import argparse
import base64
import io
import json
from pathlib import Path

import numpy as np
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
LOGO_DIR = ROOT / "assets" / "img" / "logo-pca"
QA_DIR = ROOT / "marca" / "laboratorio" / "_qa"
OUT_SIZES = (400, 180, 128)
WEBP_Q = 90

PRIMARY_WEBP = LOGO_DIR / "LOGO_PCA_Master_Mono_1C.webp"
FONT_REG = Path(r"C:\Windows\Fonts\pala.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\palab.ttf")

LINE1 = "PROJETO"
LINE2 = "CASERNA DE ADULÃO"

SIDE_RATIO = 0.07
TOP_RATIO = 0.045
GAP_RATIO = 0.08
LINE2_MAX_RATIO = 0.88
LINE1_SIZE_RATIO = 0.48
TRACK1_EM = 0.18
TRACK2_EM = 0.04
LINE_GAP_EM = 0.38
BOTTOM_RATIO = 0.07

CARVAO = (0x0E, 0x12, 0x16, 255)
TEXT_HEX = "#0E1216"

ALLOWED_VARIANT_KEYS = ("Mono_1C",)

VARIANTS = [
    {
        "key": "Mono_1C",
        "crest": "LOGO_PCA_Master_Mono_1C.webp",
        "text": CARVAO,
        "text_hex": TEXT_HEX,
        "source_note": "literal PRIMARY WebP — sole authorized logo variant",
    },
]

assert tuple(v["key"] for v in VARIANTS) == ALLOWED_VARIANT_KEYS


def load_primary() -> Image.Image:
    if not PRIMARY_WEBP.is_file():
        raise FileNotFoundError(PRIMARY_WEBP)
    im = Image.open(PRIMARY_WEBP).convert("RGBA")
    if im.size[0] != im.size[1]:
        raise ValueError(f"PRIMARY not square: {im.size}")
    return im


def geometry_report(primary: Image.Image) -> dict:
    p = np.array(primary)
    pa = p[..., 3]
    ys, xs = np.where(pa > 10)
    return {
        "primary": PRIMARY_WEBP.name,
        "size": list(primary.size),
        "primary_bbox": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
    }


def measure_tracked(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, tracking_px: float) -> int:
    if not text:
        return 0
    widths = [draw.textlength(ch, font=font) for ch in text]
    return int(round(sum(widths) + tracking_px * (len(text) - 1)))


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    xy: tuple[float, float],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking_px: float,
) -> None:
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking_px


def fit_line2_font(draw: ImageDraw.ImageDraw, max_w: int) -> ImageFont.FreeTypeFont:
    lo, hi = 24, 420
    best = ImageFont.truetype(str(FONT_BOLD), 48)
    while lo <= hi:
        mid = (lo + hi) // 2
        font = ImageFont.truetype(str(FONT_BOLD), mid)
        track = TRACK2_EM * mid
        w = measure_tracked(draw, LINE2, font, track)
        if w <= max_w:
            best = font
            lo = mid + 1
        else:
            hi = mid - 1
    return best


def layout_metrics(crest_side: int) -> dict:
    side = int(round(crest_side * SIDE_RATIO))
    top = int(round(crest_side * TOP_RATIO))
    gap = int(round(crest_side * GAP_RATIO))
    bottom = int(round(crest_side * BOTTOM_RATIO))
    return {
        "crest_side": crest_side,
        "side": side,
        "top": top,
        "gap": gap,
        "bottom": bottom,
        "canvas_w": crest_side + 2 * side,
        "crest_x": side,
        "crest_y": top,
        "line2_max_w": int(round(crest_side * LINE2_MAX_RATIO)),
    }


def compose_raster(crest: Image.Image, text_rgba: tuple[int, int, int, int], metrics: dict) -> tuple[Image.Image, dict]:
    if crest.size != (metrics["crest_side"], metrics["crest_side"]):
        crest = crest.resize((metrics["crest_side"], metrics["crest_side"]), Image.Resampling.LANCZOS)

    probe = Image.new("RGBA", (metrics["canvas_w"], 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    font2 = fit_line2_font(draw, metrics["line2_max_w"])
    size2 = font2.size
    size1 = max(12, int(round(size2 * LINE1_SIZE_RATIO)))
    font1 = ImageFont.truetype(str(FONT_REG), size1)
    track1 = TRACK1_EM * size1
    track2 = TRACK2_EM * size2
    line_gap = int(round(LINE_GAP_EM * size2))

    ascent1, descent1 = font1.getmetrics()
    ascent2, descent2 = font2.getmetrics()
    text_h = ascent1 + descent1 + line_gap + ascent2 + descent2

    canvas_h = metrics["crest_y"] + metrics["crest_side"] + metrics["gap"] + text_h + metrics["bottom"]
    canvas = Image.new("RGBA", (metrics["canvas_w"], canvas_h), (0, 0, 0, 0))
    # Paste WITHOUT mask to preserve Master semi-transparent edges.
    canvas.paste(crest, (metrics["crest_x"], metrics["crest_y"]))

    draw = ImageDraw.Draw(canvas)
    text_top = metrics["crest_y"] + metrics["crest_side"] + metrics["gap"]

    w1 = measure_tracked(draw, LINE1, font1, track1)
    x1 = (metrics["canvas_w"] - w1) / 2
    draw_tracked(draw, (x1, text_top), LINE1, font1, text_rgba, track1)

    y2 = text_top + ascent1 + descent1 + line_gap
    w2 = measure_tracked(draw, LINE2, font2, track2)
    x2 = (metrics["canvas_w"] - w2) / 2
    draw_tracked(draw, (x2, y2), LINE2, font2, text_rgba, track2)

    typo = {
        "font1_px": size1,
        "font2_px": size2,
        "track1_px": track1,
        "track2_px": track2,
        "line_gap_px": line_gap,
        "text_top": text_top,
        "line1_xy": [x1, text_top],
        "line2_xy": [x2, y2],
        "line1_w": w1,
        "line2_w": w2,
        "canvas": [metrics["canvas_w"], canvas_h],
        "crest_box": [metrics["crest_x"], metrics["crest_y"], metrics["crest_side"], metrics["crest_side"]],
    }
    return canvas, typo


def resize_width(im: Image.Image, width: int) -> Image.Image:
    if width > im.width:
        raise ValueError(f"refusing upscale {im.width} -> {width}")
    if width == im.width:
        return im.copy()
    h = max(1, int(round(im.height * (width / im.width))))
    return im.resize((width, h), Image.Resampling.LANCZOS)


def save_raster(im: Image.Image, base: Path) -> None:
    for ext, kwargs in (
        (".png", {"format": "PNG", "optimize": True}),
        (".webp", {"format": "WEBP", "quality": WEBP_Q, "method": 6}),
    ):
        path = base.with_suffix(ext)
        tmp = path.with_suffix(ext + ".tmp")
        im.save(tmp, **kwargs)
        tmp.replace(path)


def glyph_path(font: TTFont, char: str) -> str:
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    name = cmap.get(ord(char))
    if not name:
        raise KeyError(f"missing glyph for {char!r}")
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(pen)
    return pen.getCommands()


def outlined_wordmark_svg(font_reg: TTFont, font_bold: TTFont, typo: dict, text_hex: str) -> str:
    parts: list[str] = []

    def emit(text: str, font_tt: TTFont, size_px: float, track_px: float, xy: list[float], pillow_path: str) -> None:
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
            transform = f"translate({x:.3f} {baseline:.3f}) scale({scale:.6f} {-scale:.6f})"
            parts.append(f'<path fill="{text_hex}" transform="{transform}" d="{cmds}"/>')
            x += advance + track_px

    emit(LINE1, font_reg, typo["font1_px"], typo["track1_px"], typo["line1_xy"], str(FONT_REG))
    emit(LINE2, font_bold, typo["font2_px"], typo["track2_px"], typo["line2_xy"], str(FONT_BOLD))
    return "\n    ".join(parts)


def write_hybrid_svg(out_path: Path, crest_webp_bytes: bytes, typo: dict, text_hex: str, title: str) -> None:
    w, h = typo["canvas"]
    cx, cy, cs, _ = typo["crest_box"]
    b64 = base64.b64encode(crest_webp_bytes).decode("ascii")
    font_reg = TTFont(str(FONT_REG))
    font_bold = TTFont(str(FONT_BOLD))
    paths = outlined_wordmark_svg(font_reg, font_bold, typo, text_hex)
    font_reg.close()
    font_bold.close()

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img"
     aria-label="{title}">
  <title>{title}</title>
  <desc>SVG híbrido: logomarca Master Mono_1C embutida como WebP (data URI) + wordmark em contornos. Não é 100% vetorial.</desc>
  <image x="{cx}" y="{cy}" width="{cs}" height="{cs}"
         href="data:image/webp;base64,{b64}"
         xlink:href="data:image/webp;base64,{b64}"
         preserveAspectRatio="xMidYMid meet"/>
  <g class="wordmark" aria-hidden="true">
    {paths}
  </g>
</svg>
'''
    out_path.write_text(svg, encoding="utf-8")


def crest_region_mse(lockup: Image.Image, primary: Image.Image, typo: dict) -> dict:
    cx, cy, cs, _ = typo["crest_box"]
    region = lockup.crop((cx, cy, cx + cs, cy + cs)).convert("RGBA")
    ref = primary.resize((cs, cs), Image.Resampling.LANCZOS).convert("RGBA")
    a = np.asarray(region, dtype=np.float64)
    b = np.asarray(ref, dtype=np.float64)
    mask = (a[..., 3] > 1) | (b[..., 3] > 1)
    diff = np.abs(a - b)
    mae = float(diff[mask].mean()) if mask.any() else 0.0
    opaque = b[..., 3] > 128
    max_delta = float(diff[opaque].max()) if opaque.any() else float(diff.max())
    exact = float((a == b).all(axis=-1)[mask].mean() * 100) if mask.any() else 100.0
    return {
        "region_box": [cx, cy, cs, cs],
        "compared_size": [cs, cs],
        "metric": "MAE_RGBA_masked + max_abs_delta_on_ref_opaque",
        "mae_rgba": round(mae, 6),
        "max_abs_delta": round(max_delta, 4),
        "exact_match_pct_masked": round(exact, 4),
        "tolerance": {
            "mae_rgba_max": 0.5,
            "max_abs_delta_max": 2.0,
            "reason": "PNG paste of PRIMARY WebP decoded pixels without mask blending",
        },
        "pass": mae <= 0.5 and max_delta <= 2.0,
    }


def build_qa_board(lockup: Image.Image, typo: dict) -> None:
    QA_DIR.mkdir(parents=True, exist_ok=True)
    paper = (0xF3, 0xEE, 0xE6, 255)
    ink = (0x0E, 0x12, 0x16, 255)
    cell_w, cell_h = 280, 360
    cols, rows = 3, 3
    board = Image.new("RGBA", (cols * cell_w, rows * cell_h), paper)
    draw = ImageDraw.Draw(board)
    label_font = ImageFont.truetype(str(FONT_REG), 14)

    def place(im: Image.Image, col: int, row: int, label: str, bg: tuple[int, int, int, int]) -> None:
        x0, y0 = col * cell_w, row * cell_h
        draw.rectangle([x0, y0, x0 + cell_w - 1, y0 + cell_h - 1], fill=bg)
        if bg[0] < 80:
            # Dark context: local papel plate (UI surface), logo stays Mono_1C.
            plate = Image.new("RGBA", (cell_w - 40, cell_h - 64), paper)
            thumb = im.copy()
            thumb.thumbnail((plate.width - 16, plate.height - 16), Image.Resampling.LANCZOS)
            px = (plate.width - thumb.width) // 2
            py = (plate.height - thumb.height) // 2
            plate.paste(thumb, (px, py), thumb)
            bx = x0 + (cell_w - plate.width) // 2
            by = y0 + 36
            board.paste(plate, (bx, by))
            draw.text((x0 + 8, y0 + 8), label, font=label_font, fill=(255, 255, 255, 255))
        else:
            thumb = im.copy()
            thumb.thumbnail((cell_w - 24, cell_h - 48), Image.Resampling.LANCZOS)
            px = x0 + (cell_w - thumb.width) // 2
            py = y0 + 28 + (cell_h - 48 - thumb.height) // 2
            board.paste(thumb, (px, py), thumb)
            draw.text((x0 + 8, y0 + 8), label, font=label_font, fill=(20, 20, 20, 255))

    primary = Image.open(PRIMARY_WEBP).convert("RGBA")
    place(primary, 0, 0, "Master Mono_1C", paper)
    place(lockup, 1, 0, "Lockup Mono_1C", paper)
    place(resize_width(lockup, 400), 2, 0, "400", paper)

    place(resize_width(lockup, 180), 0, 1, "180", paper)
    place(resize_width(lockup, 128), 1, 1, "128", paper)
    place(lockup, 2, 1, "Lockup em papel", paper)

    place(primary, 0, 2, "Master em tinta + placa", ink)
    place(lockup, 1, 2, "Lockup em tinta + placa", ink)
    cx, cy, cs, _ = typo["crest_box"]
    place(lockup.crop((cx, cy, cx + cs, cy + cs)), 2, 2, "Crest extract", paper)

    out = QA_DIR / "LOCKUP_VERTICAL_QA_BOARD.png"
    board.save(out, format="PNG", optimize=True)
    print("QA board:", out)


def resolve_variants(requested: list[str] | None) -> list[dict]:
    if not requested:
        return list(VARIANTS)
    unknown = [k for k in requested if k not in ALLOWED_VARIANT_KEYS]
    if unknown:
        raise SystemExit(
            f"Variante(s) nao autorizada(s): {', '.join(unknown)}. "
            "Somente Mono_1C esta autorizada. "
            "Nao gerar Branca, Color_Institucional, Reverso nem outras cores."
        )
    by_key = {v["key"]: v for v in VARIANTS}
    return [by_key[k] for k in requested]


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Generate PCA Lockup Vertical Mono_1C only.")
    parser.add_argument(
        "--only",
        nargs="+",
        metavar="KEY",
        help="Must be Mono_1C if provided",
    )
    args = parser.parse_args(argv)
    selected = resolve_variants(args.only)

    if not FONT_REG.is_file() or not FONT_BOLD.is_file():
        raise SystemExit("Palatino Linotype (pala.ttf / palab.ttf) required on the build machine")

    primary = load_primary()
    report = geometry_report(primary)
    print(json.dumps(report, indent=2))

    metrics = layout_metrics(primary.size[0])
    masters: dict[str, Image.Image] = {}
    typo_ref: dict | None = None

    for v in selected:
        crest_path = LOGO_DIR / v["crest"]
        crest_bytes = crest_path.read_bytes()
        crest = Image.open(io.BytesIO(crest_bytes)).convert("RGBA")
        if crest.size != primary.size:
            raise SystemExit(f"{crest_path.name} size {crest.size} != primary {primary.size}")

        canvas, typo = compose_raster(crest, v["text"], metrics)
        typo_ref = typo

        base = LOGO_DIR / f"LOGO_PCA_Lockup_Vertical_{v['key']}"
        save_raster(canvas, base)
        write_hybrid_svg(base.with_suffix(".svg"), crest_bytes, typo, v["text_hex"], base.name)

        for w in OUT_SIZES:
            save_raster(resize_width(canvas, w), LOGO_DIR / f"{base.name}_{w}")

        masters[v["key"]] = canvas
        print(f"OK {v['key']} {canvas.size} from {v['crest']} ({v['source_note']})")

        for ext in (".png", ".webp"):
            stale = LOGO_DIR / f"{base.name}_800{ext}"
            if stale.exists():
                stale.unlink()

    assert typo_ref is not None
    fidelity = crest_region_mse(masters["Mono_1C"], primary, typo_ref)
    print("FIDELITY", json.dumps(fidelity, indent=2))

    meta = {
        "authorized_variants": list(ALLOWED_VARIANT_KEYS),
        "generated_variants": [v["key"] for v in selected],
        "primary_webp": PRIMARY_WEBP.name,
        "rejected_variants_note": [
            "Mono_1C_Branca_FFFFFF",
            "Color_Institucional",
            "Color_Institucional_Reverso",
        ],
        "geometry_masters": report,
        "layout_ratios": {
            "side": SIDE_RATIO,
            "top": TOP_RATIO,
            "gap": GAP_RATIO,
            "line2_max": LINE2_MAX_RATIO,
            "line1_size": LINE1_SIZE_RATIO,
            "track1_em": TRACK1_EM,
            "track2_em": TRACK2_EM,
            "line_gap_em": LINE_GAP_EM,
        },
        "typo_px": typo_ref,
        "fidelity_mono": fidelity,
        "svg": "hybrid WebP data-URI crest + Palatino outlines",
        "export_widths": ["master=full"] + list(OUT_SIZES),
        "note": "Kit reduzido a Mono_1C. Fundos escuros adaptam superficie (papel), nao a logomarca.",
    }
    QA_DIR.mkdir(parents=True, exist_ok=True)
    (QA_DIR / "lockup_vertical_build_report.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
    build_qa_board(masters["Mono_1C"], typo_ref)

    w, h = typo_ref["canvas"]
    print(f"CANONICAL_GEOMETRY {w}x{h}")
    print(f"VARIANTS {list(ALLOWED_VARIANT_KEYS)}")


if __name__ == "__main__":
    main()
