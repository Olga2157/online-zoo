// Carousel in Pets in Zoo - version 2 from technical requirements

let activeImagePet = 0;
let leftBorder = 0;
let rightBorder = 3;
const nextArrow = document.querySelector(".pets-arrow-right");
const prevArrow = document.querySelector(".pets-arrow-left");
let sliderTextPet = document.querySelector(".slider-number-pets");
let sliderFirstPet = document.querySelector(".slider-pets");

const petsInZoo = [
  {
    id: "panda",
    p: "Panda’s name is Bei Bei. He is 2 years old. Bei Bei is from China. He loves bamboos.",
    href: "pages/zoos/panda/panda.html",
  },
  {
    id: "eagle",
    p: "Eagle’s name is Vasya. He is 3 years old. He is from America. He loves meat.",
    href: "pages/zoos/eagle/eagle.html",
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

// array with 4 areas
const carouselElementsPet = document.querySelectorAll(".pets-slider-el");
const carouselElementsPetDescr = document.querySelectorAll(
  ".pets-slider-el div"
);

nextArrow.addEventListener("click", handleNextArrow);

function handleNextArrow() {
  //  moving right
  if (activeImagePet === rightBorder) {
    // case when the last image - leopard - is active
    if (rightBorder === 7) {
      leftBorder = 0;
      rightBorder = 3;
      activeImagePet = 0;
      for (let i = 0; i < 4; i++) {
        carouselElementsPet[i].classList.remove(petsInZoo[4 + i].id);
        carouselElementsPet[i].classList.add(petsInZoo[i].id);
      }
      carouselElementsPetDescr[3].classList.remove("active-element");
      carouselElementsPetDescr[0].classList.add("active-element");
    } else {
      // active image is in the carousel's middle
      leftBorder++;
      rightBorder++;
      for (let i = 0; i < 4; i++) {
        carouselElementsPet[i].classList.remove(
          petsInZoo[activeImagePet - 3 + i].id
        );
        carouselElementsPet[i].classList.add(
          petsInZoo[activeImagePet - 2 + i].id
        );
      }
      activeImagePet++;
      carouselElementsPetDescr[
        activeImagePet - leftBorder
      ].firstElementChild.textContent = petsInZoo[activeImagePet].p;
      carouselElementsPetDescr[activeImagePet - leftBorder].children[1].href =
        petsInZoo[activeImagePet].href;
    }
  } else {
    // without moving images
    carouselElementsPetDescr[activeImagePet - leftBorder].classList.remove(
      "active-element"
    );
    activeImagePet++;
    carouselElementsPetDescr[activeImagePet - leftBorder].classList.add(
      "active-element"
    );
  }
  // changing value and place of progress bar
  sliderTextPet.textContent = "0" + (activeImagePet + 1);
  sliderFirstPet.value = activeImagePet + 1;
}

prevArrow.addEventListener("click", handlePrevArrow);

function handlePrevArrow() {
  // moving left
  // case when the first image - panda - is active
  if (activeImagePet === 0) {
    activeImagePet = 7;
    leftBorder = 4;
    rightBorder = 7;
    for (let i = 0; i < 4; i++) {
      carouselElementsPet[i].classList.remove(petsInZoo[i].id);
      carouselElementsPet[i].classList.add(petsInZoo[4 + i].id);
    }
    carouselElementsPetDescr[0].classList.remove("active-element");
    carouselElementsPetDescr[3].classList.add("active-element");
    carouselElementsPetDescr[3].firstElementChild.textContent =
      petsInZoo[activeImagePet].p;
    carouselElementsPetDescr[3].children[1].href =
      petsInZoo[activeImagePet].href;
  } else if (activeImagePet === leftBorder) {
    // in the carousel's middle
    leftBorder--;
    rightBorder--;
    activeImagePet--;
    for (let i = 0; i < 4; i++) {
      carouselElementsPet[i].classList.remove(
        petsInZoo[activeImagePet + 1 + i].id
      );
      carouselElementsPet[i].classList.add(petsInZoo[activeImagePet + i].id);
    }
    carouselElementsPetDescr[0].firstElementChild.textContent =
      petsInZoo[activeImagePet].p;
    carouselElementsPetDescr[0].children[1].href =
      petsInZoo[activeImagePet].href;
  } else {
    let prevElement = activeImagePet - leftBorder;
    activeImagePet--;
    let curElement = activeImagePet - leftBorder;
    carouselElementsPetDescr[prevElement].classList.remove("active-element");
    carouselElementsPetDescr[curElement].classList.add("active-element");
    carouselElementsPetDescr[curElement].firstElementChild.textContent =
      petsInZoo[activeImagePet].p;
    carouselElementsPetDescr[curElement].children[1].href =
      petsInZoo[activeImagePet].href;
  }
  // changing value and place of progress bar
  sliderTextPet.textContent = "0" + (activeImagePet + 1);
  sliderFirstPet.value = activeImagePet + 1;
}

// changings when progress bar is changing
sliderFirstPet.addEventListener("input", handleProgress);

function handleProgress() {
  let curVal = sliderFirstPet.value - 1;
  let diff = curVal - activeImagePet;
  if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      handlePrevArrow();
    }
  } else if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      handleNextArrow();
    }
  }
}
