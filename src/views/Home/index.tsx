import React, { FC, useEffect, useState, useContext, useCallback } from "react";
import { View, ActivityIndicator, RefreshControl, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getWeatherDetails, getLocationDetails, getWeatherForecast } from '../../actions/weather.actions';
import { AppLocationContext } from '../../context/appLocationContext';
import { Coord, LocationDetials } from '../../types';

import { styles } from "../../theme/styles";
import { SeaThemeHeader, ForestThemeHeader, TempBar, ForecastList } from "../../components";
import { sunny, cloudy, rainy } from "../../theme/colors"


const Home: FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const coord = useContext(AppLocationContext);
    const theme = useSelector((state: RootState) => state.settingsSlice.theme);
    const unit = useSelector((state: RootState) => state.settingsSlice.units);

    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [location_details, setLocationDetails] = useState<LocationDetials>({});
    
    useEffect(() => {
        (async () => {
            if (coord.lat.length !== 0 && coord.lng.length !== 0){
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
                    tintColor={'#000'}
                />
            }
        >
            {loading ? 
            <ActivityIndicator style={styles.loader} size="large" color={sunny} />
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

                <View style={[styles.container, { backgroundColor: location_details.weather?.conditions === 'Sun' ? sunny : location_details.weather?.conditions === 'Clouds' ? cloudy : location_details.weather?.conditions === 'Rain' ? rainy : sunny}]}>
                    <TempBar location_details={location_details} />
                    <View style={styles.divider}></View>
                    <ForecastList location_details={location_details} />
                </View>

                <TouchableOpacity style={styles.map_icon_wrapper} onPress={() => onRefresh()} >
                    <Image style={styles.icon} resizeMode='contain' source={require(`../../assets/icons/map.png`)} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.list_icon_wrapper} onPress={() => navigation.navigate('AddLocation')} >
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
            </Modal>
        </ScrollView>
    );
};

export default Home;