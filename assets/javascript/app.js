const HomePageUrl = "/landingpage.html";


// Login
$("#login").click(function() {
    signInWithGoogle();
});

// Logout
$("#logout").click(function() {
    signOutUser();
});

// Adds new chat messages to DOM. Is automatically called on submitMessage() call
function _addMessage(message) {
    const messageElem = $('<ul><strong>' + message.name + ': </strong>' + message.message)
    $('#messages').append(messageElem)
}

function redirectToHomePage() {    
    $(location).attr('href',HomePageUrl);
}