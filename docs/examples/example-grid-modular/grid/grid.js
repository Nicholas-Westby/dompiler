import { Dompiler } from "../../support/dompiler.js";
import { getData } from "../../support/data.js";
import { renderCell } from "./cell.js";

/**
 * Renders a grid containing multiple cells.
 * @returns {DocumentFragment} The rendered grid as a document fragment.
 */
export function renderGrid() {

    // Variables.
    let items = getData().map(renderCell),
        {
            compile,
            nestElements
        } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let compiled = compile(`
        <ul class="grid">
            ${nestElements("grid-items", items)}
        </ul>
    `);

    // Return compiled markup.
    return (compiled);

}