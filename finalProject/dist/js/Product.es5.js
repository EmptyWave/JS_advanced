"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Product =
/*#__PURE__*/
function () {
  function Product(id, title, price) {
    var container = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#products';
    var img = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'https://placehold.it/263x284';
    var product_img = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'https://placehold.it/72x85';
    var isSingleProduct = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

    _classCallCheck(this, Product);

    this.id = id;
    this.title = title;
    this.price = price;
    this.container = container;
    this.img = img;
    this.min_img = product_img;
    this.isSingleProduct = isSingleProduct;

    this._init();
  }

  _createClass(Product, [{
    key: "_init",
    value: function _init() {
      this.isSingleProduct ? this._renderSingle() : this._render();
    }
  }, {
    key: "_render",
    value: function _render() {
      var $wrapper = $('<div/>', {
        class: 'item-container item-hide-container'
      });
      var $imgBox = $('<div/>', {
        class: 'product__img-box'
      });
      var $img = $('<img/>', {
        src: this.img,
        alt: this.title
      });
      var $buyBtn = $('<a/>', {
        class: 'product__cart-box-text buyBtn',
        href: "#add_".concat(this.id),
        'data-id': this.id,
        'data-price': this.price,
        'data-title': this.title,
        'data-img': this.min_img
      });
      var $name = $('<p/>', {
        class: 'item-name',
        text: this.title
      });
      var $price = $("<p class=\"item-price\">$".concat(this.price, "</p>")); // Создаем структуру товара (верстку)

      $img.appendTo($imgBox);
      $imgBox.append($("<a href=\"single-page.html\" class=\"product__hide-box\"></a>"));
      $imgBox.on('click', localStorage.setItem('singleProduct', JSON.stringify(this)));
      $buyBtn.html("<i class=\"fas fa-shopping-cart\"></i> Add to Cart");
      $buyBtn.appendTo($imgBox);
      $imgBox.appendTo($wrapper);
      $name.appendTo($wrapper);
      $price.appendTo($wrapper);
      $(this.container).append($wrapper);
    }
  }, {
    key: "_renderSingle",
    value: function _renderSingle() {
      $('.price').text("$".concat(this.price));
      $('.product-menu-container-h3').text("".concat(this.title));
    }
  }]);

  return Product;
}();