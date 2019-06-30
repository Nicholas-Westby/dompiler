/**
 * The Events class offers some helper functions to make working with events in the context
 * of elements created by Dompiler easier.
 */
class Events {

    /**
     * Emits an event with the specified data on the specified element.
     * @param {string} name The name of the event.
     * @param {HTMLElement} element The DOM element to emit the event on.
     * @param {*} data The data to send along with the event.
     */
    static emit(name, element, data) {
        let event;
        if (typeof window.CustomEvent === "function") {

            // Typical implementation for CustomEvent.
            event = new CustomEvent(name, {
                bubbles: true,
                detail: data
            });
            element.dispatchEvent(event);

        } else {

            // IE11 implementation for CustomEvent.
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(name, true, false, data);
            element.dispatchEvent(event);

        }
    }

    /**
     * Listens for an event on the specified element or document fragment.
     * @param {string} name The name of the event to listen for.
     * @param {HTMLElement|DocumentFragment} element The DOM element or document fragment
     *        to listen for events on.
     * @param {function} callback The function to call once the event has been received.
     */
    static listen(name, element, callback) {

        // Variables.
        let listener = e => {
            callback(e.detail);
        };

        // Document fragment or normal DOM node?
        if (element.nodeType === 11) {

            // Attach event handler to each root node in the document fragment.
            element.childNodes.forEach(x => x.addEventListener(name, listener));

        } else {

            // Attach event handler to node.
            element.addEventListener(name, listener);

        }
    }

}

// Export Events class.
module.exports = Events;