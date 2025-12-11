---
title: "Version control"
titleForHTMLHead: "Capabilities: Version Control" # TODO: can we DRY this out?
slug: version-control
core: true
ai: true
date: 2023-03-27T09:48:51+01:00
updated: 2025-12-09
category: fast flow
draft: false
headline: "Version control ensures reproducibility and traceability, serving as a critical safety net as AI accelerates the velocity of change."
summary: "The use of a version control system, such as Git or Subversion, for all production artifacts, including application code, application configurations, system configurations, and scripts for automating build and configuration of environments."
---

Version control systems like Git, Subversion, and Mercurial provide a logical
means to organize files and coordinate their creation, controlled access,
updating, and deletion across teams and organizations. Version control is
closely related to automation. In fact, automation and
[continuous integration](/capabilities/continuous-integration) rely on these
files for the source code of the automation itself, as well as the
configuration to be automated and the data to be distributed.

> Research consistently shows that comprehensive use of version control predicts continuous delivery. In the era of AI, this capability is even more potent: strong version control practices **amplify the positive impact of AI adoption on individual effectiveness and team performance**.

In order to improve software delivery, teams need to use version control for
source code, test and deployment scripts, infrastructure and application
configuration information, and the many libraries and packages they depend upon.
In the version control system, teams must be able to query the current (and
historical) state of their environments. Version control also offers direct
benefits such as disaster recovery and auditability.

In particular, version control helps you meet these critical requirements:

* **Reproducibility**. Teams must be able to provision any environment in
    a fully automated fashion, and know that any new environment reproduced
    from the same configuration is identical. A prerequisite for achieving this
    goal is having the scripts and configuration information that are required
    to provision an environment stored in a shared, accessible system.

* **Traceability**. Teams should be able to pick any environment and
    determine quickly and precisely the versions of every dependency
    used to create that environment. They should also be able to compare two
    versions of an environment and see what has changed between them.

These capabilities give teams several important benefits:

* **Disaster recovery**. When something goes wrong with an
    environment—for example, a hardware failure or a security breach—teams need
    to be able to reproduce that environment in a deterministic amount of time
    in order to be able to restore service.

* **Auditability**. To demonstrate the integrity of the delivery process,
    teams must be able to show the path backward from every deployment to the
    elements it came from, including their version. You enable this through
    comprehensive configuration management combined with deployment pipelines.

* **Higher quality**. The software delivery process is often subject to
    long delays waiting for development, testing, and production environments
    to be prepared. When this preparation can be done automatically from
    version control, teams can get feedback on the impact of their changes more
    rapidly, enabling teams to build quality into their software.

* **Capacity management**. When teams want to add more capacity to their
    environments, the ability to create reproductions of existing servers is
    essential. This capability enables the horizontal scaling of modern
    cloud-based distributed systems.

* **Response to defects**. When teams discover a critical defect, or a
    vulnerability in some component of their system, they need to release a new
    version of their software as quickly as possible. Storing all artifacts in
    version control means teams can roll back to a previously verified working
    state quickly and reliably.

As environments become more complex and heterogeneous, it's progressively
harder to achieve these goals. It's impossible to achieve perfect
reproducibility and traceability for a complex enterprise
system (at a minimum, every real system has state). Thus, a key part
of configuration management is working to simplify the architecture,
environments, and processes to reduce the investment required to achieve the
expected benefits.

## The AI angle: The safety net for speed

As organizations adopt AI, the volume and velocity of code generation are dramatically increasing. While this boosts throughput, it is often associated with increased software delivery instability. Strong version control practices are the essential safety net that allows teams to experiment with AI-generated code confidently.

AI transforms the principle of frequent commits from a best practice into a critical safeguard. Because AI tools can introduce powerful nondeterminism into a developer's workflow, the "trial and error" cycle makes the old "commit when ready" model insufficient. To effectively harness AI, developers must bring the discipline of the outer loop (clean, reviewable changes) into their inner loop, creating small, frequent commits at every clean state.

Furthermore, version control is now the place to store AI artifacts. Teams should version **AI prompts** to share knowledge and create audit trails, as well as **agent configuration files** (like `GEMINI.md` or `CLAUDE.md`) to establish team norms and guardrails for AI assistants.

## Why this matters now

> We are bringing AI into our workflow to move faster, but that speed comes with risk. Version control is our safety net. It allows us to revert AI-generated mistakes instantly and gives us a history we can audit. If we don't version everything—including our AI prompts and configurations—we are moving fast with no brakes. Investing in these practices now is what allows us to be aggressive with innovation later.


## How to implement version control

When implementing version control, we recommend that you start by defining in
measurable terms the goals you want to achieve. This allows you and your teams
to determine the best path to reach those goals. This approach also lets you
change direction or reassess those goals if the path you choose is too expensive
or takes too long.

A version control system records changes to files stored in the system. These
files can be source code, assets, or other documents that might be part of a
software development project. Teams make changes in groups called _commits_ or
_revisions_. Each revision, along with metadata related to the revision (such as
who made the change and when), is stored in the system. This allows teams to
commit, compare, merge, and restore to previous revisions. It also minimizes
risks by establishing a way to revert objects in production to previous
versions.

Teams must be able to restore production services repeatedly and predictably
(and, ideally, quickly) even when catastrophic events occur, so they must check
in the following assets to their shared version control repository:

* All application code and dependencies (for example, libraries and
    static content)
* Any script used to create database schemas, application reference data,
    and so on
* All environment creation tools and artifacts described in the
    previous step (for example, VMware image building scripts or
    Terraform files)
* Any file used to create and compose containers (for example, Docker
    files and buildpacks)
* All supporting automated tests and any manual test scripts
* Any script that supports code packaging, deployment, database migration,
    and environment provisioning
* Supporting project artifacts (for example, requirements documentation,
    deployment procedures, and release notes)
* AI artifacts (for example, prompts and agent configuration files)
* Container orchestration (for example, Kubernetes configuration, OpenShift
    configuration, and Docker Swarm configuration)
* All cloud configuration files (for example,
    [Infrastructure Manager](https://docs.cloud.google.com/infrastructure-manager/docs)
    configuration, AWS Cloudformation templates, Microsoft Azure Stack
    DSC files, OpenStack HEAT, and Pulumi stacks)
* Any other script or configuration information required to create
    infrastructure that supports multiple services (for example, enterprise
    service buses, database management systems, DNS zone files, configuration
    rules for firewalls, and other networking devices)

Version control can take many forms, apart from traditional file-based version
control systems like Git. Teams might have multiple repositories for different
types of objects and services that are versioned, labeled, and tagged alongside
their source code. For instance, they might store large virtual machine images,
ISO files, compiled binaries, and so forth in artifact repositories such as
[Google Cloud Artifact Registry](https://cloud.google.com/artifact-registry/),
Nexus, or Artifactory. Alternatively, they might put objects in blob stores such
as [Google Cloud Storage](https://cloud.google.com/storage) or Amazon S3. These
approaches meet the requirements of reproducibility and traceability, and
provide the same benefits.

More than re-creating any previous state of the production environment, teams
must also be able to re-create the preproduction and build processes.
Consequently, they also need to check into version control everything their
build processes rely on, including tools and the environments they depend upon.

## Common pitfalls in version control

* **Limited application:** Applying version control only to software application code. Best practice requires the ability to reproduce all testing and production environments.
* **Neglecting the inner loop:** With AI, developers may generate code rapidly but delay committing until a feature is "perfect." This loses the safety of version history. Bring the discipline of small, frequent commits into the local development workflow.
* **Merge conflicts:** Frequent or complex merge conflicts are often a sign of process issues, such as long-lived branches. This is exacerbated by the high volume of code AI can produce.

## Ways to improve version control

You can improve version control in many ways. Here a few we recommend:

* Ensure that every commit to version control triggers the automated
    creation of packages that can be deployed to any environment using *only*
    information in version control.
* Make it possible to create production-like test environments on demand
    using only scripts and configuration information from version control, and
    to create packages using the automated process described in
    the previous approach.
* Script testing and production infrastructure so that teams can add
    capacity or recover from disasters in a fully automated fashion.

As you implement a version control system, focus on your constraints. For
example, what's the biggest blocker to the fast flow of changes from version
control to production? Are your builds too slow? Is it hard to re-create
deployable packages? Is it difficult to create production-like test
environments? These constraints can make it hard to achieve your goals, and
might indicate a problem to work on with your system's
[architecture](/capabilities/loosely-coupled-teams).

## Ways to measure version control

To measure how effectively your teams are using version control in their
systems, try these recommendations:

* **Commit frequency:** How frequently do you commit changes? High frequency is associated with higher individual effectiveness, especially when using AI.
* **Rollback reliance:** How much do you rely on the ability to revert changes? Frequent use of rollbacks amplifies the positive influence of AI on team performance.
* **Application code**. Do you use version control for application code?
    What percentage of application code do you store in version control? How
    easily and quickly can a team recover application code from the version
    control system?

* **System configurations**. Do you use version control for system
    configurations? What percentage of system configurations do you store in
    version control? How easily and quickly can teams reconfigure systems from
    version control?

* **Application configuration**. Do you use version control for
    application configurations? What percentage of application configurations
    do you store in version control? How easily and quickly can teams
    reconfigure applications from code in the version control system?

* **Scripts for automating build and configuration.** Do you keep scripts
    for automating build and configuration in version control? What percentage
    do you store in version control? How quickly and easily can you reprovision
    systems by using scripts from version control?

These recommendations are just the beginning, but they're essential, so we
suggest that you start with them and learn how to do them well. Then review this
article and identify additional artifacts that you use in developing and
delivering software, and ask similar questions: What percentage of those
artifacts are in version control? How quickly and easily can your team deploy
new systems or configurations using assets from version control?

## More from DORA

Read more about version control in the following publications:

* [DORA AI Capabilities Model reprot](/ai/ai-capabilities-model/report/)
* [2025 State of AI-assisted Software Development](/research/2025/dora-report)
* [Accelerate State of DevOps Report 2022](https://dora.dev/research/2022/dora-report/)
* [Accelerate State of DevOps Report 2019](https://dora.dev/research/2019/dora-report/)
* [State of DevOps Report 2014](https://dora.dev/research/2014/)

## What's next

* Explore Google Cloud products referenced in this article
  * [Google Cloud Artifact Registry](https://cloud.google.com/artifact-registry/)
  * [Google Cloud Storage](https://cloud.google.com/storage)
  * [Google Cloud Infrastructure Manager](https://docs.cloud.google.com/infrastructure-manager/docs)
* Take the
    [DORA quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
* Explore the [DORA AI Capabilities Model](/capabilities/ai/) to see how version control fits into a successful AI strategy.
