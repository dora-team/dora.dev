---
headless: true
---

Measuring software development can help drive impactful change. However, it’s a complex task, and getting started can be daunting as it involves understanding what you should measure, and determining what you *can* measure.

The most important part is that you want to drive change in your organization through measurement. To do so, we recommend that you use frameworks to guide your measurement strategy. A framework breaks down a broad topic (for example, developer experience) into distinct concepts that can be measured (such as speed or satisfaction).

When industry and academia talk about measuring aspects of software development, they often reference frameworks such as [SPACE](https://queue.acm.org/detail.cfm?id=3454124), [DevEx](https://queue.acm.org/detail.cfm?id=3595878), [H.E.A.R.T](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/), and [DORA's software delivery metrics](/guides/dora-metrics/). Choosing a framework to measure software development can be a difficult and confusing step, but it doesn’t have to be.

### Step 1: Decide on why
The first step is to define what goals and decisions measurement will inform, because frameworks differ in their overarching goals. For example, common frameworks in software development focus on measuring developer experience, product excellence, and organizational effectiveness. Each of these overarching goals take a slightly different lens to understanding software development (see the figure below).

<object data="/insights/shared/measurement-frameworks/metrics-triangle.svg" id="metrics-triangle" type="image/svg+xml" class="responsive-svg"></object>

<figcaption>Types of frameworks typically applied to measuring software development.</figcaption>

To determine which framework is the best fit for your organization’s goals, it can be helpful to think of frameworks as the “why” behind measurement. They help you define why you’re trying to measure and guide the actions you take based on your findings.

Frameworks provide a lens through which to view your data, ensuring your efforts are aligned with your organizational goals. To decide on a framework, you can consider: Why now? Did something change that is motivating a desire to measure? How will you act on your insights? Are there decisions or improvements you can enable with measurement?

### Step 2: Decide on what and how
Now, the “what” you’ll measure is the actual metrics, the key concepts that contribute to the overarching framework, such as a velocity or adoption metric. Generally, there are two different types of data you can collect. This is the “how” of your data collection which will help you arrive at your metrics.

**Self-reported data** involves collecting information directly from developers about their experiences. This can be achieved through approaches such as:

* Surveys use questions to gather opinions, satisfaction levels, and perceptions on various aspects of work.
* Interviews and focus groups use one-on-one and group discussions to go deeper into specific experiences and topics.
* Diary studies collect *in situ* data collection of activities, thoughts, and experiences.

The strength of self-reported data is in its ability to capture subjective experiences and concepts that are difficult to quantify through automated means, such as satisfaction, well-being, or perceived effectiveness. A key advantage of self-reported data is that it doesn’t typically require extensive instrumentation or deep observability into developers’ toolchains.

However, self-reported data does present challenges in terms of standardization, comparability across teams, and scalability for large organizations. Its inherent subjectivity means that interpretations can vary, and it may be more susceptible to biases (including recall bias and social desirability bias).

**Logs-based measures** are collected automatically from the tools and systems developers use. These can include metric types such as:

* Quantity, to count specific artifacts. For example, the number of commits or number of users.
* Time-based, to record how much time is spent on a given activity. For example, the time spent coding or reviewing.
* Frequency, measuring the rate over a specific window of time. For example, monthly deployments, weekly PRs per developer.

The primary benefit of logs-based metrics is their ability to provide continuously measured and standardized data at scale. They offer a detailed view of activities and outputs.

However, they require sufficient observability into the developer toolchain, meaning the necessary integrations and data collection mechanisms must be in place, which can create a higher barrier to entry. It is also a common misconception that logs-based metrics are objective. Instrumentation approaches vary, errors can create inaccuracies, and interpretation is subject to bias.

A framework will provide you with the concepts you want to measure, but ultimately what you implement depends on your resourcing, and what data you have access to. Do you have the visibility into your toolchain for logs-based approaches or a research team to enable self-reported data collection? It’s important to recognize that not all organizations have the same resourcing and ability to implement metrics in the ways that might be recommended by a particular framework.

Even with organizational limitations, frameworks are a guide, a lens to help you better understand complex behavior—but they can not fully capture it. They’re intended to get you closer to the truth, but you shouldn’t expect to measure everything.

When considering how frameworks and metrics relate, it’s helpful to think of metrics as ingredients, and frameworks as the recipe that is made with the ingredients. Some core ingredients can be rearranged in different ways to make different recipes (the frameworks), while others are unique to a specific recipe. The meals will all taste different but some of the underlying ingredients are shared, and in many cases you don’t need to have all of the ingredients to make a meal that tastes good.

While frameworks differ because they are intended to drive different outcomes, some of their underlying metrics overlap. The diagram below illustrates some of the metrics that comprise frameworks and how they often overlap. For example, productivity metrics (such as code commits or pull requests) may be measured by all three frameworks. An organization might use these metrics to gauge the impact of a new team structure (organizational effectiveness), evaluate the effectiveness of a developer tool (product excellence), and to understand developer workload (developer experience).

In contrast, some metrics are more specialized. Developer well-being, often a key component of developer experience frameworks, is not typically a primary metric within organizational effectiveness or product excellence frameworks.

<object data="/insights/shared/measurement-frameworks/metrics-venn.svg" id="metrics-venn" type="image/svg+xml" class="responsive-svg"></object>

<figcaption>Examples of metrics that apply to different frameworks.</figcaption>

Choosing to use a single framework can help provide focus to the actions you take, and it is a good way to start. However, you’re not limited to one framework.

As goals and abilities to measure change, using multiple frameworks can help create [complementary analytical results](https://cloud.google.com/transform/unlocking-product-success-by-combining-dora-and-heart), resulting in a stronger whole than its parts. What matters is that you’re measuring as a way to hold yourself and your organization accountable to your goals, and that you are positioned to act on what you measure.

## Applying Measurement Frameworks in the Age of AI

You might be wondering, does the introduction of AI into development workflows change everything? Do the same frameworks apply or do we need new frameworks? When there is a technological disruption, it may seem necessary to completely overhaul your metrics collection strategy. We recommend careful consideration of what actually needs to be changed, especially when considering the impact of AI.

Adapting your goals to better understand how AI is impacting developer experience may require updating only a few metrics, allowing you to retain consistent measures overall. Instead of throwing out the entire framework, you can use existing measures as a baseline to help identify how a paradigm shift is changing the developer experience. For example, you may need to add metrics on the acceptance rates of AI suggestions, model quality, or trust, while keeping existing measures of developer experience, such as perceived productivity and time spent reviewing code.

As we see more substantial advances in AI, who is doing development tasks—and what those are—will change. So, measurement may have to adapt to include different user profiles and capture changing workflows, but the core goals behind why you are measuring developer experience likely haven’t changed. The point here is that if your overarching goal is the same, you don’t need to change your framework; you can expand your measurements to adapt to changes in technology.

Even if your goals do change, it does not necessarily result in starting a measurement program from scratch. Since metrics can contribute to different frameworks, you often can react quickly and rearrange the metrics in the service of new or additional frameworks. For example, understanding the impact of AI-powered developer tools on the code that is being produced is likely a new goal that organizations have not faced before. This is particularly challenging because we are trying to measure something as it is changing.

A common question organizations are facing is the impact of AI on code quality. As we see AI used to increase developer velocity, there is a particular concern that we are compromising quality for speed. These increases in developer velocity in the short term can seem positive; however, they may have [negative impacts on velocity in the long term if quality is low](https://getdx.com/research/measuring-ai-code-assistants-and-agents).

To address these concerns, your goal might be to ensure the code quality at your organization remains high while you drive adoption of AI-powered tooling. This goal involves aspects from each of the types of frameworks discussed and likely includes metrics you are already capturing (such as code quality, tool adoption, or perceived velocity).

So, you can continue to use your existing metrics while introducing new ones. For example, [combining DORA’s software delivery metrics with a product excellence framework such as H.E.A.R.T.](https://cloud.google.com/transform/unlocking-product-success-by-combining-dora-and-heart) can be an effective way to understand how developers are experiencing new AI-powered tools and the impact on software delivery.

Measuring software development is a complex and ongoing process. While many frameworks and measurement approaches are available, you must be positioned to act on what you measure. A critical aspect of ensuring effective action can be taken is aligning with your organization’s goals and getting leadership sponsorship for your measurement efforts.

Being intentional about the framework and measurements you choose can help set you up for long-term success. In the spirit of adopting a framework to meet a specific goal, you can consider how you might act on this information following the PDCA framework:

* Plan: figure out your goals, choose a framework, and get leadership support
* Do: get some baseline measures, do something differently
* Check: measure again to see how you’re progressing towards your goals
* Adjust: use your findings to change the approach moving forward

We are not here to recommend one framework over others. Determining the appropriate framework based on your goals can help guide what you measure and how you take action. Choose the framework that resonates with your organization. If it speaks to you and spurs your organization into action, it’s the right framework for right now.

While the frameworks provide a guiding structure, many of the underlying measures are the same. This means that measures you implement today can often be adapted and utilized as your needs and goals evolve, or change.
