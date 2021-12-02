const timeStamp = $('.timestamp');
const startBtn = $('.pomodoro__box .start');
const stopBtn = $('.pomodoro__box .stop');
const pomodoroMode = $('.period .study');
const shortBreakMode = $('.period .s-break');
const longBreakMode = $('.period .l-break');
const pomodoroDuration = $('.pomodoro-duration .setting-input');
const shortBreakDuration = $('.short-duration .setting-input');
const longBreakDuration = $('.long-duration .setting-input');
const acceptSettingBtn = $('.setting__modal .setting-btn');
let isCountDown = false;
let countDown;
let count = 0;

// default value
timeStamp.innerHTML = `${pomodoroDuration.value}:00`
stopBtn.classList.toggle('hidden');
let mode = "pomodoro";
let startingMinutes = Number(pomodoroDuration.value);
let time = startingMinutes * 60;

// 3 mode (pomodoro)
acceptSettingBtn.addEventListener("click", function() {
  timeStamp.innerHTML = `${pomodoroDuration.value}:00`
  startingMinutes = Number(pomodoroDuration.value);
  time = startingMinutes * 60;
  stopCountDown();
})
pomodoroMode.addEventListener("click", function() {
  mode = "pomodoro";
  pomodoroSettingTime();
  stopCountDown();
})
shortBreakMode.addEventListener("click", function() {
  mode = "shortbreak";
  shortBreakSettingTime();
  stopCountDown();
})
longBreakMode.addEventListener("click", function() {
  mode = "longbreak";
  longBreakSettingTime();
  stopCountDown();
})

// add time html and setting countDown time
function pomodoroSettingTime() {
  console.log(1)
  timeStamp.innerHTML = `${pomodoroDuration.value}:00`
  startingMinutes = Number(pomodoroDuration.value);
  time = startingMinutes * 60;
  pomodoroMode.classList.add("active");
  shortBreakMode.classList.remove("active");
  longBreakMode.classList.remove("active");
  // test case
  // time =2;
}
function shortBreakSettingTime() {
  console.log(2)
  timeStamp.innerHTML = `${shortBreakDuration.value}:00`
  startingMinutes = Number(shortBreakDuration.value);
  time = startingMinutes * 60;
  pomodoroMode.classList.remove("active");
  shortBreakMode.classList.add("active");
  longBreakMode.classList.remove("active");
  // test case
  // time =2;
}
function longBreakSettingTime() {
  console.log(3)
  timeStamp.innerHTML = `${longBreakDuration.value}:00`
  startingMinutes = Number(longBreakDuration.value);
  time = startingMinutes * 60;
  pomodoroMode.classList.remove("active");
  shortBreakMode.classList.remove("active");
  longBreakMode.classList.add("active");
  // test case
  // time =2;
}


// start and stop countdown function
function startCountDown(){
  countDown = setInterval(updateCountdown, 1000);
  startBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
}
function stopCountDown(){
  clearInterval(countDown);
  startBtn.classList.remove('hidden');
  stopBtn.classList.add('hidden');
}

// when click start
startBtn.addEventListener("click", function() {
  isCountDown = true;
  startCountDown();
})
// when click stop
stopBtn.addEventListener("click", function() {
  isCountDown = false;
  stopCountDown();
})
function updateCountdown() {
  const minutes = Math.floor(time/60);
  let seconds = time % 60 < 10 ? '0' + time % 60 : time % 60;
  time--;
  timeStamp.innerHTML = `${minutes}:${seconds}`
  if (time === -1){
    if (mode == "pomodoro") {
      count += 1 ;
      console.log(count,"index");
      if (count === 3){
        mode = "longbreak";
        count = 0;
        longBreakSettingTime();
      }
      else {
        mode = "shortbreak";
        shortBreakSettingTime();
      }
    }
    else if (mode == "shortbreak" || mode == "longbreak")  {
      mode = "pomodoro"
      pomodoroSettingTime();
    }
  }
}


