import React from 'react';
import { View, Text } from 'react-native';

interface IWelcomeProps {
  title: string;
}

export function Welcome({ title }: IWelcomeProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
