---
status: accepted
date: 2023-01-03
deciders: @davidstanke, @sapientcoffee
consulted: @nathenharvey
---
# Serve content with Firebase Hosting

## Context and Problem Statement
This site's content is [generated by hugo](004-use-hugo-for-site-generation.md) and served as static HTML/CSS/JS. The content then needs to be served by an HTTP server. Since DORA is a program run by Google Cloud, a solution hosted by Google is preferred.

## Considered Options

* [Cloud Run](https://cloud.google.com/run)
* [Google Cloud Storage](https://cloud.google.com/storage/docs/hosting-static-website)
* [Firebase Hosting](https://firebase.google.com/docs/hosting)
* Hosting on a self-managed server (e.g. NGINX on a [GCE](https://cloud.google.com/compute) instance)

## Decision Outcome

Chosen option: **Firebase Hosting**, because: 

* it's easy to use
* it's completely elastic—we pay by usage (we can expect highly variable traffic on dora.dev)
* it provides a lot of useful functionality out of the box, like:
  * SSL cert management
  * Preview channels (used by CI to provide isolated environments for PR review)
* as part of the larger Firebase suite, other tools are integrated, including [Firestore](002-store-data-with-firestore.md)