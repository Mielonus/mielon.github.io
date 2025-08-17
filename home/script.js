let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const title = document.querySelector('.title_space');

function isTitleVisible() {
  const rect = title.getBoundingClientRect();
  return rect.bottom > 0;
}

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (isTitleVisible()) {
    navbar.classList.remove('hide');
  } else {
    if (currentScroll > lastScroll) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  }

  lastScroll = currentScroll;
});
