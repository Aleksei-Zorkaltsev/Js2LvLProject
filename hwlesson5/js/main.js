const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		showCartEmptyAndHiddenTotalPrice: true,
		products: [],
		dataProducts: true,
		imgCatalog: 'https://placehold.it/200x150',
		imgCart: 'https://placehold.it/50x100',
		searchLine: '',
		isVisibleCart: false,
		renderProducts: [],
		productsInCart: [],
		sumInCart: 0,
	},
	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				})
		},
		filterGoods() {
			if (this.searchLine !== '') {
				let regexp = new RegExp(this.searchLine, 'i')
				this.renderProducts = this.products.filter(product => regexp.test(product.product_name))
			} else {
				this.renderProducts = this.products
			}
		},
		addProduct(product) {
			let check = this.productsInCart.find(prodIn => prodIn.id_product === product.id_product)
			if (check !== undefined) {
				product.quantity++;
			} else {
				this.$set(product, 'quantity', 1);
				this.productsInCart.push(product);
				this.showCartEmptyAndHiddenTotalPrice = false; // костыль в каком то смысле %)
			}
			this.totalPrice()
		},
		deleteFromCart(product) {
			this.productsInCart.splice(this.productsInCart.findIndex(prodIn => prodIn.id_product === product.id_product), 1)
			this.totalPrice()

			if (this.productsInCart.length === 0) { this.showCartEmptyAndHiddenTotalPrice = true }
		},
		totalPrice() {
			let sum = 0;
			this.productsInCart.forEach((prodIn) => {
				sum += prodIn.price * prodIn.quantity;
			})
			this.sumInCart = sum;
		}
	},
	computed: {

	},
	mounted() {
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
				}
				if (this.products.length === 0) {
					this.dataProducts = false;
				} else { this.renderProducts = this.products; }
			});
	},

});
