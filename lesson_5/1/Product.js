class Product {
    constructor(id, title, price, img = 'https://placehold.it/263x284',
                container = '#products', product_img = 'https://placehold.it/72x85'){
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
        this.container = container;
        this.product_img = product_img;
        this._render();
    }
    _render(){
        let $wrapper = $('<div/>', {
            class: 'item-container item-hide-container'
        });
        let $imgBox = $('<div/>', {
          class: 'product__img-box'
        });
        let $img = $('<img/>', {
            src: this.img,
            alt: this.title
        });
      let $buyBtn = $('<a/>', {
        class: 'product__cart-box-text buyBtn',
        href: `#add_${this.id}`,
        'data-id': this.id,
        'data-price': this.price,
        'data-title': this.title,
        'data-img': this.product_img
      });
        let $name = $('<p/>', {
            class: 'item-name',
            text: this.title
        });
        let $price = $(`<p class="item-price">$${this.price}</p>`);

        // Создаем структуру товара (верстку)
        $img.appendTo($imgBox);
        $imgBox.append($(`<a href="single-page.html" class="product__hide-box"></a>`));
        $buyBtn.html(`<i class="fas fa-shopping-cart"></i> Add to Cart`);
        $buyBtn.appendTo($imgBox);
        $imgBox.appendTo($wrapper);
        $name.appendTo($wrapper);
        $price.appendTo($wrapper);

        $(this.container).append($wrapper);
    }
}