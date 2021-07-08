const app = Vue.createApp({
    data() {
        return {

            cart: 0,
            premium:true
            
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },

        updateCart(){
            this.cart += 1;      
        }
    }
})