## Hugo
The following development with Hugo will be sufficient for most of the DORA.dev website development efforts.
To build and preview the site locally, you'll need [hugo](https://gohugo.io/) (recommended version: [v0.114.1](https://github.com/gohugoio/hugo/releases/tag/v0.114.1)).

- The recommended command to start the local hugo server is `hugo serve -D -s hugo --disableFastRender --debug --watch`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.

## CI/CD
See `/ci/README.md`


## Firebase Platform Advanced Development
### Firebase Platform Development and Administration
All development and deployment/administration for *Platform capabilities* include such items as the following:
 - Firebase Hosting
 - Firebase Cloud Functions Development and Deployment
 - Firebase Extension Deployment
 - Firestore Data retention and Firestore Rules Deployment

## Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects and contact form submissions) are provided by Firebase, and will not be available when the site is served locally by Hugo alone.

### **Firebase Emulation**
Many Firebase features may be run locally through the Firebase emulator.  This requires two terminal windows and some knowledge about specific Firebase options desired to test.

_NOTE:_ Firebase hosting uses non-standard port 6001 because Dave was having trouble with the standard port, 5000 (it may be because MacOS now leverages port 5000 for AirPlay).

#### **Firestore and Hosting**
To emulate Firestore and Firebase hosting (to see features like server-side redirects), and user form collection
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start --only firestore,hosting`
  - access the site at `http://localhost:6001`
    - _in this configuration, the browser will not auto-reload when source files are changed_

#### **Cloud Functions**
To emulate Firestore Cloud Functions, you will need NodeJS installed locally. For version requirements review `functions/{function_name}/package.json` and may start the Functions Emulator (with hosting and firestore) with the following: `firebase emulators:start --only firestore,hosting,functions`.

Cloud Function Configuration: The hosted version of the Cloud Function environment variables to get the value for the "Send To" value and expiration time.  You may pass in a local environment option by setting the `MONITOR_SEND_TO` and `INQUIRY_EXPIRES_DAYS` values within a newly created file `functions/{function_name}/.env.local`. (NOTE: By design, all `*.env.local` files are excluded from Git a defined in the `.gitignore`)

#### **Extensions**
Firebase emulation for extensions is available by adjusting the CLI option (i.e., either with the `--only extensions` or loading all by eliminating the `--only` completely).  However, by (current) [Firebase design](https://github.com/firebase/firebase-tools/issues/5510), _extensions require access to the hosted Firebase project at startup_ as defined within `./.firebaserc`.  This is used for start-up authentication only; If you not have access, this can cause permissions errors and fail to start the emulation (see notes below).

For local development extension configuration, you may be set certain Extension variables by adding them in the following file: `extensions/${EXTENSION_NAME}.env.local` (e.g., `extensions/firestore-send-email.env.local`).  More specifically, for the Fire Store Send Email extension, you will two files:
 - `firestore-send-email.env.local` - You can copy keys from the src `firestore-send-email.env.doradotdev`
 - `firestore-send-email.secret.local` - is a special file used for local development that contains only one entry: 
 `SMTP_PASSWORD=my_smtp_password_in_clear_text`  
 This file and value will be used for the local Firebase emulator as a substitute for the Secret Manager reference.

In a hosted environment:
1) The Deployer account `${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com` will require the _added_ role of `Secret Manager Viewer`
2) The Billing API needs to be enabled.

      **_Be sure to not check this file into Git!_**

*Extension Notes*
1) If you get a permissions error on deployment (ie., when using the `extensions` option):
    - Hijack the `./.firebaserc` (via `git update-index --assume-unchanged .firebaserc`) and make changes in the Firebase instance configuration.  Just know that doing this will not commit changed back to source control.

2) To write to the Firestore database, if you change Firebase Projects, either through configuration (e.g., `./.firebaserc`) or command-line argument (`--project `), you may need to modify the Firestore Config object defined in `hugo/static/js/firebase-config.js` to align with the new project configurations.  Otherwise, you will not see Firestore updates.  WARNING: Be sure you _do not_ unintentionally check this change into source control tracking.


## Bugs
When deploying Cloud Functions with Cloud Build, you can encounter the following error:
```text
Step #2: functions: Unhandled error cleaning up build images. This could result in a small monthly bill if not corrected. You can attempt to delete these images by redeploying or you can delete them manually at https://console.cloud.google.com/artifacts/docker/{....gcf-artifacts}

Apparently, this is a [known issue](https://github.com/firebase/firebase-tools/issues/3404)

```
