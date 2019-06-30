---
layout: tutorial
title: Conditionals Tutorial
description: This shows how to change your markup based on a condition.
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />

Suppose you have a variable, `isWeekend`, that you want to use to change a portion of the markup rendered by Dompiler. You can do so with this JavaScript (which you'll place in a file called `app.js`):

```javascript
// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile
} = new Dompiler().withBinding();

// Variables.
let day = new Date().getDay(),
    isWeekend = day === 0 || day === 6;

// Compile markup string into a document fragment.
let markup = `
        <div>
            Today is
            ${ isWeekend && `
                <strong>THE WEEKEND!!!!</strong>
            ` || "" }
            ${ !isWeekend && `
                <span>a weekday.</span>
            ` || "" }
        </div>
    `,
    compiled = compile(markup);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

This is using a bit of JavaScript trickery to conditionally return a string from an interpolated statement. This is mimicking an if/else statement by repeating the same condition twice, but with the second version being inverted.

That is, the first line says "display this markup if it's the weekend":

```javascript
${ isWeekend && `
    <strong>THE WEEKEND!!!!</strong>
` || "" }
```

The second line says "display this markup if it is NOT the weekend":

```javascript
${ !isWeekend && `
    <span>a weekday.</span>
` || "" }
```

The `|| ""` at the end means "if this evaluates to false, return an empty string rather than false".

The markup would look something like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dompiler Example</title>
</head>
<body>
    <div class="example-container"></div>
    <script src="app.js" type="module"></script>
</body>
</html>
```

You can see a live example here:

<div class="example-container"></div>
<script src="app.js" type="module"></script>