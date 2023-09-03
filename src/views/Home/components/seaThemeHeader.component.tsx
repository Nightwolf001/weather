import React, { FC, useEffect } from "react";
import { ImageBackground, View, Text } from "react-native";
import { styles } from "../../../theme/styles";
import { LocationDetials } from "../../../types";

type ThemeHeaderProps = {
    location_details: LocationDetials
}

const SeaThemeHeader = ({ location_details }: ThemeHeaderProps) => {

    const { weather, location } = location_details;

    useEffect(() => {
        console.log('Home: ');
    }, []);

    return (
        <ImageBackground style={styles.image} 
            source={
                location_details.weather?.conditions === 'Sun' ? require(`../../../assets/images/sea/sun.png`) : 
                location_details.weather?.conditions === 'Clouds' ? require(`../../../assets/images/sea/cloud.png`) : 
                location_details.weather?.conditions === 'Rain' ? require(`../../../assets/images/sea/rain.png`) : 
                ''}
        >
            <View style={styles.image_container}>
                <Text style={styles.current_temp}>{location_details.weather?.temp_current.toFixed(0)}&#176;</Text>
                <Text style={styles.current_temp_desc}>{location_details.weather?.description}</Text>
            </View>
        </ImageBackground>
    );
};

export default SeaThemeHeader;