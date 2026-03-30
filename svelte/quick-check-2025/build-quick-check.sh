#! /bin/bash

# run this script from its directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# build production assets
npm install
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/experimental/quick-check"
mkdir -p "$TARGET_DIR"

# copy assets to the experimental quickcheck folder
cp dist/assets/index.js "$TARGET_DIR/quickcheck-2025.js"
cp dist/assets/index.css "$TARGET_DIR/quickcheck-2025.css"
