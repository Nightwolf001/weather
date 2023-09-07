import React, { FC, useEffect, useState } from "react";
import { Text, View, ScrollView, Modal, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getWeatherDetails, getWeatherForecast } from '../../actions/weather.actions';
import { Coord, LocationDetials, Location, SavedLocation } from '../../types';

import { SeaThemeHeader, ForestThemeHeader, TempBar, ForecastList } from "../../components";
import { addSavedLocation } from '../../redux/reducers/locations.reducer';

import { styles } from "../../theme/styles";

import { maps_api_key } from '../../../app.json';

const AddLocation: FC<{}> = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const theme = useSelector((state: RootState) => state.settingsSlice.theme);
    const colors = useSelector((state: RootState) => state.settingsSlice.colors);
    const unit = useSelector((state: RootState) => state.settingsSlice.units);

    const [coord, setCoord] = useState<Coord>({ lat: '', lng: '' });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>({} as Location);
    const [location_details, setLocationDetails] = useState<LocationDetials>({});

    useEffect(() => {
        (async () => {
            if (coord.lat.length !== 0 && coord.lng.length !== 0) {
                await fetchData();
            }
        })()
    }, [coord]);

    const fetchData = async () => {
        console.log('fetchData start');
        const weather = await getWeatherDetails(coord, unit);
        const forecast = await getWeatherForecast(coord, unit);
        setLocationDetails({ ...location_details, weather, forecast, location, coord });
        console.log('fetchData end');
    };

    const addLocation = async () => {

        let location: SavedLocation = {
            coord: coord,
            name: location_details?.location?.city || '',
        }

        dispatch(addSavedLocation(location));
        setModalVisible(false);
        navigation.navigate('Home')

    };

    return (
        <View style={styles.container}>
            <Text style={[styles.modal_heading_txt, { marginBottom: 20 }]}>Search weather locations</Text>
            <GooglePlacesAutocomplete
                styles={{ flex: 1, width: '100%' }}
                placeholder='Search for a city or airport'
                fetchDetails={true}
                onPress={(data, details = null) => {

                    console.log('data', data);
                    console.log('details', details);
                    
                    let location: Location = {
                        country: details?.address_components[3]?.long_name || '',
                        city: details?.address_components[0]?.long_name || '',
                        place_id: details?.place_id || '',
                    }

                    setLocation(location)
                    
                    let coord: Coord = { 
                        lat: details?.geometry.location.lat.toString() || '', 
                        lng: details?.geometry.location.lng.toString() || '' 
                    };

                    setCoord(coord)
                    setModalVisible(true);
                    
                }}
                query={{
                    key: maps_api_key,
                    language: 'en',
                    types: 'geocode'
                }}
            />
            <Modal
                style={styles.wrapper}
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                presentationStyle={"pageSheet"}
            >
                <>
                    <TouchableOpacity style={styles.modal_btn_left} onPress={() => setModalVisible(false)} >
                        <Text style={styles.modal_txt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modal_btn_right} onPress={() => addLocation()} >
                        <Text style={styles.modal_txt}>Add</Text>
                    </TouchableOpacity>
                    
                    {theme && theme === 'sea' && <SeaThemeHeader location_details={location_details} />}
                    {theme && theme === 'forest' && <ForestThemeHeader location_details={location_details} />}

                    <View style={[styles.container, { flex: 1.2, backgroundColor: location_details.weather?.conditions.match(/Sun|Clear/) ? colors.sunny : location_details.weather?.conditions.match(/Clouds|Fog|Haze/) ? colors.cloudy : location_details.weather?.conditions.match(/Rain/) ? colors.rainy : colors.sunny }]}>
                        <TempBar location_details={location_details} />
                        <View style={styles.divider}></View>
                        <ForecastList location_details={location_details} />
                    </View>
                </>

            </Modal>
        </View>
    );
};

export default AddLocation;