import { renderGrid } from "./grid/grid.js";

/**
 * Renders the grid and inserts it into the body of the page.
 */
function renderAll() {
    let results = renderGrid(),
        content = document.querySelector("#content");
    content.appendChild(results);
}

// Start rendering.
renderAll();