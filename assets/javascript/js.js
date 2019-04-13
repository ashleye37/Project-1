$(document).ready(function() {

  //This API query will help us with pulling trending activities or restaurants.
  //var placeInput = [];
  var queryURL= "https://api.foursquare.com/v2/venues/search?near=denver&client_id=T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0&client_secret=5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"
  
  var cassieClientId = WWORN0T13UI1GGQEKQBJFN00ZJFMBX3VNDSMBFAM0XAYKBC1
  var cassieClientSecret = FC12V4O13KN54N0XVXCDBGJ55ABVRVYB541OWDB02CIIZGMW
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //Entire object pulled.
      console.log(response);
    //Pulling display name of place where venue is located. Organization in Firebase?
      console.log(response.response.geocode.feature.displayName);
    //Pulling venues and details. One way of pulling venues but I think we should probably NOT go this route. See updated below.
      console.log("Activity: " + response.response.venues[3].name);
      console.log("Activity ID: " + response.response.venues[3].id);
      console.log("Activity Address: " + response.response.venues[3].location.crossStreet + ", " + response.response.venues[3].location.city);
  });

  var queryURLExplore = "https://api.foursquare.com/v2/venues/4da335bcbf22a1434a0ac3f8?&client_id=T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0&client_secret=5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"
  
  $.ajax({
    url: queryURLExplore,
    method: "GET"
  }).then(function(response) {
    //Entire object pulled.
      console.log(response);
      
  });
});