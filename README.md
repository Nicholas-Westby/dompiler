# Dompiler Overview

### What is Dompiler?

Dompiler is a very small library (literally a couple KB) built with plain JavaScript.

It allows you to build DOM elements in JavaScript rather than in HTML.

Thanks to JavaScript template literals, the syntax is essentially just HTML within JavaScript.

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

If you use Browserify to minify all your JavaScript into a single file, you can change this:

```html
<script src="app.js" type="module"></script>
```

Into this (i.e., remove the type of "module"):

```html
<script src="app.js"></script>
```