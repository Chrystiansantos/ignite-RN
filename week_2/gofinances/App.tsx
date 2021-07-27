import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';
import { CategorySelect } from './src/Pages/CategorySelect';
import { Dashboard } from './src/Pages/Dashboard';
import { Register } from './src/Pages/Register';

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
      {/* <Dashboard /> */}
      {/* <Register /> */}
      <CategorySelect />
    </ThemeProvider>
  );
}
