let currentSection = 1;
let sections;

$('document').ready(function () {
  setCurrentSection();
  $('.navigation').click(function () {
    if (this.id == "nav-left") {
      if (currentSection != 1) {
        scrollToSection(currentSection - 1);
        $('#nav-left').prop('disabled', true);
      }
    }
    else  {
      if (currentSection+1 <= sections) {
        scrollToSection(currentSection + 1);
        $('#nav-right').prop('disabled', true);
      }
    }
  });
  $('.navigation').on('mouseover', function() {
    if (this.id == 'nav-left') {
      if (currentSection != 1) $(this).addClass('navigation__hover');
    } else {
      if (currentSection+1 <= sections) $(this).addClass('navigation__hover');
    }
  }).on('mouseout', function () {
    $(this).removeClass('navigation__hover');
  });
});

function setCurrentSection() {
  let carouselWidth = $('.carousel').width();
  let projectWidth = $('.slide').width() + parseInt($('.slide').css('margin-right').replace('px',''));
  let projectsQtt = $('.slide').size();
  let projectsPerSection = carouselWidth / projectWidth;
  sections = Math.round(projectsQtt / projectsPerSection);
  let rollLeft = Math.abs(parseInt($('.list').css('left').replace('px','')));
  if (rollLeft == 0) currentSection = 1;
  else {
    currentSection = Math.round((rollLeft / carouselWidth) + 1);
  }
  $('#nav-left').prop('disabled', false);
  $('#nav-left').removeClass('navigation__hover');
  $('#nav-right').prop('disabled', false);
  $('#nav-right').removeClass('navigation__hover');
}

function scrollToSection(section) {
  let width = $('.carousel').width() * (Math.abs(currentSection - section));
  if (section < currentSection) {
    $('.list').animate({left: '+='+width}, "slow", setCurrentSection);
  } else {
    $('.list').animate({left: '-='+width}, "slow", setCurrentSection);
  }
}


