$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  getLocation = function (result) {
    window.navigator.geolocation.getCurrentPosition(currentPosition => {
      let latitude = currentPosition.coords.latitude;
      let longitude = currentPosition.coords.longitude;
      result = [latitude, longitude]
      console.log(result)
    });
  }

  getLocation();
  
});
