---
title: "Faq"
date: 2023-03-23T21:26:37Z
draft: false
type: faq
---

# Frequently Asked Questions

## DORA Quick Check
### What do my results mean?
Your quick check results include an overall software delivery performance score, on a a scale from 0 to 10. This blended metric is derived from the four individual metrics, which are also presented individually. Following the methodology from the [2023 Accelerate State of DevOps Report]({{< ref "/research/2023/" >}}), all scores are normalized to a 10-point scale for convenience. You can compare your results to benchmarks derived from DORA's 2023 research program.

### What's new in the 2023 Quick Check?
In previous versions of the Quick Check, your results were displayed as a _percentile_ relative to the distribution of respondents to DORA's research survey. In response to feedback from users, the current Quick Check computes your score only based on your inputs. This facilitates comparisons across time to help your team track progress. In previous versions of the Quick Check, users were forced to select a single industry before submitting their metrics. In the current version, users may choose an industry comparison after submitting. This allows additional exploration: if, for example, your organization operates across multiple industries, you can compare your results with each of those industries. The 2023 Quick Check also updates how two of the metrics (change fail percentage; failed deployment recovery time) are assessed, to match the methodology used in our 2023 research. (Read more about those changes in the [2023 Accelerate State of DevOps Report]({{< ref "/research/2023/" >}})).
* If you'd like to access prior versions of the Quick Check, you can find them here: [2022](/quickcheck/2022/), [2021](/quickcheck/2021/), [2019](/quickcheck/2019/).

### Why don't my results include a performance cluster?
Prior versions of the Quick Check displayed results including a performance cluster (low, medium, high, elite). Because the number of clusters varies between studies, and in order to focus on ongoing improvement at the level of individual teams, we no longer compute a performance cluster.

## DORA Core
### What is [DORA Core](/core/)?
DORA’s research program is continuous and ongoing; each year brings new avenues of inquiry, and each analysis yields new insights. At the cutting edge, new concepts are introduced frequently, and artifacts (especially the [Accelerate State of DevOps Reports]({{< relref "/publications" >}}) are continuously released, revealing new insights and dynamics. With each study, some prior findings are reinforced, while others may be called into question. This is a hallmark of good science: any new finding is to be considered suspect—intriguing, but suspect—until it has been validated through replication and application. Meanwhile, practitioners are encouraged to apply the research in their own professional contexts. In such contexts, it can be challenging to keep up with the latest developments from DORA: cultural transformation efforts in a large organization require a steady hand, persistent over stretches of time measured across multiple years. An attempt to update one’s practices to match the pace of the research can lead to counterproductive churn. In these contexts, it’s more practical to rely on “evergreen” artifacts. DORA Core represents a distillation of DORA’s most foundational findings: metrics, capabilities, and outcomes that the research has repeatedly surfaced. It enables teams to focus their improvement efforts even more precisely on what is likely to produce tangible benefits to their organizational goals and quality of life.

### Which concepts are included in Core?
DORA Core encompasses the set of concepts that have been perennially studied by DORA and whose interactions are well supported. These concepts include capabilities like [Continuous delivery](/devops-capabilities/technical/continuous-delivery) and [Generative organizational culture](/devops-capabilities/cultural/generative-organizational-culture), metrics like the "Four Key" metrics, and outcomes like organizational performance. These established ideas contrast with areas of inquiry, or divergent predictive pathways, which have shown promise when we’ve studied them, but aren’t (yet) as well supported as part of DORA’s predictive model. A concept may be considered for Core if: a) it has been researched at least twice; b) practitioners have found it valuable; c) continued exploration is warranted. This rubric is, by design, a subjective one: it draws heavily on the data and analyses, but it's ultimately guided by intuition. So please contribute! Your intuition is valuable; if you feel like something doesn’t accurately reflect the research, please let us know.

### Will Core ever change?
Yes! The application of research is necessarily less volatile than the research itself. But it’s not static. Core will evolve over time, and things we’re starting to investigate now will, once established, “graduate” into core. A threshold of support is required for inclusion in core; likewise, if sufficient evidence is collected to support the removal or alteration of something in core, it will be deprecated. Core is informed by, and evolves with, the research—but more slowly.

### What is the Core Model?
The DORA Core Model is a visual summary of the predictive framework that DORA has been developing since its inception. It draws from all of the Structural Equation Models (SEMs) that have been developed through the years, to highlight the best-supported entities and predictive pathways. Practitioners are encouraged to study the Model and use it to guide their continuous improvement journeys.

### Are all research years treated equally?
No. Some findings have proven to be extremely durable, replicating year after year. But, as one expects when studying a dynamic context, other findings have changed. Plus, every year, we add or subtract areas of study. Our goal with Core is to create something that’s durable across years, while also evolving as we continue to learn. To that end, more recent research gets more weight than older research. This is why, for example, “Shift Left on Security” is separated from the Technical Capabilities, which reflects findings from 2021 and 2022 that showed the unique impact of security practices on software delivery performance.

_DORA Core is an ongoing effort. Learn more, and provide feedback, in the [DORA Core GitHub Discussion](https://github.com/dora-team/dora.dev/discussions/265)._

## Accelerate State of DevOps Report 2023
### I found an error in the report. How can I report it?
If you've found an error in the Accelerate State of DevOps Report 2023, or any other DORA publication, please [submit a correction](/contact/?inquiry_type=Errata&errata_pub=Accelerate+State+of+DevOps+Report+2023). Thank you!

## Accelerate State of DevOps Report 2022
### What is different in this year's Accelerate State of DevOps Report?
Comparing the 2022 results to the 2021 results, there are a number of findings that did not follow trends that we have seen consistently over the past several years. In fact, there were enough of these that we chose to add a section to the report—"Surprises"—summarizing them.

### _Why_ are things different?
In a word: science. Fundamentally, our data collection methods are the same as they have been since the beginning of this research project, in 2014. But each year, there is a different (though likely overlapping) set of respondents, and we ask new or updated questions, and we perform different analyses. And of course, the world is always changing. We attempt to make sense of the data as we see it, and the data offered some surprises this year. In some cases, these major shifts reflect changes in the external reality of our respondents' practices and outcomes. In other cases, these may be artifacts of sampling and analysis methods. We cannot know for sure which is which, but we offer potential explanations that attempt to make sense of what the data tell us.

### Why are there only three clusters of performance this year?
The analytic methods we use objectively reveal clusters of similar respondents within the set of responses. We have never dictated the number of clusters; they are emergent from the patterns in the data. In fact, before 2018, we consistently found three clusters (Low, Medium, High). From 2018 to 2021, there were four. This year, we again see three. The report speculates on why this is the case, but it is too soon to tell if it is a lasting effect.

### Why is this year's report focused so heavily on security?
We dove deep on security in this year's research for two reasons:
1. In the past two years, multiple high-profile, catastrophic security breaches (see: [SolarWinds](https://www.businessinsider.com/solarwinds-hack-explained-government-agencies-cyber-security-2020-12), [Codecov](https://www.reuters.com/technology/codecov-hackers-breached-hundreds-restricted-customer-sites-sources-2021-04-19/), and [Colonial Pipeline](https://www.bloomberg.com/news/articles/2021-06-04/hackers-breached-colonial-pipeline-using-compromised-password) attacks) have brought the dangers of a vulnerable software supply chain to the public's attention.
2. Prior DORA research revealed the importance of incorporating software supply-chain security measures early, and throughout the development process. In 2021, for example, our data showed that elite performers excel in implementing security best practices, and that development teams that embrace security see significant value driven to the business.

> Do you have a question that is not answered here? Discuss it with the [DORA Community](https://dora.community)!
