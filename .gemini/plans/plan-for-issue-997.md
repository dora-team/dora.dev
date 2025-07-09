### Plan to Fix In-Page Anchor Links

1.  **Create a Failing Test:**
    *   Start by creating a new Playwright test file in `test/playwright/tests/in-page-links.spec.ts`.
    *   This test will navigate to an anchor link on a page, such as `/research/team/#derek-debellis`.
    *   It assert that the target element is obscured by the header, confirming the bug. It will do so by checking the vertical position of the target element to ensuring it is not hidden under the header's bounding box.
    *   Commit this as a change to the repository.

2.  **Investigate the Cause:**
    *   Inspect the CSS files within the `hugo/themes/dora-2025/` directory to identify the styles responsible for the sticky header.
    *   Determine the header's height and the CSS selector that applies the `position: fixed` or `position: sticky` property.

3.  **Implement the Fix:**
    *   The preferred solution is to use the CSS `scroll-padding-top` property. Apply this to the `<html>` or `<body>` element in the main stylesheet.
    *   The value for `scroll-padding-top` will be set to the height of the sticky header, creating a top padding for all scroll-to-anchor actions.
    *   Commit this as a change to the repository.

4.  **Verify the Solution:**
    *   Run the Playwright test suite from the `test/playwright/` directory.
    *   The test created in step 1 should now pass, demonstrating that the anchor link target is fully visible below the header.
    *   Run all of the Playwright tests to ensure nothing else broke.


Notes on Playwright:

1. Set `PW_TEST_HTML_REPORT_OPEN='never'` when running the playwright tests. For example, `PW_TEST_HTML_REPORT_OPEN='never' npx playwright test tests/my-test.spec.ts`
2. Follow Playwright best practices as outlined at https://playwright.dev/docs/best-practices

Notes on the repository:
1. This repository uses jj for version control.