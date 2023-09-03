import React, { FC, useEffect } from "react";
import { Text, View } from "react-native";

const Map: FC = () => {

    useEffect(() => {
        console.log('Home: ');
    }, []);

    return (
        <View>
            <Text>Map Screen</Text>
        </View>
    );
};

export default Map;