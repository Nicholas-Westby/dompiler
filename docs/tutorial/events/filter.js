// Import Dompiler.
import Dompiler from "../../library/dompiler.js";
import Events from "../../library/events.js";

// The function that will render the filter.
function renderFilter () {

    // Initialize Dompiler.
    let {
        compile,
        elements,
        namedElement
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <p>
                Select which color to display:
            </p>
            <ul class="filter">
                <li><button class="red" type="button" ${namedElement("Red")}>Red</button></li>
                <li><button class="green" type="button" ${namedElement("Green")}>Green</button></li>
                <li><button class="blue" type="button" ${namedElement("Blue")}>Blue</button></li>
                <li><button class="all" type="button" ${namedElement("All")}>All</button></li>
            </ul>
        `,
        compiled = compile(markup);

    // Setup event handlers.
    let { Red, Green, Blue, All } = elements;
    setupColorSelectedEvent(Red, "red");
    setupColorSelectedEvent(Green, "green");
    setupColorSelectedEvent(Blue, "blue");
    setupColorSelectedEvent(All);

    // Return the document fragment.
    return compiled;

}

// When the specified button is clicked, emit an event indicating the specified
// color was selected.
function setupColorSelectedEvent(element, color) {
    element.addEventListener("click", () => {
        Events.emit("color.selected", element, {
            color: color
        });
    });
}

// Export the function for this module.
export default renderFilter;