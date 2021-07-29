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

// map carousel

const next = document.querySelector(".arrow-right");
const prev = document.querySelector(".arrow-left");
let sliderText = document.getElementById("slider-number");
let sliderFirst = document.querySelector(".slider-map");

let activeImage = 1;

const carouselElements = document.querySelectorAll(".carousel-item");

next.addEventListener("click", handleNext);

function handleNext() {
  // changings in the case of boundary value
  // delete active icon
  if (activeImage <= 3) {
    mapIcons.forEach((icon) => icon.classList.remove("active-icon"));
  }
  // changing active icon in the case of boundary value
  if (activeImage === 7) {
    carouselElements[activeImage].classList.remove("carousel-item_active");
    activeImage = 0;
    carouselElements[activeImage].classList.add("carousel-item_active");
  } else {
    // changing active image
    carouselElements[activeImage].classList.remove("carousel-item_active");
    activeImage++;
    carouselElements[activeImage].classList.add("carousel-item_active");
  }
  // changing map-icons
  if (activeImage === 0) {
    mapIcons[2].classList.add("active-icon");
  } else if (activeImage === 1) {
    mapIcons[3].classList.add("active-icon");
  } else if (activeImage === 2) {
    mapIcons[1].classList.add("active-icon");
  } else if (activeImage === 3) {
    mapIcons[0].classList.add("active-icon");
  }
  // changing value and place of progress bar
  sliderText.textContent = "0" + (activeImage + 1);
  sliderFirst.value = activeImage + 1;
  // changing href of "watch online" button
  updateWatchButton();
}

prev.addEventListener("click", handlePrev);

function handlePrev() {
  // delete active icon
  if (activeImage <= 3) {
    mapIcons.forEach((icon) => icon.classList.remove("active-icon"));
  }
  // changing active icon in the case of boundary value
  if (activeImage === 0) {
    carouselElements[activeImage].classList.remove("carousel-item_active");
    activeImage = 7;
    carouselElements[activeImage].classList.add("carousel-item_active");
  } else {
    // changing active image
    carouselElements[activeImage].classList.remove("carousel-item_active");
    activeImage--;
    carouselElements[activeImage].classList.add("carousel-item_active");
  }
  // changing map-icons
  if (activeImage === 0) {
    mapIcons[2].classList.add("active-icon");
  } else if (activeImage === 1) {
    mapIcons[3].classList.add("active-icon");
  } else if (activeImage === 2) {
    mapIcons[1].classList.add("active-icon");
  } else if (activeImage === 3) {
    mapIcons[0].classList.add("active-icon");
  }
  // changing value and place of progress bar
  sliderText.textContent = "0" + (activeImage + 1);
  sliderFirst.value = activeImage + 1;
  // changing href of "watch online" button
  updateWatchButton();
}

// changings images when progress bar is changing
sliderFirst.addEventListener("input", handleProgress);

function handleProgress() {
  let curVal = sliderFirst.value - 1;
  let diff = curVal - activeImage;
  if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      handlePrev();
    }
  } else if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      handleNext();
    }
  }
}

// array with animals icons
const mapIcons = document.querySelectorAll(".map-icon");

mapIcons.forEach((icon) => icon.addEventListener("click", handleIconChoose));
function handleIconChoose() {
  let curActiveEl = 0;
  switch (this.title) {
    case "eagle":
      curActiveEl = 3;
      break;
    case "alligator":
      curActiveEl = 2;
      break;
    case "gorilla":
      curActiveEl = 0;
      break;
    case "panda":
      curActiveEl = 1;
      break;
    default:
      curActiveEl = -1;
  }
  let diff = activeImage - curActiveEl;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      handlePrev();
    }
  } else if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      handleNext();
    }
  }
}

// changings when click on carousel's images
carouselElements.forEach((elem) =>
  elem.addEventListener("click", handleCarouselItemClick)
);

const carouselMapping = {
  gorilla: 0,
  panda: 1,
  alligator: 2,
  eagle: 3,
  tiger: 4,
  elephant: 5,
  lion: 6,
  zebra: 7,
};

function handleCarouselItemClick() {
  let curActiveEl = carouselMapping[this.title];
  let diff = activeImage - curActiveEl;
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      handlePrev();
    }
  } else if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      handleNext();
    }
  }
}

// changing href of "watch online" button
const watchButton = document.querySelector(".watch-button-map");

function updateWatchButton() {
  if (activeImage === 0) {
    watchButton.setAttribute(
      "onclick",
      "window.location.href='../zoos/gorilla/gorilla.html'"
    );
  } else if (activeImage === 1) {
    watchButton.setAttribute(
      "onclick",
      "window.location.href='../zoos/panda/panda.html'"
    );
  } else if (activeImage === 2) {
    watchButton.setAttribute(
      "onclick",
      "window.location.href='../zoos/alligator/alligator.html'"
    );
  } else if (activeImage === 3) {
    watchButton.setAttribute(
      "onclick",
      "window.location.href='../zoos/eagle/eagle.html'"
    );
  } else {
    watchButton.removeAttribute("onclick");
  }
}
