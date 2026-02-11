import { renderMarkdown } from "../utils.js";

export default class SingleProduct extends HTMLElement {

    constructor() {
        super()

        // this attaches a shadow DOM to the component (where it is used in the DOM)
        // mode: open - allows access to shadow DOM from outside the component
        this.attachShadow({ mode: 'open' })

    }
    // component attributes
    static get observedAttributes() {
        return ['product'];
    }

    get product() {
        const productAttr = this.getAttribute("product")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");

        return JSON.parse(productAttr)
    }

    // template
    connectedCallback() {
        const productTemplate = document.getElementById('product-template')
        const clone = productTemplate.content.cloneNode('true')
        clone.querySelector('.product-name').textContent = this.product.name
        clone.querySelector('img').src = this.product.image_url
        clone.querySelector('.product-description').innerHTML =
            '<span class="close-btn">&times;</span>' + renderMarkdown(this.product.description)


        clone.querySelector('.read').addEventListener('click', () => {
            this.shadowRoot.querySelector('.product-description').classList.add('show')
            //this.shadowRoot.querySelector('.read').textContent = 'Hide description'
            console.log('clicked')
        })

        // X btn på 'card'
        clone.querySelector('.close-btn').addEventListener('click', () => {
            this.shadowRoot.querySelector('.product-description').classList.remove('show')
            this.shadowRoot.querySelector('.read').textContent = 'Read description...'
        })

        this.shadowRoot.appendChild(clone)

        this.render()
    }

    render() {
        // detta körs ju först efter att DOM har laddats.
        // därför kan vi vara säkra på att data från API:t också är laddat.
        // Alltså kan våra transitions köras så att de blir märkbara
        const viewContainer = this.closest('.view-container')
        if (viewContainer) {
            requestAnimationFrame(() => {
                viewContainer.classList.add('visible')
            });
        }
    }

}