This folder contains the Quick Check implementation. It's a Single Page Application (SPA), using the [svelte](svelte.dev) framework. It's built outside the flow of the main Hugo site implementation, and then embedded at build time as a static asset into the site content (see `/ci` for build config).

### To develop the quick check only:

0. (prerequisites: node and npm)
1. from this folder, run `npm install`
2. run `npm run dev`
3. preview the site per instructions in the terminal

### To preview the quick check within Hugo (recommended before committing):

1. develop quick check per above
2. from the repo root, run `svelte/quick-check/build-quick-check.sh`
  * _This will build the quick check SPA application and place the generated files into the appropriate place inside /hugo/content_
3. from the repo root, run `hugo serve -s hugo`
4. preview the site per instructions in the terminal

## Temporary features

These features are temporary and should be removed or refactored by the daate specified.

### Comparison by industry size

Some organizations are more interested in comparing their software delivery performance to other organizations of the same size. The Quick Check now allows for comparing a team's performance with organizations from the same industry or of the same size. Industry size comparisons are "hidden" behind a feature flag. Enable these comparisons by adding `comp=size` to the query string of the Quick Check. Data is stored in `src/lib/data/organization_size_metrics.json`.

* Introduced: 2025-03-25
* Remove or refactor by: 2025-10-01