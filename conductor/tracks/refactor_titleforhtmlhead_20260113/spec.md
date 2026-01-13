# Track Specification: Refactor titleForHTMLHead

## Overview
This track aims to remove the `titleForHTMLHead` front matter field from content files (primarily in `capabilities` and `guides`, but potentially elsewhere) and refactor the site's logic to generate the HTML `<title>` tag and related metadata programmatically using the standard `title` field. This will reduce redundancy and enforce a consistent title format across the site.

## Goals
1.  Identify all locations where `titleForHTMLHead` is currently used in templates and content.
2.  Establish a standardized logic for generating HTML titles.
3.  Remove `titleForHTMLHead` from all content front matter.
4.  Update Hugo templates to implement the new title generation logic.
5.  Ensure no regression in SEO or user experience via Playwright tests.

## Functional Requirements
1.  **Title Logic:** The HTML `<title>` tag must be generated dynamically.
    *   **Standard Pattern:** `DORA | [Section Name]: [Title]`
        *   Example: `/capabilities/code-maintainability/` -> "DORA | Capabilities: Code Maintainability"
    *   **Guides Pattern (Exception):** `DORA | [Title]`
        *   Example: `/guides/dora-metrics/` -> "DORA | DORA’s software delivery performance metrics"
    *   **Other Sections:** Must be audited and follow the Standard Pattern unless a specific exception is identified during the audit.
2.  **Removal:** The `titleForHTMLHead` field must be removed from all content markdown files where it exists.
3.  **Template Update:** The underlying Hugo layouts (likely `head.html` or similar) must be updated to use the new logic and stop checking for `titleForHTMLHead`.

## Non-Functional Requirements
1.  **Testing:**
    *   Existing pages must have Playwright tests verifying their current (or intended) titles before changes are applied.
    *   Tests must pass after the refactor.
    *   Reference `tests/capabilities/ai-accessible-internal-data.spec.ts` for test structure.
2.  **SEO Preservation:** The resulting titles should be meaningful and consistent with current SEO goals (clean, descriptive titles).

## Acceptance Criteria
- [ ] An audit report lists all templates and content types currently using `titleForHTMLHead`.
- [ ] Playwright tests exist and verify the `<title>` tag for representative pages in `capabilities`, `guides`, and other affected sections.
- [ ] `titleForHTMLHead` is removed from all front matter in the `hugo/content/` directory.
- [ ] Hugo templates are refactored to generate titles using the defined logic.
- [ ] All Playwright tests pass.
- [ ] Manual verification confirms correct title rendering in the browser.

## Out of Scope
- Changing the visual rendering of the page body (e.g., `h1` tags) unless strictly tied to the variable removal (unlikely).
- Major redesign of the site metadata beyond the `<title>` tag (unless OpenGraph/Twitter cards explicitly relied *only* on this field).
