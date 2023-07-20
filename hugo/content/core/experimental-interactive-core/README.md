This folder contains an experimental/wip effort to make an interactive version of the DORA Core Model -- it's intended to replace the "spider diagram" on `/research` ... see https://github.com/dora-team/dora.dev/discussions/265

### Ongoing dev process (speculative/experimental)

1. Using Figma, export the Core diagram as SVG, to `dora-core-model-EXPORT.svg`
  * the resulting file will look pretty, but will be lacking key features, including usable `class` and `id` attributes.
1. Run the script: `process-figma-export-to-interactive-core-svg.sh`, which will copy the exported file to `dora-core-model.svg` and perform some text manipulations
1. Implement interactivity by editing the javascript in `_index.md`