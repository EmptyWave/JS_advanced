class myNewGallery {
  constructor(container,imgs){
    this.container = container;
    this.imgs = imgs;
    this._init();
  }

  /**
   * Инициализирует галерею, ставит обработчик события.
   */
  _init() {
    this._createScreenContainer();
  }


  /**
   * Обработчик события клика для перехода к предыдущему изображению
   */
  prevImageClickHandler() {
    let $element = $('.single-product-slider__slide__prev');
    let index = $element.data('index');
    let $container = $(this.container);
    $container.find('img').attr('src',this.imgs[index]);
    index-1 < 0 ? index = this.imgs.length-1 : index--;
    $element.attr('data-index', index);
    $element.data('index', index);

    $element = $('.single-product-slider__slide__next');
    index = $element.data('index');
    index-1 < 0 ? index = this.imgs.length-1 : index--;
    $element.attr('data-index', index);
    $element.data('index', index);
  }

  /**
   * Обработчик события клика для перехода к следующему изображению
   */
  nextImageClickHandler() {
    let $element = $('.single-product-slider__slide__next');
    let index = $element.data('index');
    let $container = $(this.container);
    $container.find('img').attr('src',this.imgs[index]);
    index+1 === this.imgs.length ? index = 0 : index++;
    $element.attr('data-index', index);
    $element.data('index', index);

    $element = $('.single-product-slider__slide__prev');
    index = $element.data('index');
    index+1 === this.imgs.length ? index = 0 : index++;
    $element.attr('data-index', index);
    $element.data('index', index);
  }


  /**
   * Проверка наличия открываемого фала
   * @return {boolean} true - если файл существует, false - если файла не существует
   */
  imageExist(urlToFile) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    return xhr.status != "404";
  }

  _createScreenContainer() {
    let $container = $(this.container);
    let $prevImgBtn = $('<a/>', {
      class: 'arrow-singl-img single-product-slider__slide__prev',
      href: '#prevImg',
      'data-index': this.imgs.length-1,
    });
    $prevImgBtn.append($(`<i class="fas fa-angle-left"></i>`));
    $prevImgBtn.on('click', () => this.prevImageClickHandler());
    $container.append($prevImgBtn);
    let $nextImgBtn = $('<a/>', {
        class: 'arrow-singl-img single-product-slider__slide__next',
        href: '#nextImg',
        'data-index': 1,
    });
    $nextImgBtn.append($(`<i class="fas fa-angle-right"></i>`));
    $nextImgBtn.on('click', () => this.nextImageClickHandler());
    $container.append($nextImgBtn);
    let $img = $('<img/>',{
      src: this.imgs[0],
      alt: 'productImg'
    });
    $container.append($img);

  }
}