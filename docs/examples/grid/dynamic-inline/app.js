import { renderGrid } from "./grid/grid.js";
import { getData } from "../support/data.js";
import Events from "../../../library/events.js";

/**
 * Renders the grid and inserts it into the body of the page.
 * @param data The data to render.
 * @param options The options to use when rendering.
 */
function renderAll(data, options) {

    // Normalize input.
    options = options || {};

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
    if (options.restoreFocus) {
        results.AddButton.focus();
    }

    // Restore focus to one of the delete buttons (after deleting a card)?
    if (options.focusIndex >= 0) {
        results.DeleteButtons[options.focusIndex].focus();
    }

}

function deleteItemHandler(data, index) {
    data.splice(index, 1);
    renderAll(data, {
        focusIndex: Math.min(index, data.length - 1)
    });
}

function addItemHandler(data, item) {
    data.push(item);
    renderAll(data, { restoreFocus: true });
}

// Start rendering.
renderAll(getData());