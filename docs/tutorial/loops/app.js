// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

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