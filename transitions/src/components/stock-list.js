import products from "../models/products.js";

export default class StockList extends HTMLElement {
    constructor() {
        super();
        this.productList = [];
    }

    async connectedCallback() {
        this.productList = await products.getProducts();
        this.render();
    }

    render() {
        const rows = this.productList.map((product) => {
            return `<tr>
                        <td>${product.name}</td>
                        <td>${product.stock ?? '-'}</td>
                        <td>${product.price ?? '-'}</td>
                    </tr>`;
        }).join("");

        this.innerHTML = `
            <table class="stock-table">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Lagersaldo</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

        //vänta tills data laddats - leta uppåt i DOM-trädet efter .view-container
        const viewContainer = this.closest('.view-container')
        if (viewContainer) {
            requestAnimationFrame(() => {
                viewContainer.classList.add('visible')
            });
        }
    }
}
