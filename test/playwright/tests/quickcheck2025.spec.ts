import { test, expect } from '@playwright/test';

test('quick check 2025 standard flow', async ({ page }) => {
    // Navigate to experimental quickcheck
    await page.goto('/experimental/quick-check/');
    
    // Check for the "Deployment rework rate" question
    await expect(page.getByText('Deployment rework rate', { exact: true })).toBeVisible();

    // Fill out the questions (10/10 performance)
    await page.locator('input[name="leadtime"][value="6"]').check();
    await page.locator('input[name="deployfreq"][value="6"]').check();
    await page.locator('input[name="failurerecovery"][value="6"]').check();
    
    // Sliders
    await page.locator('input[name="changefailure"]').fill('0');
    await page.locator('input[name="rework"]').fill('0');

    // View Results
    await page.getByRole('button', { name: 'View Results' }).click();

    // Check performance average
    await expect(page.locator('.performance-average')).toContainText('10.0');
    
    // Check that 2025 is the default version
    await expect(page.locator('.resultsContainer')).not.toContainText('You are viewing results using 2024 benchmark data');
});

test('quick check 2025 URL parameter pre-population', async ({ page }) => {
    // 4 metrics + 2024 version
    await page.goto('/experimental/quick-check/?leadtime=6&deployfreq=6&failurerecovery=6&changefailure=0&v=2024');
    
    // Should automatically advance to results
    await expect(page.locator('.performance-average')).toContainText('10.0');
    
    // Should show version prompt
    await expect(page.locator('.version-prompt')).toContainText('You are viewing results using 2024 benchmark data');
    
    // Click button to answer rework question for 2025
    await page.getByRole('button', { name: 'Answer the new Rework Rate question' }).click();
    
    // Should be on input page, and rework should be the only one not filled (if we were in kiosk mode it would be current)
    // In embedded mode, all questions are shown. Rework should be visible.
    await expect(page.getByText('Deployment rework rate')).toBeVisible();
    
    // Fill rework and view results
    await page.locator('input[name="rework"]').fill('0');
    await page.getByRole('button', { name: 'View Results' }).click();
    
    // Should show 10.0 for 2025 now
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await expect(page.locator('.version-prompt')).not.toBeVisible();
});

test('quick check 2025 industry selection', async ({ page }) => {
    await page.goto('/experimental/quick-check/?leadtime=6&deployfreq=6&failurerecovery=6&changefailure=0&rework=0');
    await expect(page.locator('.performance-average')).toContainText('10.0');
    
    // Select an industry
    await page.getByRole('combobox').selectOption('technology');
    
    // Check that industry is reflected in URL
    const url = page.url();
    expect(url).toContain('industry=technology');
});
