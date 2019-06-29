---
layout: default
title: DOM Reference Tutorial
description: This shows how to interact with DOM elements using DOM references.
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />

Suppose you want to use JavaScript to manipulate a few DOM elements that were rendered by Dompiler. You can do so with this JavaScript (which you'll place in a file called `app.js`):

```javascript
// Import Dompiler.
import { Dompiler } from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile,
    each,
    elements,
    namedElement,
    namedElementList
} = new Dompiler().withBinding();

// Variables.
let days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

// Compile markup string into a document fragment.
let markup = `
        <p>Days of the week (today is <span ${namedElement("CurrentDay")}></span>):</p>
        <ul style="list-style-type: none;">
            ${each(days, (day, index) => `
                <li ${namedElementList("DayItems")} style="border-left: 0 solid black">
                    Day ${ index + 1 } of the week is "${ day }".
                </li>
            `)}
        </ul>
    `,
    compiled = compile(markup);

// Get the DOM elements.
let {
    CurrentDay,
    DayItems
} = elements;

// Interact with DOM node (set the current day).
CurrentDay.appendChild(document.createTextNode(days[((new Date()).getDay() + 6) % 7]));

// Interact with DOM nodes (style for each day of the week).
DayItems.forEach((x, i) => {
    x.style.borderLeftWidth = ((i + 1) * 20).toString() + "px";
    x.style.borderLeftColor = "#" + (i * 2).toString(16) + "00";
});

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

This example is using the DOM references to set the current day of the week and to add a colored bar next to each day.

Note that there are two ways of naming DOM nodes. One is `namedElement`, which is for a single DOM node. The other is `namedElementList`, which is for a list of DOM nodes.

The markup would look something like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Variables</title>
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