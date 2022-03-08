const request = require('postman-request')

const forecastWeather = (latitude, longitude, cRes, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=344d5f697022a9cee99a28db8854f083&query=${latitude},${longitude}`

     request({ url, json: true }, (error, response) => {
        const { location: { name } } = response.body
         callback(error, name, response.body.current,cRes)
    })
}

module.exports = { forecastWeather }