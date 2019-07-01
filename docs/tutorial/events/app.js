// Import Dompiler and modules.
import Dompiler from "../../library/dompiler.js";
import Events from "../../library/events.js";
import renderFilter from "./filter.js";
import renderResults from "./results.js";
import items from "./data.js";

// Initialize Dompiler.
let {
    compile,
    elements,
    namedElement,
    nestElement,
    nestElements
} = new Dompiler().withBinding();

// Compile markup string into a document fragment.
let markup = `
        <div ${namedElement("FilterContainer")}>
            ${nestElement(renderFilter())}
        </div>
        <div ${namedElement("ResultsContainer")}>
        </div>
    `,
    compiled = compile(markup);

// Get the element references.
let {
    FilterContainer,
    ResultsContainer
} = elements;

// Listen for an event that occurs when a color is selected.
Events.listen("color.selected", FilterContainer, data => {
    updateResults(data.color);
});

// Updates the results so they're filtered by the specified color.
function updateResults(color) {
    ResultsContainer.innerHTML = "";
    ResultsContainer.appendChild(renderResults(items, color));
}

// Show the initial results.
updateResults();

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);