// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/**
 * Config = 機密情報です！！！
 * この部分はGitHubに上げないこと！！！！！！！
 */
//
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const dbRef = ref(database, "chat");

function sendmessage(userName, text){
  const message = {
    userName: userName,
    userName1: "",
    text: text,
    text1: "",
  };
  const newPostRef = push(dbRef);
  set(newPostRef, message);
  $("#text").val('');
}

$("#send").on("click", function () {
  const userName = $("#userName").val();
  const text = $("#text").val();
  sendmessage(userName,text)
});

$("#send1").on("click", function () {
  const userName1 = $("#userName1").val();
  const text1 = $("#text1").val();
  const message = {
    userName: "",
    userName1: userName1,
    text: "",
    text1: text1,
  };
  const newPostRef = push(dbRef);
  set(newPostRef, message);
  $("#text1").val('');
});

onChildAdded(dbRef, function (data) {
  const message = data.val();
  const key = data.key;
  console.log(data, message, key);
  let chatMsg = `
<div class="block">
  <div class="name">${message.userName}</div><div class="yourname">${message.userName1}</div><br>
  <div class="honbun">${message.text}</div><div class="yourhonbun">${message.text1}</div><br>
</div>
`;
  $("#output").append(chatMsg);
});

function signUpUser(email,password){
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(function(userinfo){
      console.log("サインアップ成功：", userinfo.user);
    })
    .catch(function(error){
      console.log(error);
    })
}

function loginuser(email,password){
  const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(function(userinfo){
      console.log("ログイン成功：", userinfo.user);
      location.href = "you.html";
    })
    .catch(function(error){
      console.log(error);
      console.log("失敗")
    })
}

$("#signup-button").on('click', function(){
  const email = $("#signup-email").val();
  const password = $("#signup-password").val();
  signUpUser(email,password);
})

$("#login-button").on('click', function(){
  const email = $("#login-email").val();
  const password = $("#login-password").val();
  loginuser(email,password);
})

$("#logout-button").on('click', function(){
  const auth = getAuth();

  signOut(auth)
    .then(function(){
      location.href="login.html";
    })
    .catch(function(){
      $("#message").html(error);
    });
});
