import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

interface IInputProps extends TextInputProps {
  // eslint-disable-next-line react/require-default-props
  active?: boolean;
}

export const Input = ({ active = false, ...rest }: IInputProps) => {
  return <Container active={active} {...rest} />;
};
