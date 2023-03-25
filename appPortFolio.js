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
