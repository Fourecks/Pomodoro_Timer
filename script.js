let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");

let set;
let active = "focus";
let count = 0;
let minCount = 25;
let paused = true;

const appendZero = (value) => (value < 10 ? `0${value}` : value);
time.textContent = `${appendZero(minCount)}:00`;

// 👉 Permitir escribir directamente en el tiempo
time.addEventListener("click", () => {
  // Reemplazar el texto con un input temporal
  let input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.value = minCount;
  input.style.fontSize = "1em";
  input.style.width = "80px";
  input.style.textAlign = "center";

  time.textContent = "";
  time.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      updateCustomTime(input.value);
    }
  });

  input.addEventListener("blur", () => {
    updateCustomTime(input.value);
  });
});

function updateCustomTime(value) {
  const newMin = parseInt(value);
  if (!isNaN(newMin) && newMin > 0) {
    minCount = newMin;
    count = 0;
  }
  time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
}

reset.addEventListener("click", () => {
  pauseTimer();
  switch (active) {
    case "long":
      minCount = 15;
      break;
    case "short":
      minCount = 5;
      break;
    default:
      minCount = 25;
      break;
  }
  count = 0;
  time.textContent = `${appendZero(minCount)}:00`;
});

const removeFocus = () => {
  buttons.forEach((btn) => btn.classList.remove("btn-focus"));
};

focusButton.addEventListener("click", () => {
  active = "focus";
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 25;
  count = 0;
  time.textContent = `${appendZero(minCount)}:00`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 5;
  count = 0;
  time.textContent = `${appendZero(minCount)}:00`;
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 15;
  count = 0;
  time.textContent = `${appendZero(minCount)}:00`;
});

pause.addEventListener("click", pauseTimer);

function pauseTimer() {
  paused = true;
  clearInterval(set);
  startBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("show");
}

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  paused = false;

  set = setInterval(() => {
    if (count === 0) {
      if (minCount === 0) {
        clearInterval(set);
        return;
      } else {
        minCount--;
        count = 59;
      }
    } else {
      count--;
    }
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
  }, 1000);
});
