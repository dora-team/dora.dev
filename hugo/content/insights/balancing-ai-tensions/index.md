---
title: "Balancing AI tensions: Moving from AI adoption to effective SDLC use"
date: 2026-03-09
updated: 2026-03-09
draft: true
authors:
    1: {name: "Jessica Baolin", url: "https://www.linkedin.com/in/jessicalin5/"}
    2: {name: "Nathen Harvey", url: "https://www.linkedin.com/in/nathen"}
headline: "Balancing AI tensions: Moving from AI adoption to effective SDLC use"
type: "insights"
tags: ["AI", "Adoption", "Culture", "Productivity"]
layout: single
summary: "While AI accelerates initial code generation and reduces start-up friction, it introduces hidden taxes like heavy verification overhead, skill degradation, and integration challenges. Leaders must adapt holistic metrics, review processes, and team training to ensure sustainable success."

---

The [2025 DORA State of AI-assisted Software Development report](/dora-report-2025/) found that 90% of technology professionals now use AI at work, and over 80% believe it has increased their productivity.

Extensive qualitative analysis of enterprise software engineers reveals that AI's impact on the SDLC is not a simple linear improvement. Instead, it presents a series of profound tradeoffs. While AI successfully accelerates initial code generation and reduces the friction of starting new tasks, the time saved in creation is frequently re-allocated to auditing and verification. This tension may explain some of our own findings: higher AI adoption is associated with an increase in  both [software delivery throughput](/guides/dora-metrics/#throughput) and [software delivery instability](/guides/dora-metrics/#instability).

AI’s primary role in software development is that of an amplifier. It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones. If an organization has a high-quality internal platform, strong APIs, clear workflows, and strong testing practices, AI acts as a powerful collaborator. However, if a team suffers from fragmented tooling, siloed data, or fragile infrastructure, AI will simply help them generate technical debt faster.

Before exploring three key tradeoffs of AI adoption and providing actionable strategies, let's look at the data driving these insights to understand how teams are actually using AI today.

## The state of AI in the SDLC: How teams are using it

### Research methodology

To better understand the practical impact of AI on the SDLC, researchers conducted a thematic deep dive into 1,110 open-ended survey responses from Google software engineers in Q3 2025\. This survey item asked engineers to share their thoughts on how AI-powered tools had impacted their development workflows over the previous three months.

The frequency of specific use cases in the survey data provides a strong signal of where AI is currently most visible and impactful for engineering teams. The majority of feedback centered on four core activities: code generation, information seeking, code review, and testing.

Several other specialized applications received notable volume, indicating areas where AI is beginning to provide meaningful, albeit less robust, impact. These emerging applications include debugging, prototyping, idea generation, writing documentation, refactoring, and learning.

Methodologically, it’s important to note that respondents may have been primed to some extent to comment on code generation based on preceding survey questions. Nevertheless, use case frequency in the comments may still underscore how prominent each is as touchpoints for engineers.

When analyzing the qualitative feedback across these applications, researchers identified clear universal themes mapping to positive (✅) and negative (❌) sentiments. The table below illustrates where AI is currently driving value versus where it is introducing friction across the top and secondary use cases based on respondents’ comments.

| Themes | Code generation | Information seeking | Code review | Testing | Debugging | Prototyping | Idea generation | Writing documentation | Refactoring | Learning |
| :---- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| ✅ Increased velocity | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ✅ Bridge knowledge gaps | ✅ | ✅ |  | ✅ | ✅ | ✅ | ✅ |  |  | ✅ |
| ✅ Cognitive collaborator | ✅ |  | ✅ |  | ✅ | ✅ | ✅ | ✅ | ✅ |  |
| ✅ Reduce friction to start | ✅ |  |  | ✅ |  | ✅ | ✅ | ✅ |  |  |
| ✅ Boilerplate automation | ✅ |  |  | ✅ |  | ✅ |  | ✅ | ✅ |  |
| ✅ Information synthesis |  | ✅ | ✅ |  | ✅ |  |  |  |  | ✅ |
| ❌ Verification overhead | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ❌ Hallucinations | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ❌ Knowledge limitations | ❌ | ❌ | ❌ | ❌ | ❌ |  | ❌ |  | ❌ |  |
| ❌ Skill degradation | ❌ |  |  |  |  |  |  |  |  | ❌ |
| ❌ Creating debt | ❌ |  |  |  |  |  |  | ❌ |  |  |

AI successfully drives increased velocity across all ten use cases, from code generation to learning. However, this speed comes with tradeoffs.

## Where AI is driving immediate value

Software engineers in our study reported that the most successful applications of AI function as a labor-saving mechanism that drives increased velocity. AI drives immediate value by acting as a high-speed drafting assistant, excelling at boilerplate automation. By handling the elimination of manual typing for predictable patterns and the automation of rote implementation details, AI allows software engineers to focus on more technically creative aspects such as high-level logic and architecture.

Furthermore, AI serves a powerful psychological function by reducing the friction to start tasks. Starting a new project often requires overcoming a high activation energy barrier, but by providing an initial draft, the AI moves the engineer from a state of creation to a state of editing. Engineers also frequently use AI as a cognitive collaborator, treating it as a sounding board to externalize logic and verify assumptions before peer review. As one engineer in our study noted:

> “I get frozen in front of a blank page. Giving me a place to dump ideas and refine them has made \[AI tools\] key parts of my workflow.”

AI is also highly effective at helping developers bridge knowledge gaps. It functions as a timely tutor, allowing engineers to remain productive in unfamiliar languages or navigate legacy codebases without prior domain context. Similarly, AI aids in information synthesis by summarizing fragmented documentation, logs, or source files into concise summaries and actionable insights, which can collapse multi-hour research tasks.

These results are similar to the findings in the [2025 DORA report](/dora-report-2025/) which shows that a vast majority of developers surveyed widely recognize AI's positive impacts on their individual productivity.

## The hidden taxes of AI adoption: Navigating the tradeoffs

While AI acts as a capable tutor and drafting assistant, this rapid generation of code and concepts comes with a cost. Despite widespread adoption and clear productivity boosts in certain parts of the SDLC, relying on AI introduces new friction points. Rather than a linear improvement, AI introduces a series of tradeoffs where gains in one area often create new challenges elsewhere.

Here are the three core tensions technology leaders must navigate:

### 1\. The push and pull on velocity

**The verification tax: Time saved writing is often re-spent auditing.** While the perception of increased velocity is a primary driver of AI adoption, it is constantly moderated by a hidden verification tax. The [2025 DORA report](/dora-report-2025/) highlights a critical vulnerability, noting that 30% of developers currently report little to no trust in the code generated by AI. Because AI tools are currently incapable of signaling uncertainty and output hallucinations with high confidence, engineers are forced to treat every interaction as potentially deceptive.

Consequently, the time saved during initial code or content generation is often re-allocated to verification overhead and prompting overhead, where engineers spend significant time auditing output or fine-tuning instructions to achieve correctness. Verification is a fundamentally different cognitive task than creation. As one developer explained:

>> “I feel somewhat more productive, but it's at a cost. While I end up spending less time writing code, I spend more time babysitting the AI and reviewing what it is trying to do.”

This dynamic is creating a shifting burden within engineering teams, specifically during the code review process. Velocity gains for an individual author frequently translate into a significantly increased cognitive load for the reviewer. While an author can use AI to quickly generate a massive changelist (CL) or pull request (PR), the reviewer is still expected to manually audit every single line for correctness and style. The stark reality is summarized by one engineer's observation:

>> “Reviewing \[another’s\] code is so much harder than writing it. AI tools are increasing the rate at which people can churn out code that needs to be reviewed…”

###

**The drive for rapid output risks introducing subtle bugs, technical debt, and hollow documentation, at least in the short term.** It’s one of many factors that can stand in opposition to the long-term health of the codebase; this is because we are offloading a lot of development work to non-deterministic tools that are not fully adequate yet at producing fully trustworthy and high quality outputs. Right now, the combination of mediocre code and generic documentation risks lowering codebase quality, effectively polluting the ecosystem. As AI tools mature–in their ability to both generate code and verify intent, correctness, and quality– the tradeoffs between creation speed and output quality will likely diminish.

>> “AI tools increase my productivity, they write code faster than I could, but the code is (currently) lower quality than I could write myself.”

This tension is mirrored at the macro level where the 2025 DORA report points out that higher AI adoption is associated with an increase in both [software delivery throughput](/guides/dora-metrics/#throughput) and [software delivery instability](/guides/dora-metrics/#instability).

### 2\. The expertise paradox

**Lowering entry barriers with AI provides a powerful safety net, but risks bypassing the "productive struggle" necessary for deep technical expertise.** While AI can help bridge knowledge gaps quickly and serve as a cognitive collaborator, it ultimately can lead to superficial learning and long-term skill degradation ([Kam, M., Miller, C., et al., 2025](https://doi.org/10.1145/3696630.3727251)). This is particularly exacerbated when AI tools validate a user's initial assumptions regardless of architectural merit, and the developer doesn’t have the expertise to verify correctness in new domains.

>> “AI powered development has allowed me to develop more quickly in areas I don't have experience in, but that means that I occasionally get a sense of 'the blind leading the blind' where I don't have enough context to ensure that the AI is correct.”

The [2025 DORA report](/dora-report-2025/) echoes this, noting that these usage patterns deliver breakthrough productivity while simultaneously blocking skill development, effectively limiting the hands-on problem-solving essential for true apprenticeship.

### 3\. The workflow gap

**AI can speed up the initial bulk of the work (prototyping), but the remainder of the work (production integration) often neutralizes those gains.** While a prototype can be built almost instantly, the final stretch—which requires precision, edge-case handling, and integration with internal systems—can take more effort than if the project had been built manually from the start. This gap persists because AI has primarily targeted inner loop activities. As AI and agents increasingly move into outer loop workflows, we expect the friction between prototyping and production to diminish.

Furthermore, flow and momentum can be neutralized by tool sprawl. In other words, the cognitive effort required to choose between and manage multiple, disconnected internal AI tools creates a new layer of decision-making toil that disrupts the very flow state these tools were meant to preserve.

>> “It's hard to know which AI tool to use for a given task and whether the AI will be able to complete the task…”

## Practical insights for teams and leaders

To successfully navigate the complex tradeoffs introduced by AI, technology leaders must move beyond simply encouraging tool adoption and focus on its effective use. The following recommendations offer actionable strategies to help organizations adapt their metrics, review workflows, and training, ensuring that AI acts as an amplifier for sustainable success rather than a catalyst for quality degradation and technical debt.

### Measure impact, not output

While measures like lines of code accepted may still be a worthwhile indicator of tool adoption and effectiveness, AI can easily inflate the volume of code generated; therefore, leaders must stop relying on such narrow, output-based metrics as a measure of actual productivity. AI hasn’t created this measurement problem; it has simply magnified a fundamental flaw that has existed for decades.

Identify holistic [measurements that fit your organizational goals](/insights/measurement-frameworks/) and build sustainable practices for your team.

* Google uses speed, ease, and quality (SEQ) as indicators of developer productivity.
* The [SPACE](https://queue.acm.org/detail.cfm?id=3454124) framework can help you identify a constellation of metrics to understand and influence developer productivity.
* The [H.E.A.R.T.](https://cloud.google.com/transform/unlocking-product-success-by-combining-dora-and-heart?e=48754805) framework can help your team stay connected to users’ experiences with your products.
* [Value Stream Management (VSM)](/guides/value-stream-management/) can be used to evaluate current processes and to identify system bottlenecks signaled by downstream indicators like code review turnaround times, failed deployment recovery time, deployment rework rates, and production incidents.

### Adapt the code review process

Organizations must rethink how, when, and why code is reviewed:

* **Shift automation and AI to the author:** AI-generated feedback on the code should be delivered to the author during the writing phase to catch issues earlier, which is far more efficient than providing AI-generated feedback on the code to the reviewer to catch later.
* **Use agents to improve the review process:** Rather than just using AI to generate more code, teams can build [context-aware](/capabilities/ai-accessible-internal-data/) review agents to automatically enforce organizational standards before human intervention is required.
* **Work in small batches:** Enforcing the discipline of [working in small batches](/capabilities/working-in-small-batches/) is a critical countermeasure to the risks of AI-assisted development. Forcing large AI-generated changes into reviewable, testable units translates individual efficiency gains into real-world product performance.
* **Revisit the necessity of async reviews:** As AI decreases the time needed to generate code, organizations should question if traditional asynchronous code reviews are still optimal. Investing in robust [test automation](/capabilities/test-automation/) for faster feedback may provide a better return on investment than optimizing manual reviews.

More broadly, traditional code review is a quality gate, and in this new era of AI, it may be worth thinking about the purpose of the quality gate itself and whether other techniques could fulfill parts of it.

### Plan for the workflow and production readiness gap

While AI significantly lowers the barrier to start, it does not inherently simplify the rigorous requirements of production-grade engineering. Leaders must bridge this gap:

* **Adjust estimations:** Project timelines must explicitly account for the discrepancy between rapid prototyping and the effort required to achieve production-grade quality. Don’t reduce estimates before investing to close this gap.
* **Enable AI-accessible internal data:** Generic tools struggle with the "last mile" of production integration. [Linking AI directly to your proprietary codebase and documentation](/capabilities/ai-accessible-internal-data/) reduces this friction, which has the potential to multiply code quality and developer effectiveness.
* **Reduce tool sprawl:** Minimizing this sprawl prevents decision-making toil and preserves the developer's flow state. Rather than considering how to add AI into individual tools, consider holistic journeys that developers take. Additionally, organizations need to consider stability in a time where new tools are popping up at a rapid pace; there is a balance to ensuring you are keeping up with the latest new tools but ensuring your development organization is not impeded by constant change.

### Safeguard Deep Expertise

To combat skill degradation and superficial learning, engineering leaders must actively preserve time and space for deep learning. Lowering entry barriers to new domains risks creating false expertise by allowing engineers to bypass the productive struggle necessary for deep, long-term learning.

In practice, this can look like engineering leaders actively pairing junior engineers with senior mentors to review AI-generated architectural decisions, or even encouraging manual coding for complex system components to ensure foundational understanding is built. Organizations must jointly optimize for productivity and skills development among their employees to maintain a sustainable, innovative edge.

## Conclusion

AI is fundamentally shifting the rules of software development, but it hasn’t replaced the need for engineering rigor. Drawing from the experiences of 1,110 Google developers and echoing the 2025 DORA research, it is clear that sustainable success depends on navigating the inherent tradeoffs that arise. Use these practical insights to adapt your workflows and ensure your team remains high-performing in an AI-assisted future.
