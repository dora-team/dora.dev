import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

const languageToUrlMap = {
  'English': 'https://cloud.google.com/devops/state-of-devops/?hl=en&region=US',
  'Español': 'https://cloud.google.com/devops/state-of-devops/?hl=es&region=ES',
  'Español - América Latina': 'https://cloud.google.com/devops/state-of-devops/?hl=es-419&region=MX',
  'Français': 'https://cloud.google.com/devops/state-of-devops/?hl=fr&region=FR',
  'Italiano': 'https://cloud.google.com/devops/state-of-devops/?hl=it&region=IT',
  'Português - Brasil': 'https://cloud.google.com/devops/state-of-devops/?hl=pt-br&region=BR',
  '中文 – 简体': 'https://cloud.google.com/devops/state-of-devops/?hl=zh-tw&region=TW',
  '日本語': 'https://cloud.google.com/devops/state-of-devops/?hl=ja&region=JP',
  '한국어': 'https://cloud.google.com/devops/state-of-devops/?hl=ko&region=KR'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2023/dora-report/');
});

test('2023 DORA report page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2023');
});

test('2023 DORA report page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2023');
});

test('2023 DORA report page has the correct language.', async ({ page }) => {
  const languageOptions = await page.locator('item ul li').count();
  await expect(languageOptions).toBe(9);

  for (const language in languageToUrlMap) {
    const url = languageToUrlMap[language];
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  }
});

test('2023 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
