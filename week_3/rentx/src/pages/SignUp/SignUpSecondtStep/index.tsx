import {
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { InputPassword } from '../../../components/InputPassword';
import { Confirmation } from '../../Confirmation';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

interface IParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondtStep = () => {
  const { colors } = useTheme();
  const { goBack, dispatch } = useNavigation();
  const route = useRoute();
  const { user } = route.params as IParams;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConrifmation] = useState('');

  const handleBack = () => {
    goBack();
  };

  const handleRegister = async () => {
    if (!password || !passwordConfirmation) {
      return Alert.alert('Informe a senha e a confirmação');
    }

    if (password !== passwordConfirmation) {
      return Alert.alert('As senhas não são iguais');
    }

    dispatch(
      CommonActions.navigate({
        name: 'Confirmation',
        params: {
          title: 'Conta Criada!',
          message: 'Agora é so fazer \n login e aproveitar',
          nextPageRoute: 'SignIn',
        },
      }),
    );
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
            <InputPassword
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConrifmation}
              value={passwordConfirmation}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
