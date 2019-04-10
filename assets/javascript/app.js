// Initialize Firebase
var config = {
    apiKey: "AIzaSyC4w_sKxawc7RxtTQmqD4OHAfuOJm8HiIs",
    authDomain: "trip-bot-87adb.firebaseapp.com",
    databaseURL: "https://trip-bot-87adb.firebaseio.com",
    projectId: "trip-bot-87adb",
    storageBucket: "trip-bot-87adb.appspot.com",
    messagingSenderId: "623665369642"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log(token)
    // console.log(token)
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    // ...
}).catch(function (error) {
    console.log(error)
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});