---
# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2025-12-18
deciders: davidstanke, nathenharvey
consulted: robedwards, amandalewis
---
# Use GitHub Actions for CI

## Context and Problem Statement

Cloud Build has served us well for several years, but it has a few limitations. Meanwhile, GitHub Actions (GHA) has matured into a viable alternative.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Build logs and config for Cloud Build are opaque to non-Google users; not ideal for a repo which encourages community contributions
* Notifications in Cloud Build are challenging to implement
* Emerging needs for more advanced CI workflows, e.g. https://github.com/dora-team/dora.dev/issues/1218

## Considered Options

* Continue using Cloud Build
* Switch to GitHub Actions

## Decision Outcome

Chosen option: **Switch to GitHub Actions** because of its widespread use, breadth of capabilities, and cost (free for public repos)

GitHub Actions workflow configuration files are located in the `.github/workflows` folder.
