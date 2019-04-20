$(document).ready(() => {

  const settings = {
    productsOnPage: {
      index: 4,
      product: 9,
      "single-page": 4,
    }
  };
  // Товары
  const products = [];
  const pageName = window.location.pathname.split("/").pop().split(".").shift();
  const productCountPage = settings.productsOnPage[pageName];

  // Корзина
  let cart = new Cart('getCart.json');

  fetch('getProduct.json')
    .then(result => result.json())
    .then(data => {
      for (let i = 0; i < productCountPage; i++) {
        products
          .push(
            new Product(
              data[i].id_product,
              data[i].product_name,
              data[i].price,
              ''
              /*product.img,
              product.min_img*/
            )
          );
      }
      // Добавление товара в корзину
      $('.buyBtn').click(e => {
        cart.addProduct(e.target);
      });
    });


});