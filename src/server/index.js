var path = require('path')
// env set up
const dotenv = require('dotenv')
dotenv.config()

// express to run server and routes
const express = require('express')

// instance of app
const app = express()

// dependencies
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// cors
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

const weather_application_key = 'f0e6737272e340e6992b345aebc3d31c'
const photo_application_key = '20814315-e19ae113e4c46c2383fbffffd'

const fetch = require("node-fetch-commonjs")

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

const PORT = process.env.PORT || 8083

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port 8083!')
})


app.get('/places/:place', async (req, res) => {
  const reqPlace = req.params.place
  const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?${reqPlace}`)
  try {
    const data = await response.json()
    res.send(data)
  } catch(error) {
    console.log(error)
  }
})

app.get('/weather/:location', async(req, res) => {
  const reqWeather = req.params.location
  const response = await fetch(`http://api.weatherbit.io/v2.0/current?${reqWeather}&key=${weather_application_key}`)
  try {
    const data = await response.json()
    res.send(data) 
  } catch (error) {
    console.log(error)
  }
})

app.get('/forecast/:location', async(req, res) => {
  const reqForecast = req.params.location
  const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?${reqForecast}&key=${weather_application_key}`)
  try {
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

app.get('/photos/:location', async(req, res) => {
  const reqPhotos = req.params.location
  const response = await fetch(`https://pixabay.com/api/?${reqPhotos}&key=${photo_application_key}`)
  try {
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
  }
})

app.post('/save', async(req, res, next) => {
  try {
    const windowGlobal = typeof window !== 'undefined' && window
    windowGlobal.localStorage.setItem(req.body.input.placename, req.body)
  } catch (error) {
    console.log(error)
  }
})
// test
app.get('/test', (_req, res) => {
  res.send({ success: 'true' });
});
module.exports = app
