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

test('2022 report page loads correctly', async ({ page }) => {
  await page.goto('/research/2022/dora-report/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2022');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('DORA Research: 2022');

  // Check languages
  const languageOptions = await page.locator('item ul li').count();
  await expect(languageOptions).toBe(10);

  for (const language in languageToUrlMap) {
    const url = languageToUrlMap[language];
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  }

  // Check blog links
  const blogLinks = await page.locator('h3 + ul li a').count();
  await expect(blogLinks).toBe(3);

  for (const blog in blogToUrlMap) {
    const url = blogToUrlMap[blog];
    const blogLink = page.getByRole('link', { name: blog, exact: true });
    await expect(blogLink).toHaveAttribute('href', url);
  }

  // Check the sidebar
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
