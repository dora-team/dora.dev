import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

const languageToUrlMap = {
  'English': 'https://cloud.google.com/devops/state-of-devops/?hl=en&region=US',
  'Español': 'https://cloud.google.com/devops/state-of-devops/?hl=es&region=ES',
  'Español - América Latina': 'https://cloud.google.com/devops/state-of-devops/?hl=es-419&region=MX',
  'Français': 'https://cloud.google.com/devops/state-of-devops/?hl=fr&region=FR',
  'Português - Brasil': 'https://cloud.google.com/devops/state-of-devops/?hl=pt-br&region=BR',
  '中文 – 简体': 'https://cloud.google.com/devops/state-of-devops/?hl=zh-cn&region=CN' ,
  '繁體中文': 'https://cloud.google.com/devops/state-of-devops/?hl=zh-tw&region=TW',
  '日本語': 'https://cloud.google.com/devops/state-of-devops/?hl=ja&region=JP',
  '한국어': 'https://cloud.google.com/devops/state-of-devops/?hl=ko&region=KR'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2024/dora-report/');
});

test('2024 research overview has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2024');
});

test('2024 research overview has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2024');
});

test('2024 DORA report page has the correct number of language options.', async ({ page }) => {
  const languageOptions = await page.locator('item ul li').count();
  const expectedLanguageCount = Object.keys(languageToUrlMap).length;
  await expect(languageOptions).toBe(expectedLanguageCount);
});

for (const language in languageToUrlMap) {
  const url = languageToUrlMap[language];
  test(`2024 DORA report should link to the correct ${language} URL`, async ({ page }) => {
    const url = languageToUrlMap[language];
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  });
}

test('2024 research overview has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});

test('2024 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="2024-dora-accelerate-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'Accelerate State of DevOps Report 2024');
});

test('2024 DORA report page has the correct sponsors.', async ({ page }) => {
  const sponsors = [
    { name: 'Catchpoint', src: 'sponsors/catchpoint.png', href: 'https://www.catchpoint.com/' },
    { name: 'chronosphere', src: 'sponsors/chronosphere.png', href: 'https://chronosphere.io/' },
    { name: 'Datadog', src: 'sponsors/datadog.png', href: 'https://www.datadoghq.com/' },
    { name: 'Deloitte', src: 'sponsors/deloitte.png', href: 'https://www2.deloitte.com/' },
    { name: 'Excella', src: 'sponsors/excella.png', href: 'https://www.excella.com/' },
    { name: 'Gearset', src: 'sponsors/gearset.png', href: 'https://gearset.com/' },
    { name: 'Liatrio', src: 'sponsors/liatrio.png', href: 'https://www.liatrio.com/' },
    { name: 'Middleware', src: 'sponsors/middleware.png', href: 'https://www.middlewarehq.com/middleware-open-source?utm_source=dora_report' },
    { name: 'Opsera', src: 'sponsors/opsera.png', href: 'https://www.opsera.io/' },
  ];

  for (const sponsor of sponsors) {
    const sponsorLink = page.getByRole('link', { name: sponsor.name });
    await expect(sponsorLink).toBeVisible();
    await expect(sponsorLink).toHaveAttribute('href', sponsor.href);
    await expect(sponsorLink.locator('img')).toHaveAttribute('src', sponsor.src);
  }
});
