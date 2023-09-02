import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./views/Home";
import Settings from "./views/Settings";
import Map from "./views/Map";

const Stack = createNativeStackNavigator();

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Settings" 
                    component={Settings} 
                />
                <Stack.Screen 
                    name="Map" 
                    component={Map} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContainer;