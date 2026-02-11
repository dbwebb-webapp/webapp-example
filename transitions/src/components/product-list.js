import { apiKey, baseURL } from "../utils.js"


export default class ProductList extends HTMLElement {
    constructor() {
        super()

        this.products = []
    }

    async connectedCallback() {
        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`)
        const result = await response.json()

        this.products = result.data
        console.log("product list")
        this.render()
    }

    render() {
        const list = this.products.map((product) => {
            //exempele slot
            const showBadge = Math.random() < 0.3;  // 30%
            const badge = showBadge ? '<span slot="badge">NEW</span>' : '';


            const productJson = JSON.stringify(product).replace(/'/g, '&apos;').replace(/"/g, '&quot;')
            return `<div class='product-container'>
                            <single-product class='item' product='${productJson}'>
                            ${badge}
                            </single-product>
                    </div>`;
        }).join("")
        this.innerHTML = `<h2>exempel-produkter</h2>${list}`

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