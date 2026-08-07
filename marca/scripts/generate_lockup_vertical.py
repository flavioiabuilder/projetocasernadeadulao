"""Compose LOGO_PCA_Lockup_Vertical_* from Master WebP + Palatino wordmark.

Primary visual source (inegociável):
  assets/img/logo-pca/LOGO_PCA_Master_Mono_1C.webp

Rules:
  - Full Master WebP content; uniform scale + position only
  - No SVG Master as crest source; no _800 / ladder derivatives as source
  - SVG is hybrid: embedded Master WebP (data URI) + outlined wordmark
  - Do not commit pala.ttf / palab.ttf
"""
from __future__ import annotations

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
OUT_SIZES = (400, 180, 128)  # master = full composition; ladder by width
WEBP_Q = 90

PRIMARY_WEBP = LOGO_DIR / "LOGO_PCA_Master_Mono_1C.webp"
FONT_REG = Path(r"C:\Windows\Fonts\pala.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\palab.ttf")

LINE1 = "PROJETO"
LINE2 = "CASERNA DE ADULÃO"

# Starting metrics (revisable optically against correct Master mass)
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
WHITE = (255, 255, 255, 255)

# Closed allowlist — do not add chromatic variants without an explicit human gate.
ALLOWED_VARIANT_KEYS = (
    "Mono_1C",
    "Mono_1C_Branca_FFFFFF",
    "Color_Institucional",
)

VARIANTS = [
    {
        "key": "Mono_1C",
        "crest": "LOGO_PCA_Master_Mono_1C.webp",
        "text": CARVAO,
        "text_hex": "#0E1216",
        "source_note": "literal PRIMARY WebP",
    },
    {
        "key": "Mono_1C_Branca_FFFFFF",
        "crest": "LOGO_PCA_Master_Mono_1C_Branca_FFFFFF.webp",
        "text": WHITE,
        "text_hex": "#FFFFFF",
        "source_note": "official White WebP (alpha/bbox identical to PRIMARY)",
    },
    {
        "key": "Color_Institucional",
        "crest": "LOGO_PCA_Master_Color_Institucional.webp",
        "text": CARVAO,
        "text_hex": "#0E1216",
        "source_note": "official Color WebP in same frame (source bbox ~8px drift vs PRIMARY)",
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
    report = {"primary": str(PRIMARY_WEBP.name), "size": list(primary.size)}
    pa = p[..., 3]
    ys, xs = np.where(pa > 10)
    report["primary_bbox"] = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
    for v in VARIANTS[1:]:
        path = LOGO_DIR / v["crest"]
        im = np.array(Image.open(path).convert("RGBA"))
        a = im[..., 3]
        ys, xs = np.where(a > 10)
        bbox = [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())]
        disagree = float(( (pa > 128) != (a > 128) ).mean() * 100)
        report[v["key"]] = {
            "size": list(im.shape[1::-1]),
            "bbox": bbox,
            "alpha_disagree_pct": round(disagree, 4),
            "same_size": im.shape == p.shape,
            "note": v["source_note"],
        }
    return report


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
    canvas_w = crest_side + 2 * side
    crest_x = side
    crest_y = top
    return {
        "crest_side": crest_side,
        "side": side,
        "top": top,
        "gap": gap,
        "bottom": bottom,
        "canvas_w": canvas_w,
        "crest_x": crest_x,
        "crest_y": crest_y,
        "line2_max_w": int(round(crest_side * LINE2_MAX_RATIO)),
    }


def compose_raster(crest: Image.Image, text_rgba: tuple[int, int, int, int], metrics: dict) -> tuple[Image.Image, dict]:
    """Paste full crest (no crop) + wordmark. Returns image and text metrics."""
    if crest.size != (metrics["crest_side"], metrics["crest_side"]):
        # Only uniform scale of the FULL master square is allowed.
        crest = crest.resize((metrics["crest_side"], metrics["crest_side"]), Image.Resampling.LANCZOS)

    # Probe fonts on a temp canvas
    probe = Image.new("RGBA", (metrics["canvas_w"], 64), (0, 0, 0, 0))
    draw = ImageDraw.Draw(probe)
    font2 = fit_line2_font(draw, metrics["line2_max_w"])
    size2 = font2.size
    size1 = max(12, int(round(size2 * LINE1_SIZE_RATIO)))
    font1 = ImageFont.truetype(str(FONT_REG), size1)
    track1 = TRACK1_EM * size1
    track2 = TRACK2_EM * size2
    line_gap = int(round(LINE_GAP_EM * size2))

    # Ascents for optical block height
    ascent1, descent1 = font1.getmetrics()
    ascent2, descent2 = font2.getmetrics()
    text_h = ascent1 + descent1 + line_gap + ascent2 + descent2

    canvas_h = metrics["crest_y"] + metrics["crest_side"] + metrics["gap"] + text_h + metrics["bottom"]
    canvas = Image.new("RGBA", (metrics["canvas_w"], canvas_h), (0, 0, 0, 0))
    # Paste WITHOUT mask: mask-blending would alter semi-transparent Master edges.
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
    if width >= im.width:
        if width == im.width:
            return im.copy()
        raise ValueError(f"refusing upscale {im.width} -> {width}")
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


def glyph_path(font: TTFont, char: str, pen_factory) -> str:
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    name = cmap.get(ord(char))
    if not name:
        raise KeyError(f"missing glyph for {char!r}")
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(pen)
    return pen.getCommands()


def outlined_wordmark_svg(
    font_reg: TTFont,
    font_bold: TTFont,
    typo: dict,
    text_hex: str,
    upem_reg: int,
    upem_bold: int,
) -> str:
    """Build SVG path groups for tracked wordmark (font units → canvas px)."""
    parts: list[str] = []

    def emit_line(text: str, font: TTFont, upem: int, size_px: float, track_px: float, x0: float, y0: float, ascent_px: float) -> None:
        # Pillow draws with baseline ≈ y + ascent for truetype via top-left of em box;
        # ImageDraw.text uses top of text as y. Approximate: translate so glyph top aligns.
        scale = size_px / upem
        x = x0
        # fontTools y grows up; SVG y grows down — flip
        for ch in text:
            cmds = glyph_path(font, ch, None)
            # Measure advance via hmtx
            name = font.getBestCmap()[ord(ch)]
            advance = font["hmtx"].metrics[name][0] * scale
            # Shift: Pillow places top of ink roughly at y; use ascent from OS/2
            os2 = font["OS/2"]
            asc = os2.sTypoAscender * scale
            # Transform: scale, flip Y around baseline at y0+asc
            baseline = y0 + asc
            transform = f"translate({x:.3f} {baseline:.3f}) scale({scale:.6f} {-scale:.6f})"
            parts.append(f'<path fill="{text_hex}" transform="{transform}" d="{cmds}"/>')
            x += advance + track_px

    # Recompute with fontTools advances for consistency of path placement
    def line_with_pillow_anchor(text, font_tt, upem, size_px, track_px, xy, pillow_font_path, bold=False):
        # Use Pillow metrics for x/y anchors already stored in typo
        x0, y0 = xy
        scale = size_px / upem
        x = x0
        os2 = font_tt["OS/2"]
        # Pillow FreeType: y is top of glyph bitmap; approximate baseline = y + ascent
        probe = ImageFont.truetype(pillow_font_path, int(size_px))
        ascent, _ = probe.getmetrics()
        baseline = y0 + ascent
        for ch in text:
            cmds = glyph_path(font_tt, ch, None)
            name = font_tt.getBestCmap()[ord(ch)]
            advance = font_tt["hmtx"].metrics[name][0] * scale
            transform = f"translate({x:.3f} {baseline:.3f}) scale({scale:.6f} {-scale:.6f})"
            parts.append(f'<path fill="{text_hex}" transform="{transform}" d="{cmds}"/>')
            # Match Pillow tracked advance (Pillow textlength), not only hmtx
            # Prefer hmtx*scale; small delta vs Pillow is acceptable for SVG
            x += advance + track_px

    line_with_pillow_anchor(
        LINE1, font_reg, upem_reg, typo["font1_px"], typo["track1_px"], typo["line1_xy"], str(FONT_REG)
    )
    line_with_pillow_anchor(
        LINE2, font_bold, upem_bold, typo["font2_px"], typo["track2_px"], typo["line2_xy"], str(FONT_BOLD)
    )
    return "\n    ".join(parts)


def write_hybrid_svg(
    out_path: Path,
    crest_webp_bytes: bytes,
    typo: dict,
    text_hex: str,
    title: str,
) -> None:
    w, h = typo["canvas"]
    cx, cy, cs, _ = typo["crest_box"]
    b64 = base64.b64encode(crest_webp_bytes).decode("ascii")
    font_reg = TTFont(str(FONT_REG))
    font_bold = TTFont(str(FONT_BOLD))
    paths = outlined_wordmark_svg(
        font_reg,
        font_bold,
        typo,
        text_hex,
        font_reg["head"].unitsPerEm,
        font_bold["head"].unitsPerEm,
    )
    font_reg.close()
    font_bold.close()

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img"
     aria-label="{title}">
  <title>{title}</title>
  <desc>SVG híbrido: logomarca Master embutida como WebP (data URI) + wordmark em contornos. Não é 100% vetorial.</desc>
  <!-- crest: literal Master WebP, uniform scale/position only -->
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
    """Compare crest box in lockup PNG vs uniform resize of PRIMARY WebP."""
    cx, cy, cs, _ = typo["crest_box"]
    region = lockup.crop((cx, cy, cx + cs, cy + cs)).convert("RGBA")
    ref = primary.resize((cs, cs), Image.Resampling.LANCZOS).convert("RGBA")
    a = np.asarray(region, dtype=np.float64)
    b = np.asarray(ref, dtype=np.float64)
    # Only where either has alpha — ignore empty
    mask = (a[..., 3] > 1) | (b[..., 3] > 1)
    if not mask.any():
        return {"error": "empty mask"}
    diff = np.abs(a - b)
    mae = float(diff[mask].mean())
    # Max channel delta on opaque pixels of ref
    opaque = b[..., 3] > 128
    max_delta = float(diff[opaque].max()) if opaque.any() else float(diff.max())
    # Exact equality rate on RGBA
    exact = float((a == b).all(axis=-1)[mask].mean() * 100)
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
            "reason": "PNG roundtrip from composition that pastes PRIMARY WebP decoded pixels; "
            "expect near-zero vs LANCZOS self-resize when crest_side == primary.size",
        },
        "pass": mae <= 0.5 and max_delta <= 2.0,
    }


def build_qa_board(masters: dict[str, Image.Image], old_lockup: Image.Image | None, typo: dict) -> None:
    QA_DIR.mkdir(parents=True, exist_ok=True)
    paper = (0xF3, 0xEE, 0xE6, 255)
    ink = (0x0E, 0x12, 0x16, 255)
    cell_w, cell_h = 280, 360
    cols, rows = 4, 3
    board = Image.new("RGBA", (cols * cell_w, rows * cell_h), paper)
    draw = ImageDraw.Draw(board)
    label_font = ImageFont.truetype(str(FONT_REG), 14)

    def place(im: Image.Image, col: int, row: int, label: str, bg: tuple[int, int, int, int]) -> None:
        x0, y0 = col * cell_w, row * cell_h
        draw.rectangle([x0, y0, x0 + cell_w - 1, y0 + cell_h - 1], fill=bg)
        thumb = im.copy()
        thumb.thumbnail((cell_w - 24, cell_h - 48), Image.Resampling.LANCZOS)
        px = x0 + (cell_w - thumb.width) // 2
        py = y0 + 28 + (cell_h - 48 - thumb.height) // 2
        board.paste(thumb, (px, py), thumb)
        fill = (255, 255, 255, 255) if bg[0] < 80 else (20, 20, 20, 255)
        draw.text((x0 + 8, y0 + 8), label, font=label_font, fill=fill)

    primary = Image.open(PRIMARY_WEBP).convert("RGBA")
    place(primary, 0, 0, "PRIMARY Master WebP", paper)
    place(masters["Mono_1C"], 1, 0, "Mono_1C", paper)
    place(masters["Mono_1C_Branca_FFFFFF"], 2, 0, "Mono Branca", ink)
    place(masters["Color_Institucional"], 3, 0, "Color Institucional", paper)

    place(masters["Mono_1C"], 0, 1, "Mono fundo papel", paper)
    place(masters["Mono_1C_Branca_FFFFFF"], 1, 1, "Branca fundo carvao", ink)
    place(resize_width(masters["Mono_1C"], 400), 2, 1, "Mono 400", paper)
    place(resize_width(masters["Color_Institucional"], 400), 3, 1, "Color 400", paper)

    place(resize_width(masters["Mono_1C"], 180), 0, 2, "Mono 180", paper)
    place(resize_width(masters["Mono_1C"], 128), 1, 2, "Mono 128", paper)
    place(resize_width(masters["Mono_1C_Branca_FFFFFF"], 180), 2, 2, "Branca 180", ink)
    place(resize_width(masters["Color_Institucional"], 180), 3, 2, "Color 180", paper)

    out = QA_DIR / "LOCKUP_VERTICAL_QA_BOARD.png"
    board.save(out, format="PNG", optimize=True)
    print("QA board:", out)


def resolve_variants(requested: list[str] | None) -> list[dict]:
    if not requested:
        return list(VARIANTS)
    unknown = [k for k in requested if k not in ALLOWED_VARIANT_KEYS]
    if unknown:
        allowed = ", ".join(ALLOWED_VARIANT_KEYS)
        raise SystemExit(
            f"Variante(s) nao autorizada(s): {', '.join(unknown)}. "
            f"Allowlist fechada: {allowed}. Nao gerar novas cores sem decisao humana."
        )
    by_key = {v["key"]: v for v in VARIANTS}
    return [by_key[k] for k in requested]


def main(argv: list[str] | None = None) -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Generate PCA Lockup Vertical (3 authorized variants only).")
    parser.add_argument(
        "--only",
        nargs="+",
        metavar="KEY",
        help=f"Subset of allowlist: {', '.join(ALLOWED_VARIANT_KEYS)}",
    )
    args = parser.parse_args(argv)
    selected = resolve_variants(args.only)

    if not FONT_REG.is_file() or not FONT_BOLD.is_file():
        raise SystemExit("Palatino Linotype (pala.ttf / palab.ttf) required on the build machine")

    primary = load_primary()
    report = geometry_report(primary)
    print(json.dumps(report, indent=2))

    # Compose at PRIMARY native pixel size (no prior downscale of source)
    crest_side = primary.size[0]
    metrics = layout_metrics(crest_side)

    # Preserve previous lockup for QA board before overwrite
    old_path = LOGO_DIR / "LOGO_PCA_Lockup_Vertical_Mono_1C.png"
    old_lockup = Image.open(old_path).convert("RGBA") if old_path.is_file() else None
    if old_lockup:
        QA_DIR.mkdir(parents=True, exist_ok=True)
        old_lockup.save(QA_DIR / "LOCKUP_VERTICAL_PREVIOUS_Mono_1C.png")

    masters: dict[str, Image.Image] = {}
    typo_ref: dict | None = None
    fidelity: dict = {}

    for v in selected:
        crest_path = LOGO_DIR / v["crest"]
        crest_bytes = crest_path.read_bytes()
        crest = Image.open(io.BytesIO(crest_bytes)).convert("RGBA")
        if crest.size != primary.size:
            raise SystemExit(f"{crest_path.name} size {crest.size} != primary {primary.size}")

        canvas, typo = compose_raster(crest, v["text"], metrics)
        if typo_ref is None:
            typo_ref = typo
        else:
            # Shared geometry: canvas and crest box must match
            assert typo["canvas"] == typo_ref["canvas"]
            assert typo["crest_box"] == typo_ref["crest_box"]
            assert typo["font1_px"] == typo_ref["font1_px"]
            assert typo["font2_px"] == typo_ref["font2_px"]

        base = LOGO_DIR / f"LOGO_PCA_Lockup_Vertical_{v['key']}"
        save_raster(canvas, base)
        write_hybrid_svg(base.with_suffix(".svg"), crest_bytes, typo, v["text_hex"], base.name)

        for w in OUT_SIZES:
            scaled = resize_width(canvas, w)
            save_raster(scaled, LOGO_DIR / f"{base.name}_{w}")

        masters[v["key"]] = canvas
        print(f"OK {v['key']} {canvas.size} from {v['crest']} ({v['source_note']})")

        # Remove stale _800 ladder if present
        for ext in (".png", ".webp"):
            stale = LOGO_DIR / f"{base.name}_800{ext}"
            if stale.exists():
                stale.unlink()
                print(" removed stale", stale.name)

    assert typo_ref is not None
    fidelity = crest_region_mse(masters["Mono_1C"], primary, typo_ref)
    print("FIDELITY", json.dumps(fidelity, indent=2))

    meta = {
        "primary_webp": PRIMARY_WEBP.name,
        "primary_blob_local_note": "confirm with git hash-object separately",
        "allowed_variants": list(ALLOWED_VARIANT_KEYS),
        "generated_variants": [v["key"] for v in selected],
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
        "note": "Color_Institucional_Reverso removed by human decision; no new colors without gate",
    }
    QA_DIR.mkdir(parents=True, exist_ok=True)
    (QA_DIR / "lockup_vertical_build_report.json").write_text(
        json.dumps(meta, indent=2), encoding="utf-8"
    )
    if set(masters) == set(ALLOWED_VARIANT_KEYS):
        build_qa_board(masters, old_lockup, typo_ref)
    else:
        print("QA board skipped (partial --only run)")

    w, h = typo_ref["canvas"]
    print(f"CANONICAL_GEOMETRY {w}x{h} aspect={w}/{h} = {w/h:.6f}")
    print(f"VARIANTS {list(ALLOWED_VARIANT_KEYS)}")
    for tw in (180, 400, 128):
        th = int(round(h * (tw / w)))
        print(f"  @{tw} -> {tw}x{th}")


if __name__ == "__main__":
    main()
