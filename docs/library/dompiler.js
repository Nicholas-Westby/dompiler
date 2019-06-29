export class Dompiler {
    constructor() {
        this.nestedElements = {};
        this.namedElements = {};
    }
    compile(value) {
        let compiled = document.createRange().createContextualFragment(value.trim());
        let found = compiled.querySelectorAll("[dompiler-element]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-element");
            x.removeAttribute("dompiler-element");
            this.namedElements[attr] = x;
        });
        found = compiled.querySelectorAll("[dompiler-nested-element]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-nested-element");
            let newNode = this.nestedElements[attr];
            x.parentNode.replaceChild(newNode, x);
        });
        found = compiled.querySelectorAll("[dompiler-list]");
        found.forEach(x => {
            let attr = x.getAttribute("dompiler-list");
            x.removeAttribute("dompiler-list");
            let list = this.namedElements[attr] || [];
            list.push(x);
            this.namedElements[attr] = list;
        });
        return (compiled);
    }
    namedElement(name) {
        return `dompiler-element="${name}"`;
    }
    namedElementList(name) {
        return `dompiler-list="${name}"`;
    }
    each(items, transformer) {
        let fragment = document.createDocumentFragment();
        items.forEach((x, i) => {
            let item = transformer(x, i);
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
        return `<div dompiler-nested-element="${key}"></div>`;
    }
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