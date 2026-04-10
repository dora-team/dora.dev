---
title: "DORA Quick Check"
date: 2025-03-30
draft: true
type: "quickcheck"
layout: "section"
bannerTitle: "Take the DORA Quick Check"
bannerSubtitle: "Measure your team's software delivery performance in less than a minute! Compare it to the rest of the industry by responding to multiple-choice questions. Compare your team’s performance to others, and discover which capabilities you should focus on improving. We don’t store your answers or personal information."
bannerHighlightImage: "/experimental/quick-check/header.png"
---

<!--
Assets for the Quick Check single-page application are built from the /svelte/quick-check-2025 folder.
To update these assets, run: cd svelte/quick-check-2025 && ./build-quick-check.sh
-->
<!-- the timestamp shortcode is appended as a cache buster -->
<script type="module" src="quickcheck-2025.js?t={{% timestamp %}}"></script>
<link rel="stylesheet" href="quickcheck-2025.css?t={{% timestamp %}}">
<div id="app"></div>
