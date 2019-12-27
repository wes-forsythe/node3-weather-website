const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2VzZm9yc3l0aGUwOSIsImEiOiJjazB6ZW5yYTgwYWptM2luOXh6amt2NjBiIn0.HIFu7zxKG3Oqn2BQHnF6xQ&limit=1';
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services.', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location ' + address + '. Try another search.', undefined);
        }else{
            callback(undefined, {
                location : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
            });
        }
    })
}

module.exports = geocode