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
            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p><b>{{ review.name }}</b></p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>    

            <product-review @review-submitted="addReview"/>
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
        updateProduct(idx) {
            this.selectedVariant = idx;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      
        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
    `,
    data() { 
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
          }    
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review text required")
                if (!this.rating) this.errors.push("Rating required")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) { 
            this.cart.push(id);
        }
    }
});
