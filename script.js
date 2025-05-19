startBtn.addEventListener("click", () => {
  let customHours = parseInt(inputHours.value) || 0;
  let customMinutes = parseInt(inputMinutes.value) || 0;

  if (customHours > 0 || customMinutes > 0) {
    hourCount = customHours;
    minCount = customMinutes;
    count = 0; // Inicia desde segundo 0
    inputHours.value = "";
    inputMinutes.value = "";
  }

  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  paused = false;
  time.textContent = `${hourCount > 0 ? appendZero(hourCount) + ":" : ""}${appendZero(minCount)}:${appendZero(count)}`;

  set = setInterval(() => {
    if (count === 0) {
      if (minCount === 0) {
        if (hourCount === 0) {
          clearInterval(set);
          return;
        } else {
          hourCount--;
          minCount = 59;
        }
      } else {
        minCount--;
      }
      count = 59;
    } else {
      count--;
    }

    time.textContent =
      hourCount > 0
        ? `${appendZero(hourCount)}:${appendZero(minCount)}:${appendZero(count)}`
        : `${appendZero(minCount)}:${appendZero(count)}`;
  }, 1000);
});

