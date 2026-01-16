# Implementation Plan - Refactor titleForHTMLHead

## Phase 1: Audit and Analysis [checkpoint: a6611e9]
- [x] Task: Identify all Hugo templates and shortcodes using `titleForHTMLHead` [462e7d0]
- [x] Task: Identify all content files (`.md`) containing `titleForHTMLHead` in front matter [462e7d0]
- [x] Task: Document any unique edge cases where `titleForHTMLHead` differs significantly from `title` [462e7d0]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Audit and Analysis' (Protocol in workflow.md) [a6611e9]

## Phase 2: Test Baseline (Red Phase)
- [x] Task: Create Playwright tests for **EVERY** page currently using `titleForHTMLHead` to verify current behavior and ensure no gaps. [41258c1]
- [x] Task: Create Playwright tests for other affected sections (News, Research, etc.) if not covered above. [56562ec]
- [x] Task: Verify all new tests pass against the current site (Baseline) [56562ec]
- [x] Task: Conductor - User Manual Verification 'Phase 2: Test Baseline' (Protocol in workflow.md) [checkpoint: 56562ec]

## Phase 3: Template Refactoring (Green Phase)
- [x] Task: Implement new title generation logic in Hugo templates (e.g., `layouts/partials/head.html`) [096dc64]
    - Standard: `DORA | [Section]: [Title]`
    - Guides: `DORA | [Title]`
    - Note: Ensure all capabilities follow the standard format, correcting exceptions like "Platform Engineering".
- [x] Task: Verify that Playwright tests now fail (if the expected title format changed) or pass (if aiming for parity) [096dc64]
- [x] Task: Update Playwright tests to reflect the new standardized title format [096dc64]
- [x] Task: Verify Playwright tests pass with the new template logic [096dc64]
- [x] Task: Conductor - User Manual Verification 'Phase 3: Template Refactoring' (Protocol in workflow.md) [checkpoint: 096dc64]

## Phase 4: Content Cleanup
- [x] Task: Bulk remove `titleForHTMLHead` from all markdown front matter [413969d]
- [x] Task: Final execution of Playwright test suite to ensure no regressions [413969d]
- [x] Task: Manual browser verification of random pages across different sections [413969d]
- [x] Task: Fix nested title tags and update existing tests to match new title format [e17f1ae]
- [x] Task: Reorganize title verification tests into individual files and remove temporary verification specs [00c9fa6]
- [x] Task: Conductor - User Manual Verification 'Phase 4: Content Cleanup' (Protocol in workflow.md) [checkpoint: 831e6f2]
