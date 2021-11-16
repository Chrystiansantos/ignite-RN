import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { AppStackRoutes } from './app.stack.routes';
import { Home } from '../pages/Home';
import { MyCars } from '../pages/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text_details,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home_"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={24} height={24} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg fill={color} width={24} height={24} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg fill={color} width={24} height={24} />
          ),
        }}
      />
    </Navigator>
  );
}
