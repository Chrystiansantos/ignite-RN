import React, { useState } from 'react';
import { Modal } from 'react-native';

import { useForm } from 'react-hook-form';
import { Button } from '../../Components/Form/Button';
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
import { InputForm } from '../../Components/Form/InputForm';

interface IFormData {
  name: string;
  amount: string;
}

export const Register = () => {
  const { control, handleSubmit } = useForm();

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

  const handleRegister = (form: IFormData) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    };
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm control={control} name="name" placeholder="Nome" />
          <InputForm control={control} name="amount" placeholder="Preço" />
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
        <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
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
