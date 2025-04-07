export default class SingleProduct extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById("single-product-template").content;
        
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.cloneNode(true));
    }
}