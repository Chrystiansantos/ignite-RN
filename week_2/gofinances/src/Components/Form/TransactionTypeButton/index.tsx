import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

interface ITransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActived: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export const TransactionTypeButton = ({
  title,
  type,
  isActived,
  ...rest
}: ITransactionTypeButtonProps) => {
  return (
    <Container {...rest} type={type} isActived={isActived}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
