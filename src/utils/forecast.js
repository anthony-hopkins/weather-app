const request = require('request')
const geocode = require('../utils/geocode')

//Darksky URL Example:
//https://api.darksky.net/forecast/d611c125fca709500cf7c619eee819f4/37.8267,-122.4233

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d611c125fca709500cf7c619eee819f4/' + latitude + encodeURIComponent(',') + longitude
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to contact weather service...', undefined)
        } else if (response.body.error) {
            callback(response.body.error, undefined)

        } else {
            callback(undefined, {
                summary: response.body.currently.summary,
                currentTemp: response.body.currently.temperature,
                feelsLike: response.body.currently.apparentTemperature,
                chanceOfRain: response.body.currently.precipProbability,
                windSpeed: response.body.currently.windSpeed,
            })
        }
    })
}

module.exports = forecast