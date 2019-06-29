---
layout: tutorial
title: Forms Tutorial
description: This shows how to alter the DOM in real time based on form fields.
---

<link rel="stylesheet" href="/assets/css/tutorial.css" />
<link rel="stylesheet" href="/assets/css/forms-tutorial.css" />

Suppose you want to use JavaScript to manipulate a few DOM elements based on input values from form fields. You can do so with this JavaScript (which you'll place in a file called `app.js`):

```javascript
// Import Dompiler.
import { Dompiler } from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile,
    elements,
    namedElement
} = new Dompiler().withBinding();

// Compile markup string into a document fragment.
let markup = `
        <h2>Inputs</h2>
        <form ${namedElement("Form")}>
            <label>
                First Name
                <input ${namedElement("FirstName")} type="text" placeholder="Enter Your First Name" />
            </label>
            <label>
                Last Name
                <input ${namedElement("LastName")} type="text" placeholder="Enter Your Last Name" />
            </label>
            <label>
                Favorite Color
                <input ${namedElement("Color")} type="text" placeholder="For Example, &quot;#f00&quot; or &quot;red&quot;" />
            </label>
        </form>
        <div ${namedElement("ResponseContainer")}></div>
    `,
    compiled = compile(markup);

// Get the DOM elements.
let {
    Form,
    FirstName,
    LastName,
    ResponseContainer,
    Color
} = elements;

// Prevent this form from submitting (it's purely client side).
Form.addEventListener("submit", e => e.preventDefault());

// Attach event listeners to the form elements.
FirstName.addEventListener("input", updateResponse);
LastName.addEventListener("input", updateResponse);
Color.addEventListener("input", updateResponse);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);

// Immediately show the response (before any event listeners are activated).
updateResponse();

// Update the response message based on the form input fields.
function updateResponse() {

    // Initialize Dompiler.
    let {
        compile,
        elements,
        namedElement
    } = new Dompiler().withBinding();

    // Variables.
    let fullName = [
            FirstName.value,
            LastName.value
        ].filter(x => !!x).join(" "),
        color = Color.value;

    // Compile markup string into a document fragment.
    let markup = `
            <h2>Response</h2>
            ${ fullName && `
                <p>
                    Nice to meet you, ${fullName}.
                </p>
            ` || ""}
            ${ color && `
                <p ${namedElement("ColorContainer")}" class="favorite-color">
                    My favorite color is also ${color}!
                </p>
            ` || "" }
        `,
        compiled = compile(markup);

    // Get the DOM elements.
    let {
        ColorContainer
    } = elements;

    // Update the background color.
    if (ColorContainer) {
        ColorContainer.style.backgroundColor = color;
    }

    // Append compiled markup to container.
    ResponseContainer.innerHTML = "";
    ResponseContainer.appendChild(compiled);

}
```

Note that this example creates two instances of Dompiler. One Dompiler instance is to render the markup for the form. The second Dompiler instance is to render the markup for the response.

Because the response is updated multiple times (any time an input value changes), the second Dompiler instance is within a function (so that the function can be called multiple times).

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