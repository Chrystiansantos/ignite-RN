import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../Components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../Components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';

export interface DataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: IHighlightProps;
  expensive: IHighlightProps;
  total: IHighlightProps;
}

export function Dashboard() {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData,
  );

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) => {
    const lastTransactions = new Date(
      // eslint-disable-next-line prefer-spread
      Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString(
      'pt-BR',
      {
        month: 'long',
      },
    )}`;
  };

  const loadTransactions = async () => {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const dataKey = '@gofinances:transactions';
    // await AsyncStorage.removeItem(dataKey);
    const response = await AsyncStorage.getItem(dataKey);

    const transactionsResponse: DataListProps[] = response
      ? JSON.parse(response)
      : [];

    const transactionFormmated: DataListProps[] = transactionsResponse.map(
      (transaction: DataListProps) => {
        // console.log(transaction);
        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount);
        } else {
          // console.log(transaction.amount);
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          type: transaction.type,
          category: transaction.category,
          date,
          amount,
        };
      },
    );

    const lastTransactionsEntries = getLastTransactionDate(
      transactionsResponse,
      'positive',
    );
    const lastTransactionsExpensives = getLastTransactionDate(
      transactionsResponse,
      'negative',
    );
    const totalInterval = `01 á ${lastTransactionsExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });
    setTransactions(transactionFormmated);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  if (isLoading) {
    return (
      <LoadContainer>
        <ActivityIndicator color={colors.primary} size="large" />
      </LoadContainer>
    );
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: user.photo,
              }}
            />
            <User>
              <UserGreetting>Olá,</UserGreetting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData?.entries?.amount}
          lastTransaction={highlightData.entries.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData?.expensive?.amount}
          lastTransaction={highlightData.expensive.lastTransaction}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData?.total?.amount}
          lastTransaction={highlightData.total.lastTransaction}
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
