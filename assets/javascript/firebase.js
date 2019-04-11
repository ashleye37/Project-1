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
const locationCards = database.ref('/locationCards');
const chat = database.ref('/chat');
let user;

// Log in provider
const provider = new firebase.auth.GoogleAuthProvider();

// Observer on authentication change (ex. login, logout)
auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log('user logged in');
        _monitorChat();


        // redirectToHomePage()
        users.child(user.uid).once('value', function(snap) {
            if (snap.val().ready) {
                console.log('ready')
            }
        })



    } else {
        // No user is signed in.
        console.log('user logged out');
    }
});

function signInWithGoogle() {
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;

        // The signed-in user info.
        user = result.user;
        _createProfile();

    }).catch(function (error) {
        console.log(error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
    });
}

// Does not seem to signout??
function signOutUser() {
    auth.signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        console.log(error);
        // An error happened.
    });
}

function _createProfile() {
    users.child(user.uid).update({
        name: user.displayName,
        id: user.uid
    });
}

// Update user profile
function updateProfile(userId, payload) {
    users.child(userId).once('value', function (snap) {
        if (snap.exists()) {
            users.child(userId).update(payload);
        } else {
            console.log('user with userId ' + userId + ' does not exist.');
        }
    });
}

// Create new LocationCard
function createLocationCard(payload) {
    locationCards.push({
        location: payload.location,
        name: payload.name,
        userId: payload.userId,
    }, function(error) {
        console.log(error);
    });
}

// Add message to DB
function submitMessage(payload) {
    chat.push({
        name: payload.name,
        message: payload.message
    }, function(error) {
        console.log(error);
    });
}

// Observes changes in chat
function _monitorChat() {
    chat.on('child_added', function(snap) {
        const message = snap.val();
        _addMessage(message);
    }, function(error) {
        console.log(error)
    });
}

