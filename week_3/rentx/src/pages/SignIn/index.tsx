import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

import { Container, Header, Form, Title, Subtitle, Footer } from './styles';

export const SignIn = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
              onPress={() => console.log('Login')}
              enabled={false}
              loading={false}
            />
            <Button
              title="Criar conta, gratuita"
              onPress={() => console.log('Login')}
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
