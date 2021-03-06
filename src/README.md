# Overview

Dompiler is a tiny JavaScript library that facilitates HTML templating.

You can use it with Node/NPM or directly in the browser without compilation. Both approaches are explained below (see "NPM Usage" and "Browser Module Usage").

# NPM Usage

To install Dompiler, run the following command from your terminal:

```
npm i dompiler --save-dev
```

That will install it into your `node_modules` folder.

Next, you'll need to create a JavaScript file and reference Dompiler:

```javascript
let Dompiler = require("dompiler").Dompiler,
    Events = require("dompiler").Events;
```

Now you can use Dompiler as you like.

As an example, you might create an HTML file like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dompiler Example</title>
</head>
<body class="example-container">
    <script src="app.min.js"></script>
</body>
</html>
```

Then you'd have a JavaScript file that looks like this:

```javascript
let Dompiler = require("dompiler").Dompiler,
    Events = require("dompiler").Events;

// Initialize Dompiler.
let {
    compile
} = new Dompiler().withBinding();

// Variables.
let message = "Hello World.",
    date = new Date().toLocaleDateString();

// Compile markup string into a document fragment.
let markup = `
        <div>
            ${message} The date is ${date}.
        </div>
    `,
    compiled = compile(markup);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);
```

Then you'd run browserify to create the `app.min.js` file from that one.

And that's it. You should be able to view your HTML file in the browser.

# Browser Module Usage

You don't need Node/NPM to use Dompiler. You can just use it directly in the browser.

To read about that, got to [dompiler.com](https://www.dompiler.com/).

The short version is that you use `type="module"` when including your script, and you use an import statement rather than a require statement:

```javascript
import Dompiler from "./some-path/dompiler.js";
import Events from "./some-path/events.js";
```

And that does not require you to use Browserify.

# Building Dompiler Source (Uncommon)

This section is only if you're a developer contributing to Dompiler in the Dompiler repository.

To build, run the following in the command line from the /src/ folder:

```
npm i
npm run build
```

This will run the build.js file, which will do the following:

* Transform the JavaScript files to create versions that work with Node/NPM.
* Copy the original JavaScript files into the /docs/ folder (so they can be used by the examples and tutorial).