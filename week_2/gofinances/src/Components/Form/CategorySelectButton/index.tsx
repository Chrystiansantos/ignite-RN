import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface ICategorySelectProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export const CategorySelectButton = ({
  title,
  onPress,
  testID,
}: ICategorySelectProps) => {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
