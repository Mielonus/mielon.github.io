const email = document.getElementById("email");
const discord = document.getElementById("discord");
const twitter = document.getElementById("twitter");
const notification = document.getElementById("notification");

email.addEventListener("click", () => {
  window.location.href = "mailto:dev.mielon@gmail.com";
});

twitter.addEventListener("click", () => {
  window.open("https://twitter.com/messages/compose?recipient_id=1212005672792932353", "_blank");
});

discord.addEventListener("click", () => {
  const username = "mielonus";
  navigator.clipboard.writeText(username)
    .then(() => {
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 2500);
    })
});
