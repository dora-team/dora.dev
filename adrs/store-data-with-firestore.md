---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2022-02-15
deciders: @davidstanke
consulted: @nathenharvey
---
# Store data with Firestore

## Context and Problem Statement
In certain circumstances, we need to persist user-provided data. 

For example, the site's [contact form](https://dora.dev/contact/) creates an inquiry to the DORA team; the submitter's contact information and message are then provided to the DORA team for follow up. A persistence mechanism is needed to facilitate this.

## Considered Options

* [Firestore](https://firebase.google.com/docs/firestore)
* [Google Forms](https://www.google.com/forms/about/)

## Decision Outcome

Chosen option: **Firestore**, because: 

* we've already chosen [Firebase Hosting](serve-content-with-firebase.md), and Firestore is integrated into the same admin console, runs in the same [emulator package](https://firebase.google.com/docs/emulator-suite), etc.
* administration overhead is minimal
* pricing is per unit of storage

## More Information

To communicate with Firestore, additional client-side bootstrapping is required, as seen in `/contact`. Specifically, the `firebaseConfig` object contains identifiers that the client uses to send data to the correct server-side data store. On the server config (which is done in the console and is therefore not visible in this repo), controls are in place to ensure only authorized users can read the data. The presence of the Firebase `apiKey` in client-side javascript is intended and safe, as per the [Firebase documentation](https://firebase.google.com/docs/web/setup) (also see: [is it safe to expose firebase apikey?](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053)).