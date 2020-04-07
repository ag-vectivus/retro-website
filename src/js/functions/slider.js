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

export { runSlider };