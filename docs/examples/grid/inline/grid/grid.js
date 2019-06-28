import { Dompiler } from "../../../../library/dompiler.js";
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
        <ul class="grid">
            ${each(items, item => `
                <li class="grid__item">
                    <h2 class="grid__item__header" ${namedElementList("Header")}>${item.name}</h2>
                    <p class="grid__item__bio" ${namedElementList("Bio")}>${item.bio}</p>
                </li>
            `)}
        </ul>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio
    } = elements;
    (Header || []).forEach(x => x.style.backgroundColor = "#7a9a5d");
    (Bio || []).forEach(x => x.style.backgroundColor = "#71ad97");

    // Return compiled markup.
    return (compiled);

}