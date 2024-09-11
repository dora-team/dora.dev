---
# These are optional elements. Feel free to remove any of them.
status: proposed
date: 2023-04-07
deciders: davidstanke
consulted: jesseguke
informed:
---
# Use AlpineJS as a lightweight JS framework for decorating HTML elements

## Context and Problem Statement

Much of the DORA.dev site is static HTML and various assets/resources (i.e., PDF and images). For good UX and to move away from custom (hard to maintain) javascript, we need a lightweight javascript framework to assist in the decoration and visibility of DOM objects (e.g., modal windows)

## Decision Drivers

* A progressive JavaScript which is addative to the current site (e.g., does not require extensive refactoring for adoption)
* Extensible with vanilla JavaScript
* Support two-way binding
* Low barrier of entry; Easy to learn
* Do not require additional frameworks or processes required for build and development (e.g., Java, NodeJS, etc.)
* Friendly OSS License

## Considered Options

* AlpineJS ([website](https://alpinejs.dev/))
* AngularJS ([website](https://angularjs.org/))
* React ([website](https://react.dev/))
* Vue.js ([website](https://vuejs.org/))

## Decision Outcome

Chosen option: Use AlpineJS as a lightweight JS framework for decorating HTML elements because it meets the Decision drivers [above Decision Drivers](#decision-drivers). Contributors can easily contribute based on AlpineJS within just a few mins of understanding the framework. By design, the framework is limited in functionality yet has powerful features that can be embedded/removed directly/from the existing HTML and DOM objects to reduce time to value.

### Consequences

* Good, because the light framework makes for easy adoption and low-risk integration. If future choices move away from AlpineJS, the risk is low due to the loose coupling and may work with other frameworks.

* Bad, because it is light and limited. It may not support more complex design and functional requirements. However, with a loosely coupled architecture, feature-rich solutions can be adopted as separate services/solutions. Additionally, the framework does not enforce MVVM/MVP design patterns, but at this time, with Hugo, this functionality does not appear to be needed in the JS requirements.

### Other Considerations

Other considerations (e.g., React, AngularJS, Vue.js)

* They have solid adoption with a large, active community. However, they were not selected for the recommendation as the adoption would require a more considerable integration effort to achieve initial value, a  learning curve, or additional tooling (e.g., NodeJS and Vue.js) for development or build processes.

## More Information

Additional readings:
* [State of JS] (https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/)