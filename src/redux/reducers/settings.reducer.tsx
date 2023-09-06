import { createSlice } from '@reduxjs/toolkit';
import { forest_cloudy, forest_rainy, forest_sunny } from '../../theme/colors';

const initialState = {
    theme: 'forest',
    units: 'metric',
    colors: {
        sunny: forest_sunny,
        cloudy: forest_cloudy,
        rainy: forest_rainy,
    },  
};

const setingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSelectedTheme: (state, action) => {
            state.theme = action.payload
        },
        setSelectedUnits: (state, action) => {
            state.units = action.payload
        },
        setSelectedColors: (state, action) => {
            state.colors = action.payload
        }
    },
});

export const { setSelectedTheme, setSelectedUnits, setSelectedColors } = setingsSlice.actions;
export default setingsSlice.reducer;