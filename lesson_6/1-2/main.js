"use strict";

const settings = {
  regExp: {
    name: /[a-zA-Zа-яА-ЯЁё]+$/,
    surname: /[a-zA-Zа-яА-ЯЁё]+$/,
    patronymic: /[a-zA-Zа-яА-ЯЁё]+$/,
    date: /.+/g,
    phone: /\+\d{1}\((\d{3})\)\d{3}\-\d{4}/,
    email: /\w+\S*(@)\w+(\.)\w+/,
    text: /.+/g,
    city: /.+/g,
  },
  errorClassName: 'input__err',
  errorClassAnimate: ['animated', 'shake'],
  successClassName: 'input__ok',
};

$(document).ready(() => {
  const inputs = {};
  $('input').each((index,item) => {
    inputs[item.name] = item;
    $(item).focus(()=> settings.errorClassAnimate.forEach(className => $(item).removeClass(className)));
  });
  $('#date')
    .datepicker({
      showOtherMonths: true,
      selectOtherMonths: true,})
    .datepicker($.datepicker.regional[ "ru" ]);
  let formValidator = new FormValidator(settings);
  $('.btn-primary').on('click', () => formValidator.check(inputs));
  const citySource = [];
  $.ajax({
    url: 'russiaCity.json',
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      for (let country of data){
        citySource.push(country.city);
      }
      $('.form-city').autocomplete({
        source: function(request, response) {
          let results = $.ui.autocomplete.filter(citySource, request.term);
          response(results.slice(0, 5));
        },
        minLength: 3,
        zIndex: 9999,
        delay: 500,
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
});