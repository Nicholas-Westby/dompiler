export class Events {
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
    static listen(name, element, callback) {

        // Document fragment or normal node?
        if (element.nodeType === 11) {

            // Attach event handler to each root node in the document fragment.
            element.childNodes.forEach(x => x.addEventListener(name, (e) => {
                callback(e.detail);
            }));

        } else {

            // Attach event handler to node.
            element.addEventListener(name, (e) => {
                callback(e.detail);
            });

        }
    }
}