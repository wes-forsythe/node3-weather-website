const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/73adaa81fdf177b19df3be556e08f2b1/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);//'35.8429,-90.7035';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.code === 400) {
            callback(body.error, undefined)
        } else {
            const temp = " It is currently " + body.currently.temperature + " degrees out. "
            const minMax = "The high today is " + body.daily.data[0].temperatureHigh + " degrees with a low of " + body.daily.data[0].temperatureLow + " degrees."
            const rain = "There is a " + (body.currently.precipProbability * 100) + "% chance of rain."
            const summary = body.daily.data[0].summary
            const forecastSummary = summary + temp + minMax + rain;
            callback(undefined, forecastSummary)
        }
    });
}

module.exports = forecast