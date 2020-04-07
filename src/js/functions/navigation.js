function handleNav() {
  const navigationButton = document.querySelector('.navigation__button');
  const navigationButtonBurger = navigationButton.querySelector('.navigation__button--burger');
  const navigationLinks = document.querySelector('.navigation__links');
  const navigationLinkNode = navigationLinks.querySelectorAll('.navigation__link');
  
  function toggleMenu() {
    navigationButtonBurger.classList.toggle('activated');
    navigationLinkNode.forEach(link => link.classList.toggle('open'));
    navigationLinks.classList.toggle('open');
  }
  
  navigationButton.addEventListener('click', toggleMenu);
}

export { handleNav };