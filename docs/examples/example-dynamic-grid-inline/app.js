import { renderGrid } from "./grid/grid.js";
import { getData } from "../support/data.js";
import { Events } from "../support/events.js";

/**
 * Renders the grid and inserts it into the body of the page.
 */
function renderAll(data) {
    let results = renderGrid(data),
        wrapper = document.querySelector("#wrapper"),
        newWrapper = wrapper.cloneNode(false);
    newWrapper.appendChild(results);
    wrapper.parentNode.replaceChild(newWrapper, wrapper);
    Events.listen("grid.addItem", newWrapper, (item) => addItemHandler(data, item));
}

function addItemHandler(data, item) {
    data.push(item);
    renderAll(data);
}

// Start rendering.
renderAll(getData());