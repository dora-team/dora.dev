---
status: accepted
date: 2026-05-15
deciders: nathenharvey, davidstanke
---
# Use NPM workspaces for svelte applications

## Context and problem statement

The `svelte` directory currently contains several independent Svelte applications (e.g., `ai-model`, `core-v2`, `quick-check-2025`, `roi-calculator`). Each has its own `package.json` and `package-lock.json`, meaning dependencies are updated individually. This makes upgrading Svelte and related shared tools tedious, increases disk space usage with duplicate dependencies, and can lead to version-mismatch bugs across applications.

## Considered options

* **Independent packages:** Continue managing each application independently with its own `package.json` and `package-lock.json` files.
* **NPM workspaces:** Converge these applications into a shared NPM workspace to consolidate dependencies.

## Decision outcome

Chosen option: **NPM workspaces**, because:

* **Single source of truth:** Upgrading Svelte, Vite, or other shared tooling requires changing exactly one file (`svelte/package.json`), automatically applying to all apps.
* **Improved maintenance:** Eliminates the overhead of managing multiple `package-lock.json` files and repeating dependency updates.
* **Faster installs / less disk space:** Dependencies are installed once at the root, saving significant disk space and CI installation time.
* **Consistent tooling:** Ensures all apps are built using the same version of compilers and plugins, reducing "works on my machine" or version-mismatch bugs.

### Consequences

* Good, because it simplifies dependency management across all Svelte single-page applications.
* Good, because it speeds up CI/CD pipeline installation time by deduplicating library fetches.
* Bad, because an upgrade to a shared dependency (like a future major Svelte release) typically means all applications must be updated and tested simultaneously to handle any breaking changes.
* Bad, because CI/CD pipelines and local build scripts (`build-<app>.sh`) need a slight adjustment to run `npm install` from the root of the workspace rather than the individual app directories.

## Validation

The migration will be validated through a phased rollout:

1. **Workspace initialization:** Incrementally adding one app at a time to the workspace array, verifying it with `npm install` at the root and its respective build script.
2. **Tooling & core consolidation:** Gradually hoisting shared dev tools (like Vite, SASS) and then core frameworks (Svelte) to the root `package.json`.

As part of this migration, we will remove the `quick-check-2024` app, which is a legacy version of the quick-check app.

After each phase and app migration, validation is performed by running the specific app's build script and executing the Playwright E2E tests for that application to ensure it still functions correctly.
