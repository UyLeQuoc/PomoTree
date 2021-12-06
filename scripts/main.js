const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const closeTaskBtn = $(".btn-close");
const addTaskBtn = $(".btn-add");
const taskModal = $(".task__modal");
const titleTask = $("#title");
const dateTask = $("#date");
const tagsTask = $("#tags");
const descTask = $("#description");
const deleteBtn = $(".task__modal .delete-btn");
const cancelBtn = $(".task__modal .cancel-btn");
const saveBtn = $(".task__modal .save-btn");
const optionAllBox = $(".btn-all-option");

// profile var
const profileBtn = $(".nav__items .profile");
const profileModal = $(".profile__modal");
const profileClose = $(".profile-close");
const treeAmount = $(".profile-tree .amount");
// setting var
const settingBtn = $(".nav__items .setting");
const settingModal = $(".setting__modal");
const settingClose = $(".setting-close");

settingBtn.addEventListener("click", function () {
  settingModal.style.display = "block";
});
settingClose.addEventListener("click", function () {
  settingModal.style.display = "none";
});
$(".setting__modal").addEventListener("click", function (e) {
  if (e.target.classList == "setting__modal") {
    settingModal.style.display = "none";
  }
});
// profile button (open,close)

profileClose.addEventListener("click", function () {
  profileModal.style.display = "none";
});
$(".profile__modal").addEventListener("click", function (e) {
  if (e.target.classList == "profile__modal") {
    profileModal.style.display = "none";
  }
});

// when click "add task" button
addTaskBtn.addEventListener("click", function () {
  taskModal.style.display = "block";
  deleteBtn.style.display = "none";
  $(".modal-name").innerHTML = "Add Task";
  $(".task__modal .save-btn").id = "";
  titleTask.value = "";
  dateTask.value = "";
  tagsTask.value = "";
  descTask.value = "";
});
closeTaskBtn.addEventListener("click", function () {
  taskModal.style.display = "none";
});
cancelBtn.addEventListener("click", function () {
  taskModal.style.display = "none";
});

// when click option to select all in tasks box
let isOptionOpen = false;
optionAllBox.addEventListener("click", function (e) {
  if (e.target.classList == "btn-all-option") {
    $(".options-box").classList.toggle("block");
    isOptionOpen = true;
  } else if (e.target.parentNode.classList == "btn-all-option") {
    $(".options-box").classList.toggle("block");
    isOptionOpen = true;
  }
});
$("body").addEventListener("click", function (e) {
  if (e.target.classList != "btn-all-option" && isOptionOpen) {
    $(".options-box").classList.remove("block");
    isOptionOpen = false;
  }
  if (e.target.parentNode.classList == "btn-all-option") {
    $(".options-box").classList.add("block");
  }
});
taskModal.addEventListener("click", function (e) {
  if (e.target.classList == "task__modal") {
    taskModal.style.display = "none";
  }
});
