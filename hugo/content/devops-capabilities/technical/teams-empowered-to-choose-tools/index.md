---
title: "Empowering teams to choose tools"
titleForHTMLHead: "DevOps Capabilities: Empowering teams to choose tools" # TODO: can we DRY this out?
date: 2023-03-27T09:48:50+01:00
category: technical
draft: false
headline: "Empower teams to make informed decisions on tools and technologies. Learn how these decisions drive more effective software delivery."
summary: "Empower teams to make informed decisions on tools and technologies. Learn how these decisions drive more effective software delivery."
---

If you want to achieve higher software delivery performance and increase the
[job satisfaction](/devops-capabilities/cultural/job-satisfaction)
of your technical staff, you should empower them to make informed choices about
the tools and technologies they use to do their work.
[Research](/publications/pdf/state-of-devops-2017.pdf)
(PDF) from the DevOps Research and Assessment (DORA) team shows this contributes
to better continuous delivery and higher software delivery performance. Teams
that can choose their own tools are able to make these choices based on how they
work and the tasks they need to perform. No one knows better than practitioners
what they need to be effective, so it's not surprising that practitioner tool
choice helps to drive better outcomes.

Allowing teams to choose tools doesn't mean each team is given free rein to
select any tool they want. Introducing technologies without any constraints can
increase technical debt and fragility. However, when you combine tool choice
with other capabilities—for example, a full view of the system, fast feedback,
and the understanding that they are responsible for the code that they write—it
helps your technologists make wise decisions about tools they will use and need
to support. This pattern has been observed at companies like Google and Netflix,
where a preferred technical stack is supported by default. But if a team feels
strongly that a different tool or technology is best for their case, they are
free to choose it. Teams understand that their choice comes with the
understanding that they must also do the work of supporting this new technical
stack.

## How to empower teams to choose tools

When your organization empowers teams to select tools, it's important to
balance the freedom to choose tools with the cost to acquire and support them,
and the added potential complexity of communicating between teams that use
different tools. The following are some ways you might empower teams to choose
their own tools.

-   **Establish a cross-team baseline**. With representatives from
    different teams and cross-functional areas (product managers, developers,
    testers, operators), establish a baseline of approved tooling. We recommend
    that the baseline set of tools be large and diverse enough to address the
    majority of the needs of your organization. Examples of tools to include in
    the baseline are programming languages and libraries, testing and
    deployment tools, monitoring infrastructure, and data backends.

-   **Periodically review the tools**. Periodically or as a part of sprint
    retrospectives, critically evaluate the baseline toolset to examine their
    effectiveness. These reviews also provide opportunities to discuss and
    demonstrate new technologies.

-   **Define a process for exceptions**. Create a clearly defined process
    for deviating from the base toolset. When a new technology is used that's
    outside of the baseline for a project, document what the new tool is and
    why it was used. This documentation is critical when troubleshooting and
    maintaining the project. Additionally, the documentation included in the
    projects can be used later to justify adding the tool to the
    baseline.

An alternative approach is to let teams select their tools. With this strategy,
each team addresses as much of the software delivery process (business
requirements, development, operations) as appropriate, using their own
tool chain. However, be sure that you consider the impact on communication
between teams and product areas when there are shared resources.

## Common pitfalls

The most common pitfall when empowering your teams to choose tools is to take
an extreme stance—for example, giving your engineers zero choice in the matter
or giving your engineers too much choice.

Forcing tools and technologies on practitioners can improve standardization.
However, what works in some cases is not necessarily the best solution in every
case. This approach also limits opportunities for
[experimentation and growth](/devops-capabilities/process/team-experimentation),
where emerging technologies can be tried and tested. Often, experimenting with
new technologies and adopting them results in large performance gains. For
example, if no teams had been allowed to experiment with containerization or
platform as a service when those were new technologies, their organizations
would not have realized the resulting performance gains.

At the other extreme, choosing different tools and technologies for every
different project or service can introduce technical debt and increase
fragility. Each time something is added to the tool chain, maintenance
and operational expenses increase. Over time, those expenses can
negate the performance gained from the new technology.

## Ways to improve tool choice in teams

The key aspect of performance in tool choice is allowing the teams doing the
work to select the best tools for the work. Based on that, here are some
suggestions:

-   **Periodically assess the tech stack**. During assessments, encourage
    team members to critically evaluate how well the current tools address
    requirements. Additionally, during these reviews, discuss issues with the
    existing tools and potential new tool experimentation can be discussed and
    planned.
-   **Proactively investigate new tools for new projects**. Have members
    of the teams think about and experiment with new tools to determine whether
    those tools are worth supporting. Try implementing a key piece of the new
    system using both existing and proposed technologies to see whether the
    expected benefits materialize. When you select technologies,
    have a good understanding of the costs associated with the technology.
    These might include licensing, support, and the infrastructure required to
    run the tools. You might also need to hire more people to help with
    adopting and maintaining the technology.
-   **Schedule time to experiment with new tools**. Periodically, hold
    sessions (such as hackathons) where teams can play around with new projects
    and new technologies. Not all tools will be kept as a result of these
    experiments. But the important point is that you're easing these new
    technologies into your stack or decide they aren't appropriate.
-   **Hold regular presentations to discuss new tools**. Sponsor organized
    meetings (such as lunch meetings) where new tech is presented and
    discussed. They can be informal meetings where one person does a
    presentation about a project they are working on in a new tech, or
    something they are investigating. Informal meetings like these are a good
    way for the group to talk about new technologies and stay up to date. A
    good approach is to rotate the presentations, with team members taking
    turns presenting Or you can invite people from other teams or someone from
    outside of the company to present. Including people from outside the
    organization can be particularly helpful, because if they have experience
    with a tool, they can discuss hidden costs and complexities that will only
    be apparent after longer-term use.

The goal is to find ways to introduce technologies into the conversation and
make sure the team is empowered to make the tool and technology decisions that
are appropriate for them. An outcome of these conversations may be to stick with
the tools they have right now.

## Ways to measure if teams are empowered to choose tools

The best way to determine whether teams feel that they're empowered
to choose tools is to ask. You don't want to measure this by
counting how many tools the team uses or how often teams change tools, because
the team might be sticking with the same tool, or might be changing tools,
because they are being told they have to.

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.