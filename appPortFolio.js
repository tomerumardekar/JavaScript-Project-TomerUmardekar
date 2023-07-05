const textContainer = document.getElementById("text");

const text = "  My  PortFolio  Project   ";
let index = 0;
let splitedText = text.split("");
let textToDisplay = "";

setInterval(() => {
  if (index >= splitedText.length) {
    index = 0;
    textToDisplay = "";
  }
  textToDisplay += splitedText[index];
  textContainer.innerHTML = textToDisplay;

  index = index + 1;
}, 400);

window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const container = document.querySelector(".container");

  // Add "fade-in" class to the header and container elements after a delay
  setTimeout(() => {
    header.classList.add("fade-in");
    container.classList.add("fade-in");
  }, 1000);
});
