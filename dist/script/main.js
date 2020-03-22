const navigationButton = document.querySelector('.navigation__button');
const navigationButtonBurger = document.querySelector('.navigation__button--burger');
const navigationLinks = document.querySelector('.navigation__link-container');
const navigationLinkNode = document.querySelectorAll('.navigation__link');

navigationButton.addEventListener('click', function() {
  navigationButtonBurger.classList.toggle('activated');
  navigationLinkNode.forEach(link => link.classList.toggle('open'));
  navigationLinks.classList.toggle('open');
});