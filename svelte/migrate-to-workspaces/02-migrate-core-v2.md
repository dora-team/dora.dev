# Walkthrough:migrating core v2

We are progressively migrating our independent Svelte applications into a centralized NPM Workspace structure. Here is the next step we've taken:

## 2. Migrating `core-v2`
- **Workspace Update**: Appended `"core-v2"` to the `workspaces` array in `svelte/package.json`.
- **App Cleanup**: Removed the standalone `package-lock.json` and `node_modules` from `svelte/core-v2/`.
- **Lockfile Generation**: Re-ran `npm install` at the `svelte/` root to absorb `core-v2`'s dependencies into the unified lockfile.
- **Build Script Optimization**: Updated `svelte/core-v2/build-core.sh` and `svelte/ai-model/build-ai-model.sh` to a streamlined pattern. They no longer perform `npm install` themselves, instead assuming dependencies are pre-installed at the workspace root.
- **Centralized Build Process**: Updated the main `svelte/build.sh` script to perform a single `npm ci` at the `svelte/` root before launching individual app builds in parallel. This prevents redundant installs and avoids potential race conditions.

## Verification & Validation
- **Built the Applications**: Ran the `build.sh` script to verify both `ai-model` and `core-v2` still compile properly with the workspace setup.
- **Ran All Playwright Tests**: Executed the full Playwright test suite to ensure no regressions were introduced.

> [!NOTE]
> `ai-model` and `core-v2` are now fully integrated into the new workspace. The remaining apps (`quick-check-2025` and `roi-calculator`) are still using their standalone structures and can be migrated next!
