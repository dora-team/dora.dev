---
title: "Cloud infrastructure"
titleForHTMLHead: "DevOps Capabilities: Cloud Infrastructure" # TODO: can we DRY this out?
date: 2023-03-27T09:48:50+01:00
category: technical
draft: false
headline: "Find out how to manage cloud infrastructure effectively so you can achieve higher levels of agility, availability, and cost visibility."
summary: "Find out how to manage cloud infrastructure effectively so you can achieve higher levels of agility, availability, and cost visibility."
---

Many organizations are adopting cloud computing. But there's more to cloud than
buying your infrastructure from a cloud provider. The US National Institute of
Standards and Technologies (NIST)
[defines](https://csrc.nist.gov/publications/detail/sp/800-145/final)
five essential characteristics of cloud computing:

-   **On demand self-service:** Consumers can provision computing resources
    as needed, without human interaction from the provider.
-   **Broad network access:** Capabilities can be accessed through diverse
    platforms such as mobile phones, tablets, laptops, and workstations.
-   **Resource pooling:** Provider resources are pooled in a multi-tenant
    model, with physical and virtual resources dynamically assigned on-demand.
    The customer may specify location at a higher level of abstraction such as
    country, state, or data center.
-   **Rapid elasticity:** Capabilities can be elastically provisioned and
    released to rapidly scale outward or inward on demand, appearing to be
    unlimited and able to be appropriated in any quantity at any time.
-   **Measured service:** Cloud systems automatically control, optimize, and
    report resource use based on the type of service such as storage,
    processing, bandwidth, and active user accounts.

The [2019 State of DevOps Report](/publications/pdf/state-of-devops-2019.pdf) found that only 29% of people who claim to have
adopted cloud technologies agreed or strongly agreed that they met all five of
the characteristics defined above. In both 2018 and 2019, DORA's research found
that elite performers were more than 23 times more likely to have met all five
essential cloud characteristics than low performers. This may explain why teams
and executives who claim to have adopted cloud computing technologies also
express frustration at not reaping the expected results.

Because many organizations still use their traditional datacenter practices and
processes to manage their cloud infrastructure, they can't achieve the expected
benefits, which according to DORA's research include:

-   Improved software delivery performance: faster throughput and higher
    levels of stability
-   Better service availability
-   Improved cost visibility: in 2019, we found that respondents who met all
    essential cloud characteristics are 2.6 times more likely to be able to
    accurately estimate the cost to operate software. They are also twice as
    likely to be able to easily identify their most operationally expensive
    applications.

For example, many organizations with cloud infrastructure do not allow
developers to self-service their environments on demand: they require them to
raise tickets or send emails and wait days for environments to be provisioned or
for configuration changes to be made. In this case, although the organization
may pay for a cloud service, they don't have a cloud by NIST's definition.

When moving to the cloud, organizations must invest in re-designing the
processes and practices that they implemented when they were using traditional
data centers. They must adopt cloud-native patterns and practices to achieve the
agility, stability, availability, and cost transparency of cloud computing. If
the underlying technology is in the cloud but the outcomes for practitioners
remain unchanged — days or weeks to obtain test environments, provision new
infrastructure, or get configuration changes made — then organizations will not
reap the results they want.

## How to implement cloud infrastructure

Adopting cloud-native processes and practices to implement NIST's five
characteristics involves substantial change by several IT functions, including
developers, operations teams, information security, procurement, and finance.
The changes require close collaboration between these functions in order to
identify and resolve conflicting aims.

For example, many developers expect complete control over production
infrastructure when using cloud platforms. Information security professionals
oppose this practice, and with good reason — without disciplined
[change management](/devops-capabilities/process/streamlining-change-approval),
cloud infrastructure can turn into a fragile work of art that is hard to manage,
vulnerable to external threats, and does not meet regulatory requirements.

However, developers can be empowered to provision the resources they require
while meeting these requirements. Many organizations have adopted the
*infrastructure as code* paradigm. (GitOps is an example.) Infrastructure
configuration is checked into version control, and developers can provision
environments, make configuration changes, and execute deployments through an
automated mechanism. The mechanism takes the code  from version control and
performs operations through the cloud's API on demand without human
intervention. Using version control and automation, all actions and their output
are logged to provide complete traceability and auditability of every change to
each environment.

Infrastructure-as-code allows you to manage changes effectively, and to apply
information security controls. For example, you can implement segregation of
duties by requiring all changes to the configuration specified in version
control to be
[approved by someone from a specified group of people](/devops-capabilities/process/streamlining-change-approval)
(as is done at Google). However, moving to Infrastructure-as-code requires
significant engineering effort and process change, including changing policies
for implementing information security controls.

Consider another example. While cloud providers typically only bill for
infrastructure while it is in use (meeting NIST's fifth characteristic, measured
service), this change from fixed-cost infrastructure to variable cost can have
significant implications for both procurement and finance. As described in the
2019 State of DevOps Report:

"Some in finance may say that the cloud has not led to cost savings
in the short-run, yet we know that it provides greater information
transparency. How can this be? While the cloud provides transparent
information about costs to the system owners, users do not pay for
these costs unless there is a chargeback model or similar mechanism.
This can lead to wildly variable costs that go unchecked, making cloud
costs unpredictable. In these scenarios, teams that pay for infrastructure
may prefer data centers because they are predictable, even though
their visibility disincentivizes system users to build more efficient
systems. We suggest organizations better align incentives so that
system owners have both visibility to build more efficient systems, and
the incentives to do so, by using chargeback or similar mechanisms."

In addition to considering how infrastructure is managed at both the
configuration and finance level, applications must often be re-architected to
reap the benefits of increased stability, reliability, and agility that cloud
can provide. Re-architecting systems to a cloud-native paradigm is discussed in
Google Cloud's white paper,
[Re-architecting to cloud native: an evolutionary approach to increasing developer productivity at scale.](https://cloud.google.com/rearchitecting-to-cloud-native-whitepaper)

The most crucial consideration is whether your cloud deployment has actually
helped your organization achieve more
[rapid, reliable releases](/devops-capabilities/technical/continuous-delivery),
and higher levels of availability,
[velocity, and reliability](/quickcheck/).

## Common pitfalls of implementing cloud infrastructure

The biggest obstacles to meeting the five characteristics defined by NIST
are:

-   Insufficient alignment and collaboration between the organizational
    functions that must work together in order to implement them;
-   Insufficient investment in technical, process, and organizational change.

Many organizations begin with a *lift and shift* approach to moving
applications to the cloud. This requires minimal change to applications and to
established processes for managing cloud infrastructure, and can be done
relatively quickly. However, it also provides minimal benefits. It's important
to plan for moving beyond lift and shift to a cloud-native paradigm for new
software, as well as existing strategic systems that will continue to evolve.

Moving to the cloud is a multi-year journey. Like all disruptive changes, it's
important to start small and experiment rapidly to discover what works and what
doesn't, and then be persistent and disciplined about scaling out learnings and
effective patterns and practices through the organization.

There will be many obstacles on this journey to overcome, including:

-   Redesigning processes, architecture, and governance to meet regulatory
    requirements in a cloud-native way
-   Designing multi-tenant infrastructure architecture that enables teams to
    self-service deployments and configuration changes while ensuring logical
    separation between environments, enabling charge-back, and preventing cloud
    sprawl and orphaned infrastructure
-   Building a product development capability for your cloud infrastructure
    platform
-   Helping procurement transition to infrastructure as a metered service
    rather than a capital investment
-   Helping developers understand how to build cloud-native applications
-   Enabling operations to move to modern
    [Site Reliability Engineering](https://landing.google.com/sre/)
    (SRE) practices, including deploying infrastructure-as-code as a
    replacement for manual ticket-based configuration management
-   Planning and executing the integration between cloud native systems and
    non-cloud-based systems, including mainframes and packaged software/COTS

Overcoming these obstacles requires a
[substantial change program](/devops-capabilities/cultural/devops-culture-transform)
involving sustained investment and collaboration between people at every level
of the organization.

## How to measure cloud infrastructure

In order to decide what to measure, start by considering what benefits you hope
to gain from implementing cloud infrastructure. Then start measuring the extent
to which those benefits are being realized.

For example, if your goal is to improve cost visibility, you might track how
well you're doing at making sure the cost of infrastructure is correctly billed
to the relevant business line, team, product, or environment.

You can also directly measure whether or not you have done a good job of
implementing NIST's essential characteristics: ask your teams about the extent
to which they agree with the statements of these characteristics listed at the
top of this document. Teams that agree or strongly agree are doing well; teams
that are neutral or disagree need help and support to remove obstacles to
meeting these outcomes. Then consider how many teams that say they are using
cloud can actually meet NIST's criteria.

Some aspects of the essential characteristics can also be measured directly by
instrumenting your processes. For example, if you have a process for managing
infrastructure changes you could measure the time it takes end-to-end to make a
change. You can also look at how prevalent cloud-native technologies are in your
organization: for example, the proportion of clusters or machines managed using
Kubernetes or autoscaling groups rather than manual provisioning, or the
time-to-live for hosts. In data centers, long uptimes generally indicate high
reliability; in the cloud-native paradigm, configuration changes are often made
by starting new virtual hosts with the new configuration rather than making
changes to existing hosts. This practice is known as *ephemeral infrastructure*, in
which a long uptime is an indicator of an unpatched machine.

## What's next

-  For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-  [White paper: Re-architecting to cloud native: an evolutionary approach to increasing developer productivity at scale](https://cloud.google.com/rearchitecting-to-cloud-native-whitepaper)
-  [Cloud billing concepts in Google Cloud](https://cloud.google.com/billing/docs/concepts)
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.