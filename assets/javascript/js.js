$(document).ready(function() {

  //This API query will help us with pulling trending activities or restaurants.
  //var placeInput = [];
  var queryURL= "https://api.foursquare.com/v2/venues/search?near=paris&client_id=T1KSAH00ROFWYZ4BOX100RYZHDRKPO1W3THOQRQLGPC5FOF0&client_secret=5FKKM5UQM4HNNSDWE3GAJBXYWYIJUFYJNULALZAC0VDAH3YV&v=20190411"
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
  });

});