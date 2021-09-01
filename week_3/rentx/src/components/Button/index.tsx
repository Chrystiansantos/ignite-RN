import React from 'react';

import { Container, Title } from './styles';

interface IButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export const Button = ({ title, color, onPress }: IButtonProps) => {
  return (
    <Container onPress={onPress} color={color}>
      <Title>{title}</Title>
    </Container>
  );
};
