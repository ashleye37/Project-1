var ashleyClientId = "T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0"
var ashleyClientSecret = "5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"

var cassieClientId = "WWORN0T13UI1GGQEKQBJFN00ZJFMBX3VNDSMBFAM0XAYKBC1"
var cassieClientSecret = "FC12V4O13KN54N0XVXCDBGJ55ABVRVYB541OWDB02CIIZGMW"

var xianClientId = "LWJBIFM3VLJKDV2E3BYB3EAGXTFTWVYOWMLM2C54XU3LMOVK"
var xianClientSecret = "GK5LTXUAXQ3NLRWTDT0FNH50T5UWXES0NCB5QFLOS3QZPGAW"
  
const TristansSecret = 'LSJFCAMRVOWLM2A1JJGMLTG51PPYTCQ1231HW3NX503HSBBU';
const TristansId = 'VZJ2VR0WXOHFHHYGCBCE5L1XMY2KG5G0OS3UK4PDYHAJ2CM1';
const TristansAuth = "client_id=" + TristansId + "&client_secret=" + TristansSecret + '&v=20190411'

const currentAuth = TristansAuth;
var hotelVenueId = [];
var restaurantVenueId = [];
//var location = [];

$(document).ready(function () {

  //This API query will help us with pulling trending activities or restaurants.
  //function showVenuesNearLocation(location) {
    //var hotelQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + TristansId + "&client_secret=" + TristansSecret + "&near=" + location + "&query=hotel&v=20190415"
    var hotelQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + cassieClientId + "&client_secret=" + cassieClientSecret + "&near=denver&query=hotel&v=20190415"

    $.ajax({
      url: hotelQueryURL,
      method: "GET"
    }).then(function (response) {
      //Entire object pulled.

      // console.log(response);

      //Pulling location to be added to location on trip card.

      // console.log(response.response.geocode.feature.displayName);

      //Pulling hotel IDs for getting pictures for cards.

      var hotel1 = response.response.venues[0].id;
      var hotel2 = response.response.venues[1].id;
      var hotel3 = response.response.venues[2].id;

      hotelVenueId = [
        hotel1,
        hotel2,
        hotel3
      ];

      getHotelPic();

      // console.log ("Hotel 1 ID: " + response.response.venues[0].id);
      // console.log("Hotel 2 ID: " + response.response.venues[1].id);
      // console.log("Hotel 3 ID: " + response.response.venues[2].id);

      //Adding information to hotel suggestion cards.
      //Adding Hotel 1.
      $("#hotel1").append("Hotel Name: " + response.response.venues[0].name);
      $("#hotel1Address").append("Hotel Address: " + response.response.venues[0].location.formattedAddress[0] + ", " + response.response.venues[0].location.formattedAddress[1]);
      //Adding Hotel 2.
      $("#hotel2").append("Hotel Name: " + response.response.venues[1].name);
      $("#hotel2Address").append("Hotel Address: " + response.response.venues[1].location.formattedAddress[0] + ", " + response.response.venues[1].location.formattedAddress[1]);
      //Adding Hotel 3.
      $("#hotel3").append("Hotel Name: " + response.response.venues[2].name);
      $("#hotel3Address").append("Hotel Address: " + response.response.venues[2].location.formattedAddress[0] + ", " + response.response.venues[1].location.formattedAddress[1]);
    });
  
  var restaurantQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + cassieClientId + "&client_secret=" + cassieClientSecret + "&near=denver&query=restaurant&v=20190415"

  $.ajax({
    url: restaurantQueryURL,
    method: "GET"
  }).then(function (response) {
    //Entire object pulled.

      var restaurant1 = response.response.venues[0].id;
      var restaurant2 = response.response.venues[1].id;
      var restaurant3 = response.response.venues[2].id;

      restaurantVenueId = [
        restaurant1,
        restaurant2,
        restaurant3
      ];

      getRestaurantPic();

      // console.log ("Restaurant 1 ID: " + response.response.venues[0].id);
      // console.log("Restaurant 2 ID: " + response.response.venues[1].id);
      // console.log("Restaurant 3 ID: " + response.response.venues[2].id);

      //Adding information to hotel suggestion cards.
      //Adding Hotel 1.
      $("#restaurant1").append("Restaurant Name: " + response.response.venues[0].name);
      $("#restaurant1Address").append("Restaurant Address: " + response.response.venues[0].location.formattedAddress[0] + ", " + response.response.venues[0].location.formattedAddress[1]);
      //Adding Hotel 2.
      $("#restaurant2").append("Restaurant Name: " + response.response.venues[1].name);
      $("#restaurant2Address").append("Restaurant Address: " + response.response.venues[1].location.formattedAddress[0] + ", " + response.response.venues[1].location.formattedAddress[1]);
      //Adding Hotel 3.
      $("#restaurant3").append("Hotel Name: " + response.response.venues[2].name);
      $("#restaurant3Address").append("Hotel Address: " + response.response.venues[2].location.formattedAddress[0] + ", " + response.response.venues[1].location.formattedAddress[1]);
  });

  
  //Function that will run to pull photo for each hotel card.
  function getHotelPic() {
    for(i = 0; i < hotelVenueId.length; i++){
      queryURLExplore = "https://api.foursquare.com/v2/venues/" + hotelVenueId[i] + "?&" + currentAuth;
        $.ajax({
          url: queryURLExplore,
          method: "GET"
      }).then(function (response) {
        //Pulls photo for location card from object.
        // console.log(response.response.venue.photos.groups[1].items[0].prefix + "200x200" + response.response.venue.photos.groups[1].items[0].suffix);
        var hotelSrc = response.response.venue.photos.groups[1].items[0].prefix + "200x200" + response.response.venue.photos.groups[1].items[0].suffix;
        // console.log(hotelSrc);
        //$("#hotel1Pic").append()
      });
    };
  };

  //Function that will run to pull photo for each restaurant card.
  function getRestaurantPic() {
    for(i = 0; i < restaurantVenueId.length; i++){
      queryURLExplore = "https://api.foursquare.com/v2/venues/" + restaurantVenueId[i] + "?&" + currentAuth;
        $.ajax({
          url: queryURLExplore,
          method: "GET"
      }).then(function (response) {
        //Pulls photo for location card from object.

        // console.log(response.response.venue.photos.groups[1].items[0].prefix + "200x200" + response.response.venue.photos.groups[1].items[0].suffix);
      });
    };
  };

  

  });