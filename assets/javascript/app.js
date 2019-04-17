

// **************************
// PLEASE READ!
// **************************
// Helper functions for UI
// Feel free to edit the body of the functions, but let me know if you want to change their names since they interact with Firebase. 
// The functions prepended with an underscore are automatically called, and should not be called elsewhere

let cityLocation;

var hotelImgs = [
    "assets/images/hotel1.jpg",
    "assets/images/hotel2.jpg",
    "assets/images/hotel3.jpg",
    "assets/images/hotel4.jpg",
    "assets/images/hotel5.jpg",
]

var restaurantImgs = [
    "assets/images/restaurant1.jpg",
    "assets/images/restaurant2.jpg",
    "assets/images/restaurant3.jpg",
    "assets/images/restaurant4.jpg",
    "assets/images/restaurant5.jpg",
]

const activityImgs = [
    '.assets/images/activity1.jpg',
]

$('#login').hide();
$('#logout').hide();
$("#questionnaire").hide()
$("#landing").hide();
$('#chat').hide();
$('#selected-city').hide();




// // Login
$("#login").click(function () {
    _signInWithGoogle();
});

// Logout
$("#logout").click(function () {
    _signOutUser();
});

//Click event that will submit the questionnaire and build out the location cards for them to then be able to select.
$("#submit-questions").click(function (event) {
    event.preventDefault()

    // Selected city
    const location = $('#location').val().trim();

    // Validate city 
    var hotelQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + TristansId + "&client_secret=" + TristansSecret + "&near=" + location + "&query=hotel&v=20190415"
    let incorrectCity = false;
    $.ajax({
        url: hotelQueryURL,
        method: "GET"
    }).then(function (response) {
        // City is valid

    }).catch(error => {
        console.log(error)
        // Invalid city name
        $('#location-invalid').show();
        $("#tripLength-empty").hide();
        event.stopPropagation();
        incorrectCity = true
    })
    if (incorrectCity) {
        return;
    }
    console.log('bypass')
    if (!location.length) { // Handle empty message
        $('#location-empty').show();
        event.stopPropagation();
        return;
    }
    $('#location-empty').hide();
    
    const tripDuration = $("input[name='trip-length']:checked").val();  // short-trip, long-trip
    if (!tripDuration) {
        $('#tripLength-empty').show();
        event.stopPropagation();
        return;
    }
    $('#location-invalid').hide();
    $('#tripLength-empty').hide();
    $('#location-empty').hide();

    cityLocation = location;
    buildLocationCards(location, tripDuration)
    $("#tripLength-empty").hide();
    $("#landing").show();
    $("#questionnaire").hide();
    switchDecisionToItinerary()
    $("#city-name").text(location)
    $('#selected-city').hide();
});

$('#reset-trip').click(function () {
    deleteAllLocationCardsForUser()
    $('.card-clear').remove();
    $('#location').val("");
    $('#city-name').text('');
    _showQuestionnaire()
    switchDecisionToQuestionnaire();

})


//Function to build out hotel location cards.
function makeHotelLocationCard(response, index, destinationDiv) {
    const div = $('<div class="card card-clear" style="width: 10rem;">')
        .attr('data-hotel-name', response.name)
        .attr('data-hotel-id', response.id)
        .attr('origin', 'hotels')
    const image = $('<img src=' + hotelImgs[index] + ' class="card-img-top">')
    const card = $('<div class="card-body">')
    const button = $('<button class="btn btn-dark add-to-trip" type="button">').text('Add to trip')
    const removeButton = $('<button class="remove-card" type="button">').text('✘');
    div.append(image).append(card).append(button).append(removeButton)
    const p = $('<p class="card-text">').text(response.name)
    card.append(p)
    $(destinationDiv).append(div)
};

//Function to build out restaurant location cards.
function makeRestaurantLocationCard(response, index, destinationDiv) {
    const div = $('<div class="card card-clear" style="width: 10rem;">')
        .attr('data-restaurant-name', response.name)
        .attr('data-restaurant-id', response.id)
        .attr('origin', 'restaurants')
    const image = $('<img src=' + restaurantImgs[index] + ' class="card-img-top">')
    const card = $('<div class="card-body">')
    const button = $('<button class="btn btn-dark add-to-trip" type="button">').text('Add to trip')
    const removeButton = $('<button class="remove-card" type="button">').text('✘');
    div.append(image).append(card).append(button).append(removeButton)
    const p = $('<p class="card-text">').text(response.name)
    card.append(p)
    $(destinationDiv).append(div)
};

//Function to build out activity location cards.
function makeActivityLocationCard(response, index, destinationDiv) {
    const div = $('<div class="card card-clear" style="width: 10rem;">')
        .attr('data-activity-name', response.name)
        .attr('data-activity-id', response.id)
        .attr('origin', 'activities')
    const image = $('<img src="assets/images/activity1.jpg" class="card-img-top">')
    const card = $('<div class="card-body">')
    const button = $('<button class="btn btn-dark add-to-trip" type="button">').text('Add to trip')
    const removeButton = $('<button class="remove-card" type="button">').text('✘');
    div.append(image).append(card).append(button).append(removeButton)
    const p = $('<p class="card-text">').text(response.name)
    card.append(p)
    $(destinationDiv).append(div)
};

// Add locationCard to #selectedCards div
$(document).on('click', '.add-to-trip', function () {
    $('#selectedCards').append($(this).parent())
})

$(document).on('click', '.remove-card', function () {
    $('#' + $(this).parent().attr('origin')).append($(this).parent())
})

$('#save-itinerary').click(function () {
    // deleteAllLocationCardsForUser();
    const locationCard = {
        city: cityLocation,
        hotels: [],
        restaurants: [],
        venues: []
    };

    $('#selectedCards').children().each(function (index, elem) {
        // Add hotel, restaurant, activity info
        const hotelName = $(this).attr('data-hotel-name')
        const activityName = $(this).attr('data-activity-name')
        const restaurantName = $(this).attr('data-restaurant-name')
        if (hotelName) {
            locationCard.hotels.push({
                name: hotelName,
                id: $(this).attr('data-hotel-id')
            })
        } else if (activityName) {
            locationCard.venues.push({
                name: activityName,
                id: $(this).attr('data-activity-id')
            })
        } else if (restaurantName) {
            locationCard.restaurants.push({
                name: restaurantName,
                id: $(this).attr('data-restaurant-id')
            })
        }
    })
    saveLocationCard(locationCard)
});

// Displays only .logged-in elements to logged in users. Automatically called on login
function _displayLoggedInUI() {
    $('.logged-in').show();
    $('.logged-out').hide();

    $("#startup").hide();
    $('#chat').show();
}

// Displays only .logged-out elements to logged out users. Automatically called on logout
function _displayLoggedOutUI() {
    $('.logged-in').hide();
    $('.logged-out').show();
    $('#chat').hide();
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
// profileObj is an object. Ex profileObj = {name: 'Donkey Kong', location: 'Seattle'}
function updateProfile(profileObj) {
    _updateProfileInDB(profileObj);
}

// Retrieves all location cards for user and displays them. Automatically called on login
function _showLocationCards(locationCard) {
    // Create hotel calls from data saved in DB
    
    
    if (locationCard) {
        cityLocation = locationCard.city
        $("#city-name").text(locationCard.city)
        if (locationCard.hotels) {
            locationCard.hotels.forEach((obj, index) => {
                makeHotelLocationCard(obj, index, '#selectedCards')
            })
        }
        if (locationCard.restaurants) {
            locationCard.restaurants.forEach((obj, index) => {
                makeRestaurantLocationCard(obj, index, '#selectedCards')
            })
        }
        if (locationCard.venues) {
            locationCard.venues.forEach((obj, index) => {
                makeActivityLocationCard(obj, index, '#selectedCards')
            })
        }
    }
}

// Create locationCard and send it to DB from client
function saveLocationCard(locationCard) {
    // locationCard must be in this shape for DB to accept
    // {
    //     city: 'Seattle',
    //     hotels: [
    //         {
    //             name: 'Mariott',
    //             id: 'Whatever unique id this is'
    //         }
    //     ],
    //     venues: [
    //         {
    //             name: "Clementine cupcake truck",
    //             id: "4ce3e678b8df548177c9b09b"
    //         },
    //         {
    //             name: "Mr Brown’s Attic",
    //             id: "5b3fa3038c35dc0039217315"
    //         },
    //         {
    //             name: "blarg",
    //             id: 'asdfaskdjfj'
    //         }
    //     ]
    // }
    _addLocationCardToDB(locationCard);
}

function deleteAllLocationCardsForUser() {
    _deleteAllLocationCardsForUser();
}

// Show questionnaire div
function _showQuestionnaire() {
    $("#questionnaire").show();
    $("#landing").hide();

};


// Show itinerary div
function _showItinerary() {
    $("#questionnaire").hide();
    $("#landing").show();
}

function switchDecisionToQuestionnaire() {
    _switchDecisionInDB(userDecisionState.QUESTIONNAIRE)
}

function switchDecisionToItinerary() {
    _switchDecisionInDB(userDecisionState.ITINERARY)
}

