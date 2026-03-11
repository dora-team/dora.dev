import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from "../constants";

test.describe("DORA metrics history insight", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/insights/dora-metrics-history/");
    });

    test("has the correct title", async ({ page }) => {
        await expect(page).toHaveTitle('DORA | A history of DORA’s software delivery metrics');
    });

    test("has the correct header", async ({ page }) => {
        await expect(page.locator('h1')).toContainText('A history of DORA’s software delivery metrics');
    });

    test("displays its last updated date", async ({ page }) => {
        await expect(page.locator(".updated")).toContainText(
            LAST_UPDATED_DATE_REGEX,
        );
    });
});
