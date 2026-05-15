#! /bin/bash
set -euo pipefail

# Dependencies should be installed at the workspace root before running this script

# run this script from this directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# build production artifacts
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/research/core/assets/"
mkdir -p "$TARGET_DIR"

# copy artifacts to a location from which they're statically served
cp dist/assets/* $TARGET_DIR
