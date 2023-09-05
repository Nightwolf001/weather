
import React from "react";
import { View, Text } from "react-native";
import { styles } from "../theme/styles";
import { LocationDetials } from "../types";

type TempBarProps = {
    location_details: LocationDetials
}

const TempBar = ({ location_details }: TempBarProps) => {

    const { weather } = location_details;

    return (
        <View style={styles.row_wrapper}>
            <View style={styles.grid}>
                <View style={styles.item_start}>
                    <Text style={styles.body1}>{weather?.temp_min.toFixed(0)}&#176;</Text>
                    <Text style={styles.body2}>min</Text>
                </View>
            </View>
            <View style={styles.grid}>
                <View style={styles.item_center}>
                    <Text style={styles.body1}>{weather?.temp_current.toFixed(0)}&#176;</Text>
                    <Text style={styles.body2}>current</Text>
                </View>
            </View>
            <View style={styles.grid}>
                <View style={styles.item_end}>
                    <Text style={styles.body1}>{weather?.temp_max.toFixed(0)}&#176;</Text>
                    <Text style={styles.body2}>max</Text>
                </View>
            </View>
        </View>
    );
};

export default TempBar;