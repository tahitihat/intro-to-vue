var app = new Vue({
    el: '#app',
    data: {
        product: 'NASA socks',
        image: './assets/jwt-Socks.jpg',
        url: "https://www.etsy.com/listing/755853484/james-webb-space-telescope-jwst-science?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=astronomy+socks&ref=sr_gallery-1-22&frs=1",
        inventory: 100,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'James Webb Telescope'
            },
            {
                variantId: 2235,
                variantColor: 'Space Shuttle'
            }
        ]
    }
});
