---
draft: false
slug: well-being
title: "Well-being"
category: climate for learning
core: true
headline: A focus on employee happiness and work environment can improve organizational performance while helping retain talent.
summary: |
    Well-being is a reflection of individuals' happiness and job satisfaction. Increased well-being predicts organizational performance and employees' job tenure. DORA has studied the impact of deployment pain, rework, and burnout on well-being.

    **Deployment pain** is a measure of the fear and anxiety that engineers and technical staff feel when they push code into production.

    **Rework** is reactive unplanned work, including any break/fix work, emergency software deployments and patches, responding to urgent audit documentation requests, and so on.

    **Burnout** is physical, mental, or emotional exhaustion caused by overwork or stress.
---

Well-being is a reflection of individuals' happiness and job satisfaction. Increased well-being predicts organizational performance and employees' job tenure. DORA has studied the impact of deployment pain, rework, and burnout on well-being.

## Deployment pain
Deployment pain is a measure of the fear and anxiety that engineers and technical staff feel when they push code into production. It also measures the extent to which deployments are disruptive rather than easy and pain-free. Where deployments are most painful, you'll find the poorest software delivery performance, organizational performance, and organizational culture.

Teams can reduce deployment pain by implementing the technical practices that drive [continuous delivery](/capabilities/continuous-delivery). Put another way, the technical practices that improve our ability to deliver software with both speed and stability also reduce the stress and anxiety associated with pushing code into production.

## Rework
One measure of whether teams are building quality into their work is the  how they spend their time. Are they able to focus their time devoting effort and energy on developing new features and supporting infrastructure? Or do teams spend most of their time correcting problems, remediating issues, and responding to defects and customer-support work (that is, fixing issues that arise because quality was not built in up front)? We conceptualize this time into two categories. The first category is proactive or new work, in which we are able to design, create, and work on features, tests, and infrastructure in a structured and productive way to create value for our organizations.


The second category is called reactive unplanned work, or rework. Unplanned work includes any break/fix work, emergency software deployments and patches, responding to urgent audit documentation requests, and so on. Rework is fixing things that weren't done right the first time and, like change fail rate, is a proxy measure for quality.

In the [2016 State of DevOps survey](/research/2016/2016-state-of-devops-report.pdf), we asked people about the percentage of time they spent on rework and unplanned work, and on new work such as designing and building new features. High performers reported spending 49 percent of their time on new work and 21 percent on unplanned work or rework. By contrast, low performers spend 38 percent of their time on new work and 27 percent on unplanned work or rework. Thus, high performers spend 29 percent more time on new work than low performers, and 22 percent less time on unplanned work and rework.

[Continuous delivery](/capabilities/continuous-delivery) predicts lower levels of unplanned work and rework in a statistically significant way, showing that implementing the technical practices behind continuous delivery drives higher quality.

In the [2018 Accelerate State of DevOps survey](/research/2018/dora-report/2018-dora-accelerate-state-of-devops-report.pdf), we asked our respondents how they spend their time and found that across the board, elite performers are getting the most value-add time out of their days and are spending the least amount of time doing non-value-add work of all groups, followed by high performers and medium performers. Low performers are doing the worst on all dimensions in terms of value-add vs. non-value-add time, as shown in the table below.

<!-- TODO: #323 remove inline styles -->
<style>
    .rework {
        margin:auto;
        border:1px solid #ccc;
        border-collapse: collapse;
    }

    .rework tr:nth-child(even) {
        background-color: #eee;
    }

    .rework th, .rework td {
        padding:.25em;
    }

    .rework th {
        text-align: left;
    }

    .rework td {
        text-align: right;
    }

    .rework thead th {
        background-color:#666;
        color:white;
    }

</style>

<table class="rework">
    <thead><tr><th scope="col" class="ranking-key">Time spent</th><th scope="col">Elite</th><th scope="col">High</th><th scope="col">Medium</th><th scope="col">Low</th></tr></thead>
    <tbody>
    <tr class="row-highlight"#669df6><th scope="row">New work</th><td>50%</td><td>50%</td><td>40%</td><td>30%</td></tr>
    <tr><th scope="row">Unplanned work and rework</th><td>19.5%</td><td>20%</td><td>20%</td><td>20%</td></tr>
    <tr><th scope="row">Remediating security issues</th><td>5%</td><td>5%</td><td>5%</td><td>10%</td></tr>
    <tr><th scope="row">Working on defects identified by end users</th><td>10%</td><td>10%</td><td>10%</td><td>20%</td></tr>
    <tr><th scope="row">Customer support work</th><td>5%</td><td>10%</td><td>10%</td><td>15%</td></tr>
    </tbody>
</table>

## Burnout
Burnout is physical, mental, or emotional exhaustion caused by overwork or stress. But it&rsquo;s more than just being overworked or stressed. Burnout can make the things we once loved about our work and life seem insignificant and dull. It often manifests itself as a feeling of helplessness, and is correlated with pathological cultures and unproductive, wasteful work. Dr Christina Maslach, professor of psychology at the University of California at Berkeley and [a pioneering researcher on job burnout](https://www.ncbi.nlm.nih.gov/pubmed/18457483), found six organizational risk factors that predict burnout:


  - **Work overload**. Job demands that exceed human limits.
  - **Lack of control**. Inability to influence decisions that affect your job.
  - **Insufficient rewards**. Insufficient financial, institutional, or social rewards.
  - **Breakdown of community**. Unsupportive workplace environment.
  - **Absence of fairness**. Lack of fairness in decision-making processes.
  - **Value conflicts**. Mismatch in organizational values and the individual&rsquo;s values.


Maslach found that most organizations try to fix the person and ignore the work environment, even though data shows that fixing the environment has a higher likelihood of success. Management has the power to change all of these risk factors.
