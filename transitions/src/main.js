//router
import Router from './router.js'
import Navigation from './navigation.js'

//components
import ProductList from "./components/product-list.js"
import SingleProduct from "./components/single-product.js"
import StockList from "./components/stock-list.js"

//view
import ProductsView from "./views/products.js"
import StocklistView from "./views/stocklist.js"

customElements.define('router-outlet', Router)
customElements.define('navigation-outlet', Navigation)

customElements.define('product-list', ProductList)
customElements.define('single-product', SingleProduct)

//define views
customElements.define('products-view', ProductsView)
customElements.define('stocklist-view', StocklistView)

customElements.define('stock-list', StockList)
