FROM node:lts-alpine

WORKDIR /test/redirects

COPY . .

RUN npm install
CMD ["npx", "mocha", "test-redirects.js"]
