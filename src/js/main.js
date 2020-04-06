'use strict';

import { handleNav } from './functions/navigation.js';
import { runSlider } from './functions/slider.js';
import { handleSocialMedia } from './functions/social-media.js';
import { handleUpButton, handleEnter } from './functions/accessibility.js';

function handlePortfolio() {
  const portfolioButton = document.querySelectorAll('.portfolio__filter--label');
  const portfolioPhoto = document.querySelectorAll('.portfolio__photo--img');
  const portfolioButtonAll = document.querySelector('.portfolio__caption');
  const portfolioBox = document.querySelectorAll('.portfolio__box');

  portfolioButton.forEach(button => button.addEventListener('click', function() {
    let buttonTag = this.getAttribute('data-tag');
    const choosenPhotos = [];

    portfolioPhoto.forEach((photo, index) => {
      let photoTag = photo.getAttribute('data-tag');
      if (photoTag === buttonTag) {
        choosenPhotos.push(index);
      }
    });

    portfolioBox.forEach(box => {
      box.classList.remove('portfolio__box--active');
    });

    for (let i = 0; i < choosenPhotos.length; i++) {
      portfolioBox[choosenPhotos[i]].classList.add('portfolio__box--active');
    };
  }));

  portfolioButtonAll.addEventListener('click', function() {

    let i = 0;
    portfolioBox.forEach(box => {
      if (!box.classList.contains('portfolio__box--active')) {
        i++
      }
    });
    if (i > 0) {
      portfolioBox.forEach(box => {
        box.classList.add('portfolio__box--active');
      });
    } else {
      portfolioBox.forEach(box => {
        box.classList.remove('portfolio__box--active');
      });
    }
  })
}

handleNav();
handleEnter();
handleUpButton();
handlePortfolio(); 
handleSocialMedia();
runSlider(0, 10000);