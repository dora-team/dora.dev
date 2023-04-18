### Hugo
To build and preview the site locally, you'll need [hugo](https://gohugo.io/).

- The recommended command to start the local hugo server is `hugo serve -D -s hugo --disableFastRender --debug --watch`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.

### CI/CD
See `/ci/README.md`

### DEV Misc
#### Firebase can be emulated locally, to test the functionality it provides. This requires two terminal windows

**Option 1** : _This will meet most development needs._  To emulate Firebase hosting only (to see features like server-side redirects)
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start --only hosting`
  - access the site at `http://localhost:6001`
    - _in this configuration, the browser will not auto-reload when source files are changed_


_**Option 2**_ To emulate _FULL_ Firebase emulation (e.g., hosting, Cloud Functions, and the [Emailer Extention](https://firebase.google.com/docs/extensions/official/firestore-send-email) - for contact form emails), this will require changes to your local emulation environment.  If you do not perform these steos, you may experience Firebase permission errors if you do not have access to the default GCP Firebase project as defined within [firebase.json]('../firebase.json') and [.firebaserc]('../.firebaserc') configurations:

1) Firebase Configuraton Object:

    To develop using local emulator*, you will want to create a new Firebase config in the following location:
    ```shell
        ./hugo/static/js/firebase-config-local.js
    ```
2. Install local emulator configurations into local Firebase dev instance folder*: `${GIT_ROOT}/local-dev/` # where GIT_ROOT is the project root from your git clone

    NOTE: If you follow the below recommendations, the local files created will _not_ be checked into source control as they are excluded in the `.gitignore` configuration. Best practice for community development.

    If you are unfamilar with the syntax, you may copy `${GIT_ROOT}/local-dev.template` directory or create them via the following:

    ```shell
    # Option 1 - Copy template ;Please dont rename them as this will remove from Git.
    cd ${GIT_ROOT}
    cp -rp local-dev.template local-dev

    # Option 2 - Install fresh
    cd ${GIT_ROOT}
    mkdir local-dev
    firebase ext:install firebase/firestore-send-email
    ```

    Review all configs in your `local-dev` for accuracy.

    *WARNING*:  The use of `extentions/firestore-send-email.secret.local` is the value in clear text.  DO NOT check into source control management.

3. Start Firebase emulators using the new configurations
    - in terminal 1, run `hugo serve -s hugo --disableFastRender --debug --watch`
    - in terminal 2, run `firebase emulators:start --config local-dev/firebase.json`
    - access the site at `http://localhost:1313`


  *NOTE:
  Firebase hosting uses non-standard port 6001 because some development environments are now using port, 5000 (i.e., MacOS environments now use this port for Airplay and may not be available)
