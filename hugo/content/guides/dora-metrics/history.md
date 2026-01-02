---
title: "A history of DORA’s software delivery metrics"
date: 2024-03-29T16:06:31-04:00
updated: 2026-01-05
draft: false
authors:
    1: {name: "Nathen Harvey", url: "https://linkedin.com/in/nathen"}
headline: "A history of DORA’s software delivery metrics"
heroimage: "/guides/dora-metrics/hero-fourkeys.png"
---

For over a decade, DORA has rigorously investigated the capabilities that drive high-performing technology organizations. Throughout this history, [software delivery performance metrics](/guides/dora-metrics) have served as the research’s “center of gravity.” While these metrics have become industry standards, they have not been static. They have evolved in name, definition, and scope to reflect the changing realities of the technology landscape.

## Origins: Defining “IT performance” (2014–2015)

In its inaugural [2014 study](/research/2014), DORA sought to scientifically link IT performance to organizational performance. To do this, the researchers had to define what “IT performance” actually meant quantitatively. They began with four variables: deployment frequency, lead time for changes, mean time to recover (MTTR), and change fail rate.

Interestingly, in that first year, statistical analysis revealed that change fail rate did not significantly correlate with the other variables to form a single “latent construct” of IT performance. Consequently, the 2014 definition of IT performance relied on three metrics: deployment frequency, lead time for changes, and mean time to recover.

By [2015](/research/2015), the model solidified into the duality of throughput and stability. The research debunked the myth that speed comes at the expense of stability, finding that high performers excelled at both. The metrics were categorized as:

* **Throughput measures:** Deployment frequency and deployment lead time.
* **Stability measures:** Mean time to recover (MTTR) and change fail rate.

## Standardization and expansion (2016–2018)

Through [2016](/research/2016) and [2017](/research/2017), these metrics became the standard benchmark for the industry. However, in [2018](/research/2018), DORA expanded its scope. Recognizing that software delivery is only part of the lifecycle, they introduced “availability” as a measure of operational health.

This necessitated a terminology shift. The researchers moved away from the broad term “IT performance” to the more specific “Software Delivery and Operational (SDO) performance.” While the original four metrics remained the core of software delivery, availability allowed DORA to measure whether teams could keep promises regarding the software they operated.

## Refining definitions: Reliability and recovery (2021–2023)

As the industry matured, so did the nuances of measurement. In [2021](/research/2021), DORA expanded the concept of “availability” to “reliability.” This shift acknowledged that availability is a specific focus of reliability engineering, but reliability broadly encompasses latency, performance, and scalability as well. The [2021 report](/research/2021/dora-report/) inaccurately called the “reliability” metric the “fifth metric” when, in reality, “reliability” is more a measure of operational performance than a measure of software delivery performance.

In [2023](/research/2023), DORA made a significant adjustment to the stability metrics. The metric historically known as “mean time to recover (MTTR)” or “time to restore service” was renamed and redefined as failed deployment recovery time.

The reasoning was specific: previous definitions did not distinguish between a failure initiated by a software change and a failure caused by external factors, such as a data center outage. The new definition focused strictly on restoring service after a change to production caused an impairment, aligning it more statistically with the other delivery metrics. The [appendix of the Accelerate State of DevOps 2023 report](/research/2023/dora-report/) includes more details and reasoning behind the change.

## From four keys to five (2024)

The most significant structural change to the metrics occurred in 2024. DORA researchers identified that change failure rate—the percentage of deployments requiring hotfixes or rollbacks—acted as a proxy for the amount of rework a team must perform. To test this, they introduced a fifth metric: deployment rework rate.

With this addition, DORA now utilizes five metrics to measure software delivery performance, grouped into two distinct factors:

#### Software Delivery Throughput

* **Change lead time**: Time from code commit to successful production deployment.
* **Deployment frequency**: How often application changes are deployed.
* **Failed deployment recovery time**: Time to recover from a failed deployment.

#### Software Delivery Instability

* **Change fail rate**: Percentage of deployments causing failures in production.
* **Deployment rework rate**: Percentage of deployments that are unplanned work to fix bugs.

The [Accelerate State of DevOps 2024 report](/research/2024/dora-report/) provides additional information about evolving the measures of software delivery performance.

This evolution from “IT performance” to a nuanced, five-metric model of “Software Delivery Throughput and Instability” demonstrates DORA's commitment to learning and improvement. As the researchers note, measuring these factors over time gives teams a high-level understanding of their performance, regardless of their technology stack.
