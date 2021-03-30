let map;
let service;

function getLocation() {
    window.navigator.geolocation.getCurrentPosition(currentPosition => {
        let latitude = currentPosition.coords.latitude;
        let longitude = currentPosition.coords.longitude;
        result = [latitude, longitude]
        initMap(latitude, longitude);
    });
}



function initMap(latitude, longitude) {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 11,
    });

    service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
    moreButton.onclick = function () {
        moreButton.disabled = true;

        if (getNextPage) {
            getNextPage();
        }
    };

    service.nearbySearch(
        { location: { lat: latitude, lng: longitude }, radius: 5000, type: "gym" },
        (results, status, pagination) => {
            if (status !== "OK" || !results) return;
            console.log(results)
            addPlaces(results, map, latitude, longitude);
            moreButton.disabled = !pagination || !pagination.hasNextPage;

            if (pagination && pagination.hasNextPage) {
                getNextPage = () => {
                    // Note: nextPage will call the same handler function as the initial call
                    pagination.nextPage();
                };
            }
        }
    );
}

function addPlaces(places, map, latitude, longitude) {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    const placesList = document.getElementById("places");

    for (const place of places) {
        if (place.geometry && place.geometry.location) {
            const image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            new google.maps.Marker({
                map,
                icon: image,
                title: place.name,
                position: place.geometry.location,
            });
            const li = document.createElement("li");
            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
                map.setCenter(place.geometry.location);
                let endpoint = place.vicinity;
                directionsRenderer.setMap(map);
                calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude, endpoint);
            });
        }
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude, endpoint) {
    directionsService.route(
        {
            origin: {
                query: `${latitude}, ${longitude}`
            },
            destination: {
                query: `${endpoint}`
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