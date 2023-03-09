### Hugo
To build and preview the site locally, you'll need [hugo](gohugo.io). The recommended command to start the local hugo server is `hugo serve -s hugo --disableFastRender --debug --watch`. The site can then be previewed at `localhost:1313`.

### Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (e.g. redirects) are provided by Firebase, and may not be available when the site is served locally by Hugo.

### CI/CD
See `/ci/README.md`

### DEV Misc
#### Firebase can be emulated locally, to test the functionality it provides. This requires two terminal windows
To emulate only firestore (used by the email contact form)  
- in terminal 1, run `hugo serve -s hugo --disableFastRender --debug --watch`
- in terminal 2, run `firebase emulators:start`
- access the site at `http://localhost:1313`

To emulate firestore and firebase hosting (to see features like server-side redirects)
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start`
  - access the site at `http://localhost:6001`
    - _in this configuration, the browser will not auto-reload when source files are changed_

*NOTE: Firebase hosting uses non-standard port 6001 because Dave was having trouble with the standard port, 5000. We should figure that out and revert to the standard port.*

