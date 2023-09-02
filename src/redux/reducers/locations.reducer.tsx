import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    saved_locations: [],
};

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.saved_locations = action.payload
        }
    },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;