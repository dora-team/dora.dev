import { test, expect } from '@playwright/test';

test('quick check test', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Quick Check', exact: true }).click();
    await page.click('input[name="leadtime"][value="6"]')
    await page.click('input[name="deployfreq"][value="6"]')
    await page.getByRole('slider').fill('0');
    await page.click('input[name="failurerecovery"][value="6"]')
    await page.getByRole('button', { name: 'View Results' }).click();
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await page.getByRole('combobox').selectOption('government');
    await page.getByRole('row', { name: 'Code commits result in an' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Code commits result in a series of automated tests being run.' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Automated builds and tests' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Current builds are available' }).getByLabel('Neither agree nor disagree').check();
    await page.getByRole('row', { name: 'Developers get feedback from' }).getByLabel('Neither agree nor disagree').check();
    await page.locator('.capability.ci').getByRole('button').click();
    await page.getByRole('row', { name: 'On my team, we can make large-scale changes to the design of our system without creating' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'To complete my own work, I' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'My team can deploy and' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'We can do most of our testing' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'On my team, we can make large-scale changes to the design of our system without depending' }).getByLabel('Strongly disagree').check();
    await page.getByRole('row', { name: 'On my team, we perform' }).getByLabel('Strongly disagree').check();
    await page.locator('.capability.arch').getByRole('button').click();
    await page.getByRole('row', { name: 'Information is actively' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Messengers are not punished' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Responsibilities are shared.' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Cross-functional' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'Failures are treated' }).getByLabel('Strongly agree').check();
    await page.getByRole('row', { name: 'New ideas are welcomed.' }).getByLabel('Strongly agree').check();
    await page.locator('.capability.culture').getByRole('button').click();
    await expect(page.locator('.score_text.ci')).toContainText('5.0');
    await expect(page.locator('.score_text.arch')).toContainText('0.0');
    await expect(page.locator('.score_text.culture')).toContainText('10.0');
});

test('quick check org size comparison', async ({ page }) => {
    await page.goto('/quickcheck/?comp=size');
    await page.getByRole('group', { name: 'For the primary application or service you work on, what is your lead time for' }).getByLabel('Less than one hour').check();
    await page.getByLabel('On demand (multiple deploys').check();
    await page.getByRole('slider').fill('0');
    await page.getByRole('group', { name: 'For the primary application or service you work on, how long does it generally' }).getByLabel('Less than one hour').check();
    await page.getByRole('button', { name: 'View Results' }).click();
    await expect(page.locator('.performance-average')).toContainText('10.0');
    await page.getByRole('combobox').selectOption('more_than_9999');
});