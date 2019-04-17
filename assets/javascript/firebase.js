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

// Allows user to select account on login
provider.setCustomParameters({
    prompt: 'select_account'
});

const userDecisionState = {
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
        _getLocationCards();

        // Displays content based on user decision state
        users.child(auth.currentUser.uid).once('value', function (snap) {
            const userInfo = snap.val();

            if (userInfo.decision === userDecisionState.QUESTIONNAIRE) {

                _showQuestionnaire();
            } else if (userInfo.decision === userDecisionState.ITINERARY) {
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

function _signInWithGoogle() {
    auth.signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        // console.log(result.user)
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

function _signOutUser() {
    auth.signOut().then(function () {
        // Sign-out successful.
        console.log('logged out successfully')
    }).catch(function (error) {
        console.log(error);
        // An error happened.
    });
}

// Internal function to create user profile
function _createProfile() {
    users.child(auth.currentUser.uid).once('value', function (snap) {
        if (!snap.val) {
            users.child(auth.currentUser.uid).update({
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
                decision: userDecisionState.UNDECIDED,
            });
        }
    });
}

// Update user profile in DB
function _updateProfileInDB(payload) {
    users.child(auth.currentUser.uid).once('value', function (snap) {
        if (snap.exists()) {
            users.child(auth.currentUser.uid).update(payload);
        } else {
            console.log('user with userId ' + auth.currentUser.uid + ' does not exist.');
        }
    });
}

// Create new LocationCard in DB
function _addLocationCardToDB(payload) {
    payload['name'] = auth.currentUser.displayName;
    payload['userId'] = auth.currentUser.uid
    locationCards.push(
        payload
        , function (error) {
            console.log(error);
        }
    );
}

function _getLocationCards() {
    locationCards.orderByChild('userId').limitToLast(1).equalTo(auth.currentUser.uid).once('value', function (snapshot) {
        let cards = snapshot.val();
        if (!cards) {
            cards = [];
        }
        _showLocationCards(Object.values(cards)[0]);
    });
}

function _deleteAllLocationCardsForUser() {
    locationCards.orderByChild('userId').equalTo(auth.currentUser.uid).once('value', function (snapshot) {
        const updates = {};
        snapshot.forEach(child => updates[child.key] = null);
        locationCards.update(updates);
    });
}

// Add message to DB
function _addMessageToDB(message) {
    if (!auth.currentUser) {
        console.log('You must log in to comment');
        return;
    }
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
    chat.limitToFirst(50).on('child_added', function (snap) {
        const message = snap.val();
        _displayMessage(message);
    }, function (error) {
        console.log(error)
    });
}

// Switches user decision state in profile. Decision is a string
function _switchDecisionInDB(decision) {
    _updateProfileInDB({ decision: decision })
}

