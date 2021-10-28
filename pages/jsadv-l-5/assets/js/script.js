//доступ до елементів форми складу
let storage = document.forms.storage; // форма складу
let storageBalance = storage.balance; // поле к-сть грошей в касі
let storageBeer = storage.beer; // поле к-сть пива на 
let storageVine = storage.vine; // поле к-сть вина
let storagePepsi = storage.pepsi; // поле к-сть пепсі



// Доступ до елементів форми замовлення
let order = document.forms.order; // форма
let orderCount = order.count; // кількість замовлення
let productType = order.product; // тип товару замовлення
let add = order.add; // кнопка додати
let buy = order.buy; // кнопка купити
let orderedList = document.querySelector('.textarea'); // список замовлення
//Доступ до корзини
let cart = document.querySelector('.cart'); // поле замовлених товарів

// Модуль опрацювання основних операцій

const MyModule = (function () {
    class Product {
        constructor(name, qtyStock, price) {
            this.name = name;
            this.qtyStock = qtyStock;
            this.price = price;
        }
    }
    let beer = new Product('Пиво', 100, 10); //визначення товару
    let vine = new Product('Вино', 50, 15); //визначення товару
    let pepsi = new Product('Пепсі', 80, 8); //визначення товару
    let products = [beer, vine, pepsi];
    let pruductAmountPrice = 0;
    let newBank = 0;
    let newName = '';
    let newCount = 0;
    let bank = 1000;
    let selled = false; // для скидання запамятовування суми після того як відбулася покупка

    function calc(name, count) {
        if (count < 1) {
            alert('Введено не коректні дані');
            return false;
        } else {
            for (let i = 0; i < products.length; i++) {
                if (name == products[i].name) {
                    if(products[i].qtyStock == 0){
                        alert(`Вибачте але на слкаді не залишилося продукту ${products[i].name}`);
                        return false;
                    }else if (products[i].qtyStock >= count) {
                        if( selled ){ 
                            pruductAmountPrice = 0; // скидання запамятовування суми після того як відбулася покупка
                            selled = false;
                        }
                        pruductAmountPrice += (count * products[i].price);
                        newName = products[i].name;
                        newCount = products[i].qtyStock - count;
                        products[i].qtyStock = newCount;
                        newBank = pruductAmountPrice + bank;
                    } else {
                        alert(`Не достатньо продукта  " ${name} " кількість на складі  = ${products[i].qtyStock}`);
                        return false;
                    }
                }
            }

            return {
                newName,
                pruductAmountPrice,
                newCount,
                newBank
            }
        }
    }

    function sellingComplete() {
        selled = true; // скидання запамятовування суми після того як відбулася покупка
        return selled;
    }
    function storeStock(){
            let beerCount = beer.qtyStock;
            let vineCount = vine.qtyStock;
            let pepsiCount = pepsi.qtyStock;
            let cash = bank;
        return {
            beerCount, vineCount, pepsiCount, cash
        }
    }

    return {
        calc: calc,
        selledComplete: sellingComplete,
        storeStock: storeStock
    }
}());

// ініціалізація кількості на складі
storageBalance.value = MyModule.storeStock().cash; // к-сть грошей значення
storageBeer.value = MyModule.storeStock().beerCount; // к-сть пива значення
storageVine.value = MyModule.storeStock().vineCount; // к-сть вина значення
storagePepsi.value = MyModule.storeStock().pepsiCount; // к-сть пепсі значення

// отримання назви вибраного продукта
function getProductName() { 
    let name;
    for (let i = 0; i < productType.length; i++) {
        if (productType[i].checked) {
            name = productType[i].value; // отримання назви вибраного продукта
        }
    }
    return name;
}

add.addEventListener('click', function () {
    let orderName = getProductName(); // отримання назви вибраного продукта
    let orderQty = +orderCount.value; // отримання кількості вибраного продукта

    if (MyModule.calc(orderName, orderQty)) {
        orderedList.innerHTML += `<div>${orderName}: ${orderQty}шт.</div>`; // запис в замовлення
        buy.disabled = false; // активація кнопки купити
    }

    let productType = MyModule.calc().newName; // запис продукта в змінну (назва продукта)
    let newCount = MyModule.calc().newCount; // запис продукта в змінну (залишок на складі)


    for (let i = 0; i < storage.length; i++) {
        if (storage[i].getAttribute('data') == productType) {
            storage[i].value = newCount; // перезапис кількості на складі у відповідні поля
        }
    }
})
buy.addEventListener('click', function () {
    let productAmount = MyModule.calc().pruductAmountPrice; // сума покупки
    let newBank = MyModule.calc().newBank; // оновлена каса

    storageBalance.value = newBank;
    cart.innerHTML = orderedList.innerHTML + `<div>Всього на суму: ${productAmount}грн.</div>`;
    orderedList.innerHTML = ' ';
    this.disabled = true;
    MyModule.selledComplete(); // скидання запамятовування суми після того як відбулася покупка
})