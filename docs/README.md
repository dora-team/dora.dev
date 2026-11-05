> For first-time setup (prerequisites, building the Svelte tools, running tests), start with the [developer onboarding guide](developer-onboarding-guide.md).

## Hugo
The following development with Hugo will be sufficient for most of the DORA.dev website development efforts.
To build and preview the site locally, you'll need [hugo](https://gohugo.io/) **extended** (recommended version, matching CI: [v0.163.2](https://github.com/gohugoio/hugo/releases/tag/v0.163.2)).

- The recommended command to start the local hugo server (from the repository root) is `hugo server -s hugo -D --disableFastRender --logLevel debug`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.
- Interactive tools (Quick Check, Core Model, AI Capabilities Model, ROI Calculator) are Svelte apps. Run `./svelte/build.sh` from the repository root to build them and copy their assets into `hugo/content/`.

## CI/CD
See [`/.github/workflows/README.md`](../.github/workflows/README.md).

## Hosting
The production site (and PR preview channels) are hosted in Firebase. Some hosting features (most notably, redirects) are provided by Firebase, and will not be available when the site is served locally by Hugo alone.

### Firebase Hosting emulation
Firebase Hosting can be run locally through the Firebase emulator. This requires the [Firebase CLI](https://firebase.google.com/docs/cli) and two terminal windows.

To emulate Firebase Hosting (to see features like server-side redirects):
  - in terminal 1, run `hugo build -s hugo -D --watch`
    - _this will continuously rebuild the site into `hugo/public/` (which is the Firebase hosting serving root, per `firebase.json`)_
  - in terminal 2, run `firebase emulators:start --only hosting`
  - access the site at the URL printed by the emulator (it defaults to port 5000, but on macOS that port is often taken by the AirPlay Receiver, so it may pick another, such as `5002`)
    - _in this configuration, the browser will not auto-reload when source files are changed_
