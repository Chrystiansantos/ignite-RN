import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Icon, Title, Button } from './styles';

interface ITransactionTypeButtonProps extends RectButtonProps {
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
    <Container type={type} isActived={isActived}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
