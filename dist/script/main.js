const navigationButton = document.querySelector('.navigation__button');
const navigationButtonBurger = document.querySelector('.navigation__button--burger');
const navigationLinks = document.querySelector('.navigation__links');
const navigationLinkNode = document.querySelectorAll('.navigation__link');

navigationButton.addEventListener('click', function() {
  navigationButtonBurger.classList.toggle('activated');
  navigationLinkNode.forEach(link => link.classList.toggle('open'));
  navigationLinks.classList.toggle('open');
});

// upButton
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

  // Check when to show/hide the upButton.
  function checkButton(e) {
    const main = document.querySelector('.main');
    const navigation = document.querySelector('.navigation');
    const navigationHeight = navigation.offsetHeight;
    const mainTop = main.offsetTop;
    const windowScrolledY = window.scrollY;
    if (windowScrolledY >= mainTop - navigationHeight) {
      upButton.classList.add('active');
      upButton.firstChild.setAttribute('tabindex', '0');
    } else {
      upButton.classList.remove('active');
      upButton.firstChild.setAttribute('tabindex', '1');
    };
  };

  window.addEventListener('scroll', debounce(checkButton));

  // Go up when the upButton is clicked.
  upButton.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior:'smooth'})
  });

// Show an information about unavailability of social media.
const socialMediaButtons = document.querySelectorAll('.social-media__button--image');

socialMediaButtons.forEach(buttonId => buttonId.addEventListener('click', function() {
  let buttonId = this.getAttribute('data-buttonId');
  let buttonIdCapitalized = buttonId.charAt(0).toUpperCase() + buttonId.slice(1);
  alert(buttonIdCapitalized + ' is not available right now.');
}));

// Allow to trigger elements by press the Enter/Return key
document.onkeydown = function(e) {
  if(e.keyCode === 13) {
    document.activeElement.click();
  }
};