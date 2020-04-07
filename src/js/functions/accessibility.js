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

function handleUpButton() {
  const upButton = document.querySelector('.up-button');
  
  function checkButton() {
    const main = document.querySelector('.main');
    const navigation = document.querySelector('.navigation');
    const navigationHeight = navigation.offsetHeight;
    const windowScrolledY = window.scrollY;
    const mainTop = main.offsetTop;
  
    if (windowScrolledY >= mainTop - navigationHeight) {
      upButton.classList.add('active');
      upButton.firstChild.setAttribute('tabindex', '0');
    } else {
      upButton.classList.remove('active');
      upButton.firstChild.setAttribute('tabindex', '1');
    };
  };
  
  window.addEventListener('scroll', debounce(checkButton));
  
  upButton.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior:'smooth'})
  });
}

function handleEnter() {
  document.onkeydown = function(e) {
    if(e.keyCode === 13) {
      document.activeElement.click();
    }
  };
}

export { handleUpButton, handleEnter };