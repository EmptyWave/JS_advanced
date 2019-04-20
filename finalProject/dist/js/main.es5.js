"use strict";

$(document).ready(function () {
  var settings = {
    productsCountOnPage: {
      "": 8,
      index: 8,
      product: 9,
      "single-page": 4
    },
    productsContainerOnPge: {
      "": '.items-list',
      index: '.items-list',
      product: '.items-container',
      "single-page": '.items-list'
    },
    cartContainers: {
      "": '.cart-list-container',
      index: '.cart-list-container',
      product: '.cart-list-container',
      "single-page": '.cart-list-container',
      "shopping-cart": '.cart-product-box'
    },
    sources: {
      items: 'getProduct.json',
      cart: 'getCart.json'
    },
    gallery: {
      classContainer: '.single-product-slider'
    }
  };
  var products = [];
  var pageName = window.location.pathname.split("/").pop().split(".").shift();
  var productCountOnPage = settings.productsCountOnPage[pageName];
  var productsContainerOnPge = settings.productsContainerOnPge[pageName];
  var cartContainerOnPge = settings.cartContainers[pageName]; // Корзина

  var cart = new Cart(settings.sources.cart, cartContainerOnPge, pageName === "shopping-cart");

  if (pageName === "single-page") {
    var productInit = JSON.parse(localStorage.getItem('singleProduct'));
    products.push(new Product(productInit.id, productInit.title, productInit.price, productInit.container, productInit.img, productInit.min_img, true));
    var imgsToGallery = [productInit.img, productInit.img, productInit.img];
    var gallery = new myNewGallery(settings.gallery.classContainer, imgsToGallery);
  }

  if (productCountOnPage !== 0) {
    fetch(settings.sources.items).then(function (result) {
      return result.json();
    }).then(function (data) {
      for (var i = 0; i < productCountOnPage; i++) {
        products.push(new Product(data[i].id_product, data[i].product_name, data[i].price, productsContainerOnPge, data[i].img, data[i].min_img));
      } // Добавление товара в корзину


      $('.buyBtn').click(function (e) {
        cart.addProduct(e.target);
      });
    });
  }
});