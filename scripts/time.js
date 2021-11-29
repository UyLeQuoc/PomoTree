const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const timeStamp = $('.timestamp');
const startingMinutes = 25;
let time = startingMinutes * 60;

setInterval(updateCountdown, 1000);

function updateCountdown() {
  const minutes = Math.floor(time/60);
  let seconds = time % 60 < 10 ? '0' + time % 60 : time % 60;
  time--;

  timeStamp.innerHTML = `${minutes}:${seconds}`
}