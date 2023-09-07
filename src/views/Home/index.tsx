import React, { FC, useEffect, useState, useContext, useCallback, useMemo } from "react";
import { View, ActivityIndicator, RefreshControl, Image, ScrollView, TouchableOpacity, Modal, Text, FlatList, Switch } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getWeatherDetails, getLocationDetails, getWeatherForecast } from '../../actions/weather.actions';
import { removeSavedLocation } from '../../redux/reducers/locations.reducer';
import { setSelectedTheme, setSelectedColors } from '../../redux/reducers/settings.reducer';
import { AppLocationContext } from '../../context/appLocationContext';
import { SavedLocationList, LocationDetials } from '../../types';
import MapView, { Marker } from 'react-native-maps';

import { styles } from "../../theme/styles";
import { forest_sunny, forest_cloudy, forest_rainy, sea_sunny, sea_cloudy, sea_rainy } from '../../theme/colors';
import { SeaThemeHeader, ForestThemeHeader, TempBar, ForecastList } from "../../components";

const Home: FC = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const current_location = useContext(AppLocationContext);
    
    const theme = useSelector((state: RootState) => state.settingsSlice.theme);
    const unit = useSelector((state: RootState) => state.settingsSlice.units);
    const colors = useSelector((state: RootState) => state.settingsSlice.colors);
    const saved_locations = useSelector((state: RootState) => state.locationSlice.saved_locations);

    const [loading, setLoading] = useState<boolean>(true);
    const [coord, setCoord] = useState<any>(current_location);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editList, setEditList] = useState<boolean>(false);
    const [modalView, setModalView] = useState<string>('locations');
    const [location_details, setLocationDetails] = useState<LocationDetials>({});
    const [saved_locations_list, setSavedLocationsList] = useState<[SavedLocationList]>();
    
    useEffect(() => {
        (async () => {
            if (coord.lat.length !== 0 && coord.lng.length !== 0){
                await fetchData();
                setLoading(false);
            } else {
                setCoord(current_location);
            }
        })()
    }, [coord, current_location]);


    const handleModal = async (view : string) => {
        setModalView(view);
        setModalVisible(true);

        if (view === 'locations') {
            let list: any = [];

            for (let i = 0; i < saved_locations.length; i++) {
                const location = saved_locations[i];
                const data = await getWeatherDetails(location.coord, unit);

                let item: any = {
                    name: location.name,
                    coord: location.coord,
                    weather: {
                        temp_current: data?.temp_current || 0, // provide default value
                        temp_min: data?.temp_min || 0,
                        temp_max: data?.temp_max || 0,
                        conditions: data?.conditions || '',
                        description: data?.description || '',
                    }
                };
                list.push(item);
            }
            setSavedLocationsList(list);
        }
    }

    const handleOnEdit = () => {
        setEditList(!editList);
    }

    const toggleSwitch = (current_theme : string) => {
        
        if (current_theme === 'sea') {
            dispatch(setSelectedTheme('forest'));
            dispatch(setSelectedColors({
                sunny: forest_sunny,
                cloudy: forest_cloudy,
                rainy: forest_rainy,
            }));
        }

        if (current_theme === 'forest') {
            dispatch(setSelectedTheme('sea'));
            dispatch(setSelectedColors({
                sunny: sea_sunny,
                cloudy: sea_cloudy,
                rainy: sea_rainy,
            }));

        }

        setIsEnabled(!isEnabled);
    }

    const changeLocation = (location: SavedLocationList) => {
        const index = saved_locations.findIndex((item: SavedLocationList) => item.name === location.name);
        setCoord(saved_locations[index].coord);
        setModalVisible(false);
    }

    const removeLocation = (location: SavedLocationList) => {
        dispatch(removeSavedLocation(location));
        setModalVisible(false);
    }

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

    const Markers = useMemo(() => saved_locations_list?.map(marker => {
        if (marker.coord?.lat && marker.coord?.lng) {
            return (
                <Marker
                    key={`${marker.name}`}
                    tracksViewChanges={false}
                    pinColor={colors.cloudy}
                    coordinate={{
                        latitude: parseFloat(marker.coord.lat),
                        longitude: parseFloat(marker.coord.lng),
                    }}
                    title={marker.name}
                >
                    <View>
                        <Image style={[styles.icon, {tintColor: 'red'}]} resizeMode='contain' source={require(`../../assets/icons/location.png`)} />
                    </View>
                </Marker>
            );
        }
    }), [saved_locations_list]);

    return (
        <ScrollView 
            contentContainerStyle={styles.wrapper}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={'#000'}
                />
            }
        >
            {loading ? 
                <ActivityIndicator style={styles.loader} size="large" color={colors.cloudy} />
            : 
            <>
                <TouchableOpacity style={styles.refresh_icon_wrapper} onPress={() => onRefresh()} >
                    <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/refresh.png`)} />
                </TouchableOpacity>
                    <TouchableOpacity style={styles.add_icon_wrapper} onPress={() => navigation.navigate('AddLocation')} >
                    <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/add.png`)}/>
                </TouchableOpacity>

                {theme && theme === 'sea' && <SeaThemeHeader location_details={location_details} />}
                {theme && theme === 'forest' && <ForestThemeHeader location_details={location_details} />}

                <View style={[styles.container, { backgroundColor: location_details.weather?.conditions.match(/Sun|Clear/) ? colors.sunny : location_details.weather?.conditions.match(/Clouds|Fog|Haze/) ? colors.cloudy : location_details.weather?.conditions.match(/Rain/) ? colors.rainy : colors.sunny}]}>
                    <TempBar location_details={location_details} />
                    <View style={styles.divider}></View>
                    <ForecastList location_details={location_details} />
                </View>

                <TouchableOpacity style={styles.map_icon_wrapper} onPress={() => handleModal('map')} >
                    <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/map.png`)} />
                </TouchableOpacity>
                <View style={styles.switch_icon_wrapper} >
                        <Switch
                            trackColor={{ false: colors.cloudy, true: colors.rainy }}
                            thumbColor={'#fff'}
                            ios_backgroundColor={colors.rainy}
                            onValueChange={() => toggleSwitch(theme)}
                            value={isEnabled}
                        />
                </View>
                <TouchableOpacity style={styles.list_icon_wrapper} onPress={() => handleModal('locations')} >
                    <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/list.png`)} />
                </TouchableOpacity>
            </>
            }

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
                {modalView === 'locations' &&
                    <>
                        <TouchableOpacity style={styles.modal_btn_left} onPress={() => setModalVisible(false)} >
                            <Text style={styles.modal_txt_alt}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modal_btn_right} onPress={() => handleOnEdit()} >
                            <Text style={styles.modal_txt_alt}>Edit</Text>
                        </TouchableOpacity>

                        <View style={[styles.container, { marginTop : 60 }]}>
                            <Text style={[styles.modal_heading_txt, { marginBottom: 20 }]}>Select a saved location</Text>
                            <FlatList
                                data={saved_locations_list}
                                renderItem={({ item: location }: { item: SavedLocationList }) => (
                                    <View style={styles.row_wrapper}>
                                        <TouchableOpacity style={[styles.card, { backgroundColor: colors.cloudy, flex: 9 }]} onPress={() => changeLocation(location)}>
                                            <View style={styles.row_wrapper}>
                                                <View style={[styles.grid, { flex: 2 }]}>
                                                    <Text style={[styles.modal_txt, { fontSize: 21, marginBottom: 15 }]}>{location.name}</Text>
                                                    <Text style={[styles.modal_txt]}>{location.weather?.description}</Text>
                                                </View>
                                                <View style={[styles.grid, { flex: 1 }]}>
                                                    <Text style={[styles.modal_txt, { textAlign: 'right', fontSize: 25, marginBottom: 15 }]}>{location.weather?.temp_current.toFixed(0)}&#176;</Text>
                                                    <Text style={[styles.modal_txt, { textAlign: 'right' }]}>H:{location.weather?.temp_max.toFixed(0)}&#176; L:{location.weather?.temp_min.toFixed(0)}&#176;</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        {editList && 
                                        <TouchableOpacity style={[styles.card, { backgroundColor: colors.cloudy, marginLeft: 10 }]} onPress={() => removeLocation(location)}>
                                            <View style={[styles.grid, { flex: 1 }]}>
                                                <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/delete.png`)} />
                                            </View>
                                        </TouchableOpacity>
                                        }
                                    </View>
                                )}
                                keyExtractor={location => location.name}
                            />
                        </View>
                    </>
                    }
                    
                {modalView === 'map' && 
                    <>
                        <TouchableOpacity style={styles.modal_btn_left} onPress={() => setModalVisible(false)} >
                            <Text style={styles.modal_txt_alt}>Close</Text>
                        </TouchableOpacity>

                        <View style={styles.container}>
                            <Text>Maps</Text>
                        </View>
                        {coord.lat && (
                        <MapView
                            style={{ ...styles.absoluteFillObject }}
                            initialRegion={{
                                latitude: coord.lat,
                                longitude: coord.lng,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1,
                            }}
                        >   
                           {Markers}
                        </MapView>   
                        
                    )}
                    </>
                }
            </Modal>
        </ScrollView>
    );
};

export default Home;