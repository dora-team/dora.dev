#! /bin/bash

# build production assets
# npm run build;

# copy assets to the quickcheck content folder
cp dist/assets/index-*.js ../../hugo/content/quickcheck/2023/quickcheck.js
cp dist/assets/index-*.css ../../hugo/content/quickcheck/2023/quickcheck.css