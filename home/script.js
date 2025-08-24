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
        hamburger.classList.toggle("active");
        navContent.classList.toggle("active");
      }
    } else {
      navbar.classList.remove('hide');
    }
  }

  lastScroll = currentScroll;
});

const modal = document.getElementById("projectModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.querySelector(".modal_close");

document.querySelectorAll(".project_card").forEach(card => {
  card.addEventListener("click", () => {
    const videoSrc = card.querySelector("iframe").src;
    const title = card.querySelector("h3").innerText;
    const desc = card.querySelector("p").innerText;
    const link = card.dataset.link;

    modalIframe.src = videoSrc;
    modalTitle.innerText = title;
    modalDesc.innerText = desc;
    modalBtn.href = link;

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalVideo.src = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modalVideo.src = "";
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    modalVideo.src = "";
  }
});



