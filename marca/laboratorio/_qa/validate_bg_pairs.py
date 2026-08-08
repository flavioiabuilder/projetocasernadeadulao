"""One-shot QA for transparent vs white logo pairs."""
from __future__ import annotations

import re
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[3]
LOGO = ROOT / "assets" / "img" / "logo-pca"
CONFIGS = (
    "Master",
    "Lockup_Vertical",
    "Lockup_Horizontal",
    "Wordmark_Stacked",
    "Wordmark_Horizontal",
)


def main() -> None:
    all_files = sorted(p.name for p in LOGO.iterdir() if p.is_file())
    white = [n for n in all_files if "BG_White_FFFFFF" in n]
    forbidden = [
        n
        for n in all_files
        if any(x in n for x in ("Branca_FFFFFF", "Color_Institucional", "Reverso", "_BG_Transparent"))
    ]
    print("total_files", len(all_files))
    print("white_files", len(white))
    print("forbidden_names", forbidden)

    for name in (
        "LOGO_PCA_Master_Mono_1C.webp",
        "LOGO_PCA_Master_Mono_1C_BG_White_FFFFFF.webp",
        "LOGO_PCA_Lockup_Vertical_Mono_1C.webp",
        "LOGO_PCA_Lockup_Vertical_Mono_1C_BG_White_FFFFFF.webp",
        "LOGO_PCA_Lockup_Vertical_Mono_1C_BG_White_FFFFFF_180.webp",
    ):
        im = Image.open(LOGO / name).convert("RGBA")
        a = np.asarray(im)[..., 3]
        print(name, im.size, "amin", int(a.min()), "amax", int(a.max()))

    for p in LOGO.glob("*.svg"):
        if "Wordmark" not in p.name and "Lockup" not in p.name:
            continue
        t = p.read_text(encoding="utf-8")
        path_fills = set(re.findall(r'<path fill="(#[0-9A-Fa-f]{6})"', t))
        bad_palette = [c for c in ("#0E1216", "#F3EEE6", "#8B6F47") if c.lower() in t.lower()]
        if path_fills - {"#000000"}:
            raise SystemExit(f"BAD PATH FILLS {p.name}: {path_fills}")
        if bad_palette:
            raise SystemExit(f"BAD COLORS {p.name}: {bad_palette}")
    print("svg_wordmark_fills_ok")

    for c in CONFIGS:
        # Master canônico = WebP; demais configs: PNG do mesmo build (sem round-trip lossy).
        t_name = f"LOGO_PCA_{c}_Mono_1C.webp" if c == "Master" else f"LOGO_PCA_{c}_Mono_1C.png"
        t = Image.open(LOGO / t_name).convert("RGBA")
        w_png = Image.open(LOGO / f"LOGO_PCA_{c}_Mono_1C_BG_White_FFFFFF.png").convert("RGBA")
        w_webp = Image.open(LOGO / f"LOGO_PCA_{c}_Mono_1C_BG_White_FFFFFF.webp").convert("RGBA")
        assert t.size == w_png.size == w_webp.size, (c, t.size, w_png.size, w_webp.size)
        composed = Image.alpha_composite(Image.new("RGBA", t.size, (255, 255, 255, 255)), t)
        mae_png = float(
            np.abs(np.asarray(composed).astype(float) - np.asarray(w_png).astype(float)).mean()
        )
        mae_webp = float(
            np.abs(np.asarray(composed).astype(float) - np.asarray(w_webp).astype(float)).mean()
        )
        opaque = int(np.asarray(w_png)[..., 3].min()) == 255
        print(
            c,
            "src",
            t_name,
            "size",
            t.size,
            "mae_png",
            mae_png,
            "mae_webp",
            mae_webp,
            "opaque",
            opaque,
        )
        if mae_png != 0.0 or mae_webp != 0.0 or not opaque:
            raise SystemExit(f"FAIL {c}")
    print("ALL_PAIRS_PASS")


if __name__ == "__main__":
    main()
