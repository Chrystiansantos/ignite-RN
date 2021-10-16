import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export const InputPassword = ({ iconName, ...rest }: IInputProps) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const handlePasswordVisibleChange = () => {
    setIsPasswordVisible(oldValue => !oldValue);
  };

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={colors.text_details} />
      </IconContainer>
      <InputText secureTextEntry={isPasswordVisible} {...rest} />
      <BorderlessButton onPress={handlePasswordVisibleChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={colors.text_details}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};
