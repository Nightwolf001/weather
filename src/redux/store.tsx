//Declare Dependencies
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import locationSlice from './reducers/locations.reducer'
import settingsSlice from './reducers/settings.reducer'

const rootReducer = combineReducers({
    locationSlice,
    settingsSlice
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["locationSlice", "settingsSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
