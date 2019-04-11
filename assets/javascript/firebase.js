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

// Log in provider
const provider = new firebase.auth.GoogleAuthProvider();


const userDecisionState = {
    UNDECIDED: 'UNDECIDED',
    QUESTIONNAIRE: "QUESTIONNAIRE",
    ITINERARY: 'ITINERARY'
}

// Observer on authentication change (ex. login, logout)
auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log('user logged in');

        _displayLoggedInUI();
        _monitorChat();
        
        users.child(user.uid).once('value', function (snap) {
            const userInfo = snap.val();
            if (userInfo.decision === userDecisionState.UNDECIDED) {
                _showDecisionDiv()
            } else if (user.decision === userDecisionState.QUESTIONNAIRE) {
                _showQuestionnaire();
            } else if (user.decision === userDecisionState.ITINERARY) {
                _showItinerary();
            } else {
                console.log("User does not have a decision. Problem in user profile. Check Firebase")
            }
        });
    } else {
        // No user is signed in.
        console.log('user logged out');
        _displayLoggedOutUI();
    }
});

function signInWithGoogle() {
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        console.log(result.user)
        _createProfile();

    }).catch(function (error) {
        console.log('error', error)
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
    });
}

function signOutUser() {
    auth.signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        console.log(error);
        // An error happened.
    });
}

// Internal function to create user profile
function _createProfile() {
    users.child(auth.currentUser.uid).update({
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
    });
}

// Update user profile in DB
function updateProfileInDB(payload) {
    users.child(auth.currentUser).once('value', function (snap) {
        if (snap.exists()) {
            users.child(auth.currentUser).update(payload);
        } else {
            console.log('user with userId ' + auth.currentUser + ' does not exist.');
        }
    });
}

// Create new LocationCard in DB
function addLocationCardToDB(payload) {
    locationCards.push(
        {
            location: payload.location,
            hotel: payload.hotel,
            activity: payload.activity,
            name: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
        },
        function (error) {
            console.log(error);
        });
}

function deleteAllLocationCardsForUser() {

}

// Add message to DB
function addMessageToDB(message) {
    chat.push({
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        message: message
    }, function (error) {
        console.log(error);
    });
}

// Observes changes in chat
function _monitorChat() {
    chat.on('child_added', function (snap) {
        const message = snap.val();
        _displayMessage(message);
    }, function (error) {
        console.log(error)
    });
}

