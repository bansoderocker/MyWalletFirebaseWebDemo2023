var db = undefined;
var user = undefined;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_rBak5Zb7rlQmBK70y4rHOI-fnDlvhp0",
    authDomain: "mywallet-afcbb.firebaseapp.com",
    databaseURL: "https://mywallet-afcbb-default-rtdb.firebaseio.com",
    projectId: "mywallet-afcbb",
    storageBucket: "mywallet-afcbb.appspot.com",
    messagingSenderId: "261378138156",
    appId: "1:261378138156:web:3b20797308f7abfd2ab189",
    measurementId: "G-RRH82BBVYG"
};


window.addEventListener('load', async function () {
   // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
      //  firebase.app(); // if already initialized, use that one
     }
    db = firebase.database();
    //activate();
});