---
title: "DORA Quick Check"
date: 2024-03-09
draft: true
---

<!-- resize `main`; hide the header/footer nav -->
<style>
    main {
        max-width: 100% !important;
        margin: 1rem 1.5rem .5rem 1rem !important;
        padding: 0 !important;
    }
    footer {display:none}
    header {display:none}
</style>

<meta name="displayMode" content="kiosk" />

<!-- sources for the Quick Check single-page application are generated from the /svelte/quick-check-2023 folder, then copied here. -->
<!-- the timestamp shortcode is appended as a cache buster -->
<script type="module" src="../quickcheck.js?t={{% timestamp %}}"></script>
<link rel="stylesheet" href="../quickcheck.css?t={{% timestamp %}}">
<div id="app"></div>