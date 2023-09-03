import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'sea',
    units: 'metric'
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
        }
    },
});

export const { setSelectedTheme, setSelectedUnits } = setingsSlice.actions;
export default setingsSlice.reducer;