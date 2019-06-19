import { Compiler } from "../../support/lib.js";

/**
 * Renders a cell within the grid.
 * @param item The data for the cell to render.
 * @returns {DocumentFragment} The rendered cell as a document fragment.
 */

export function renderCell(item) {

    // Variables.
    let {
        elements,
        namedElement,
        compile
    } = new Compiler().withBinding();

    // Compile markup string into a document fragment.
    let compiled = compile(`
        <div class="grid__item">
            <h2 ${namedElement("Header")}>${item.name}</h2>
            <p ${namedElement("Bio")}>${item.bio}</p>
        </div>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio
    } = elements;
    Header.style.backgroundColor = "#f00";
    Bio.style.backgroundColor = "#0f0";

    // Return compiled markup.
    return compiled;

}