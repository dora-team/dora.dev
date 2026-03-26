#! /bin/bash

# run this script from the project root
cd svelte/roi-calculator

# build production assets
npm ci --registry=https://registry.npmjs.org/
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/ai/roi/calculator"
mkdir -p "$TARGET_DIR"

# copy assets to the roi-calculator content folder
cp dist/assets/index-*.js $TARGET_DIR/roi-calculator.js
cp dist/assets/index-*.css $TARGET_DIR/roi-calculator.css

