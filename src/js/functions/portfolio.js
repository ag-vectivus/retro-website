function handlePortfolio() {
  const portfolioButton = document.querySelectorAll('.portfolio__filter--label');
  const portfolioPhoto = document.querySelectorAll('.portfolio__photo--img');
  const portfolioButtonAll = document.querySelector('.portfolio__caption');
  const portfolioBox = document.querySelectorAll('.portfolio__box');

  const active = 'portfolio__box--active';

  function checkIfContains() {
    let i = 0;
    portfolioBox.forEach(box => {
      if (!box.classList.contains(active)) {
        i++
      }
    });
    return i;
  }

  function showChoosen() {
    const choosenPhotos = [];
    let buttonTag = this.getAttribute('data-tag');

    portfolioPhoto.forEach((photo, index) => {
      const photoTag = photo.getAttribute('data-tag');
      (photoTag === buttonTag) ? choosenPhotos.push(index) : index;
    });

    portfolioBox.forEach(box => {
      box.classList.remove(active);
    });

    for (let i = 0; i < choosenPhotos.length; i++) {
      portfolioBox[choosenPhotos[i]].classList.add(active);
    };
  };

  function toggleAll() {
    const i = checkIfContains();
    
    if (i > 0) {
      portfolioBox.forEach(box => {
        box.classList.add('portfolio__box--active')});
    } else {
      portfolioBox.forEach(box => {
        box.classList.remove('portfolio__box--active')});
    }
  }

  portfolioButtonAll.addEventListener('click', toggleAll);
  portfolioButton.forEach(button => button.addEventListener('click', showChoosen));
}

export { handlePortfolio };