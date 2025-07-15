import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

const languageToUrlMap = {
  'Deutsch': '2022-dora-accelerate-state-of-devops-report-de.pdf',
  'English': '2022-dora-accelerate-state-of-devops-report.pdf',
  'Español': '2022-dora-accelerate-state-of-devops-report-es.pdf',
  'Español - América Latina': '2022-dora-accelerate-state-of-devops-report-es419.pdf',
  'Français': '2022-dora-accelerate-state-of-devops-report-fr.pdf',
  'Italiano': '2022-dora-accelerate-state-of-devops-report-it.pdf',
  'Português - Brasil': '2022-dora-accelerate-state-of-devops-report-port-br-bma.pdf',
  '中文 – 简体': '2022-dora-accelerate-state-of-devops-report-zh-cn.pdf',
  '日本語': '2022-dora-accelerate-state-of-devops-report-ja.pdf',
  '한국어': '2022-dora-accelerate-state-of-devops-report-ko.pdf'
};

const blogToUrlMap = {
  'Reliability and SRE in the 2022 State of DevOps Report': 'https://cloud.google.com/blog/products/devops-sre/sre-in-the-2022-state-of-devops-report',
  '2022 State of DevOps Report data deep dive: good team culture': 'https://cloud.google.com/blog/products/devops-sre/2022-sodr-deep-dive-culture',
  '2022 State of DevOps Report data deep dive: Documentation is like sunshine': 'https://cloud.google.com/blog/products/devops-sre/deep-dive-into-2022-state-of-devops-report-on-documentation'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2022/dora-report/');
});

test('2022 DORA report page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2022');
});

test('2022 DORA report page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2022');
});

test('2022 DORA report page has the correct report image', async ({ page }) => {
  const reportImage = page.locator('img[src="2022-dora-accelerate-state-of-devops-report.png"]');
  await expect(reportImage).toBeVisible();
  await expect(reportImage).toHaveAttribute('alt', 'Accelerate State of DevOps Report 2022');
});

test('2022 DORA report page has the correct number of language options.', async ({ page }) => {
  const languageOptions = await page.locator('item a.button').count();
  const expectedLanguageCount = Object.keys(languageToUrlMap).length;
  await expect(languageOptions).toBe(expectedLanguageCount);
});

for (const language in languageToUrlMap) {
  const url = languageToUrlMap[language];
  test(`2022 DORA report should link to the correct ${language} URL`, async ({ page }) => {
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  });
}

test('2022 DORA report page has the correct blog links.', async ({ page }) => {
  const blogLinks = await page.locator('h3 + ul li a').count();
  await expect(blogLinks).toBe(3);

  for (const blog in blogToUrlMap) {
    const url = blogToUrlMap[blog];
    const blogLink = page.getByRole('link', { name: blog, exact: true });
    await expect(blogLink).toHaveAttribute('href', url);
  }
});

test('2022 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
