// Import Dompiler.
import { Dompiler } from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile
} = new Dompiler().withBinding();

// Variables.
let day = new Date().getDay(),
    isWeekend = day === 0 || day === 6;

// Compile markup string into a document fragment.
let markup = `
        <div>
            Today is
            ${ isWeekend && `
                <strong>THE WEEKEND!!!!</strong>
            ` || "" }
            ${ !isWeekend && `
                <span>a weekday.</span>
            ` || "" }
        </div>
    `,
    compiled = compile(markup);

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);