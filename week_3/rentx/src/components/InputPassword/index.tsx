import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export const InputPassword = ({ iconName, value, ...rest }: IInputProps) => {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleInputFocused = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  const handlePasswordVisibleChange = () => {
    setIsPasswordVisible(oldValue => !oldValue);
  };

  return (
    <Container>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? colors.main : colors.text_details}
        />
      </IconContainer>
      <InputText
        onBlur={handleInputBlur}
        onFocus={handleInputFocused}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        {...rest}
      />
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
