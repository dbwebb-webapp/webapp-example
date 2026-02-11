export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Produkter",
            },

            "stocklist": {
                view: "<stocklist-view></stocklist-view>",
                name: "Lagerlista",
            },

            // "deliveries": {
            //     view: "<deliveries-view></deliveries-view>",
            //     name: "Inleveranser",
            // },

            // "deliveries-form": {
            //     view: "<new-delivery></new-delivery>",
            //     name: "Ny inleverans",
            //     hidden: true,
            // },
        };
    }

    get routes() {
        return this.allRoutes;
    }

    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        this.currentRoute = location.hash.replace("#", "");
        this.render();
    }

    render() {
        const html = this.routes[this.currentRoute].view || "<not-found></not-found>";
        // wrappar in vyerna i en view-container som vi sedan kan lägga transitions på
        this.innerHTML = `<div class="view-container">${html}</div>`;
    }
}