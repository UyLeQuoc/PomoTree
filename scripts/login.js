import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpT519AsxmZ0zqTx9Aw9ZqLmcQZs6gmkE",
  authDomain: "mockdb-123.firebaseapp.com",
  projectId: "mockdb-123",
  storageBucket: "mockdb-123.appspot.com",
  messagingSenderId: "841215532441",
  appId: "1:841215532441:web:a21f0d9410f0ef4a360708",
  measurementId: "G-BM2RQKSZ5S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const errorinner = document.querySelector("#error");
const LoginForm = document.querySelector("#Login");
const forgot = document.querySelector(".forgot");
const popup = document.querySelector("#mail-verify");
const close = document.querySelector(".closeIcon");
const body = document.querySelector(".body");
const signIn = document.querySelector(".sign-in");
/// login form
const FormMail = document.querySelector("#mail");
const decor = document.querySelectorAll(".decor");

FormMail.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = FormMail["email"].value;
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast({
        title: "Reset Password Successful",
        messenger: `Please check email to change your password`,
        type: "success",
        duration: 4000,
      });
    })
    .catch((error) => {
      toast({
        title: "Reset Password Failed",
        messenger: `Wrong Email`,
        type: "error",
        duration: 3000,
      });
    });
});
LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = LoginForm["email"].value;
  const password = LoginForm["password"].value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "index.html";
    })
    .catch((error) => {
      toast({
        title: 'Error',
        messenger: 'Username or Password is Incorrect',
        type: 'error',
        duration: 3000
      });
    });
});

// popup verify email

forgot.addEventListener("click", (e) => {
  e.preventDefault();
  popup.style.display = "block";
  signIn.style.display = "none";
  body.classList.add("bodyStyle");
  for (let i = 0; i <= decor.length; i++) {
    decor[i].src = "./images/rabbit.png";
  }
});
close.onclick = function () {
  popup.style.display = "none";
  signIn.style.display = "block";
  body.classList.remove("bodyStyle");
  for (let i = 0; i <= decor.length; i++) {
    decor[i].src = "./images/favorite.png";
  }
};
// window.onclick = function (event) {
//   if (event.target == popup) {
//     popup.style.display = "none";
//     signIn.style.display = "block";
//     body.classList.remove("bodyStyle");
//     for (let i = 0; i <= decor.length; i++) {
//       decor[i].src = "./images/favorite.png";
//     }
//   }
// };
