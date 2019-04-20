"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cart =
/*#__PURE__*/
function () {
  function Cart(source) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#cart';
    var isBigCart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Cart);

    this.source = source;
    this.container = container;
    this.isBigCart = isBigCart;
    this.countGoods = 0; // Общее кол-во товаров в корзине

    this.amount = 0; // Общее стоимость товаров в корзине

    this.cartItems = []; // Массив со всеми товарами

    this._init(this.source);
  }

  _createClass(Cart, [{
    key: "_render",
    value: function _render() {
      var $cartItemsDiv = $('<div/>', {
        class: 'cart-items-wrap'
      });
      var $totalPrice = $('<div/>', {
        class: 'cart-price'
      });
      var $buttonsBox = $('<div/>', {
        class: 'cart-buttons-box'
      });
      $cartItemsDiv.appendTo($(this.container));
      $totalPrice.append($("<p>TOTAL</p>"));
      $totalPrice.append($("<p class=\"sum-price\"></p>"));
      $totalPrice.appendTo($(this.container));
      $buttonsBox.append($("<a class=\"button-site checkout-button\" href=\"checkout.html\">Checkout</a>"));
      $buttonsBox.append($("<a class=\"drop-cart-button\" href=\"shopping-cart.html\">Go to cart</a>"));
      $buttonsBox.appendTo($(this.container));
    }
  }, {
    key: "_renderBig",
    value: function _renderBig() {
      var _this = this;

      var $cartColumnsDiv = $('.cart-columns');
      var $cartColumnDetail = $('<div/>', {
        class: 'cart-columns__details'
      });
      var $delBtn = $('<a/>', {
        class: 'cart-button cart-buttons__button delAllBtn',
        href: '#'
      });
      $delBtn.text('cLEAR SHOPPING CART');
      $delBtn.on('click', function () {
        return _this._removeAll();
      });
      $('.cart-buttons').prepend($delBtn);
      $cartColumnDetail.append($("<h3 class=\"cart-columns__details__h\">Product Detailsh</h3>"));
      $cartColumnsDiv.append($cartColumnDetail);
      $cartColumnsDiv.append($("<h3 class=\"cart-columns__h\">unite Price</h3>"));
      $cartColumnsDiv.append($("<h3 class=\"cart-columns__h\">Quantity\t</h3>"));
      $cartColumnsDiv.append($("<h3 class=\"cart-columns__h\">shipping\t</h3>"));
      $cartColumnsDiv.append($("<h3 class=\"cart-columns__h\">Subtotal</h3>"));
      $cartColumnsDiv.append($("<h3 class=\"cart-columns__h\">ACTION</h3>"));
    }
  }, {
    key: "_init",
    value: function _init(source) {
      var _this2 = this;

      this.isBigCart ? this._renderBig() : this._render();

      if (!localStorage.getItem('mycart')) {
        fetch(source).then(function (result) {
          return result.json();
        }).then(function (data) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var product = _step.value;

              _this2.cartItems.push(product);

              _this2.isBigCart ? _this2._renderBigItem(product) : _this2._renderItem(product);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          _this2.countGoods = data.countGoods;
          _this2.amount = data.amount;
          localStorage.setItem('mycart', JSON.stringify(_this2.cartItems));
          localStorage.setItem('countGoods', _this2.countGoods);
          localStorage.setItem('amount', _this2.amount);

          _this2._renderSum();
        });
      } else {
        this.cartItems = JSON.parse(localStorage.getItem('mycart'));
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.cartItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var product = _step2.value;
            this.isBigCart ? this._renderBigItem(product) : this._renderItem(product);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
        this.amount = JSON.parse(localStorage.getItem('amount'));

        this._renderSum();
      }
    }
  }, {
    key: "_renderSum",
    value: function _renderSum() {
      //$('.sum-amount').text(`Всего товаров в корзине: ${this.countGoods}`);
      $('.sum-price').text("$".concat(this.amount));

      if (this.countGoods === 0) {
        $(this.container).prepend($("<p class=\"emptyCart\"> Your cart is empty.</p>"));
        this.isBigCart ? $('.delAllBtn').hide() : $('.cart-buttons-box').hide();
        this.isBigCart ? $('.cart-buttons-box').hide() : $('.cart-price').hide();
      }
    }
  }, {
    key: "_renderItem",
    value: function _renderItem(product) {
      var _this3 = this;

      var $container = $('<div/>', {
        class: 'cart-item-box'
      });
      var $itemContainer = $('<div/>', {
        class: 'cart-item-container'
      });
      var $itemLinkImg = $('<a/>', {
        class: 'single-page-link',
        href: 'single-page.html'
      });
      var $itemInfo = $('<div/>', {
        class: 'cart-product-info',
        'data-id': product.id_product
      });
      var $itemLinkName = $('<a/>', {
        class: 'single-page-link',
        href: 'single-page.html'
      });
      var $delButton = $('<a>', {
        class: 'cart-del-item',
        href: "#del_".concat(product.id_product),
        'data-id': product.id_product
      });
      $itemLinkImg.append($("<img class=\"cart-img\" src=\"".concat(product.min_img, "\" alt=\"product1\">")));
      $itemLinkImg.appendTo($itemContainer);
      $itemLinkName.append($("<h3>".concat(product.product_name, "</h3>")));
      $itemLinkName.appendTo($itemInfo);
      $itemInfo.append($("<i class=\"fas fa-star item-stars\"></i>"));
      $itemInfo.append($("<i class=\"fas fa-star item-stars\"></i>"));
      $itemInfo.append($("<i class=\"fas fa-star item-stars\"></i>"));
      $itemInfo.append($("<i class=\"fas fa-star item-stars\"></i>"));
      $itemInfo.append($("<i class=\"fas fa-star-half-alt item-stars\"></i>"));
      $itemInfo.append($("<p> <span class=\"product-quantity\">".concat(product.quantity, "</span> x \n                            <span class=\"product-price\">$").concat(product.price, "</span></p>")));
      $itemInfo.appendTo($itemContainer);
      $delButton.on('click', function (event) {
        return _this3._remove(event.target.parentNode);
      });
      $delButton.append($("<i class=\"fas fa-times-circle\"></i>"));
      $delButton.appendTo($itemContainer);
      $itemContainer.appendTo($container);
      $container.appendTo($('.cart-items-wrap'));
    }
  }, {
    key: "_renderBigItem",
    value: function _renderBigItem(product) {
      var _this4 = this;

      var $container = $('<div/>', {
        class: 'cart-product-details',
        "data-id": "".concat(product.id_product)
      });
      var $link = $('<a/>', {
        href: 'single-page.html'
      });
      var $details = $('<div/>', {
        class: 'cart-product-details__text-box'
      });
      var $form = $('<form/>', {
        class: 'cart-product-other__p'
      });
      var $input = $('<input/>', {
        class: "cart-product-other__input product-quantity",
        type: "number",
        "data-id": "".concat(product.id_product),
        min: 0,
        max: 99,
        onkeydown: 'return false',
        value: "".concat(product.quantity)
      });
      var $delBtnContainer = $('<div/>', {
        class: 'cart-product-other__p'
      });
      var $delBtn = $('<a/>', {
        href: "#del_".concat(product.id_product),
        "data-id": "".concat(product.id_product),
        class: 'cart-product-other__del'
      });
      $link.append($("<img src=\"".concat(product.min_img, "\" class=\"cart-product-details__img\" alt=\"shopping_cart_img\">")));
      $details.append($("<a href=\"single-page.html\" \n                          class=\"cart-product-details__link\">\n                          <h3 class=\"cart-product-details__h\">".concat(product.product_name, "</h3>\n                        </a>")));
      $details.append($("<p class=\"cart-product-details__p\">Color:\n                        <span class=\"cart-product-details__span\"> Red</span></p>"));
      $details.append($("<p class=\"cart-product-details__p\">Size:\n                        <span class=\"cart-product-details__span\"> Xll</span></p>"));
      $input.on('input', function (event) {
        var productId = +$(event.target).data('id');

        var find = _this4.cartItems.find(function (product) {
          return product.id_product === productId;
        });

        event.target.value > find.quantity && _this4.addProduct(event.target);
        event.target.value < find.quantity && _this4._remove(event.target);
      });
      $form.append($input);
      $delBtn.on('click', function (event) {
        return _this4._remove(event.target.parentNode);
      });
      $delBtn.append($("<i class=\"fas fa-times-circle\"></i>"));
      $delBtnContainer.append($delBtn);
      $container.append($link);
      $container.append($details);
      $container.append($("<p class=\"cart-product-other__p product-price\">$".concat(product.price, "</p>")));
      $container.append($form);
      $container.append($("<p class=\"cart-product-other__p\">FREE</p>"));
      $container.append($("<p class=\"cart-product-other__p product-sum\">$".concat(product.quantity * product.price, "</p>")));
      $container.append($delBtnContainer);
      $container.appendTo($(this.container));
    }
  }, {
    key: "_updateCart",
    value: function _updateCart(product) {
      var $container = $("div[data-id=\"".concat(product.id_product, "\"]"));
      $container.find('.product-price').text("$".concat(product.price));
      this.isBigCart && $container.find('.product-sum').text("$".concat(product.price * product.quantity));
      this.isBigCart ? $container.find('.product-quantity').val(product.quantity) : $container.find('.product-quantity').text(product.quantity);
    }
  }, {
    key: "addProduct",
    value: function addProduct(element) {
      var productId = +$(element).data('id');
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });

      if (find) {
        find.quantity++;
        this.countGoods++;
        this.amount += find.price;

        this._updateCart(find);
      } else {
        var product = {
          id_product: productId,
          price: +$(element).data('price'),
          product_name: $(element).data('title'),
          min_img: $(element).data('img'),
          quantity: 1
        };

        if (this.countGoods === 0) {
          $(".emptyCart").remove();
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
  }, {
    key: "_remove",
    value: function _remove(element) {
      var productId = $(element).data('id');
      var find = this.cartItems.find(function (product) {
        return product.id_product === productId;
      });

      if (find) {
        find.quantity--;
        this.countGoods--;
        this.amount -= find.price;

        if (find.quantity === 0) {
          element.parentNode.parentNode.remove();
          var findIndex = this.cartItems.findIndex(function (product) {
            return product.id_product === productId;
          });
          this.cartItems.splice(findIndex, 1);
        } else this._updateCart(find);
      } else {
        console.log('error');
      }

      localStorage.setItem('mycart', JSON.stringify(this.cartItems));
      localStorage.setItem('countGoods', this.countGoods);
      localStorage.setItem('amount', this.amount);

      this._renderSum();
    }
  }, {
    key: "_removeAll",
    value: function _removeAll() {
      $(this.container).html("");
      this.countGoods = 0;
      this.amount = 0;
      this.cartItems = [];
      localStorage.removeItem('mycart');
      localStorage.removeItem('countGoods');
      localStorage.removeItem('amount');

      this._renderSum();
    }
  }]);

  return Cart;
}();