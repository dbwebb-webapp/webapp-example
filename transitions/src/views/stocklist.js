export default class StocklistView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
                                <lager-title title="Lagerlista"></lager-title>
                             </header>
                             <main class="container">
                                <stock-list></stock-list>
                             </main>
                             `;
    }
}
