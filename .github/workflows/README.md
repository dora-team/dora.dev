# EXPERIMENTAL alternative CI configs using GitHub Actions.

These actions require some variables to be configured on the containing repo:
(Settings > Secrets and Variables > Actions)

Repository variables:
* `GOOGLE_CLOUD_PROJECT` -- name of the GCP project associated with this site's Firebase Hosting project

Repository secrets:
* `SERVICE_ACCOUNT_KEY` -- complete JSON key of a GCP service account, with the role `roles/firebasehosting.admin` on `GOOGLE_CLOUD_PROJECT`