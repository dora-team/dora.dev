### Hugo
To build and preview the site locally, you'll need [hugo](https://gohugo.io/).

- The recommended command to start the local hugo server is `hugo serve -D -s hugo --disableFastRender --debug --watch`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.

### CI/CD
See `/ci/README.md`

### Firebase Web Development
#### Firebase can be emulated locally.
This requires two terminal windows and some knowledge about specific Firebase options desired to test.

_NOTE;_ Firebase hosting uses non-standard port 6001 because Dave was having trouble with the standard port, 5000 (it may be because MacOS now leverages port 5000 for AirPlay).

#### **Firestore Only**
To emulate only firestore (used by the email contact form), 
  - `cd ${PROJECT_ROOT}`
  - in terminal 1, run `hugo serve -s hugo --disableFastRender --debug --watch`
  - in terminal 2, run `firebase emulators:start`
  - access the site at `http://localhost:1313`

#### **Firestore and Hosting**
To emulate firestore and firebase hosting (to see features like server-side redirects),
  - `cd ${PROJECT_ROOT}`
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start --only firestore,hosting`
  - access the site at `http://localhost:6001`
    - _in this configuration, the browser will not auto-reload when source files are changed_

### Firebase Platform Administration and Development
All development and deployment for *Platform capabilities* other than data access to Firestore includes such items as the following:
 - Firebase Cloud Functions Development and Deployment
 - Firebase Extension Deployment
 - Firebase Remote Configuration
 - Firestore Rules Deployment

**Required** For all of the above Platform component development, you must reference the `platform/firebase-dev.json` configuration file when working with platform features and emulator.  

#### **Cloud Functions**
To emulate Firestore Cloud Functions, you will need NodeJS installed locally. For version requirements review `platform/functions/{function_name}/package.json` and may start the Functions Emulator (with hosting and firestore) with the following: `firebase --config platform/firebase-dev.json emulators:start --only firestore,hosting,functions`.

Cloud Function Configuration: The hosted version of the Cloud Function leverages [Remote Config](https://firebase.google.com/docs/remote-config) to get the value for the "Send To" value.  However, at this time Remote Config is not supported in the local emulator.  However, you may still pass in a local environment option by setting the `SEND_TO=` value within a newly created file `platform/functions/{function_name}/.env.local`. (NOTE: By design, all `*.env.local` files are excluded from Git a defined in the `.gitignore`)

#### **Extensions**
Firebase emulation for extensions is available by adjusting the CLI option (i.e., either with the `--only extensions` or loading all by eliminating the `--only` completely).  However, by (current) Firebase design, _extensions require access to the hosted Firebase project at startup_ as defined within `./.firebaserc`.  This is used for start-up authentication only; If you not have access, this can cause permissions errors and fail to start the emulation (see notes below).

For local development extension configuration, you may be set certain variables by adding them in the following file: `platform/extensions/${EXTENSION_NAME}.env.local` (e.g., `platform/extensions/firestore-send-email.env.local`).

*Extension Notes* 
1) If you get a permissions error on deployment (ie., when using the `extensions` option):
    - Option 1: You may need to pass in the `--project ` option to a Firebase project you have appropriate permissions.
    - Option 2: Hijack the `./.firebaserc` (via `git update-index --assume-unchanged .firebaserc`) and make changes in the Firebase instance configuration.  Just know that doing this will not commit changed back to source control.

2) If you change Firebase Projects, either through configuration (e.g., `./.firebaserc`) or command-line argument (`--project `), you must modify the Firestore Config object defined in `hugo/static/js/firebase-config.js` to align with the new project configurations.  Otherwise, you will not see Firestore updates.  WARNING: Be sure you _do not_ unintentionally check this change into source control tracking.
