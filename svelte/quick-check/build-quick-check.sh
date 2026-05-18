#! /bin/bash
set -e

# run this script from its directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# build production assets
npm ci --registry=https://registry.npmjs.org/
npm run build

# Set-up the target directory
TARGET_DIR="../../hugo/content/quickcheck"
mkdir -p "$TARGET_DIR"

# copy assets to the experimental quickcheck folder
# use -f to overwrite and ensure it fails if files are missing
cp -f dist/assets/index.js "$TARGET_DIR/quickcheck.js"
cp -f dist/assets/index.css "$TARGET_DIR/quickcheck.css"
