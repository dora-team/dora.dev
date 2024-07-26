import { test, expect } from '@playwright/test';

const sidbarLinks = [
  'Meet DORA\'s Research Team',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017 and earlier'
];

const languageToUrlMap: { [key: string]: string } = {
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

async function checkLanguageLinks(page: any) {
  for (const language in languageToUrlMap) {
    if (languageToUrlMap.hasOwnProperty(language)) {
      const url = languageToUrlMap[language];
      const languageLink = page.getByRole('link', { name: language, exact: true })
      const languageLinkHref = await languageLink.getAttribute('href');
      await expect(languageLinkHref).toBe(url);
    }
  }
}

const blogToUrlMap: { [key: string]: string } = {
  'Reliability and SRE in the 2022 State of DevOps Report': 'https://cloud.google.com/blog/products/devops-sre/sre-in-the-2022-state-of-devops-report',
  '2022 State of DevOps Report data deep dive: good team culture': 'https://cloud.google.com/blog/products/devops-sre/2022-sodr-deep-dive-culture',
  '2022 State of DevOps Report data deep dive: Documentation is like sunshine': 'https://cloud.google.com/blog/products/devops-sre/deep-dive-into-2022-state-of-devops-report-on-documentation'
}

async function checkBlogLinks(page: any) {
  for (const blog in blogToUrlMap) {
    if (blogToUrlMap.hasOwnProperty(blog)) {
      const url = blogToUrlMap[blog];
      const blogLink = page.getByRole('link', { name: blog, exact: true })
      const blogLinkHref = await blogLink.getAttribute('href');
      await expect(blogLinkHref).toBe(url);
    }
  }
}


test('2022 Research page loads correctly', async ({ page }) => {
  await page.goto('/research/2022/dora-report/');

  // Check for page title
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2022');

  // Check for page heading
  await expect(page.locator('h1')).toContainText('DORA Research: 2022');

  //Check the languages
  await checkLanguageLinks(page); // Call the async function

  //Check blog links
  await checkBlogLinks(page); // Call the async function

  //Check the sidebar
  for (const sidbarLink of sidbarLinks) {
    await expect(page.getByRole('link', { name: sidbarLink, exact: true })).toBeVisible();
  }
});
