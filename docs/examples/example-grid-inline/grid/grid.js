import { Dompiler } from "../../support/dompiler.js";
import { getData } from "../../support/data.js";

/**
 * Renders a grid containing multiple cells.
 * @returns {DocumentFragment} The rendered grid as a document fragment.
 */
export function renderGrid() {

    // Variables.
    let items = getData(),
        {
            elements,
            compile,
            namedElementList,
            each
        } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let compiled = compile(`
        <div class="grid">
            ${each(items, item => `
                <div class="grid__item">
                    <h2 class="grid__item__header" ${namedElementList("Header")}>${item.name}</h2>
                    <p class="grid__item__bio" ${namedElementList("Bio")}>${item.bio}</p>
                </div>
            `)}
        </div>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio
    } = elements;
    Header.forEach(x => x.style.backgroundColor = "#f00");
    Bio.forEach(x => x.style.backgroundColor = "#0f0");

    // Return compiled markup.
    return (compiled);

}