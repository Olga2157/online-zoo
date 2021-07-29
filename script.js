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

// first carousel in "Watch online" section
let activeImage = 1;
// array of ojects with animals details
const pets = [
  {
    id: "eagle",
    p: "Eagle’s name is Vasya. He is 3 years old. He is from America. He loves meat.",
    href: "pages/zoos/eagle/eagle.html",
  },
  {
    id: "panda",
    p: "Panda’s name is Bei Bei. He is 2 years old. Bei Bei is from China. He loves bamboos.",
    href: "pages/zoos/panda/panda.html",
  },
  {
    id: "gorilla",
    p: "Gorilla’s name is Go. He is 4 years old. Bei Bei is from Africa. He loves bananas.",
    href: "pages/zoos/gorilla/gorilla.html",
  },
  {
    id: "alligator",
    p: "Alligator’s name is Horrow. He is 6 years old. Horrow is from Africa. He loves meat.",
    href: "pages/zoos/alligator/alligator.html",
  },
  {
    id: "fox",
    p: "Fox’s name is Alisa. She is 2 years old. Alisa is from Russia. She loves meat.",
    href: "pages/zoos/fox/fox.html",
  },
  {
    id: "sloth",
    p: "Sloth’s name is By. He is 2 years old. By is from America. He loves foliage.",
    href: "pages/zoos/sloth/sloth.html",
  },
  {
    id: "elephant",
    p: "Elephant’s name is Gig Dzhon. He is 5 years old. He is from Africa. He loves banana.",
    href: "pages/zoos/elephant/elephant.html",
  },
  {
    id: "leopard",
    p: "Leopard’s name is Fast Leo. He is 3 years old. Fast Leo is from Africa. He loves meat.",
    href: "pages/zoos/leopard/leopard.html",
  },
];

const next = document.querySelector(".pets-slider-watch-3");
const prev = document.querySelector(".pets-slider-watch-1");
let sliderText = document.getElementById("slider-number-first");
let sliderFirst = document.querySelector(".slider-first");

// array with areas from the first carousel
const carouselElements = document.querySelectorAll(".pets-slider-el-watch");
// desciption and link of the watch online button
const descrP = document
  .querySelectorAll(".pets-slider-el-watch")[1]
  .querySelector("p");
const activeImageHref = document
  .querySelectorAll(".pets-slider-el-watch")[1]
  .querySelector("a");

next.addEventListener("click", handleNext);

function handleNext() {
  carouselElements[0].classList.add("carousel-cursor");
  if (activeImage === 7) {
    return;
  }
  activeImage++;
  countRound = activeImage - 1;
  countImgRight = 6 - countRound;
  // changing images after 3 image
  for (let i = 2; i < countImgRight + 2; i++) {
    carouselElements[i].classList.remove(pets[i + activeImage - 2].id);
    carouselElements[i].classList.add(pets[i + activeImage - 1].id);
  }
  // changings on the small white round
  if (countRound !== 0) {
    carouselElements[8 - countRound].classList.remove(pets[7].id);
    carouselElements[8 - countRound].classList.add("white-round");
  }
  if (activeImage === 7) {
    carouselElements[2].classList.remove("carousel-cursor");
  }
  // active image
  carouselElements[1].classList.remove(pets[activeImage - 1].id);
  carouselElements[1].classList.add(pets[activeImage].id);
  descrP.textContent = pets[activeImage].p;
  activeImageHref.href = pets[activeImage].href;

  if (activeImage !== 1) {
    carouselElements[0].classList.remove(pets[activeImage - 2].id);
  }
  carouselElements[0].classList.add(pets[activeImage - 1].id);
  //  changing value and place of progress bar
  sliderText.textContent = "0" + (activeImage + 1);
  sliderFirst.value = activeImage + 1;
  // changing href of "watch online" button
  updateFirstWatchButton();
}

prev.addEventListener("click", handlePrev);

function handlePrev() {
  carouselElements[2].classList.add("carousel-cursor");
  if (activeImage === 0) {
    return;
  }
  activeImage--;
  // boundary case: active image is an eagle
  if (activeImage === 0) {
    // replace eagle on the small white round in the first area
    carouselElements[0].classList.remove(pets[0].id);
    carouselElements[0].classList.add("white-round");
    carouselElements[0].classList.remove("carousel-cursor");
    // delete panda and replace on eagle with its link and description from active area
    carouselElements[1].classList.remove(pets[1].id);
    carouselElements[1].classList.add(pets[0].id);
    descrP.textContent = pets[0].p;
    activeImageHref.href = pets[0].href;
    // moving other images on the one area
    for (let i = 2; i < pets.length; i++) {
      carouselElements[i].classList.remove(pets[i].id);
      carouselElements[i].classList.add(pets[i - 1].id);
    }
    // changing value and place of progress bar
    sliderText.textContent = "01";
    sliderFirst.value = 1;
  } else {
    // cases, when started to click on the next
    carouselElements[1].classList.remove(pets[activeImage + 1].id);
    carouselElements[1].classList.add(pets[activeImage].id);
    descrP.textContent = pets[activeImage].p;
    activeImageHref.href = pets[activeImage].href;
    carouselElements[0].classList.remove(pets[activeImage].id);
    carouselElements[0].classList.add(pets[activeImage - 1].id);

    countRound = activeImage - 1;
    countImgRight = 6 - countRound;
    for (let i = 2; i < countImgRight + 2; i++) {
      if (activeImage + i !== 8) {
        carouselElements[i].classList.remove(pets[activeImage + i].id);
      }
      carouselElements[i].classList.add(pets[i + activeImage - 1].id);
    }
    // changing value and place of progress bar
    sliderText.textContent = "0" + (activeImage + 1);
    sliderFirst.value = activeImage + 1;
    // changing href of "watch online" button
    updateFirstWatchButton();
  }
}

// changings when progress bar is changing
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

// changing href of "watch online" button (Watch your favorite online section)
const watchButtonFirst = document.querySelector(".watch-button-first");

function updateFirstWatchButton() {
  if (activeImage === 0) {
    watchButton.setAttribute(
      "onclick",
      "window.location.href='pages/zoos/eagle/eagle.html'"
    );
  } else if (activeImage === 2) {
    watchButtonFirst.setAttribute(
      "onclick",
      "window.location.href='pages/zoos/gorilla/gorilla.html'"
    );
  } else if (activeImage === 3) {
    watchButtonFirst.setAttribute(
      "onclick",
      "window.location.href='pages/zoos/alligator/alligator.html'"
    );
  } else {
    watchButtonFirst.setAttribute(
      "onclick",
      "window.location.href='pages/zoos/panda/panda.html'"
    );
  }
}
