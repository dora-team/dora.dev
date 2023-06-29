---
title: "Streamlining change approval"
titleForHTMLHead: "DevOps Capabilities: Streamlining Change Approval" # TODO: can we DRY this out?
date: 2023-03-22T11:02:58Z
category: process
draft: false
headline: "Replace heavyweight change-approval processes with peer review, to get the benefits of a more reliable, compliant release process without sacrificing speed."
summary: "Replace heavyweight change-approval processes with peer review, to get the benefits of a more reliable, compliant release process without sacrificing speed."
---

Most IT organizations have change management processes to manage the life cycle
of changes to IT services, both internal and customer-facing. These processes
are often the primary controls to reduce the operational and security risks of
change.

Change management processes often include approvals by external reviewers or
change approval boards (CABs) to promote changes through the system.

Compliance managers and security managers rely on change management processes to
validate compliance requirements, which typically require evidence that all
changes are appropriately authorized.

Research by DevOps Research and Assessment (DORA), presented in the
[2019 State of DevOps Report (PDF)](/publications/),
finds that change approvals are best implemented through peer review during the
development process, supplemented by automation to detect, prevent, and correct
bad changes early in the software delivery life cycle. Techniques such as
[continuous testing](/devops-capabilities/technical/test-automation),
[continuous integration](/devops-capabilities/technical/continuous-integration),
and
[comprehensive monitoring and observability](/devops-capabilities/technical/monitoring-and-observability)
provide early and automated detection, visibility, and fast feedback.

Further, organizations can improve their performance by doing a better job of
communicating the existing process and helping teams navigate it efficiently.
When team members have a clear understanding of the change approval process,
this drives higher performance.

## How to implement a change approval process

Two important goals of the change approval process are decreasing the risk of
making changes, and satisfying regulatory requirements. One common regulatory
requirement is segregation of duties, which states that changes must be approved
by someone other than the author, thus ensuring that no individual has
end-to-end control over a process.

Traditionally, these goals have been met through a heavyweight process involving
approval by people external to the team proposing the change: a change advisory
board (CAB) or a senior manager. However, DORA's research shows that these
approaches have a negative impact on software delivery performance. Further, no
evidence was found to support the hypothesis that a more formal, external review
process was associated with lower change fail rates.

Such heavyweight approaches tend to slow down the delivery process leading to
the release of larger batches less frequently, with an accompanying higher
impact on the production system that is likely to be associated with higher
levels of risk and thus higher change fail rates. DORA's research found this
hypothesis was supported in the data.

Instead, teams should:

*   Use peer review to meet the goal of segregation of duties, with reviews,
    comments, and approvals captured in the team's
    [development platform](/devops-capabilities/technical/code-maintainability)
    as part of the development process.
*   Employ [continuous testing](/devops-capabilities/technical/test-automation),
    [continuous integration](/devops-capabilities/technical/continuous-integration),
    and
    [comprehensive monitoring and observability](/devops-capabilities/technical/monitoring-and-observability)
    to rapidly detect, prevent, and correct bad changes.
*   Treat your development platform as a product that makes it easy for
    developers to get fast feedback on the impact of their changes on multiple
    axes, including security, performance, and stability, as well as defects.

Your goal should be to make your regular change management process fast and
reliable enough that you can use it to make emergency changes too.

In the [continuous delivery](/devops-capabilities/technical/continuous-delivery)
paradigm the CAB still has a vital role, which includes:

*   Facilitating notification and coordination between teams.
*   Helping teams with process improvement work to increase their software
    delivery performance.
*   Weighing in on important business decisions that require a trade-off and
    sign-off at higher levels of the business, such as the decision between
    time-to-market and business risk.

This new role for the CAB is strategic. By shifting detailed code review to
practitioners and automated methods, the time and attention of those in
leadership and management positions is freed up to focus on more strategic work.
This transition, from gatekeeper to process architect and information beacon, is
consistent with the practices of organizations that excel at software delivery
performance.

## Common pitfalls in change approval processes

The following pitfalls are common to change approval processes:

**Reliance on a centralized Change Approval Board (CAB)** to catch errors and
approve changes. This approach can introduce delay and often error. CABs are
good at broadcasting change, but people that far removed from the change might
not understand the implications of those changes.

**Treating all changes equally.** When all changes are subject to the same
approval process, change review is inefficient, and people are unable to devote
time and attention to those that require true concentration because of
differences in risk profile or timing.

**Failing to apply continuous improvement.** As with all processes, key
performance metrics such as lead time and change fail rate should be targeted
with the goal of improving the performance of the change management process,
including providing teams with tools and training to help them navigate it more
effectively.

**Responding to problems by adding more process.** Often organizations use
additional process and more heavyweight approvals when faced with stability
problems in production. Analysis suggests this approach will make things worse
because this drives up lead times and batch sizes, creating a vicious cycle.
Instead, invest in making it quicker and safer to make changes.

## Ways to improve your change approval process

To improve your change approval processes, focus on implementing the following:

1.  Moving to a peer-review based process for individual changes, enforced at
    code check-in time, and supported by automated tests.
1.  Finding ways to discover problems such as regressions, performance problems,
    and security issues in an automated fashion as soon as possible after
    changes are committed.
1.  Performing ongoing analysis to detect and flag high risk changes early on so
    that they can be subjected to additional scrutiny.
1.  Looking at the change process end-to-end, identifying bottlenecks, and
    experimenting with ways to shift validations into the development platform.
1.  Implementing information security controls at the platform and
    infrastructure layer and in the development tool chain, rather than
    reviewing them manually as part of the software delivery process.

Research from the
[2019 State of DevOps Report (PDF)](/publications/)
shows that while moving away from traditional, formal change management
processes is the ultimate goal, simply doing a better job of communicating the
existing process and helping teams navigate it efficiently has a positive impact
on software delivery performance. When team members have a clear understanding
of the process to get changes approved for implementation, this drives high
performance. This means they are confident that they can get changes through the
approval process in a timely manner and know the steps it takes to go from
"submitted" to "accepted" every time for all the types of changes they typically
make.

## Ways to measure change approval in your systems

Now your teams can list possible ways to measure change approval:


|  Factor to test                                                                                       |   What to measure    |
| ---   | ---   |
| Can changes be promoted to production without manual change approvals?                                | The percentage of changes that do (or do not) require a manual change to be promoted to production. <br> **Tip:** You can also measure this factor based on risk profile what percentage of low-, medium-, and high-risk changes require a manual change to be promoted to production?  <br><br>  |
| Do production changes need to be approved by an external body before deployment or implementation?    | The amount of time changes spend waiting for approval from external bodies. <br> **Tip:** As you shift approvals closer to the work, measure the amount of time spent waiting for approval from local approval bodies or reviewers. <br><br>     |
| Do you rely on peer review to manage changes?                                                         | You can also measure this factor by risk profile. Measure number or proportion of changes that require approval from external bodies, as well as the time spent waiting for those approvals   <br><br>   |
| Do team members have a clear understanding of the process to get changes approved for implementati    | The extent to which team members are confident they can get changes through the approval process in a timely manner and know the steps it takes to go from "submitted" to "accepted" every time for all the types of changes they typically make    |


While you consider your own environment, you will likely develop your own measures to understand and gain insight into your change approval processes. We suggest you use these to not only measure your process but also work to improve it.

## What's next

-   See how to
    [perform vulnerability scanning as part of your deployment pipeline](https://cloud.google.com/binary-authorization/docs/vulnerability-scanning-kritis)
    with Cloud Build, Container Analysis, and Kritis Signer.
-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.