#! /bin/bash
set -euo pipefail

# Dependencies should be installed at the workspace root before running this script

# run this script from this directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# build production assets
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/ai/roi/calculator"
mkdir -p "$TARGET_DIR"

# copy assets to the roi-calculator content folder
cp dist/assets/index-*.js $TARGET_DIR/roi-calculator.js
cp dist/assets/index-*.css $TARGET_DIR/roi-calculator.css
