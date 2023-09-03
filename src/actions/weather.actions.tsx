import axios from 'axios';
import { Coord, Location, Weather } from '../types';
import { weather_api_base, weather_api_key, maps_api_base, maps_api_key } from '../../app.json';

export const getWeatherDetails = async (coord: Coord, units : string ) => {
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

export const getLocationDetails = async (coord: Coord) => {
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