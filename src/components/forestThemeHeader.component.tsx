
import React from "react";
import { ImageBackground, View, Text } from "react-native";
import { styles } from "../theme/styles";
import { LocationDetials } from "../types";

type ThemeHeaderProps = {
    location_details: LocationDetials
}

const ForestThemeHeader = ({ location_details }: ThemeHeaderProps) => {

    const { weather, location } = location_details;

    return (
        <ImageBackground style={styles.image}
            source={
                weather?.conditions.match(/Sun|Clear/) ? require(`../assets/images/forest/sun.png`) :
                weather?.conditions.match(/Clouds|Fog|Haze/) ? require(`../assets/images/forest/cloud.png`) :
                weather?.conditions.match(/Rain/) ? require(`../assets/images/forest/rain.png`) :
                require(`../assets/images/forest/sun.png`)
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