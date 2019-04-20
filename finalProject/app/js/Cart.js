class Cart {
  constructor(source, container = '#cart', isBigCart = false) {
    this.source = source;
    this.container = container;
    this.isBigCart = isBigCart;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.amount = 0; // Общее стоимость товаров в корзине
    this.cartItems = []; // Массив со всеми товарами
    this._init(this.source);
  }

  _render() {
    let $cartItemsDiv = $('<div/>', {
      class: 'cart-items-wrap'
    });
    let $totalPrice = $('<div/>', {
      class: 'cart-price'
    });
    let $buttonsBox = $('<div/>', {
      class: 'cart-buttons-box'
    });
    $cartItemsDiv.appendTo($(this.container));
    $totalPrice.append($(`<p>TOTAL</p>`));
    $totalPrice.append($(`<p class="sum-price"></p>`));
    $totalPrice.appendTo($(this.container));
    $buttonsBox.append($(`<a class="button-site checkout-button" href="checkout.html">Checkout</a>`));
    $buttonsBox.append($(`<a class="drop-cart-button" href="shopping-cart.html">Go to cart</a>`));
    $buttonsBox.appendTo($(this.container));
  }

  _renderBig() {
    let $cartColumnsDiv = $('.cart-columns');
    let $cartColumnDetail = $('<div/>', {
      class: 'cart-columns__details'
    });
    let $delBtn = $('<a/>', {
      class: 'cart-button cart-buttons__button delAllBtn',
      href: '#'
    });
    $delBtn.text('cLEAR SHOPPING CART');
    $delBtn.on('click', ()=> this._removeAll());
    $('.cart-buttons').prepend($delBtn);
    $cartColumnDetail.append($(`<h3 class="cart-columns__details__h">Product Detailsh</h3>`));
    $cartColumnsDiv.append($cartColumnDetail);
    $cartColumnsDiv.append($(`<h3 class="cart-columns__h">unite Price</h3>`));
    $cartColumnsDiv.append($(`<h3 class="cart-columns__h">Quantity	</h3>`));
    $cartColumnsDiv.append($(`<h3 class="cart-columns__h">shipping	</h3>`));
    $cartColumnsDiv.append($(`<h3 class="cart-columns__h">Subtotal</h3>`));
    $cartColumnsDiv.append($(`<h3 class="cart-columns__h">ACTION</h3>`));
  }

  _init(source) {
    this.isBigCart ? this._renderBig() : this._render();
    if (!localStorage.getItem('mycart')) {
      fetch(source)
        .then(result => result.json())
        .then(data => {
          for (let product of data.contents) {
            this.cartItems.push(product);
            this.isBigCart ? this._renderBigItem(product) : this._renderItem(product);
          }
          this.countGoods = data.countGoods;
          this.amount = data.amount;
          localStorage.setItem('mycart', JSON.stringify(this.cartItems));
          localStorage.setItem('countGoods', this.countGoods);
          localStorage.setItem('amount', this.amount);
          this._renderSum();
        })
    } else {
      this.cartItems = JSON.parse(localStorage.getItem('mycart'));
      for (let product of this.cartItems){
        this.isBigCart ? this._renderBigItem(product) : this._renderItem(product);
      }
      this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
      this.amount = JSON.parse(localStorage.getItem('amount'));
      this._renderSum();
    }
  }

  _renderSum() {
    //$('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
    $('.sum-price').text(`$${this.amount}`);
    if (this.countGoods === 0) {
      $(this.container).prepend($(`<p class="emptyCart"> Your cart is empty.</p>`));
      this.isBigCart ? $('.delAllBtn').hide() : $('.cart-buttons-box').hide();
      this.isBigCart ? $('.cart-buttons-box').hide() : $('.cart-price').hide();
    }
  }

  _renderItem(product) {
    let $container = $('<div/>', {
      class: 'cart-item-box'
    });
    let $itemContainer = $('<div/>', {
      class: 'cart-item-container'
    });
    let $itemLinkImg = $('<a/>', {
      class: 'single-page-link',
      href: 'single-page.html'
    });
    let $itemInfo = $('<div/>', {
      class: 'cart-product-info',
      'data-id': product.id_product
    });
    let $itemLinkName = $('<a/>', {
      class: 'single-page-link',
      href: 'single-page.html'
    });
    let $delButton = $('<a>', {
      class: 'cart-del-item',
      href: `#del_${product.id_product}`,
      'data-id': product.id_product
    });
    $itemLinkImg.append($(`<img class="cart-img" src="${product.min_img}" alt="product1">`));
    $itemLinkImg.appendTo($itemContainer);
    $itemLinkName.append($(`<h3>${product.product_name}</h3>`));
    $itemLinkName.appendTo($itemInfo);
    $itemInfo.append($(`<i class="fas fa-star item-stars"></i>`));
    $itemInfo.append($(`<i class="fas fa-star item-stars"></i>`));
    $itemInfo.append($(`<i class="fas fa-star item-stars"></i>`));
    $itemInfo.append($(`<i class="fas fa-star item-stars"></i>`));
    $itemInfo.append($(`<i class="fas fa-star-half-alt item-stars"></i>`));
    $itemInfo.append($(`<p> <span class="product-quantity">${product.quantity}</span> x 
                            <span class="product-price">$${product.price}</span></p>`));
    $itemInfo.appendTo($itemContainer);
    $delButton.on('click', (event)=> this._remove(event.target.parentNode));
    $delButton.append($(`<i class="fas fa-times-circle"></i>`));
    $delButton.appendTo($itemContainer);

    $itemContainer.appendTo($container);

    $container.appendTo($('.cart-items-wrap'));
  }

  _renderBigItem(product){
    let $container = $('<div/>', {
      class: 'cart-product-details',
      "data-id": `${product.id_product}`,
    });
    let $link = $('<a/>', {
      href: 'single-page.html'
    });
    let $details = $('<div/>', {
      class: 'cart-product-details__text-box'
    });
    let $form = $('<form/>', {
      class: 'cart-product-other__p'
    });
    let $input = $('<input/>', {
      class: `cart-product-other__input product-quantity`,
      type: `number`,
      "data-id": `${product.id_product}`,
      min: 0,
      max: 99,
      onkeydown: 'return false',
      value: `${product.quantity}`
    });
    let $delBtnContainer = $('<div/>', {
      class: 'cart-product-other__p'
    });
    let $delBtn = $('<a/>', {
      href:`#del_${product.id_product}`,
      "data-id": `${product.id_product}`,
      class: 'cart-product-other__del'
    });
    $link.append($(`<img src="${product.min_img}" class="cart-product-details__img" alt="shopping_cart_img">`));
    $details.append($(`<a href="single-page.html" 
                          class="cart-product-details__link">
                          <h3 class="cart-product-details__h">${product.product_name}</h3>
                        </a>`));
    $details.append($(`<p class="cart-product-details__p">Color:
                        <span class="cart-product-details__span"> Red</span></p>`));
    $details.append($(`<p class="cart-product-details__p">Size:
                        <span class="cart-product-details__span"> Xll</span></p>`));
    $input.on('input',(event) => {
      let productId = +$(event.target).data('id');
      let find = this.cartItems.find(product => product.id_product === productId);
      event.target.value > find.quantity && this.addProduct(event.target);
      event.target.value < find.quantity && this._remove(event.target);
    });
    $form.append($input);
    $delBtn.on('click', (event)=> this._remove(event.target.parentNode));
    $delBtn.append($(`<i class="fas fa-times-circle"></i>`));
    $delBtnContainer.append($delBtn);
    $container.append($link);
    $container.append($details);
    $container.append($(`<p class="cart-product-other__p product-price">$${product.price}</p>`));
    $container.append($form);
    $container.append($(`<p class="cart-product-other__p">FREE</p>`));
    $container.append($(`<p class="cart-product-other__p product-sum">$${product.quantity*product.price}</p>`));
    $container.append($delBtnContainer);
    $container.appendTo($(this.container));
  }

  _updateCart(product) {
    let $container = $(`div[data-id="${product.id_product}"]`);
    $container.find('.product-price').text(`$${product.price}`);
    this.isBigCart && $container.find('.product-sum').text(`$${product.price * product.quantity}`);
    this.isBigCart ? $container.find('.product-quantity').val(product.quantity)
                   : $container.find('.product-quantity').text(product.quantity);
  }

  addProduct(element) {
    let productId = +$(element).data('id');
    let find = this.cartItems.find(product => product.id_product === productId);
    if (find) {
      find.quantity++;
      this.countGoods++;
      this.amount += find.price;
      this._updateCart(find);
    } else {
      let product = {
        id_product: productId,
        price: +$(element).data('price'),
        product_name: $(element).data('title'),
        min_img: $(element).data('img'),
        quantity: 1
      };
      if (this.countGoods === 0) {
        $(`.emptyCart`).remove();
        $('.cart-buttons-box').show();
        $('.cart-price').show();
      }
      this.cartItems.push(product);
      this.countGoods++;
      this.amount += product.price;
      this.isBigCart ? this._renderBigItem(product) : this._renderItem(product);
    }
    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
    localStorage.setItem('countGoods', this.countGoods);
    localStorage.setItem('amount', this.amount);
    this._renderSum();
  }

  _remove(element) {
    let productId = $(element).data('id');
    let find = this.cartItems.find(product => product.id_product === productId);
    if (find) {
      find.quantity--;
      this.countGoods--;
      this.amount -= find.price;
      if (find.quantity === 0){
        element.parentNode.parentNode.remove();
        let findIndex = this.cartItems.findIndex(product => product.id_product === productId);
        this.cartItems.splice(findIndex,1);
      }
      else this._updateCart(find);
    } else {
      console.log('error');
    }
    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
    localStorage.setItem('countGoods', this.countGoods);
    localStorage.setItem('amount', this.amount);
    this._renderSum();
  }

  _removeAll(){
    $(this.container).html("");
    this.countGoods = 0;
    this.amount = 0;
    this.cartItems = [];
    localStorage.removeItem('mycart');
    localStorage.removeItem('countGoods');
    localStorage.removeItem('amount',);
    this._renderSum();
  }


}