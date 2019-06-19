import { Compiler } from "../../support/lib.js";
import { getData } from "../../support/data.js";

/**
 * Renders a grid containing multiple cells.
 * @returns {DocumentFragment} The rendered grid as a document fragment.
 */
export function renderGrid() {

    // Variables.
    let items = getData(),
        {
            listElements,
            compile,
            namedElementList,
            each
        } = new Compiler().withBinding();

    // Compile markup string into a document fragment.
    let compiled = compile(`
        <div class="grid">
            ${each(items, item => `
                <div class="grid__item">
                    <h2 ${namedElementList("Header")}>${item.name}</h2>
                    <p ${namedElementList("Bio")}>${item.bio}</p>
                </div>
            `)}
        </div>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio
    } = listElements;
    Header.forEach(x => x.style.backgroundColor = "#f00");
    Bio.forEach(x => x.style.backgroundColor = "#0f0");

    // Return compiled markup.
    return (compiled);

}