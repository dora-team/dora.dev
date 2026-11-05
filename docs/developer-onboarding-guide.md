# Getting started: developer onboarding guide

Welcome to the dora.dev codebase! This guide takes you from a fresh clone to a running local copy of the site, and explains the day-to-day workflow for content and code changes.

## 1. Understanding the project

dora.dev is DORA's public-facing knowledge site. It shares research findings, capabilities, guides, and interactive tools related to software delivery and operations performance.

### Technology stack

| Layer | Technology | Where it lives |
| --- | --- | --- |
| Static site generator | [Hugo](https://gohugo.io) (extended edition) | `hugo/` |
| Interactive tools | [Svelte 5](https://svelte.dev) single-page apps built with [Vite](https://vite.dev), managed as an [npm workspace](adrs/011-use-npm-workspaces-for-svelte-apps.md) | `svelte/` |
| Styling | Sass (compiled by Hugo's `toCSS`, which requires Hugo extended) | `hugo/themes/dora-2025/assets/scss/` |
| Hosting and redirects | [Firebase Hosting](https://firebase.google.com/docs/hosting) | `firebase.json`, `.firebaserc` |
| CI/CD | GitHub Actions | `.github/workflows/` |
| Tests | [Playwright](https://playwright.dev) end-to-end tests, Mocha redirect tests, Vitest unit tests | `test/`, `svelte/*/` |
| Planning | [Conductor](https://github.com/google/conductor) spec-driven development tracks | `conductor/` |

### How the pieces fit together

```text
svelte/<app>/  --(vite build + copy script)-->  hugo/content/<page>/*.js, *.css
hugo/          --(hugo build)---------------->  hugo/public/   (static site)
hugo/public/   --(firebase hosting)---------->  dora.dev       (adds redirects)
```

Each Svelte app compiles to a JavaScript and CSS bundle. A build script copies that bundle into the Hugo content folder of the page that embeds it. Hugo then renders the whole site into `hugo/public/`, which Firebase serves.

## 2. Prerequisites

| Tool | Version | Required? | Notes |
| --- | --- | --- | --- |
| Git or [Jujutsu (jj)](https://jj-vcs.github.io/jj/) | any recent | Yes | Either works for version control. |
| [Hugo **extended**](https://gohugo.io/installation/) | **0.163.2** (the version CI uses). The theme's minimum is 0.147.9+extended. | Yes | The standard (non-extended) edition can't compile the site's SCSS. |
| [Node.js](https://nodejs.org/) and npm | **22.x** | Yes, for the Svelte tools and tests | CI pins Node 22 because Node 24 caused build issues ([#1431](https://github.com/dora-team/dora.dev/pull/1431)). |
| [Firebase CLI](https://firebase.google.com/docs/cli) | latest | Optional | Only needed to test Firebase-provided features (for example, redirects) locally. |
| [Conductor extension](https://marketplace.visualstudio.com/items?itemName=Googlecloud.conductor) | latest | Recommended | Streamlines the spec-driven workflow. |

### Installing on macOS (Homebrew)

```bash
brew install hugo          # Homebrew's hugo formula is the extended edition
brew install node@22       # or use a version manager such as nvm or fnm
npm install -g firebase-tools   # optional
```

Homebrew installs the latest Hugo release, which may be newer than the one CI uses. If you hit rendering differences, download the exact [v0.163.2 release](https://github.com/gohugoio/hugo/releases/tag/v0.163.2) (pick a `hugo_extended_*` asset).

Check your setup:

```bash
hugo version    # must contain "+extended"
node --version  # should be v22.x
```

## 3. Running the site locally

All commands below run from the **repository root**.

### Step 1: Clone

```bash
git clone https://github.com/dora-team/dora.dev.git
cd dora.dev
```

### Step 2: Build the Svelte tools (recommended)

```bash
./svelte/build.sh
```

This installs the npm workspace dependencies once (`npm ci` in `svelte/`), then builds all four apps in parallel and copies their bundles into Hugo:

| App | Source | Bundle copied to | Page that embeds it |
| --- | --- | --- | --- |
| Quick Check | `svelte/quick-check` | `hugo/content/quickcheck/` | `/quickcheck/` |
| DORA Core Model | `svelte/core-v2` | `hugo/content/research/core/assets/` | `/research/` |
| AI Capabilities Model | `svelte/ai-model` | `hugo/content/ai/capabilities-model/` | `/ai/capabilities-model/` |
| AI ROI Calculator | `svelte/roi-calculator` | `hugo/content/ai/roi/calculator/` | `/ai/roi/calculator/` |

Most bundles are git-ignored. The ROI calculator bundle (`roi-calculator.js` / `.css`) is committed, so a rebuild may show it as modified. Only commit that change if you meant to change the calculator.

You can skip this step if you only work on Markdown content. Hugo still renders the site, but the pages that embed these tools won't show them.

### Step 3: Start the Hugo development server

```bash
hugo server -s hugo -D --disableFastRender --logLevel debug
```

- Open <http://localhost:1313>. Pages reload live when you save a file.
- `-D` includes draft content. Leave it out to see the site as production renders it.
- `-s hugo` points Hugo at the `hugo/` source folder.

### Step 4 (optional): Preview with Firebase Hosting emulation

The Hugo server doesn't apply Firebase features such as the redirects in `firebase.json`. To test those, serve the built site through the Firebase emulator. This needs two terminals:

```bash
# Terminal 1: rebuild into hugo/public/ whenever files change
hugo build -s hugo -D --watch

# Terminal 2: serve hugo/public/ with Firebase Hosting rules applied
firebase emulators:start --only hosting
```

The emulator prints its local URL, for example `hosting[prod]: Local server: http://127.0.0.1:5002`. It defaults to port 5000, but on macOS that port is often held by the AirPlay Receiver, so the emulator picks another one. Use the URL it prints. The browser doesn't auto-reload in this mode.

## 4. Running tests

| Suite | Location | Command | Notes |
| --- | --- | --- | --- |
| Svelte unit tests | `svelte/quick-check`, `svelte/roi-calculator` | From `svelte/`: `npm test --workspace=quick-check` and `npm test --workspace=roi-calculator -- --run` | Install first with `./svelte/build.sh` or `npm ci` in `svelte/`. The ROI calculator's `test` script starts Vitest in watch mode, so `-- --run` makes it run once and exit. |
| Svelte type checks | `svelte/quick-check`, `svelte/ai-model` | From `svelte/`: `npm run check --workspace=quick-check` | CI doesn't run type checks. At the time of writing, `quick-check` reports 3 existing type errors. |
| End-to-end (Playwright) | `test/playwright` | `npm install && npx playwright install chromium`, then `npx playwright test` | Expects the Hugo server on `localhost:1313`. Set `PLAYWRIGHT_BASE_URL` to test a different server. The full suite (about 600 tests) takes about 1–2 minutes. Run `npx playwright show-report` to view the HTML report. See [test/playwright/README.md](../test/playwright/README.md). |
| Redirects | `test/redirects` | `npm ci`, then `BASE_URL=<emulator URL> npx mocha test-redirects.js` | Needs the Firebase emulator (step 4). The Hugo server doesn't serve redirects. |

To match CI, run Playwright against a drafts-on build (`-D`), because that's the build CI tests.

The search tests (`tests/search/`) query the live search service at `search.dora.dev` even when the site runs locally. They need internet access and can fail intermittently. Before you look for a local cause, rerun them with `npx playwright test tests/search/`.

## 5. Project structure

- `hugo/`: The Hugo site.
  - `config.toml`: Site configuration.
  - `content/`: Markdown content, organized by section (capabilities, research, guides, ai, and more). See [publishing-content.md](publishing-content.md).
  - `data/`: Data files used by templates.
  - `static/`: Static files served as-is (images, favicons, robots.txt).
  - `themes/dora-2025/`: The active theme (layouts, SCSS, JavaScript).
- `svelte/`: npm workspace holding the interactive Svelte apps (`ai-model`, `core-v2`, `quick-check`, `roi-calculator`) and `build.sh`.
- `test/`: Playwright end-to-end tests and redirect tests.
- `docs/`: Developer documentation and [architecture decision records](adrs/README.md).
- `conductor/`: Conductor product context, workflow, and tracks.
- `.github/workflows/`: CI/CD pipelines. See [.github/workflows/README.md](../.github/workflows/README.md).
- `firebase.json`: Firebase Hosting configuration, including the site's redirects.
- `scripts/`: Helper scripts, such as `create_content.sh`.

## 6. Workflow

This project follows the **Conductor** spec-driven development method. Major features and audits are tracked as "tracks" in `conductor/` (see [conductor/workflow.md](../conductor/workflow.md)).

1. Pick or create a Conductor track for your task.
2. Create a branch (Git) or a new change (`jj new`).
3. Make your changes and preview them locally (see section 3).
4. Open a pull request against `main`.
5. CI builds the site and deploys two Firebase preview channels: one with drafts and one without. A PR comment links to both. CI then runs the Playwright and redirect tests against the drafts-on preview.
6. After review and merge, `deploy.yml` publishes to production. It also runs daily at 07:00 UTC to pick up scheduled content.

### Content changes

Edit or add Markdown under `hugo/content/`, preview it with the Hugo server, and open a PR. See [publishing-content.md](publishing-content.md) for front matter, drafts, and new capability articles.

### Svelte app changes

For a fast feedback loop, run an app's own Vite dev server:

```bash
cd svelte
npm ci                                   # first time only
npm run dev --workspace=quick-check      # or core-v2, ai-model, roi-calculator
```

To see the app inside the site, rebuild the bundle and keep the Hugo server running:

```bash
./svelte/quick-check/build-quick-check.sh   # or the matching build-*.sh for your app
```

## 7. Troubleshooting

- **`TOCSS: failed to transform` or SCSS errors**: You're running standard Hugo. Install the extended edition.
- **An interactive tool is missing on its page**: Run `./svelte/build.sh` (or that app's `build-*.sh`), then reload.
- **A redirect doesn't work locally**: Redirects only work through Firebase. Use the emulator (step 4).
- **Svelte build errors on a newer Node.js**: Switch to Node 22.
- **`WARN deprecated: css.Sass: libsass was deprecated`**: Expected with Hugo 0.153.0 and later. The site still builds. It's a reminder that the theme should eventually move to Dart Sass.
- **Svelte `a11y_*` warnings during `./svelte/build.sh`**: These are accessibility warnings from the Svelte compiler. They don't fail the build.
- **Firebase emulator isn't on port 5000**: See step 4. Use the URL the emulator prints.
- **Rebuild everything from scratch**: Delete `hugo/public/` and `hugo/resources/_gen/` (both are git-ignored), then rebuild.

## 8. Contribution guidelines

- Follow the [Contributor Covenant Code of Conduct](../CODE_OF_CONDUCT.md).
- Write clear, concise commit messages.
- Open one pull request per change and describe its purpose and impact.
- We welcome your contributions!

## 9. Getting help

- [DORA Community](https://dora.community): Discussions, questions, and knowledge sharing.
- [GitHub Issues](https://github.com/dora-team/dora.dev/issues): Bug reports and improvement suggestions.
