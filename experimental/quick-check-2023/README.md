This folder contains the new Quick Check implementation (reflecting 2023 data). It's a Single Page Application (SPA), using the [svelte](svelte.dev) framework. It's built outside the flow of the main Hugo site implementation, and then embedded as a static asset into the site content.

### To develop the quick check only:

0. (prerequisites: node and npm)
1. from this folder, run `npm install`
2. run `npm run dev`
3. preview the site per instructions in the terminal

### To preview the quick check within Hugo (recommended before committing):

1. develop quick check per above
2. from the repo root, run `experimental/quick-check-2023/build-quick-check.sh`
  * _This will build the quick check SPA application and place the generated files into the appropriate place inside /hugo/content_
3. from the repo root, run `hugo serve -s hugo`
4. preview the site per instructions in the terminal