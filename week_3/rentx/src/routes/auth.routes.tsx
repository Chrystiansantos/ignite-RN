import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Confirmation } from '../pages/Confirmation';
import { Splash } from '../pages/Splash';
import { SignIn } from '../pages/SignIn';
import { SignUpFirstStep } from '../pages/SignUp/SignUpFirstStep';
import { SignUpSecondtStep } from '../pages/SignUp/SignUpSecondtStep';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondtStep" component={SignUpSecondtStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
