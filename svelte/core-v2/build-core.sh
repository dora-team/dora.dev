#! /bin/bash

# run this script from the project root
cd svelte/core-v2

# build production artifacts
npm install
npm run build

# copy artifacts to a location from which they're statically served
cp dist/assets/index-*.js ../../hugo/static/core/core-v2.js
cp dist/assets/index-*.css ../../hugo/static/core/core-v2.css