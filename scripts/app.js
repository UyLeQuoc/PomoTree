// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpT519AsxmZ0zqTx9Aw9ZqLmcQZs6gmkE",
  authDomain: "mockdb-123.firebaseapp.com",
  projectId: "mockdb-123",
  storageBucket: "mockdb-123.appspot.com",
  messagingSenderId: "841215532441",
  appId: "1:841215532441:web:a21f0d9410f0ef4a360708",
  measurementId: "G-BM2RQKSZ5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

const saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", (e) => {
  if (e.target.id != "") {
    updateTaskToFirebase(e.target.id);
    toast({
      title: "Edit Task",
      messenger: "Successful",
      type: "info",
      duration: 1000,
    });
  } else {
    addTaskToFirebase();
    toast({
      title: "Add Task",
      messenger: "Successful",
      type: "success",
      duration: 1000,
    });
  }
  taskModal.style.display = "none";
  printQueriedTasksFromFirebase("isDone", false);
  // $(`.${filterMode}`).click();
  resetModalTask();
});

// accept setting
const settingSave = document.querySelector(".setting__modal .setting-btn");
settingSave.addEventListener("click", function () {
  updateInfoToFirebase();
  document.querySelector(".setting__modal").style.display = "none";
  pomodoroSettingTime();
  stopCountDown();
  toast({
    title: "Info",
    messenger: "Setting Changed",
    type: "info",
    duration: 1000,
  });
});

// event done-all button
const doneAllBtn = document.querySelector(".done-all");
doneAllBtn.addEventListener("click", function () {
  const doneBtns = $$(".task .btn-check");
  doneBtns.forEach((doneBtn) => {
    uploadDoneTaskToFirebase(doneBtn.id);
  });
  toast({
    title: "All Tasks",
    messenger: `All tasks had changed "Done"`,
    type: "info",
    duration: 2000,
  });
  printQueriedTasksFromFirebase("isDone", false);
});

const notDoneAllBtn = document.querySelector(".add-all");
notDoneAllBtn.addEventListener("click", function () {
  const notDoneBtns = $$(".task .btn-check");
  notDoneBtns.forEach((notDoneBtn) => {
    uploadNotDoneTaskToFirebase(notDoneBtn.id);
  });
  toast({
    title: "All Tasks",
    messenger: `All tasks had changed "Not Done"`,
    type: "info",
    duration: 2000,
  });
  printQueriedTasksFromFirebase("isDone", true);
});

const profileUpdate = document.querySelector(".nav__items .profile");
profileUpdate.addEventListener("click", function () {
  document.querySelector(".profile__modal").style.display = "block";
  updateInfoToFirebase();
});

// event delete-all button
// const deleteAllBtn = document.querySelector('.delete-all');
document.querySelector(".delete-all").addEventListener("click", function () {
  const deleteBtns = $$(".task .btn-check");
  deleteBtns.forEach((deleteBtn) => {
    deleteTaskFromFirebase(deleteBtn.id);
  });
  toast({
    title: "Delete All Tasks",
    messenger: `All tasks has been deleted`,
    type: "info",
    duration: 2000,
  });
  printQueriedTasksFromFirebase("isDone", false);
});

const logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

function addTaskToFirebase() {
  let date = settingToday();
  let newDate = dateTask.value == "" ? date : dateTask.value;
  let newTitle = titleTask.value == "" ? "New Note" : titleTask.value;
  addDoc(
    collection(db, "users", window.sessionStorage.getItem("UID"), "tasks"),
    {
      title: newTitle,
      date: newDate,
      tag: tagsTask.value,
      description: descTask.value,
      isDone: false,
    }
  ).catch((err) => {
    toast({
      title: "Error",
      messenger: `Something went wrong`,
      type: "error",
      duration: 3000,
    });
  });
}

function updateTaskToFirebase(idTask) {
  let date = settingToday();
  let newDate = dateTask.value == "" ? date : dateTask.value;
  let newTitle = titleTask.value == "" ? "New Note" : titleTask.value;
  updateDoc(
    doc(db, "users", window.sessionStorage.getItem("UID"), "tasks", idTask),
    {
      title: newTitle,
      date: newDate,
      tag: tagsTask.value,
      description: descTask.value,
    }
  ).catch((err) => {
    toast({
      title: "Error",
      messenger: `Upload Task To Firebase Failed`,
      type: "error",
      duration: 1000,
    });
  });
}

function printTasksFromFirebase() {
  $(".tasklist__box .header .name").innerHTML = `All Tasks`;
  getDocs(
    collection(db, "users", window.sessionStorage.getItem("UID"), "tasks")
  ).then((snapshot) => {
    let htmls = snapshot.docs.map((task) => {
      let icon = task.data().isDone == true ? "plus-circle" : "check-circle";
      const newElement = `
					<div class="task" data-id-task="${task.id}" data-isDone="${task.data().isDone}">
						<div class="btn-check" id="${task.id} ${task.data().isDone}">
							<i class="fas fa-${icon}"></i>
						</div>
						<div class="name">
							<div class="title">${task.data().title}</div>
							<div class="date">${settingDisplayTime(task.data().date)}</div>
							<div class="note">${task.data().description}</div>
						</div>
						<div class="btn-option" id="${task.id}">
							<i class="fas fa-ellipsis-v"></i>
						</div>
					</div>
					`;
      return newElement;
    });
    $(".tasks").innerHTML = htmls.join("");
    addOptionEvent();
    addDoneEvent();
  });
}
function settingDisplayTime(time) {
  // DD/MM/YYYY
  return `${time.slice(8)}/${time.slice(5, 7)}/${time.slice(0, 4)}`;
}
function printQueriedTasksFromFirebase(field, value) {
  if (typeof value === "boolean") {
    if (value === true) {
      $(".tasklist__box .header .name").innerHTML = `Done Tasks`;
    } else if (value === false) {
      $(".tasklist__box .header .name").innerHTML = `Not Done Tasks`;
    }
  } else if (value.length == 10) {
    $(".tasklist__box .header .name").innerHTML = `${settingDisplayTime(
      value
    )} Tasks`;
  } else {
    $(".tasklist__box .header .name").innerHTML = `${value} Tasks`;
  }
  $(".tasks").innerHTML = "";
  // --------------
  if (field == "tag" || field == "date") {
    var q = query(
      collection(db, "users", window.sessionStorage.getItem("UID"), "tasks"),
      where(field, "==", value),
      where("isDone", "!=", true)
    );
  } else {
    var q = query(
      collection(db, "users", window.sessionStorage.getItem("UID"), "tasks"),
      where(field, "==", value)
    );
  }
  getDocs(q).then((snapshot) => {
    let htmls = snapshot.docs.map((task) => {
      let icon = task.data().isDone == true ? "plus-circle" : "check-circle";
      const newElement = `
					<div class="task" data-id-task="${task.id}" data-isDone="${task.data().isDone}">
						<div class="btn-check" id="${task.id}">
							<i class="fas fa-${icon}"></i>
						</div>
						<div class="name">
							<div class="title">${task.data().title}</div>
							<div class="date">${settingDisplayTime(task.data().date)}</div>
							<div class="note">${task.data().description}</div>
						</div>
						<div class="btn-option" id="${task.id}">
							<i class="fas fa-ellipsis-v"></i>
						</div>
					</div>
					`;
      return newElement;
    });
    $(".tasks").innerHTML = htmls.join("");
    addOptionEvent();
    addDoneEvent();
  });
}

function addOptionEvent() {
  const optionBtns = $$(".task .btn-option");
  optionBtns.forEach((optionBtn) => {
    optionBtn.addEventListener("click", function (e) {
      let taskEdit;
      if (e.target.classList == "btn-option") {
        taskEdit = e.currentTarget.parentNode;
      } else if (e.target.parentNode.classList == "btn-option") {
        taskEdit = e.currentTarget.parentNode;
      }
      $(".task__modal--box .modal-name").innerHTML = "Edit Task";
      taskModal.style.display = "block";
      deleteBtn.style.display = "block";
      // get data
      const idTask = taskEdit.getAttribute("data-id-task");
      getDoc(
        doc(db, "users", window.sessionStorage.getItem("UID"), "tasks", idTask)
      )
        .then((snapshot) => {
          $("#title").value = snapshot.data().title;
          $("#date").value = snapshot.data().date;
          $("#tags").value = snapshot.data().tag;
          $("#description").value = snapshot.data().description;
          $(".task__modal .save-btn").id = idTask;
          isEdit = true;
          deleteBtn.id = idTask;
          deleteBtn.addEventListener("click", function () {
            deleteTaskFromFirebase(idTask);
            // test
            taskModal.style.display = "none";
            toast({
              title: "Delete 1 Task",
              messenger: `Task has been deleted`,
              type: "info",
              duration: 1000,
            });
            printQueriedTasksFromFirebase("isDone", false);
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            messenger: `Something went wrong`,
            type: "error",
            duration: 3000,
          });
        });
    });
  });
}

// change status true
function addDoneEvent() {
  const doneBtns = $$(".task .btn-check");
  doneBtns.forEach((doneBtn) => {
    doneBtn.addEventListener("click", function (e) {
      let taskDone;
      if (e.target.classList == "btn-check") {
        taskDone = e.currentTarget.parentNode;
      } else if (e.target.parentNode.classList == "btn-check") {
        taskDone = e.currentTarget.parentNode;
        // get data
        const isDone = taskDone.getAttribute("data-isDone");
        const idTask = taskDone.getAttribute("data-id-task");
        if (isDone == "true") {
          uploadNotDoneTaskToFirebase(idTask);
          toast({
            title: "Task",
            messenger: `Add Task Successful`,
            type: "success",
            duration: 2000,
          });
        } else if (isDone == "false") {
          uploadDoneTaskToFirebase(idTask);
          toast({
            title: "Task",
            messenger: `Done Task Successful`,
            type: "info",
            duration: 2000,
          });
        }
        printQueriedTasksFromFirebase("isDone", false);
      }
    });
  });
}

// get today
function settingToday() {
  let today = new Date();
  let year = today.getFullYear();
  let month =
    today.getMonth() + 1 < 10
      ? "0" + today.getMonth() + 1
      : today.getMonth() + 1;
  let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  return `${year}-${month}-${day}`;
}

function uploadDoneTaskToFirebase(ID) {
  updateDoc(
    doc(db, "users", window.sessionStorage.getItem("UID"), "tasks", ID),
    {
      isDone: true,
    }
  )
    .then()
    .catch();
}
function uploadNotDoneTaskToFirebase(ID) {
  updateDoc(
    doc(db, "users", window.sessionStorage.getItem("UID"), "tasks", ID),
    {
      isDone: false,
    }
  )
    .then()
    .catch();
}
function deleteTaskFromFirebase(ID) {
  deleteDoc(
    doc(db, "users", window.sessionStorage.getItem("UID"), "tasks", ID)
  );
}
function resetModalTask() {
  titleTask.value = "";
  dateTask.value = "";
  tagsTask.value = "";
  descTask.value = "";
}

function updateInfoFromFirebase() {
  getDoc(doc(db, "users", window.sessionStorage.getItem("UID"))).then(
    (snapshot) => {
      let pomo =
        snapshot.data() == undefined
          ? 25
          : Number(snapshot.data().pomodoroDuration);
      $(".pomodoro-duration .setting-input").value =
        Number(snapshot.data()) == undefined
          ? 25
          : Number(snapshot.data().pomodoroDuration);
      $(".short-duration .setting-input").value =
        Number(snapshot.data()) == undefined
          ? 5
          : Number(snapshot.data().shortBreakDuration);
      $(".long-duration .setting-input").value =
        Number(snapshot.data()) == undefined
          ? 15
          : Number(snapshot.data().longBreakDuration);
      $(".profile-tree .amount").value = Number(snapshot.data().trees);
      // dedault
      pomodoroSettingTime()
      processInput()
    }
  );
}
function updateInfoToFirebase() {
  const pomoDura = !isNumber($(".pomodoro-duration .setting-input").value) ? 25 : Math.ceil(Number($(".pomodoro-duration .setting-input").value));
  const shortDura = !isNumber($(".short-duration .setting-input").value) ? 5 : Math.ceil(Number($(".short-duration .setting-input").value));
  const longDura = !isNumber($(".long-duration .setting-input").value) ? 15 : Math.ceil(Number($(".long-duration .setting-input").value));
  $(".pomodoro-duration .setting-input").value = pomoDura;
  $(".short-duration .setting-input").value = shortDura;
  $(".long-duration .setting-input").value = longDura;
  updateDoc(doc(db, "users", window.sessionStorage.getItem("UID")), {
    pomodoroDuration: pomoDura,
    shortBreakDuration: shortDura,
    longBreakDuration: longDura,
    trees: Number($(".profile-tree .amount").value),
  })
    .then()
    .catch();
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) && n>0;
}
// done
onAuthStateChanged(auth, (userCred) => {
  if (userCred) {
    toast({
      title: "Success",
      messenger: "Login Succesful",
      type: "success",
      duration: 1000,
    });
    window.sessionStorage.setItem("UID", userCred.uid);
    document.querySelector(".gmail").innerHTML = userCred.email;
    updateTagsFromFirebase();
    updateInfoFromFirebase();
    printQueriedTasksFromFirebase("isDone", false);
  } else {
    window.sessionStorage.removeItem("UID");
    window.location = "login.html";
  }
});

function updateTagsFromFirebase() {
  getDoc(doc(db, "users", window.sessionStorage.getItem("UID"))).then(
    (snapshot) => {
      suggestTags();
    }
  );
}

function suggestTags() {
  let tags = ["Home", "Freetime", "Work", "School"];
  const tagSuggest = $(".tags-box");
  const newElement = document.createElement("datalist");
  const htmls = tags.map((tag) => {
    return `
		<option value=${tag}>
		`;
  });
  newElement.id = "suggestions";
  newElement.innerHTML = htmls.join("");
  tagSuggest.appendChild(newElement);
}

function updateTreeToFirebase(tree) {
  updateDoc(doc(db, "users", window.sessionStorage.getItem("UID")), {
    trees: tree,
  })
    .then()
    .catch();
}

export {
  printQueriedTasksFromFirebase,
  printTasksFromFirebase,
  updateTreeToFirebase,
};
