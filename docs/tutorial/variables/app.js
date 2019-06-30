// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

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