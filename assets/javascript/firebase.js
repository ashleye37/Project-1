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
const database = firebase.database();
const users = database.ref('/users')
let user;

const provider = new firebase.auth.GoogleAuthProvider();

// Observer on authentication change (ex. login, logout)
auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      users.child("78LeTE60xjRtlOM1iQ2KbiytMUm1").once('value', function(snap) {
          console.log(snap.val())
      })
      users.child("iWYC9DWG57PhPG3WtceepzKN0O82").once('value', function(snap) {
        console.log(snap.val())
    })
   
    } else {

      // No user is signed in.
    }
  });

function createProfile() {
    users.child(user.uid).update({
        name: user.displayName,
        id: user.uid
    })
}

function signInWithGoogle() {
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;

        // console.log(token)
        // The signed-in user info.
        user = result.user;
        createProfile()
        
    }).catch(function (error) {
        console.log(error)
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


// Does not seem to signout??
function signOutUser() {
    auth.signOut().then(function () {
        console.log('Signed out successfully')
        // Sign-out successful.
    }).catch(function (error) {
        console.log(error)
        // An error happened.
    });
}



signInWithGoogle()


  