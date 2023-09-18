# Release Notes: Firebase emailInquiryMonitor Cloud Function

V1.3.0 - Removed dependency upon Firebase Remote Config.  Values are now defined with environment variables

V1.2.0 - New features
 - Added support for Firestore TTL Policies by adding expireAt field to email-inquiry collection
 - Bumped node module versions to address security vulnerabilities

V1.1.0 - New features
 - Added custom document ID based upon timestamp for ease of sorting and research
 - Added original Web Inquiry documentID (from HTML post) as additional document element (`inquiryRef`) for traceability to original request
 - Added Unit and Integration Testing capabilities
 - Added `npm` shortcuts for stage environment `deploy` and `emulator`.  See [package.json](./package.json) for details

V1.0.0 - Initial Release

# Unit Test
To execute Firebase unit tests locally, one needs the following installed on the development machine.

Requirements:

- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite/install_and_configure)
- [Java](https://jdk.java.net/) JDK version 11 or higher.
- [Node.js](https://nodejs.org/en/download) version 16.0 or higher.

To execute the unit test.
```shell
cd ${PROJECT_ROOT}/functions/inquiry-monitor
npm install
npm test
```

You may review [package.json](./package.json) for details on execution

# Integration Test

Integration test will execute automatically upon Deployment of Infrastructure changes (ie., code outside of the Hugo directory)

Firebase Integration tests can be executed *locally*.  To execute you will need the following.

Requirements:

- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Node.js](https://nodejs.org/en/download) Version 16.0 or higher
- Permissions to the Staging Firebase environment
- A [service account key](https://firebase.google.com/docs/functions/unit-testing#online-mode) exported and stored locally at `${PROJECT_ROOT}/secrets/doradotdev-staging-private-key.json`

    **NOTE:** For Continuous Testing, the service account key is stored within Secret Manager for deployment pipeline access.  Review [preview-infra.cloudbuild.yaml](../../ci/preview-infra.cloudbuild.yaml) for additional insights.

To execute the on-line test *locally* against the `doradotdev-staging` environment.

```shell
// Be sure to have your service account key exported as defined above
cd ${PROJECT_ROOT}/functions/inquiry-monitor
npm install
npm run int-test
```

You may review [package.json](./package.json) for details on execution

**NOTE:** Be aware that anytime a Test is execute for the first time, if the Send Mail extension is active, you will trigger emails from the test.  This is not part of the *wrapped testing function*, but a result of the *deployed function* monitoring the same collection. However, subsequent tests will not trigger the deployed Cloud Function since the function will only trigger on a Document *creation* event.  If you wish to trigger an email, just delete the `mockDataReferenceID` document with the `email-inquiry` collection.
