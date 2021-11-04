import { useNavigation, CommonActions } from '@react-navigation/core';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export const SignUpFirstStep = () => {
  const { goBack, dispatch } = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleBack = () => {
    goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatorio'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('E-mail é obrigatorio'),
        driverLicense: Yup.string().required('CNH é obrigatorio'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      dispatch(
        CommonActions.navigate({
          name: 'SignUpSecondtStep',
          params: {
            user: data,
          },
        }),
      );
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton color="red" onPress={handleBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua {'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de {'\n'} forma rápida e fácil</Subtitle>
          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
