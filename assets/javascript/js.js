var ashleyClientId = "T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0"
var ashleyClientSecret = "5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"

var cassieClientId = "WWORN0T13UI1GGQEKQBJFN00ZJFMBX3VNDSMBFAM0XAYKBC1"
var cassieClientSecret = "FC12V4O13KN54N0XVXCDBGJ55ABVRVYB541OWDB02CIIZGMW"

var xianClientId = "LWJBIFM3VLJKDV2E3BYB3EAGXTFTWVYOWMLM2C54XU3LMOVK"
var xianClientSecret = "GK5LTXUAXQ3NLRWTDT0FNH50T5UWXES0NCB5QFLOS3QZPGAW"
  
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
  };
  

  function getInfoForOneLocation(venueId) {
    var queryURLExplore = "https://api.foursquare.com/v2/venues/" + venueId + "?&" + currentAuth;

    $.ajax({
      url: queryURLExplore,
      method: "GET"
    }).then(function (response) {
      //Entire object pulled.
      console.log('queryURLEXPLORE', response);
      //Entire object pulled.
      console.log(response);
      //console.log(response.response.venue.photos.groups[1].items[0].prefix + "200x200" + response.response.venue.photos.groups[1].items[0].suffix);
      //console.log(response.response.venue.bestphoto.prefix + "200x200" + response.response.venue.bestphoto.source.suffix);
    });
  };
