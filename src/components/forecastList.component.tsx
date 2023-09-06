
import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../theme/styles";
import { LocationDetials } from "../types";

type ForecastListProps = {
    location_details: LocationDetials
}

const ForecastList = ({ location_details }: ForecastListProps) => {

    const { forecast } = location_details;

    return (
        <View>
            {forecast && forecast?.map((item, i) => (
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
                                        item.forecast?.conditions.match(/Sun|Clear/) ? require(`../assets/icons/clear.png`) :
                                        item.forecast?.conditions.match(/Clouds|Fog|Haze/) ? require(`../assets/icons/partlysunny.png`) :
                                        item.forecast?.conditions.match(/Rain/) ? require(`../assets/icons/rain.png`) :
                                        require(`../assets/icons/rain.png`)
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
    );
};

export default ForecastList;