#! /bin/bash

# run this script from the project root
cd svelte/core-v2

# build production artifacts
npm install
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/research/core/assets/"
mkdir -p "$TARGET_DIR"

# copy artifacts to a location from which they're statically served
cp dist/assets/* $TARGET_DIR

