---
title: "DORA’s software delivery metrics: the four keys"
date: 2024-03-29T16:06:31-04:00
updated: 2024-05-30T00:00:00Z
draft: false
weight: 100
authors:
    1: {name: 'Nathen Harvey', url: 'https://linkedin.com/in/nathen'}
headline: "DORA’s software delivery metrics: the four keys"
subhead: "Discover the essential measurements that can inform your ongoing journey of continuous improvement."
heroimage: "dora-metrics-four-keys.png"
---
Technology-driven teams need ways to measure performance so that they can assess how they're doing today, prioritize improvements, and validate their progress. DORA has identified four software delivery metrics—the _four keys_—that provide an effective way of measuring the outcomes of the software delivery process. DORA's [research](/research) shows that these performance metrics predict better organizational performance and well-being for team members.

The four keys can be viewed as both _leading_ and _lagging_ indicators. Leading indicators typically signal potential future changes in a system while lagging indicators reflect past performance and outcomes.

> The four key metrics function as:
>   * Leading indicators for organizational performance and employee well-being
>   * Lagging indicators for software development and delivery practices.

## Throughput and stability

DORA's four keys can be divided into metrics that show the throughput of software changes,  and metrics that show stability of software changes. This includes changes of any kind, including changes to configuration and changes to code.

### Throughput

Throughput measures the velocity of changes that are being made. DORA assesses throughput using the following metrics:

* **Change lead time** - This metric measures the time it takes for a code commit or change to be successfully deployed to production. It reflects the efficiency of your delivery pipeline.
* **Deployment frequency** - This metric measures how often application changes are deployed to production. Higher deployment frequency indicates a more agile and responsive delivery process.

### Stability

Stability measures the quality of the changes delivered and the team's ability to repair failures. DORA assesses throughput using the following metrics:

* **Change fail percentage** - This metric measures the percentage of deployments that cause failures in production, requiring hotfixes or rollbacks. A lower change failure rate indicates a more reliable delivery process.
* **Failed deployment recovery time** - This metric measures the time it takes to recover from a failed deployment. A lower recovery time indicates a more resilient and responsive system.

## Key insights

DORA's research has repeatedly demonstrated that speed and stability are not tradeoffs. In fact, we see that the  metrics that the four keys focus on are correlated for most teams. Top performers do well across all four metrics, and low performers do poorly.

These metrics work for any type of technology your organization is delivering, but are best suited for measuring one application or service at a time. Whether you are building large language models, retail banking applications, mobile food ordering applications, or mainframe-based travel systems, the four keys can help you assess the delivery performance of your application.

Context matters. Apply the metrics in the context of the application or service your team is delivering. The context for your application, organization, and users will vary from other applications that your organization is delivering. While it may be tempting to blend metrics across multiple teams—or entire organizations—these differences in context mean that doing so can be problematic.

> "…the real trade-off, over long periods of time, is between _better software faster_ and _worse software slower._" —Farley, D. (2021). [Modern Software Engineering: Doing what works to build better software faster](https://www.google.com/books/edition/Modern_Software_Engineering/rtnPEAAAQBAJ) (p. 154). Addison-Wesley.

## Common pitfalls

There are some pitfalls to watch out for as your team adopts DORA’s software delivery metrics, including the following:

* **Setting metrics as a goal.** Ignoring [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law) and making broad statements like, "Every application must deploy multiple times per day by year's end," increases the likelihood that teams will try to game the metrics.
* **Having one metric to rule them all.** Attempting to measure complex systems with the idea that only one metric matters. Teams should identify multiple metrics, including some with a healthy amount of tension between them. The [SPACE framework](https://queue.acm.org/detail.cfm?id=3454124) can guide your discovery of a set of metrics.
* **Using industry as a shield against improving.** For example, some teams in highly regulated industries might claim that compliance requirements prevent them from disrupting the status quo.
* **Making disparate comparisons.** These metrics are meant to be applied at the application or service level. Comparing metrics between vastly different applications (for example, a mobile app and a mainframe system) can be misleading.
* **Having siloed ownership.** Sharing all four metrics across development, operations, and release teams fosters collaboration and shared ownership of the delivery process. Isolating teams with specific metrics can lead to friction and finger-pointing.
* **Competing.** The goal is to [improve your team's performance](/capabilities/how-to-empower-software-delivery-teams/) over time, not to compete against other teams or organizations. Use the metrics as a guide for identifying areas for growth and celebrating progress.
* **Focusing on measurement at the expense of improvement.** The data your team needs to collect for the four keys is available in a number of different places today. Building integrations to multiple systems to get precise data about your software delivery performance might not be worth the initial investment. Instead, it might be better to start with having conversations, taking the [DORA Quick Check](/quickcheck), or using a [source-available](/resources/#source-available-tools) or commercial product that comes with pre-built integrations.

What pitfalls have you encountered? Share your own cautionary tales with the DORA community by posting to the mailing list at [https://dora.community](https://dora.community).


## Dive into the research

[DORA's research](/research) goes beyond the four keys, exploring various capabilities that contribute to high performance. You can learn more about these capabilities and their impact on software delivery by visiting the [Capability catalog](/capabilities/).

By understanding and effectively utilizing DORA metrics, you can gain valuable insights into your software delivery performance and drive continuous improvement. Remember, the goal is to deliver better software faster, and DORA metrics provide the compass to orient teams toward that objective.


## Next steps

A common approach to improving the four key metrics discussed in this guide is [reducing the batch size of changes](/capabilities/working-in-small-batches/) for an application. Smaller changes are easier to rationalize and to move through the delivery process. Smaller changes are also easier to recover from if there's a failure. Teams should make each change as small as possible to make the delivery process fast and stable. Working in this way contributes to both change throughput and change stability.

We have found that an effective way of making changes is to gather the cross-functional team that is responsible for prioritizing, building, delivering, and operating an application for a discussion about improving their software delivery performance. Once the team is gathered, walk through the following steps:

* **Set a baseline** for your application's current performance using the [DORA Quick Check](/quickcheck).
* **Have a conversation** about the friction points in the delivery process. [Mapping out the delivery process](/capabilities/work-visibility-in-value-stream/) may help facilitate this part of the process.
* **Have the whole team  commit to making an improvement** in the most significant constraint or bottleneck.
* **Turn that commitment into a plan**, which may include some more specific measures that can serve as leading indicators for the software delivery metrics. For example, you may decide to measure how long code reviews take or the quality of your tests.
* **Do the work**. There are very few shortcuts, to make progress your team may need to change the way they work.
* **Check your progress**. Use the [DORA Quick Check](/quickcheck), conversations, and team retrospectives to validate the progress you've made.
* **Repeat** the process as a way to continue the learning and improvement.

Join us in the [DORA Community](https://dora.community) for ongoing discussions about how to implement DORA metrics in your organization!
