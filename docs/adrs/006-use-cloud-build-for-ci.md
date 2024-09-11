---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2023-03-01
deciders: davidstanke
consulted: nathenharvey
---
# Use Google Cloud Build for CI/CD

## Context and Problem Statement

According to [our favorite research organization](dora.dev), [CI](https://dora.dev/capabilities/continuous-integration/) and [CD](https://dora.dev/capabilities/continuous-delivery/) are essential capabilities for software delivery performance. We need automated build, test, and deployment tooling, to support fast, stable delivery of updated content and features.

## Decision Drivers

There are a lot of possible solutions, ranging from self-managed OSS tools to cloud-hosted CI/CD-as-a-service. We didn't see any value in self-hosting/maintaining a CI/CD service, as it's not a core competencey/differentiator, and we don't have specialized needs. So we focused on -as-a-service options. Dora.dev's source code is hosted on GitHub, and the site is served by Firebase (see [ADR 001](001-serve-content-with-firebase.md)), which is part of Google Cloud. Since both GitHub and Google Cloud provide capable integrated CI/CD tooling, we focused on those providers.

## Considered Options

* GitHub Actions
* Google Cloud Build

## Decision Outcome

Chosen option: **Google Cloud Build**, because:
- the team responsible for development and operations of dora.dev are familiar with it
- it's natively integrated with Firebase
- Google provides Cloud resources to DORA (a Google program) at no cost

### Pros and cons

* Pro: It's easy to authenticate from Cloud Build to Firebase, and the serving infra and delivery infra are in the same ecosystem
* Pro: We don't have to maintain a CI/CD server
* Con: While it's easy _enough_ to integrate with GitHub (e.g. to post build status updates), GitHub Actions would have been even easier
