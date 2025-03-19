---
status: accepted
date: 2025-03-18
deciders: davidstanke, nathenharvey
---
# Discontinue use of AlpineJS library

## Context and Problem Statement
AlpineJS is a lightweight Javascript library which is great at simple UI interactivity: things like show/hide of page elements, and some basic templating stuff. It _can_ do sophisticated things, but it gets pretty unwieldy pretty quick as the complexity grows. We used it for earlier versions of the Quick Check, and it worked, but it was hard to read and hard to maintain. So, we moved on to [using Svelte for embedded SPAs](008-use-svelte-for-embedded-spas.md). With those experiences migrated to Svelte, our remaining interactivity needs are pretty slight, and most can be handled with just HTML/CSS, or at most some simple JS, which can be implemented using vanilla scripts. It became hard to justify the overhead of keeping an Alpine dependency (_and_ a Svelte dependency) for such simple interactions. Plus, Alpine hasn't really taken off in popularity, which brings deprecation risks. We decided to remove Alpine from DORA.dev.

## Decision Drivers

* Two javascript frameworks is at least one too many
* Alpine isn't doing any heavy lifting any more
* Alpine isn't very popular

## Considered Options

* Keep using Alpine for basic interactivity [rejected for reasons noted above]
* Do ALL scripting using Alpine [rejected because of maintainability challenges, as noted above]
* Migrate all of the static Hugo content to Svelte [rejected, for now; a Svelte implementation with server-side rendering might be viable in the future, but dora.dev is still a largely static site, and Hugo is first and foremost an SSG (though, Svelte does have this functionality, too, and it's worth keeping that option open)]
