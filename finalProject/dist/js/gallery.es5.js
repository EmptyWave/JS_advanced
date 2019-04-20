"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var myNewGallery =
/*#__PURE__*/
function () {
  function myNewGallery(container, imgs) {
    _classCallCheck(this, myNewGallery);

    this.container = container;
    this.imgs = imgs;

    this._init();
  }
  /**
   * Инициализирует галерею, ставит обработчик события.
   */


  _createClass(myNewGallery, [{
    key: "_init",
    value: function _init() {
      this._createScreenContainer();
    }
    /**
     * Обработчик события клика для перехода к предыдущему изображению
     */

  }, {
    key: "prevImageClickHandler",
    value: function prevImageClickHandler() {
      if (this.activeBigImage.previousElementSibling != null) {
        if (this.imageExist(this.activeBigImage.previousElementSibling.dataset.full_image_url)) {
          this.openImage(this.activeBigImage.previousElementSibling.dataset.full_image_url);
        } else {
          this.openImage(this.settings.openedImageErr404);
        }

        this.activeBigImage = this.activeBigImage.previousElementSibling;
      }
    }
    /**
     * Обработчик события клика для перехода к следующему изображению
     */

  }, {
    key: "nextImageClickHandler",
    value: function nextImageClickHandler() {
      var $element = $('.single-product-slider__slide__next');
      var index = $element.data('index');
      var srcNext = $element.data('next');
      index + 1 === this.imgs.length ? index = 0 : index++;
      $element.attr('data-index', index);
      $element.attr('data-next', this.imgs[index]);
      var $container = $(this.container);
      $container.find('img').attr('src', srcNext);
    }
    /**
     * Проверка наличия открываемого фала
     * @return {boolean} true - если файл существует, false - если файла не существует
     */

  }, {
    key: "imageExist",
    value: function imageExist(urlToFile) {
      var xhr = new XMLHttpRequest();
      xhr.open('HEAD', urlToFile, false);
      xhr.send();
      return xhr.status != "404";
    }
  }, {
    key: "_createScreenContainer",
    value: function _createScreenContainer() {
      var _this = this;

      var $container = $(this.container);
      var $prevImgBtn = $('<a/>', {
        class: 'arrow-singl-img single-product-slider__slide__prev',
        href: '#prevImg',
        'data-index': this.imgs.length - 1,
        'data-prev': this.imgs[this.imgs.length - 1]
      });
      $prevImgBtn.append($("<i class=\"fas fa-angle-left\"></i>"));
      $prevImgBtn.on('click', function () {
        return _this.prevImageClickHandler();
      });
      $container.append($prevImgBtn);
      var $nextImgBtn = $('<a/>', {
        class: 'arrow-singl-img single-product-slider__slide__next',
        href: '#nextImg',
        'data-index': 1,
        'data-next': this.imgs[1]
      });
      $nextImgBtn.append($("<i class=\"fas fa-angle-right\"></i>"));
      $nextImgBtn.on('click', function () {
        return _this.nextImageClickHandler();
      });
      $container.append($nextImgBtn);
      var $img = $('<img/>', {
        src: this.imgs[0],
        alt: 'productImg'
      });
      $container.append($img);
    }
  }]);

  return myNewGallery;
}();