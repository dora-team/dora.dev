---
title: "Deployment automation"
titleForHTMLHead: "DevOps Capabilities: Deployment Automation" # TODO: can we DRY this out?
date: 2023-03-27T09:48:50+01:00
category: technical
draft: false
headline: "Best practices and approaches for deployment automation and reducing manual intervention in the release process."
summary: "Best practices and approaches for deployment automation and reducing manual intervention in the release process."
---

Deployment automation is what enables you to deploy your software to testing
and production environments with the push of a button. Automation is essential
to reduce the risk of production deployments. It's also essential for providing
fast feedback on the quality of your software by allowing teams to do
comprehensive testing as soon as possible after changes.

An automated deployment process has the following inputs:

-   Packages created by the continuous integration (CI) process (these
    packages should be deployable to any environment, including production).
-   Scripts to configure the environment, deploy the packages, and perform a
    deployment test (sometimes known as a *smoke test*).
-   Environment-specific configuration information.

We recommend that you store the scripts and configuration information in
version control. Your deployment process should download the packages from an
artifact repository (for example,
[Artifact Registry](https://cloud.google.com/artifact-registry),
[Nexus](https://www.sonatype.com/nexus-repository-sonatype),
[Artifactory](https://jfrog.com/artifactory/),
or your CI tool's built-in repository).

The scripts usually perform the following tasks:

1.  Prepare the target environment, perhaps by installing and configuring
    any necessary software, or by starting up a virtual host from a
    pre-prepared image in a cloud provider such as Google Cloud.
2.  Deploy the packages.
3.  Perform any deployment-related tasks such as running database migration
    scripts.
4.  Perform any required configuration.
5.  Perform a deployment test to make sure that any necessary external
    services are reachable, and that the system is functioning.

## How to implement deployment automation

When you design your automated deployment process, we recommend that you follow
these best practices:

-   **Use the same deployment process for every environment, including
    production.** This rule helps ensure that you test the deployment process
    many times before you use it to deploy to production.
-   **Allow anyone with the necessary credentials to deploy any version of
    the artifact to any environment on demand in a fully automated fashion.**
    If you have to create a ticket and wait for someone to prepare an
    environment, you don't have a fully automated deployment process.
-   **Use the same packages for every environment.** This rule means that
    you should keep environment-specific configuration separate from packages.
    That way, you know that the packages you are deploying to production are
    the same ones that you tested.
-   **Make it possible to recreate the state of any environment from
    information stored in version control.** This rule helps ensure that
    deployments are repeatable, and that in the event of a disaster recovery
    scenario, you can restore the state of production in a deterministic way.

Ideally, you have a tool that you can use autonomously to make deployments,
that records which builds are currently in each environment, and that records
the output of the deployment process for audit purposes. Many CI tools have such
features.

## Common pitfalls in deployment automation

When you automate your deployment process, you face the following pitfalls:

-   Complexity of the existing process.
-   Dependencies between services.
-   Components that are not designed for automation.
-   Poor collaboration between teams.

### Complexity

The first pitfall is complexity. Automating a complex, fragile manual process
produces a complex, fragile automated process. You first need to re-architect
for deployability. This means making the deployment script as simple as possible
and pushing the complexity into the application code and infrastructure
platform. Look for deployment failure modes and ask how you could avoid them by
making your services, components, infrastructure platform, and monitoring
smarter. Cloud-native applications running on a platform-as-a-service such as
[App Engine](https://cloud.google.com/appengine),
[Cloud Run](https://cloud.google.com/run),
or
[Pivotal Cloud Foundry](https://cloud.google.com/migrate/kf/docs/2.11/concepts/compare-services)
can typically be deployed by running a single command, with no deployment
scripting required at all: this is the ideal process.

There are two important properties of a reliable deployment process. First, the
individual steps of the deployment process should be, to the greatest extent
possible, idempotent, so that you can repeat them as many times as needed in
the case of a failure. Second, they should be order independent, meaning that
components and services should not crash in an uncontrolled way if some other
component or service they are expecting is absent. Instead, the services should
continue to operate in a degraded fashion until their dependencies become
available.

For new products and services, we recommend that you treat these principles as
system requirements from the beginning of the design phase. If you are
retrofitting automation for an existing system, you might need to do some work
either to implement these characteristics or to build in telemetry such that the
deployment process can detect inconsistent states and fail gracefully.

### Dependencies

The second pitfall is that many deployment processes, particularly in
enterprise environments, require orchestration. In other words, you need to
deploy multiple services together in a particular order, while you perform other
tasks such as database migrations in strict synchronization. Although many
enterprise deployment workflow tools exist to help with this situation, these
tools are fundamentally band-aids over an architectural problem: tight coupling
between the various components and services. Over time, you must address this
tight coupling. The goal is that services should be independently deployable,
with no orchestration required.

This approach typically requires careful design to ensure that each service
supports backward compatibility, such that clients of the service don't require
upgrading in lock-step, but can be upgraded independently at a later date.
Techniques such as
[API versioning](https://cloud.google.com/architecture/migrating-a-monolithic-app-to-microservices-gke#api_contracts)
can help with this. It's also important to ensure that services can continue to
operate (perhaps with some functionality unavailable) even if they are unable to
connect to other services that they depend on. This design is good for
distributed systems, because it can help prevent cascading failures. Michael
Nygard's book "Release It!" describes a number of patterns to help with
designing distributed systems, including
[circuit breakers](https://martinfowler.com/bliki/CircuitBreaker.html).
You can even decouple database upgrades from the services they depend on by
using the
[parallel change pattern](https://martinfowler.com/bliki/ParallelChange.html).

### Not designed for automation

A third common pitfall is components that are not designed for automation. Any
deployment process that requires logging into a console and interacting manually
by clicking around should be a target for improvement. Today, most platforms
(including Google Cloud) offer an API that your deployment script can use. If
that's not the case, you need to be creative to avoid such manual intervention,
perhaps by finding the tool's underlying configuration file or database and
making changes to it directly, or by replacing it with another tool that does
have an API.

### Poor collaboration between teams

The last pitfall occurs when developers and IT operations teams aren't in sync.
This can happen in a few ways. For example, developers might use one method to
deploy and IT operations uses a different one. Or in another example, if the
environments are configured differently, you substantially increase the risk of
the deployment process being manually performed by IT operations, which
introduces inconsistencies and errors. The deployment automation process must be
created by developers and IT operations working together. This approach ensures
that both teams can understand, maintain, and evolve deployment automation.

## Ways to improve deployment automation

The first step is to document the existing deployment process in a common tool
that developers and operations have access to, such as Google Docs or a wiki.
Then work to incrementally simplify and automate the deployment process. This
approach typically includes the following tasks:

-   Packaging code in ways suitable for deployment.
-   Creating pre-configured virtual machine images or containers.
-   Automating the deployment and configuration of middleware.
-   Copying packages or files into the production environment.
-   Restarting servers, applications, or services.
-   Generating configuration files from templates.
-   Running automated deployment tests to make sure the system is working
    and correctly configured.
-   Running testing procedures.
-   Scripting and automating database migrations.

Work to remove manual steps, implement idempotence and order independence
wherever possible, and leverage the capabilities of your infrastructure platform
wherever possible. Remember: deployment automation should be as simple as
possible.

## Ways to measure deployment automation

Measuring deployment automation is straightforward.

-   **Count the number of manual steps in your deployment process**. Work
    to reduce those steps systematically. The number of manual steps increases
    the deployment time as well as the opportunity for error.
-   **Measure the level (or percentage) of automation in your deployment
    pipeline**. Work to increase that level continually.
-   **Determine the time spent on delays in the deployment pipeline**. As you
    work to reduce these delays, understand where and why code stalls in your
    deployment pipeline.

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Read more about Google Cloud's
    [continuous delivery solutions](https://cloud.google.com/solutions/continuous-delivery).
-   Read the
    [Site Reliability Engineering (SRE) book](https://landing.google.com/sre/books/),
    in particular
    [Chapter 8 - Release Engineering](https://landing.google.com/sre/sre-book/chapters/release-engineering/).
-   Read the
    [Four Principles of Low-Risk Software Releases](http://www.informit.com/articles/article.aspx?p=1833567).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.