---
title: "Monitoring systems to inform business decisions"
titleForHTMLHead: "DevOps Capabilities: Monitoring systems to inform business decisions" # TODO: can we DRY this out?
date: 2023-03-25T16:35:37Z
category: process
draft: false
headline: "Improve monitoring across infrastructure platforms, middleware, and the application tier, so you can provide fast feedback to developers."
summary: "Improve monitoring across infrastructure platforms, middleware, and the application tier, so you can provide fast feedback to developers."
---

Monitoring is the process of collecting, analyzing, and using information to
track applications and infrastructure in order to guide business decisions.
Monitoring is a key capability because it gives you insight into your systems
and your work. Properly implemented, monitoring also gives you rapid feedback so
that you can quickly find and fix problems early in the software development
lifecycle.

Monitoring also helps you communicate information about your systems to people
in other areas of the software development and delivery pipeline, and to other
parts of the business. Knowledge acquired downstream in operations might get
integrated into upstream teams, such as development and product management. For
example, the knowledge gained from operating a highly scalable application that
uses a NoSQL database as a data store can be valuable information for developers
as they build a similar application.

This knowledge transfer allows teams to quickly identify learnings, whether they
stem from a production issue, a deployment error, or your customer usage
patterns. You can then share these learnings across your organization to help
people and systems improve.

## How to implement monitoring

The following elements are key to effective monitoring:

-   Collecting data from key areas throughout the value chain, including
    application performance and infrastructure.
-   Using the collected data to make business decisions.

### Collecting data

To collect data more effectively, you should implement monitoring solutions,
either as homegrown services or managed services, that give visibility into
development work, testing, QA, and IT operations. Make sure that you choose
metrics that are appropriate for function and for your business.

### Using data to make business decisions

When you transform and visualize the collected data, you make it accessible to
different audiences and help them make decisions. For example, you might want to
share operations data upstream.You can also integrate this data as appropriate
into reports and briefings, and use it in meetings to make informed business
decisions. In this case, *appropriate* means relevant, timely, accurate, and
easy to understand.

In these meetings, be sure to also provide context, to help those who might not
be familiar with the data understand how it pertains to the discussion and how
it can inform the decisions to be made. For example, you might want to know how
to answer the following questions:

-   Are these values relatively high or low?
-   Are they expected?
-   Do you anticipate changes?
-   How is this data different from historical reports?
-   Has your technology or infrastructure impacted the numbers in interesting
    or non-obvious ways?

## Common pitfalls in monitoring

The following pitfalls are common when monitoring systems:

-   **Monitoring reactively**. For example, only getting alerted when the
    system goes down, but not using monitoring data to help alert when the
    system approaches critical thresholds.

-   **Monitoring too small a scope**. For example, monitoring one or two areas
    rather than the full software development and delivery pipeline. This
    pitfall highlights metrics, focusing only on the areas that are measured,
    which might not be the optimal areas to monitor.

-   **Focusing on local optimizations**. For example, focusing on reducing
    the response time for one service's storage needs without evaluating
    whether the broader infrastructure could also benefit from the same
    improvement.

-   **Monitoring everything**. By collecting data and reporting on everything
    your system, you run the risk of over-alerting or drowning in data. Taking
    a thoughtful approach to monitoring can help draw attention to key areas.

## Ways to improve monitoring

To improve your monitoring effectiveness, we recommend that you focus your
efforts on two main areas:

1.  **Collecting data from key areas throughout the value chain.**

    By analyzing the data that you collect and doing a gap analysis, you can
    help ensure that you collect the right data for your organization.

1.  **Using the collected data to make business decisions.**

    The data that you collect should drive value across the organization,
    and the metrics that you select must be meaningful to your organization.
    Meaningful data can be used by many teams, from DevOps to Finance.

    It's also important to find the right medium to display the monitoring
    information. Different uses for the information demand different
    presentation choices. Real-time dashboards might be most useful to the
    DevOps team, while regularly generated business reports might be useful for
    metrics measured over a longer period.

    The most important thing is to ensure the data is available, shared, and
    used to guide decisions. If the best you can do to kick things off is a
    shared spreadsheet, use that. Then graduate to fancy dashboards later. Don't
    let perfect be the enemy of good enough.

## Ways to measure monitoring

Effective monitoring helps drive performance improvements in software
development and delivery. However, measuring the effectiveness of monitoring can
be difficult to instrument in systems. Although you might be able to
automatically measure how much data is being collected from your systems and the
types of that data, it's more difficult to know if or where that data is being
used.

To help you gauge the effectiveness of monitoring in your organization, consider
the extent to which people agree or disagree with the following statements:

-   Data from application performance monitoring tools is used to make
    business decisions.
-   Data from infrastructure monitoring tools is used to make business
    decisions.

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Read the
    [Site Reliability Engineering (SRE) book](https://landing.google.com/sre/books/).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
