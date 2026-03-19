# Code Review & Refactoring: Svelte 5 ROI Calculator

This plan outlines improvements to the Svelte 5 ROI calculator to align with the latest idiomatic best practices, fix a state tracking bug, and improve code maintainability.

## 1. Objectives
- **Fix State Tracking**: Ensure the URL hash synchronization correctly tracks all property changes in the `inputs` state object.
- **Adopt Svelte 5 Snippets**: Refactor repetitive UI elements in the results section to use `{#snippet}` and `{@render ...}`.
- **Idiomatic State Handling**: Use `$state.snapshot` for conversions to plain objects and ensure effects are properly tracked.
- **Improve Component Resilience**: Enhance input handling to be more consistent with Svelte 5's reactivity model.

## 2. Key Files & Context
- `src/App.svelte`: Main entry point, manages global state and hash sync.
- `src/lib/NumericInput.svelte`: Custom numeric input with formatting.
- `src/lib/PercentInput.svelte`: Custom percentage input.
- `src/lib/calculations.js`: Business logic (already well-separated).

## 3. Proposed Changes

### 3.1 `src/App.svelte`
- **Fix Hash Sync Effect**: Update the `$effect` to synchronously access `inputs` (via `$state.snapshot`) to ensure it re-runs when any property changes.
- **Refactor to Snippets**:
    - Create a `stat` snippet for the result items.
    - Create an `inputSection` snippet if it simplifies the template.
- **Clean up Hash Loading**: Ensure `loadFromHash` uses sanitized values consistently.

### 3.2 `src/lib/NumericInput.svelte` & `src/lib/PercentInput.svelte`
- **Ensure Proper Binding**: Verify that `$bindable()` is used correctly and doesn't cause unnecessary effect loops.
- **Syncing Display Value**: Refine the logic for when `displayValue` is updated to avoid potential cursor jumps if the value hasn't semantically changed.

### 3.3 `src/lib/calculations.js`
- Minor improvements to ensure `sanitizeInputs` handles all edge cases.

## 4. Implementation Steps

### Phase 1: Fix Hash Synchronization
1.  Update `App.svelte`'s `$effect` to snapshot the `inputs` state.
2.  Pass the snapshotted state to `saveToHash` or inline the logic to ensure tracking.

### Phase 2: Refactor UI with Snippets
1.  Define the `stat` snippet in `App.svelte`.
2.  Replace the manual `div.stat` blocks with `{@render stat(...)}`.

### Phase 3: Component Polish
1.  Review `NumericInput.svelte` and `PercentInput.svelte` for any redundant effects.
2.  Optimize the `oninput` handlers to be more resilient.

## 5. Verification & Testing
1.  **Functional Test**: Verify that changing any input (e.g., "Technical staff size") updates the URL hash after a short debounce.
2.  **Regression Test**: Ensure calculations still match the expected values in `calculations.test.js`.
3.  **UI Test**: Verify that the reset button still works and correctly updates both inputs and results.
4.  **Hash Deep-Link**: Manually test opening the page with a pre-filled hash to ensure it loads correctly.
