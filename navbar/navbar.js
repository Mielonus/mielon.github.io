function initNavbar() {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  const title = document.querySelector('.title_space');

  const hamburger = document.querySelector(".hamburger");
  const navContent = document.querySelector(".navbar_content");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navContent.classList.toggle("active");
  });

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
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          navContent.classList.remove("active");
        }
      } else {
        navbar.classList.remove('hide');
      }
    }

    lastScroll = currentScroll;
  });
}

function loadNavbar() {
  fetch("navbar/navbar.html?v=1")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
      initNavbar();
    });
}

document.addEventListener("DOMContentLoaded", loadNavbar);
