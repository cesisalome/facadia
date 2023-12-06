import { weatherData } from '../../../data/mock-weather-api.js'
import { isInTestEnv } from '../env/index.js'

export const retrieveWeatherData = (lat, lng) => isInTestEnv()
    ? weatherData
    : fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,is_day,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=uv_index_max`)
        .then(res => res.json())
        .catch(err => console.log("Cannot retrieve sensor data for ${sensorId}", err))

export const weatherCodeToUFN = (code) => {
    switch(code) {
     case 0:
         return 'Clear sky'
     case 1:
     case 2:
     case 3:
         return 'Mainly clear, partly cloudy, and overcast'
     case 45:
     case 48:
         return 'Fog and depositing rime fog'
     case 51:
     case 53:
     case 55:
         return 'Drizzle: Light, moderate, and dense intensity'
     case 56:
     case 57:
         return 'Freezing Drizzle: Light and dense intensity'
     case 61:
     case 63:
     case 65:
         return 'Rain: Slight, moderate and heavy intensity'
     case 66:
     case 56:
         return 'Freezing Rain: Light and heavy intensity'
     case 71:
     case 73:
     case 75:
         return 'Snow fall: Slight, moderate, and heavy intensity'
     case 77:
         return 'Snow grains'
     case 80:
     case 81:
     case 82:
         return 'Rain showers: Slight, moderate, and violent'
     case 85:
     case 86:
         return 'Snow showers slight and heavy'
     case 95:
         return 'Thunderstorm: Slight or moderate'
     case 96:
     case 99:
         return 'Thunderstorm with slight and heavy hail'
     default:
         return 'Unknown'
    }
}