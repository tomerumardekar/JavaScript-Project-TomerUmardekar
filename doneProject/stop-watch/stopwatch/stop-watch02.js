const stopWatchView = document.querySelector("#stopWatchView");

const toggleStopWatchButton = document.getElementById("toggle-stop-watch");
toggleStopWatchButton.addEventListener("click", toggleStopWatch);

const reset = document.querySelector("#reset-stop-watch");
reset.addEventListener("click", resetStopWatch);

const lapsView = document.querySelector("#lapsView");

const lapsButton = document
  .querySelector("#stop-watch-laps")
  .addEventListener("click", addLap);

let hundredth = 0;
let seconds = 0;
let minutes = 0;

function getTimeString() {
  let secondsString = seconds;
  if (seconds < 10) {
    secondsString = "0" + seconds;
  }
  let minutesString = minutes;
  if (minutes < 10) {
    minutesString = "0" + minutes;
  }
  const timeString = `${minutesString}:${secondsString}:${hundredth}`;
  return timeString;
}

function displayTime() {
  stopWatchView.innerHTML = getTimeString();
}

function addLap() {
  lapsView.innerHTML += `<li> ${getTimeString()}</li>`;
}

function resetStopWatch() {
  hundredth = 0;
  seconds = 0;
  minutes = 0;
  displayTime();
}

function handleTimeChange() {
  hundredth++;
  if (hundredth > 99) {
    hundredth = 0;
    seconds++;

    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }
  }
  displayTime();
}

function startStopWatch() {
  intervalId = setInterval(handleTimeChange, 10);
  toggleStopWatchButton.innerHTML = "Stop";
}

function stopStopWatch() {
  clearInterval(intervalId);
  toggleStopWatchButton.innerHTML = "Start";
  intervalId = null;
}

let intervalId = null;
function toggleStopWatch() {
  if (intervalId == null) {
    startStopWatch();
  } else {
    stopStopWatch();
  }
}
