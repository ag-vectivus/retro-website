'use strict';

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

// Slider

(function() {
    let interval;
    const pause = 10000;

    const slides = document.querySelectorAll('.header__slide');
    const sliderDots = document.querySelectorAll('.slider__dot');
    const sliderButtonRight = document.querySelector('.slider__button--next');
    const sliderButtonLeft = document.querySelector('.slider__button--previous');
    
    const activeDot = 'slider__dot--active';
    const nextSlide = 'header__slide--next';
    const activeSlide = 'header__slide--active';

    function getCurrentSlide() {
      const currentSlide;
 /*      for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains(activeSlide)) {
         currentSlide = i;
        }
      } */
      slides.forEach((slide, index) => {
        if (slide.classList.contains(activeSlide)) {
          return currentSlide = index;
        }
      });
      /* });
      return currentSlide; */
    }
    console.log(getCurrentSlide());

    function moveSlide() {
      const currentSlide = getCurrentSlide();

      if (currentSlide + 1 === slides.length) {
        slides[0].classList.add(activeSlide);
        sliderDots[0].classList.add(activeDot);
        slides[currentSlide].classList.remove(activeSlide);
        sliderDots[currentSlide].classList.remove(activeDot);
        slides[0].classList.remove(nextSlide);
        slides[1].classList.add(nextSlide);
      } else {
        slides[currentSlide + 1].classList.add(activeSlide);
        sliderDots[currentSlide + 1].classList.add(activeDot);
        slides[currentSlide].classList.remove(activeSlide);
        sliderDots[currentSlide].classList.remove(activeDot);
        slides[currentSlide + 1].classList.remove(nextSlide);
        if (currentSlide + 2 !== slides.length) {
          slides[currentSlide + 2].classList.add(nextSlide);
        } else {
          slides[0].classList.add(nextSlide);
        }
      }
    };

    function stopSlider() {
      clearInterval(interval)
    };
    
    function startSlider() {
      interval = setInterval(moveSlide, pause);
    };  
     
    sliderButtonLeft.addEventListener('click', function() {
      const currentSlide = getCurrentSlide();

      if (currentSlide - 1 < 0) {
        slides[slides.length - 1].classList.add(activeSlide);
        sliderDots[slides.length - 1].classList.add(activeDot);
        slides[currentSlide].classList.remove(activeSlide);
        sliderDots[currentSlide].classList.remove(activeDot);
        slides[currentSlide + 1].classList.remove(nextSlide);
        slides[0].classList.add(nextSlide);
      } else {
        slides[currentSlide - 1].classList.add(activeSlide);
        sliderDots[currentSlide - 1].classList.add(activeDot);
        slides[currentSlide].classList.remove(activeSlide);
        sliderDots[currentSlide].classList.remove(activeDot);
        slides.forEach(slide => slide.classList.remove(nextSlide));
        slides[currentSlide].classList.add(nextSlide);
      }
    });
    sliderButtonRight.addEventListener('click', function() {
      moveSlide();
    });
    slides.addEventListener('mouseover', stopSlider);
    slides.addEventListener('mouseleave', startSlider);

    startSlider();
}());