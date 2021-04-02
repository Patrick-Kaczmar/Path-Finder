let map;
let service;
let resultName = document.getElementById("resultName");
let resultAddress = document.getElementById("resultAddress");
let resultHours = document.getElementById("resultHours");
let hoursText = document.getElementById("hoursText");
let gallery = document.getElementById("gallery");
let photo1 = document.getElementById("photo1");
let photo2 = document.getElementById("photo2");
let resultWeather = document.getElementById("resultWeather");
let resultWebsite = document.getElementById("resultWebsite");




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

    let searchTerm = $("#container").data("id")
    console.log(searchTerm)

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
        { location: { lat: latitude, lng: longitude }, radius: 5000, type: searchTerm },
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
            new google.maps.Marker({
                map,
                title: place.name,
                position: place.geometry.location,
            });
            const li = document.createElement("li");
            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
                let endpoint = place.vicinity;
                directionsRenderer.setMap(map);
                calculateAndDisplayRoute(directionsService, directionsRenderer, latitude, longitude, endpoint);
                service = new google.maps.places.PlacesService(map);
                let request = {
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'photos', 'opening_hours', 'website']
                };
                service.getDetails(request, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(place)
                        resultInfo(place)
                    }
                });
            });
        }
    }
}


function geoWeather(latitude, longitude) {
    geoWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + Math.floor(latitude) + "&lon=" + Math.floor(longitude) + "&appid=" + "2c96103d1d31364a22258e5a870054a8";
    // process.env.WEATHER_API;
    // var div=document.createElement('div');
    $.ajax({
        url: geoWeatherURL,
        method: "GET"



    }).then(function (response){
        
        let resultWeather = $("#resultWeather");
        console.log(response);
        var temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32));
        var tempNow = "Temperature: " + temp + String.fromCharCode(176) + "F";
        var humidityNow = "Humidity: " + response.main.humidity;
        var windSpeedNow = "Wind Speed: " + response.wind.speed;
        var iconNow = "src=http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

        var todayWeather = `
                <div class="weatherNow">
                    <h3 class="weatherHeader">Current Weather <img class="iconNow"${iconNow}></h3>
                    <p class="tempNow">${tempNow}</p>
                    <p class="humidityNow">${humidityNow}</p>
                    <p class="windSpeedNow">${windSpeedNow}</p>
                </div>
                `;
        resultWeather.html(todayWeather);
    })
}

function resultInfo(place) {
    resultName.textContent = place.name;
    resultAddress.textContent = place.formatted_address;

    $(hoursText).html(`- Hours - <br>
    ${place.opening_hours.weekday_text[0]}<br>
    ${place.opening_hours.weekday_text[1]}<br>
    ${place.opening_hours.weekday_text[2]}<br>
    ${place.opening_hours.weekday_text[3]}<br>
    ${place.opening_hours.weekday_text[4]}<br>
    ${place.opening_hours.weekday_text[5]}<br>
    ${place.opening_hours.weekday_text[6]}<br>`);
    $(photo1).html(`<img class="resize" src="${place.photos[0].getUrl()}">`);
    $(photo2).html(`<img class="resize" src="${place.photos[1].getUrl()}">`);
    resultWeather = "???"
    $(resultWebsite).html(`Check out the website for ${place.name} <a href="${place.website}">here</a>`);
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

