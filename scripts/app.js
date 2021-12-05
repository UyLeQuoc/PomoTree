// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js"
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
const usersColRef = collection(db, 'users');
const tasksColRef = collection(db, 'users', 'username1', 'tasks');

printTasksFromFirebase()

const saveBtn = document.querySelector('.save-btn')
saveBtn.addEventListener('click', (e) => {
	if(e.target.id != ""){
		deleteTaskFromFirebase(e.target.id)
	}
	addTaskToFirebase()
	taskModal.style.display = "none";
	printTasksFromFirebase()
	resetModalTask()
})

// event done-all button
const doneAllBtn = document.querySelector('.done-all');
doneAllBtn.addEventListener('click',function(){
	const doneBtns = $$('.task .btn-check');
  doneBtns.forEach(doneBtn => {
		uploadDoneTaskToFirebase(doneBtn.id)
	})
	printTasksFromFirebase()
})

// event delete-all button
// const deleteAllBtn = document.querySelector('.delete-all');
document.querySelector('.delete-all').addEventListener('click',function(){
	const doneBtns = $$('.task .btn-check');
  doneBtns.forEach(doneBtn => {
		console.log(doneBtn.id)
		deleteTaskFromFirebase(doneBtn.id)
	})
	printTasksFromFirebase()
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

function printTasksFromFirebase() {
	getDocs(collection(db, 'users', window.sessionStorage.getItem('UID'), 'tasks'))
	.then(snapshot => {
		let htmls = snapshot.docs.map((task) => {
			if (!task.data().isDone){
				const newElement =  `
					<div class="task" data-id-task="${task.id}">
						<div class="btn-check" id=${task.id}">
							<i class="fas fa-check-circle"></i>
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
			}
		})
		$('.tasks').innerHTML = htmls.join('');
		addOptionEvent();
		addDoneEvent()
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
						printTasksFromFirebase()
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
        let taskDone;
        if (e.target.classList == "btn-check"){
          taskDone = e.currentTarget.parentNode;
        } 
        else if (e.target.parentNode.classList == "btn-check"){
          taskDone = e.currentTarget.parentNode;
        }
				console.log(taskDone)
				// get data
				const idTask = taskDone.getAttribute('data-id-task')
				uploadDoneTaskToFirebase(idTask)
				printTasksFromFirebase();
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
function deleteTaskFromFirebase(ID) {
	deleteDoc(doc(db, 'users', window.sessionStorage.getItem('UID'), 'tasks',ID))
}
function resetModalTask(){
	titleTask.value = '';
	dateTask.value = '';
	tagsTask.value = '';
	descTask.value = '';
}



//done
const login = document.querySelector('.login');
login.addEventListener('submit', (e) => {
	e.preventDefault();
	signInWithEmailAndPassword(auth, login.email.value, login.password.value)
		.then()
		.catch(err => console.log(err));
})

//done
const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {
	signOut(auth)
		.then(() => console.log('user loged out'))
		.catch(err => console.log(err));
})

// done
const signup = document.querySelector('.signup');
signup.addEventListener('submit', (e) => {
	e.preventDefault();
	createUserWithEmailAndPassword(auth, signup.email.value, signup.password.value)
		.then((cred) => {createUserProfile(cred.user.uid)})
		.catch(err => console.log(err.message))
})

// done
onAuthStateChanged(auth, userCred => {
	if (userCred) {window.sessionStorage.setItem('UID', userCred.uid)} else {window.sessionStorage.removeItem('UID')};
	console.log(userCred);
});


function createUserProfile (UID){
	setDoc(doc(db, 'users', UID), {
		// upload firebase

	})
	.then(console.log('user profile created'))
	.catch(err => console.log(err));
}