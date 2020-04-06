const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

// Register partials
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Setup index route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'AE Labs',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorData: 'You must provide an address eg: /weather?address=90210',
        })
    }
    // Attempt geocode process
    //This is an instance of an empty object default value for destructucting the callback function.
    //This ensures that if we don't get a valid query string value for geocode to use and thus the 
    //{latitude, longitude, location} callback values are never assigned and can't be destructuted
    //which results in an error and crashes the server
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error,
            })
        }
        //At this point we know geocode was successful so we call forecast
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    forecastError,
                })
            } else {
            //Now we know we have a healthy forecast call, so we provide the JSON data requested.
                res.send({
                    forecast: forecastData,
                    location,
                    userSearch: req.query.address,
                })
            }
        })
    })
})


// Setup about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        aboutBlurb: 'Just another weather app'
    })
})

// Setup help route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpBlurb: 'Enter a location via address, zip code, or just use a descriptive name and view real time weather data'
    })
})

// help content setup
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404: Help article not found...'
    })
})

// 404 setup
app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page not found...'
    })
})

//Start server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is up on port 3000')
})