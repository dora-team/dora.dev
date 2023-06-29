---
title: "Proactive failure notification"
titleForHTMLHead: "DevOps Capabilities: Proactive Failure Notification" # TODO: can we DRY this out?
date: 2023-03-25T16:35:37Z
category: process
draft: false
headline: "Set proactive failure notifications to identify critical issues and act on problems before they arise."
summary: "Set proactive failure notifications to identify critical issues and act on problems before they arise."
---

Proactive failure notification is the practice of generating notifications when
monitored values approach known failure thresholds, and not waiting for the
system to alert you it has already failed — or worse, to find out from customers
that your application or service is down.
Using this approach, you can identify and potentially resolve issues before they
become serious or start to impact your users. The
[2014 DevOps Research and Assessment (DORA)](/publications/pdf/state-of-devops-2014.pdf)
(PDF) research showed that proactive monitoring is a significant predictor of software
delivery performance.
According to DORA research, teams that use proactive notification can diagnose
and solve problems quickly. When failures are instead primarily reported by a
source external to the operations team, such as by the network operations center
(NOC) — or worse, by customers — rather than internal monitoring, performance
suffers.

## How to implement proactive failure notification

**Use alerting rules.** You should generate failure notifications using
specific *alerting rules.* Alerting rules define the conditions under which an
alert is generated and the notification channel for that alert. Read more about 
generating alerts in
[Monitoring and observability](/devops-capabilities/technical/monitoring-and-observability).

**Use thresholds.** Alerting rules should use thresholds for the metrics you
monitor that indicate real trouble. Monitoring thresholds trigger alerting
rules, which generate notifications when metric levels cross threshold values.

**Choose thresholds carefully.** Choose thresholds to only generate alerts when
the threshold actually predicts an issue. That is, don't arbitrarily select a
value. Generally, you should identify which value levels begin to cause
user-facing impact, and then trigger an alert notification at some percentage
before that value is crossed.

For example, you might choose to trigger an alert notification when average
response time for pages is within 20% of a threshold at which you know users
start becoming frustrated and calling support.

**Hold incident post-mortems.** When you hold post-mortems following incidents,
determine which indicators could have predicted the incident and monitor them in
the future.

**Plan a notification strategy.** If a notification requires no action or the
same action every time, you should automate the response. You should also
consider the volume of notifications for events. A deluge of notifications
during an event might be distracting rather than useful. When people are exposed
to a large number of alarms, they can become desensitized to them (a problem known
as "alert fatigue") leading to longer response times or missed alarms.
Regularly review notifications and delete those that cannot be acted upon.

## Ways to improve failure notification

Configure alerts to notify your key teams when something goes wrong in your
systems early, long before it moves to the Network Operations Center (NOC) or to
a customer. Tactics include:

-   Configuring alerts in logging and monitoring systems to appropriate
    levels.
-   Configuring alerts to make sure they notify people and teams who can fix
    the problem.
-   Proactively monitoring system health based on threshold
    warnings before system failures happen.
-   Proactively monitoring system health based on rate of change warnings.
-   Ensuring that only relevant alerts are occurring, and that the team isn't
    receiving too many alerts. Take a hard look at which alerts are
    irrelevant. Disable irrelevant alerts and turn relevant monitoring alerts
    back on.
    Disabling all alerts is bad practice.

## Ways to measure failure notifications

Instrumenting proactive monitoring is straightforward. The components to
capture are:

1.  The extent to which failure alerts from logging and monitoring systems
    are captured and used.
1.  The extent to which system health is proactively monitored using
    threshold warnings.
1.  The extent to which system health is proactively monitored using rate of
    change warnings.

To make sure you are capturing different aspects of your system, you should
monitor metrics in at least two different ways. For example, you might set a
metric threshold
that triggers alerts if a metric rises or falls below a value over a given time
window, and a rate of change, which triggers alerts when a metric value change
rate is higher or lower than expected.

## What's next

-   For links to other articles and resources, see the
    [DevOps page](https://cloud.google.com/devops).
-   Learn more about generating alerts in [Monitoring and observability](/devops-capabilities/technical/monitoring-and-observability).
-   Read the
    [Site Reliability Engineering (SRE) book](https://landing.google.com/sre/books/).
-   Explore our DevOps
    [research program](/).
-   Take the
    [DevOps quick check](/quickcheck/)
    to understand where you stand in comparison with the rest of the industry.
