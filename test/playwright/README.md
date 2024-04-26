This folder contains tests for use with [Playwright](https://playwright.dev).

### To run locally:
* Start a local dev server (see /docs/README.md)
* from this folder, run `npx playwright test`
    * _By default, tests run against server `http://localhost:1313`. To run against a different server. set the `PLAYWRIGHT_BASE_URL` environment variable.
        * Example: `PLAYWRIGHT_BASE_URL=https://dora.dev/ npx playwright test`

### In CI:
The Cloud Build pipeline `/ci/preview-content.cloudbuild.yaml` includes a step that runs playwright tests.