import React, { FC, useEffect, useState, useContext } from "react";
import { Text, View, ImageBackground, ActivityIndicator, Image } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { getWeatherDetails, getLocationDetails } from '../../actions/weather.actions';
import { AppLocationContext } from '../../context/appLocationContext';
import { LocationDetials } from '../../types';
import { styles } from "../../theme/styles";
import { SeaThemeHeader, ForestThemeHeader } from "./components";
import { sunny, cloudy, rainy } from "../../theme/colors"


const Home: FC = () => {

    const coord = useContext(AppLocationContext);
    const theme = useSelector((state: RootState) => state.settingsSlice.theme);
    const unit = useSelector((state: RootState) => state.settingsSlice.units);

    const [loading, setLoading] = useState<boolean>(true);
    const [location_details, setLocationDetails] = useState<LocationDetials>({});
    console.log('unit', unit)
    useEffect(() => {
        (async () => {
            if(unit){
                const weather = await getWeatherDetails(coord, unit);
                const location = await getLocationDetails(coord);
                setLocationDetails({ ...location_details, coord, weather, location });
                setLoading(false);
                console.log('location_details', location_details)
                console.log('theme', theme)
                console.log('unit', unit)
            }
        })()
    }, [coord, unit]);

    useEffect(() => {
        (async () => {
            console.log('useEffect location_details', location_details)
        })()
    }, [location_details]);

    return (
        <View style={styles.wrapper}>
            {loading && <ActivityIndicator style={styles.loader} size="large" color={sunny} />}
            {theme && theme === 'sea' && <SeaThemeHeader location_details={location_details} />}
            {theme && theme === 'forest' && <ForestThemeHeader location_details={location_details} />}
            <View style={[styles.container, { backgroundColor: location_details.weather?.conditions === 'Sun' ? sunny : location_details.weather?.conditions === 'Clouds' ? cloudy : location_details.weather?.conditions === 'Rain' ? rainy : sunny}]}>
                <View style={styles.row_wrapper}>
                    <View style={styles.grid}>
                        <View style={styles.xs_temp_min}>
                            <Text>{location_details.weather?.temp_min.toFixed(0)}&#176;</Text>
                            <Text>min</Text>
                        </View>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.xs_temp_current}>
                            <Text>{location_details.weather?.temp_current.toFixed(0)}&#176;</Text>
                            <Text>current</Text>
                        </View>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.xs_temp_max}>
                            <Text>{location_details.weather?.temp_max.toFixed(0)}&#176;</Text>
                            <Text>max</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Home;