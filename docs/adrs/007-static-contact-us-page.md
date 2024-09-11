---
status: accepted
date: 2024-09-11
deciders: davidstanke, nathenharvey
---
# "Contact Us" page is static content with mailto links

## Context and Problem Statement

As the public face of the DORA program, dora.dev needs to include information for users on how to contact the team, for various purposes. We used to have a neat Firebase-powered form that supported multiple inquiry types. But it requires a lot of supporting infrastructure. We questioned whether it was worth the effort.

## Decision Drivers

* The team maintaining dora.dev is small, and primarily focused on publishing information and (client-side) tools (e.g. [DORA Quick Check](https://dora.dev/quickcheck/)). Maintaining dynamic, server-side functionality requires different skills and tooling. 
* Inquiries from users, and those users' experience when submitting them, are important. However, the volume of inquiries has historically been low ( < 1 / day)

## Considered Options

* **simple mailto** -- remove the "contact us" page entirely and change the "contact us" link on the page footer to simply point to an email address
* **static page of instructions** -- replace the form on the "contact us" page with some words, describing how to contact us for various purposes. For some things, the instructions would include a "mailto" to dora-advocacy; others will (e.g.) point to the GitHub repo.
* **complex mailto** -- rewrite the "contact us" page so that the form submits to a `mailto:` link ... this means that after the user fills out the fields and clicks "submit," their email client opens up a draft email that they can modify if desired, and send. Any form data is written to the body of the email, and the subject can be pre-populated (`mailto:[...]?subject=[...]`). 
* **third-party mail form** -- there are a number of services that will handle this use case. Usually one embeds a small javascript widget.
* **no change** -- keep the current implementation and commit to ongoing maintenance. This involves multiple Firebase components (extensions, functions, firestore) and [deployment/test steps](https://github.com/dora-team/dora.dev/blob/630efcb729b29abe8f0dae5fe224c8a0dd9dd28a/ci/preview-infra.cloudbuild.yaml) in CI/CD

## Decision Outcome

Chosen option: **static page of instructions**, because it's an acceptable user experience and requires effectively zero maintenance. As a result, [much of the infrastructure has been disabled/turned down, and several files have been deleted](https://github.com/dora-team/dora.dev/issues/741). This improves our code maintainability.

## Pros and Cons of the Options

### simple mailto
* Pro: least effort to maintain
* Con: offers no guidance to users
* Con: doesn't automatically format message contents (as the prior solution did)
* Con: UX can be interruptive (bouncing from browser to email client)

### static page of instructions
* Pro: low effort to maintain
* Pro: offers guidance on how to contact DORA for various reasons
* Con: doesn't automatically format message contents (as the prior solution did)
* Con: UX can be interruptive (bouncing from browser to email client)

### complex mailto
* Pro: doesn't require server-side components
* Pro: automatically formats message contents
* Con: requires complex client-side code
* Con: UX can be interruptive (bouncing from browser to email client)

### third-party mail form
* Pro: Non-interruptive UX (no bounce from browser to email client)
* Con: Introduces a new dependency, on a third party

### no change
* Pro: Non-inerruptive UX (no bounce from browser to email client)
* Con: High maintenance burden

## More Information

One potential benefit of using a server-side solution (e.g. the previous Firebase implementation, or a third-party form) is that it may be less vulnerable to spamming. However, we have found that the new static solution has actually reduced spam. That's because the gmail client (which is used by the DORA team) is very good at spam detection, and we found that the previous Firebase implementation, while not deluged with spam, did allow a handful of spam messages to get through.