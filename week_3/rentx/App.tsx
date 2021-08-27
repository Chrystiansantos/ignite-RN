import React from 'react';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import { Home } from './src/pages/Home';
import theme from './src/styles/theme';
import { CarDetails } from './src/pages/CarDetails';
import { Scheduling } from './src/pages/Scheduling';

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Home /> */}
      {/* <CarDetails /> */}
      <Scheduling />
    </ThemeProvider>
  );
}
