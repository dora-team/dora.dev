---
title: "DevOps Quick Check"
date: 2022-09-01
draft: false
bannerTitle: "Take the DORA DevOps Quick Check"
bannerSubtitle: "Measure your team's software delivery performance in less than a minute! Compare it to the rest of the industry by responding to **five multiple-choice questions**. Compare your team's performance to others, and discover which DevOps capabilities you should focus on improve. We don't store your answers or personal information."
bannerHighlightImage: "/img/quickcheck/hero_illustration.svg"
stylesheets:
    - name: quickcheck
type: quickcheck
---

<script>
    window.addEventListener('DOMContentLoaded', () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('year')) {
            document.querySelector('#quickcheck_form').action = document.querySelector('#quickcheck_form').action.replace('2022',queryParams.get('year'));
        }
    });
</script>

<form action={{% relref "/quickcheck/2022/results.html" %}} method="get" id="quickcheck_form">

<h5>Question 1 of 5</h5>
<section class="question">
<aside>
    <h2>Deploy frequency</h2>
    <img src="/img/quickcheck/deploy_freq.svg" class="spot">
</aside>
<fieldset class="paragraph">
    <legend>
        For the primary application or service you work on, how often does your organization deploy code to production or release it to end users?
    </legend>
    <ul>
        <li><label for="deployfreq1"><input type="radio" name="deployfreq" id="deployfreq1" value="1"> Fewer than once per six months</label></li>
        <li><label for="deployfreq2"><input type="radio" name="deployfreq" id="deployfreq2" value="2"> Between once per month and once every six months</label></li>
        <li><label for="deployfreq3"><input type="radio" name="deployfreq" id="deployfreq3" value="3"> Between once per week and once per month</label></li>
        <li><label for="deployfreq4"><input type="radio" name="deployfreq" id="deployfreq4" value="4"> Between once per day and once per week</label></li>
        <li><label for="deployfreq5"><input type="radio" name="deployfreq" id="deployfreq5" value="5"> Between once per hour and once per day</label></li>
        <li><label for="deployfreq6"><input type="radio" name="deployfreq" id="deployfreq6" value="6"> On demand (multiple deploys per day)</label></li>
      </ul>
    </fieldset>
</section>

<h5>Question 2 of 5</h5>
<section class="question">
<aside>
    <h2>Lead time</h2>
    <img src="/img/quickcheck/lead_time.svg" class="spot">
</aside>
<fieldset class="paragraph">
    <legend>For the primary application or service you work on, what is your lead time for changes (that is, how long does it take to go from code committed to code successfully running in production)?
    </legend>
    <ul>
        <li><label for="leadtime1"><input type="radio" name="leadtime" id="leadtime1" value="1"> More than six months</label></li>
        <li><label for="leadtime2"><input type="radio" name="leadtime" id="leadtime2" value="2"> One to six months</label></li>
        <li><label for="leadtime3"><input type="radio" name="leadtime" id="leadtime3" value="3"> One week to one month</label></li>
        <li><label for="leadtime4"><input type="radio" name="leadtime" id="leadtime4" value="4"> One day to one week</label></li>
        <li><label for="leadtime5"><input type="radio" name="leadtime" id="leadtime5" value="5"> Less than one day</label></li>
        <li><label for="leadtime6"><input type="radio" name="leadtime" id="leadtime6" value="6"> Less than one hour</label></li>
    </ul>
    </fieldset>
</section>

<h5>Question 3 of 5</h5>
<section class="question">
    <aside>
        <h2>Change fail percentage</h2>
        <img src="/img/quickcheck/chg_fail.svg" class="spot">
    </aside>
    <fieldset class="paragraph">
        <legend>
            For the primary application or service you work on, what percentage of changes to production or releases to users result in degraded service (for example, lead to service impairment or service outage) and subsequently require remediation (for example, require a hotfix, rollback, fix forward, patch)?
        </legend>
        <ul>
            <li><label for="chgfail6"><input type="radio" name="chgfail" id="chgfail6" value="6"> 0–15%</label></li>
            <li><label for="chgfail5"><input type="radio" name="chgfail" id="chgfail5" value="5"> 16–30%</label></li>
            <li><label for="chgfail4"><input type="radio" name="chgfail" id="chgfail4" value="4"> 31–45%</label></li>
            <li><label for="chgfail3"><input type="radio" name="chgfail" id="chgfail3" value="3"> 46–60%</label></li>
            <li><label for="chgfail2"><input type="radio" name="chgfail" id="chgfail2" value="2"> 61–75%</label></li>
            <li><label for="chgfail1"><input type="radio" name="chgfail" id="chgfail1" value="1"> 76–100%</label></li>
        </ul>
    </fieldset>
</section>

<h5>Question 4 of 5</h5>
<section class="question">
<aside>
    <h2>Time to restore</h2>
    <img src="/img/quickcheck/ttr.svg" class="spot">
</aside>
<fieldset class="paragraph">
    <legend>
        For the primary application or service you work on, how long does it generally take to restore service when a service incident or a defect that impacts users occurs (for example, unplanned outage, service impairment)?
    </legend>
    <ul>
        <li><label for="ttr1"><input type="radio" name="ttr" id="ttr1" value="1"> More than six months</label></li>
        <li><label for="ttr2"><input type="radio" name="ttr" id="ttr2" value="2"> One to six months</label></li>
        <li><label for="ttr3"><input type="radio" name="ttr" id="ttr3" value="3"> One week to one month</label></li>
        <li><label for="ttr4"><input type="radio" name="ttr" id="ttr4" value="4"> One day to one week</label></li>
        <li><label for="ttr5"><input type="radio" name="ttr" id="ttr5" value="5"> Less than one day</label></li>
        <li><label for="ttr6"><input type="radio" name="ttr" id="ttr6" value="6"> Less than one hour</label></li>
      </ul>
    </fieldset>
</section>

<h5>Question 5 of 5</h5>
<section class="question">
    <aside>
        <h2>Industry</h2>
    </aside>
    <fieldset class="paragraph">
        <legend>
            What is the principal industry of your organization?
        </legend>
        <select name="industry" id="industryoptions">
            <option value="none">-- Choose an option --</option>
            <option value="education">Education</option>
            <option value="energy">Energy</option>
            <option value="finance">Financial Services</option>
            <option value="government">Government</option>
            <option value="healthcare">Healthcare &amp; Pharmaceuticals</option>
            <option value="industrials">Industrials &amp; Manufacturing</option>
            <option value="insurance">Insurance</option>
            <option value="media">Media/Entertainment</option>
            <option value="nonprofit">Non-profit</option>
            <option value="retail">Retail/Consumer/e-Commerce</option>
            <option value="technology">Technology</option>
            <option value="telecoms">Telecommunications</option>
            <option value="other">Other</option>
        </select>
    </fieldset>
</section>
<section class="submit">
    <input type="submit" value="View Results" id="view-results" disabled>
</section>

</form>

<script src="/js/quickcheck.js"></script>