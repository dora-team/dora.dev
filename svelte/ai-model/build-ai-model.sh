#! /bin/bash

# run this script from the project root
cd svelte/ai-model

# build production artifacts
npm install
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/ai/capabilities-model"
mkdir -p "$TARGET_DIR"

# copy assets to the quickcheck content folder
mkdir -p $TARGET_DIR/interactive
cp dist/assets/index-*.js $TARGET_DIR/model.js
cp dist/assets/index-*.css $TARGET_DIR/model.css

