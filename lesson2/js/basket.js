class Basket {
    constructor(){
      this.allProductsInbasket = [];
      this.totalPrice = 0;
    }
  
    initListeners(){
      // addEventListener('change', () => basketTotalPrice())
    }
    basketTotalPrice(){}
  }
  class ProductsInBasket {
    constructor(prod){
      this.title = prod.title
      this.price = prod.price
      this.id = prod.id
      this.img = prod.img
      this.quanity = 1;
    }
  
    addInBasket(){
      if(check() == false){
        renderInBasket();
        initRemoved();
      } else {
        quanityPlus()
      }
    }
    check(){}
    renderInBasket(){};
    initRemoved(){};
    removeFromBasket(){};
    quanityPlus(){};
    quanityMinus(){};
    productPriceQuanityChange(){};
  }
  