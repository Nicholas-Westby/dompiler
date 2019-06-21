import { Dompiler } from "../../support/dompiler.js";
import { Events } from "../../support/events.js";

/**
 * Renders a grid containing multiple cells.
 * @returns {DocumentFragment} The rendered grid as a document fragment.
 */
export function renderGrid(items) {

    // Variables.
    let {
            elements,
            compile,
            namedElement,
            namedElementList,
            each
        } = new Dompiler().withBinding();

    // Compile markup string into a document fragment.
    let compiled = compile(`
        <div class="grid">
            ${each(items, item => `
                <div class="grid__item">
                    <h2 ${namedElementList("Header")}>${item.name}</h2>
                    <p ${namedElementList("Bio")}>${item.bio}</p>
                </div>
            `)}
        </div>
        <div>
            <button ${namedElement("AddItem")} type="button">Add Item</button>
        </div>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio,
        AddItem
    } = elements;
    Header.forEach(x => x.style.backgroundColor = "#fea");
    Bio.forEach(x => x.style.backgroundColor = "#0f0");
    AddItem.addEventListener("click", () => addItemHandler(AddItem));

    // Return compiled markup.
    return compiled;

}

function addItemHandler(element) {
    let name = "Person #" + Math.round(Math.random() * 100),
        newItem = {
            name: name,
            bio: `${name} does stuff.`
        };
    Events.emit("grid.addItem", element, newItem);
}