import { test, expect } from '@playwright/test';

test('quick check 2025 full flow test', async ({ page }) => {
    await page.goto('/experimental/quick-check/');
    
    // Step 1: Metrics
    await page.locator('input[name="leadtime"][value="6"]').check();
    await page.locator('input[name="deployfreq"][value="6"]').check();
    await page.locator('input[name="failurerecovery"][value="6"]').check();
    await page.locator('input[name="changefailure"]').fill('0');
    await page.locator('input[name="rework"]').fill('0');
    
    await page.getByRole('button', { name: 'View Results' }).click();
    
    // Step 2: Results & Industry Selection
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await page.getByRole('combobox').selectOption('government');
    
    // Step 3: Capabilities - CI
    await page.getByRole('row', { name: 'Code commits result in an' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Code commits result in a series of automated tests being run.' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Automated builds and tests' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Current builds are available' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Developers get feedback from' }).getByLabel('Neither agree nor disagree').check();
    
    // Advance from CI to Arch
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Step 4: Capabilities - Architecture (Loosely Coupled Teams)
    await page.getByRole('row', { name: 'On my team, we can make large-scale changes to the design of our system without creating' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'To complete my own work, I' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'My team can deploy and' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'We can do most of our testing' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'On my team, we can make large-scale changes to the design of our system without depending' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'On my team, we perform' }).getByLabel('Strongly disagree').check();
    
    // Advance from Arch to Culture
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Step 5: Capabilities - Culture
    await page.getByRole('row', { name: 'Information is actively' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Messengers are not punished' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Responsibilities are shared.' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Cross-functional' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Failures are treated' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'New ideas are welcomed.' }).getByLabel('Strongly agree').check();
    
    // Final results
    await page.getByRole('button', { name: 'View Results' }).click();
    
    // Verify capability scores
    await expect(page.locator('.score_text.ci')).toContainText('5.0');
    await expect(page.locator('.score_text.arch')).toContainText('0.0');
    await expect(page.locator('.score_text.culture')).toContainText('10.0');
});

test('quick check 2025 org size comparison', async ({ page }) => {
    await page.goto('/experimental/quick-check/?comp=size');
    
    await page.locator('input[name="leadtime"][value="6"]').check();
    await page.locator('input[name="deployfreq"][value="6"]').check();
    await page.locator('input[name="failurerecovery"][value="6"]').check();
    await page.locator('input[name="changefailure"]').fill('0');
    await page.locator('input[name="rework"]').fill('0');
    
    await page.getByRole('button', { name: 'View Results' }).click();
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await page.getByRole('combobox').selectOption('fewer_than_5000');
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
    
    await expect(page.getByText('Deployment rework rate')).toBeVisible();
    
    // Fill rework and view results
    await page.locator('input[name="rework"]').fill('0');
    await page.getByRole('button', { name: 'View Results' }).click();
    
    // Should show 10.0 for 2025 now
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await expect(page.locator('.version-prompt')).not.toBeVisible();
});
