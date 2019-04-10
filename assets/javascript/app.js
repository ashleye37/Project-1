$("#login").click(function() {
    signInWithGoogle();
});

// Adds new chat messages to DOM. Is automatically called on submitMessage() call
function addMessage(message) {
    console.log("new message", message)
    const messageElem = $('<ul><strong>' + message.name + ': </strong>' + message.message)
    $('#messages').append(messageElem)
}