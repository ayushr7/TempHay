import React, { useEffect, useState } from 'react';
import {
  Appearance,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { AppNavigator } from './navigation';
import { ThemeProvider } from '@src/theme/ThemeProvider';
import { initI18n } from './i18n/i18n';
import { Provider } from 'react-redux';
import { store, persistor } from '@redux/store';
import { useAppDispatch } from '@redux/hooks';
import { updateSystemTheme } from '@redux/slices/themeSlice';
import BootSplash from 'react-native-bootsplash';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConnectionStatusStrip from './components/ConnectionStatusStrip';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PersistGate } from 'redux-persist/integration/react';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  // Initialize Google Sign-In if require otherwise remove this
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '679844424322-cmhe3odm1t3ij8su1p4oo36tab7q5cia.apps.googleusercontent.com', // TODO: Replace with your actual web client ID
      offlineAccess: false,
    });
  }, []);

  // Listen for system theme changes and update the Redux store. This makes
  // the "Automatic Dark/Light Mode" feature fully reactive.
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(updateSystemTheme(colorScheme ?? 'light'));
    });

    return () => subscription.remove();
  }, [dispatch]);

  useEffect(() => {
    BootSplash.hide({ fade: true }).catch(err =>
      console.warn('BootSplash hide error:', err),
    );
  }, []);

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </View>
    </ThemeProvider>
  );
};

function App() {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nReady(true));
  }, []); // Ensure  Ensure i18n is initialized before rendering your app

  if (!i18nReady) return null; // or a splash/loading component

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <AppContent />
            <ConnectionStatusStrip />
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
