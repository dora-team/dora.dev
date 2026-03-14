import { test, expect } from '@playwright/test';

test.describe('ROI calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/experimental/roi-calculator/');
    });

    test('has the correct title and header', async ({ page }) => {
        await expect(page).toHaveTitle('DORA | ROI of AI-assisted software development calculator');
        await expect(page.getByRole('heading', { name: 'Input variables' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Calculated ROI' })).toBeVisible();
    });

    test('calculates default values correctly', async ({ page }) => {
        const netProfit = page.locator('.summary-card.primary .value').first();
        await expect(netProfit).toContainText('$3,281,000');

        const roi = page.locator('.stat:has-text("Return on investment (ROI)") .value');
        await expect(roi).toContainText('39.2%');

        const payback = page.locator('.stat:has-text("Payback period") .value');
        await expect(payback).toContainText('0.7 years');
    });

    test('updates results when inputs change', async ({ page }) => {
        // Change technical staff size
        const staffInput = page.locator('#staff_size');
        await staffInput.fill('1000');
        await staffInput.blur();

        // Check if results updated (staff size doubles, most things should scale)
        // Default net profit was $3,281,000. With 1000 staff (and other defaults), it should be higher.
        const netProfit = page.locator('.summary-card.primary .value').first();
        await expect(netProfit).not.toContainText('$3,281,000');
        await expect(netProfit).toContainText('$6,016,000');
    });

    test('resets to defaults correctly', async ({ page }) => {
        const staffInput = page.locator('#staff_size');
        await staffInput.fill('1000');
        await staffInput.blur();

        await page.getByRole('button', { name: 'Reset to defaults' }).click();

        await expect(staffInput).toHaveValue('500');
        const netProfit = page.locator('.summary-card.primary .value').first();
        await expect(netProfit).toContainText('$3,281,000');
    });

    test('persists state in URL hash', async ({ page }) => {
        const staffInput = page.locator('#staff_size');
        await staffInput.fill('750');
        await staffInput.blur();

        await expect(page).toHaveURL(/.*#.*staff_size=750.*/);

        // Reload page and check if value is still there
        await page.reload();
        await expect(staffInput).toHaveValue('750');
        await expect(page.locator('.summary-card.primary .value').first()).not.toContainText('$3,281,000');
    });

    test('enforces client-side validation', async ({ page }) => {
        // Net time saved can be negative
        const timeSavedInput = page.locator('#time_saved_per_developer');
        await timeSavedInput.fill('-10');
        await timeSavedInput.blur();
        await expect(timeSavedInput).toHaveValue('-10');

        // AI costs cannot be negative (min 0)
        const aiCostInput = page.locator('#ai_license_cost_per_user');
        await aiCostInput.fill('-500');
        await aiCostInput.blur();
        // Should have been corrected to 0
        await expect(aiCostInput).toHaveValue('$0');

        // Staff size must be > 0
        const staffInput = page.locator('#staff_size');
        await staffInput.fill('-25');
        await staffInput.blur();
        // Should have been corrected to small positive value (formatted as 0 in Intl.NumberFormat if very small,
        // but our component sets it to 0.000001 which formats as "0" or "0.000001" depending on scale)
        // Let's check if it's at least not -25 (it should be sanitized and formatted to "0")
        await expect(staffInput).toHaveValue('0');
    });

    test('handles invalid hash values by sanitizing', async ({ page }) => {
        // Navigate with a broken staff_size
        await page.goto('/experimental/roi-calculator/#staff_size=-25');

        const staffInput = page.locator('#staff_size');
        await expect(staffInput).toHaveValue('0');
    });

    test('deleting a value sets it to 0 and updates calculations', async ({ page }) => {
        const staffInput = page.locator('#staff_size');
        const netProfit = page.locator('.summary-card.primary .value').first();
        
        // Initial value is 500
        await expect(staffInput).toHaveValue('500');
        await expect(netProfit).toContainText('$3,281,000');

        // Change to 1000
        await staffInput.fill('1000');
        await staffInput.blur();
        await expect(staffInput).toHaveValue('1,000');
        await expect(netProfit).toContainText('$6,016,000');

        // Delete the value
        await staffInput.focus();
        await staffInput.fill('');
        await staffInput.blur();

        // Check if it becomes "0" and profit updates
        await expect(staffInput).toHaveValue('0');
        await expect(netProfit).toContainText('$546,000');
    });

    test('deleting Net time saved (%) sets it to 0, not -100', async ({ page }) => {
        const timeSavedInput = page.locator('#time_saved_per_developer');
        
        // Initial value 12.5%
        await expect(timeSavedInput).toHaveValue('12.5');

        // Delete it
        await timeSavedInput.focus();
        await timeSavedInput.fill('');
        await timeSavedInput.blur();

        // Should be 0
        await expect(timeSavedInput).toHaveValue('0');
    });
});
