---
title: "Continuous integration"
titleForHTMLHead: "DevOps Capabilities: Continuous Integration" # TODO: can we DRY this out?
date: 2023-03-27T09:48:50+01:00
category: technical
draft: false
headline: "Learn about common mistakes, ways to measure, and how to improve on your continuous integration efforts."
summary: "Learn about common mistakes, ways to measure, and how to improve on your continuous integration efforts."
---

Software systems are complex, and an apparently simple, self-contained change
to a single file can have unintended side effects on the overall system. When a
large number of developers work on related systems, coordinating code updates is
a hard problem, and changes from different developers can be incompatible.

The practice of continuous integration (CI) was created to address these
problems. CI follows the
[principle](https://martinfowler.com/articles/originalContinuousIntegration.html)
that if something takes a lot of time and energy, you should do it more often,
forcing you to make it less painful. By creating rapid feedback loops and
ensuring that developers work in small batches, CI enables teams to produce high
quality software, to reduce the cost of ongoing software development and
maintenance, and to increase the productivity of the teams.

## How to implement CI

When your organization practices CI, your developers integrate all their work
into the
[main version of the code base](/devops-capabilities/technical/trunk-based-development)
(known as
[*trunk*](/devops-capabilities/technical/trunk-based-development),
*main*, or *mainline*) on a regular basis. DevOps Research and Assessment
(DORA)
[research](/publications/pdf/state-of-devops-2015.pdf#page=20)
(PDF) shows that teams perform better when developers merge their work into
trunk at least daily. A set of automated tests is run both before and after the
merge in order to validate that the changes don't introduce regression bugs. If
these automated tests fail, the team stops what they are doing to fix the
problem immediately.

CI ensures that the software is always in a working state, and that developer
branches don't diverge significantly from trunk. The benefits of CI are
significant:
[research](/publications/pdf/state-of-devops-2015.pdf#page=16)
(PDF) shows that it leads to higher deployment frequency, more stable systems,
and higher quality software.

The key elements in successfully implementing continuous integration are:

-   Each commit should trigger a build of the software.
-   Each commit should trigger a series of automated tests that provide
    feedback in a few minutes.

To implement these elements, you need the following:

-   **An automated build process**. The first step in CI is having an
    automated script that creates packages that can be deployed to any
    environment. The packages created by the CI build should be authoritative
    and used by all downstream processes. These builds should be numbered and
    repeatable. You should run your build process successfully at least once a day.
-   **A suite of
    [automated tests](/devops-capabilities/technical/test-automation)**.
    If you don't have any, start by writing a handful of unit and
    [acceptance tests](/publications/pdf/state-of-devops-2014.pdf#page=14)
    (PDF) that cover the high-value functionality of your system. Make sure that
    the tests are reliable. That way, when they fail, you know there's a real
    problem, and when they pass, you're confident there are no serious problems
    with the system. Then ensure that all new functionality is covered by
    tests. Those tests should run quickly, to give developers feedback as soon
    as possible. Your tests should run successfully at least once a day.
    Ultimately, if you have performance and acceptance tests, the developers
    should get feedback from them daily.
-   **A CI system that runs the build and automated tests on every
    check-in**. The system should also make the status visible to the team. You
    can have some fun with this—for example, you can use klaxons or traffic
    lights to indicate when the build is broken. Don't use email notifications;
    many people ignore email notifications or create a filter that hides
    notifications. Notifications in a chat system is a better and more popular
    way of achieving this.

Continuous integration,
[as defined](https://www.martinfowler.com/articles/continuousIntegration.html)
by Kent Beck and the Extreme Programming community where the term originated,
also includes two further practices, which are also predictive of higher
software delivery performance:

-   The practice of
    [trunk-based development](/devops-capabilities/technical/trunk-based-development)
    in which developers work off trunk/mainline in
    [small batches](/devops-capabilities/process/working-in-small-batches).
    They merge their work into a shared trunk/mainline at least daily, rather
    than working on long-lived feature branches.
-   An agreement that when the build breaks, fixing it should
    [take priority over any other work](/devops-capabilities/technical/trunk-based-development).

CI requires
[automated unit tests](/devops-capabilities/technical/test-automation).
These tests should be comprehensive enough to give you confidence that the
software works as expected. The tests must also run in a few minutes or less. If
the automated unit tests take longer to run, developers won't want to run them
frequently. If the tests are run infrequently, then a test failure can originate
from many different changes, making it hard to debug. Tests that are run
infrequently are hard to maintain.

Creating maintainable suites of automated unit tests is complex. A good way to
solve this problem is to practice
[test-driven development](https://wikipedia.org/wiki/Test-driven_development)
(TDD), in which developers write automated tests that initially fail, before
they implement the code that makes the tests pass. TDD has several benefits, one
of which is that it ensures developers write code that's modular and easy to
test, which reduces the maintenance cost of the resulting automated test suites.
Many organizations don't have maintainable suites of automated unit tests and,
despite that, still don't practice TDD.

### Objections to CI

As described earlier, CI is sometimes considered a controversial practice. CI
requires your developers to break up large features and other changes into
[smaller incremental steps](/devops-capabilities/process/working-in-small-batches)
that can be integrated frequently into trunk. This is a change for developers
who aren't used to working in this way. In addition, when teams switch to using
small steps, it can take longer to get large features completed. However, in
general, you don't want to optimize for the speed at which developers can
declare a large feature as completed on a branch. Rather, you want to be able to
get changes reviewed, integrated, tested, and deployed as fast as possible. This
process results in software development and delivery that is
[faster and more stable](/publications/pdf/state-of-devops-2016.pdf#page=35)
(PDF) when the changes are small and self-contained, and the branches they live
on are short-lived. Working in small batches also ensures that developers get
regular feedback on the impact of their work on the system as a whole—from other
developers, testers, and customers, as well as from automated performance and
security tests. This in turn makes it easier and quicker to detect, triage, and
fix any problems.

Despite these objections, helping software development teams implement
continuous integration should be the number one priority for any organization
wanting to start the journey to continuous delivery.

## Common pitfalls

Some common pitfalls that prevent wide adoption of CI include the following:

-   **Not putting everything into the code repository**. Everything that's
    needed to build and configure the application and the system should be in
    your repository. This might seem outside of the scope of CI, but it's an
    important foundation.
-   **Not automating the build process**. Manual steps create opportunities
    for mistakes and leave steps undocumented.
-   **Not triggering quick tests on every change**. Full end-to-end tests
    are necessary, but quick tests (usually unit tests) are also important in
    order to enable fast feedback.
-   **Not fixing broken builds right away**. A key goal of CI is having a
    stable build from which everyone can develop. If the build can't be fixed
    in a few minutes, the change that caused the build to break should be
    identified and reverted.
-   **Having tests that take too long to run**. The tests should not take
    more than a few minutes to run, with an upper limit of about 10 minutes
    [according to DORA's research](/publications/pdf/state-of-devops-2018.pdf#page=56)
    (PDF). If your build takes longer than this, you should improve the
    efficiency of your tests, add more compute resources so you can run them in
    parallel, or split out longer-running tests into a separate build using the
    [deployment pipeline pattern](https://continuousdelivery.com/implementing/patterns/#the-deployment-pipeline).
-   **Not merging into trunk often enough**. Many organizations have
    automated tests and builds, but don't enforce a daily merge into trunk.
    This leads to long-lived branches that are much harder to integrate, and to
    long feedback loops for the developers.

## Ways to measure CI

The CI concepts discussed earlier outline ways to measure the effectiveness of
CI in your systems and development environment, as shown in the following table.
Gathering these metrics allows you to optimize your processes and tooling for
them. This leads to better CI practices and to shorter feedback loops for your
developers.

<table>
  <colgroup>
    <col width="50%">
    <col width="50%">
  </colgroup>
<thead>
<tr>
<th><strong>Factor to test</strong></th>
<th><strong>What to measure</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Code commits trigger a build of the software</td>
<td>The percentage of code commits that result in a software build without
manual intervention.</td>
</tr>
<tr>
<td>Code commits trigger a series of automated tests</td>
<td>The percentage of code commits that result in a suite of automated tests
being run without manual intervention.</td>
</tr>
<tr>
<td>Automated builds and tests are executed successfully every day</td>
<td>The percentage of automated builds and the percentage of automated tests
that are executed successfully every day.</td>
</tr>
<tr>
<td>Current builds are available to testers for exploratory testing</td>
<td>The availability of builds to testers, or its inverse, namely the
unavailability of builds to testers.</td>
</tr>
<tr>
<td>Developers get feedback from the acceptance and performance tests every
day</td>
<td>The availability of feedback to developers from acceptance and performance
tests— that is, the percentage of tests that provide feedback that is
available to developers within a day.</td>
</tr>
<tr>
<td>Broken builds are fixed immediately</td>
<td>The time it takes between the build breaking and having it fixed, either
with a check-in that fixes the problem, or by reverting the breaking
change.</td>
</tr>
</tbody>
</table>

## What's next?
-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Read more about Google Cloud
    [continuous integration solutions](https://cloud.google.com/solutions/continuous-integration).
-   Read the
    [SRE Book](https://landing.google.com/sre/books/),
    in particular
    [Chapter 8 - Release Engineering](https://landing.google.com/sre/sre-book/chapters/release-engineering/).
-   Read James Shore's article 
    [CI on a dollar a day](https://www.jamesshore.com/Blog/Continuous-Integration-on-a-Dollar-a-Day.html).
-   Watch Google's John Penix describe
    [how Google practices CI at scale](https://www.infoq.com/presentations/Continuous-Testing-Build-Cloud/).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
