const { errorMsg, infoMsg, warningMsg } = require('./utils/messages')
const express = require('express')
const { geoCode } = require('./utils/geocode')
const { forecastWeather, } = require('./utils/forecastWeather')

const app = express()
const port = process.env.PORT || 3009

const forecastWeatherCb = (error, cityName, weatherData, cRes) => {
  if (error) {
    const msg = errorMsg(`${error.message}`)
    return msg
  }
  const { temperature, weather_descriptions, precip } = weatherData
  cRes.send({ cityName, temperature, weather_descriptions, precip })
}



app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Weather Home page!!' })
})

app.get('/weather', (req, res) => {
  const { city } = req.query
  if (!city) {
    return res.status(500).send({ error: 'city must be present' })
  }

  return geoCode(city, (error, cordinates) => {
    if (!city) {
      return errorMsg(' Please enter the City,for Weather info')
    }
    const [longitude, latitude] = cordinates
    // infoMsg(`City:${city} Latittude:${latitude} and Longitude: ${longitude}`)
    return forecastWeather(latitude, longitude, res, forecastWeatherCb)
    //console.log(foreRes)
    //console.log({ result })
    // return res.status(200).send({
    //   longitude, latitude
    // })
  })


  res.status(200).send({ msg: 'Weather end point is hitting' })
})


app.listen(port, () => {
  const msg = infoMsg(`Server Started at port:${port} url:http://localhost:${port}`)
  console.log(msg)
})







/*
const request = require('postman-request')
const { geoCode } = require('./utils/geocode')
const { forecastWeather, } = require('./utils/forecastWeather')
const { errorMsg, infoMsg, warningMsg } = require('./utils/messages')







const city = process.argv[2]

const forecastWeatherCb = (error, cityName, weatherData) => {
  if (error) {
    return console.error(error)
  }
  const { temperature, weather_descriptions, precip } = weatherData
  if (cityName !== city) {
    warningMsg(`The city is not accurate as given city name Given:${city} Temperature Forecast for : ${cityName}`)
  }
  infoMsg(`The temperature in ${cityName} is  ${temperature}C,its ${weather_descriptions}.There is ${precip}% chance of rain`)
}

geoCode(city, (error, cordinates) => {
  if (!city) {
    return errorMsg(' Please enter the City,for Weather info')
  }
  const [longitude, latitude] = cordinates
  infoMsg(`City:${city} Latittude:${latitude} and Longitude: ${longitude}`)
  forecastWeather(latitude, longitude, forecastWeatherCb)
})
*/


// function getWeather(latitude, longitude) {
//   const url = `http://api.weatherstack.com/current?access_key=344d5f697022a9cee99a28db8854f083&query=${latitude},${longitude}`

//   request({ url, json: true }, (error, response) => {
//     if (error) {
//       console.error(error)
//       return ''
//     }
//     const { location: { name } } = response.body
//     const { temperature, weather_descriptions, precip } = response.body.current
//     const msg = chalk.black.bgYellow.bold(`The temperature in ${name} is  ${temperature}C,its ${weather_descriptions}.There is ${precip}% chance of rain`)
//     console.log(msg)
//   })
// }



// function findLatitudeLongitude(city, getWeather) {
//   const mapBoxToken = 'pk.eyJ1IjoiYWpheW5hbGxhbmFndWxhIiwiYSI6ImNrenpjeHgzbjAwdjYzYnBtdmZzNWZ5dG4ifQ.2zUto4QOtuoCgnJbtoieXg'
//   const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapBoxToken}&limit=1`
//   request({ url: geoUrl, json: true }, (error, response) => {
//     if (error) {
//       console.error(error)
//       return 'Error occurred'
//     }
//     const [longitude, latitude] = response.body.features[0].center
//     const msg = chalk.black.bgYellow.bold(`City:${city} Latittude:${latitude} and Longitude: ${longitude}`)
//     console.log(msg)
//     // getWeather(latitude, longitude)
//   })
// }

