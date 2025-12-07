#! /bin/bash

# run this script from the project root
cd svelte/ai-model

# build production artifacts
npm install
npm run build

# copy assets to the quickcheck content folder
mkdir -p ../../hugo/content/ai/capabilities-model/interactive
cp dist/assets/index-*.js ../../hugo/content/ai/capabilities-model/model.js
cp dist/assets/index-*.css ../../hugo/content/ai/capabilities-model/model.css