// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// The function that will render an item within a list.
function renderListItem (text) {

    // Initialize Dompiler.
    let {
        compile
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <li>
                ${text}
            </li>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderListItem;