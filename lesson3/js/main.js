const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//первое задание
let getRequest = (url) => {
	return new Promise((ready, error) => {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					error('error');
				} else {
					ready(xhr.responseText);
				}
			}
		}
		xhr.send();
	});
}
getRequest(`${API}/addReview.json`).then(value => console.log(value)).catch(err => console.log(err))

class ProductList {
	#goods;

	constructor(container = '.products') {
		this.container = container;
		this.#goods = [];
		this.allProducts = [];

		this.#getGoods().then(data => {
			this.#goods = [...data];
			this.#render();
			this.initBuyButton()
		});

		console.log(this.sumPrice());
	}

	#getGoods() {
		return fetch(`${API}/catalogData.json`)
			.then(response => response.json())
			.catch(err => console.log(err));
	}
	#render() {
		const block = document.querySelector(this.container);

		for (let product of this.#goods) {
			const productObject = new ProductItem(product);
			this.allProducts.push(productObject);
			block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
		}
	}
	sumPrice() {
		return this.#goods.reduce((sum, { price }) => sum + price, 0);
	}

	//следущие 2 метода, для второго задания :)
	//не смог с ориентироваться как здесь сделать чтобы пушить в массив cart.productsInCart, не обращаясь напрямую к переменной cart
	initBuyButton() {
		document.querySelectorAll('.buy-btn').forEach((button) => {
			button.addEventListener('click', (event) => {
				let check = false;
				for (let i = 0; i < cart.productsInCart.length; i++) {
					if (cart.productsInCart[i].id_product == event.target.parentNode.parentNode.dataset.id) {
						check = true;
						alert('Вы уже добавили этот товар в корзину')
						break;
					}
				}
				if (check == false) {
					this.addToCart().then(value => {
						console.log(`Создание товара. Result: ${value.result}. запрос выполнен`)
						cart.productsInCart.push(new ProductInCart(event.target.parentNode))
						cart.renderProducts()
					})
				}
			});
		})
	}
	addToCart() {
		return fetch(`${API}/addToBasket.json`).then(response => response.json()).catch(err => console.log(err))
	}
}

class ProductItem {
	constructor(product, img = 'https://placehold.it/200x150') {
		this.product_name = product.product_name;
		this.price = product.price;
		this.id_product = product.id_product;
		this.img = img;
	}

	getHTMLString() {
		return `
      <div class="product-item" data-id="${this.id_product}">
         <img src="${this.img}" alt="Some img">
         <div class="desc">
            <h3>${this.product_name}</h3>
            <p>${this.price}</p>
            <button class="buy-btn data-id="${this.id_product}">Купить</button>
         </div>
      </div>`;
	}
}
//второе задание
class Cart {
	constructor(container = '.cart') {
		this.container = container;
		this.productsInCart = []

		this.renderCart()
	}
	renderCart() {
		let block = document.querySelector('.btn-cart');
		block.insertAdjacentHTML("afterend", this.cartToHtml())
		block.addEventListener('click', () => this.showOrHidden())
	}
	cartToHtml() {
		return `<div class="cart hidden">Корзина</div>`
	}
	showOrHidden() {
		document.querySelector(this.container).classList.toggle('hidden')
	}

	renderProducts() {
		document.querySelector(this.container).innerHTML = 'Корзина';
		for (let product of this.productsInCart) {
			document.querySelector(this.container).insertAdjacentHTML('beforeend', product.toHtml())
			this.initRemove(product)
		}
	}
	initRemove(product) {
		document.querySelector(`.prodInCart[data-id="${product.id_product}"]`).addEventListener('click', (event) => this.deleteToCart(event))
	}
	deleteToCart(event) {
		return fetch(`${API}/deleteFromBasket.json`).then(response => response.json())
			.then(data => {
				console.log(`Удаление товара. result: ${data.result}. Запрос выполнен`)
				if (data.result === 1) {
					for (let i = 0; i < this.productsInCart.length; i++){
						if(this.productsInCart[i].id_product == event.target.parentNode.dataset.id) {
							this.productsInCart.splice(i, 1)
							break;
						}
					}
					event.target.parentNode.remove()
				}
			}).catch(err => console.log(err))
	}
	// третий пункт второго задания***
	getProductList() {
		return fetch(`${API}/getBasket.json`).then(response => response.json())
		.then(value => console.log(value.contents))
		.catch(err => console.log(err))
	}
}
class ProductInCart {
	constructor(product) {
		//вообще не декларативно и не понятнно, я знаю, просто я не знал как еще достать значения :)
		this.id_product = product.parentNode.dataset.id
		this.product_name = product.children[0].innerHTML
		this.price = product.children[1].innerHTML
	}
	toHtml() {
		return `<div class="prodInCart" data-id="${this.id_product}">
                  <h3>${this.product_name}</h3>
                  <p>${this.price}</p>
               	<button class="del-btn">Удалить</button>
               </div>`;
	}
}

const cart = new Cart();
const list = new ProductList();
cart.getProductList() // третий пункт второго задания