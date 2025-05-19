let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let inputHours = document.getElementById("input-hours");
let inputMinutes = document.getElementById("input-minutes");

let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
let hourCount = 0;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

reset.addEventListener("click", () => {
  pauseTimer();
  inputHours.value = "";
  inputMinutes.value = "";
  switch (active) {
    case "long":
      minCount = 14;
      break;
    case "short":
      minCount = 4;
      break;
    default:
      minCount = 24;
      break;
  }
  hourCount = 0;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  active = "focus";
  minCount = 24;
  hourCount = 0;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreakButton.addEventListener("click", () => {
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  active = "short";
  minCount = 4;
  hourCount = 0;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

longBreakButton.addEventListener("click", () => {
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  active = "long";
  minCount = 14;
  hourCount = 0;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener("click", () => {
  pauseTimer();
});

const pauseTimer = () => {
  paused = true;
  clearInterval(set);
  startBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("show");
};

startBtn.addEventListener("click", () => {
  // Si hay tiempo personalizado, usarlo
  let customHours = parseInt(inputHours.value) || 0;
  let customMinutes = parseInt(inputMinutes.value) || 0;
  if (customHours > 0 || customMinutes > 0) {
    hourCount = customHours;
    minCount = customMinutes - 1;
    count = 59;
    inputHours.value = "";
    inputMinutes.value = "";
  }

  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  paused = false;
  time.textContent = `${appendZero(hourCount)}:${appendZero(minCount)}:${appendZero(count)}`;
  set = setInterval(() => {
    count--;
    if (count < 0) {
      count = 59;
      if (minCount > 0) {
        minCount--;
      } else if (hourCount > 0) {
        hourCount--;
        minCount = 59;
      } else {
        clearInterval(set);
      }
    }
    time.textContent =
      hourCount > 0
        ? `${appendZero(hourCount)}:${appendZero(minCount)}:${appendZero(count)}`
        : `${appendZero(minCount)}:${appendZero(count)}`;
  }, 1000);
});
