'use strict';

// import { runSlider } from './functions/slider.js';

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

// Go up when the upButton is clicked.
upButton.addEventListener('click', function() {
  window.scrollTo({top: 0, behavior:'smooth'})
});

// Show an information about unavailability of social media.
const socialMediaButtons = document.querySelectorAll('.social-media__button--image');

function socialMediaInfo() {
  let buttonId = this.getAttribute('data-buttonId');
  let buttonIdCapitalized = buttonId.charAt(0).toUpperCase() + buttonId.slice(1);
  alert(buttonIdCapitalized + ' is not available right now.');
}

socialMediaButtons.forEach(buttonId => buttonId.addEventListener('click', socialMediaInfo));

// Allow to trigger elements by press the Enter/Return key
document.onkeydown = function(e) {
  if(e.keyCode === 13) {
    document.activeElement.click();
  }
};

function runSlider(interval, pause) {

  const slider = document.querySelector('.header__slider');
  const slides = slider.querySelectorAll('.header__slide');
  const sliderDots = document.querySelectorAll('.slider__dot');
  const sliderButtonRight = document.querySelector('.slider__button--next');
  const sliderButtonLeft = document.querySelector('.slider__button--previous');
    
  const activeDot = 'slider__dot--active';
  const nextSlide = 'header__slide--next';
  const activeSlide = 'header__slide--active';

  function getCurrentSlide() {
    let currentSlide;
    slides.forEach((slide, index) => {
      (slide.classList.contains(activeSlide)) ? currentSlide = index : index;
    });
    return currentSlide;
  }

  function makeMove(newActive, newNext) {
    slides.forEach(slide => slide.classList.remove(nextSlide, activeSlide));
    sliderDots.forEach(dot => dot.classList.remove(activeDot));
  
    slides[newNext].classList.add(nextSlide);
    slides[newActive].classList.add(activeSlide);
    sliderDots[newActive].classList.add(activeDot);
  }

  function moveSliderLeft() {
    const currentSlide = getCurrentSlide();
    (currentSlide - 1 < 0) ? 
      makeMove(slides.length - 1, 0) : 
      makeMove(currentSlide - 1, currentSlide);
  }

  function moveSliderRight() {
    const currentSlide = getCurrentSlide();
    if (currentSlide + 1 === slides.length) {
      makeMove(0, 1);
    } else if (currentSlide + 2 === slides.length) {
      makeMove(currentSlide + 1, 0);
    } else {
      makeMove(currentSlide + 1, currentSlide + 2);
    }
  }

  function stopSlider() {
    clearInterval(interval);
  }
    
  function startSlider() {
    interval = setInterval(moveSliderRight, pause);
  }
     
  slider.addEventListener('mouseover', stopSlider);
  slider.addEventListener('mouseleave', startSlider);
  sliderButtonLeft.addEventListener('click', moveSliderLeft);
  sliderButtonRight.addEventListener('click', moveSliderRight);

  startSlider();
};

runSlider(0, 10000);