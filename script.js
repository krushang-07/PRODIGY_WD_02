let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapsList = document.getElementById("lapsList");

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 10);
    running = true;
    startStopButton.innerHTML = "Stop";
  } else {
    clearInterval(tInterval);
    running = false;
    startStopButton.innerHTML = "Start";
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  lapCounter = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  hoursDisplay.innerHTML = "00";
  minutesDisplay.innerHTML = "00";
  secondsDisplay.innerHTML = "00";
  millisecondsDisplay.innerHTML = "00";
  lapsList.innerHTML = "";
  startStopButton.innerHTML = "Start";
}

function lap() {
  if (running) {
    lapCounter++;
    const lapTime = document.createElement("li");
    lapTime.innerText = `Lap ${lapCounter}: ${hoursDisplay.innerHTML}:${minutesDisplay.innerHTML}:${secondsDisplay.innerHTML}:${millisecondsDisplay.innerHTML}`;
    lapsList.appendChild(lapTime);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((difference % (1000 * 60)) / 1000);
  milliseconds = Math.floor((difference % 1000) / 10);

  hoursDisplay.innerHTML = hours < 10 ? "0" + hours : hours;
  minutesDisplay.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  millisecondsDisplay.innerHTML =
    milliseconds < 10 ? "0" + milliseconds : milliseconds;
}
