### Hugo
To build and preview the site locally, you'll need [hugo](gohugo.io). The recommended command to start the local hugo server is `hugo serve -s hugo --disableFastRender --debug --watch`. The site can then be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.