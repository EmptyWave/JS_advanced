$(document).ready(() => {

  const settings = {
    productsCountOnPage: {
      "": 8,
      index: 8,
      product: 9,
      "single-page": 4,
    },
    productsContainerOnPge: {
      "": '.items-list',
      index: '.items-list',
      product: '.items-container',
      "single-page": '.items-list',
    },
    cartContainers: {
      "": '.cart-list-container',
      index: '.cart-list-container',
      product: '.cart-list-container',
      "single-page": '.cart-list-container',
      "shopping-cart": '.cart-product-box',
    },
    sources: {
      items: 'getProduct.json',
      cart: 'getCart.json',
    },
    gallery: {
      classContainer: '.single-product-slider'
    },
  };

  const products = [];
  const pageName = window.location.pathname.split("/").pop().split(".").shift();
  const productCountOnPage = settings.productsCountOnPage[pageName];
  const productsContainerOnPge = settings.productsContainerOnPge[pageName];
  const cartContainerOnPge = settings.cartContainers[pageName];

  // Корзина
  let cart = new Cart(settings.sources.cart, cartContainerOnPge, pageName === "shopping-cart");

  if  (pageName === "single-page"){
    let productInit = JSON.parse(localStorage.getItem('singleProduct'));
    products.push(
      new Product(
        productInit.id,
        productInit.title,
        productInit.price,
        productInit.container,
        productInit.img,
        productInit.min_img,
        true,
      ));
    let imgNum = +productInit.img.split("_").pop().split(".").shift();
    const imgsToGallery = [
      productInit.img,
      productInit.img
        .replace(
          /\d/,
          imgNum === 1 ? 8 : imgNum-1
        ),
      productInit
        .img.replace(
          /\d/,
        imgNum === 8 ? 0 : imgNum+1
      )
    ]
    const gallery = new myNewGallery(settings.gallery.classContainer, imgsToGallery)
  }

  if (productCountOnPage !== 0) {
    fetch(settings.sources.items)
      .then(result => result.json())
      .then(data => {
        for (let i = 0; i < productCountOnPage; i++) {
          products
            .push(
              new Product(
                data[i].id_product,
                data[i].product_name,
                data[i].price,
                productsContainerOnPge,
                data[i].img,
                data[i].min_img
              )
            );
        }
        // Добавление товара в корзину
        $('.buyBtn').click(e => {
          cart.addProduct(e.target);
        });
        $('.product__img-box').click(e => {
          //e.preventDefault();
          let productId = $(e.target).data('id');
          let find = products.find(product => product.id === productId);
          localStorage.setItem('singleProduct', JSON.stringify(find));
        });
      });
  }

});