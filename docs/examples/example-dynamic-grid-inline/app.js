import { renderGrid } from "./grid/grid.js";
import { getData } from "../support/data.js";
import { Events } from "../support/events.js";

/**
 * Renders the grid and inserts it into the body of the page.
 * @param data The data to render.
 * @param restoreFocus Restore focus to the "Add Item" button?
 */
function renderAll(data, restoreFocus) {

    // Variables.
    let results = renderGrid(data),
        elements = results.elements,
        wrapper = document.querySelector("#wrapper");

    // Listen for events.
    Events.listen("grid.addItem", elements, item => addItemHandler(data, item));
    Events.listen("grid.deleteItem", elements, index => deleteItemHandler(data, index));

    // Replace the DOM.
    wrapper.innerHTML = "";
    wrapper.appendChild(elements);

    // Restore focus to the "Add Item" button after replacing the DOM.
    if (restoreFocus) {
        results.AddButton.focus();
    }

}

function deleteItemHandler(data, index) {
    data.splice(index, 1);
    renderAll(data);
}

function addItemHandler(data, item) {
    data.push(item);
    renderAll(data, true);
}

// Start rendering.
renderAll(getData(), false);