

// **************************
// PLEASE READ!
// **************************
// Helper functions for UI
// Feel free to edit the body of the functions, but let me know if you want to change their names since they interact with Firebase. 
// The functions prepended with an underscore are automatically called, and should not be called elsewhere


// Login
$("#login").click(function () {
    signInWithGoogle();
});

// Logout
$("#logout").click(function () {
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
    const messageElem = $('<li class="list-group-item">')
        .append('<p class="message"><strong>' + message.name + ': </strong>' + message.message + '</p>');
    const allMessagesElem = $('#messages');
    allMessagesElem.append(messageElem);
    allMessagesElem.scrollTop($('#messages').prop("scrollHeight"));
}

// Send message to DB from client
$('#send-message').click(function (event) {
    event.preventDefault();

    const messageText = $('#message-input').val().trim();
    if (!messageText.length) { // Handle empty message
        $('#message-empty').show();
        event.stopPropagation();
        return;
    }
    // Message has characters. Add to DB
    addMessageToDB(messageText);
    $('#message-input').val('');
    $('#message-empty').hide();
})

// Update user profile. 
// profileObj is an object. Ex profileObj = {location: 'Seattle', hotel: '<hotel id>'}
function updateProfile(profileObj) {
    updateProfileInDB(profileObj)
}

// Retrieves all location cards for user and displays them. Automatically called on login
function _showLocationCards(locationCards) {
    locationCards.forEach(card => {
        console.log(card)
    })
}

// Create locationCard and send it to DB from client
function createLocationCard() {
    // TODO get locationCard info from client
    // TODO know what info wil be on card

    addLocationCardToDB(locationCard);
}

// Show initial decision (I know where I want to go / No idea) div
function _showDecisionDiv() {
    console.log('Showing decision div')
    $('#knowDestination').show();

}

// Show questionnaire div
function _showQuestionnaire() {
     // array of objects with the questions and possible answers
     var quizQuestions = [
        {
            question: "Who will you be traveling with?",
            choices: ["Solo travel!", "With my gals or guys!", "With my main squeeze!", "Family get away with the kids!"],
        },
        {
            question: "What is your favorite weather for vacation?",
            choices: ["HOT! 85 degrees or more!", "Warm! 70-84 degrees", "Mild - 50-69 degrees", "Freeze me! Below 50 degrees"],
        },
        {
            question: "How long would you like your trip to last?",
            choices: ["Less than 1 week", "1-2 weeks", "2 weeks - 1 month", "More than a month"],
        },
        {
            question: "Trip Budget?",
            choices: ["Under $2,500", "$3,500 - $5,000", "$5,000-$7,000", "Over $7,000"],
        },
        {
            question: "Are you interested in seeing attraction suggestions?",
            choices: ["Yes", "No"],
        },
        {
            question: "Are you interested in seeing hotel suggestions?",
            choices: ["Yes", "No"],
        },
        {
            question: "Are you interested in seeing restaurant suggestions?",
            choices: ["Yes", "No"],
        }

    ];


    // pull questions from the array of questions, loop through them, and append to UI
    var questionContainer = $("#questions");
    questionContainer.append("<h4>Please answer the following questions to help us customize your trip planning experience.</h4>");

    for(var i=0; i<quizQuestions.length; i++){
        questionContainer.append("<div>"+quizQuestions[i].question+"</div>");
        
    };

    for (var i=0; i<quizQuestions.choices.length;i++){
        questionContainer.choices.prepend($("<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>'"));
        questionContainer.choices.attr({"data-index":i});
        questionContainer.choices.addClass("thisChoice");
        $("#questions").append(questionContainer.choices);
    };
    //on submit click, takes user's answers uses data to make api call to get relevant itinerary information. 
    $("#questionBtn").on("click")

    console.log('Showing questionnaire')

};
//call questions function for testing
_showQuestionnaire();

// Show itinerary div
function _showItinerary() {
    console.log('Showing itinerary')

}