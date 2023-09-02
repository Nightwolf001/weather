import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selected_theme: 'ocean',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSelectedTheme: (state, action) => {
            state.selected_theme = action.payload
        }
    },
});

export const { setSelectedTheme } = themeSlice.actions;
export default themeSlice.reducer;