#! /bin/bash

# run this script from the project root
cd svelte/quick-check-2023

# build production assets
npm install
npm run build

# copy assets to the quickcheck content folder
cp dist/assets/index-*.js ../../hugo/content/quickcheck/2023/quickcheck.js
cp dist/assets/index-*.css ../../hugo/content/quickcheck/2023/quickcheck.css