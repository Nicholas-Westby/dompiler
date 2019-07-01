// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// Renders the results for the specified items, filtering by the specified color.
function renderResults(items, color) {

    // Initialize Dompiler.
    let {
        compile,
        each
    } = new Dompiler().withBinding();

    // Filter items by color?
    items = items.filter(x => !color || color === x.color);

    // Compile markup string into a document fragment.
    let markup = `
            <ul class="results">
                ${each(items, x => `
                    <li class="${x.color}">
                        ${x.name}
                    </li>
                `)}
            </ul>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderResults;