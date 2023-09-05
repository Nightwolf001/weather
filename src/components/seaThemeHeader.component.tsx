
import React from "react";
import { ImageBackground, View, Text } from "react-native";
import { styles } from "../theme/styles";
import { LocationDetials } from "../types";

type ThemeHeaderProps = {
    location_details: LocationDetials
}

const seaThemeHeader = ({ location_details }: ThemeHeaderProps) => {

    const { weather, location } = location_details;

    return (
        <ImageBackground style={styles.image}
            source={
                weather?.conditions === 'Sun' ? require(`../assets/images/sea/sun.png`) :
                weather?.conditions === 'Clouds' ? require(`../assets/images/sea/cloud.png`) :
                weather?.conditions === 'Rain' ? require(`../assets/images/sea/rain.png`) :
                require(`../assets/images/sea/sun.png`)
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

export default seaThemeHeader;