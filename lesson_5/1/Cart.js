class Cart {
  constructor(source, container = '#cart') {
    this.source = source;
    this.container = container;
    this.countGoods = 0; // Общее кол-во товаров в корзине
    this.amount = 0; // Общее стоимость товаров в корзине
    this.cartItems = []; // Массив со всеми товарами
    this._init(this.source);
  }

  _render() {
    let $cartItemsDiv = $('<div/>', {
      class: 'cart-items-wrap'
    });
    /*let $totalProducts = $('<div/>', {
      class: 'cart-summary sum-amount'
    });*/
    let $totalPrice = $('<div/>', {
      class: 'cart-price'
    });
    let $buttonsBox = $('<div/>', {
      class: 'cart-buttons-box'
    });
    $cartItemsDiv.appendTo($(this.container));
    //$totalProducts.appendTo($(this.container));
    $totalPrice.append($(`<p>TOTAL</p>`));
    $totalPrice.append($(`<p class="sum-price"></p>`));
    $totalPrice.appendTo($(this.container));
    $buttonsBox.append($(`<a class="button-site checkout-button" href="checkout.html">Checkout</a>`));
    $buttonsBox.append($(`<a class="drop-cart-button" href="shopping-cart.html">Go to cart</a>`));
    $buttonsBox.appendTo($(this.container));
  }

  _init(source) {
    this._render();
    if (!localStorage.getItem('mycart')) {
      fetch(source)
        .then(result => result.json())
        .then(data => {
          for (let product of data.contents) {
            this.cartItems.push(product);
            this._renderItem(product)
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
        this._renderItem(product);
      }
      this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
      this.amount = JSON.parse(localStorage.getItem('amount'));
      this._renderSum();
    }
    }

  _renderSum() {
    //$('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
    $('.sum-price').text(`$${this.amount}`);
    //if (this.countGoods === 0) $(this.container).hide();
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
      'data-product': product.id_product
    });
    let $itemLinkName = $('<a/>', {
      class: 'single-page-link',
      href: 'single-page.html'
    });
    let $delButton = $('<a>', {
      class: 'cart-del-item',
      href: `#del_${product.id_product}`,
      'data-product': product.id_product
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

  _updateCart(product) {
    let $container = $(`div[data-product="${product.id_product}"]`);
    $container.find('.product-quantity').text(product.quantity);
    $container.find('.product-price').text(`$${product.price}`);
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
      this.cartItems.push(product);
      this.countGoods++;
      this.amount += product.price;
      this._renderItem(product);
      $(this.container).show();
    }
    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
    localStorage.setItem('countGoods', this.countGoods);
    localStorage.setItem('amount', this.amount);
    this._renderSum();
  }

  _remove(element) {
    let productId = $(element).data('product');
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
      //if (this.countGoods === 0) $(this.container).hide();
      else this._updateCart(find);
    } else {
      console.log('error');
    }
    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
    localStorage.setItem('countGoods', this.countGoods);
    localStorage.setItem('amount', this.amount);
    this._renderSum();
  }


}