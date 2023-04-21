### Hugo
To build and preview the site locally, you'll need [hugo](https://gohugo.io/).

- The recommended command to start the local hugo server is `hugo serve -D -s hugo --disableFastRender --debug --watch`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.

### CI/CD
See `/ci/README.md`

### DEV Misc with Firebase
#### Firebase can be emulated locally.
This requires two terminal windows to test the functionality it provides.

*NOTE:* re: Firestore. While you may leverage Firestore emulators to test locally, you will still need to create a Firestore Config object in `hugo/static/js/firebase-config-local.js` with values of a Firebase project that you have permissions.

#### **Firestore**
To emulate only firestore (used by the email contact form)
- in terminal 1, run `hugo serve -s hugo --disableFastRender --debug --watch`
- in terminal 2, run `firebase emulators:start --only firestore`
- access the site at `http://localhost:1313`


#### **Firestore and Hosting**
To emulate firestore and firebase hosting (to see features like server-side redirects)
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start --only firestore,hosting`
  - access the site at `http://localhost:6001`
    - _in this configuration, the browser will not auto-reload when source files are changed_

#### **Cloud Functions**
To emulate Cloud Functions, you will need NodeJS installed locally (see `package.json` for version requirements).

_NOTES_:
1) Other Firebase emulation options are available by passing other `--only` options: `firebase emulators:start --only firestore,hosting,functions,extensions`.  _If you do not_ pass in `--only` arguments, the CLI will attempt to access the hosted/project instance as defined within `./.firebaserc` due to the `extensions` resources defined within the Firebase config (`firebase.json`).
    - One should be aware that at the time of this writing, Remote Config is not supported in Firebase emulations.  You may still pass in a local environment option by setting the `SEND_TO=` value within the `functions\.env.local` file.
2) If you get a permissions error on deployment (ie., when using the `extensions` option):
    - Option 1: You may need to pass in the `--project ` option to a Firebase project you have appropriate permissions.
    - Option 2: Hijack the `./.firebaserc` (via `git update-index --assume-unchanged .firebaserc`) and make changes in the Firebase instance configuration.  Just know that doing this will not commmit changed back to source control.
3) Firebase hosting uses non-standard port 6001 because Dave was having trouble with the standard port, 5000 (it may be because MacOS now leverages port 5000 for AirPlay).

