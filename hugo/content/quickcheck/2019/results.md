---
title: "DevOps Quick Check 2019: Results"
date: 2019-09-01
draft: false
stylesheets:
    - name: quickcheck
---

 <div class="h-c-page glue-page">
       <!-- Results Hero -->
      <section class="results-hero" id="results-hero">
        <h1 class="h-c-headline h-c-headline--two h-has-bottom-margin">Your software delivery&nbsp;performance</h1>
        <div class="h-c-grid">
          <div class="h-c-grid__col h-c-grid__col--4 h-c-grid__col-l--3 h-c-grid__col-l--offset-2 performance-result glue-popover" data-glue-popover-trigger="click">
            <h2 class="h-c-headline h-c-headline--subhead h-u-font-weight-medium"><span class="your-perf">Your performance:</span>
              <span class="profile" id="profile">&nbsp;</span></h2>
            <p class="h-c-footnote h-has-bottom-margin">You're performing better than <span id="percentile"></span>&percnt; of
              <a href="https://cloud.google.com/devops/state-of-devops/">State of DevOps Survey</a> respondents. <a id="popover-more" class="glue-popover__trigger" title="How was this calculated?"><span class="sr-only">How was this calculated?</span></a></p>
            <div class="glue-popover__dialog">
              <p>We used responses from the <a href="https://cloud.google.com/devops/state-of-devops/">2019 State of DevOps Survey</a> to calculate the four performance profiles (see the &ldquo;<span class="profile-title">Unknown</span>  performers&rdquo; tab) as well as your percentile.</p>
              <button type="button" class="glue-popover__close-btn glue-modal__close-btn h-c-button--secondary" aria-label="Close">×</button>
            </div>
          </div>
          <div class="h-c-grid__col h-c-grid__col--8 h-c-grid__col-l--5 graph-container">
            <div id="performance-graph"></div>
          </div>
        </div>
        <div class="h-c-grid">
          <div class="h-c-grid__col h-c-grid__col--12 text-center">
            <p>&nbsp;</p>
            <p class="share">
              <button id="share-button" class="h-c-button h-c-button--primary">
                Share results
              </button>
              <a href="quickcheck.html">
                <button class="h-c-button h-c-button--secondary">Start over</button>
              </a>
            </p>
          </div>
        </div>
      </section>
      <!-- Share Modal -->
      <div id="share-modal" class="glue-modal text-center" role="dialog" aria-modal="true" aria-labelledby="share-modal-label"
           aria-describedby="share-modal-content">
        <div class="wrapper">
          <h2 id="share-modal-label" class="glue-headline glue-headline--one">Share your results</h2>
          <div id="share-modal-content" class="glue-mod-mt-std">
            <p class="h-has-bottom-margin">We've copied the URL to your DORA DevOps Quick Check results to your clipboard.</p>
            <p class="h-has-bottom-margin">Share via social media, email or chat.</p>
            <textarea id="share-url"></textarea>
          </div>
          <button class="glue-modal__close-btn h-c-button--secondary"></button>
        </div>
      </div>
      <!-- Capabilities Assessment Modal -->
      <div id="modal" class="glue-modal text-center" role="dialog" aria-modal="true" aria-labelledby="modal-label"
           aria-describedby="modal-content">
        <div class="wrapper">
          <h2 id="modal-label" class="glue-headline glue-headline--one">DevOps capabilities assessment</h2>
          <div id="modal-content" class="glue-mod-mt-std">
            <p class="h-has-bottom-margin">Answer the following questions to find out which capability you, as <span class="color-by-profile">a <span
                                                                                                                                                  class="profile-title">unknown</span> performer</span>, should consider focusing on first.</p>
          </div>
          <p id="modal-error" class="error">You must respond to all questions before results can be calculated.</p>
          <p>
            <button id="modal-close" class="glue-button h-c-button--secondary modal-close">Close</button>
            <button id="results" disabled="true" class="h-c-button h-c-button--primary">View results</button>
          </p>
          <button class="glue-modal__close-btn h-c-button--secondary"></button>
        </div>
      </div>
      <!-- Primary Content -->
      <section class="content">
        <div>
          <div ng-controller="GlueTabsStateCtrl as ctrl" class="tabs-top-margin">
            <div class="glue-pagination glue-tabset" data-glue-pagination-model="ctrl.model">
              <ul class="glue-tabs glue-tabset__tablist text-center" data-glue-pagination="results">
                <li class="glue-tabset__tab">
                  <a href="#c-focus" class="glue-tabset__button" data-glue-pagination-page="1">Improvement areas</a>
                </li>
                <li class="glue-tabset__tab">
                  <a href="#c-compare" class="glue-tabset__button" data-glue-pagination-page="2">Performance
                    comparison</a>
                </li>
                <li class="glue-tabset__tab">
                  <a href="#c-breakdown" class="glue-tabset__button" data-glue-pagination-page="3"><span
                                                                                                     class="profile-title"></span> performers</a>
                </li>
              </ul>
              <ul class="glue-pagination-pages glue-tabset__panel-container" data-glue-pagination="results">
                <!-- Improvement areas -->
                <li id="c-focus" class="glue-pagination__page glue-tabset__page">
                  <div class="ranking" id="rec-more">
                    <h2 class="h-c-headline h-c-headline--three h-has-bottom-margin">Key DevOps capabilities for <span
                                                                                                                   class="profile-title">unknown</span> performers</h2>
                    <div class="h-c-grid">
                      <div class="h-c-grid__col h-c-grid__col--12 h-c-grid__col-l--8 h-c-grid__col-l--order-2">
                        <ul class="h-c-tile-set" id="capability-recs">
                          <li>
                            <a class="h-c-tile h-c-tile--border h-c-tile--hoverable" id="rec-link-0"
                               href="https://cloud.google.com/solutions/devops/devops-tech-version-control"
                               target="_blank">
                              <div class="h-c-tile__body focus-rec">
                                <img id="rec-img-0" alt="Icon that represents this capability">
                                <h4 id="rec-name-0" class="h-c-tile__headline">
                                  Version control
                                </h4>
                                <ul class="h-c-tile__links">
                                  <li class="h-c-tile__link">
                                    Learn more <img class="h-c-icon h-c-icon--link" alt="Arrow pointing right"
                                                    src="https://www.gstatic.com/images/icons/material/system_gm/svg/arrow_right_alt_24px.svg">
                                  </li>
                                </ul>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a class="h-c-tile h-c-tile--border h-c-tile--hoverable" id="rec-link-1"
                               href="https://cloud.google.com/solutions/devops/devops-tech-version-control"
                               target="_blank">
                              <div class="h-c-tile__body focus-rec">
                                <img id="rec-img-1" alt="Icon that represents this capability">
                                <h4 id="rec-name-1" class="h-c-tile__headline">
                                  Version control
                                </h4>
                                <ul class="h-c-tile__links">
                                  <li class="h-c-tile__link">
                                    Learn more <img class="h-c-icon h-c-icon--link" alt="Arrow pointing right"
                                                    src="https://www.gstatic.com/images/icons/material/system_gm/svg/arrow_right_alt_24px.svg">
                                  </li>
                                </ul>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a class="h-c-tile h-c-tile--border h-c-tile--hoverable" id="rec-link-2"
                               href="https://cloud.google.com/solutions/devops/devops-tech-version-control"
                               target="_blank">
                              <div class="h-c-tile__body focus-rec">
                                <img id="rec-img-2" alt="Icon that represents this capability">
                                <h4 id="rec-name-2" class="h-c-tile__headline">
                                  Version control
                                </h4>
                                <ul class="h-c-tile__links">
                                  <li class="h-c-tile__link">
                                    Learn more <img class="h-c-icon h-c-icon--link" alt="Arrow pointing right"
                                                    src="https://www.gstatic.com/images/icons/material/system_gm/svg/arrow_right_alt_24px.svg">
                                  </li>
                                </ul>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="h-c-grid__col h-c-grid__col--12 h-c-grid__col-l--4 h-c-grid__col-l--order-1">
                        <p class="h-has-bottom-margin">When we analyzed the responses of other <span class="color-by-profile"><span
                                                                                                                                class="profile-title">unknown</span> performers</span>, we found that working on these three
                          capabilities had the most impact on improving their software delivery performance.</p>
                        <p><button class="wide-button h-c-button h-c-button--primary" id="cap-click">Help me prioritize</button></p>
                        <p class="h-has-bottom-margin h-c-footnote">Rank your responses to a series of 3-12 questions for
                          each of these three capabilities, to determine how you perform and which to consider focusing on
                          first.</p>
                      </div>
                    </div>
                  </div>
                  <div class="ranking" id="rec-results">
                    <h2 class="h-c-headline h-c-headline--three h-has-bottom-margin">Key DevOps capabilities recommended
                      for you</h2>
                    <div class="h-c-grid">
                      <div class="h-c-grid__col h-c-grid__col--12 h-c-grid__col-l--8 glue-popover" data-glue-popover-trigger="click">Based on your performance profile, we
                        think you should work on the three capabilities listed below. Based on your responses to the
                        capabilities assessment, <strong>we recommend you focus on <span id="capability"></span>
                          first.</strong> <a id="popover-why" class="glue-popover__trigger" title="How was this calculated?"><span class="sr-only">How was this calculated?</span></a>
                        <div class="glue-popover__dialog">
                          <p>We prioritized based on your average score for each capability. You should also consider other factors, such as the effort required to implement these capabilities in your organization, and which you think will have the biggest impact on your performance.</p>
                          <button type="button" class="glue-popover__close-btn glue-modal__close-btn h-c-button--secondary" aria-label="Close">×</button>
                        </div>
                      </div>
                      <div class="capability-solution capability-solution-focus h-c-grid__col h-c-grid__col--12">
                        <h2 class="h-c-headline h-c-headline--four h-has-bottom-margin"><span id="cap-title-0">Capability
                            A</span> <span class="focus h-c-footnote">Key focus area</span></h2>
                        <div class="glue-grid">
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <img id="cap-img-0" class="icon" alt="Icon that represents this capability" />
                            <p id="cap-description-0">Capability A description</p>
                            <div class="capability-button"><a id="cap-url-0"
                                                              class="wide-button h-c-button h-c-button--primary" target="_blank">View solution</a></div>
                          </div>
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <h3 class="text-center h-has-bottom-margin">Your performance</h3>
                            <div class="graph-container">
                              <div id="cap-graph-0" class="capability-graph"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="capability-solution h-c-grid__col h-c-grid__col--12">
                        <h2 id="cap-title-1" class="h-c-headline h-c-headline--four h-has-bottom-margin">Capability B</h2>
                        <div class="glue-grid">
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <img id="cap-img-1" class="icon" alt="Icon that represents this capability" />
                            <p id="cap-description-1">Capability B description</p>
                            <div class="capability-button"><a id="cap-url-1"
                                                              class="wide-button h-c-button h-c-button--secondary" target="_blank">View solution</a>
                            </div>
                          </div>
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <h3 class="text-center h-has-bottom-margin">Your performance</h3>
                            <div class="graph-container">
                              <div id="cap-graph-1" class="capability-graph"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="capability-solution h-c-grid__col h-c-grid__col--12">
                        <h2 id="cap-title-2" class="h-c-headline h-c-headline--four h-has-bottom-margin">Capability C</h2>
                        <div class="glue-grid">
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <img id="cap-img-2" class="icon" alt="Icon that represents this capability" />
                            <p id="cap-description-2">Capability C description</p>
                            <div class="capability-button"><a id="cap-url-2"
                                                              class="wide-button h-c-button h-c-button--secondary" target="_blank">View solution</a>
                            </div>
                          </div>
                          <div class="h-c-grid__col h-c-grid__col--6">
                            <h3 class="text-center h-has-bottom-margin">Your performance</h3>
                            <div class="graph-container">
                              <div id="cap-graph-2" class="capability-graph"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- Performance Comparison -->
                <li id="c-compare" class="glue-pagination__page glue-tabset__page">
                  <div class="question content-question-margin">
                    <div class="h-c-grid">
                      <div class="h-c-grid__col h-c-grid__col--12 h-c-grid__col-l--4">
                        <h2 class="h-c-headline h-c-headline--three h-has-bottom-margin">How your performance compares
                        </h2>
                        <p>Based on your <a href="quickcheck.html">quick check</a> answers, see how you compare to the
                          <a href="https://cloud.google.com/devops/state-of-devops/">2019 State of DevOps</a> respondents
                          overall, and to people within the same industry as you.</p>
                      </div>
                      <div class="h-c-grid__col h-c-grid__col-s--4 h-c-grid__col--10 h-c-grid__col--offset-1 h-c-grid__col-l--offset-0 h-c-grid__col-l--8">
                        <div ng-controller="GlueTabsStateCtrl as ctrl">
                          <div class="glue-pagination glue-tabset" data-glue-pagination-model="ctrl.model">
                            <ul class="glue-tabs glue-tabset__tablist text-center" data-glue-pagination="compare">
                              <li class="glue-tabset__tab">
                                <a href="#tab-1" class="glue-tabset__button" data-glue-pagination-page="1">All industries</a>
                              </li>
                              <li class="glue-tabset__tab">
                                <a href="#tab-2" class="glue-tabset__button" data-glue-pagination-page="2">Your
                                  industry</a>
                              </li>
                            </ul>
                            <ul class="glue-pagination-pages glue-tabset__panel-container" data-glue-pagination="compare">
                              <li id="tab-1" class="glue-pagination__page glue-tabset__page">
                                <div id="perf-main-leadtime"></div>
                                <div id="perf-main-deployfreq"></div>
                                <div id="perf-main-ttr"></div>
                                <div id="perf-main-chgfail"></div>
                              </li>
                              <li id="tab-2" class="glue-pagination__page glue-tabset__page">
                                <div id="perf-ind-leadtime"></div>
                                <div id="perf-ind-deployfreq"></div>
                                <div id="perf-ind-ttr"></div>
                                <div id="perf-ind-chgfail"></div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- Performance Profile Breakdown -->
                <li id="c-breakdown" class="glue-pagination__page glue-tabset__page">
                  <div class="ranking">
                    <h2 class="h-c-headline h-c-headline--three h-has-bottom-margin"><span
                                                                                       class="profile-title">Unknown</span> performance profile breakdown</h2>
                    <div class="h-c-grid">
                      <p class="h-c-grid__col h-c-grid__col--12 h-c-grid__col-l--8 h-has-bottom-margin">Based on your performance, you are classified as a <span class="color-by-profile"><span
                                                                                                                                                                                            class="profile-title">unknown</span> performer</span>. Here is how the performance profiles compare. Note
                        that your answers to the five questions asked in Step 1 of the quick check may not match the
                        descriptions in the table below. The performance profiles in this table are based on statistical
                        analysis of the aggregated responses to the 2019 State of DevOps survey. For more on this analysis, read the &ldquo;Methodology&rdquo; section of the <a href="https://cloud.google.com/devops/state-of-devops/">State of DevOps Report</a>.</p>
                    </div>
                    <div class="h-c-table__overflowcontainer">
                      <table class="h-c-table h-c-table--datatable h-c-table--datatable-altrows h-c-table--stacked">
                        <thead>
                          <tr>
                            <th scope="col" class="ranking-key">Aspect of software delivery performance</th>
                            <th scope="col">Low</th>
                            <th scope="col">Medium</th>
                            <th scope="col">High</th>
                            <th scope="col">Elite</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td data-colheader="Deployment frequency">
                              <h4 class="h-c-headline h-c-headline--subhead h-u-font-weight-medium">Deployment frequency
                              </h4>
                              <p>For the primary application or service you
                                work on, how often does your organization deploy code to production or release it to
                                users?</p>
                            </td>
                            <td data-colheader="Low" id="deployfreq-low" class="perf-regular">Between once per month and
                              once every six
                              months</td>
                            <td data-colheader="Medium" id="deployfreq-medium" class="perf-regular">Between once per week
                              and once per month
                            </td>
                            <td data-colheader="High" id="deployfreq-high" class="perf-regular">Between once per day and
                              once per week
                            </td>
                            <td data-colheader="Elite" id="deployfreq-elite" class="perf-regular">On demand (multiple
                              deploys per day)
                            </td>
                          </tr>
                          <tr>
                            <td data-colheader="Lead time for changes">
                              <h4 class="h-c-headline h-c-headline--subhead h-u-font-weight-medium">Lead time for changes
                              </h4> For the primary application or service you
                              work on, what is your lead time for changes (that is, how long does it take to go from
                              code committed to code successfully running in production)?
                            </td>
                            <td data-colheader="Low" id="leadtime-low" class="perf-regular">Between one month and six
                              months</td>
                            <td data-colheader="Medium" id="leadtime-medium" class="perf-regular">Between one week and one
                              month</td>
                            <td data-colheader="High" id="leadtime-high" class="perf-regular">Between one day and one week
                            </td>
                            <td data-colheader="Elite" id="leadtime-elite" class="perf-regular">Less than one day</td>
                          </tr>
                          <tr>
                            <td data-colheader="Time to restore service">
                              <h4 class="h-c-headline h-c-headline--subhead h-u-font-weight-medium">Time to restore
                                service</h4> For the primary application or service you
                              work on, how long does it generally take to restore service when a service incident
                              or a defect that impacts users occurs (for example, unplanned outage or service
                              impairment)?
                            </td>
                            <td data-colheader="Low" id="ttr-low" class="perf-regular">Between one week and one month</td>
                            <td data-colheader="Medium" id="ttr-medium" class="perf-regular">Less than one day</td>
                            <td data-colheader="High" id="ttr-high" class="perf-regular">Less than one day</td>
                            <td data-colheader="Elite" id="ttr-elite" class="perf-regular">Less than one hour</td>
                          </tr>
                          <tr>
                            <td data-colheader="Change fail rate">
                              <h4 class="h-c-headline h-c-headline--subhead h-u-font-weight-medium">Change fail rate</h4>
                              For the primary application or service you work
                              on, what percentage of changes to production or released to users result in degraded
                              service (for example, lead to service impairment or service outage) and subsequently
                              require remediation (for example, require a hotfix, rollback, fix forward, patch)?
                            </td>
                            <td data-colheader="Low" id="chgfail-low" class="perf-regular">46-60&percnt;</td>
                            <td data-colheader="Medium" id="chgfail-medium" class="perf-regular">0-15&percnt;</td>
                            <td data-colheader="High" id="chgfail-high" class="perf-regular">0-15&percnt;</td>
                            <td data-colheader="Elite" id="chgfail-elite" class="perf-regular">0-15&percnt;</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    <script src="https://www.gstatic.com/external_hosted/hammerjs/v2_0_2/hammer.min.js"></script>
    <script src="https://www.gstatic.com/glue/v22_3/glue-vanilla.min.js"></script>
    <script>
      (function () {
          const init = (selector, cb, opts = {}) =>
                [...document.querySelectorAll(selector)].forEach((el) => cb(el, opts));
          init('.glue-tabs', glue.ui.tabs.Tabs.attachTo);
          init('.glue-pagination-pages', glue.ui.pagination.Pages.attachTo);
          init('.glue-popover', glue.ui.Popover.attachTo);
          // Grab the default pagination model if needed.
          const model = glue.ui.pagination.ModelFactory.get();
      }).call(this);
    </script>

<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/js/results.js"></script>
<script src="https://www.gstatic.com/glue/v20_0/glue-detect.min.js"></script>