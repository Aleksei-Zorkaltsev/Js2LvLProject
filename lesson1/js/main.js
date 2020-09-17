const defaultPicture = {
    picture: 'imgTest/default.png'
}
function Product(id, title, price, picture){
    this.id = id;
    this.title = title;
    this.price = price;
    //костыль для заглушки картинки. Не смог разобраться как без него :)
    if(picture !== undefined){
        this.picture = picture;
    }
}
Product.prototype = defaultPicture;

const products = []
//в теории: продукты через конструктор будут создаваться и пушиться через админку
products.push(new Product(1 , 'Notebook' , 50000 , 'imgTest/1.jpg'))
products.push(new Product(2 , 'Mouse' , 2200 , 'imgTest/2.jpg'))
products.push(new Product(3 , 'Keyboard' , 5000 , 'imgTest/3.jpg'))
products.push(new Product(4 , 'Gamepad' , 4500))

const renderProduct = (title, price, picture) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img class="prewImg" src="${picture}" alt="prewiewImage">
                <p class="priceProduct">Цена: ${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((product) => renderProduct(product.title, product.price, product.picture));
    productList.forEach(function(prod){
        document.querySelector('.products').insertAdjacentHTML('beforeend', prod);
    });
};
renderProducts(products);

/*
const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500}

const renderProduct = (title, price, picture) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img class="prewImg" src="${picture}" alt="prewiewImage">
                <p class="priceProduct">Цена: ${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((product) => renderProduct(product.title, product.price, product.picture));
    productList.forEach(function(prod){
        document.querySelector('.products').insertAdjacentHTML('beforeend', prod);
    });
};
renderProducts(products);
*/