import { renderGrid } from "./grid/grid.js";

/**
 * Renders the grid and inserts it into the body of the page.
 */
function renderAll() {
    let results = renderGrid(),
        main = document.querySelector("#main");
    main.appendChild(results);
}

// Start rendering.
renderAll();