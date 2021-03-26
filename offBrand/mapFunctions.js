module.exports = {
    getLocation: function () {
        if (window.navigator) {
            window.navigator.geolocation.getCurrentPosition(currentPosition => {
                console.log(currentPosition);
                let latitude = currentPosition.coords.latitude;
                let longitude = currentPosition.coords.longitude;
                console.log(latitude, longitude)
                return [latitude, longitude]
            });
        }
    }
};