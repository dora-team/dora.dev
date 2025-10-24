#! /bin/bash

# run this script from the project root
cd svelte/experimental-ai-model

# build production artifacts
npm install
npm run build

# copy assets to the quickcheck content folder
cp dist/assets/index-*.js ../../hugo/content/experimental/ai-model/ai-model.js
cp dist/assets/index-*.css ../../hugo/content/experimental/ai-model/ai-model.css