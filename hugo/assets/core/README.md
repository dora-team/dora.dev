### Changelog of Core Model content

- **v1.2.2** (2023-10-27) Fix ID of "well-being" entity (to restore link with Capability article)
- **v1.2.1** (2023-10-16) Fix background of legend (make transparent)
- **v1.2.0** (2023-10-13) Change spelling of "wellbeing" to "well-being" to align with preferred format as specified by doc writer advisors.
- **v1.1.0** (2023-08-07) Added connector between Continuous Delivery and Generative Organizational Culture, and moved those elements closer to facilitate the connection. This connection is motivated by findings across several years of study. It lacks directional arrowheads because there is ongoing research to understand the predictive pathway between these constructs.
- **v1.0.0** (2023-07-19) Initial version proposed for GA


### Ongoing dev process

1. Using Figma, export the Core diagram as SVG, to `dora-core-model-v<version>.svg`, e.g. `dora-core-model-v1.1.0.svg`
  * the resulting file will look pretty, but will be lacking key features, including usable `class` and `id` attributes.
1. Run the script: `process-figma-export-to-interactive-core-svg.sh`, which will copy the exported file to `dora-core-model.svg` and perform some text manipulations
1. Implement interactivity by editing the javascript in the template file
1. Also, export PDF and PNG versions and adjust references to them in the template if needed
