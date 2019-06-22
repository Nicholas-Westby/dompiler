import { renderGrid } from "./grid/grid.js";
import { getData } from "../support/data.js";
import { Events } from "../support/events.js";

/**
 * Renders the grid and inserts it into the body of the page.
 */
function renderAll(data) {
    let results = renderGrid(data),
        wrapper = document.querySelector("#wrapper");
    Events.listen("grid.addItem", results, item => addItemHandler(data, item));
    Events.listen("grid.deleteItem", results, index => deleteItemHandler(data, index));
    wrapper.innerHTML = "";
    wrapper.appendChild(results);
}

function deleteItemHandler(data, index) {
    data.splice(index, 1);
    renderAll(data);
}

function addItemHandler(data, item) {
    data.push(item);
    renderAll(data);
}

// Start rendering.
renderAll(getData());