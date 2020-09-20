class Hamburger {
    constructor(topping, spices, mayonez){
        this.spices = spices;
        this.mayonez = mayonez;
        this.topping = topping;
        this.price = 0;
        this.calory = 0;
    }
    calcCaloryAndPrice(){
        if(this.spices == true){
            this.price += 20
            this.calory += 5
        }
        if(this.mayonez == true){
            this.price += 20
            this.calory += 5
        }
        if(this.topping == 'cheese'){
            this.price += 10
            this.calory += 20
        } else if(this.topping == 'salat') {
            this.price += 20
            this.calory += 5
        } else if(this.topping == 'potato'){
            this.price += 15
            this.calory += 10
        }
    }
}

class BigHamburger extends Hamburger{
    constructor(topping, spices, mayonez){
        super(topping, spices, mayonez)
        this.price += 100
        this.calory += 40
    }
}
class SmallHamburger extends Hamburger{
    constructor(topping, spices, mayonez){
        super(topping, spices, mayonez)
        this.price += 50
        this.calory += 20
    }
}
/**
 * в конструктор BigHamburger передаётся 3 значения
 * 1- Название топинга
 * 2- Добавляены специи или нет
 * 3- добавлен майонез или нет
 */
const order = new BigHamburger('salat', true, false);
const order2 = new SmallHamburger('cheese', false, true);
const order3 = new BigHamburger('potato', true, true);


order.calcCaloryAndPrice()
console.log(`Первый заказ: Калории ${order.calory}, цена ${order.price}`)

order2.calcCaloryAndPrice()
console.log(`Второй заказ: Калории ${order2.calory}, цена ${order2.price}`)

order3.calcCaloryAndPrice()
console.log(`Третий заказ: Калории ${order3.calory}, цена ${order3.price}`)
