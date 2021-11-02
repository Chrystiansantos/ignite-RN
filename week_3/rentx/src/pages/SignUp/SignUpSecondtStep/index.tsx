import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { InputPassword } from '../../../components/InputPassword';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

export const SignUpSecondtStep = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const handleBack = () => {
    goBack();
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
            <FormTitle>2. Senha</FormTitle>
            <InputPassword iconName="lock" placeholder="Senha" />
            <InputPassword iconName="lock" placeholder="Repetir senha" />
          </Form>
          <Button title="Cadastrar" color={colors.success} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
