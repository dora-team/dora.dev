# dora.dev

This repository contains the source code for DORA's public-facing knowledge website: [dora.dev](https://dora.dev).

The site is built using a hybrid architecture:
1. **Static site generator**: [Hugo](https://gohugo.io) compiles the content and layouts (located under `/hugo`).
2. **Interactive tools**: Built as [Svelte](https://svelte.dev) applications (under `/svelte`) and embedded as compiled assets within the Hugo pages.
3. **Hosting and routing**: Powered by [Firebase](https://firebase.google.com/), which handles URL redirects, hosting, and PR-specific preview environments.

---

## 📖 Documentation directory

- **[Developer onboarding guide](docs/developer-onboarding-guide.md)**: Workspace setup, prerequisites, Jujutsu (`jj`)/Git workflows, and building individual Svelte applications.
- **[Local development & preview guide](docs/README.md)**: Running the local Hugo server, using Firebase emulation, and troubleshooting.
- **[Content publishing guide](docs/publishing-content.md)**: How to create new capability articles, manage front matter, and publish drafts.
- **[Testing guide](test/playwright/README.md)**: Setting up and running Playwright browser automation tests.

---

## 📂 Project layout

- `hugo/`: Main website static files, themes, templates, and markdown content.
  - `content/`: Markdown articles and documentation pages.
  - `layouts/`: Hugo templates.
  - `static/`: Static assets (images, logos, stylesheets).
- `svelte/`: Source code for interactive applications (e.g., ROI Calculator, DORA Core Model, Quick Check).
- `test/`: Automated test suites (Playwright browser tests, redirect checks).
- `docs/`: Technical documents and guide files.

---

## 🛡️ Community and conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

To connect with other contributors and users, join the [DORA Community](https://dora.community).

---

## ⚖️ Licensing

This repository contains a mix of software code and documentation assets, licensed as follows:

* All source code files are licensed under the **[Apache License 2.0](LICENSE)**.
* All documentation, media, and design assets are licensed under the **[Creative Commons Attribution 4.0 International License (CC-BY-4.0)](CC-BY-4.0)**.