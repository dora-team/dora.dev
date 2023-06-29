---
title: "Working in small batches"
titleForHTMLHead: "DevOps Capabilities: Working in Small Batches" # TODO: can we DRY this out?
date: 2023-03-24T12:54:18Z
category: process
draft: false
headline: "Create shorter lead times and faster feedback loops by working in small batches. Learn common obstacles to this critical capability and how to overcome them."
summary: "Create shorter lead times and faster feedback loops by working in small batches. Learn common obstacles to this critical capability and how to overcome them."
---

Working in small batches is an essential principle in any discipline where
feedback loops are important, or you want to learn quickly from your
decisions. Working in small batches allows you to rapidly test hypotheses about
whether a particular improvement is likely to have the effect you want, and if
not, lets you course correct or revisit assumptions. Although this article
applies to any type of change that includes organizational transformation and
process improvement, it focuses primarily on software delivery.

Working in small batches is part of lean product management. Together with
capabilities like
[visibility of work in the value stream](/devops-capabilities/process/work-visibility-in-value-stream),
[team experimentation](/devops-capabilities/process/team-experimentation),
and
[visibility into customer feedback](/devops-capabilities/process/customer-feedback), working in small batches predicts software
delivery performance and organizational performance.

One reason work is done in large batches is because of
[the large fixed cost of handing off changes](/devops-capabilities/process/streamlining-change-approval).
In traditional phased approaches to software development, handoffs from
development to test or from test to IT operations consist of whole releases:
months worth of work by teams consisting of tens or hundreds of people. With
this traditional approach, collecting feedback on a change can take weeks or
months.

In contrast, DevOps practices, which utilize cross-functional teams and
lightweight approaches, allow for software to progress from development through
test and operations into production in a matter of minutes. However, this
rapid progression requires working with code in small batches.

Working in small batches has many benefits:

-   It reduces the time it takes to get feedback on changes, making it
    easier to triage and remediate problems.
-   It increases efficiency and motivation.
-   It prevents your organization from succumbing to the sunk-cost fallacy.

You can apply the small batches approach at the feature and the product level.
As an illustration, a minimum viable product, or MVP, is a prototype of a
product with just enough features to enable validated learning about the product
and its business model.

Continuous delivery builds upon working in small batches and tries to get every
change in version control as early as possible. A goal of continuous
delivery is to change the economics of the software delivery process, making it
viable to work in small batches. This approach provides fast, comprehensive
feedback to teams so that they can improve their work.

## How to work in small batches

When you plan new features, try to break them down into work units that can be
completed independently and in short timeframes. We recommend that each feature
or batch of work follow the agile concept of the
[INVEST principle](https://wikipedia.org/wiki/INVEST_(mnemonic)):

-   **Independent**. Make batches of work as independent as possible from
    other batches, so that teams can work on them in any order, and deploy and
    validate them independent of other batches of work.
-   **Negotiable**. Each batch of work is iterable and can be renegotiated
    as feedback is received.
-   **Valuable**. Discrete batches of work are usable and provide value to
    the stakeholders.
-   **Estimable**. Enough information exists about the batches of work that
    you can easily estimate the scope.
-   **Small**. During a sprint, you should be able to complete batches of work
    in small increments of time, meaning hours to a couple days.
-   **Testable**. Each batch of work can be tested, monitored, and verified
    as working in the way users expect.

When features are of an appropriate size, you can split the development of the
feature into even smaller batches. This process can be difficult and requires
experience to develop. Ideally, your developers should be checking multiple
small releasable changes
[into trunk at least once per day](/devops-capabilities/technical/trunk-based-development).

The key is to start development at the service or API layer, not at the UI
layer. In this way, you can make additions to the API that won't initially be
available to users of the app, and check those changes into trunk. You can
launch these changes to production without making them visible to users. This
approach, called _dark launching_, allows developers to check in code for small
batches that have been completed, but for features that are not yet fully
complete. You can then run
[automated tests](/devops-capabilities/technical/test-automation)
against these changes to prove that they behave in the expected way. This way,
teams are still working quickly and
[developing off of trunk](/devops-capabilities/technical/trunk-based-development)
and not long-lived feature branches.

You can also dark launch changes by using a
[feature toggle](https://martinfowler.com/bliki/FeatureToggle.html),
which is a conditional statement based on configuration settings. For example,
you can make UI elements visible or invisible, or you can enable or disable
service logic. Feature-toggle configuration might be read either at deploy time or
runtime. You can use these configuration settings to switch the behavior of new
code further down the stack. You can also use similar technique known as
[branch by abstraction](https://continuousdelivery.com/2011/05/make-large-scale-changes-incrementally-with-branch-by-abstraction/)
to make larger-scale changes to the system while continuing to develop and
release off-trunk without the use of long-lived feature branches.

In this approach, batches of work aren't complete until they're deployed to
production and the feedback process has begun to validate the changes. Feedback
comes from many sources and in many forms, including users, system monitoring,
quality assurance, and automated tests. Your goal is to optimize for speed so
that you reduce the cycle time to get changes into the hands of users. This way,
you can validate your hypothesis as quickly as possible.

## Common pitfalls with working in small batches

When you break down work into small batches, you encounter two pitfalls:

-   **Not breaking up work into small enough pieces**. Your first task is
    to break down the work in a meaningful way. We recommend that you commit
    code independent of the status of the feature and that individual features
    take no more than a few days to develop. Any batch of code that takes longer
    than a week to complete and check is too big. Throughout the development
    process, it's essential that you analyze how to break down ideas into
    increments that you can develop iteratively.

-   **Working in small batches but then regrouping the batches before
    sending them downstream for testing or release**. Regrouping work in this
    way delays the feedback on whether the changes have defects, and whether
    your users and your organization agree the changes were the right thing to
    build in the first place.

## Ways to reduce the size of work batches

When you slice work into small batches that can be completed in hours, you can
typically
[test and deploy those batches to production in less than an hour](https://services.google.com/fh/files/misc/state-of-devops-2016.pdf)
(PDF). The key is to decompose the work into small features that allow for rapid
development, rather than developing complex features on branches and releasing
them infrequently.

To improve small batch development, check your environment and confirm that the
following conditions are true:

-   Work is decomposed in a way that enables teams to make more frequent
    production releases.
-   Developers are experienced in breaking down work into small changes that
    can be completed in the space of hours, not days.

To become an expert in small batch development, strive to meet each of these conditions in
all of your development teams. This practice is a necessary condition for both
[continuous integration](/devops-capabilities/technical/continuous-integration)
and
[trunk-based development](/devops-capabilities/technical/trunk-based-development).

## Ways to measure the size of work batches

When you understand
[continuous integration](/devops-capabilities/technical/continuous-integration)
and
[monitoring](/devops-capabilities/process/monitoring-systems),
you can outline possible ways to measure small batch development in your systems
and development environment.

-   **Application features are decomposed in a way that supports frequent
    releases**. How often are releases possible? How does this release cadence
    differ across teams? Are delays in production related to features that are
    larger?
-   **Application features are sliced in a way that lets developers complete
    the work in one week or less**. What proportion of features can you
    complete in one week or less? What features can't you complete in one week
    or less? Can you commit and release changes before the feature is complete?
-   **MVPs are defined and set as goals for teams**. Is the work decomposed
    into features that allow for MVPs and rapid development, rather than
    complex and lengthy processes?

Your measurements depend on the following:

-   Knowing your organization's processes.
-   Setting goals for reducing waste.
-   Looking for ways to reduce complexity in the development process.

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.