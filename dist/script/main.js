const navigationButton = document.querySelector('.navigation__button');
const navigationButtonBurger = document.querySelector('.navigation__button--burger');
const navigationLinks = document.querySelector('.navigation__links');
const navigationLinkNode = document.querySelectorAll('.navigation__link');

navigationButton.addEventListener('click', function() {
  navigationButtonBurger.classList.toggle('activated');
  navigationLinkNode.forEach(link => link.classList.toggle('open'));
  navigationLinks.classList.toggle('open');
});


const upButton = document.querySelector('.up-button');

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkButton(e) {
  const main = document.querySelector('.main');
  const mainTop = main.offsetTop;
  const windowScrolledY = window.scrollY;
  if (windowScrolledY > mainTop) {
    upButton.classList.add('active');
  } else {
    upButton.classList.remove('active');
  };
};

window.addEventListener('scroll', debounce(checkButton));

upButton.addEventListener('click', function() {
  window.scrollTo({top: 0, behavior:'smooth'})
});