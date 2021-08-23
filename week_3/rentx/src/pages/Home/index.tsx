import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

export const Home = () => {
  const car = {
    brand: 'Mitsubishi',
    name: 'Lancer',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail:
      'https://img1.gratispng.com/20171220/egq/mitsubishi-lancer-png-5a3a9535027442.6133742515137887250101.jpg',
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3]}
        renderItem={({ item }) => <Car data={car} />}
        keyExtractor={item => String(item)}
      />
    </Container>
  );
};
