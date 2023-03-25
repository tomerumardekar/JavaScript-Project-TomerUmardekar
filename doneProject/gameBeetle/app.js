document.addEventListener("keydown", handleKey);
document.addEventListener("DOMContentLoaded", startGame);
const myCar = new Car();
let myTarget = new Target();
let points = 0;
let bombs = [];

const pointsPar = document.getElementById("points");

const playGround = document.querySelector(".parent");

function startGame() {
  playGround.appendChild(myCar.html);
  myTarget.addNewTarget();
  creatBombs(4);
}

function handleKey(event) {
  if (myCar.direction == event.key) {
    myCar.move(event.key);
  } else {
    myCar.rotate(event.key);
  }
}

function Target() {
  this.locationColumn = Math.floor(Math.random() * 10) + 1;
  this.locationRow = Math.floor(Math.random() * 10) + 1;
  this.html = document.createElement("img");
  this.html.src = "ladybug.png";
  this.html.className = "target";
  this.html.style.gridRow = this.locationRow;
  this.html.style.gridColumn = this.locationColumn;
  this.addNewTarget = function () {
    playGround.appendChild(this.html);
  };
  this.removeTarget = function () {
    playGround.removeChild(this.html);
  };
}

function isWin() {
  if (
    myCar.locationColumn == myTarget.locationColumn &&
    myTarget.locationRow == myCar.locationRow
  ) {
    points++;
    pointsPar.textContent = points;
    myTarget.removeTarget();
    myTarget = new Target();
    myTarget.addNewTarget();
  }
}

function Car() {
  (this.direction = "ArrowRight"), (this.locationColumn = 1);
  this.locationRow = 1;
  this.html = document.createElement("img");
  this.html.src = "spider.png";
  this.html.className = "car";

  this.rotate = function (pressKey) {
    this.direction = pressKey;
    if (pressKey == "ArrowDown") {
      this.html.style.transform = "rotate(90deg)";
    }
    if (pressKey == "ArrowLeft") {
      this.html.style.transform = "rotate(-180deg)";
    }
    if (pressKey == "ArrowRight") {
      this.html.style.transform = "rotate(360deg)";
    }
    if (pressKey == "ArrowUp") {
      this.html.style.transform = "rotate(-90deg)";
    }
  };

  this.move = function (pressKey) {
    if (pressKey == "ArrowDown") {
      if (this.locationRow < 10) {
        this.html.style.gridRow = this.locationRow + 1;
        this.locationRow = this.locationRow + 1;
      }
    }
    if (pressKey == "ArrowUp") {
      if (this.locationRow > 1) {
        this.html.style.gridRow = this.locationRow - 1;
        this.locationRow = this.locationRow - 1;
      }
    }
    if (pressKey == "ArrowRight") {
      if (this.locationColumn < 10) {
        this.html.style.gridColumn = this.locationColumn + 1;
        this.locationColumn = this.locationColumn + 1;
      }
    }
    if (pressKey == "ArrowLeft") {
      if (this.locationColumn > 1) {
        this.html.style.gridColumn = this.locationColumn - 1;
        this.locationColumn = this.locationColumn - 1;
      }
    }
    isWin();
    isLose();
  };
}

function Bomb() {
  this.locationColumn = Math.floor(Math.random() * 10) + 1;
  this.locationRow = Math.floor(Math.random() * 10) + 1;
  this.html = document.createElement("img");
  this.html.src = "net.png";
  this.html.className = "bomb";
  this.html.style.gridRow = this.locationRow;
  this.html.style.gridColumn = this.locationColumn;
  this.addNewBomb = function () {
    playGround.appendChild(this.html);
  };
  this.removeBomb = function () {
    playGround.removeChild(this.html);
  };
}

function creatBombs(numberOfBomb) {
  for (let index = 0; index < numberOfBomb; index++) {
    bombs[index] = new Bomb();
    bombs[index].addNewBomb();
  }
}

function isLose() {
  for (let index = 0; index < bombs.length; index++) {
    if (
      bombs[index].locationColumn == myCar.locationColumn &&
      bombs[index].locationRow == myCar.locationRow
    ) {
      points--;
      pointsPar.textContent = points;
      bombs[index].removeBomb();
      bombs[index] = new Bomb();
      bombs[index].addNewBomb();
    }
  }
}
