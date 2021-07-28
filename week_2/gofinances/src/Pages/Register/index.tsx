import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Button } from '../../Components/Form/Button';
import { Input } from '../../Components/Form/Input';
import { TransactionTypeButton } from '../../Components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Form/CategorySelectButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import { CategorySelect } from '../CategorySelect';

export const Register = () => {
  const [transactionType, setTransactionType] = useState<'up' | 'down'>('up');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleTransactionTypeSelec = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleCloseSelectCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategory = () => {
    setCategoryModalOpen(true);
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
          <CategorySelectButton
            onPress={handleOpenSelectCategory}
            title={category.name}
          />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </Container>
  );
};
