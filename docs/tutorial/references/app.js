// Import Dompiler.
import { Dompiler } from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile,
    each,
    elements,
    namedElement,
    namedElementList
} = new Dompiler().withBinding();

// Variables.
let days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

// Compile markup string into a document fragment.
let markup = `
        <p>Days of the week (today is <span ${namedElement("CurrentDay")}></span>):</p>
        <ul style="list-style-type: none;">
            ${each(days, (day, index) => `
                <li ${namedElementList("DayItems")} style="border-left: 0 solid black">
                    Day ${ index + 1 } of the week is "${ day }".
                </li>
            `)}
        </ul>
    `,
    compiled = compile(markup);

// Get the DOM elements.
let {
    CurrentDay,
    DayItems
} = elements;

// Interact with DOM node (set the current day).
CurrentDay.appendChild(document.createTextNode(days[((new Date()).getDay() + 6) % 7]));

// Interact with DOM nodes (style for each day of the week).
DayItems.forEach((x, i) => {
    x.style.borderLeftWidth = ((i + 1) * 20).toString() + "px";
    x.style.borderLeftColor = "#" + (i * 2).toString(16) + "00";
});

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);