import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';

import { Container, IconContainer, InputText } from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const Input = ({ iconName, ...rest }: IInputProps) => {
  const { colors } = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={colors.text_details} />
      </IconContainer>
      <InputText {...rest} />
    </Container>
  );
};
