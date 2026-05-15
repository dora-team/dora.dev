#! /bin/bash
set -e

# run this script from its parent directory (svelte)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"/..

# Install dependencies at the workspace root
npm ci --registry=https://registry.npmjs.org/

# build production artifacts
cd ai-model
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/ai/capabilities-model"
mkdir -p "$TARGET_DIR"

# copy assets to the quickcheck content folder
mkdir -p $TARGET_DIR/interactive
cp dist/assets/index-*.js $TARGET_DIR/model.js
cp dist/assets/index-*.css $TARGET_DIR/model.css

