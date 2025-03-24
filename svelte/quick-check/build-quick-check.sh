#! /bin/bash

# run this script from the project root
cd svelte/quick-check

# build production assets
npm install
npm run build

# copy assets to the quickcheck content folder
cp dist/assets/index-*.js ../../hugo/content/quickcheck/quickcheck.js
cp dist/assets/index-*.css ../../hugo/content/quickcheck/quickcheck.css