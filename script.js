var app = new Vue({
    el: '#app',
    data: {
        brand: 'NASA',
        product: 'Socks',
        selectedVariant: 0,
        url: "https://www.etsy.com/listing/755853484/james-webb-space-telescope-jwst-science?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=astronomy+socks&ref=sr_gallery-1-22&frs=1",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantName: 'James Webb Telescope',
                variantColor: 'blue',
                variantImage: './assets/jwt-Socks.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantName: 'Space Shuttle',
                variantColor: 'green',
                variantImage: './assets/ss-Socks.jpg',
                variantQuantity: 0
            }
        ],
        cart: 1
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(idx) {
            this.selectedVariant = idx;
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() { 
            return this.variants[this.selectedVariant].variantQuantity > 0
        }
    }
});
