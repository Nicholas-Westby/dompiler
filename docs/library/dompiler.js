/**
 * The Dompiler class that manages DOM compilation and interaction.
 */
export class Dompiler {

    /**
     * The constructor (just initializes a few variables.
     */
    constructor() {
        this.nestedElements = {};
        this.namedElements = {};
    }

    /**
     * This is where the magic happens (the string is compiled into a document fragment).
     * @param {string} value The string value to compile.
     * @returns {DocumentFragment} The compiled document fragment (that can then be inserted into the page).
     */
    compile(value) {

        // Convert the string to a document fragment.
        let compiled = document.createRange().createContextualFragment(value.trim());

        // Handle all the named elements.
        let found = compiled.querySelectorAll("[dompiler-element]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-element");
            x.removeAttribute("dompiler-element");
            this.namedElements[attr] = x;
        });

        // Handle all the named element lists.
        found = compiled.querySelectorAll("[dompiler-list]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-list");
            x.removeAttribute("dompiler-list");
            let list = this.namedElements[attr] || [];
            list.push(x);
            this.namedElements[attr] = list;
        });

        // Handle all the named nested elements.
        found = compiled.querySelectorAll("[dompiler-nested-element]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-nested-element");
            let newNode = this.nestedElements[attr];
            x.parentNode.replaceChild(newNode, x);
        });

        // Return the document fragment.
        return compiled;

    }

    /**
     * Used to capture a reference to a DOM element by a given name.
     * @param {string} name The name to associate with the DOM element.
     * @returns {string} Outputs the attribute that will be attached to the DOM element
     *          to make it possible for Dompiler to find it during compilation.
     */
    namedElement(name) {
        return `dompiler-element="${name}"`;
    }

    /**
     * Used to capture a reference to a collection of DOM elements by a given name.
     * @param {string} name The name to associate with the DOM elements.
     * @returns {string} Outputs the attribute that will be attached to the DOM elements
     *          to make it possible for Dompiler to find them during compilation.
     */
    namedElementList(name) {
        return `dompiler-list="${name}"`;
    }

    /**
     * Loops through each supplied item, applies the supplied function, then combines the
     * resulting strings.
     * @param {*[]} items An array of items.
     * @param {function} transformer The function that transforms an item into a string.
     * @returns {string} The combined version of the strings that were returned from the
     *          transformer function.
     */
    each(items, transformer) {
        let fragment = document.createDocumentFragment();
        items.forEach((x, i) => {
            let item = transformer(x, i);
            let itemFragment = document.createRange().createContextualFragment(item);
            fragment.appendChild(itemFragment);
        });
        return this.asString(fragment);
    }

    /**
     * Converts the specified document fragment into a string.
     * @param {DocumentFragment} fragment The document fragment to convert into a string.
     * @returns {string} The document fragment as a string.
     */
    asString(fragment) {
        let div = document.createElement("div");
        div.appendChild(fragment);
        return div.innerHTML;
    }

    /**
     * Nests the elements in the specified document fragments within a string that will
     * at some point be compiled with Dompiler.
     * @param {string} key The key to use to look up the document fragment during compilation.
     * @param {DocumentFragment[]} fragments The document fragments to nest.
     * @returns {string} Outputs a DOM element that will be used during compilation in order
     *          to let Dompiler know where to apply the nested elements.
     */
    nestElements(key, fragments) {
        let fragment = document.createDocumentFragment();
        fragments.forEach(x => {
            fragment.appendChild(x);
        });
        this.nestedElements[key] = fragment;
        return `<div dompiler-nested-element="${key}"></div>`;
    }

    /**
     * Returns an object containing the Dompiler functions bound to the current instance. This
     * is useful for when you want to pass these functions around and want them to continue
     * working as designed.
     * @returns {*} An object that contains the Dompiler functions bound to the current instance.
     */
    withBinding() {
        return {
            compile: this.compile.bind(this),
            namedElement: this.namedElement.bind(this),
            namedElementList: this.namedElementList.bind(this),
            each: this.each.bind(this),
            nestElements: this.nestElements.bind(this),
            elements: this.namedElements
        };
    }

}