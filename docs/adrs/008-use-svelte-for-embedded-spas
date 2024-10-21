---
status: accepted
date: 2024-10-21
deciders: davidstanke, nathenharvey
---
# Provide dynamic content by embedding Svelte (or other?) Single-Page Applications (SPAs) with Hugo content

> Note: Dave is writing this ADR quickly, and poorly. It should be refined.

## Context and Problem Statement
[Hugo](004-use-hugo-for-site-generation.md) is our static site generator. It's great for making static HTML/CSS pages which can be served quickly and cached on a CDN. But it doesn't provide any server-side dynamic processing capability, nor does it include any client-side Javascript capabilities (JS can be present in templates, or even in content files, but Hugo doens't offer any tools specifically for authoring or maintaining it.)

We need a way to embed dynamic content, like the [quickcheck](https://dora.dev/quickcheck), into the Hugo site

## Embedding paradigm
* Each dynamic experience (quickcheck, DORA Core, ???) is authored as an individual SPA
* These can be viewed in isolation, though they may not contain all required resources (e.g. menus, stylesheets) provided by the Hugo site
* These are then embedded into the Hugo site as static assets

## Javascript framework
There are, um, more than a few Javascript frameworks to choose from. We have chosen [Svelte](https://svelte.dev) because it's powerful enough to scale up to large applications, while offering an intuitive (in Dave's biased opinion) authoring paradigm. The source files are at `/svelte` and can be edited/served from within that directory. Svelte (typically) uses [Vite](https://vite.dev) as a local web server and also to package a standalone bundle of resources that can be served statically. These bundles are then linked into static content pages within Hugo's content directory.

## JS? TS?
So far, we've used Javascript to author Svelte SPAs. We should probably use TS instead.

## Build process
We've already made a bit of a mess of this, having multiple ways to get the built SPAs into Hugo's content folder. In one case, the app is built in place and then copied into the Hugo folder; in another case, it's configured so that the build output target is already within Hugo's folder.