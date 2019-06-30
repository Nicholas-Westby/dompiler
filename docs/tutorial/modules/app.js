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