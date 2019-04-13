const TristansSecret = 'LSJFCAMRVOWLM2A1JJGMLTG51PPYTCQ1231HW3NX503HSBBU';
const TristansId = 'VZJ2VR0WXOHFHHYGCBCE5L1XMY2KG5G0OS3UK4PDYHAJ2CM1';
const TristansAuth = "client_id=" + TristansId + "&client_secret=" + TristansSecret + '&v=20190411'

const currentAuth = TristansAuth
const venueId = "4ce3e678b8df548177c9b09b";

$(document).ready(function () {

  //This API query will help us with pulling trending activities or restaurants.
  function showVenuesNearLocation(location) {
    //var placeInput = [];
    var queryURL = "https://api.foursquare.com/v2/venues/search?near=" + location + "&" + currentAuth

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      //Entire object pulled.
      console.log(response);
      //Pulling display name of place where venue is located. Organization in Firebase?
      console.log(response.response.geocode.feature.displayName);
      //Pulling venues and details. One way of pulling venues but I think we should probably NOT go this route. See updated below.
      console.log("Activity: " + response.response.venues[3].name);
      console.log("Activity ID: " + response.response.venues[3].id);
      console.log("Activity Address: " + response.response.venues[3].location.crossStreet + ", " + response.response.venues[3].location.city);
    });
  }

  function getInfoForOneLocation(venueId) {
    var queryURLExplore = "https://api.foursquare.com/v2/venues/" + venueId + "?&" + currentAuth;

    $.ajax({
      url: queryURLExplore,
      method: "GET"
    }).then(function (response) {
      //Entire object pulled.
      console.log('queryURLEXPLORE', response);

    });
  }


  // showVenuesNearLocation('denver')
  // getInfoForOneLocation("4c7d40c2b33a224b957ed781")







});

