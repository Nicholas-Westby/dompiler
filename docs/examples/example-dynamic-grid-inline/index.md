---
layout: default
title: Inline Dynamic Grid Example
description: This shows how to use Dompiler to create a dynamic grid in a single file.
---

<!-- Preload the JavaScript files for this example. -->
<link rel="preload" src="app.js" as="script">
<link rel="preload" href="grid/grid.js" as="script">
<link rel="preload" href="/examples/support/dompiler.js" as="script">
<link rel="preload" href="/examples/support/data.js" as="script">
<link rel="preload" href="/examples/support/events.js" as="script">

<div id="wrapper"></div>
<link rel="stylesheet" href="/assets/css/grid.css" />
<script src="app.js" type="module"></script>