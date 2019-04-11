// Login
$("#login").click(function() {
    signInWithGoogle();
});

// Logout
$("#logout").click(function() {
    signOutUser();
});

// Adds new chat messages to DOM. Is automatically called on submitMessage() call
function _displayMessage(message) {
    const messageElem = $('<ul><strong>' + message.name + ': </strong>' + message.message)
    $('#messages').append(messageElem)
}

// Send message to DB from client
$('#send-message').click(function() {
    const message = $('#message-input').val().trim();
    addMessageToDB(message);
})

// Update user profile. 
// profileObj is an object. Ex profileObj = {name: 'me', location: 'Seattle'}
function updateProfileTo(profileObj) {
    updateProfileInDB(profileObj)
}

// Create locationCard and send it to DB from client
function createLocationCard() {
    // TODO get locationCard info from client
    addLocationCardToDB(locationCard)
}

// Only show login element
function showLogin() {

}

// Show initial decision (I know where I want to go / No idea) 
function showDecisionDiv() {

}

// Show questionnaire
function showQuestionnaire() {

}

// Show itinerary page
function showItinerary() {
    
}