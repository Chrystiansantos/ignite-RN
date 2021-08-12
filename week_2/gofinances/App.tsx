import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';
import theme from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/AuthContext';
import { Routes } from './src/routes';

export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });
  // se o fontLoaded nao estiver carregador as font irei sergurar a splash usando o seguinde comando
  if (!fonstLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
    </ThemeProvider>
  );
}
