# Hosting / Deployment / Continuous Integration

## Environments
There is one persistent environment: [Prod](https://dora.dev/).
_Also, ephemeral environments are created during CI (see below)._

## Publishing
This site is hosted on Firebase.

## CI pipelines
All CI is handled by GitHub Actions, using the workflow configuration files in this folder.

### PR previews
When a pull request is opened or edited, the `preview.yml` workflow will:

1. Render the site in _drafts-off_ mode (including content where "Draft" is true), and publish it to a Firebase preview channel
1. Render the site in _drafts-on_ mode (excluding content where "Draft" is true) and publish it to a different Firebase preview channel
1. Posts a comment to the PR containing links to both preview channels
  * _There will be only one comment posted, which will show that it has been "edited." Each of the revisions of this comment contains the link to one of the preview channels. You can tell which is which by the presence of "drafts_off" or "drafts_on" in the URL._

When a pull request is closed (whether or not it was merged), the `pr-cleanup.yml` workflow will delete the Firebase preview channels associated with that PR.

### Pipeline run on merge to `main`
When a PR is merged to `main`, the pipeline `deploy.yml` workflow will render the site in _drafts-off_ mode and publish it to the live Firebase channel.

### Pipelines run on schedule
Every morning at `07:00 UC`, the pipeline `deploy.yml` is executed. This is identical to the pipeline run on merge to `main`. Its purpose is to update any content that has been scheduled for publishing or deletion, as well as to ensure that the build itself is functioning correctly. Repo maintainers will be notified of a failed build.


# Variables and Secrets

These actions require some variables to be configured on the containing repo:
(Settings > Secrets and Variables > Actions)

Repository variables:
* `GOOGLE_CLOUD_PROJECT` -- name of the GCP project associated with this site's Firebase Hosting project

Repository secrets:
* `SERVICE_ACCOUNT_KEY` -- complete JSON key of a GCP service account, with the role `roles/firebasehosting.admin` on `GOOGLE_CLOUD_PROJECT`