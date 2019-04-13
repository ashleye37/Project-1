

// **************************
// PLEASE READ!
// **************************
// Helper functions for UI
// Feel free to edit the body of the functions, but let me know if you want to change their names since they interact with Firebase. 
// The functions prepended with an underscore are automatically called, and should not be called elsewhere


// Login
$("#login").click(function () {
    _signInWithGoogle();
});

// Logout
$("#logout").click(function () {
    _signOutUser();
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
    _addMessageToDB(messageText);
    $('#message-input').val('');
    $('#message-empty').hide();
})

// Update user profile. 
// profileObj is an object. Ex profileObj = {location: 'Seattle', hotel: '<hotel id>'}
function updateProfile(profileObj) {
    _updateProfileInDB(profileObj);
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

    _addLocationCardToDB(locationCard);
    
}

function deleteAllLocationCardsForUser() {
    _deleteAllLocationCardsForUser();
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
            question: "Which city would you like to travel to?",
            choices: " ",
        },
        {
            question: "Who will you be traveling with?",
            choices: [" Solo travel!", "With my gals or guys!", "With my main squeeze!", "Family get away with the kids!"],
        },
        {
            question: "How long would you like your trip to last?",
            choices: [" Less than 1 week", "1-2 weeks", "2 weeks - 1 month", "More than a month"],
        },
        {
            question: "Are you interested in seeing attraction suggestions?",
            choices: [" Yes", "No"],
        },
        {
            question: "Are you interested in seeing hotel suggestions?",
            choices: [" Yes", "No"],
        },
        {
            question: "Are you interested in seeing restaurant suggestions?",
            choices: [" Yes", "No"],
        }

    ];


    // pull questions from the array of questions, loop through them, and append to UI
    var questionContainer = $("#questions");
    questionContainer.append("<h4>Please answer the following questions to help us customize your trip planning experience.</h4>");

    //display question 1 intergrate user input for the city
    questionContainer.append("<div>"+quizQuestions[0].question+ "</div>"); 
    questionContainer.append("<div>"+quizQuestions[0].choices[0] + "<div class='input-group mb-3'><input type='text' class='form-control' placeholder='City' aria-label='city' aria-describedby='button-addon2'></div>" + "</div>" );
    
    //question 2
    questionContainer.append("<div>"+ quizQuestions[1].question+ "</div>");
    questionContainer.append("<div>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[1].choices[0]+ "<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[1].choices[1]+"<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[1].choices[2]+ "<br>"+"<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>" +quizQuestions[1].choices[3]+ "</div");
    //question 3
    questionContainer.append("<div>"+ quizQuestions[2].question+ "</div>");
    questionContainer.append("<div>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[2].choices[0]+ "<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[2].choices[1]+"<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[2].choices[2]+ "<br>"+"<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>" +quizQuestions[2].choices[3]+ "</div");
    //question 4
    questionContainer.append("<div>"+ quizQuestions[3].question+ "</div>");
    questionContainer.append("<div>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[3].choices[0]+ "<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[3].choices[1]+"</div");
    //question 5     
    questionContainer.append("<div>"+ quizQuestions[4].question+ "</div>");
    questionContainer.append("<div>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[4].choices[0]+ "<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[4].choices[1]+"</div");
    //question 6
    questionContainer.append("<div>"+ quizQuestions[5].question+ "</div>");
    questionContainer.append("<div>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[5].choices[0]+ "<br>"+ "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>"+ quizQuestions[5].choices[1]+"</div");
   
    //on submit click, takes user's answers uses data to make api call to get relevant itinerary information. 
    $("#questionBtn").on("click",function(){
        $("input type='text'").val();
        $( "input[type=radio][name=baz]:checked" ).val();
        return val.attr()
    })

    console.log('Showing questionnaire')

};
//call questions function for testing
_showQuestionnaire();

// Show itinerary div
function _showItinerary() {
    console.log('Showing itinerary')

}

function switchDecisionToUndecided() {
    _switchDecisionInDB(userDecisionState.UNDECIDED)
}

function switchDecisionToQuestionnaire() {
    _switchDecisionInDB(userDecisionState.QUESTIONNAIRE)
}

function switchDecisionToItinerary() {
    _switchDecisionInDB(userDecisionState.ITINERARY)
}
