/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { api } from '../../service/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';

export const Home = () => {
  const { dispatch } = useNavigation();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const { data } = await api.get<ICarDTO[]>('/cars');
        if (isMounted) {
          setCars(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  const handleCarDetails = (car: ICarDTO) => {
    dispatch(
      CommonActions.navigate({
        name: 'CarDetails',
        params: {
          car,
        },
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
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};
