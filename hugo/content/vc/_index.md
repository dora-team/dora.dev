---
title: "DORA Report Version Check"
date: 2024-10-17
draft: false
bannerTitle: "DORA Report Version Check"
bannerSubtitle: "Check if you have the most recent version of the DORA Report."
---

<style>
  .version-content {
    display: none;
  }
</style>


<div class="version-content" data-default>
  <h2>Unrecognized version</h2>
  <p>We do not recognize that version of the DORA Report. The <a href="/research/2024/dora-report">2024 DORA Report</a> is now available for download.</p>
  <a href="/research/2024/dora-report"><img src="/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png" alt="2024 DORA Report Cover" style="max-width:12em;"></a>

  <h3>Known versions</h3>
  <p>The following versions of the DORA Report are available via this version checker:</p>
  <ul>
    <li><a href="/vc?v=2024.1">2024 DORA Report <code>v. 2024.1</code></a></li>
    <li><a href="/vc?v=2023-12">2023 DORA Report <code>v. 2023-12</code></a></li>
    <li><a href="/vc?v=2023-10">2023 DORA Report <code>v. 2023-10</code></a></li>
  </ul>
</div>

<!-- version is 2024.1 -->
<div class="version-content" data-version="2024.1">
  <h2>2024 DORA Report</h2>
  <p>You have the latest version of the 2024 report, <code>v.2024.1</code>.</p>
  <p>There are some <a href="/research/2024/errata/#errata-in-v2024.1">errata</a> in this version that you should be aware of.</p>
  <a href="/research/2024/dora-report"><img src="/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png" alt="2024 DORA Report Cover" style="max-width:18em;"></a>
</div>

<!-- version is 2023-12 -->
<div class="version-content" data-version="2023-12">
  <h2>2023 DORA Report</h2>
  <p>You have the latest version of the 2023 report, <code>v.2023-12</code>.</p>
  <p>There are some <a href="/research/2023/errata/#errata-in-v2023-12">errata</a> in this version that you should be aware of.</p>
  <a href="/research/2023/dora-report"><img src="/research/2023/dora-report/2023-dora-accelerate-state-of-devops-report.png" alt="2023 DORA Report Cover" style="max-width:18em;"></a>

  <h3>2024 DORA Report</h3>
  <p>The <a href="/research/2024/dora-report">2024 DORA Report</a> is now available for download.</p>
  <a href="/research/2024/dora-report"><img src="/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png" alt="2024 DORA Report Cover" style="max-width:12em;"></a>
</div>

<!-- version is 2023-10 -->
<div class="version-content" data-version="2023-10">
  <h2>2023 DORA Report</h2>
  <p>You have an outdated version of the 2023 report. We encourage you to <a href="/research/2023/dora-report">download the latest version</a>, <code>v.2023-12</code>.</p>
  <p>There are some <a href="/research/2023/errata/#errata-in-v2023-10">errata</a> in this version that you should be aware of, most are fixed in the latest version, <code>v.2023-12</code>.</p>
  <a href="/research/2023/dora-report"><img src="/research/2023/dora-report/2023-dora-accelerate-state-of-devops-report.png" alt="2023 DORA Report Cover" style="max-width:18em;"></a>

  <h3>2024 DORA Report</h3>
  <p>The <a href="/research/2024/dora-report">2024 DORA Report</a> is now available for download.</p>
  <a href="/research/2024/dora-report"><img src="/research/2024/dora-report/2024-dora-accelerate-state-of-devops-report.png" alt="2024 DORA Report Cover" style="max-width:12em;"></a>
</div>

<script>
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function showContent(version) {
    // Show content for exact version match
    document.querySelectorAll(`.version-content[data-version="${version}"]`).forEach(el => el.style.display = 'block');

    // Show content for version prefix match
    document.querySelectorAll(`.version-content[data-version-prefix^="${version.substring(0, 4)}-"]`).forEach(el => {
      // Hide if excluded version
      if (el.dataset.exclude && el.dataset.exclude.includes(version)) {
        return;
      }
      el.style.display = 'block';
    });

      // Show default content if no version match
      const defaultContent = document.querySelector('.version-content[data-default]');
      if (defaultContent && !document.querySelector('.version-content[style="display: block;"]')) {
        defaultContent.style.display = 'block';
      }
  }

  const version = getParameterByName('v');
  if (version) {
    showContent(version);
  } else {
    // Show default content if no version is specified or undefined
    document.querySelector('.version-content[data-default]').style.display = 'block';
  }
</script>
