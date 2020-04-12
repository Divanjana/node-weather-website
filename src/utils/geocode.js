const request = require("request");
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiaXNoYW5rYSIsImEiOiJjazhyM2R2azQwMXNpM2ZtcTRpb2oxeGlwIn0.RySoaobwXrVyb9lUidtrvA";

    request({url, json: true}, (error,{body}) => {
        if(error){
            callback("Unable to connect to the network", undefined);
        }else if(body.features.length === 0){
            callback("Unable to find the location", undefined);
        }else{
            callback(undefined, {
                longti: body.features[0].center[0],
                latit: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
