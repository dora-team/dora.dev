This site is hosted on Firebase, so deployment requires a Firebase builder for Cloud Build. We use [the public community builder](https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/firebase). It must be built and pushed into your project's Container Registry repo.

Also, a secret named `github_token` must exist in Secret Manager, which contains a GH deploy key and is accessible to the Cloud Build service account.

When a PR is created or new commits are added, the site is published to a preview channel on Firebase. In these preview channels, draft content will be visible. The link to the preview environment for each pull request is posted as a Status Check URL on that PR.

Whenever code is merged to `main`, the site is published to two locations:
- [dora.dev](https://dora.dev): this is the production site (Firebase target: "prod"). Only content whose [front matter](https://gohugo.io/content-management/front-matter/) specifies `draft: false` is published.
- [draft.dora.dev](https://draft.dora.dev): this is a content preview site (Firebase target: "draft"). All content will be published here, including content whose front matter specifies `draft: true`.