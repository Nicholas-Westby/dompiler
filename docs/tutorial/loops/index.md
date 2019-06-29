---
layout: tutorial
title: Looping Tutorial
description: This shows how to render markup for each element in an array.
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />

Suppose you want to list out each day of the week in the markup rendered by Dompiler. You can do so with this JavaScript (which you'll place in a file called `app.js`):

```javascript
// Import Dompiler.
import { Dompiler } from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile,
    each
} = new Dompiler().withBinding();

// Variables.
let days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

// Compile markup string into a document fragment.
let markup = `
        <p>Days of the week:</p>
        <ul>
            ${each(days, (day, index) => `
                <li>
                    Day ${ index + 1 } of the week is "${ day }".
                </li>
            `)}
        </ul>
    `,
    compiled = compile(markup);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

The `each` function in Dompiler allows you to create markup for each element in an array. It also includes the index of the item in the array.

Note that Dompiler places no limitation on the type of values in the array. While string is being used in this case, the array can contain objects of any type.

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