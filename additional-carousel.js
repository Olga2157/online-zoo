//  карусель в блоке How it Works
let sliderTextHow = document.querySelector(".slider-number-how");
let sliderHow = document.getElementById("how-range");
let imageHow = document.querySelector(".explanation-img");

const explanationImages = {
  1: "assets/images/explanations/animals1.png",
  2: "assets/images/explanations/animals2.png",
  3: "assets/images/explanations/animals3.png",
  4: "assets/images/explanations/animals4.png",
};

sliderHow.addEventListener("input", handleProgressHow);

function handleProgressHow() {
  const howCounter = parseInt(this.value);
  imageHow.src = explanationImages[howCounter];
  //  changing value and place of progress bar
  sliderTextHow.textContent = "0" + howCounter;
  sliderHow.value = howCounter;
}
