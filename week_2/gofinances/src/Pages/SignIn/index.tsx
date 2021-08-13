import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignIntSocialButton } from '../../Components/SignIntSocialButton';
import { useAuth } from '../../hooks/AuthContext';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export const SignIn = () => {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar com sua conta Google');
      setIsLoading(false);
    }
  };
  // eslint-disable-next-line consistent-return
  const handleSignInWithApple = async () => {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar com sua conta Apple');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples !
          </Title>
        </TitleWrapper>
        <SignInTitle>Faça seu login com{'\n'}uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignIntSocialButton
            onPress={handleSignInWithApple}
            svg={AppleSvg}
            title="Entrar com Apple"
          />
          <SignIntSocialButton
            onPress={handleSignInWithGoogle}
            svg={GoogleSvg}
            title="Entrar com Google"
          />
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={colors.shape}
            size="large"
          />
        )}
      </Footer>
    </Container>
  );
};
