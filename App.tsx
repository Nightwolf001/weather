/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import { InternetConnectionProvider } from './src/context/internetConnectionContext';
import { AppLocationProvider } from './src/context/appLocationContext';

import AppContainer from "./src/navigation"

const App: React.FC = () => {          
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" hidden />
        <PersistGate loading={null} persistor={persistor}>
            <InternetConnectionProvider>
              <AppLocationProvider>
                  <AppContainer/>
              </AppLocationProvider>
            </InternetConnectionProvider>
        </PersistGate>
    </Provider>
  );
}

export default App;
