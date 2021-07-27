import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IIconProps {
  type: 'up' | 'down';
}
interface IContainerProps {
  isActived: boolean;
  type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;

  border-width: ${({ isActived }) => (isActived ? 0 : '1.5px')};
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};

  border-radius: 5px;
  padding: 16px;
  justify-content: center;

  ${({ isActived, type }) =>
    isActived &&
    type === 'up' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
  ${({ isActived, type }) =>
    isActived &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IIconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
