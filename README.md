# Dompiler Overview

### What is Dompiler?

Dompiler is a very small library (literally a couple KB) built with plain JavaScript.

It allows you to build DOM elements in JavaScript rather than in HTML.

Thanks to JavaScript template literals, the syntax is essentially just HTML within JavaScript.

You can view the website (which has examples) at [dompiler.com](https://www.dompiler.com/).

You can make things like this entirely with HTML embedded in JavaScript:

![Dompiler Grid Example](assets/images/grid.png?raw=true "Dompiler Grid Example")

### Can I See a Short Example?

This is about as basic as it gets:

```javascript
// Get Dompiler.
import { Dompiler } from "./dompiler.js";

// Variables.
let { compile } = new Dompiler(),
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

Here's the HTML for this example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dompiler Example</title>
</head>
<body>
    <script src="app.js" type="module"></script>
</body>
</html>
```

### What's With All The Fancy Code?

The above example shows some newer HTML/JavaScript features (e.g., destructuring, JavaScript modules, and so on).

They work on modern browsers, but you don't need to use them.

For example, you can add Dompiler to your app and then make it compatible with older browsers by ensuring Babel is called by your task runner (e.g., Grunt, Gulp, Webpack).

And if you like, you can replace code like this:

```javascript
let { compile } = new Dompiler()
```

With code like this:

```javascript
var compiler = new Dompiler()
var compile = compiler.compile;
```

If you use Browserify to combine all your JavaScript into a single file, you can change this:

```html
<script src="app.js" type="module"></script>
```

Into this (i.e., remove the type of "module"):

```html
<script src="app.js"></script>
```

### Why Not Just Use a Template Literal?

Dompiler adds some extra niceties:

```javascript
// Get Dompiler.
import { Dompiler } from "./dompiler.js";

// Variables.
let {
        compile,
        each
    } = new Dompiler().withBinding(),
    body = document.querySelector("body"),
    colors = [{
        name: "Red",
        hex: "#f00"
    }, {
        name: "Green",
        hex: "#0f0"
    }];

// Compile markup to DOM.
let compiled = compile(`
        <ul class="color-list">
            ${each(colors, color => `
                <li class="color-list__item" style="background-color: ${color.hex};">
                    ${color.name}
                </li>
            `)}
        </ul>
    `);

// Insert DOM into page.
body.appendChild(compiled);
```

In this case, it's adding what is essentially a for loop.

### Where Can I Learn More?

Take a look at the examples on [dompiler.com](https://www.dompiler.com/).

You can use your browser inspector to look at the code.

Or, you can browse the "docs" folder of this repo, which is the source code for dompiler.com (it's just a GitHub pages website).

For example, if you want to view the code for this example: https://www.dompiler.com/examples/example-dynamic-grid-inline/

You can do so here: https://github.com/Nicholas-Westby/dompiler/tree/master/docs/examples/example-dynamic-grid-inline