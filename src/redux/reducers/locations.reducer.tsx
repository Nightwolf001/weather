import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    saved_locations: [
        {   
            name: 'Current Location',
            coord: {
                lat: '',
                lng: '',
            },
        },
    ],
};

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        addSavedLocation: (state, action) => {
            console.log('addSavedLocation', action.payload)
            state.saved_locations = [...state.saved_locations, action.payload];
        },
        updateSavedLocation: (state, action) => {
            const { name } = action.payload;
            const index = state.saved_locations.findIndex(location => location.name === name);
            if (index !== -1) {
                state.saved_locations = [
                    ...state.saved_locations.slice(0, index),
                    action.payload,
                    ...state.saved_locations.slice(index + 1),
                ];
            } else {
                state.saved_locations = [...state.saved_locations, action.payload];
            }
        },
        removeSavedLocation: (state, action) => {
            const { name } = action.payload;
            const index = state.saved_locations.findIndex(location => location.name === name);
            if (index !== -1) {
                state.saved_locations = [
                    ...state.saved_locations.slice(0, index),
                    ...state.saved_locations.slice(index + 1),
                ];
            }
        },
    },
});

export const { addSavedLocation, updateSavedLocation, removeSavedLocation } = locationSlice.actions;
export default locationSlice.reducer;