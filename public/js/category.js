let map;

function getLocation() {
    window.navigator.geolocation.getCurrentPosition(currentPosition => {
        let latitude = currentPosition.coords.latitude;
        let longitude = currentPosition.coords.longitude;
        result = [latitude, longitude]
        initMap(latitude, longitude);
    });
}



function initMap(latitude, longitude) {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 7,
    });
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude);
}


function calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude) {
    directionsService.route(
        {
            origin: {
                query: `${latitude}, ${longitude}`
            },
            destination: {
                query: `albany, ny`
            },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}