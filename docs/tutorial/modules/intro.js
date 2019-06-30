// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// The function that will render the message in a paragraph.
function renderIntro (message) {

    // Initialize Dompiler.
    let {
        compile
    } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let markup = `
            <p>
                ${message}
            </p>
        `,
        compiled = compile(markup);

    // Return the document fragment.
    return compiled;

}

// Export the function for this module.
export default renderIntro;