const { test, expect } = require('@playwright/test');

test('Page title is correct', async ({ page }) => {
    await page.goto('/research/');

    await expect(page).toHaveTitle('DORA | Research');
  });


test('All archive links are valid', async ({ page }) => {
  await page.goto('/research/');

  // const archiveLinks = await page.$$eval('ul li a', (links) => links.map((link) => link.href));
  const archiveLinks = await page.$$eval('//span[@id="_pw-research-archives"]//a', (links) => links.map((link) => link.href));

  for (const link of archiveLinks) {
    const response = await page.goto(link);
    expect(response.status()).toBe(200);
  }
});

test('All expected years are listed', async ({ page }) => {
    await page.goto('/research/');

    const expectedYears = ['Artificial \
Intelligence', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

     const actualYears = await page.$$eval('//span[@id="_pw-research-archives"]//a', (links) => links.map((link) => link.textContent.trim()));

    expect(actualYears).toEqual(expectedYears);
});


