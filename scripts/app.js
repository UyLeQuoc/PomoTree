// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
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

const db = getFirestore();
const colRef = collection(db, 'users');

getDocs(colRef)
	.then(snapshot => {
		snapshot.docs.forEach(doc => {
			// console.log(doc._document.data.value.mapValue.fields);
			console.log(doc.data());
			users = doc.data();
		}) 
		// console.log(snapshot);
	})
	.catch(err => console.log(err))


