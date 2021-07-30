import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../Pages/Dashboard';
import { Register } from '../Pages/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Navigator>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastrar" component={Register} />
    </Navigator>
  );
};
