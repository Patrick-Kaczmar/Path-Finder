let map;
// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function (data) {
  $(".member-name").text(data.email);
});

function getLocation() {
  window.navigator.geolocation.getCurrentPosition(currentPosition => {
    let latitude = currentPosition.coords.latitude;
    let longitude = currentPosition.coords.longitude;
    result = [latitude, longitude]
    console.log(typeof latitude);
    // initMap(latitude, longitude);
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 8,
    });
  });
}



function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10,
  });
}

