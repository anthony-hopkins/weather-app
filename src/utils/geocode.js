const request = require('request')
// const weatherUrl = 'https://api.darksky.net/forecast/d611c125fca709500cf7c619eee819f4/39.6253'
// const locationUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/80015.json?access_token=pk.eyJ1IjoiYWhvcDgzIiwiYSI6ImNrOGY2aHc4ZzAxNGszZXBlbWtpcjFjaXkifQ.jnZY-zog_cAz3ReGf4YH3g'

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhvcDgzIiwiYSI6ImNrOGY2aHc4ZzAxNGszZXBlbWtpcjFjaXkifQ.jnZY-zog_cAz3ReGf4YH3g'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode