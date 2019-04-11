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

$('#send-message').click(function() {
    const message = $('#message-input').val().trim();
    addMessageToDB(message);
})

function createLocationCard() {
    // TODO get locationCard info from client
    addLocationCardToDB(locationCard)
}