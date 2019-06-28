import { Dompiler } from "../../../../library/dompiler.js";
import { Events } from "../../../../library/events.js";

/**
 * Renders a grid containing multiple cells.
 * @param items The data items to render.
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
        <ul class="grid">
            ${each(items, item => `
                <li class="grid__item">
                    <button class="grid__item__delete-button" ${namedElementList("DeleteButtons")}>
                        <span class="grid__item__delete-button__text">X</span>
                    </button>
                    <h2 class="grid__item__header" ${namedElementList("Header")}>${item.name}</h2>
                    <p class="grid__item__bio" ${namedElementList("Bio")}>${item.bio}</p>
                </li>
            `)}
        </ul>
        <div>
            <button class="grid__add-button" ${namedElement("AddButton")} type="button">Add Item</button>
        </div>
    `);

    // Interact with DOM elements.
    let {
        Header,
        Bio,
        AddButton,
        DeleteButtons
    } = elements;
    (Header || []).forEach(x => x.style.backgroundColor = "#7a9a5d");
    (Bio || []).forEach(x => x.style.backgroundColor = "#71ad97");
    (DeleteButtons || []).forEach((x, i) => x.addEventListener("click", () => deleteItemHandler(i, DeleteButtons[i])));
    AddButton.addEventListener("click", () => addItemHandler(AddButton));

    // Return compiled markup, and element references.
    return {
        elements: compiled,
        AddButton: AddButton,
        DeleteButtons: DeleteButtons
    };

}

function deleteItemHandler(index, element) {
    Events.emit("grid.deleteItem", element, index);
}

function addItemHandler(element) {
    let name = "Person #" + Math.round(Math.random() * 100),
        newItem = {
            name: name,
            bio: `${name} does stuff.`
        };
    Events.emit("grid.addItem", element, newItem);
}