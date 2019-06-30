---
layout: tutorial
title: Modules Tutorial
description: This shows how to split code across multiple files (modules).
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />

In most large web applications, you will split your code across multiple files. In some case, the markup is complicated enough that you will want to split your Dompiler modules into multiple files. This page shows how to accomplish this.

Start off by creating your `index.html` file:

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

Then create your main `app.js` file:

```javascript
// Import Dompiler and modules.
import Dompiler from "../../library/dompiler.js";
import renderIntro from "./intro.js";
import renderListItem from "./list-item.js";

// Initialize Dompiler.
let {
    compile,
    nestElement,
    nestElements
} = new Dompiler().withBinding();

// Variables.
let message = "Hello, world. This is my Dompiler example. This first paragraph is its own module, and the list below is in a separate module. Below are some reasons you should use Dompiler:",
    listItems = [
        "Dompiler is fast.",
        "Dompiler is effective.",
        "Dompiler is tiny."
    ];

// Compile markup string into a document fragment.
let markup = `
        <div>
            ${nestElement(renderIntro(message))}
            <ul>
                ${nestElements(listItems.map(renderListItem))}
            </ul>
        </div>
    `,
    compiled = compile(markup);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

You can see that it is using two different modules to render the markup. The first module renders an intro message. The second module renders a list item. Before we dig too deeply, let's see the code for both of those.

Here's the `intro.js` file (i.e., the intro module):

```javascript
// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// The function that will render the message in a paragraph.
function renderIntro (message) {

    // Initialize Dompiler.
    let {
        compile
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <p>
                ${message}
            </p>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderIntro;
```

It's not doing all that much; it's just rendering a message inside of a paragraph tag.

Here's the `list-item.js` file (i.e., the module that renders an item within a list):

```javascript
// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// The function that will render an item within a list.
function renderListItem (text) {

    // Initialize Dompiler.
    let {
        compile
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <li>
                ${text}
            </li>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderListItem;
```

It's also not doing all that much; it's just rendering some text inside of a list item.

When you combine all three files, you get an intro message followed by a list of items.

You may or may not have noticed that the two modules were rendered in a slightly different way. Here's how the intro module was rendered:

```javascript
`${nestElement(renderIntro(message))}`
```

This is using the `nestElement` method to nesting the intro module (note the method name indicates it's dealing with a single object).

Here's how the list was rendered using the list item module:

```javascript
`<ul>
    ${nestElements(listItems.map(renderListItem))}
</ul>`
```

This is using the `nestElements` method to render an array of objects. Each item in the array is a document fragment. This is because we called the `.map` function to convert the array of strings into an array of document fragments, each of which were produced by our list item module (i.e., the `renderListItem` function).

When you need to nest a single module, you can use `nestElement`. When you need to nest a list of modules, you can use `nestElements`.

Here are a few examples of when you'd want to do this:

* If you need to render anchor links in a uniform way, you can create a module to do that.
* If you need to render responsive picture elements in a uniform way, you can create a module to do that.
* If you have a deeply nested markup structure, you can use modules to split it across multiple files.

The above example works fine if you are working directly in a browser. If you are working in Node, you'll want to change these lines of code:

```javascript
export default renderListItem;
```

To something like this:

```javascript
module.exports = renderListItem;
```

This is because Node manages dependencies a bit differently than how browsers manage dependencies.

You can see a live example here:

<div class="example-container"></div>
<script src="app.js" type="module"></script>