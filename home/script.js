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
