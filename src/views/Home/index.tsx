import React, { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
    navigation: NativeStackNavigationProp<{}>;
};

const Home: FC<Props> = ({ navigation }) => {

    useEffect(() => {
        console.log('Home: ');
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    title: {
        color: "#333333",
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});