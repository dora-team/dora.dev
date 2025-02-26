# test-redirects.js

This script tests the redirects in the redirects.csv file. The script uses the fetch API to make requests to the dora.dev domain and asserts that the redirects are working correctly.

To run the script, simply run the following command:

`npx mocha test-redirects.js`

Or build and run a container

`docker build -t test-redirects .`
`docker run -it test-redirects`

Optionally set a `BASE_URL` environment varilable to test redirects against a different domain.

`BASE_URL=https://staging.dora.dev npx mocha test-redirects.js`
`docker run -it --env BASE_URL=https://staging.dora.dev test-redirects`
