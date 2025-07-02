## Hugo
The following development with Hugo will be sufficient for most of the DORA.dev website development efforts.
To build and preview the site locally, you'll need [hugo](https://gohugo.io/) (recommended version: [v0.147.9](https://github.com/gohugoio/hugo/releases/tag/v0.147.9)).

- The recommended command to start the local hugo server is `hugo serve -D -s hugo --disableFastRender --logLevel debug --watch`.
  - This will render and live-reload all pages, including drafts. _To suppress rendering of drafts, omit the `-D` flag._
- When the hugo server is running, the site can be previewed at `localhost:1313`.

## CI/CD
See `/ci/README.md`

## Hosting
The production site (and pre-prod environments) are hosted in Firebase. Some hosting features (most notably, redirects) are provided by Firebase, and will not be available when the site is served locally by Hugo alone.

### **Firebase Emulation**
Many Firebase features may be run locally through the Firebase emulator.  This requires two terminal windows and some knowledge about specific Firebase options desired to test.

#### **Firestore and Hosting**
To emulate Firestore and Firebase hosting (to see features like server-side redirects)
  - in terminal 1, run `watch -n 2 hugo -s hugo -e development`
    - _this will continuously rebuild the site and save it to `/public` (which is the firebase hosting serving root)_
  - in terminal 2, run `firebase emulators:start --only hosting`
  - access the site at `http://localhost:5000`
    - _in this configuration, the browser will not auto-reload when source files are changed_

## Bugs
When deploying Cloud Functions with Cloud Build, you can encounter the following error:
```text
Step #2: functions: Unhandled error cleaning up build images. This could result in a small monthly bill if not corrected. You can attempt to delete these images by redeploying or you can delete them manually at https://console.cloud.google.com/artifacts/docker/{....gcf-artifacts}

Apparently, this is a [known issue](https://github.com/firebase/firebase-tools/issues/3404)

```
