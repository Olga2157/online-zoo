// light & dark versions:
var checkbox = document.querySelector("input[name=theme]");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    trans();
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
  }
});
let trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

// Changing video

const bigVideo = document.querySelector(".big-video iframe");
const smallVideos = document.querySelectorAll(".iframe-wrapper");

smallVideos.forEach((video) => {
  video.addEventListener("click", handleVideo);
});

function handleVideo() {
  tempSrc = this.children[0].src;
  this.children[0].src = bigVideo.src;
  bigVideo.src = tempSrc;
}
