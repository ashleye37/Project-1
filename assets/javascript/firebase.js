// Initialize Firebase
const config = {
    apiKey: "AIzaSyC4w_sKxawc7RxtTQmqD4OHAfuOJm8HiIs",
    authDomain: "trip-bot-87adb.firebaseapp.com",
    databaseURL: "https://trip-bot-87adb.firebaseio.com",
    projectId: "trip-bot-87adb",
    storageBucket: "trip-bot-87adb.appspot.com",
    messagingSenderId: "623665369642"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database()
let user;

const provider = new firebase.auth.GoogleAuthProvider();

// Observer on authentication change (ex. login, logout)
auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   console.log('signed in', user)
    } else {
      // No user is signed in.
    }
  });

function signInWithGoogle() {
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // console.log(token)
        // The signed-in user info.
        user = result.user;
        console.log(user)
        // console.log(auth.currentUser)
        user.updateProfile({
            
        })
       


    }).catch(function (error) {
        console.log(eror)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
    });
}


function signOutUser() {
    auth.signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}



signInWithGoogle()


  