---
title: "Customer feedback"
titleForHTMLHead: "DevOps Capabilities: Customer Feedback" # TODO: can we DRY this out?
date: 2023-03-24T12:54:18Z
category: process
draft: false
headline: "Drive better organizational outcomes by gathering customer feedback and incorporating it into product and feature design."
summary: "A summary (150-250 words) that describes this capability."
---

In software projects, developers often work on products for months or years,
sometimes for multiple releases without validating whether the features they're
building are actually helping users solve their problems, or whether the
features are being used at all.

Customer feedback is part of a wider group of capabilities, including
[visibility of work in the value stream](/devops-capabilities/process/visual-management),
[working in small batches](/devops-capabilities/process/working-in-small-batches),
and
[team experimentation](/devops-capabilities/process/team-experimentation),
that together represent a
[lean approach to product management](https://books.google.com/books/about/Escaping_the_Build_Trap.html?id=PQ8dMQAACAAJ).

When these capabilities are applied together, they help predict the following:

-   Software delivery performance, which is measured in terms of delivery
    speed, stability, and availability.
-   Organizational performance, which is measured in terms of profitability,
    market share, and productivity.

DevOps Research and Assessment (DORA) research
[shows](/publications/pdf/state-of-devops-2016.pdf#page=35)
(PDF) that teams achieve higher performance when they work in organizations that
utilize those capabilities and also do the following:

-   Collect customer satisfaction metrics regularly.
-   Seek out and attend to customer feedback on product and feature quality.
-   Use this feedback to help design products and features.

## How to implement customer feedback

When you are developing a product, it's important to establish key metrics to
gauge its success. These metrics help you understand whether you're solving a
real problem, whether your solution is being adopted sufficiently quickly, and
whether users continue to use it and recommend it to others. These metrics must
be explicitly derived from how customers interact with the product. Using these
metrics requires you to carefully gather and analyze customer feedback.

One set of metrics that's popular in consumer-facing SaaS products is AARRR:
acquisition, activation, retention, referral, and revenue. (The order is
sometimes different depending on who is presenting them.) These are sometimes
known as *pirate metrics* because the acronym spells out a word that's
stereotypically associated with how pirates talk.

The idea is to look at five key metrics and iterate your customer experience to
improve on them:

-   **Acquisition**: The percentage of users that come to your site who
    create an account.
-   **Activation**: The percentage of acquired users that activate their
    account and use the service.
-   **Retention**: The percentage of activated users that return to the service.
-   **Referral**: The percentage of retained users who refer other users to
    the service.
-   **Revenue**: The percentage of referring users who actually pay money
    for the service.

If these metrics aren't suitable for your business or product, it's essential
to discover some that are suitable, monitor those metrics regularly, and use
them as a key driver of your product strategy.

The approach described in this article is not just for external-facing
products. It applies equally to internal products and services that are built
for other users in your organization. Building internal tools requires exactly
the same approach: early and frequent engagement with real users to ensure what
you're building actually solves their problem. Otherwise, you might end up
building and using tools that nobody uses. This is discouraging for those who
work on the tools and frustrating for those who have to use tools they don't
like. It also represents significant costs for the company in building a poor
technology match for its users.

A team should use the following pattern in order to maximize their chances of
successfully solving customer problems:

1.  Gather customer feedback first, before defining any potential features.
1.  Validate that you're solving a real problem.
1.  Iterate on a solution that actually solves that problem (and nothing more).
1.  Ensure the solution results in a viable business (for example, the cost
    is less than the anticipated revenue).
1.  Track key metrics to gauge success (for example, AARRR).
1.  Iterate through the above to improve those metrics.

Success requires you to not only deploy and release software quickly, but to
address customer needs better, smarter, and faster. This can be achieved by
experimenting more thoroughly than your competition. Retail is one industry that
[has seen particular success with this](/publications/pdf/state-of-devops-2019.pdf)
(PDF).
Techniques such as
[hypothesis-driven development](https://www.thoughtworks.com/insights/blog/how-implement-hypothesis-driven-development),
defining and measuring your customer acquisition funnel, and A/B testing allow
you to perform user experiments. This can foster creativity, speed up
innovation, and create organizational learning.

Increased engagement with customers and participation in product management
processes contributes to stronger identification with your organization's
[goals and values](/publications/pdf/state-of-devops-2019.pdf#page=37)
(PDF). This in turn helps contribute to organizational performance.

## Common pitfalls

Some common pitfalls to effectively using customer feedback include the
following:

-   **Failing to gather feedback**. It's common for software development
    companies to not gather customer feedback at all.
-   **Gathering feedback too late**. Sometimes companies gather customer
    feedback so late in the software delivery lifecycle that they cannot act on it.
-   **Not understanding the problem** (or misinterpreting customer
    feedback). Companies can have unrealistic expectations of their customers,
    or might not understand what customers want from the product. The team
    might even explicitly ignore inconvenient but accurate customer feedback.
    This situation can arise when a development team hasn't adequately
    evaluated or managed the risk of delivering the solution at hand, or simply
    doesn't understand the problem to solve. A development team wants to keep
    the scope of their work to the minimum that's required to solve a problem.
    In some cases, if the problem is larger than what the team has designed
    for, the team might incorrectly dismiss the additional work as
    "scope creep."  This results in an incomplete solution from the customer's
    perspective, and ultimately results in a failed product.
-   **Failing to allow teams to act on feedback**. Delivery teams must be
    empowered to make changes to the design or specification of the system in
    response to feedback, as discussed in the document on
    [team experimentation](/devops-capabilities/process/team-experimentation).
-   **Measuring success based on the wrong metric**. In some cases,
    solutions without sufficient customer validation are provided to
    development and delivery teams as finalized requirements. In those cases,
    the success of the delivery team is then measured based on whether they
    delivered the feature as specified, not on whether the team actually solved
    the problem or achieved the outcome for customers.
-   **Failing to address the customer's problem**.
    [Industry data](http://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf)
    (PDF) from A/B testing shows that in successful
    products, only about one-third of proposed features improve business
    outcomes when actually delivered. The remaining two-thirds of features
    deliver zero or *negative* outcomes for businesses. So, if you're not
    performing user research, odds are that at least two-thirds of the work
    that teams are doing is either not achieving the outcome they want, or it's
    actively making things worse. If a team is working on early-lifecycle
    products, particularly innovative ones, the team's odds at achieving the
    outcome they want are considerably worse.
-   **Underestimating the time and effort required to respond to customer
    feedback**. Teams should expect that their proposed solutions are wrong and
    prepare to discard at least two-thirds of them. As for the remaining
    one-third of solutions, teams should be prepared to evolve them
    significantly in response to customer feedback.

## Ways to improve customer feedback

The field of user experience design (UX) provides a framework for understanding
improvement. Many organizations treat UX as just making a product UI look good.
However, UX is about whether you're solving a real problem for users; more
broadly, UX is about every experience a user has when they interact with your
organization. It cannot be overemphasized how critical good UX is to building
successful products and services.

It's essential to build customer feedback gathering into the delivery process.
Every significant feature you build should start by considering the problem to
be solved. This should include performing user research to determine possible
solutions and select a candidate. User research should be analyzed before a
single line of code is written.

For early-lifecycle products, teams should adopt the ideas put forward in the
[lean startup movement](https://wikipedia.org/wiki/Lean_startup)
to validate the underlying business model of the product before any code is
written. You should validate that you're solving a real problem, and then
iterate on a solution that solves the problem while providing a viable business
model.

You should follow a similar pattern for existing products that are implementing
a new solution to a known business problem. When the solution design has been
validated, you should create a prototype so that you can perform further
research and testing. Only when testing validates that the feature achieves your
goal should the full production feature be completed.

Many organizations skip all of this work and fail. However, even strictly
following these steps does not guarantee success. The point of this effort is to
do as much as possible to minimize the risk of failure.

## Ways to measure customer feedback

Sophisticated data gathering isn't required to establish whether customer
feedback is gathered, visible, and acted upon. The following questions can help
you determine how well you're taking advantage of customer feedback for your
product design:

-   Do you have metrics that measure customer satisfaction? Are these
    updated and broadcast to teams regularly? Do you act on them?
-   Do you validate all features before building them and perform user
    research with prototypes as part of delivery?
-   Do you make changes to features based on this user research?
-   Do you actively and regularly gather feedback from users and act on it?

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Read the article [Online Experimentation at Microsoft](http://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf)
    (PDF), by Ronny Kohavi.
-   Read the article [Hypothesis-driven development](https://www.thoughtworks.com/insights/blog/how-implement-hypothesis-driven-development),
    by Barry O'Reilly.
-   Read the book [*Lean UX: Designing Great Products with Agile Teams*](http://shop.oreilly.com/product/0636920049166.do),
    by Jeff Gothelf and Josh Seiden.
-   Read the book
    [*Lean Analytics: Use Data to Build a Better Startup Faster*](http://leananalyticsbook.com/),
    by Alistair Croll and Benjamin Yoskovitz.
-   Read the book [*Lean Enterprise: How High Performance Organizations Innovate at Scale*](https://www.oreilly.com/library/view/lean-enterprise/9781491946527/),
    by Jez Humble, Joanne Molesky, and Barry O'Reilly.
-   Explore our DevOps
    [research program](https://www.devops-research.com/research.html).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
