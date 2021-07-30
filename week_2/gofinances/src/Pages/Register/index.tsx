import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .positive('O valor não pode ser negativo')
    .typeError('Informe um valor númerico'),
});

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [transactionType, setTransactionType] = useState<'up' | 'down'>('up');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const dataKey = '@gofinances:transactions';

  const handleTransactionTypeSelec = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleCloseSelectCategory = () => {
    setCategoryModalOpen(false);
  };

  const handleOpenSelectCategory = () => {
    setCategoryModalOpen(true);
  };

  // eslint-disable-next-line consistent-return
  const handleRegister = async (form: IFormData) => {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem(dataKey);
      console.log(JSON.parse(data!));
    };
    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              autoCapitalize="sentences"
              placeholder="Nome"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
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
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
