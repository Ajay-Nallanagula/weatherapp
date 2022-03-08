const request = require('postman-request')

const geoCode = (city, callBack) => {
    const mapBoxToken = 'pk.eyJ1IjoiYWpheW5hbGxhbmFndWxhIiwiYSI6ImNrenpjeHgzbjAwdjYzYnBtdmZzNWZ5dG4ifQ.2zUto4QOtuoCgnJbtoieXg'
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapBoxToken}&limit=1`
    request({ url: geoUrl, json: true }, (error, response) => {
        //  const [longitude, latitude] = response.body.features[0].center
        callBack(error, response.body.features[0].center)
    })
}

module.exports = { geoCode }