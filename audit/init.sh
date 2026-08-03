#!/usr/bin/env bash
# Harness Korowa — entrypoint
# Uso: ./audit/init.sh probe styles | frames | aggregate | report | gates
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
exec node "$ROOT/cli.js" "$@"
