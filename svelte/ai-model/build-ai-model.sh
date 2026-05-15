#! /bin/bash
set -euo pipefail

# Dependencies should be installed at the workspace root before running this script

# run this script from this directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# build production artifacts
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/ai/capabilities-model"
mkdir -p "$TARGET_DIR"

# copy assets to the quickcheck content folder
mkdir -p $TARGET_DIR/interactive
cp dist/assets/index-*.js $TARGET_DIR/model.js
cp dist/assets/index-*.css $TARGET_DIR/model.css
