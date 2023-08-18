import vars from "../_vars";

export const timer = (days, hours, minutes, seconds) => {
  let totalTime = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
  let currTime = localStorage.getItem('currTime') || totalTime;
  localStorage.setItem('totalTime', totalTime);

  setInterval(updateTimer, 1000)

  function updateTimer() {
    if (localStorage.getItem('totalTime', totalTime)) {
      localStorage.setItem('currTime', currTime);
    } else {
      currTime = totalTime;
      localStorage.setItem('totalTime', totalTime);
      localStorage.setItem('currTime', currTime);
    }

    currTime--;

    setTime();
  }

  function setTime() {
    const days = vars.timerEl?.querySelector('.timer__item--days');
    const hours = vars.timerEl?.querySelector('.timer__item--hours');
    const mins = vars.timerEl?.querySelector('.timer__item--mins');
    const sec = vars.timerEl?.querySelector('.timer__item--sec');

    let daysLeft = Math.floor(currTime / 86400);
    let hoursLeft = Math.floor((currTime % 86400) / 3600);
    let minutesLeft = Math.floor((currTime % 3600) / 60);
    let secondsLeft = Math.floor(currTime % 60);

    if (vars.timerEl) {
      days.innerHTML = formatTime(daysLeft);
      hours.innerHTML = formatTime(hoursLeft);
      mins.innerHTML = formatTime(minutesLeft);
      sec.innerHTML = formatTime(secondsLeft);
    }
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  timer(6, 18, 24, 12);
})
