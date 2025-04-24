import Router from "./router.js";
import Navigation from "./navigation.js";

import ListComponent from "./list-component.js";
import DetailComponent from "./detail-component.js";

customElements.define("router-outlet", Router);
customElements.define("navigation-outlet", Navigation);

customElements.define("list-component", ListComponent);
customElements.define("detail-component", DetailComponent);
