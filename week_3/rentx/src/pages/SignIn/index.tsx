import { useNavigation, CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import { Container, Header, Form, Title, Subtitle, Footer } from './styles';

export const SignIn = () => {
  const { colors } = useTheme();
  const { dispatch } = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      password: Yup.string()
        .required('A senha é obrigatoria')
        .min(8, 'No minimo 8 caracters'),
    });
    try {
      await schema.validate({ email, password });
      Alert.alert('Deu certo');
    } catch (error) {
      // Aqui verifico se o erro e do yup pois pode ser um erro da api etc
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login verifique suas credenciais',
      );
    }
  };

  const handleNewAccount = () => {
    dispatch(
      CommonActions.navigate({
        name: 'SignUpFirstStep',
      }),
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos {'\n'}quase lá</Title>
            <Subtitle>
              Faça seu login para iniciar {'\n'} uma experiência incrivel
            </Subtitle>
          </Header>
          <Form>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              iconName="mail"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword
              iconName="lock"
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled
              loading={false}
            />
            <Button
              title="Criar conta, gratuita"
              onPress={handleNewAccount}
              color={colors.background_secondary}
              enabled
              light
              // loading
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
