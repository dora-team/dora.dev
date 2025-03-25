---
title: "Faq"
date: 2023-03-23T21:26:37Z
draft: false
type: faq
bannerTitle: Frequently Asked Questions
---
## DORA Quick Check
### What do my results mean?
Your quick check results include an overall software delivery performance score, on a a scale from 0 to 10. This blended metric is derived from the four individual metrics, which are also presented individually. Following the methodology from the [2023 Accelerate State of DevOps Report]({{< ref "/research/2023/" >}}), all scores are normalized to a 10-point scale for convenience. You can compare your results to benchmarks derived from DORA's 2024 research program.

## DORA Core
### What is [DORA Core](/core/)?
DORA’s research program is continuous and ongoing; each year brings new avenues of inquiry, and each analysis yields new insights. At the cutting edge, new concepts are introduced frequently, and artifacts (especially the [Accelerate State of DevOps Reports]({{< relref "/publications" >}}) are continuously released, revealing new insights and dynamics. With each study, some prior findings are reinforced, while others may be called into question. This is a hallmark of good science: any new finding is to be considered suspect—intriguing, but suspect—until it has been validated through replication and application. Meanwhile, practitioners are encouraged to apply the research in their own professional contexts. In such contexts, it can be challenging to keep up with the latest developments from DORA: cultural transformation efforts in a large organization require a steady hand, persistent over stretches of time measured across multiple years. An attempt to update one’s practices to match the pace of the research can lead to counterproductive churn. In these contexts, it’s more practical to rely on “evergreen” artifacts. DORA Core represents a distillation of DORA’s most foundational findings: metrics, capabilities, and outcomes that the research has repeatedly surfaced. It enables teams to focus their improvement efforts even more precisely on what is likely to produce tangible benefits to their organizational goals and quality of life.

### Which concepts are included in Core?
DORA Core encompasses the set of concepts that have been perennially studied by DORA and whose interactions are well supported. These concepts include capabilities like [Continuous delivery](/capabilities/continuous-delivery) and [Generative organizational culture](/capabilities/generative-organizational-culture), metrics like [the "Four Key" metrics](/guides/dora-metrics-four-keys/), and outcomes like organizational performance. These established ideas contrast with areas of inquiry, or divergent predictive pathways, which have shown promise when we’ve studied them, but aren’t (yet) as well supported as part of DORA’s predictive model. A concept may be considered for Core if: a) it has been researched at least twice; b) practitioners have found it valuable; c) continued exploration is warranted. This rubric is, by design, a subjective one: it draws heavily on the data and analyses, but it's ultimately guided by intuition. So please contribute! Your intuition is valuable; if you feel like something doesn’t accurately reflect the research, please let us know.

### How does Core change over time?
The application of research is necessarily less volatile than the research itself. But it’s not static. Core will evolve over time, and things we’re starting to investigate now will, once established, “graduate” into core. A threshold of support is required for inclusion in core; likewise, if sufficient evidence is collected to support the removal or alteration of something in core, it will be deprecated. Core is informed by, and evolves with, the research—but more slowly.

### What's new in Core V2?
The second iteration of Core was published in July 2024, and represents several significant changes inspired by new research findings and feedback from our practitioner community. The overall structure of the model has been greatly simplified to emphasize the fundamental relationship between _capabilities_, _performance_, and _outcomes_. Going further, to make it easier for those new to DORA, a "summary" view now presents only the highest-level entities and their relationships; users can click "detail" to expand the diagram. New capability groupings reflect the benefits that capabilities provide to teams. Several capabilities have been added, modified, or removed. Reflecting DORA's ongoing research into operational performance, Reliability has been added as an important element of performance. Read more about what's new in version 2, and the rationale behind those changes, in the [DORA Core V2 GitHub Discussion](https://github.com/dora-team/dora.dev/discussions/582).

### Are all research years treated equally?
No. Some findings have proven to be extremely durable, replicating year after year. But, as one expects when studying a dynamic context, other findings have changed. Plus, every year, we add or subtract areas of study. Our goal with Core is to create something that’s durable across years, while also evolving as we continue to learn.

_DORA Core is an ongoing effort. Learn more, and provide feedback, in [DORA GitHub Discussions](https://github.com/dora-team/dora.dev/discussions)._

## Research and data
### How can I access DORA's research findings and data?
DORA is committed to sharing our research insights and methodologies to benefit the broader community. We believe in the power of transparency and collaboration to drive continuous improvement in software delivery and organizational performance.

* **Our research reports**: We publish [detailed reports](/publications/) that contain in-depth analyses, key findings, and actionable recommendations based on our research programs.
* **Research methods and survey questions**: We make our research methods and survey questions available under a Creative Commons license, allowing others to learn from our approach and potentially replicate or adapt our studies. You can find these resources within our reports and annual research archives. For example, [the questions used in our 2024 survey](/research/2024/questions/).
* **DORA Community and ecosystem**: Our findings have fostered a vibrant community and ecosystem. Organizations worldwide have leveraged our research to conduct their own internal studies, further validating and extending our findings. We encourage you to [join the DORA community](https://dora.community) to connect with like-minded individuals, share your experiences, and learn from others who are applying DORA's principles and insights.

While we openly share our research insights and methodologies, we do not share the raw data collected from our studies. This is to ensure the privacy and confidentiality of the organizations and individuals who participate in our research.

## Accelerate State of DevOps Report 2024
### I found an error in the report. How can I report it?
The report has a version number printed in the footer of every page, for example `v. 2024.2`. Check that you have the [latest version of the report](/vc) and the [list of errata for the 2024 report](/research/2024/errata/) before submitting a correction. If you've found an error in the Accelerate State of DevOps Report 2024, or any other DORA publication, please [submit a correction](mailto:dora-advocacy@google.com?subject=DORA+State+of+DevOps+Report+2024+error+report). Thank you!

## Accelerate State of DevOps Report 2023
### I found an error in the report. How can I report it?
The report has a version number printed in the footer of every page, for example `v. 2023-12`. Check that you have the [latest version of the report](/vc) and the [list of errata for the 2023 report](/research/2023/errata/) before submitting a correction. If you've found an error in the Accelerate State of DevOps Report 2023, or any other DORA publication, please [submit a correction](mailto:dora-advocacy@google.com?subject=DORA+State+of+DevOps+Report+2023+error+report). Thank you!

## Accelerate State of DevOps Report 2022
### What is different in the 2022 Accelerate State of DevOps Report?
Comparing the 2022 results to the 2021 results, there are a number of findings that did not follow trends that we have seen consistently over the past several years. In fact, there were enough of these that we chose to add a section to the report—"Surprises"—summarizing them.

### _Why_ are things different?
In a word: science. Fundamentally, our data collection methods are the same as they have been since the beginning of this research project, in 2014. But each year, there is a different (though likely overlapping) set of respondents, and we ask new or updated questions, and we perform different analyses. And of course, the world is always changing. We attempt to make sense of the data as we see it, and the data offered some surprises this year. In some cases, these major shifts reflect changes in the external reality of our respondents' practices and outcomes. In other cases, these may be artifacts of sampling and analysis methods. We cannot know for sure which is which, but we offer potential explanations that attempt to make sense of what the data tell us.

### Why were there only three clusters of performance in 2022?
The analytic methods we use objectively reveal clusters of similar respondents within the set of responses. We have never dictated the number of clusters; they are emergent from the patterns in the data. In fact, before 2018, we consistently found three clusters (Low, Medium, High). From 2018 to 2021, there were four. In [2022](/research/2022/dora-report/), we found only three. The report speculates on why this is the case. You may have noticed that the [2023](/research/2023/dora-report/) and [2024](/research/2024/dora-report/) reports found four clusters.

### Why is the 2022  report focused so heavily on security?
We dove deep on security in this year's research for two reasons:
1. In the past two years, multiple high-profile, catastrophic security breaches (see: [SolarWinds](https://www.businessinsider.com/solarwinds-hack-explained-government-agencies-cyber-security-2020-12), [Codecov](https://www.reuters.com/technology/codecov-hackers-breached-hundreds-restricted-customer-sites-sources-2021-04-19/), and [Colonial Pipeline](https://www.bloomberg.com/news/articles/2021-06-04/hackers-breached-colonial-pipeline-using-compromised-password) attacks) have brought the dangers of a vulnerable software supply chain to the public's attention.
2. Prior DORA research revealed the importance of incorporating software supply-chain security measures early, and throughout the development process. In 2021, for example, our data showed that elite performers excel in implementing security best practices, and that development teams that embrace security see significant value driven to the business.

> Do you have a question that is not answered here? Discuss it with the [DORA Community](https://dora.community)!
