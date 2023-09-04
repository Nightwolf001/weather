import React, { FC, useEffect, useState, useContext, useCallback } from "react";
import { Text, View, ActivityIndicator, RefreshControl, Image, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { getWeatherDetails, getLocationDetails, getWeatherForecast } from '../../actions/weather.actions';
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
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [location_details, setLocationDetails] = useState<LocationDetials>({});
    
    useEffect(() => {
        (async () => {
            if (coord.lat !== '' && coord.lng !== ''){
                await fetchData();
                setLoading(false);
            }
        })()
    }, [coord]);

    const fetchData = async () => {
        console.log('fetchData start');
        const weather = await getWeatherDetails(coord, unit);
        const location = await getLocationDetails(coord);
        const forecast = await getWeatherForecast(coord, unit);
        setLocationDetails({ ...location_details, coord, weather, location, forecast });
        console.log('fetchData end');
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView 
            contentContainerStyle={styles.wrapper}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={'#fff'}
                    progressBackgroundColor={location_details.weather?.conditions === 'Sun' ? sunny : location_details.weather?.conditions === 'Clouds' ? cloudy : location_details.weather?.conditions === 'Rain' ? rainy : sunny}
                />
            }
        >
            {loading ? 
            <ActivityIndicator style={styles.loader} size="large" color={sunny} />
            : 
            <>
            {theme && theme === 'sea' && <SeaThemeHeader location_details={location_details} />}
            {theme && theme === 'forest' && <ForestThemeHeader location_details={location_details} />}
            <View style={[styles.container, { backgroundColor: location_details.weather?.conditions === 'Sun' ? sunny : location_details.weather?.conditions === 'Clouds' ? cloudy : location_details.weather?.conditions === 'Rain' ? rainy : sunny}]}>
                <View style={styles.row_wrapper}>
                    <View style={styles.grid}>
                        <View style={styles.item_start}>
                            <Text style={styles.body1}>{location_details.weather?.temp_min.toFixed(0)}&#176;</Text>
                            <Text style={styles.body2}>min</Text>
                        </View>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.item_center}>
                            <Text style={styles.body1}>{location_details.weather?.temp_current.toFixed(0)}&#176;</Text>
                            <Text style={styles.body2}>current</Text>
                        </View>
                    </View>
                    <View style={styles.grid}>
                        <View style={styles.item_end}>
                            <Text style={styles.body1}>{location_details.weather?.temp_max.toFixed(0)}&#176;</Text>
                            <Text style={styles.body2}>max</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View>
                    {location_details.forecast && location_details.forecast?.map((item, i) => (
                        <View key={i} style={[styles.row_wrapper, { marginBottom: 15 }]}>
                            <View style={styles.grid}>
                                <View style={styles.item_start}>
                                    <Text style={styles.body1}>{item.forecast.date}</Text>
                                </View>
                            </View>
                            <View style={styles.grid}>
                                <View style={styles.item_center}>
                                    <View style={styles.icon_wrapper}>
                                        <Image
                                            style={styles.icon}
                                            resizeMode='contain'
                                            source={
                                                item.forecast?.conditions === 'Sun' ? require(`../../assets/icons/clear.png`) :
                                                item.forecast?.conditions === 'Clouds' ? require(`../../assets/icons/partlysunny.png`) :
                                                item.forecast?.conditions === 'Rain' ? require(`../../assets/icons/rain.png`) :
                                                require(`../../assets/icons/rain.png`)
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.grid}>
                                <View style={styles.item_end}>
                                    <Text style={styles.body1}>{item.forecast.temp.toFixed(0)}&#176;</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            </>
            }
        </ScrollView>
    );
};

export default Home;