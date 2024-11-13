---
title: "Value stream mapping for software delivery"
titleForHTMLHead: "Value stream mapping for software delivery"
date: 2024-08-19
updated: 2024-11-13
authors:
    1: {name: 'Andrew Davis', url: 'https://www.linkedin.com/in/andrewdavis-io/'}
    2: {name: 'Rob Edwards', url: 'https://www.linkedin.com/in/robedwards/'}
draft: false
weight: 300
headline: "How to use value stream mapping to improve software delivery"
subhead: A guide to value stream mapping.
heroimage: "value-stream-mapping.png"

---
## Visualization to improve organizational performance
The DORA research has repeatedly affirmed the power of improved software delivery and operational performance as key predictors of organizational success. This correlation holds true for both commercial and non-commercial goals, extending to positive impacts on well-being, such as reduced burnout and increased productivity.

![Capabilities predict performace, performance predicts outcomes](capabilities-performance-outcomes.png)


DORA emphasizes the role of effective [leadership](/guides/how-to-empower-software-delivery-teams/), [communication](/capabilities/generative-organizational-culture/), [product management](/capabilities/work-visibility-in-value-stream/), and [visualization](/capabilities/work-visibility-in-value-stream/) techniques in enhancing software delivery. Value Stream Mapping (VSM) is a prime example of how visualization can improve flow and performance.

**Visualization** involves using tools and techniques such as dashboards, Kanban boards, and value stream maps to make it easier to understand complex processes, identify bottlenecks, and track progress. This transparency enables better communication, collaboration, and decision-making, ultimately leading to improved software delivery and operational performance.

Visualization can support organizational performance improvement by fostering conversations about friction points in the delivery process, supporting a culture of continuous improvement. Such visualization and communication are cornerstones of lean software development.

Visualizing the flow of work through Value Stream Mapping (VSM) can help improve software delivery performance by enabling shared understanding and empathy regarding the software development process and identifying areas for improvement.

**Flow**, in the context of software development and operations, refers to the smooth and continuous movement of work through the value stream. When work flows smoothly, it means that there are minimal delays or impediments, leading to faster delivery times and improved efficiency. Continuous Delivery (CD) is a key enabler of flow, as it focuses on automating the software delivery process and establishing fast feedback loops, allowing teams to release software frequently and reliably.

**Value Stream Mapping (VSM)** is a lean management practice that helps visualize the entire flow of work, from idea to production, and identify bottlenecks and areas for improvement. By mapping out the value stream, organizations can gain a clear understanding of how work flows through their systems and identify areas where they can reduce waste, improve efficiency, and optimize for faster and more reliable software delivery.

Value Stream Mapping can be used to visualize the full end-to-end value stream from ideation to delivery. Physical industries use VSM to map the entire path from raw materials to finished goods. Knowledge work involves the transformation of ideas into experiences, documents, and software, but nevertheless follows a sequential process of value creation. DORA's research focuses on a subset of that larger value stream: the software delivery and operations process. The book [Flow Engineering](https://itrevolution.com/product/flow-engineering/) details how to optimize this process to improve team and organizational performance.

The practice of visualizing flow through VSM brings enormous benefits for organizational performance improvement:

* **Facilitates conversations**: Visual representations of the value stream, workflow, and key metrics facilitate better communication and collaboration among team members. This shared understanding helps teams have meaningful discussions about the software delivery process, which helps align everyone towards the common goal of delivering software quickly and reliably.
* **Identifies areas for improvement**: Visualization using VSM makes it easier to visually identify bottlenecks in the software delivery process and track the impact of improvements. By highlighting bottlenecks, waste, and inefficiencies, VSM enables teams to target their improvement efforts effectively.
* **Promotes continuous improvement**: VSM and flow optimization encourage a culture of continuous improvement by providing a framework for identifying and iteratively implementing improvements. Visualizations help track the impact of these improvements and make adjustments as needed.
* **Supports data-driven decision making**: VSM provides quantitative data on key metrics, allowing teams to make informed decisions based on evidence.
* **Documentation**: Keeping an accurate, current record of [how software has been developed](/capabilities/documentation-quality/) is a fundamental part of the process. Creating VSMs helps provide a clear understanding over time and a reminder of the journey that has been taken. Being able to look back and see improvements over time helps build the confidence and morale necessary for a continuous improvement culture.

## Defining your outcomes

Before rushing into a value stream mapping process, it is critical to define **clear improvement outcomes**. There are infinite changes that could be made. But which ones really matter? Helping a group move together towards accomplishing a chosen purpose is an act of [transformational leadership](/capabilities/transformational-leadership/).

Performance improvements made in isolation can be a complete waste of time. Investing time and money in improvements that do not help deliver strategic outcomes is a losing investment. It's critically important that teams begin by understanding an organization's strategic objectives, and how technical processes can help or hinder those objectives.

The first thing a team should focus on visualizing is not the value stream, but rather the outcomes the team is seeking to achieve. This can be accomplished through the practice of Outcome Mapping:

* Gather representatives of the key stakeholders involved in a process (aim for no more than ten people<sup><a href="#fn1" id="ref1">1</a></sup>).
* Begin by clearly stating what strategic improvement mandate(s) the group has been asked to accomplish.
* Set a timer and give the group time to brainstorm ideas and concerns about achieving this goal. What concerns are on the team's mind about this goal: problems, questions, ideas, context, etc. Using sticky notes on a physical or digital whiteboard is a great way to allow everyone to contribute ideas in parallel. We recommend a relatively brief period such as five minutes to maintain a sense of momentum for the group.
* Group those concerns into categories and vote on the primary area of concern. Restate that concern as an outcome that the group is seeking to achieve. Validate that achieving this outcome would be relevant to the key strategic goals that the team is responsible for delivering.
* Having clearly stated the outcome to be achieved, take time to enumerate the benefits of achieving that, obstacles that stand in the way, and next steps that the team should consider.

You can use any comparable approach to help the group clarify their target outcome. For more detail on this exercise, refer to the book Flow Engineering.

The outcome should be stated specifically. For example, rather than saying “_improve software delivery performance_” or “_get better at operations_,” set outcomes such as, “_Reduce the percentage of deployments that cause failures in production to <10% within the next 3 months_.” See the diagrams below for more examples.

![Example 1 - Reduce time to production, Example 2 - Reduce change failure rate](outcome-mapping-1.jpg)

![Example 3 - Implement a "double, half, quarter" approach](outcome-mapping-2.jpg)

## Understanding the two key software delivery value streams

There are actually two critical value streams involved in software delivery. The first is the **happy path**: the normal delivery process through which teams deliver new features and fixes. DORA's [throughput](/guides/dora-metrics-four-keys/#throughput) keys (lead time and deployment frequency) can be used to measure the efficiency of this happy path.

The second critical value stream is the path to **recovering from an incident**, the “recovery value stream”. This too involves fixes needing to be rapidly deployed to production. Rather than these changes delivering new value, such urgent fixes are designed to mitigate the risk and cost of downtime. DORA's [stability](/guides/dora-metrics-four-keys/#stability) keys (change failure rate and failed deployment recovery time) can help gauge the effectiveness of the break/fix path.

The recovery value stream is just as important as feature delivery. Its work items are urgent fixes, and their volume is the change failure rate (as a percentage) multiplied by the deployment frequency. The goal is to minimize breakfixes by reducing the change failure rate, even as deployment frequency rises.

Failed deployment recovery time is essentially lead time for these breakfixes. Optimizing the recovery value stream means making incident response as swift and seamless as possible.

![Software value stream and the four key metrics](software-value-stream.png)

## How to engage in value stream mapping

Now that you have clear outcomes and a path you want to map out, it's time to create a visual representation. Here's a step-by-step approach:

### 1. Map out the steps:

* **Start simple**: Begin with a blank canvas – a whiteboard, a large sheet of paper, or a digital collaboration tool.
* **Follow the flow**: Map out each distinct step in your software delivery process (or break/fix), from the moment code is committed to when it's deployed to users.
* **Find the right level of detail**: Strive for a balance between too much detail (overwhelming) and too little (missing improvement opportunities). If a step like "CI Build" seems problematic, break it down further in a second pass (such as "unit test," "linting," "integration test," "code analysis").

![Simple VSM example mapping the “happy path” flow from code commit to production deployment.](vsm-title.png)
Simple VSM example mapping the “happy path” flow from code commit to production deployment.

### 2. Capture information flow, wait times, and handoffs:

* **Arrows for flow**: Use arrows to clearly illustrate how work moves between steps.
* **Identify bottlenecks**: Highlight areas where work piles up or gets delayed. These are prime targets for improvement.
* **Quantify wait times**: Measure the time spent waiting between steps. This can reveal hidden inefficiencies.
* **Handoff friction**: Pay close attention to handoffs between teams. These are often sources of miscommunication and delays.

![An example value stream map](vsm-populated.png)

**Remember**: _The goal is not to create a perfect map on the first try. VSM is an iterative process. Start simple, gather feedback, and refine your map as you learn._

### 3. Consider how you measure flow:

* **Collect data**: Gather data on key metrics like lead time, cycle time, and deployment frequency. Refer to the [DORA capability catalog](/capabilities/) for measurement guidance.
  * **NOTE**: It's common that teams don't have this data readily available. It's tempting to want to gather precise metrics, but this can easily distract from the main point of the exercise. You generally need **low precision** in the data. It's common for some steps to take minutes, while others take hours or days. Improvements on the order of minutes will not have a significant effect in a process that takes many days to complete.
* **Use data to track progress**: This data helps quantify the impact of constraints and measure improvements over time.

Once your cross-functional team has mapped the value stream and confirmed that it's a reasonable approximation of reality, it's time to pinpoint the top constraints or friction points hindering flow and impacting delivery or operations.

Remember the outcome defined during the Outcome Mapping. While countless improvement opportunities may arise, disregard those that don't directly impact your target outcome. **Focus is key to avoiding endless effort with minimal results.**

If narrowing down the friction points proves challenging, leverage the [DORA capabilities](/capabilities/) descriptions to guide the conversation. The [DORA Quick Check](/quickcheck/) tool can also prompt insightful questions and enrich discussions, potentially revealing improvement areas. Prioritize constraints that significantly affect your target outcome.

Avoid overwhelming changes and prioritize incremental progress. Break down the problem into manageable chunks. By now, you should have a list of friction points, agreed upon by all stakeholders, that align with your desired outcomes.

## Take action and make meaningful change

You now have a targeted list of potential improvements. The most critical step is to collectively agree as a team and take action on one that is within your power to change and offers the biggest return on investment. **Avoid analysis paralysis and prioritize action.**

Start with one improvement initiative and focus on delivering tangible, demonstrable results. Develop and implement action plans as [experiments](/capabilities/team-experimentation/) to address the identified constraints and improve flow. Monitor the impact of your actions on the key metrics and adjust as needed.

Utilize the [DORA capabilities catalog](/capabilities/) as a shared language and framework for improvement. They offer definitions, implementation guidance, common pitfalls to avoid, and measurement strategies.

Once you've completed an experiment, cycle back through the process, select the next initiative, and iterate. This establishes a continuous cycle of improvement and learning.

## The long-term effects of value stream mapping

Value stream mapping, when integrated with the practices emphasized by DORA, yield lasting benefits:

* **Improved software delivery performance**: By optimizing flow and eliminating bottlenecks, organizations can significantly improve their software delivery performance metrics, such as deployment frequency, lead time for changes, and change failure rate.
* **Enhanced operational efficiency**: A focus on flow and continuous improvement leads to streamlined operations, minimizing wasted time and resources. Visualization tools offer valuable insights into operational metrics, enabling teams to pinpoint and address areas for optimization.
* **Increased transparency and accountability**: Visualization makes work processes transparent and accessible, fostering a culture of accountability and ownership. Teams can easily track progress, identify potential issues early on, and make informed, data-driven decisions.

## Next Steps

The goal of transformational leadership is to set a strategic course and then empower and enable those around you to accomplish this goal. Outcome mapping is a powerful tool for helping a group to reconcile an organization's strategic goals with the immediate felt challenges of the group. Value stream mapping is a powerful way of helping the group build the clarity they need to pinpoint areas for improvement. The DORA guides and capabilities offer robust, scientifically validated recommendations to steer your efforts toward success.

To ensure impartiality and avoid potential organizational roadblocks or bias, consider engaging an impartial facilitator to guide the VSM process. This can help sidestep any internal politics that might hinder collaborative decision-making.

By following this framework and leveraging the available resources, organizations can effectively utilize VSM to drive continuous improvement in their software delivery process and achieve their desired outcomes.

DORA's research provides a shared language and framework for improving software delivery and operations, while VSM offers a visual language that the whole team can understand. The key to success lies in strong leadership that advocates for change, clear agreement on the most impactful constraint, and an empowered team inspired to take action and measure the results.

### Guide Discussion
This guide was discussed during a [dora.community](https://dora.community) meeting in October 2024, the recording can be found here;
{{< youtube HBEtKSIznn0 >}}

### Resources or further reading

* **Community Discussion**: [Discussion](https://youtu.be/HBEtKSIznn0?si=GCKN9otgtktOgqD2) on Value Stream Mapping (VSM), a methodology for visualizing and improving workflow processes (summary of this guide).
* **Flow Engineering**: Dive into the book [Flow Engineering: From Value Stream Mapping to Effective Action](https://itrevolution.com/product/flow-engineering/) for a comprehensive guide to optimizing flow in software delivery.
* **Outcome mapping**: Leverage outcome mapping to define and track the desired outcomes of your improvement initiatives.
* **Lean software development**: Learn about lean principles and practices that can be applied to software development.
* **Lean product development**: Discover how lean principles can be used to create valuable products efficiently.
* Join the [DORA Community of Practice](https://dora.community/): Share your experiences and learn from others on a similar journey.


<sup id="fn1">1. Pereira, Steve and Davis, Andrew. [Flow Engineering: From Value Stream Mapping to Effective Action](https://itrevolution.com/product/flow-engineering/) (IT Revolution Press, 2024), 63.<a href="#ref1" title="Jump back to footnote 1 in the text.">↩</a></sup>