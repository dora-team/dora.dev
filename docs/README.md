### Hugo
To build and preview the site locally, you'll need [hugo](gohugo.io). The recommended command to start the local hugo server is `hugo serve -s hugo --disableFastRender --debug --watch`. The site can then be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.

To preview Firebase-specific functionality (e.g. server-side redirects), you can try using the [Firebase hosting emulator](https://firebase.google.com/docs/emulator-suite), but @davidstanke hasn't gotten that to work yet, so he doesn't know if it works. A simpler way is to deploy directly to a Firebase [preview channel](https://firebase.google.com/docs/hosting/manage-hosting-resources). To do that, install and configure the Firebase CLI, then run `firebase hosting:channel:deploy <a-unique-string>`. The CLI will push your local code to that preview channel and return a URL at which you will be able to see a fully-functional preview. (This same process is automatically run by Cloud Build on every Pull Request.)

### CI/CD
See `/ci/README.md`

### DEV Misc
#### Firebase can be emulated locally, to test the functionality it provides. This requires two terminal windows
To emulate only firestore (used by the email contact form)  
- in terminal 1, run `hugo serve -s hugo --disableFastRender --debug --watch`
  - in terminal 2, run `firebase emulators:start`
  - access the site at `http://localhost:6001`

To emulate firestore and firebase hosting (to see features like server-side redirects)
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
  - in terminal 2, run `firebase emulators:start`
  - access the site at `http://localhost:1313`

*NOTE: Firebase hosting uses non-standard port 6001 because Dave was having trouble with the standard port, 5000. We should figure that out and revert to the standard port.*