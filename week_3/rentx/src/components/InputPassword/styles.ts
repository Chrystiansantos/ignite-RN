import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';

interface IInputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
`;

export const InputText = styled(TextInput)<IInputProps>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  flex: 1;
  padding: 0 23px;
  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
