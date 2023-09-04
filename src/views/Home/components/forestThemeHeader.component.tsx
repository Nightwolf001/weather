
import React, { FC, useEffect } from "react";
import { ImageBackground, View, Text } from "react-native";
import { styles } from "../../../theme/styles";
import { LocationDetials } from "../../../types";

type ThemeHeaderProps = {
    location_details: LocationDetials
}

const ForestThemeHeader = ({ location_details }: ThemeHeaderProps) => {

    const { weather, location } = location_details;

    useEffect(() => {
        console.log('Home: ');
    }, []);

    return (
        <ImageBackground style={styles.image}
            source={
                weather?.conditions === 'Sun' ? require(`../../../assets/images/forest/sun.png`) :
                weather?.conditions === 'Clouds' ? require(`../../../assets/images/forest/cloud.png`) :
                weather?.conditions === 'Rain' ? require(`../../../assets/images/forest/rain.png`) :
                require(`../../../assets/images/forest/sun.png`)
            }
        >
        <View style={styles.image_container}>
            <Text style={styles.current_city}>{location?.city}</Text>
            <Text style={styles.current_temp}>{weather?.temp_current.toFixed(0)}&#176;</Text>
            <Text style={styles.current_temp_desc}>{weather?.description}</Text>
        </View>
        </ImageBackground>
    );
};

export default ForestThemeHeader;