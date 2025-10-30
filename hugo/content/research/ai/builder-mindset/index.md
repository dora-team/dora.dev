---
title:  "Understanding builder intent in the AI era"
date:  2025-10-17
updated: 2025-10-17
research_collection: "Artificial Intelligence"
draft: false
tab_order: "10"
author: "Kevin Storer"
tab_title: "Builder mindset"
authors:
    1: {name: 'Abey Stenman', url: 'https://www.linkedin.com/in/abeytid/'}
    2: {name: 'Bre Arder', url: 'https://www.linkedin.com/in/brearder/' }
    3: {name: "Dr. Kevin M. Storer", url: "/research/team/#dr-kevin-m-storer"}
    4: {name: 'Katharine Norwood', url: 'https://www.linkedin.com/in/katharine-norwood-33033a17/'}
headline: "Understanding builder intent in the AI era"
type: "research_archives/preview"
---

AI is fundamentally changing software development, not just *how* people build, but *who* can build. For years, a developer's identity was closely tied to their role. A title like "front-end engineer" was a reliable predictor of their skills, tools, and goals. But as AI abstracts away technical complexity, it decouples a person's role from the tasks they can perform, triggering a shift in developer identity for seasoned professionals and newcomers alike.

Because of this, the role-based personas that product teams have traditionally relied on are failing to capture a software builder's true needs. These labels are too simplistic in an era where a person's job title or skillset no longer predicts their goals. More importantly, they obscure a critical factor in this new landscape: **the nature of the risk users face when they entrust their development workflow to AI.**

So, how do we navigate this new landscape?

We propose a new framework based on large-scale, mixed-methods research. We argue that to build impactful AI based experiences for developers, we must focus on a builder’s intent as the most revealing indicator of what they need to succeed. We call this their Builder Mindset.

Our research identified four core mindsets that any builder can adopt for a given task. These aren't rigid personas; rather, they're fluid states that determine a user's approach, their definition of success, and the tools they require to build software safely and reliably.

## AI builders: The four mindsets

|  | The Founder | The Optimizer | The Accelerator | The Learner |
| :---- | :---- | :---- | :---- | :---- |
| **Primary intent** | **Monetize**<br>To rapidly validate a product idea and achieve market viability, often starting from a blank slate. | **Solve an internal problem**<br>To automate a process or improve a workflow with a reliable, integrated solution. | **Increase efficiency**<br>To augment expert skills, accelerate development velocity, and ship high-quality code faster. | **Fill a knowledge gap**<br>To acquire a new skill or master a new technology, regardless of starting proficiency. |
| **Build approach** | **AI as the dev team**<br>Leverages AI to accelerate a vision, deferring technical implementation to their AI partner. | **AI as an integrator**<br>Vets AI for its ability to perform a specific, reliable task within existing business systems. | **AI as a partner**<br>Uses AI to enhance existing skills and tools, augmenting their workflow, not replacing it. | **AI as a tutor**<br>Relies on AI for foundational, step-by-step guidance through the development process. |
| **Definition of success** | **Speed to MVP**<br>How quickly can I get a working prototype to test with real users or investors? | **ROI**<br>Does the solution reliably solve the business problem and save the company time or money? | **Code quality & development velocity**<br>Does the generated code meet professional standards? Does AI make me faster? | **Competence**<br>Did I successfully build something or gain confidence in a new skill? |
| **Technical proficiency** | **Variable, often irrelevant**<br>This mindset's goal is to transcend the need for manual coding, regardless of their skill level. | **Technically literate**<br>Not a full-time coder, but comfortable with technical concepts like APIs, data structures, and integration policies. | **Classically experienced**<br>Most likely to have classical software engineering experience with knowledge of specific languages and frameworks. Their proficiency is a primary asset. | **Defined by task-level proficiency**<br>This mindset is not defined by a fixed skill set, but by a learner's proficiency relative to the specific task at hand. It represents builders across the entire experience spectrum, from code novices to experts. It is an ephemeral state that any builder can enter; a brief, often interleaved moment of learning and skill acquisition within a larger workflow.  |
| **Example manifestations** | A product visionary launching an MVP<br><br>**Example prompt**<br>*"Create a restaurant deals app for my city where users pay an annual fee."* | An analyst building a custom dashboard<br><br>**Example prompt**<br>*"Connect to our BigQuery sales database and build a dashboard that shows daily revenue by region."* | A software engineer improving code quality<br><br>**Example prompt**<br>*"Refactor this component to use React hooks instead of class-based components."* | A UX designer learning front-end basics<br><br>**Example prompt**<br>*"Explain how to fetch data from an API in Javascript and display it in a list."* |

##  Putting the builder mindsets to work

Understanding these mindsets allows product teams to move beyond static, role-based personas and start designing for a builder's true intent. This framework can be used to develop targeted features, experiences, and metrics. For example, a team designing for the Optimizer Mindset might prioritize controls for compliance and existing codebase recognition, while features focused on the Accelerator Mindset could target development velocity and extensibility. Similarly, a team can measure success beyond traditional metrics, tracking a user's confidence score in an AI-generated solution or their reduction in cognitive load when performing a complex task with AI assistance. By designing for intent, product teams can better serve the diverse and evolving needs of every builder.

## A new design paradigm: Human-operated tools to human-AI collaboration

> "While most developers use AI to increase productivity, there is healthy skepticism about the quality of its output. This “trust but verify” approach is a sign of mature adoption." — [State of AI-assisted Software Development](/research/2025/dora-report/)

Understanding these mindsets reveals that we are at a fundamental inflection point in product development. With the rise of generative AI, we are now building systems where AI agents can consider, plan, and act to help a user achieve a goal. The relationship is no longer a person operating a tool; it's a person collaborating with an intelligent partner.

Designing for this new reality requires a new approach, built on two pillars:

1. **The spectrum of trust:** A builder's trust in AI is often inversely proportional to their technical proficiency relative to the task. Builders operating in the Founder Mindset and those in the Learner Mindset with low task-level proficiency operate with high, delegated trust, making them the most susceptible to severe risks like security vulnerabilities and missed best practices. For these states, robust guardrails are essential. Conversely, builders adopting the Accelerator, Optimizer, or Learner Mindset with high task-level proficiency typically practice low, verified trust, demanding maximum transparency and control to scrutinize the AI's work before they implement it into their systems.
2. **Fluid, multi-layered abstraction:** To serve this spectrum of trust and code proficiencies, we must design fluid, multi-layered experiences that facilitate different modes of interaction, from direct control to deep partnership, enabling users to choose their preferred level of collaboration with AI. Builders in the Founder Mindset often operate at the highest conceptual layer of product vision. Builders in the Optimizer Mindset work at a systems layer, focusing on integration and reliability. Builders in the Accelerator Mindset thrive at the lowest layer: the infrastructure and code. A successful experience doesn't just serve one layer; it provides seamless pathways for users to move between them as their needs and mindsets shift throughout their journey.

## Industry insights

This framework offers three key takeaways for anyone building developer tools or leading engineering teams today.

1. **Guardrails are essential.**
   A builder's trust in AI is not universal. A novice Learner will often trust an AI’s insecure suggestion, while an Accelerator will demand verifiable security controls. Because of this, we cannot expect every user to be a security expert. Outputs must be secure by default. By better [integrating security objectives into daily work](/capabilities/pervasive-security/), teams can achieve higher levels of software delivery performance and build more secure systems. Security must be built into the foundation of our tools, protecting those who delegate trust while empowering those who verify it.

2. **Bridge the abstraction gap with fluid design patterns.**
   High-abstraction environments (e.g., "no-code") serve as powerful on-ramps for those with low technical proficiency. However, they inevitably create friction later in the build lifecycle. Users hit a wall when they need to **troubleshoot, audit system behavior, or examine underlying code** for knowledge acquisition. The most impactful developer experiences must be designed as **multi-actor ecosystems** where both humans and AI are first-class participants. This requires providing seamless **paths** that allow users to move across abstraction layers without friction, ensuring the system is trustworthy by design. **Transparency** must adapt to the layer: a builder in the Founder Mindset may only expect a successful outcome confirmation, while a builder in the **Accelerator Mindset** requires visibility into the exact generated code.

3. **Assume everyone is building for production.**
   From a Founder’s MVP to an Optimizer’s internal tool, our responsibility is to ensure that AI-generated outputs meet the standards of a production application: secure, reliable, deployable, and cost-transparent. The [capabilities that drive software delivery and operational performance](/research/?view=detail) are critical for everyone. The bar is no longer a prototype that simply works; it's an application that is ready for the real world.

## The future is intent driven

The identity shift from fixed roles to fluid mindsets has profound implications for how we design software. It's a call for product leaders and developers to move beyond designing for complicated, human-operated tools and start designing for complex, human-AI collaboration.

This shift from a command-and-control paradigm to a co-pilot relationship is no longer theoretical. We are seeing it manifest with the emergence of new, intent-driven toolchains. In this context, intent is no longer just a human-facing goal; it is becoming an unambiguous, structured specification that AI agents can verify and execute. The recent introduction of [GitHub’s SpecKit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), for example, marks a pivotal moment, validating the shift from *‘code as the source of truth’* to *‘intent as the source of truth.’* It provides a structured way for builders to express their goals and exert control over their agents, reinforcing the very principles our research has uncovered.

By embracing a fluid, multi-layered approach to designing for a user's intent, we can navigate this inflection point and build the tools that will empower the next generation of builders, regardless of their background or role.
