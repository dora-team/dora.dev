---
title: "Flexible infrastructure"
date: 2023-03-27T09:48:50+01:00
category: fast flow
draft: false
aliases:
    - /capabilities/cloud-infrastructure/
core: true
updated: 2026-06-18
headline: "Find out how to manage cloud infrastructure effectively so you can achieve higher levels of agility, availability, and cost visibility."
summary: |
    Infrastructure flexibility is often a motivation for organizations to adopt cloud computing. However, the use of a cloud provider alone may not be sufficient to achieve the desired agility. DORA's research uses [a definition](https://csrc.nist.gov/pubs/sp/800/145/final) from the US National Institute of Standards and Technology (NIST) to establish the five essential characteristics that enable cloud computing to provide its full potential benefit to an organization:

    - On-demand self-service
    - Broad network access
    - Resource pooling
    - Rapid elasticity
    - Measured service
---

Flexible infrastructure allows teams to rapidly and reliably adapt to changing business needs without being bottlenecked by hardware procurement or manual provisioning. DORA research shows that utilizing flexible infrastructure, which is typically achieved through cloud computing, is a key driver of continuous delivery, software delivery performance, and overall organizational success.

When teams can provision and manage their own environments dynamically, they reduce lead times and recover from failures faster.

## The business and technological impact

Infrastructure flexibility is a proven driver of top-line business outcomes. DORA findings indicate that leveraging flexible cloud infrastructure directly increases overall organizational performance.

> Flexible infrastructures lead to 30% higher organizational performance. ([Accelerate State of DevOps 2023](/research/2023/dora-report/))

As AI accelerates the pace of code creation, flexible infrastructure has become a critical safety net. While AI tools significantly increase individual productivity and flow, the resulting surge in code volume can severely strain deployment pipelines, negatively impacting software delivery stability and throughput. Flexible, elastic infrastructure allows teams to spin up automated, on-demand test environments to absorb this increased volume and catch AI-generated regressions before they reach production.

## Flexible infrastructure defined

Many organizations seek flexible technical infrastructure, often in the form of cloud computing. But there's more to it than buying your infrastructure from a cloud provider. The US National Institute of Standards and Technologies (NIST) [defines](https://csrc.nist.gov/pubs/sp/800/145/final) five essential characteristics of cloud computing (whether public, private, or hybrid):

-   **On-demand self-service:** Consumers can provision computing resources as needed, without human interaction from the provider.
-   **Broad network access:** Capabilities can be accessed through diverse platforms such as mobile phones, tablets, laptops, and workstations.
-   **Resource pooling:** Provider resources are pooled in a multi-tenant model, with physical and virtual resources dynamically assigned on-demand. The customer may specify location at a higher level of abstraction such as country, state, or data center.
-   **Rapid elasticity:** Capabilities can be elastically provisioned and released to rapidly scale outward or inward on demand, appearing to be unlimited and able to be appropriated in any quantity at any time.
-   **Measured service:** Cloud systems automatically control, optimize, and report resource use based on the type of service such as storage, processing, bandwidth, and active user accounts.

The [2019 State of DevOps Report](/research/2019/dora-report/2019-dora-accelerate-state-of-devops-report.pdf) found that only 29% of people who claim to have adopted cloud technologies agreed or strongly agreed that they met all five of the characteristics defined above. In both [2018](/research/2018/) and [2019](/research/2019/), DORA's research found that elite performers were more than 23 times more likely to have met all five essential cloud characteristics than low performers. This may explain why teams and executives who claim to have adopted cloud computing technologies also express frustration at not reaping the expected results.

When organizations continue to use traditional data center practices and processes to manage their infrastructure, they can't achieve the expected benefits, which, according to DORA's research, include:

-   Improved software delivery performance: faster throughput and higher levels of stability
-   Better service availability
-   Improved cost visibility: in [2019](/research/2019/), we found that respondents who met all essential cloud characteristics are 2.6 times more likely to be able to accurately estimate the cost to operate software. They are also twice as likely to be able to easily identify their most operationally expensive applications.

> Respondents who met all essential cloud characteristics are 2.6 times more likely to be able to accurately estimate the cost to operate software.

For example, many organizations with cloud infrastructure do not allow developers to self-service their environments on demand: they require them to raise tickets or send emails and wait days for environments to be provisioned or for configuration changes to be made. In this case, although the organization may pay for a cloud service, they don't have a cloud by NIST's definition.

When moving to the cloud, organizations must invest in re-designing the processes and practices that they implemented when they were using traditional data centers. They must adopt cloud-native patterns and practices to achieve the agility, stability, availability, and cost transparency of cloud computing. If the underlying technology is in the cloud but the outcomes for practitioners remain unchanged — days or weeks to obtain test environments, provision new infrastructure, or get configuration changes made — then organizations will not reap the results they want.

## How to implement flexible infrastructure

Adopting cloud-native processes and practices to implement NIST's five characteristics involves substantial change by several functions, including business stakeholders, developers, operations teams, information security, procurement, and finance. The changes require close collaboration between these functions in order to identify and resolve conflicting aims.

For example, many developers expect complete control over production infrastructure when using cloud platforms. Information security professionals oppose this practice, and with good reason — without disciplined [change management](/capabilities/streamlining-change-approval), cloud infrastructure can turn into a fragile work of art that is hard to manage, vulnerable to external threats, and does not meet regulatory requirements.

However, developers can be empowered to provision the resources they require while meeting these requirements. Many organizations have adopted the *infrastructure as code* (IaC) paradigm. Infrastructure configuration is checked into version control, and developers can provision environments, make configuration changes, and execute deployments through an automated mechanism. The mechanism takes the code from version control and performs operations through the cloud's API on demand without human intervention. Using [version control](/capabilities/version-control/) and automation, all actions and their output are logged to provide complete traceability and auditability of every change to each environment.

Infrastructure as code allows you to manage changes effectively and to apply information security controls. For example, you can implement segregation of duties by requiring all changes to the configuration specified in [version control](/capabilities/version-control/) to be [approved by a designated group](/capabilities/streamlining-change-approval). However, moving to infrastructure as code requires significant engineering effort and process change, including changing policies for implementing information security controls.  To make this transition actionable, start small. Pilot these automated processes with a single, low-risk application or an enthusiastic early-adopter team. This allows you to test new guardrails, prove the value of self-service, and build cross-functional trust before rolling out global policy changes.

Consider another example. While cloud providers typically only bill for infrastructure while it is in use (meeting NIST's fifth characteristic, measured service), this change from fixed-cost infrastructure to variable cost can have significant implications for both procurement and finance. As described in [Accelerate State of DevOps 2019](/research/2019/dora-report/):  "Some in finance may say that the cloud has not led to cost savings in the short-run, yet we know that it provides greater information transparency. How can this be? While the cloud provides transparent information about costs to the system owners, users do not pay for these costs unless there is a chargeback model or similar mechanism. This can lead to wildly variable costs that go unchecked, making cloud costs unpredictable. In these scenarios, teams that pay for infrastructure may prefer data centers because they are predictable, even though their visibility disincentivizes system users to build more efficient systems. We suggest organizations better align incentives so that system owners have both visibility to build more efficient systems, and the incentives to do so, by using chargeback or similar mechanisms."

> Align incentives so that system owners have both visibility to build more efficient systems, and the incentives to do so.

In addition to considering how infrastructure is managed at both the configuration and finance level, applications must often be re-architected to reap the benefits of increased stability, reliability, and agility that cloud can provide. Re-architecting systems to a cloud-native paradigm is discussed in Google Cloud's white paper, [Re-architecting to cloud-native: an evolutionary approach to increasing developer productivity at scale](https://cloud.google.com/rearchitecting-to-cloud-native-whitepaper).

The most crucial consideration is whether your cloud deployment has actually helped your organization achieve more [rapid, reliable releases](/capabilities/continuous-delivery), and higher levels of availability, [velocity, and reliability](/quickcheck/).

### The platform foundation
Flexible infrastructure is the underlying engine that powers successful [platform engineering](/capabilities/platform-engineering/).

By abstracting flexible cloud resources into an Internal Developer Platform (IDP), platform teams can provide developers with "paved roads." The goal is to design multi-tenant environments that prioritize self-service and autonomy, ensuring the platform removes infrastructure bottlenecks so developers can focus on writing application code.

> ...prioritize self-service and autonomy... so developers can focus on writing application code.

## Common pitfalls of implementing flexible infrastructure

* **The “cloud penalty” (lift and shift):** The most dangerous pitfall is migrating to the cloud without adopting its inherent flexibility. DORA research reveals that a “lift and shift” approach — treating the cloud merely as another data center — actively degrades performance. Organizations suffer a “cloud penalty” when they move workloads but maintain traditional, manual provisioning processes and centralized change approval boards.

> Organizations may be better off staying in the data center if they are not willing to radically transform their application or service. ([Accelerate State of DevOps 2024](/research/2024/dora-report/))

* **Building gates instead of guardrails:** While utilizing an IDP can improve productivity, it can decrease change stability and throughput if it restricts developer independence. If an IDP mandates rigid, one-size-fits-all infrastructure requirements or requires manual ticket approvals to access cloud resources, it negates the benefits of flexible infrastructure.

* **Incentivizing the wrong metrics:** Executives often incentivize pure migration volume or speed (for example, “move 80% of apps to the cloud by Q3”). This drives teams to bypass modernization and architectural updates, leading to a sprawling cloud footprint that cannot scale elastically or be provisioned on demand.


Organizations must overcome several obstacles on this journey, including:

- Redesigning processes, architecture, and governance to meet regulatory requirements in a cloud-native way
- Designing multi-tenant infrastructure architecture that enables teams to self-service deployments and configuration changes while ensuring logical separation between environments, enabling chargeback, and preventing cloud sprawl and orphaned infrastructure
- Building a product development capability for your cloud infrastructure platform
- Helping procurement transition to infrastructure as a metered service rather than a capital investment
- Investing in training and upskilling: Organizations often purchase cloud tools but neglect to train their teams. Developers and operators need dedicated time to understand how to build and maintain cloud-native applications.
- Enabling operations to move to modern [Site Reliability Engineering](https://landing.google.com/sre/) (SRE) and [platform engineering](/capabilities/platform-engineering/) practices, including deploying infrastructure as code as a replacement for manual ticket-based configuration management
- Planning and executing the integration between cloud-native systems and non-cloud-based systems, including mainframes, packaged software, and commercial off-the-shelf (COTS) solutions.


Overcoming these obstacles requires a [substantial change program](/guides/how-to-transform/). It is essential to prioritize the human element — allocating dedicated budget and time for continuous learning — alongside sustained investment and collaboration between people at every level of the organization.

## How to measure flexible infrastructure

To decide what to measure, start by considering what benefits you hope to gain from implementing cloud infrastructure. Crucially, before making any changes, establish a baseline for your current traditional processes. Capture existing metrics, such as your manual provisioning lead times or current operational costs, so you have a definitive point of comparison to prove the return on investment (ROI) to leadership later. Then start measuring the extent to which those benefits are being realized.

For example, if your goal is to improve cost visibility, you might track how well you're doing at ensuring the cost of infrastructure is correctly billed to the relevant business line, team, product, or environment.

> Avoid measuring success based on the percentage of workloads hosted on cloud servers.

You can also directly measure against the NIST characteristics such as:

* **Time to provision:** How long does it take from the moment a developer requests a new environment or resource until it is ready to use?
* **Self-service adoption rate:** What percentage of infrastructure requests are fulfilled automatically via APIs or your Internal Developer Platform versus those requiring a manual IT support ticket?
* **Elasticity metrics:** Can the system automatically scale up during peak traffic and scale down during off-hours without human intervention? Measure the variance in resource utilization and the frequency of automated scaling events.
* **Cost transparency:** Can individual product teams view and forecast the infrastructure costs associated with their specific services on a daily or weekly basis?

## More from DORA

Read more about cloud and flexible infrastructure in the following publications:

* [State of AI-assisted Software Development 2025](/research/2025/dora-report/)
* [Accelerate State of DevOps 2024](/research/2024/dora-report/)
* [Accelerate State of DevOps 2023](/research/2023/dora-report/)
* [2022 Accelerate State of DevOps Report](/research/2022/dora-report/)
* [Accelerate State of DevOps 2021](/research/2021/dora-report/)
* [Accelerate State of DevOps 2019](/research/2019/dora-report/)
* [Accelerate: State of DevOps 2018](/research/2018/)

## What's next

* Take the [DORA quick check](/quickcheck/) to understand your team's software delivery performance.
