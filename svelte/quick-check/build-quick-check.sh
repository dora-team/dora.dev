#! /bin/bash

# run this script from the project root
cd svelte/quick-check

# build production assets
npm install
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/quickcheck"
mkdir -p "$TARGET_DIR"

# copy assets to the quickcheck content folder
cp dist/assets/index-*.js $TARGET_DIR/quickcheck.js
cp dist/assets/index-*.css $TARGET_DIR/quickcheck.css

