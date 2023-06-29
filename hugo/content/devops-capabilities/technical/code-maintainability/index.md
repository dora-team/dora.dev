---
title: "Code maintainability"
titleForHTMLHead: "DevOps Capabilities: Code Maintainability" # TODO: can we DRY this out?
date: 2023-03-27T09:48:50+01:00
category: technical
draft: false
headline: "Make it easy for developers to find, reuse, and change code, and keep dependencies up-to-date."
summary: "Make it easy for developers to find, reuse, and change code, and keep dependencies up-to-date."
---

It takes
[a lot of code](https://www.businessinsider.com/how-many-lines-of-code-it-takes-to-run-different-software-2017-2)
to run the systems we build: The Android operating system runs on 12 to 15
million lines of code, Google's monolithic code repository contains over 1
billion lines of code, and a typical smartphone app has 50,000 lines of code.

The 2019 State of DevOps Report from [DevOps Research and Assessment (DORA)](https://cloud.google.com/devops) research shows that the ability of teams to maintain their code
effectively is one of a number of technical practices that contribute positively
to success with
[continuous delivery](/devops-capabilities/technical/continuous-delivery).

If your team is doing a good job with code maintainability, the following are true:

-   It's easy for the team to find examples in the codebase, reuse other
    people's code, and change code maintained by other teams if necessary.
-   It's easy for the team to add new dependencies to their project, and to
    migrate to a new version of a dependency.
-   The team's dependencies are stable and rarely break the code.

These findings highlight the importance of making it easy for developers to
find, reuse, and change code across the whole organization's codebase, and also
of implementing practices and tools to help with dependency management.

Code maintainability is a capability that requires organization-wide
coordination, since it relies on being able to search, reuse, and change other
teams' code. Managing dependencies effectively is often a major source of pain
when working with large codebases and large organizations. Tooling that can help
avoid problems with dependencies or illuminate the consequences of code changes
can improve design decisions and code quality for all engineers, which in turn
enables them to work faster and create more stable, reliable software.

## How to implement code maintainability

In terms of implementation, it's worth dealing with source code management and
dependency management separately, although it's possible for a solution (such as
the monolithic repository or *monorepo* pattern used by Google) to address both
concerns.

First, source code management. Enabling everybody to easily find, reuse, and
propose changes to any part of the codebase provides:

-   **Faster delivery:** In order to deliver software quickly, teams need
    to be able to see and propose changes to each other's code. Making this as
    easy as possible helps transfer knowledge across the organization, and
    helps unblock teams who need to make changes to other parts of the codebase
    in order to get their work done.
-   **Higher levels of stability and availability:** In the event of an
    incident, it's essential to be able to rapidly find and propose changes to
    any part of the codebase.
-   **Higher code quality:** Refactoring code to improve its internal
    quality often involves making changes to multiple parts of the codebase. If
    this is hard, it reduces the likelihood that people will perform
    refactorings, and increases the cost of doing so. Some organizations,
    including Google, run cross-team code maintenance projects where
    individuals go through the codebase fixing maintenance-level items, which
    relies on the ability to easily access and change code across the organization.

Being able to find examples and reuse other people's code depends on being
able to easily access and search the entire organization's source code. The
simplest way to implement this requirement is to use a single version control
platform for the whole organization's code — even if that code is split between
multiple repositories within the platform. The more separate version control
platforms are in use, the harder it is to find code.

Some organizations will want to keep parts of the codebase locked down so that
only people with a need to know can view that part of the codebase (Google is
one example of such an organization). Ideally this should be the exception
rather than the rule, and software should be architected to minimize the surface
area of confidential source code. In many cases, logical segregation of
confidential code using the version control system's access control mechanism is
sufficient.

It should also be possible to change code maintained by other teams. Typically
such changes will require approval from the team that is responsible for
maintaining the code in question. Mechanisms such as pull requests, where a
branch is created in version control and approval results in merging of the
branch, can minimize the friction of allowing other teams to propose changes,
while also preventing
[unauthorized changes](/devops-capabilities/process/streamlining-change-approval),
and enforcing information security controls such as segregation of duties.

Next, consider dependencies. Making it easy for teams to add and update
dependencies, and ensuring they are stable and rarely break code, means:

-   **Better security:** As dependencies age, it is more likely that
    vulnerabilities will be discovered in them. It is essential that
    dependencies are kept up-to-date, particularly after vulnerabilities are
    found and patched.
-   **Faster delivery:** Using libraries developed by other teams or
    organizations means you don't have to write your own code to do that job.
    When you have mechanisms in place to ensure dependencies are stable and
    rarely break code, you can spend more time on coding and less time on
    maintenance.

Dependency management is a common pain point for software development teams.
Keeping dependencies up-to-date and consistent across applications is complex,
time-consuming and expensive. Many organizations fail to allocate adequate
resources to this task, a problem that is exacerbated by inadequate processes
and tooling. This can represent a significant security risk when vulnerabilities
are inevitably discovered in dependencies, and the applications using them must
be updated.

It is essential to adopt and evolve processes and tooling that make it easy for
teams to consume known-good versions of dependencies and upgrade them rapidly,
including automated
[continuous integration](/devops-capabilities/technical/continuous-integration)
(CI) and
[testing](/devops-capabilities/technical/test-automation)
to discover if new versions of dependencies contain breaking changes), and to
quickly and simply correlate the versions of dependencies in use with the
systems that use them.

There are two commonly used models for including dependencies in your software:
vendoring and declarative manifests. In vendoring, either the source code or the
binary of every dependency is checked into version control along with the
application. Alternatively, most modern platforms have a dependency management
tool that manages dependencies specified in declarative manifest files checked
into version control (for example, Python's pip, Node.js's npm, R's CRAN, and
.NET's NuGet).

Whether you vendor or use manifests, the most important considerations are:

-   **Traceability:** Make sure you can trace back from any given package
    or deployment to the exact version of every dependency used to build it.
    Without this, it is impossible to debug problems caused by changes to
    dependencies.
-   **Reproducibility:** Your build process should be as deterministic as
    possible. Trying to debug problems caused by a build process that behaves
    differently on different machines is extremely painful.

### Implementing code maintainability at Google

Google implements code maintainability through an approach that is relatively
unusual. While our approach has trade-offs and is not for everyone, it does an
effective job of enabling teams to meet the objectives described in this
article.

Ninety-five percent of Google's software developers worldwide work on a shared,
monolithic codebase maintained through a centralized source control system,
using a
[trunk-based development](/devops-capabilities/technical/trunk-based-development)
model.
[In 2016](http://dl.acm.org/citation.cfm?id=2854146),
the Google codebase included "approximately one billion files and [had] a
history of approximately 35 million commits spanning Google's entire 18-year
existence. The repository contains 86 TB of data, including approximately two
billion lines of code in nine million unique source files."

Because all Google's code is kept in a single repository, it's easy to find and
change other teams' code. Google provides an internal search engine that allows
the entire codebase to be easily searched. Developers have a variety of tools
that enable them to create changelists for review and approval. Tests are run
against every changelist, and changelists can be updated and commented upon.
Google's code review tooling, similar to many other platforms, can suggest
reviewers for any given change. Each directory in the Google repository has an
OWNERS file that lists the people or groups who can approve changes to files in
that directory (similar functionality is available in
[GitHub](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners),
[GitLab](https://docs.gitlab.com/ee/user/project/code_owners.html),
and
[Bitbucket](https://marketplace.atlassian.com/apps/1218598/code-owners-for-bitbucket-server?hosting=server&tab=overview)).
Fast search, approver suggestions, and automated tests make proposing changes,
review, and collaboration both straightforward and robust.

Using these tools, large-scale refactorings that change multiple parts of the
codebase are relatively easy to perform and can be done atomically. Google has
built tooling that further simplifies and automates the process of making
changes that impact significant sections of the codebase. Google tooling
includes a build system called Blaze that is used to build and test any changes,
including dependencies, from source. (Parts of Blaze were released in the form
of the open source tool
[Bazel.](https://bazel.build/))
It's easy for anyone in Google to discover and propose changes to any part of
Google, including its infrastructure configuration which is also kept in the
same monolithic repository. Code sharing and reuse is straightforward.

Google also has controls in place to manage dependencies on open source
software. First, all open source software used at Google must have its source
checked in to Google's monolithic repository. Second, only one version of a
given library can be checked in to source control at any time. Third, all
software is statically linked and built from source. Finally, any time there is
a change in the source code of a library, it triggers rebuilds and automated
tests for all software which consumes that dependency.

These controls, combined with Google's powerful CI infrastructure, makes it
easy to keep our production systems up-to-date with new versions of
dependencies. They also help ensure that all systems use consistent versions of
a given library (removing the possibility of "diamond dependency" hell whereby a
product relies on two components that each, in turn, rely on *different
versions* of a common library, making the product impossible to build.)

The trade-off from Google's approach to managing dependencies on external code
is that it becomes harder to add new dependencies (one of the key outcomes of
code maintainability). Any new dependency must have its source code checked into
Google's monolithic repository, which means the code must be reviewed and tested
both initially and as part of any upgrades. However, this level of rigor helps
prevent code with security vulnerabilities making it into Google's products, and
ensures that all dependencies have clearly designated maintainers.

## Common pitfalls of implementing code maintainability

The main obstacles to making all code universally searchable and changeable by
anyone are tool support and organizational culture.

The first common pitfall is multiple version control repositories, or version
control repositories that have restrictive access settings. Organizations should
ideally have a single version control platform in which all their code is held.
The default access should ideally allow anybody in the organization to view any
source file, with the possibility to restrict access for sensitive files. There
should also be a way to search version control.

In contrast, organizations typically restrict who can make changes to version
control. This leads to the second pitfall: a lack of tooling and process for
people to make changes to parts of the codebase to which they do not have write
access. This can be a significant obstacle both to fixing problems caused —
often inadvertently — by other teams whose code you depend on. It also inhibits
refactorings that touch multiple parts of the codebase.

In order to mitigate this problem, some modern version control tools provide a
way to submit, review, approve, and audit change requests for parts of the
codebase to which users don't have write access.

Even given tooling support, organizations need to be comfortable with making
codebases available and searchable within the organization and potentially for
vendors and contractors. This may not be possible for organizations whose
version control repositories contain significant amounts of confidential
information and code that cannot be shared between teams.

Using binary dependencies is much more common, but each language has its own
toolchain for managing binary dependencies. Creating a standard strategy and
conventions that allow dependencies to be effectively managed and tracked
across these toolchains across the organization's entire software portfolio is a
complex undertaking. Significant investment in CI infrastructure that allows new
versions of libraries to be easily tested for compatibility with existing
systems — and for vulnerabilities — is necessary to make the process of
upgrading third-party libraries on a regular basis tractable.

In practice, most organizations leave it up to teams to manage their
dependencies, with highly variable results. As a result it is usually extremely
painful to respond rapidly and predictably in the event of a vulnerability being
discovered in a library: even finding the services affected is typically a
substantial archaeology project.

## How to measure code maintainability

Here are some simple ideas to get you started with measuring code
maintainability:

-   What percentage of your organization's codebase is searchable?
-   What is the median lead time to make a change to part of the codebase to
    which I don't have write access?
-   What percentage of our codebase is duplicate code? What percentage is
    unused?
-   What percentage of applications aren't using the most recent stable
    version of all the libraries they consume?
-   How many different versions of each library do we have in production?
    What's the median? What is a good goal? How many versions are more than 1
    year old?
-   How often do teams upgrade their libraries? How long does it take to do
    this?

When considering what to measure, there are three use cases to focus on:

-   Managing technical and design debt
-   Change management (including emergency changes)
-   Patching vulnerabilities.

As codebases grow, technical debt is a major concern. It's important to be able
to refactor and [re-architect code](/devops-capabilities/technical/loosely-coupled-architecture/)
as organizations and the products they and
their customers rely on evolve. For large codebases, this can be complex and
painful without significant tool support. It is also important to be able to
identify code that is unused, duplicated, has poor test coverage, or contains
vulnerabilities. The first step is to ensure that your tooling enables you to
establish and track metrics that identify areas for improvement and make it
straightforward to take action safely.

The second step is
[change management](/devops-capabilities/technical/database-change-management/).
When someone makes a change to part of the codebase,
to what extent does your tooling help you detect the impact of that change? If
another team is impacted, how fast can they take action to remedy the problem,
particularly if the fix lies in a different area of the codebase? When an
emergency change must be made, how long does it take to get the necessary code
changes into the codebase, tested, and released?

Establish and track metrics so you can track how long
changes take to propagate through your processes. Then identify bottlenecks and
work to improve your processes, adding tool support where appropriate. Watch out
for "emergency" processes that bypass validations and approvals in order to gain
speed — the goal should be to have your regular process be both reliable and
fast enough to be effective in an emergency.

Patching vulnerabilities is a particularly important change management
scenario. When a vulnerability is discovered in a library, how long does it take
to discover and patch software that uses the vulnerable versions of the library?
If you're not sure, this is worth testing on a regular basis. Given the enormous
potential costs of handling breaches and data and code exfiltration, and the
frequency of such attacks, it is typically worth devoting significant resources
to making sure third-party software you rely on is up-to-date and can be easily
upgraded in the event of vulnerabilities being discovered.

## What's next

-  For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   [Why Google Stores Billions of Lines of Code in a Single Repository](https://research.google/pubs/pub45424/)
-    [Rachel Potvin's presentation on Google's monolithic code repository](https://www.youtube.com/watch?v=W71BTkUbdqE)
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.