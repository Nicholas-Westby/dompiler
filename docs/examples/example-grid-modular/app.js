import { renderGrid } from "./grid/grid.js";

/**
 * Renders the grid and inserts it into the body of the page.
 */
function renderAll() {
    let results = renderGrid();
    document.body.appendChild(results);
}

// Start rendering.
renderAll();
