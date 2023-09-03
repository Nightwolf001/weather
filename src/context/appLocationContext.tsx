import React, { createContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

import { Coord } from '../types';

// Create the app state context
const AppLocationContext = createContext<Coord>({
    lat: '', 
    lng: '' ,
});

// Create the app state provider component
const AppLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [coord, setCoord] = useState<Coord>({ lat: '', lng: '' });
    console.log('AppLocationProvider: ', coord.lat, coord.lng);
 
    useEffect(() => {
        
        (async () => {
            Geolocation.getCurrentPosition(
                async (position) => {
                    let { latitude, longitude } = position.coords;
                    setCoord({ lat: latitude.toString(), lng: longitude.toString() });
                },
                (error) => {
                    console.error(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        })();
    }, []);

    return (
        <AppLocationContext.Provider value={coord}>
            {children}
        </AppLocationContext.Provider>
    );
};

export { AppLocationProvider, AppLocationContext };