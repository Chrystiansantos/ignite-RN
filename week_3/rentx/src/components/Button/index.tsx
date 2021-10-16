import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface IButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export const Button = ({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
}: IButtonProps) => {
  const { colors } = useTheme();
  return (
    <Container
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
