import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./views/Home";
import AddLocation from "./views/AddLocation";
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
                    name="AddLocation" 
                    component={AddLocation}
                    options={{
                        title: 'Add Favorite',
                        headerBackTitleVisible: false,
                    }}
                />
                <Stack.Screen 
                    name="Map" 
                    component={Map} 
                    options={{
                        title: 'Settings',
                        headerBackTitleVisible: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContainer;