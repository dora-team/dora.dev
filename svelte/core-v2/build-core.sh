#! /bin/bash

# run this script from the project root
cd svelte/core-v2

# build production artifacts
npm install
npm run build

# copy artifacts to a location from which they're statically served
mkdir -p ../../hugo/content/research/core/assets/
cp dist/assets/* ../../hugo/content/research/core/assets/