import React, { useState } from 'react';
import { Button } from '../../Components/Form/Button';
import { Input } from '../../Components/Form/Input';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelect } from '../../Components/Form/CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState<'up' | 'down'>('up');

  const handleTransactionTypeSelec = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActived={transactionType === 'up'}
              onPress={() => handleTransactionTypeSelec('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActived={transactionType === 'down'}
              onPress={() => handleTransactionTypeSelec('down')}
            />
          </TransactionsTypes>
          <CategorySelect title="Categoria" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
