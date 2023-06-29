---
title: "Visual management"
titleForHTMLHead: "DevOps Capabilities: Visual Management" # TODO: can we DRY this out?
date: 2023-03-25T16:35:37Z
category: process
draft: false
headline: "Learn about the principles of visual management to promote information sharing, get a common understanding of where the team is, and how to improve."
summary: "Learn about the principles of visual management to promote information sharing, get a common understanding of where the team is, and how to improve."
---

It's a common practice for teams that are adopting
[lean development practices](https://wikipedia.org/wiki/Lean_software_development)
to display key information about their processes in team areas where everybody
can see it. Visual management boards can create a shared understanding of where
the team is in terms of its operational effectiveness. They can also help
identify and remove obstacles in the path to higher performance.

## How to implement visual management

There are many kinds of visual displays and dashboards that are common in the
context of software delivery:

-   **Card walls, storyboards or Kanban boards**, either physical or
    virtual, with index cards  that represent in-progress work items.
-   **Dashboards or other visual indicators**, such as continuous
    integration systems with monitors or traffic lights to show whether the
    build is passing or failing. Effective visual displays are created,
    updated, and perhaps discarded by teams in response to issues that the team
    is currently interested in addressing.
-   **Burn-up or burn-down charts** (for example, cumulative flow diagrams)
    showing the cumulative status of all work being done. These allow the team
    to project how long it will take to complete the current backlog.
-   **Deployment pipeline monitors** showing what the latest deployable
    build is, and whether stages in the pipeline are failing, such as
    acceptance tests or performance tests.
-   **Monitors showing production telemetry**, such as the number of
    requests being received, latency statistics, cumulative `404` and `500`
    errors, and which pages are most popular.

When combined with the use of
[WIP limits](/devops-capabilities/process/wip-limits)
and using feedback from production to make business decisions, visual management
displays can contribute to
[higher levels of delivery performance](/publications/pdf/state-of-devops-2015.pdf#page=15)
(PDF).

## Common pitfalls with visual management

The most important characteristics of visual management displays are that the
team cares about and will act upon the information, and that the display is used
during daily work to identify and remove obstacles to higher performance. Common
pitfalls when implementing visual management include the following:

-   **Selecting metrics without the involvement of the team**. Visual
    displays that show metrics that are highly relevant and useful to teams
    will be used more often. In addition, if teams can have input into the
    metrics that are displayed on their visual displays by participating in
    selecting their goals (for example, some teams
    [use OKRs](/devops-capabilities/cultural/devops-culture-transform/)),
    they will be more motivated to drive progress toward those goals.
-   **Creating displays that are complex, hard to understand, or do not
    provide actionable information**. It's easy to create displays using tools
    that allow high levels of modification or that are fun to play with. But
    changing layouts and color on a custom dashboard isn't helpful if the team
    is working with the wrong metrics or it takes the team several months to
    implement. Key metrics or rough graphs drawn on a whiteboard and updated
    daily can be just as effective to keep the team informed.
-   **Not evolving visual displays**. Visual management tools should provide
    teams with information that addresses issues they are facing right now. It
    doesn't help one team to copy the displays of other teams unless the teams
    work in the same context, with the same challenges and obstacles. As a
    team's context evolves, visual displays should change as well. Also note
    that as teams address obstacles, their visual displays might change to
    discard old (previously relevant) metrics and highlight new areas of importance.
-   **Not addressing the underlying problem that the visual display is
    revealing**. Teams sometimes make quick fixes in an effort to make the
    display "green" again. Displays should be used to drive improvements (fix
    the problem), not become a goal in themselves (keep the board green).
    Focusing on managing the metric alone leads to unintended consequences and
    technical debt. If the display suggests a problem, teams should not just
    fix the immediate problem. They should also work to identify the underlying
    issue or constraint and resolve it, even if it's in another part of the
    organization. Any inefficiencies will keep showing up, and fixing them
    earlier will help all teams.

## Ways to improve visual management

The goal of visual management tools is to provide fast, easy-to-understand
feedback so you can build quality into the product. This feedback helps the team
identify defects in the product and understand whether some part of the system
is not performing effectively, which helps them address the problem. In order to
be effective, such systems must do the following:

-   **Reflect information that the team cares about and will act on**.
    Having build monitors does no good if teams don't care whether the display
    shows an issue (for example, showing that the build status is red, meaning
    broken), and won't actually act on this information by swarming to fix the
    issue.
-   **Be easy to understand**. It should be possible to tell at a glance
    from across the room whether something needs attention. If there *is* a
    problem, teams should know how to perform further diagnosis or fix the problem.
-   **Give the team information that is relevant to their work**. While it's
    important to collect as much data as possible about the team's work, the
    display should present only data that is relevant to the team's goals. In
    the face of information overload, particularly information that cannot be
    acted upon, people ignore visual management displays; the displays just
    become noise. The additional data can be accessed and used by the team when
    they are swarming to fix the problem.
-   **Be updated as part of daily work**. If the team lets the data go stale
    or become inaccurate, they will ignore the visual displays, and the
    displays will no longer be a useful beacon when important issues arise. If
    displays are currently displaying stale or inaccurate data, investigate the
    cause: is the data not related to the team's goals? What data would make
    the display an important and compelling information source for the team?

Teams shouldn't get caught up in aspects of visual displays that aren't
critical. For example, visual management displays don't need to be electronic.
Physical card walls or kanban boards can be easier to manage and understand,
particularly if the team is all in one location. These displays can also help
develop valuable team rituals such as physically standing in front of the board
to pick up work and move it around. A whiteboard with some key project
information that is updated daily by the team is often preferable to an
electronic system that's hard to understand, difficult to update, or doesn't
have necessary information.

## Ways to measure visual management

As with all improvement work, start with the measurable system-level goals that
the team is working toward. Discover the existing state of the work system.
Find a way to display the key information about the existing state, as well as
the state you want. Make sure that this information is displayed only to the
required precision.

Review the visual displays as part of regular retrospectives. Ask these
questions:

-   Are the displays giving you the information you need?
-   Is the information up to date?
-   Are people acting on this information?
-   Is the information (and the actions people take in response to it)
    contributing to measurable improvement towards a goal that the team cares about?
-   Does everybody know what the goals are?
-   Can you look at your visual management displays and see the key process
    metrics you care about?

If the answer to any of these questions is no, investigate further:

-   Can you change the information or how it's displayed?
-   Can you get rid of the display altogether?
-   Can you create a new display? What would a prototype look like? What are
    the most important pieces of information to include, and how precise do
    they need to be to help you solve your problems and achieve your goals?

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Read the book
    [*Making Work Visible*](https://itrevolution.com/book/making-work-visible/),
    by Dominica DeGrandis.
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
