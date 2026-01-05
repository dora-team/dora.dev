import { test, expect } from '@playwright/test';
import { LAST_UPDATED_DATE_REGEX } from "../constants";

test.describe("DORA metrics guide", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/guides/dora-metrics/");
    });

    test("has the correct title", async ({ page }) => {
        await expect(page).toHaveTitle('DORA | DORA’s software delivery performance metrics');
    });

    test("has the correct header", async ({ page }) => {
        await expect(page.locator('h1')).toContainText('DORA’s software delivery performance metrics');
    });

    test("displays its last updated date", async ({ page }) => {
        await expect(page.locator(".updated")).toContainText(
            LAST_UPDATED_DATE_REGEX,
        );
    });

    test("displays the DORA callout icon", async ({ page }) => {
        const icon = page.locator('.dora-callout-icon img');
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute('src', '/ai/research-insights/dora-perspective-icon.png');
        const box = await icon.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
    });
});

test.describe("DORA metrics history", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/guides/dora-metrics/history/");
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
