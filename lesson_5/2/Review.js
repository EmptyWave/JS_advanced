class Reviews {
  constructor(settings, source) {
    this.settings = settings;
    this.checkReviewContainer = `.${this.settings.checkReviewContainerClass}`;
    this.listReviewContainer = `.${this.settings.listReviewContainerClass}`;
    this.reviews = [];
    this.reviewCount = null;
    this._init(source);
  }
  _init(source) {
    fetch(source)
      .then(result => result.json())
      .then(data => {
        this.reviewCount = data[data.length - 1].id; //предпологается что отзывы расположены по порядку
        for (let review of data) {
          //this.reviews.push(review);
          this._update(review);
        }});
    $(`.${this.settings.addReviewBtnClass}`).click((e) => {
      e.preventDefault();
      if ($('#author')[0].value !== "" && $('#review')[0].value !== ""){
        this._addReview($('#author')[0].value,$('#review')[0].value);
        $('#author')[0].value = "";
        $('#review')[0].value = "";
      } else{
        alert('Error, something went wrong!');
      }
    })
  }
  /*_render(reviews = this.reviews) {
    for (let review of reviews) {

    }
  }*/
  _addReview(author, text) {
      let review = {
        id: ++this.reviewCount,
        author: author,
        text: text,
        isApproved: false
      };
      //this.reviews.push(review);
      this._update(review);
  }

  _remove(el) {
    let reviewId = +$(el).data('id');
    let findIndex = this.reviews.findIndex(review => review.id === reviewId);
    this.reviews.splice(findIndex,1);
    el.parentNode.remove();
    console.log(this.reviews);
  }
  _setApprove(el) {
    let reviewId = +$(el).data('id');
    let find = this.reviews.find(review => review.id === reviewId);
    if (find) {
      find.isApproved = true;
      this._remove(el.parentNode);
      this._update(find);

    } else {
      alert('Error, something went wrong!')
    }
  }
  _update(review) {
    this.reviews.push(review);
    let $container = review.isApproved ?
      $('<div/>', {class: 'review', 'data-id': review.id}):
      $('<div/>', {class: 'review-check-box', 'data-id': review.id});
    let $btn = '';
    if (review.isApproved) {
      let $deleteButton = $('<button>', {
        type: 'button',
        class: `btn btn-danger my-btn ${this.settings.denialReviewBtnClass}`,
        text: 'Удалить',
        'data-id': review.id,
      });
      $deleteButton.click((e)=> {this._remove(e.target)});
      $btn = $deleteButton;
    } else {
      let $succesButton = $('<button>', {
        type: 'button',
        class: `btn btn-success my-btn ${this.settings.successReviewBtnClass}`,
        text: 'Подтвердить',
        'data-id': review.id,
      });
      let $denialButton = $('<button>', {
        type: 'button',
        class: `btn btn-danger my-btn ${this.settings.denialReviewBtnClass}`,
        text: 'Отказать',
        'data-id': review.id,
      });
      $btn = $('<div/>', {class:'form-row btn-row','data-id': review.id,});
      $succesButton.click((e)=> {this._setApprove(e.target)});
      $denialButton.click((e)=> {this._remove(e.target.parentNode)});
      $btn.append($succesButton);
      $btn.append($denialButton);
    }
    $container.append($(`<h5>${review.author}</h5>`));
    $container.append($(`<p>${review.text}</p>`));
    $container.append($btn);
    review.isApproved ? $container.appendTo($(this.listReviewContainer)) :
      $container.appendTo($(this.checkReviewContainer));
  }
}