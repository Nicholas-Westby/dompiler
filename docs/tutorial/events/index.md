---
layout: tutorial
title: Events Tutorial
description: This shows how to emit and listen for events in Dompiler.
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />
<link rel="stylesheet" href="/assets/css/events-tutorial.css" />

JavaScript has the ability to send events from one DOM element to all its ancestors. This comes in especially handy with Dompiler, as you sometimes need to send messages between different Dompiler modules.

This page will explain how to use Dompiler events to pass data from a filter up to a parent module so that it can then display results based on the filter selection.

First, start with this HTML:

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

Then create your `app.js` file:

```javascript
// Import Dompiler and modules.
import Dompiler from "../../library/dompiler.js";
import Events from "../../library/events.js";
import renderFilter from "./filter.js";
import renderResults from "./results.js";
import items from "./data.js";

// Initialize Dompiler.
let {
    compile,
    elements,
    namedElement,
    nestElement,
    nestElements
} = new Dompiler().withBinding();

// Compile markup string into a document fragment.
let markup = `
        <div ${namedElement("FilterContainer")}>
            ${nestElement(renderFilter())}
        </div>
        <div ${namedElement("ResultsContainer")}>
        </div>
    `,
    compiled = compile(markup);

// Get the element references.
let {
    FilterContainer,
    ResultsContainer
} = elements;

// Listen for an event that occurs when a color is selected.
Events.listen("color.selected", FilterContainer, data => {
    updateResults(data.color);
});

// Updates the results so they're filtered by the specified color.
function updateResults(color) {
    ResultsContainer.innerHTML = "";
    ResultsContainer.appendChild(renderResults(items, color));
}

// Show the initial results.
updateResults();

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

Then your `filter.js` file, which will be responsible for rendering a list of buttons that allow for a color to be selected:

```javascript
// Import Dompiler.
import Dompiler from "../../library/dompiler.js";
import Events from "../../library/events.js";

// The function that will render the filter.
function renderFilter () {

    // Initialize Dompiler.
    let {
        compile,
        elements,
        namedElement
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <p>
                Select which color to display:
            </p>
            <ul class="filter">
                <li><button class="red" type="button" ${namedElement("Red")}>Red</button></li>
                <li><button class="green" type="button" ${namedElement("Green")}>Green</button></li>
                <li><button class="blue" type="button" ${namedElement("Blue")}>Blue</button></li>
                <li><button class="all" type="button" ${namedElement("All")}>All</button></li>
            </ul>
        `,
        compiled = compile(markup);

    // Setup event handlers.
    let { Red, Green, Blue, All } = elements;
    setupColorSelectedEvent(Red, "red");
    setupColorSelectedEvent(Green, "green");
    setupColorSelectedEvent(Blue, "blue");
    setupColorSelectedEvent(All);

    // Return the document fragment.
    return compiled;

}

// When the specified button is clicked, emit an event indicating the specified
// color was selected.
function setupColorSelectedEvent(element, color) {
    element.addEventListener("click", () => {
        Events.emit("color.selected", element, {
            color: color
        });
    });
}

// Export the function for this module.
export default renderFilter;
```

Then your `results.js` file, which will display the filtered results:

```javascript
// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// Renders the results for the specified items, filtering by the specified color.
function renderResults(items, color) {

    // Initialize Dompiler.
    let {
        compile,
        each
    } = new Dompiler().withBinding();

    // Filter items by color?
    items = items.filter(x => !color || color === x.color);

    // Compile markup string into a document fragment.
    let markup = `
            <ul class="results">
                ${each(items, x => `
                    <li class="${x.color}">
                        ${x.name}
                    </li>
                `)}
            </ul>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderResults;
```

And finally create a `data.js` file to contain a bit of JSON data:

```javascript
let items = [
    {
        name: "Apple",
        color: "red"
    }, {
        name: "Tree",
        color: "green"
    }, {
        name: "Water",
        color: "blue"
    }, {
        name: "Lava",
        color: "red"
    }, {
        name: "Slimer",
        color: "green"
    }, {
        name: "Blueberry",
        color: "blue"
    }
];
export default items;
```

The filter module is emiting an event on button clicks in the following way:

```javascript
Events.emit("color.selected", element, {
    color: color
});
```

The main module then listens for that event in the following way:

```javascript
Events.listen("color.selected", FilterContainer, data => {
    updateResults(data.color);
});
```

As you can see, when it encounters the "color.selected" event, it updates the results by calling the function for the results module, passing in the color to filter by.

By emitting events and listening for events, you can transfer messages between your modules, which allows you to create a more dynamic page while still splitting your code across multiple files.

You can see a live example here:

<div class="example-container"></div>
<script src="app.js" type="module"></script>