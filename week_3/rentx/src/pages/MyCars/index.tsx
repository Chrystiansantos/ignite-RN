import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
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
  CarWrapper,
  CarList,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface ICarProps {
  id: string;
  user_id: string;
  car: ICarDTO;
  startDate: string;
  endDate: string;
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
      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>
          <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};
