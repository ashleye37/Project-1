// Login
$("#login").click(function() {
    signInWithGoogle();
});

// Logout
$("#logout").click(function() {
    signOutUser();
});

// Displays only .logged-in elements to logged in users. Automatically called on login
function _displayLoggedInUI() {
    $('.logged-in').show();
    $('.logged-out').hide();
    console.log('_displayLoggedInUI')
}

// Displays only .logged-out elements to logged out users. Automatically called on logout
function _displayLoggedOutUI() {
    $('.logged-in').hide();
    $('.logged-out').show();
    console.log('_displayLoggedOutUI')
}

// Adds new chat messages to DOM. Automatically called after submitting message
function _displayMessage(message) {
    const messageElem = $('<ul><strong>' + message.name + ': </strong>' + message.message);
    $('#messages').append(messageElem);
}

// Send message to DB from client
$('#send-message').click(function() {
    const message = $('#message-input').val().trim();
    addMessageToDB(message);
})

// Update user profile. 
// profileObj is an object. Ex profileObj = {location: 'Seattle', hotel: '<hotel id>'}
function updateProfile(profileObj) {
    updateProfileInDB(profileObj)
}

// Create locationCard and send it to DB from client
function createLocationCard() {
    // TODO get locationCard info from client
    // TODO know what info wil be on card

    addLocationCardToDB(locationCard)
}

// Show initial decision (I know where I want to go / No idea) div
function _showDecisionDiv() {
    console.log('Showing decision div')
    $('#knowDestination').show();

}

// Show questionnaire div
function _showQuestionnaire() {
    console.log('Showing questionnaire')

}

// Show itinerary div
function _showItinerary() {
    console.log('Showing itinerary')
    
}