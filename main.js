const app = Vue.createApp({
    data() {
        return {

            cart: [],
            premium:true
            
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },

        updateCart(id){
            this.cart.push(id);    
        }
    }
})