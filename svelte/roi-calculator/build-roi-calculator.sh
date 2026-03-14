#! /bin/bash

# run this script from the project root
cd svelte/roi-calculator

# build production assets
npm ci --registry=https://registry.npmjs.org/
npm run build

# ensure target directory exists
mkdir -p ../../hugo/content/experimental/roi-calculator

# copy assets to the roi-calculator content folder
cp dist/assets/index-*.js ../../hugo/content/experimental/roi-calculator/roi-calculator.js
cp dist/assets/index-*.css ../../hugo/content/experimental/roi-calculator/roi-calculator.css
