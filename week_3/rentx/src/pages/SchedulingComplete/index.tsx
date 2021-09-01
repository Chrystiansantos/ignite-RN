import React from 'react';

import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Title, Message, Footer } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

export const SchedulingComplete = () => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const handleConfirm = () => {
    navigate('Home');
  };
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado !</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel
        </Message>
        <Footer>
          <ConfirmButton title="Ok" onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
};
