export default class ShadowView extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }
  
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        let paragraph = document.createElement("p");

        paragraph.textContent = this.getAttribute("data-text");


        const style = document.createElement("style");

        console.log(style.isConnected);

        style.textContent = `
            p {
                color: #33c;
            }
        `;

        shadow.append(style);

        console.log(style.isConnected);

        shadow.append(paragraph);
    }
}
