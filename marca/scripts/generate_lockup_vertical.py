"""Compatibility entrypoint — delegates to generate_logo_system.py.

Prefer:
  python marca/scripts/generate_logo_system.py
  python marca/scripts/generate_logo_system.py --config Lockup_Vertical
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_logo_system import main  # noqa: E402


if __name__ == "__main__":
    argv = list(sys.argv[1:])
    if "--only" in argv:
        i = argv.index("--only")
        keys = []
        j = i + 1
        while j < len(argv) and not argv[j].startswith("-"):
            keys.append(argv[j])
            j += 1
        if keys != ["Mono_1C"]:
            raise SystemExit(
                "Variante(s) nao autorizada(s). Somente Mono_1C esta autorizada "
                "(use generate_logo_system.py --config …)."
            )
        argv = argv[:i] + argv[j:] + ["--config", "Lockup_Vertical"]
    elif "--config" not in argv:
        argv = ["--config", "Lockup_Vertical"]
    main(argv)
