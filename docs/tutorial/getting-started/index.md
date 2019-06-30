---
layout: tutorial
title: Getting Started with Dompiler
description: This will show you how to start using Dompiler.
---

# Acquire Dompiler

You have two options for acquiring Dompiler so it exists on your computer:

* Download the browser release.
* Install with NPM.

Each option is explained below, followed by a section that explains next steps.

## Option 1: Download the Browser Release

This is the option you'll want to use if you don't have a JavaScript build process (i.e., if you simply want to start using Dompiler directly in the browser).

You can download the latest release here: [https://github.com/Nicholas-Westby/dompiler/releases](https://github.com/Nicholas-Westby/dompiler/releases)

You'll download the ZIP file, unzip it, then inspect the files, which will be:

* dompiler.js The main Dompiler JavaScript file.
* events.js If you want to use events with Dompiler.
* dompiler.min.js The minified version of the Dompiler JavaScript file.
* events.min.js The minified version of the Events file.

You can use the `.js` files if you want to start experimenting with Dompiler.

If you plan to use Dompiler on production, you'll likely want the `.min.js` files (becaus they're smaller).

## Option 2: Install with NPM

This is the option you'll want to use if you have a JavaScript build process (e.g., Node, Grunt, Gulp, Webpack, etc.).

Open your terminal and change to the directory where you have your code. Then run this command from the terminal:

```
npm i dompiler --save-dev
```

This will install Dompiler into the `node_modules` folder.

View the NPM page for details on how to make use of those files: [https://www.npmjs.com/package/dompiler](https://www.npmjs.com/package/dompiler)

# Next Steps

Once you've acquired the files (either via download or via NPM), you can start reading the [tutorial](/tutorial/).

If you like, you can also browse the [examples](/examples/).

Note that the tutorial an examples all show how to use Dompiler in the browser. This is because each of them are interactive and the browser version is the easiest one to make this possible.

The only real difference between the two is that the browser version will do something like this:

```javascript
import Dompiler from "./some-path/dompiler.js";
import Events from "./some-path/events.js";
```

The equivalent Node version would be this:

```javascript
let Dompiler = require("dompiler").Dompiler,
    Events = require("dompiler").Events;
```

Other than that, they should be identical.