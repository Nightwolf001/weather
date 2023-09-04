import React, { createContext, useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
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
    const [previousAppState, setPreviousAppState] = useState<string>('');
    const [currentAppState, setCurrentAppState] = useState<string>(AppState.currentState);
    
    useEffect(() => {    
        (async () => {
            const handleAppStateChange = async (nextAppState: AppStateStatus) => {
            if (currentAppState === null || currentAppState === 'unknown' && nextAppState === 'active') {
                await getCoords();
            } else if (currentAppState === 'background' && nextAppState === 'active') {
                await getCoords();
            }
                setPreviousAppState(currentAppState);
                setCurrentAppState(nextAppState);
            };

            // Subscribe to app state changes
            const appStateSubscription = AppState.addEventListener(
                'change',
                handleAppStateChange
            );

            // Clean up the subscription when the component unmounts
            return () => {
                appStateSubscription.remove();
            };
        })();
    }, [currentAppState, previousAppState]);

    const getCoords = async () => {
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
    }

    return (
        <AppLocationContext.Provider value={coord}>
            {children}
        </AppLocationContext.Provider>
    );
};

export { AppLocationProvider, AppLocationContext };