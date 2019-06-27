# Dompiler Overview

### What is Dompiler?

Dompiler is a very small library (literally a couple KB) built with plain JavaScript.

It allows you to build DOM elements in JavaScript rather than in HTML.

Thanks to JavaScript template literals, the syntax is essentially just HTML within JavaScript.

### Give Me a Short Example

```javascript
// Get Dompiler.
import { Dompiler } from "../support/dompiler.js";

// Variables.
let compile = new Dompiler().compile,
    body = document.querySelector("body"),
    message = "Hello World";

// Compile markup to DOM.
let compiled = compile(`
    <button type="button">
        ${message}
    </button>
`);

// Insert DOM into page.
body.appendChild(compiled);
```

That will render a button on the page that says "Hello World".