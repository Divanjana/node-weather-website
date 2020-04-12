const request = require("request");
const forecast = (cordslat, cordslon, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=838e0c85f474edf28d97d23c9108236d&query="+ cordslat + "," + cordslon;

    request({url}, (error,{body}) => {
        const data2 = JSON.parse(body);
        if(error){
            callback("Unable to connect to network", undefined);
        }else if(data2.error){
           callback("Unable to find the coordinate", undefined);
        }else{
            callback(undefined, {
                wind: data2.current.wind_speed,
                temp: data2.current.temperature,
                hum: data2.current.humidity,
                winddir: data2.current.wind_dir,
                wdes: data2.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast;