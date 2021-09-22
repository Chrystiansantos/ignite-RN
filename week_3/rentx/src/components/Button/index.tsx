import React from 'react';

import { Container, Title } from './styles';

interface IButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
}

export const Button = ({
  title,
  color,
  onPress,
  enabled = true,
}: IButtonProps) => {
  return (
    <Container
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
};
