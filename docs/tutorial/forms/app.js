// Import Dompiler.
import Dompiler from "../../library/dompiler.js";

// Initialize Dompiler.
let {
    compile,
    elements,
    namedElement
} = new Dompiler().withBinding();

// Compile markup string into a document fragment.
let markup = `
        <h2>Inputs</h2>
        <form ${namedElement("Form")}>
            <label>
                First Name
                <input ${namedElement("FirstName")} type="text" placeholder="Enter Your First Name" />
            </label>
            <label>
                Last Name
                <input ${namedElement("LastName")} type="text" placeholder="Enter Your Last Name" />
            </label>
            <label>
                Favorite Color
                <input ${namedElement("Color")} type="text" placeholder="For Example, &quot;#f00&quot; or &quot;red&quot;" />
            </label>
        </form>
        <div ${namedElement("ResponseContainer")}></div>
    `,
    compiled = compile(markup);

// Get the DOM elements.
let {
    Form,
    FirstName,
    LastName,
    ResponseContainer,
    Color
} = elements;

// Prevent this form from submitting (it's purely client side).
Form.addEventListener("submit", e => e.preventDefault());

// Attach event listeners to the form elements.
[FirstName, LastName, Color].forEach(x => x.addEventListener("input", updateResponse));

// Append compiled markup to container.
let container = document.querySelector(".example-container");
container.appendChild(compiled);

// Immediately show the response (before any event listeners are activated).
updateResponse();

// Update the response message based on the form input fields.
function updateResponse() {

    // Initialize Dompiler.
    let {
        compile,
        elements,
        namedElement
    } = new Dompiler().withBinding();

    // Variables.
    let fullName = [
            FirstName.value,
            LastName.value
        ].filter(x => !!x).join(" "),
        color = Color.value;

    // Compile markup string into a document fragment.
    let markup = `
            <h2>Response</h2>
            ${ fullName && `
                <p>
                    Nice to meet you, ${fullName}.
                </p>
            ` || ""}
            ${ color && `
                <p ${namedElement("ColorContainer")}" class="favorite-color">
                    My favorite color is also ${color}!
                </p>
            ` || "" }
        `,
        compiled = compile(markup);

    // Get the DOM elements.
    let {
        ColorContainer
    } = elements;

    // Update the background color.
    if (ColorContainer) {
        ColorContainer.style.backgroundColor = color;
    }

    // Append compiled markup to container.
    ResponseContainer.innerHTML = "";
    ResponseContainer.appendChild(compiled);

}