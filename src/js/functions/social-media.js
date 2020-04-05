function handleSocialMedia() {
  const socialMediaButtons = document.querySelectorAll('.social-media__button--image');
  
  function socialMediaInfo() {
    let buttonId = this.getAttribute('data-buttonId');
    let buttonIdCapitalized = buttonId.charAt(0).toUpperCase() + buttonId.slice(1);
    alert(buttonIdCapitalized + ' is not available right now.');
  }
  
  socialMediaButtons.forEach(buttonId => buttonId.addEventListener('click', socialMediaInfo));
}

export { handleSocialMedia };