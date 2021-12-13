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
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
const SignupForm = document.querySelector("#Sign-up");
const announce = document.querySelector("#announce");
const db = getFirestore();

SignupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = SignupForm["email"].value;
  const password = SignupForm["password"].value;
  // const lenght = SignupForm['password'].value.length;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // sau khi đã đăng nhập được thì xử lý trong đây
      const user = userCredential.user;
      createUserProfile(userCredential.user.uid)
        .then(() => {
          // in ra innerHTML bạn đã đăng nhập thành công
          window.location.assign("index.html");
        })
        .catch((err) => {
          toast({
            title: 'Error',
            messenger: `Fail To Create Account`,
            type: 'error',
            duration: 3000
          });
        });
    })
    .catch((err) => {
      toast({
        title: 'Warning',
        messenger: 'Email Address Has Been Used',
        type: 'warning',
        duration: 3000
      });
    });
        
});

function createUserProfile(UID) {
  return setDoc(doc(db, "users", UID), {
    trees: 0,
    pomodoroDuration: 25,
    shortBreakDuration: 10,
    longBreakDuration: 15,
    tags: ["Home", "Freetime", "Work", "School"],
  });
}
