import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { HistoryCard } from '../../Components/HistoryCard';

import { Container, Header, Title, Content } from './styles';
import { DataListProps } from '../Dashboard';
import { categories } from '../../util/categories';

export interface ITransactionData {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface ICategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
    [],
  );

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: DataListProps[] = response
      ? JSON.parse(response)
      : [];

    const expensives = responseFormatted.filter(
      expensive => expensive.type === 'negative',
    );
    const totalByCategory: ICategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-Br', {
          style: 'currency',
          currency: 'BRL',
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color,
        });
      }
    });
    setTotalByCategories(totalByCategory);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories?.map(item => (
          <HistoryCard
            key={item.key}
            amount={item.total}
            title={item.name}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
};
