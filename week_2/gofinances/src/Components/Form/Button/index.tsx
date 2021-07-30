import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface IButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export const Button = ({ title, onPress, ...rest }: IButtonProps) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
};
