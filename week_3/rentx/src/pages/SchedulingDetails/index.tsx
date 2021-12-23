import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import {
  useNavigation,
  useRoute,
  CommonActions,
} from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { ICarDTO } from '../../dtos/ICarDTO';
import { getAcessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { api } from '../../service/api';

interface IParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export const SchedulingDetails = () => {
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod,
  );
  const [loading, setLoading] = useState(false);
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);
  const { colors } = useTheme();
  const { goBack, dispatch } = useNavigation();

  const { isConnected } = useNetInfo();
  const route = useRoute();
  const { car, dates } = route.params as IParams;

  const rentTotal = Number(dates.length) * car.price;

  const handleConfirmRental = async () => {
    try {
      setLoading(true);

      await api.post('/rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      dispatch(
        CommonActions.navigate({
          name: 'Confirmation',
          params: {
            title: 'Carro alugado!',
            message:
              'Agora você apenas precisar ir \n até a concessionária da RENTX \n pegar o seu automóvel',
            nextPageRoute: 'Home',
          },
        }),
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível confirmar o agendamento.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdate() {
      const { data } = await api.get(`/cars/${car.id}`);
      setCarUpdated(data);
    }
    if (isConnected) {
      fetchCarUpdate();
    }
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} color="" />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Accessories>
            {car.accessories.map(accessory => (
              <Accessory
                key={accessory.name}
                name={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}
        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${car.price} x${dates.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Alugar agora"
          color={colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};
