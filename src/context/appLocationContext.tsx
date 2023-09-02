import React, { createContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

interface Location {
    lat: string;
    lng: string;
};

interface AppLocationContextType {
    location: Location;
}

// Create the app state context
const AppLocationContext = createContext<AppLocationContextType>({
    location: { lat: '', lng: '' },
});

// Create the app state provider component
const AppLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location>({ lat: '', lng: '' });
    console.log('AppLocationProvider: ', location.lat, location.lng);
    console.log('AppLocationProvider: ', children);
    useEffect(() => {
        
        (async () => {
            Geolocation.getCurrentPosition(
                async (position) => {
                    let { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude.toString(), lng: longitude.toString() });
                },
                (error) => {
                    console.error(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        })();
    }, []);

    return (
        <AppLocationContext.Provider value={{ location }}>
            {children}
        </AppLocationContext.Provider>
    );
};

export { AppLocationProvider, AppLocationContext };