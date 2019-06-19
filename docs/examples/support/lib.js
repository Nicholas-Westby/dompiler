export class Compiler {
    constructor() {
        this.nestedElements = {};
        this.namedElements = {};
        this.namedElementLists = {};
    }
    compile(value) {
        let compiled = document.createRange().createContextualFragment(value);
        let found = compiled.querySelectorAll("[lib-val]");
        found.forEach(x => {
            let attr = x.getAttribute("lib-val");
            x.removeAttribute("lib-val");
            this.namedElements[attr] = x;
        });
        found = compiled.querySelectorAll("[lib-elements]");
        found.forEach(x => {
            let attr = x.getAttribute("lib-elements");
            let newNode = this.nestedElements[attr];
            x.parentNode.replaceChild(newNode, x);
        });
        found = compiled.querySelectorAll("[lib-list]");
        found.forEach(x => {
            let attr = x.getAttribute("lib-list");
            x.removeAttribute("lib-list");
            let list = this.namedElementLists[attr] || [];
            list.push(x);
            this.namedElementLists[attr] = list;
        });
        return (compiled);
    }
    namedElement(name) {
        return `lib-val="${name}"`;
    }
    namedElementList(name) {
        return `lib-list="${name}"`;
    }
    each(items, transformer) {
        let fragment = document.createDocumentFragment();
        items.forEach(x => {
            let item = transformer(x);
            let itemFragment = document.createRange().createContextualFragment(item);
            fragment.appendChild(itemFragment);
        });
        return this.asString(fragment);
    }
    asString(fragment) {
        let div = document.createElement("div");
        div.appendChild(fragment);
        return div.innerHTML;
    }
    nestElements(key, fragments) {
        let fragment = document.createDocumentFragment();
        fragments.forEach(x => {
            fragment.appendChild(x);
        });
        this.nestedElements[key] = fragment;
        return `<div lib-elements="${key}"></div>`;
    }
    withBinding() {
        return {
            compile: this.compile.bind(this),
            namedElement: this.namedElement.bind(this),
            namedElementList: this.namedElementList.bind(this),
            each: this.each.bind(this),
            nestElements: this.nestElements.bind(this),
            elements: this.namedElements,
            listElements: this.namedElementLists
        };
    }
}