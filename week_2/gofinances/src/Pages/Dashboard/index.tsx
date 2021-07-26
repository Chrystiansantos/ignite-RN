import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard } from '../../Components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2020',
    },
    {
      type: 'negative',
      title: 'Hamburguerua Pizzy',
      amount: 'R$ 59,00',
      category: { name: 'Alimentação', icon: 'coffee' },
      date: '13/04/2020',
    },
    {
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: { name: 'Casa', icon: 'shopping-bag' },
      date: '13/04/2020',
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/33062949?v=4.png',
              }}
            />
            <User>
              <UserGreetting>Olá,</UserGreetting>
              <UserName>Chrystian</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 á 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace() + 20,
          }}
        />

        <Transactions />
      </Transactions>
    </Container>
  );
}
