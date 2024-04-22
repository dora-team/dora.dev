const assert = require('assert');
const fs = require('fs');
baseUrl = process.env.BASE_URL;
if (!baseUrl) {
  try {
    baseUrl = "https://dora.dev"
    console.log(`BASE_URL environment variable not set, using ${baseUrl}`);
  } catch (e) {
    throw new Error('BASE_URL environment variable must be set');
  }
}

describe(`Redirects for ${baseUrl}`, () => {
  const redirects = fs.readFileSync('redirects.csv', 'utf8').split('\n');
  redirects.forEach((row) => {
    // skip any empty rows
    if (!row) return;

    const [url, targetUrl, statusCode] = row.split(',');
    it(`should redirect ${url} to ${targetUrl} with status code ${statusCode}`, async () => {
      const response = await fetch(baseUrl + url, { redirect: 'manual' });

      assert.strictEqual(
        response.headers.get('location'),
        targetUrl,
        `Expected ${url} to redirect to${targetUrl}, but got ${response.headers.get('location')}`
      );
   
      assert.strictEqual(
        response.status,
        parseInt(statusCode),
        `Expected status code ${statusCode} for ${url}, but got ${response.status}`
      );
    });
  });
});
