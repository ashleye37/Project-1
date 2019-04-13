$(document).ready(function() {

  //This API query will help us with pulling trending activities or restaurants.
  //var placeInput = [];
  var ashleyClientID = "T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0"
  var ashleySecretID = "5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"
  
  var queryURL= "https://api.foursquare.com/v2/venues/search?near=denver&client_id=" + ashleyClientID + "&client_secret=" + ashleySecretID;
  
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

  var queryURLExplore = "https://api.foursquare.com/v2/venues/4beb4ca661aca59393ef8400?&client_id=" + ashleyClientID + "&client_secret=" + ashleySecretID;
  $.ajax({
    url: queryURLExplore,
    method: "GET"
  }).then(function(response) {
    //Entire object pulled.
      console.log(response);
      //console.log(response.response.venue.photos.groups[1].items[0].prefix + "200x200" + response.response.venue.photos.groups[1].items[0].suffix);
      //console.log(response.response.venue.bestphoto.prefix + "200x200" + response.response.venue.bestphoto.source.suffix);
      
  });
});