// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js"
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
  measurementId: "G-BM2RQKSZ5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();


const saveBtn = document.querySelector('.save-btn')
saveBtn.addEventListener('click', (e) => {
	if(e.target.id != ""){
		console.log(e.target.id);
		updateTaskToFirebase(e.target.id);
	}
	else {
		addTaskToFirebase()
	}
	taskModal.style.display = "none";
	printQueriedTasksFromFirebase('isDone', false);
	// $(`.${filterMode}`).click();
	resetModalTask()
})

// accept setting
const settingSave = document.querySelector('.setting__modal .setting-btn');
settingSave.addEventListener("click", function() {
	updateInfoToFirebase();
  document.querySelector('.setting__modal').style.display = "none";
	pomodoroSettingTime()
	stopCountDown()
})


// event done-all button
const doneAllBtn = document.querySelector('.done-all');
doneAllBtn.addEventListener('click',function(){
	const doneBtns = $$('.task .btn-check');
  doneBtns.forEach(doneBtn => {
		console.log(doneBtn.id);
		console.log(doneBtn);
		uploadDoneTaskToFirebase(doneBtn.id)
	})
	printQueriedTasksFromFirebase('isDone', false);
	
})

const profileUpdate = document.querySelector('.nav__items .profile')
profileUpdate.addEventListener('click',function(){
	document.querySelector('.profile__modal').style.display = "block";
	updateInfoToFirebase();
})

// event delete-all button
// const deleteAllBtn = document.querySelector('.delete-all');
document.querySelector('.delete-all').addEventListener('click',function(){
	const doneBtns = $$('.task .btn-check');
  doneBtns.forEach(doneBtn => {
		console.log(doneBtn.id)
		deleteTaskFromFirebase(doneBtn.id)
	})
	printQueriedTasksFromFirebase('isDone', false);
	// $(`.${filterMode}`).click();
})

const logoutBtn =document.querySelector('.logout');
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
      signOut(auth)
        .then(() => {
          window.location = "login.html"
        }).catch((error) => {
          alert(error.message)
        }); 
})

function addTaskToFirebase() {
    let date = settingToday();
    let newDate = dateTask.value == "" ? date : dateTask.value;
    let newTitle = titleTask.value == "" ? "New Note" : titleTask.value;
	addDoc(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'), {
    title: newTitle,
    date: newDate,
    tag: tagsTask.value,
    description: descTask.value,
		isDone: false,
	}).then(console.log('task added'))
	.catch(err => console.log(err, "add file to firebase failed"));
}

function updateTaskToFirebase(idTask) {
	let date = settingToday();
	let newDate = dateTask.value == "" ? date : dateTask.value;
	let newTitle = titleTask.value == "" ? "New Note" : titleTask.value;
updateDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks', idTask), {
	title: newTitle,
	date: newDate,
	tag: tagsTask.value,
	description: descTask.value,
}).then(console.log('task update'))
.catch(err => console.log(err, "update file to firebase failed"));
}

function printTasksFromFirebase() {
	$('.tasklist__box .header .name').innerHTML = `All Tasks`;
	getDocs(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'))
	.then(snapshot => {
		let htmls = snapshot.docs.map((task) => {
			let icon = task.data().isDone == true ? "times-circle" : "check-circle";
			console.log(task)
				const newElement =  `
					<div class="task" data-id-task="${task.id}" data-isDone="${task.data().isDone}">
						<div class="btn-check" id="${task.id} ${task.data().isDone}">
							<i class="fas fa-${icon}"></i>
						</div>
						<div class="name">
							<div class="title">${task.data().title}</div>
							<div class="date">${task.data().date}</div>
							<div class="note">${task.data().description}</div>
						</div>
						<div class="btn-option" id="${task.id}">
							<i class="fas fa-ellipsis-v"></i>
						</div>
					</div>
					`;
				return newElement;
		})
		$('.tasks').innerHTML = htmls.join('');
		addOptionEvent();
		addDoneEvent()
	})
}

function printQueriedTasksFromFirebase(field, value) {
	$('.tasklist__box .header .name').innerHTML = `${value} Tasks`;
	$('.tasks').innerHTML = '';
	getDocs(query(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'), where(field, "==", value)))
	.then(snapshot => {
		let htmls = snapshot.docs.map((task) => {
				let icon = task.data().isDone == true ? "times-circle" : "check-circle";
				const newElement =  `
					<div class="task" data-id-task="${task.id}" data-isDone="${task.data().isDone}">
						<div class="btn-check" id="${task.id}">
							<i class="fas fa-${icon}"></i>
						</div>
						<div class="name">
							<div class="title">${task.data().title}</div>
							<div class="date">${task.data().date}</div>
							<div class="note">${task.data().description}</div>
						</div>
						<div class="btn-option" id="${task.id}">
							<i class="fas fa-ellipsis-v"></i>
						</div>
					</div>
					`;
				return newElement;
		})
		$('.tasks').innerHTML = htmls.join('');
		addOptionEvent();
		addDoneEvent();
	})
}

function addOptionEvent() {
	const optionBtns = $$('.task .btn-option');
    optionBtns.forEach(optionBtn => {
      optionBtn.addEventListener('click', function(e){
        let taskEdit;
        if (e.target.classList == "btn-option"){
          taskEdit = e.currentTarget.parentNode;
        } 
        else if (e.target.parentNode.classList == "btn-option"){
          taskEdit = e.currentTarget.parentNode;
        }
				$('.modal-name').innerHTML = "Edit Task"; 
        taskModal.style.display = "block";
        deleteBtn.style.display = "block";
				// get data
				const idTask = taskEdit.getAttribute('data-id-task')
				getDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks', idTask))
				.then(snapshot => {console.log(snapshot.data())
					$('#title').value = snapshot.data().title;
					$('#date').value = snapshot.data().date;
					$('#tags').value = snapshot.data().tag;
					$('#description').value = snapshot.data().description;
					$('.task__modal .save-btn').id = idTask;
					deleteBtn.id = idTask;
					deleteBtn.addEventListener('click', function(){
						deleteTaskFromFirebase(idTask);
						// test
						taskModal.style.display = "none";
						printQueriedTasksFromFirebase('isDone', false);
						// $(`.${filterMode}`).click();
					})
				})
				.catch(err => console.log(err,"Get data error"))
      })
    });
}

// change status true
function addDoneEvent() {
	const doneBtns = $$('.task .btn-check');
    doneBtns.forEach(doneBtn => {
      doneBtn.addEventListener('click', function(e){
				console.log(e.target.classList)
        let taskDone;
        if (e.target.classList== "btn-check"){
          taskDone = e.currentTarget.parentNode;
        } 
        else if (e.target.parentNode.classList == "btn-check"){
          taskDone = e.currentTarget.parentNode;
				console.log(taskDone.getAttribute('data-isDone'))
				// get data
				const isDone = taskDone.getAttribute('data-isDone')
				const idTask = taskDone.getAttribute('data-id-task')
				if (isDone == 'true') {
					uploadNotDoneTaskToFirebase(idTask);
				}
				else if(isDone == 'false'){
					uploadDoneTaskToFirebase(idTask);
				}
				printQueriedTasksFromFirebase('isDone', false);
				// $(`.${filterMode}`).click();
				}
      })
    });
}

// get today 
function settingToday() {
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth()+1 <10 ? '0'+today.getMonth()+1 : today.getMonth()+1;
	let day = today.getDate() <10 ? '0'+today.getDate() : today.getDate();
	return `${year}-${month}-${day}`;
}

function uploadDoneTaskToFirebase(ID) {
	updateDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks', ID), {
		isDone: true,
	})
	.then()
	.catch()
}
function uploadNotDoneTaskToFirebase(ID) {
	updateDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks', ID), {
		isDone: false,
	})
	.then()
	.catch()
}
function deleteTaskFromFirebase(ID) {
	deleteDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks',ID))
}
function resetModalTask(){
	titleTask.value = '';
	dateTask.value = '';
	tagsTask.value = '';
	descTask.value = '';
}

function updateInfoFromFirebase() {
	getDoc(doc(db, 'users', window.sessionStorage.getItem('UID')))
	.then(snapshot => {
		console.log(snapshot.data() == undefined)
		let pomo = snapshot.data() == undefined ? 25 : Number(snapshot.data().pomodoroDuration);
		$('.pomodoro-duration .setting-input').value = Number(snapshot.data()) == undefined ? 25 : Number(snapshot.data().pomodoroDuration);
		$('.short-duration .setting-input').value = Number(snapshot.data()) == undefined ? 5 : Number(snapshot.data().shortBreakDuration);
		$('.long-duration .setting-input').value = Number(snapshot.data()) == undefined ? 15 : Number(snapshot.data().longBreakDuration);
		$('.profile-tree .amount').value = Number(snapshot.data().trees)
		// dedault
		$('.timestamp').innerHTML = `${pomo}:00`;
		startingMinutes =  Math.floor(pomo);
		time = startingMinutes * 60;
	})
}
function updateInfoToFirebase() {
	updateDoc(doc(db, 'users', window.sessionStorage.getItem('UID')), {
		pomodoroDuration: Math.ceil(Number($('.pomodoro-duration .setting-input').value)),
		shortBreakDuration:  Math.ceil(Number($('.short-duration .setting-input').value)),
		longBreakDuration:  Math.ceil(Number($('.long-duration .setting-input').value)),
		trees: Number($('.profile-tree .amount').value)
	})
	.then()
	.catch()
}
// done
onAuthStateChanged(auth, userCred => {
	if (userCred) {
		window.sessionStorage.setItem('UID', userCred.uid)
		document.querySelector('.gmail').innerHTML = userCred.email;
		updateTagsFromFirebase()
		updateInfoFromFirebase()
		printQueriedTasksFromFirebase('isDone', false);
	} else {
		window.sessionStorage.removeItem('UID')
		window.location = "login.html";
};
	console.log(userCred);
});

function updateTagsFromFirebase() {
	getDoc(doc(db, 'users', window.sessionStorage.getItem('UID')))
	.then(snapshot => {
		suggestTags()
	})
}

function suggestTags() {
	let tags = ["Home", "Freetime", "Work", "School"]
	const tagSuggest = $('.tags-box');
	const newElement = document.createElement("datalist");
	const htmls = tags.map((tag => {
		return `
		<option value=${tag}>
		`;
	}));
	newElement.id = "suggestions";
	newElement.innerHTML = htmls.join('');
	tagSuggest.appendChild(newElement);
	console.log(newElement);
}
export {printQueriedTasksFromFirebase, printTasksFromFirebase};