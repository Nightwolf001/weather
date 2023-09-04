import axios from 'axios';
import moment from 'moment';

import { Coord, ForecastList, ForecastItem, Location, Weather } from '../types';
import { weather_api_base, weather_api_key, maps_api_base, maps_api_key } from '../../app.json';

export const getWeatherDetails = async (coord: Coord, units : string ) => {
    console.log('getWeatherDetails', coord, units);
    try {
        
        const { data } = await axios.get(`${weather_api_base}/weather?lat=${coord.lat}&lon=${coord.lng}&units=${units}&appid=${weather_api_key}`);
        let weather: Weather = {
            temp_current: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            conditions: data.weather[0].main,
            description: data.weather[0].description
        }

        return weather;

    } catch (ex) {
        console.error(ex)
    }
}

export const getWeatherForecast = async (coord: Coord, units: string) => {
    console.log('getWeatherForecast', coord, units);
    try {

        const { data } = await axios.get(`${weather_api_base}/forecast?lat=${coord.lat}&lon=${coord.lng}&units=${units}&appid=${weather_api_key}`);
        
        let forecastList: ForecastList[] = [];

        for (let i = 0; i < data.list.length; i++) {
            const item = data.list[i];

            if (item.dt_txt.includes('00:00:00')) {
            
                let forecastItem: ForecastItem = {
                    date: moment(item.dt_txt).format('dddd'),
                    temp: item.main.temp_min,
                    conditions: item.weather[0].main
                }

                let forecastListObj: ForecastList = {
                    forecast: forecastItem
                }

                forecastList.push(forecastListObj);
            }
        }
    
        return forecastList;
        
    } catch (ex) {
        console.error(ex)
    }
}

export const getLocationDetails = async (coord: Coord) => {
    console.log('getLocationDetails', coord);
    try {

        const { data } = await axios.get(`${maps_api_base}/geocode/json?latlng=${coord.lat},${coord.lng}&key=${maps_api_key}`);
        let location: Location = {
            country: data?.results[0]?.address_components[6]?.long_name || '',
            city: data?.results[0]?.address_components[3]?.long_name || '',
            place_id: data?.results[0]?.place_id || '',
        }

        return location;

    } catch (ex) {
        console.error(ex)
    }
}