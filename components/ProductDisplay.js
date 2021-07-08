app.component('product-display',{
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
        <div class="product-image" :disabled='!inStock':class="{disabledimage: !inStock}">
            <img :src="image">
        </div>
        <div class="product-info">
            <h1 >{{title}}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle":style="{backgroundColor:variant.color}"></div>
            <p>   
            <button class=" button " :disabled='!inStock':class="{disabledButton: !inStock}" @click="addToCart ">Add to Cart</button>
                
                    
            <button class=" button " :disabled='!inStock':class="{disabledButton: !inStock}" @click="DeleteToCart ">Delete to Cart</button>
            </p>       
            
            
            <review-list v-if="reviews.length":reviews="reviews"></review-list>
            <review-form @review-submited="addReview"></review-form>
        </div>
    </div>
</div>`,
data() {
    return {
        product: 'Shoes',
        brand: 'TarKz ',
        inventory: 100,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg',quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg',quantity: 0 }
    ],
        activeClass: true,
        selectedVariant:0,
        onSale: true,
        reviews:[]
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart',this.variants[this.selectedVariant].id)

    },
    removeToCart(){
        this.$emit('remove-to-cart',this.variants[this.selectedVariant].id)
    },
    updateImage(variantImage) {
        this.image = variantImage
    },
    updateVariant (index){
        this.selectedVariant = index;
    },
    addReview(review){
        this.reviews.push(review)
    }
},
computed:{
    title(){
        if(this.variants[this.selectedVariant].quantity > 0){
            return this.brand + ' ' + this.product + " In Stock"
        }else {
            return this.brand + ' ' + this.product + " Out Stock"
        }
    },
    image(){
        return this.variants[this.selectedVariant].image
    },
    inStock(){
        return this.variants[this.selectedVariant].quantity
    },
    shipping(){
        if (this.premium){
            return 'Free'
        }
        return 30;
    }
},
})




app.component('product-detail',{
    props: {
        detail:{
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `  
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
`,

computed: {
    details(){
        if(this.detail){
            return this.detail
        }
    }}
})

app.component('review-form', {
    template:
    /*html*/
    
    ` <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id ="name" v-model="name">

    <label for="sname">Surname:</label>
    <input id ="sname" v-model="sname">

    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating" >
        <option>5  </option>
        <option> 4 </option>
        <option>3 </option>
        <option> 2 </option>
        <option> 1 </option>
    </select>

    <input class ="button" type="submit" value="submit">
</form>`

    ,
    data(){
        return{
            name:'',
            sname:'',
            review: '',
            rating: null
        }
    },
    methods:{
        onSubmit(){
            let productReview = {
                name: this.name,
                sname:this.sname,
                review: this.review,
                rating: this.rating,
            }
            this.$emit('review-submited',productReview)
            this.name=''
            this.sname=''
            this.review = ''
            this.rating= null
        }
    
    }

})

app.component('review-list',{
    props: {
        reviews:{
            type: Array,
            required: true
        }
    },
    template:
    /*html*/

    ` <div class="review-container">
        <h3>Reviews</h3>
        <ul>
            <li v-for="(review , index) in reviews" :key="index" >Name : {{review.name}} 
            Surname : {{review.sname}} gave this {{review.rating}} stars
            <br />
            </li>
        </ul>
    </div>`,

})