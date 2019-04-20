class Product {
    constructor(id, title, price, container = '#products', img = 'https://placehold.it/263x284',
                 product_img = 'https://placehold.it/72x85', isSingleProduct = false){
      this.id = id;
      this.title = title;
      this.price = price;
      this.container = container;
      this.img = img;
      this.min_img = product_img;
      this.isSingleProduct = isSingleProduct;
      this._init();
    }
    _init(){
      this.isSingleProduct ? this._renderSingle() : this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'item-container item-hide-container'
        });
        let $imgBox = $('<div/>', {
          class: 'product__img-box',
          'data-id': this.id,
        });
        let $img = $('<img/>', {
            src: this.img,
            alt: this.title,
          'data-id': this.id,
        });
      let $buyBtn = $('<a/>', {
        class: 'product__cart-box-text buyBtn',
        href: `#add_${this.id}`,
        'data-id': this.id,
        'data-price': this.price,
        'data-title': this.title,
        'data-img': this.min_img
      });
        let $name = $('<p/>', {
            class: 'item-name',
            text: this.title
        });
        let $price = $(`<p class="item-price">$${this.price}</p>`);

        // Создаем структуру товара (верстку)
        $img.appendTo($imgBox);
        $imgBox.append($(`<a href="single-page.html" class="product__hide-box" data-id="${this.id}" ></a>`));
        //$imgBox.on('click', localStorage.setItem('singleProduct', JSON.stringify(this)));
        $buyBtn.html(`<i class="fas fa-shopping-cart"></i> Add to Cart`);
        $buyBtn.appendTo($imgBox);
        $imgBox.appendTo($wrapper);
        $name.appendTo($wrapper);
        $price.appendTo($wrapper);

        $(this.container).append($wrapper);
    }
    _renderSingle(){
      $('.price').text(`$${this.price}`);
      $('.product-menu-container-h3').text(`${this.title}`);
      let $discription = $('.product-menu-text-container');
      $discription.append($(`<p class="product-menu-container-text">Compellingly actualize fully researched processes before
                        proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge
                        services. Completely visualize parallel core competencies rather than exceptional portals. </p>`));
      let $formContainer = $('.product-tech-menu');
      $formContainer.append($(`<div class="product-tech-menu-form">
                        <p>CHOOSE COLOR</p>
                        <p><select class=" selected-color">
                            <option class="green" value="Green">&#xf0c8 Green</option>
                            <option class="blue" value="Blue">&#xf0c8 Blue</option>
                            <option class="red" value="Red" selected>&#xf0c8 Red</option>
                            <option class="yellow" value="Yellow">&#xf0c8 Yellow</option>
                            <option class="black" value="Black">&#xf0c8 Black</option>
                            <option class="orange" value="Orange">&#xf0c8 Orange</option>
                        </select></p>
                    </div>
                    <div class="product-tech-menu-form">
                        <p>CHOOSE SIZE</p>
                        <p><select class="product-tech-menu-select">
                            <option value="size1">XS</option>
                            <option value="size2">S</option>
                            <option value="size3" selected>M</option>
                            <option value="size4">L</option>
                            <option value="size5">XL</option>
                            <option value="size6">XXL</option>
                        </select></p>
                    </div>
                    <div class="product-tech-menu-form">
                        <p>QUANTITY</p>
                        <p><select class="product-tech-menu-select">
                            <option value="quantity1">1</option>
                            <option value="quantity2">2</option>
                            <option value="quantity3" selected>3</option>
                            <option value="quantity4">4</option>
                            <option value="quantity5">5</option>
                            <option value="quantity6">6</option>
                        </select></p>
                    </div>`));
      let $addBtn = $('<a/>', {
        class: 'button-site single-add-to-cart buyBtn',
        href: `#add_${this.id}`,
        'data-id': this.id,
        'data-price': this.price,
        'data-title': this.title,
        'data-img': this.min_img
      });
      $addBtn.append($(`<i class="fas fa-shopping-cart"></i>`));
      $addBtn.append(` Add to Cart`);
      $addBtn.appendTo($('.product-menu-container'));

    }
}