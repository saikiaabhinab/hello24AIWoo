const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const dotenv = require('dotenv');

dotenv.config()

const WooCommerce = new WooCommerceRestApi({
    url: "https://ninjashop.in",
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    // wpAPI: true,
    version: "wc/v3",
});

async function listOrders(startDate, endDate, page = 1, perPage = 5) {
    try {
        const response = await WooCommerce.get("orders", {
            before: endDate,
            after: startDate,
            page: page,
            per_page: perPage,
            orderby: "date",
            order: "asc",
        });
        console.log("Orders between", startDate, "and", endDate);
        response.data.forEach((order) => {
            console.log("Order ID:", order.id, "Date:", order.date_created);
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

async function queryProducts() {

    try {
        const response = await WooCommerce.get("products", {
            per_page: 50,
            orderby: "title",
            order: "asc",
        });
        console.log("Available products ordered by title:");
        response.data.forEach((product) => {
            console.log("Product ID:", product.id, "Title:", product.name);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

const startDate = "2022-12-12T00:00:00";
const endDate = "2022-12-29T23:59:59";


listOrders(startDate, endDate, 1, 5);
queryProducts();
