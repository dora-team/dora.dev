# Hosting / Deployment / Continuous Integration

## Environments
There are two persistent hosting environments (powered by Firebase): [Staging](https://staging.dora.dev/) and [Prod](https://dora.dev/).
_Also, ephemeral environments are created during CI (see below)._

## Publishing
This site is hosted on Firebase, so deployment requires a Firebase builder for Cloud Build. We use [the public community builder](https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/firebase). It must be built and pushed into your project's Container Registry repo.

Also, a secret named `github_token` must exist in Secret Manager, which contains a GH deploy key and is accessible to the Cloud Build service account.


## CI pipelines
### Pipelines run on Pull Requests (PRs)
#### Content preview
If a PR includes changes to files in the `/hugo` directory, the pipeline `/ci/preview-content.cloudbuild.yaml` is executed in project `doradotdev`. This pipeline:

1. Renders the site in _draft_ mode (including content where "Draft" is true), and publishes it to a Firebase preview channel
1. Renders the site in _production_ mode (excluding content where "Draft" is true) and publishes it to a different Firebase preview channel
1. Posts both preview channel links to the PR as comments

#### Infra preview
If a PR includes changes to files _outside_ the `/hugo` directory, the pipeline `/ci/preview-infra.cloudbuild.yaml` is executed in project `doradotdev-staging`. This pipeline renders the site in production mode and deploys all Firebase components (hosting, functions, extensions, storage, etc.) to `staging.dora.dev`.

### Pipeline run on merge to `main`
When a PR is merged to `main`, the pipeline `/ci/cloudbuild.yaml` is executed in project `doradotdev`. This pipeline renders the site and deploys all Firebase components to `dora.dev`.

