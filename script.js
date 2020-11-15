Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
			<div class="product-image">
				<img v-bind:src="image">
			</div>
			<div class="product-info">
				<h1>{{ title }}</h1>
				<a :href="url" target="_blank">View socks on Etsy</a>
				<p v-if="inStock">In Stock</p>
				<p v-else :class="{ outOfStock: !inStock  }">Out of Stock</p>
                <p> Shipping: {{ shipping }} </p>

                <product-details :details="details"></product-details>

				<div v-for="(variant, index) in variants" 
				:key="variant.variantId"
				class="color-box"
				:style="{ backgroundColor: variant.variantColor}"
				>
					<p @mouseover="updateProduct(index)">
						{{ variant.variantName }}
					</p>
				</div>

				<button v-on:click="addToCart" 
					:disabled="!inStock"
					:class="{ disabledButton: !inStock }"
				>
				Add to Cart</button>

				<div class="cart">
					<p>Cart ({{ cart }})</p>
				</div>

			</div>
		</div> 
    `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            return this.premium ? "$0" : "$2.99";
        }
    }
})

Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});
