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
var location;

// $(document).ready(function () {

function buildLocationCards(location, tripDuration) {
  var hotelQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + TristansId + "&client_secret=" + TristansSecret + "&near=" + location + "&query=hotel&v=20190415"

  let numVenues;
  if (tripDuration === 'short-trip') {
    numVenues = 3
  } else {
    numVenues = 5
  };

  // Build hotelCards
  $.ajax({
    url: hotelQueryURL,
    method: "GET"
  }).then(function (response) {
    const hotels = response.response.venues;
    for (var i = 0; i < numVenues; i++) {
      makeHotelLocationCard(hotels[i], i, '#hotels');
    }
  });

  var restaurantQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + cassieClientId + "&client_secret=" + cassieClientSecret + "&near=" + location + "&query=restaurant&v=20190415"

  // Build restaurantCards
  $.ajax({
    url: restaurantQueryURL,
    method: "GET"
  }).then(function (response) {

    const restaurants = response.response.venues;
    for (var i = 0; i < numVenues; i++) {
      makeRestaurantLocationCard(restaurants[i], i);
    }
  });

  var activityQueryURL = "https://api.foursquare.com/v2/venues/search?client_id=" + cassieClientId + "&client_secret=" + cassieClientSecret + "&near=" + location + "&query=activities&v=20190415"

  // Build activityCards
  $.ajax({
    url: activityQueryURL,
    method: "GET"
  }).then(function (response) {

    const activities = response.response.venues;
    for (var i = 0; i < numVenues; i++) {
      makeActivityLocationCard(activities[i]);
    }
  });
};
