import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Container, Title, Amount } from './styles';

interface IHistoryCardProps {
  color: string;
  title: string;
  amount: string;
}

export const HistoryCard = ({ amount, color, title }: IHistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
