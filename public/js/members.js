$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
 
});
getLocation = function () {
  window.navigator.geolocation.getCurrentPosition(currentPosition => {
    let latitude = currentPosition.coords.latitude;
    let longitude = currentPosition.coords.longitude;
    result = [latitude, longitude]
    console.log(result)
  });
}
https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY
function getCity(result) {
  var baseAPIUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';
  $.ajax({
    url: baseAPIUrl + result.geolocation + "AIzaSyCLn8eFzZs2IxHKregIE05dcdyx7_KfSDI",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
    }
  });
}
getLocation();
getCity();