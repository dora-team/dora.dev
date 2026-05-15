# Converging Svelte Applications into an NPM Workspace

The `dora-team/common-libraries/svelte` directory currently contains several independent Svelte applications (`ai-model`, `core-v2`, `quick-check-2024`, `quick-check-2025`, `roi-calculator`). Each has its own `package.json` and `package-lock.json`, meaning dependencies are updated individually. 

The proposed approach to converge these applications onto a shared version of Svelte and related libraries is to use **NPM Workspaces**. 

## Approach: NPM Workspaces

By placing a root `package.json` in the `svelte/` directory and defining each app as a "workspace", we can share dependencies across all projects while maintaining their independence as distinct applications.

### Key Changes
1. **Root `package.json`**: A new `package.json` in the `svelte/` directory will specify the workspaces.
2. **Dependency Hoisting**: Common dependencies (like `svelte`, `vite`, `sass`) will eventually be moved from the individual apps into the root `package.json`. NPM will install them once at the root level (`svelte/node_modules`) and link them to the sub-projects.
3. **App-Specific Dependencies**: Any libraries needed by only one application will remain in that application's `package.json`.
4. **Build Scripts**: The individual `build-<app>.sh` scripts will be modified slightly so that `npm install` is run from the `svelte/` root for apps that have been migrated into the workspace.

## Tradeoffs

### Pros
- **Single Source of Truth**: Upgrading Svelte, Vite, or other shared tooling requires changing exactly one file (`svelte/package.json`), automatically applying to all apps.
- **Improved Maintenance**: Eliminates the overhead of managing multiple `package-lock.json` files and repeating dependency updates.
- **Faster Installs / Less Disk Space**: Dependencies are installed once at the root, saving significant disk space and CI installation time.
- **Consistent Tooling**: Ensures all apps are built using the same version of compilers and plugins, reducing "works on my machine" or version-mismatch bugs.

### Cons
- **Coupled Upgrades**: An upgrade to a shared dependency (like Svelte 6 in the future) typically means all applications must be updated and tested simultaneously to handle any breaking changes.
- **CI/CD Impact**: Build scripts and CI pipelines need a slight adjustment to run `npm install` from the root of the workspace rather than the individual app directories.

> [!TIP]
> **Mitigating Coupled Upgrades:** While workspaces encourage shared versions, you can still specify an explicit version in a child app's `package.json` to override the root version. This means if one app is blocking a major upgrade, you can temporarily pin it to the older version while upgrading the rest, keeping the flexibility of independent updates.

## Recommendation

**Proceed with the NPM Workspaces approach.** The maintenance benefits of a single source of truth for core libraries heavily outweigh the minor coupling drawbacks, especially since NPM workspaces still allow for selective version overrides when absolutely necessary. 

## Phased Rollout Plan

To avoid a "big-bang" deployment and ensure we can safely deploy and verify smaller changes, we will execute this migration by onboarding applications one at a time, followed by iterative dependency consolidation.

### Phase 1: Workspace Initialization (App-by-App)
We will introduce the workspace structure and migrate applications into it one at a time, without moving any dependencies to the root yet.

For **each** application (e.g., starting with `core-v2`):
1. **Initialize/Update Workspace**: If `svelte/package.json` does not exist, create it. Add the application to the `"workspaces"` array.
2. **Clean Up**: Remove the application's individual `package-lock.json` and its `node_modules` folder.
3. **Install**: Run `npm install` at the `svelte/` root to incorporate the app into the unified workspace lockfile.
4. **Update Build Script**: Modify the application's build script (e.g., `build-core.sh`) to run `npm install` from the `svelte/` root directory before building.
5. **Deploy and Verify**: Test and deploy this single application change.
*Repeat this process until all applications are added to the workspace.*

### Phase 2: Tooling Consolidation
Once all applications are successfully part of the workspace, we will move non-breaking build tools to the root.
1. Consolidate versions of `vite`, `@sveltejs/vite-plugin-svelte`, and `sass` across all apps.
2. Move these dependencies from individual `package.json` files to the root `svelte/package.json`.
3. **Deploy and Verify**: Ensure the build output remains unchanged and functional.

### Phase 3: Core Library Consolidation
We will move Svelte to the root.
1. Ensure all applications are running the same version of `svelte` (currently `^5.55.7`).
2. Move `svelte` to the root `svelte/package.json`.
3. **Deploy and Verify**: Confirm all applications run identically. 

## User Review Required

Please review the updated rollout plan, which now migrates the applications into the workspace one by one. If this looks good to you, we can begin Phase 1 with the first application (let me know which one you prefer to start with, or I can start with `core-v2`).

