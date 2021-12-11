test1 = $('.test .test1')
test2 = $('.test .test2')
test3 = $('.test .test3')
test4 = $('.test .test4')
test5 = $('.test .test5')

// mobile
test1.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'block';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'none';
})
test2.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'block';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'none';
})
test3.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'block';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'none';
})
test4.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'block';
  $('#footer .profile__modal--box').style.display = 'none';
})
test5.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'block';
})

// pc
//home
const homeBtn = $(".nav__items .home");
homeBtn.addEventListener('click',function() {
  $('.pomodoro .pomodoro__box').style.display = 'block';
  $('.pomodoro .tasklist').style.display = 'block';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'none';
})

// music
const musicBtn = $(".nav__items .music");
musicBtn.addEventListener("click", function () {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'block';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'none';
});

// setting
const settingBtn = $(".nav__items .setting");
settingBtn.addEventListener("click", function () {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'block';
  $('#footer .profile__modal--box').style.display = 'none';
});

// profile
const profileBtn = $(".nav__items .profile");
profileBtn.addEventListener("click", function () {
  $('.pomodoro .pomodoro__box').style.display = 'none';
  $('.pomodoro .tasklist').style.display = 'none';
  $('#footer .music__modal--box').style.display = 'none';
  $('#footer .setting__modal--box').style.display = 'none';
  $('#footer .profile__modal--box').style.display = 'block';
});