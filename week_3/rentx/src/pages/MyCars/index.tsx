import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { ICarDTO } from '../../dtos/ICarDTO';
import { api } from '../../service/api';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarList,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';

interface ICarProps {
  id: string;
  user_id: string;
  car: ICarDTO;
}

export const MyCars = () => {
  const [cars, setCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { colors } = useTheme();
  const { goBack } = useNavigation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/schedules_byuser?user_id=1');
        console.log(data);
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleBack = () => {
    goBack();
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={colors.shape} onPress={handleBack} />
        <Title>
          Escolha uma{'\n'}data de inicio e {'\n'}fim do aluguel
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>10</AppointmentsQuantity>
        </Appointments>
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
};
