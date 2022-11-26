---
status: accepted
date: 2022-11-26
deciders: davidstanke
---
# Use Hugo to generate static site content

## Context and Problem Statement

This site primarily consists of static assets: HTML, CSS, JS. The HTML pages need to share common navigation, style, and metadata. Maintaining such consistency by copying-and-pasting is tedious and error-prone.

## Considered Options

* Hugo
* Jekyll
* Gatsby
* Lektor
* (none: maintain static assets as flat HTML files)

## Decision Outcome

Chosen option: **Hugo**, because Dave has experience with it and likes it. He finds its directory and config structure easy to understand. Previously, the site had been maintained as flat HTML files, which was problematic when we needed to make updates across the entire site (e.g. adding a banner to promote the DevOps Awards).


## More Information

See [gohugo.io](gohugo.io) for more about Hugo.