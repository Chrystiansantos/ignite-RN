import React from 'react';
import LottieView from 'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';
import { Container } from './styles';

export const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        resizeMode="contain"
        autoPlay
        style={{ height: 200 }}
        loop
      />
    </Container>
  );
};
