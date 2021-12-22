/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { api } from '../../service/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';

export const Home = () => {
  const { dispatch } = useNavigation();
  const { isConnected } = useNetInfo();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const carsDatabase = await carCollection.query().fetch();
        if (isMounted) {
          setCars(carsDatabase);
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

  useEffect(() => {
    if (isConnected) {
      offlineSynchronize();
    }
  }, [isConnected]);

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );
        const { changes, latestVersion } = response.data;
        // return { changes, timestamp: latestVersion };
        return { changes: {}, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const { users } = changes;
        await api.post(`/users/sync`, users);
      },
    });
  };

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
