import { combineReducers } from '@reduxjs/toolkit'

import locationSlice from './locations.reducer'
import themeSlice from './theme.reducer'

const rootReducer = combineReducers({
    locationSlice,
    themeSlice
})


export type RootState = ReturnType<typeof rootReducer>;