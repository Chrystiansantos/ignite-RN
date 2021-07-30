/* eslint-disable react/prop-types */
import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Dashboard } from '../Pages/Dashboard';
import { Register } from '../Pages/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      tabBarOptions={{
        // cor do menu, quando esta selecionado
        activeTintColor: colors.secondary,
        // cor quando o elemento esta inativo
        inactiveTintColor: colors.text,
        // adiciona um icone ao lado do outro
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 10,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        // adicionando um icone ao lado do nome da rota
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
