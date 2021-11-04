import React from 'react';

import { StatusBar, useWindowDimensions } from 'react-native';
import {
  useNavigation,
  CommonActions,
  useRoute,
} from '@react-navigation/native';
import { Container, Content, Title, Message, Footer } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

interface IParamsRoute {
  title: string;
  message: string;
  nextPageRoute: string;
}

export const Confirmation = () => {
  const { width } = useWindowDimensions();
  const { dispatch } = useNavigation();
  const route = useRoute();
  const { title, message, nextPageRoute } = route.params as IParamsRoute;
  const handleConfirm = () => {
    dispatch(
      CommonActions.navigate({
        name: nextPageRoute,
      }),
    );
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
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Footer>
          <ConfirmButton title="Ok" onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
};
