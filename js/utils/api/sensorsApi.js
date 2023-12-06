import { homepageData } from '../../../data/mock-homepage-data.js'
import { facadeDetailData } from '../../../data/mock-facade-detail-data.js'

import { isInTestEnv } from '../env/index.js'

export const retrieveSensorsData = () => isInTestEnv()
    ? homepageData.facades
    : fetch('http://localhost:5500/data/homepage-data.json') // TODO more ??
        .then(res => res.json())
        .then(data => data.facades)
        .catch(err => console.log("Cannot retrieve sensors data", err))

export const retrieveSensorDetails = sensorId => isInTestEnv()
    ? facadeDetailData.facade
    : fetch('http://localhost:5500/data/facade-detail-data.json') // TODO more ??
        .then(res => res.json())
        .then(data => data.facade)
        .catch(err => console.log("Cannot retrieve sensor data for ${sensorId}", err))
