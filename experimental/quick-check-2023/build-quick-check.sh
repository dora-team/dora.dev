#! /bin/bash

# run this script from the project root

# build production assets
npm --prefix ./experimental/quick-check-2023 install
npm --prefix ./experimental/quick-check-2023/ run build

# copy assets to the quickcheck content folder
cp ./experimental/quick-check-2023/dist/assets/index-*.js ./hugo/content/quickcheck/2023/quickcheck.js
cp ./experimental/quick-check-2023/dist/assets/index-*.css ./hugo/content/quickcheck/2023/quickcheck.css