let map;
let service;

function getLocation() {
    window.navigator.geolocation.getCurrentPosition(currentPosition => {
        let latitude = currentPosition.coords.latitude;
        let longitude = currentPosition.coords.longitude;
        result = [latitude, longitude]
        initMap(latitude, longitude);
        geoWeather(latitude, longitude);
    });
}



function initMap(latitude, longitude) {
    // let directionsService = new google.maps.DirectionsService();
    // let directionsRenderer = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 10,
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
        { location: { lat: latitude, lng: longitude }, radius: 10000, type: "gym" },
        (results, status, pagination) => {
            if (status !== "OK" || !results) return;
            addPlaces(results, map);
            moreButton.disabled = !pagination || !pagination.hasNextPage;

            if (pagination && pagination.hasNextPage) {
                getNextPage = () => {
                    // Note: nextPage will call the same handler function as the initial call
                    pagination.nextPage();
                };
            }
        }
    );


    // directionsRenderer.setMap(map);
    // calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude);
}

function addPlaces(places, map) {
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
            });
        }
    }
}
function geoWeather(latitude, longitude) {
    geoWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + Math.floor(latitude) + "&lon=" + Math.floor(longitude) + "&appid=2c96103d1d31364a22258e5a870054a8";
    // const locationWeather = document.getElementById("locationWeather");
    $.ajax({
        url: geoWeatherURL,
        method: "GET"
    }).then(function (response){
        console.log(response);
        // var nameOfCity = "Today's Weather in " + cityToSearch;
        // var temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32));
        // var tempNow = "Temperature: " + temp + String.fromCharCode(176) + "F";
        // var humidityNow = "Humidity: " + response.main.humidity;
        // var windSpeedNow = "Wind Speed: " + response.wind.speed;
        // var iconNow = "src=http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        // var todayWeather = `<div class="weatherNow">
        //         <h2 class="nameOfCity">${nameOfCity}</h2>
        //         <p class="tempNow">${tempNow}</p>
        //         <p class="humidityNow">${humidityNow}</p>
        //         <p class="windSpeedNow">${windSpeedNow}</p>
        //         <img class="iconNow"${iconNow}></div>`;
        // locationWeather.appendChild(todayWeather);
    })
}
