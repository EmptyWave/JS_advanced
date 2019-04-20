class Param {
    constructor(element){
        this.name = element.value;
        this.calories = +element.dataset['calories'];
        this.price = +element.dataset['price'];
    }
}

class Burger {
    constructor(size, add, toppings){
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
        this.toppings = this._getToppings(toppings) ;
    }
    _getToppings(toppings){
        let result = [];
        this._selectAll(toppings).forEach(el => result.push(new Param(el)));
        return result;
    }
    _select(name){
        return document.querySelector(`input[name='${name}']:checked`);
    }
    _selectAll(name){
        return [...document.querySelectorAll(`input[name='${name}']:checked`)];
    }
    _sumPrice(){
        let result = this.size.price + this.add.price;
        this.toppings.forEach(el => result += el.price);
        return result;
    }
    _sumCalories(){
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(el => result += el.calories);
        return result;
    }
    showSum(price, calories){
        document.getElementById(price).textContent = this._sumPrice();
        document.getElementById(calories).textContent = this._sumCalories();
    }
}