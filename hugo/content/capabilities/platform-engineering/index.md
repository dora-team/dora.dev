---
title: "Platform engineering"
slug: platform-engineering
core: false
ai: true
date: 2025-12-08
updated: 2026-01-12
category: AI
draft: false
headline: "A platform provides the automated, secure pathways that allow AI’s benefits to scale across the organization."
summary: "Platform engineering is the discipline of designing and building toolchains and workflows that enable self-service capabilities for software engineering organizations in the cloud-native era. Platform engineers provide an integrated product most often referred to as an 'Internal Developer Platform' covering the operational necessities of the entire lifecycle of an application."
---

Platform engineering is a sociotechnical discipline where engineers focused on the intersection of social interactions between teams and the technical aspects of automation, self-service, and repeatability. It involves designing and building toolchains and workflows, often called an 'Internal Developer Platform', that provide shared, high-quality tools, services, and 'golden paths'. This makes it easy for development teams to build, test, and deploy their applications securely, reliably, and in a compliant way.

Rather than viewing the platform merely as a collection of infrastructure tickets, it is best understood as an internal product designed specifically for developers. By [2025](/research/2025/dora-report/), adoption had become nearly universal, with 90% of organizations reporting the use of an internal developer platform and 76% establishing dedicated platform teams. Its primary function is to abstract away underlying complexity, allowing teams to focus on delivering user value rather than navigating infrastructure, security, and operational hurdles.

> When platform quality is high, the effect of AI adoption on organizational performance becomes **strong and positive**. Conversely, when platform quality is low, the effect of AI adoption on organizational performance is negligible.

## The AI angle

The central theme of [DORA's 2025 research](/research/2025/dora-report/) is that **AI is an amplifier**: it magnifies an organization's existing strengths, but also its dysfunctions.

While organizations are currently racing to equip individual developers with AI tools, DORA data reveals a significant risk: individual productivity boosts are frequently lost to "downstream disorder." Gains in coding speed are often swallowed by bottlenecks in testing, security reviews, and complex deployment processes.

A high-quality internal platform mitigates this risk by acting as the essential distribution and governance layer for AI. It provides the automated, standardized, and secure pathways necessary to turn AI's potential into systemic organizational improvements. By ensuring that AI-generated code is consistently tested, secured, and deployed, a platform allows an organization to harness the speed of AI without sacrificing stability.

## How to implement quality internal platforms

To improve an internal platform, organizations must move beyond viewing it as a technical project and adopt a user-centric, product-centric approach.

### Adopt a product management mindset
A platform is an internal product, and the developers are its customers. Successful implementation requires assigning a product manager to focus on the developer experience (DevEx) and creating a strategic roadmap based on a deep understanding of developer needs. This work should be driven by mapping out critical user journeys—such as "spinning up a new service" or "debugging a production issue"—to identify and eliminate the most significant points of friction.

### Proactively "shift down" cognitive load
The platform's primary goal is to reduce the cognitive load on developers by abstracting away underlying complexity. Instead of forcing developers to become experts in Kubernetes, cloud networking, or security policies, platform engineers should "[shift down](https://cloud.google.com/blog/products/application-development/richard-seroter-on-shifting-down-vs-shifting-left)" this complexity into the platform itself. By providing simple, self-service "golden paths," the platform enables developers to focus on what they do best: delivering user value. [Research from 2024](/research/2024/dora-report/) highlights that **developer independence**, the ability to perform tasks without relying on an enabling team, resulted in a 5% improvement in productivity at both the team and individual levels.

### Start with a "minimum viable platform"
Organizations should avoid the temptation to build a comprehensive platform all at once. Instead, they should identify the golden path for the *most common* workflow and build just enough to make that specific journey demonstrably better. This approach allows the team to deliver value quickly, gather crucial feedback, and build momentum for future iterations.

### Design for extensibility
A central platform team cannot—and should not—build everything. A successful platform must be designed for extensibility, allowing other teams to contribute their own tools and services in a standardized way. By building with clear APIs and a well-defined contribution model, organizations can leverage domain expertise from other teams and prevent the platform team from becoming a bottleneck.

### Prioritize clear feedback
Developers need to understand what is happening when they use the platform, especially when something fails. [DORA's 2025 data](/research/2025/dora-report/) showed that the platform capability most correlated with a positive user experience is giving "clear feedback on the outcome of my tasks". Providing clear, actionable feedback, logs, and diagnostics empowers developers to self-serve and troubleshoot independently.

## Why this matters now

Investing in a quality internal platform is no longer optional; it is the critical enabler for realizing the value of AI investments. Currently, individual productivity gains from AI are often absorbed by downstream bottlenecks in deployment and testing processes.

It is important to manage expectations regarding the timeline of these benefits. As with many transformations, platform engineering often follows a "J-curve" pattern: organizations may see initial performance gains, followed by a dip as complexity increases, before finally recovering and stabilizing at a higher level of performance as the platform matures.

By building a platform that abstracts complexity and automates delivery, organizations create a "paved road" that scales these benefits securely. This isn't just about speed; it is about risk mitigation. A quality platform creates a safe space for experimentation by making failure cheap and recovery fast. It transforms platform engineering efforts from a cost center managing tickets into a value driver that accelerates every team.

## Common pitfalls

As organizations invest in platform engineering, recognizing common antipatterns is the first step to avoiding them.

* **The "Build it and they will come" trap:** This occurs when a team builds a platform based on assumptions without conducting user research or validation. This often leads to a platform that doesn't solve real problems or fit existing workflows, resulting in poor adoption.
* **The "Ivory tower" approach:** This arises when a central platform team dictates rigid standards from on high without collaboration. Acting as gatekeepers rather than enablers disempowers developers and often leads to "shadow IT" workarounds.
* **The "Ticket-ops" trap:** If the platform team operates like a reactive "vending machine" for infrastructure tickets rather than an enabler of self-service, they remain trapped in toil. This creates bottlenecks and prevents the team from building the cohesive capabilities that provide real value.
* **The "Big bang" release:** Attempting to build an all-encompassing platform before releasing anything is high-risk. By the time the "perfect" platform launches, developer needs have likely changed.
* **A "One-size-fits-all" mentality:** Creating a rigid "golden cage" fails to account for the diverse needs of different teams (for example, data science and mobile development). A successful platform provides enabling constraints while offering enough flexibility for teams to use the right tools for their specific jobs.

## Measuring impact

To measure the impact of your platform, utilize both [software delivery metrics](/guides/dora-metrics/) and developer satisfaction signals. DORA research has found that while platforms improve productivity and organizational performance, they can sometimes lead to a decrease in throughput and change stability if not carefully managed. Therefore, a balanced scorecard is essential.

* **Software delivery performance:** Track [change lead time](/guides/dora-metrics/#throughput), [deployment frequency](/guides/dora-metrics/#throughput), [failed deployment recovery time](/guides/dora-metrics/#throughput), [change failure percentage](/guides/dora-metrics/#instability), and [deployment rework rate](/guides/dora-metrics/#instability). Platform teams should use these to measure their own performance, while application teams should see these metrics exposed by the platform to understand the impact on their work.
* **Developer satisfaction (DevEx):** Regularly survey developers using CSAT or Net Promoter Score (NPS) to track sentiment. This is vital for connecting platform improvements directly to developer productivity.
* **Adoption & retention:** Using the [H.E.A.R.T. framework](https://cloud.google.com/transform/unlocking-product-success-by-combining-dora-and-heart/), measure the rate of new teams onboarding to the platform and the rate at which they continue to use it.
* **Task success:** Measure the efficiency and effectiveness of developers completing key workflows on the platform.

## More from DORA

Read more about platform engineering in the following publications:

* [DORA AI Capabilities Model report](/ai/capabilities-model/report/)
* [2025 State of AI-assisted Software Development](/research/2025/dora-report/)
* [2024 Accelerate State of DevOps Report](/research/2024/dora-report/)
* [2023 Accelerate State of DevOps Report](/research/2023/dora-report/)


## What's next?

* [Shift down with platform engineering on Google Cloud](https://cloud.google.com/solutions/platform-engineering)
* Read the blog post: [How Google does it: Your guide to platform engineering](https://cloud.google.com/blog/products/application-modernization/a-guide-to-platform-engineering)
* Read the blog post: [Unlocking product success by combining DORA and H.E.A.R.T.](https://cloud.google.com/transform/unlocking-product-success-by-combining-dora-and-heart/)
* Take the [DORA quick check](/quickcheck/) to get a baseline of your team's software delivery performance.
