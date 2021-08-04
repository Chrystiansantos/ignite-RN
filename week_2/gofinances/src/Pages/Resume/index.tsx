import React from 'react';
import { HistoryCard } from '../../Components/HistoryCard';

import { Container, Header, Title } from './styles';

export const Resume = () => {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard amount="R$ 150,50" title="Compras" color="red" />
    </Container>
  );
};
