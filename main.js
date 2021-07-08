const app = Vue.createApp({
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
            cart: 0,
            selectedVariant:0,
            onSale: true
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateImage(variantImage) {
            this.image = variantImage
        },
        updateVariant (index){
            this.selectedVariant = index;
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
        }
    },
    //
})
